import express from 'express';
import cors from 'cors';
import cookieParser from 'cookie-parser';
import dotenv from 'dotenv';
import { connectDB } from './config/db.js';
import { validateEnv } from './config/env.js';
import { errorHandler } from './middleware/errorHandler.js';
import { rateLimiter } from './middleware/rateLimiter.js';
import { seedAdminUser } from './utils/seedAdmin.js';
import { PaymentProvider } from './services/paymentProvider.js';

// Route Imports
import authRoutes from './routes/auth.routes.js';
import classesRoutes from './routes/classes.routes.js';
import enrollmentsRoutes from './routes/enrollments.routes.js';
import communityRoutes from './routes/community.routes.js';
import requestsRoutes from './routes/requests.routes.js';
import eventsRoutes from './routes/events.routes.js';
import instructorsRoutes from './routes/instructors.routes.js';
import galleryRoutes from './routes/gallery.routes.js';
import analyticsRoutes from './routes/analytics.routes.js';
import uploadRoutes from './routes/upload.routes.js';
import adminRoutes from './routes/admin.routes.js';

dotenv.config({ path: './server/.env' });
dotenv.config();
validateEnv();

const app = express();
const PORT = process.env.PORT || 5000;

// Initialize Database Connection, Admin Seed, and 5-Minute Seat Hold Expiration Worker
connectDB().then(() => {
  seedAdminUser();
  // 1. Immediate startup sweep for any enrollments expired while server was offline
  PaymentProvider.cleanupExpiredEnrollments().catch((e) => console.warn('Startup cleanup note:', e.message));

  // 2. Production Recurring Background Worker (runs every 60 seconds)
  setInterval(() => {
    PaymentProvider.cleanupExpiredEnrollments().catch((e) => console.warn('Worker cleanup note:', e.message));
  }, 60 * 1000);
});

// Security & Core Middlewares (Phase 17)
app.use((req, res, next) => {
  res.setHeader('X-Content-Type-Options', 'nosniff');
  res.setHeader('X-Frame-Options', 'DENY');
  res.setHeader('X-XSS-Protection', '1; mode=block');
  next();
});

app.use(express.json({ limit: '10mb' }));
app.use(express.urlencoded({ extended: true, limit: '10mb' }));
app.use(cookieParser(process.env.COOKIE_SECRET || 'geet_cookie_secret_2026'));

const allowedOrigins = [
  process.env.CLIENT_URL,
  'https://geet-studio.vercel.app',
  'http://localhost:5173',
  'http://localhost:3000',
].filter(Boolean);

app.use(
  cors({
    origin: (origin, callback) => {
      if (!origin || allowedOrigins.includes(origin) || origin.endsWith('.vercel.app')) {
        callback(null, true);
      } else {
        callback(null, true);
      }
    },
    credentials: true,
  })
);

app.use('/api', rateLimiter(200, 15 * 60 * 1000));

// Root Health & Status Route
app.get('/', (req, res) => {
  res.json({
    status: 'OK',
    service: 'Geet Studio API Server',
    message: 'Geet Studio REST API Backend is live and healthy 🚀',
    health: '/api/health',
    timestamp: new Date().toISOString(),
    timezone: 'Asia/Kolkata',
  });
});

// 1. Health-Check Endpoint (Phase 1)
app.get('/api/health', (req, res) => {
  res.json({
    status: 'OK',
    service: 'Geet Studio Full-Stack REST API',
    timestamp: new Date().toISOString(),
    timezone: 'Asia/Kolkata',
  });
});

// 2. Dynamic Website Content Update Indicator (Phase 14)
app.get('/api/updates/latest', (req, res) => {
  res.json({
    latestUpdateDate: new Date().toISOString(),
    status: 'UPDATED TODAY',
    timezone: 'Asia/Kolkata',
  });
});

// 3. API Routers
app.use('/api/auth', authRoutes);
app.use('/api/classes', classesRoutes);
app.use('/api/enrollments', enrollmentsRoutes);
app.use('/api/community', communityRoutes);
app.use('/api/events', eventsRoutes);
app.use('/api/instructors', instructorsRoutes);
app.use('/api/gallery', galleryRoutes);
app.use('/api/analytics', analyticsRoutes);
app.use('/api/admin', adminRoutes);
app.use('/api', requestsRoutes);
app.use('/api', uploadRoutes);

// 4. Central Error Handler Middleware (Phase 1)
app.use(errorHandler);

app.listen(PORT, () => {
  console.log(`🚀 Geet Studio Express REST Server running on port ${PORT}`);
  console.log(`🌍 Timezone locked to Asia/Kolkata (IST)`);
  console.log(`⏱️ 5-Minute Payment-Pending Expiration Worker Active (60s Sweep)`);
});
