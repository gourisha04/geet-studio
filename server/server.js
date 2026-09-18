import express from 'express';
import cors from 'cors';
import cookieParser from 'cookie-parser';
import dotenv from 'dotenv';
import { connectDB } from './config/db.js';
import { validateEnv } from './config/env.js';
import { errorHandler } from './middleware/errorHandler.js';
import { rateLimiter } from './middleware/rateLimiter.js';
import { seedAdminUser } from './utils/seedAdmin.js';

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
import servicesRoutes from './routes/services.routes.js';

dotenv.config({ path: './server/.env' });
dotenv.config();
validateEnv();

const app = express();
const PORT = process.env.PORT || 5000;
const isProduction = process.env.NODE_ENV === 'production';

// Rate limiting is applied per client IP, so Express must be able to see the real visitor
// address. Managed hosts (Render / Railway) and self-hosted nginx terminate the connection and
// forward it, so trusting one hop makes req.ip the visitor's address instead of the proxy's.
// Without this, every visitor shares one rate-limit bucket, which normal traffic exhausts and
// then blocks everyone. Override with TRUST_PROXY_HOPS (0 = API exposed directly, 2+ = CDN
// in front of the proxy).
app.set('trust proxy', Number(process.env.TRUST_PROXY_HOPS ?? (isProduction ? 1 : 0)));

// Initialize Database Connection and Admin Seed
// The admin seed only runs against a live database connection, so a failed
// Atlas handshake can never produce a partial/half-seeded administrator.
connectDB().then((isConnected) => {
  if (isConnected) {
    seedAdminUser();
  }
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

// CORS allow-list. Origins must be listed explicitly — a fallback that accepts anything would let
// any website issue credentialed requests with a signed-in visitor's session cookie.
// Configured through the environment (see server/.env.example):
//   CLIENT_URL            -> primary frontend origin
//   CORS_ALLOWED_ORIGINS  -> optional extra origins, comma-separated (previews, staging, domains)
const normalizeOrigin = (value) => String(value).trim().replace(/\/+$/, '');

const allowedOrigins = [
  process.env.CLIENT_URL,
  process.env.CORS_ALLOWED_ORIGINS,
  // Defaults so local development and the production Vercel frontend work out of the box.
  'http://localhost:5173',
  'http://localhost:3000',
  'https://geet-studio.vercel.app',
]
  .filter(Boolean)
  .flatMap((value) => String(value).split(','))
  .map(normalizeOrigin)
  .filter(Boolean);

app.use(
  cors({
    origin: (origin, callback) => {
      // No Origin header (same-origin navigation, curl, server-to-server) is not a CORS request.
      if (!origin) {
        callback(null, true);
        return;
      }

      const requestedOrigin = normalizeOrigin(origin);

      if (allowedOrigins.includes(requestedOrigin)) {
        callback(null, requestedOrigin);
        return;
      }

      // Denied: no CORS headers are emitted, so the browser blocks the response.
      callback(null, false);
    },
    credentials: true,
  })
);

const authLoginLimit = isProduction ? 10 : 30;
const authLoginWindow = 15 * 60 * 1000;

// Visitor page-view telemetry is a public POST that the browser fires automatically on every page
// load / navigation (sendBeacon), so it needs its own generous bucket. It must never consume the
// strict write budget below — otherwise normal browsing exhausts it. Still rate-limited.
const telemetryLimit = 600;
const telemetryWindow = 15 * 60 * 1000;

// Strict budget for write / mutation traffic (enquiries, enrollments, admin saves, uploads).
const writeLimit = 200;
const writeWindow = 15 * 60 * 1000;

// Public reads must never be blocked by the mutation limiter.
const isReadMethod = (method) => method === 'GET' || method === 'HEAD' || method === 'OPTIONS';
// Full request path with the query string stripped (`req.path` would be mount-relative here).
const requestPath = (req) => (req.originalUrl || req.url || '').split('?')[0];
const isLoginRoute = (req) => requestPath(req) === '/api/auth/login';
const isTelemetryRoute = (req) => requestPath(req) === '/api/analytics/log';

// Login has its own brute-force limit; session checks and public API traffic do not consume it.
app.use('/api/auth/login', rateLimiter(authLoginLimit, authLoginWindow, { namespace: 'auth-login' }));

// Public telemetry beacon: separate bucket, so page views never spend the write budget.
app.use('/api/analytics/log', rateLimiter(telemetryLimit, telemetryWindow, { namespace: 'analytics-telemetry' }));

// All remaining API traffic. GET/HEAD/OPTIONS reads are exempt, so only write / mutation
// routes consume the strict budget below. Login and telemetry are already counted above.
app.use('/api', rateLimiter(writeLimit, writeWindow, {
  namespace: 'api-write',
  skip: (req) => isReadMethod(req.method) || isLoginRoute(req) || isTelemetryRoute(req),
}));

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
app.use('/api/services', servicesRoutes);
app.use('/api', requestsRoutes);
app.use('/api', uploadRoutes);

// 4. Central Error Handler Middleware (Phase 1)
app.use(errorHandler);

app.listen(PORT, () => {
  console.log(`🚀 Geet Studio Express REST Server running on port ${PORT}`);
  console.log(`🌍 Timezone locked to Asia/Kolkata (IST)`);
});
