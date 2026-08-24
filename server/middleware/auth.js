import jwt from 'jsonwebtoken';
import User from '../models/User.js';

export const protect = async (req, res, next) => {
  try {
    let token = req.cookies?.jwt;

    if (!token && req.headers.authorization && req.headers.authorization.startsWith('Bearer')) {
      token = req.headers.authorization.split(' ')[1];
    }

    if (!token) {
      return res.status(401).json({ success: false, message: 'Authentication required. Please log in.' });
    }

    const secret = process.env.JWT_SECRET || 'geet_studio_default_jwt_secret_2026';
    const decoded = jwt.verify(token, secret);

    let user = null;
    try {
      user = await User.findById(decoded.id).select('-password');
    } catch (dbErr) {
      // In-memory fallback if MongoDB connection is pending
      user = { id: decoded.id, email: decoded.email, name: decoded.name, role: decoded.role };
    }

    if (!user) {
      // Fallback user object from token payload
      user = { id: decoded.id, email: decoded.email, name: decoded.name, role: decoded.role };
    }

    req.user = user;
    next();
  } catch (error) {
    return res.status(401).json({ success: false, message: 'Invalid or expired authentication token.' });
  }
};
