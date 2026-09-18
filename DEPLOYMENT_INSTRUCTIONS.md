# Geet Studio — Production Deployment & Environment Guide

This guide details the step-by-step procedure for deploying the **Geet Studio** web application to production.

---

## 1. Production Architecture Overview

The system follows a decoupled Client-Server architecture:
- **Frontend**: Single Page Application (React + Vite) hosted on **Vercel** or Netlify.
- **Backend API**: Node.js & Express REST API hosted on **Render**, **Railway**, or a VPS.
- **Database**: **MongoDB Atlas** managed database cluster.

---

## 2. Environment Configuration

> ⚠️ **CRITICAL SECURITY NOTE**: Never commit actual database connection strings, JWT secrets, passwords, or production API keys to version control. Always configure environment variables securely within your hosting provider's dashboard.

### Local vs. Production Configuration Summary

| Setting | Local Development | Production Environment |
|---|---|---|
| **Backend PORT** | `5000` | Defined dynamically by cloud host (`process.env.PORT`) |
| **MongoDB URI** | Local MongoDB (`mongodb://127.0.0.1:27017/geet_studio`) | MongoDB Atlas Connection String (`mongodb+srv://...`) |
| **Frontend API URL** | `http://localhost:5000` | Production API domain (e.g. `https://api.geetstudio.com`) |
| **Backend CLIENT_URL** | `http://localhost:5173` | Production Frontend domain (e.g. `https://geetstudio.com`) |
| **Admin Setup** | Local test environment | Set via `ADMIN_EMAIL` & `ADMIN_SEED_PASSWORD` env vars |

---

### Backend Environment Setup (`server/.env` / Cloud Host Dashboard)

Configure the following environment variables in your backend host dashboard (Render/Railway):

```env
NODE_ENV=production
PORT=5000
MONGODB_URI=mongodb+srv://<db_user>:<db_password>@cluster.mongodb.net/geet_studio?retryWrites=true&w=majority
JWT_SECRET=<strong_random_jwt_secret_min_32_chars>
COOKIE_SECRET=<strong_random_cookie_secret_min_32_chars>
CLIENT_URL=https://<your-app-name>.vercel.app
ADMIN_EMAIL=<your_secure_admin_email>
ADMIN_SEED_PASSWORD=<your_secure_admin_password>
```

---

### Frontend Environment Setup (`.env` / Vercel Environment Variables)

Configure the following environment variable in Vercel:

```env
VITE_API_BASE_URL=https://<your-backend-api-name>.onrender.com
```

---

## 3. Secure Admin Account Provisioning

In production environments:
1. Set `ADMIN_EMAIL` and `ADMIN_SEED_PASSWORD` in your cloud backend environment variables before the initial server start.
2. When the backend initializes for the first time, it checks for an existing admin account. If none exists, it securely creates the initial administrator using these configured credentials.
3. Once created, manage admin access securely via the protected Admin Dashboard (`/admin`).
4. **Do not** run development wiping scripts or seed scripts on a production database containing active user data.

---

## 4. Deploying Backend API (Render / Railway)

1. Connect your repository to Render or Railway.
2. Specify the Root Directory as `server`.
3. Set **Build Command**: `npm install`
4. Set **Start Command**: `node server.js`
5. Configure all required Backend Environment Variables in the service settings.
6. Verify CORS settings: The backend natively verifies origin against `CLIENT_URL` and `*.vercel.app` domains.

---

## 5. Deploying Frontend App (Vercel)

1. Connect your repository to Vercel.
2. Select **Vite** framework preset.
3. Set **Build Command**: `npm run build`
4. Set **Output Directory**: `dist`
5. Configure `VITE_API_BASE_URL` with your live backend API URL.
6. The root `vercel.json` rewrite file ensures single-page application (SPA) routing works seamlessly for all paths (`/classes`, `/community`, `/instructors`, `/admin`, etc.).

---

## 6. Pre-Flight & Safe Production Checklist

- [ ] **Secrets Audit**: Confirmed no `.env` files with production secrets are tracked in Git repository.
- [ ] **MongoDB Atlas**: Created production database user with strong password & configured IP access list.
- [ ] **Admin Account**: Configured secure `ADMIN_EMAIL` & `ADMIN_SEED_PASSWORD` environment variables.
- [ ] **CORS Verification**: Confirmed `CLIENT_URL` matches the exact frontend production domain.
- [ ] **HTTPS / Cookies**: Ensure frontend and backend are both served over HTTPS.
- [ ] **API Health Verification**: Navigated to `https://<backend_url>/api/health` and received `{"status": "OK"}`.
- [ ] **Public Routes**: Verified direct navigation & browser refresh across `/`, `/classes`, `/community`, `/instructors`, `/contact`, `/admin`.
- [ ] **Enrollment & Form Submission**: Tested public class enrollment and contact form query persistence to MongoDB.
