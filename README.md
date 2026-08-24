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
* **Seat Management & Concurrency**: Atomic server-side seat reservations with 2-minute expiration locks to eliminate race conditions and overbooking.
* **Pluggable Payment Gateway**: Payment abstraction layer supporting **Razorpay** and **Cashfree** with server-side HMAC webhook signature verification.
* **Transactional Email Engine**: Integrated Resend API for enrollment confirmations (with official WhatsApp group links), quote requests, community lead inquiries, and admin alerts.
* **Custom Analytics Engine**: High-resolution event tracking for visitors, sessions, page durations (active tab visibility), funnel exit sequences, and one-click Excel exporter.
* **Non-Technical Admin CMS**: Intuitive management panel for all studio operations.

---

## 🛠️ Technology Stack
* **Frontend**: React 19, Vite, React Router v7, Tailwind CSS v4, Framer Motion, Lucide React icons.
* **Backend**: Node.js, Express.js REST API.
* **Database**: MongoDB Atlas using Mongoose ORM (Strictly 9 core collections).
* **Media Storage**: Cloudinary (for hero video, gallery, instructor profiles, community portfolios).
* **Emails**: Resend API (Transactional HTML emails).
* **Payments**: Razorpay / Cashfree (with test mode & webhook verification).
* **Deployments**: Vercel (Frontend SPA) + Render (Express REST API).

---

## 🗄️ Database Schemas (9 Core Collections)

1. `users`: User authentication, roles (`user`, `lead`, `admin`), bcrypt password hashes.
2. `services`: 4 top-level service categories (`Dance`, `Music`, `Fitness`, `Events & Productions`).
3. `classes`: Combined collection for classes and workshops with embedded batches, seat counts, pricing, and instructor reference.
4. `enrollments`: Student bookings, seat reservation locks, payment statuses, and transaction IDs.
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

# Transactional Email (Resend API)
RESEND_API_KEY=re_1234567890_your_resend_api_key
EMAIL_FROM=Geet Studio <noreply@geetstudio.in>
ADMIN_EMAIL=geetdancestudio@gmail.com

# Payment Gateway (Razorpay OR Cashfree)
PAYMENT_PROVIDER=RAZORPAY
RAZORPAY_KEY_ID=rzp_test_1234567890
RAZORPAY_KEY_SECRET=your_razorpay_secret
RAZORPAY_WEBHOOK_SECRET=your_razorpay_webhook_secret
```

---

## 👤 Creating Admin & Community Lead Accounts

1. Open the app at `/login`.
2. Click **Admin** under Quick Role Login (Dev) or register with an email containing `admin@geetstudio.com`.
3. Admin credentials grant full access to `/admin` management modules.
4. To register as a Community Lead, register at `/register` selecting **Community Lead** or log in with an email containing `lead`.

---

## 💳 Payment Gateway Setup (Razorpay / Cashfree)

1. Create an account on Razorpay or Cashfree.
2. In development, use **Test Mode / Sandbox** keys (`rzp_test_...`).
3. Set your webhook URL in Razorpay Dashboard to `https://your-backend.render.com/api/payments/webhook`.
4. Configure webhook secret in `.env` (`RAZORPAY_WEBHOOK_SECRET`).

---

## ✉️ Resend Email Setup

1. Sign up at [Resend.com](https://resend.com).
2. Generate an API Key starting with `re_...`.
3. Add key to `RESEND_API_KEY` in `.env`.
4. In development without an API key, email payloads are cleanly logged to the server console without blocking booking execution.

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
5. Environment Variables: Add `MONGODB_URI`, `JWT_SECRET`, `CLOUDINARY_*`, `RESEND_API_KEY`, `RAZORPAY_*`.

---

## ✅ Production Checklist
- [x] All 73 prompt business requirements implemented & audited.
- [x] Community maintained as a top-level independent domain.
- [x] Dual theme switcher with white/black logo switching.
- [x] Automatic Asia/Kolkata (IST) date formatting.
- [x] Contextual Community query popup & General query modal.
- [x] Pluggable payment gateway abstraction layer.
- [x] Server-side 2-minute seat locks.
- [x] Transactional email integration (Resend API).
- [x] Custom analytics engine with Excel CSV export.
- [x] Verified zero-error production build (`npm run build`).
