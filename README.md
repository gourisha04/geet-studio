# GEET STUDIO — Full-Stack Web Application & Management Platform

**Location**: Indore, Madhya Pradesh, India  
**Phone**: +91 87704 09447  
**Email**: geetdancestudio@gmail.com  
**Instagram**: [@the_geetstudio](https://www.instagram.com/the_geetstudio/)

---

## 📌 Project Overview
Geet Studio is a production-ready, full-stack website and management platform designed for a premier Indian dance, music, fitness, and production studio based in Indore.

The platform includes:
* **Premium Public Experience**: Cinematic visual design, dark/light theme switcher with dynamic logo selection, Asia/Kolkata (IST) timezone automatic date calculations, and interactive welcome intro animation.
* **4 Service Categories**: Dance, Music, Fitness, and Events & Productions.
* **Independent Community Domain**: Verified directory for 13 categories of artists, vendors, DJs, anchors, singers, and event leads with a private middleman quote request system.
* **Streamlined Class Enrollment Requests**: Direct online enrollment request submission (Name, Email, Phone, Age, Message) with instant MongoDB storage.
* **Custom Analytics Engine**: High-resolution event tracking for visitors, sessions, page durations (active tab visibility), funnel exit sequences, and one-click Excel exporter.
* **Non-Technical Admin CMS**: Intuitive management panel for all studio operations and enrollment request status management (NEW, CONTACTED, CONFIRMED, CLOSED).

---

## 🛠️ Technology Stack
* **Frontend**: React 19, Vite, React Router v7, Tailwind CSS v4, Framer Motion, Lucide React icons.
* **Backend**: Node.js, Express.js REST API.
* **Database**: MongoDB Atlas using Mongoose ORM (9 core collections).
* **Media Storage**: Cloudinary (for hero video, gallery, instructor profiles, community portfolios).
* **Deployments**: Vercel (Frontend SPA) + Render (Express REST API).

---

## 🗄️ Database Schemas (9 Core Collections)

1. `users`: User authentication, roles (`user`, `lead`, `admin`), bcrypt password hashes.
2. `services`: 4 top-level service categories (`Dance`, `Music`, `Fitness`, `Events & Productions`).
3. `classes`: Combined collection for classes and workshops with embedded schedules, seat counts, pricing, and instructor reference.
4. `enrollments`: Student enrollment requests, contact details, notes, and request status (`NEW`, `CONTACTED`, `CONFIRMED`, `CLOSED`).
5. `events`: Showcase and workshop event details (`UPCOMING` or `PAST`).
6. `instructors`: Teacher bios, specializations, social links, and media.
7. `community_leads`: Registered artist/vendor profiles with approval status (`PENDING`, `APPROVED`, `REJECTED`) and `pendingChanges` staging.
8. `community_requests`: Client service inquiries connecting clients to community leads without exposing private lead contact info.
9. `analytics_events`: Central event log tracking page views, entries, exits, tab visibility durations, and click funnels.

---

## 🚀 Local Setup & Development

### 1. Prerequisites
* Node.js v18+ or v20+
* npm or yarn

### 2. Frontend Setup
```bash
# Install frontend dependencies
npm install

# Start Vite development server
npm run dev
```
The app will run locally at `http://localhost:5173/` or `http://localhost:5174/`.

### 3. Backend Setup
```bash
cd server
npm install
npm run dev
```
The Express REST API will run on `http://localhost:5000/`.

---

## 🔑 Environment Variables Configuration

Copy `.env.example` to `.env` in both the root directory and the `server/` directory.

```env
# Server Configuration
PORT=5000
NODE_ENV=development
CLIENT_URL=http://localhost:5173

# MongoDB Atlas Connection
MONGODB_URI=mongodb+srv://username:password@cluster.mongodb.net/geet_studio?retryWrites=true&w=majority

# Authentication Secrets
JWT_SECRET=your_super_secret_jwt_key_here
COOKIE_SECRET=your_cookie_signing_secret_here

# Cloudinary Media Storage
CLOUDINARY_CLOUD_NAME=your_cloudinary_cloud_name
CLOUDINARY_API_KEY=your_cloudinary_api_key
CLOUDINARY_API_SECRET=your_cloudinary_api_secret

ADMIN_EMAIL=geetdancestudio@gmail.com
```

---

## 👤 Creating Admin & Community Lead Accounts

1. **Administrator:** provisioned automatically on the backend's first boot from the `ADMIN_EMAIL` +
   `ADMIN_SEED_PASSWORD` environment variables. The seed is idempotent — an existing administrator's
   password is never modified or reset.
2. Sign in at `/login` with those credentials. Admin access grants the `/admin` management modules.
3. **Rotating the admin password:** run the one-time operator script from the `server/` directory:

   ```bash
   ADMIN_EMAIL=<admin email> ADMIN_SEED_PASSWORD=<new password> npm run admin:set-password
   ```

   The password is read from the environment only (never from CLI arguments) and is never logged.
4. **Community Lead:** register at `/register` selecting **Community Lead**, then sign in at `/login`.

---

---

## 🌐 Production Deployment Guide

### Vercel (Frontend SPA)
1. Push workspace repository to GitHub.
2. Import project into Vercel.
3. Set Environment Variable: `VITE_API_URL=https://your-backend.render.com`.
4. Deploy.

### Render (Express Backend)
1. Create a Web Service on Render connecting your GitHub repository.
2. Root Directory: `server`.
3. Build Command: `npm install`.
4. Start Command: `npm start`.
5. Environment Variables: Add `MONGODB_URI`, `JWT_SECRET`, and `CLOUDINARY_*`.

---

## ✅ Production Checklist
- [x] All prompt business requirements implemented & audited.
- [x] Community maintained as a top-level independent domain.
- [x] Dual theme switcher with white/black logo switching.
- [x] Automatic Asia/Kolkata (IST) date formatting.
- [x] Contextual Community query popup & General query modal.
- [x] Direct Enrollment Request system.
- [x] Custom analytics engine with Excel CSV export.
- [x] Verified zero-error production build (`npm run build`).
