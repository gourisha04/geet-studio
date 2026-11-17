import jwt from 'jsonwebtoken';
import mongoose from 'mongoose';
import User from '../models/User.js';

// In-memory activity registry for administrator sessions
export const adminActivityStore = new Map();
const lastDbUpdateMap = new Map();

export const getAdminInactivityLimit = () => {
  if (process.env.TEST_ADMIN_INACTIVITY_MS) {
    return parseInt(process.env.TEST_ADMIN_INACTIVITY_MS, 10);
  }
  return 15 * 60 * 1000; // Exactly 15 minutes of inactivity
};

export const touchAdminActivity = (userId) => {
  const now = Date.now();
  const idStr = String(userId);
  adminActivityStore.set(idStr, now);

  const lastDb = lastDbUpdateMap.get(idStr) || 0;
  // Throttled database persist (at most once every 10 seconds) to avoid database thrashing during rapid requests
  if (now - lastDb > 10000 && mongoose.connection.readyState === 1) {
    lastDbUpdateMap.set(idStr, now);
    User.findByIdAndUpdate(userId, { lastAdminActivity: new Date(now) }).catch(() => {});
  }
};

export const clearAdminActivity = (userId) => {
  const idStr = String(userId);
  adminActivityStore.delete(idStr);
  lastDbUpdateMap.delete(idStr);
  if (mongoose.connection.readyState === 1) {
    User.findByIdAndUpdate(userId, { $unset: { lastAdminActivity: 1 } }).catch(() => {});
  }
};

export const protect = async (req, res, next) => {
  try {
    let token = req.cookies?.jwt;

    if (!token && req.headers.authorization && req.headers.authorization.startsWith('Bearer ')) {
      token = req.headers.authorization.split(' ')[1];
    }

    if (!token) {
      return res.status(401).json({ success: false, message: 'Authentication required. Please log in.' });
    }

    const secret = process.env.JWT_SECRET || 'geet_studio_default_jwt_secret_2026';
    const decoded = jwt.verify(token, secret);

    let user = null;
    if (mongoose.connection.readyState === 1) {
      user = await User.findById(decoded.id).select('-password');
      if (!user) {
        return res.status(401).json({ success: false, message: 'User belonging to this token no longer exists.' });
      }
    } else {
      // If DB is in test/isolated mode without connection
      user = { id: decoded.id, _id: decoded.id, email: decoded.email, name: decoded.name, role: decoded.role };
    }

    // Backend-enforced 15-minute inactivity session timeout for ADMIN accounts ONLY
    if (user.role === 'admin') {
      const userIdStr = String(user._id || user.id);
      const inactivityLimit = getAdminInactivityLimit();
      const now = Date.now();

      let lastActivity = adminActivityStore.get(userIdStr);
      if (!lastActivity && user.lastAdminActivity) {
        lastActivity = new Date(user.lastAdminActivity).getTime();
      }
      if (!lastActivity && decoded.iat) {
        lastActivity = decoded.iat * 1000;
      }

      if (lastActivity && (now - lastActivity > inactivityLimit)) {
        // Session expired due to inactivity
        clearAdminActivity(userIdStr);

        const isProd = process.env.NODE_ENV === 'production';
        res.clearCookie('jwt', {
          httpOnly: true,
          secure: isProd,
          sameSite: isProd ? 'none' : 'lax',
        });

        return res.status(401).json({
          success: false,
          code: 'SESSION_INACTIVE',
          message: 'Your session expired due to inactivity. Please log in again.',
        });
      }

      // Valid active administrator activity — record timestamp
      touchAdminActivity(userIdStr);
    }

    req.user = user;
    next();
  } catch (error) {
    return res.status(401).json({ success: false, message: 'Invalid or expired authentication token.' });
  }
};
