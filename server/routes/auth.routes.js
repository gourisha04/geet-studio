import express from 'express';
import bcrypt from 'bcryptjs';
import jwt from 'jsonwebtoken';
import User from '../models/User.js';
import { protect, touchAdminActivity, clearAdminActivity } from '../middleware/auth.js';

const router = express.Router();

// In-Memory Dev User Store for resilience when MongoDB Atlas is connecting
const inMemoryUsers = new Map();

// Helper to sign JWT token
const signToken = (id, email, name, role) => {
  const secret = process.env.JWT_SECRET || 'geet_studio_default_jwt_secret_2026';
  return jwt.sign({ id, email, name, role }, secret, { expiresIn: '7d' });
};

// Helper to send HTTP-only Cookie
const sendCookie = (res, token) => {
  const isProd = process.env.NODE_ENV === 'production';
  res.cookie('jwt', token, {
    httpOnly: true,
    secure: isProd,
    sameSite: isProd ? 'none' : 'lax',
    maxAge: 7 * 24 * 60 * 60 * 1000, // 7 days
  });
};

// POST /api/auth/register
router.post('/register', async (req, res, next) => {
  try {
    const { name, email, phone, password, role } = req.body;

    if (!name || !email || !phone || !password) {
      return res.status(400).json({ success: false, message: 'All fields are required.' });
    }

    // Never allow public users to register as Admin!
    let assignedRole = 'user';
    if (role === 'lead') {
      assignedRole = 'lead';
    } else if (role === 'admin') {
      return res.status(403).json({ success: false, message: 'Public registration for admin role is strictly forbidden.' });
    }

    const cleanEmail = String(email).trim().toLowerCase();

    // Check duplicate user
    let existingUser = null;
    try {
      existingUser = await User.findOne({ email: cleanEmail });
    } catch (err) {
      existingUser = inMemoryUsers.get(cleanEmail);
    }

    if (!existingUser && inMemoryUsers.has(cleanEmail)) {
      existingUser = inMemoryUsers.get(cleanEmail);
    }

    if (existingUser) {
      return res.status(400).json({ success: false, message: 'An account with this email already exists.' });
    }

    const hashedPassword = await bcrypt.hash(password, 10);
    let newUser = null;

    try {
      newUser = new User({
        name,
        email: cleanEmail,
        phone,
        password: hashedPassword,
        role: assignedRole,
      });
      await newUser.save();
    } catch (err) {
      newUser = { _id: `usr_${Date.now()}`, id: `usr_${Date.now()}`, name, email: cleanEmail, phone, password: hashedPassword, role: assignedRole };
    }

    // Save in in-memory dev store
    inMemoryUsers.set(cleanEmail, { _id: newUser._id || newUser.id, id: newUser._id || newUser.id, name, email: cleanEmail, phone, password: hashedPassword, role: assignedRole });

    const token = signToken(newUser._id || newUser.id, newUser.email, newUser.name, newUser.role);
    sendCookie(res, token);

    res.status(201).json({
      success: true,
      message: 'Account registered successfully',
      user: {
        id: newUser._id || newUser.id,
        name: newUser.name,
        email: newUser.email,
        phone: newUser.phone,
        role: newUser.role,
      },
      token,
    });
  } catch (error) {
    next(error);
  }
});

// POST /api/auth/login
router.post('/login', async (req, res, next) => {
  try {
    const { email, password } = req.body;

    if (!email || !password) {
      return res.status(400).json({ success: false, message: 'Email and password are required.' });
    }

    const cleanEmail = String(email).trim().toLowerCase();
    let user = null;

    try {
      user = await User.findOne({ email: cleanEmail });
    } catch (err) {
      user = inMemoryUsers.get(cleanEmail);
    }

    if (!user && inMemoryUsers.has(cleanEmail)) {
      user = inMemoryUsers.get(cleanEmail);
    }

    // No fallback credentials exist: an administrator session can only be obtained with a
    // password that verifies against the stored bcrypt hash for an existing account.
    if (!user) {
      return res.status(401).json({ success: false, message: 'Invalid credentials. User does not exist.' });
    }

    if (!user.password) {
      return res.status(401).json({ success: false, message: 'Invalid credentials.' });
    }

    const isMatch = await bcrypt.compare(password, user.password);
    if (!isMatch) {
      return res.status(401).json({ success: false, message: 'Invalid credentials.' });
    }

    const token = signToken(user._id || user.id, user.email, user.name, user.role);
    sendCookie(res, token);

    // Initialize administrator activity timestamp upon successful login
    if (user.role === 'admin') {
      touchAdminActivity(user._id || user.id);
    }

    res.json({
      success: true,
      message: 'Logged in successfully',
      user: {
        id: user._id || user.id,
        name: user.name,
        email: user.email,
        phone: user.phone,
        role: user.role,
      },
      token,
    });
  } catch (error) {
    next(error);
  }
});

// POST /api/auth/logout
router.post('/logout', (req, res) => {
  let token = req.cookies?.jwt;
  if (!token && req.headers.authorization && req.headers.authorization.startsWith('Bearer ')) {
    token = req.headers.authorization.split(' ')[1];
  }
  if (token) {
    try {
      const secret = process.env.JWT_SECRET || 'geet_studio_default_jwt_secret_2026';
      const decoded = jwt.verify(token, secret);
      if (decoded?.id) {
        clearAdminActivity(decoded.id);
      }
    } catch {
      // Ignore token decode error on logout
    }
  }

  const isProd = process.env.NODE_ENV === 'production';
  res.clearCookie('jwt', {
    httpOnly: true,
    secure: isProd,
    sameSite: isProd ? 'none' : 'lax',
  });
  res.json({ success: true, message: 'Logged out successfully' });
});

// POST /api/auth/heartbeat - Keep active administrator session alive during user interactions
router.post('/heartbeat', protect, (req, res) => {
  if (req.user?.role === 'admin') {
    touchAdminActivity(req.user._id || req.user.id);
    return res.json({ success: true, message: 'Admin activity refreshed.' });
  }
  res.json({ success: true, message: 'Heartbeat acknowledged.' });
});

// GET /api/auth/me
router.get('/me', (req, res, next) => {
  let token = req.cookies?.jwt;
  if (!token && req.headers.authorization && req.headers.authorization.startsWith('Bearer ')) {
    token = req.headers.authorization.split(' ')[1];
  }

  if (!token) {
    return res.json({ success: true, user: null });
  }

  return protect(req, res, () => {
    res.json({
      success: true,
      user: req.user,
    });
  });
});

export default router;
