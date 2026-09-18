# Geet Studio — Codebase Architecture & Technical Overview

## 1. Overview
Geet Studio is a modern, high-performance web platform for a creative performance art, dance, music, fitness, and production studio based in Indore. The application is built as a decoupled Client-Server architecture utilizing React (Vite) on the frontend and Node.js (Express & MongoDB) on the backend.

---

## 2. Directory & File Structure

```
Geet_studio/
├── public/                     # Static public assets (images, community profile photos, studio photos)
│   ├── arpit-mahor.jpg         # Founder & Director portrait
│   ├── community member/       # Approved community member profile pictures
│   └── geet bg images/         # Studio gallery & hero background assets
├── server/                     # Express.js Backend Server
│   ├── config/                 # Database connection (db.js)
│   ├── middleware/             # Authentication & validation middleware
│   ├── models/                 # Mongoose schemas (User, Class, Workshop, Event, CommunityMember, Enrollment, Query, Instructor, Gallery)
│   ├── routes/                 # RESTful API route definitions
│   ├── services/               # Core business logic services
│   ├── utils/                  # Helper utilities & loggers
│   ├── .env                    # Backend environment variables
│   ├── clean_and_seed.js       # Production database seed script
│   ├── server.js               # Express application entry point
│   └── test_all_endpoints.js   # Automated endpoint & flow test suite
├── src/                        # React Frontend Application
│   ├── components/             # Reusable UI components
│   │   ├── admin/              # Admin dashboard panels & management components
│   │   ├── common/             # Navbar, Footer, PageHeader, Modals, Buttons
│   │   ├── home/               # Hero, ServicesSection, CommunitySection, AboutPreview, ReachUsSection, InstagramFeed
│   │   └── layout/             # Master Layout shell
│   ├── context/                # React Contexts (AuthContext, ThemeContext, AnalyticsContext)
│   ├── data/                   # Developer-managed static data (Services & Dance Styles definitions)
│   ├── pages/                  # Page components (Home, Services, Classes, Workshops, Events, Community, Instructors, Gallery, Contact, Admin)
│   ├── utils/                  # Frontend API client (api.js)
│   ├── App.jsx                 # Main application router setup
│   ├── main.jsx                # React application entry point
│   └── index.css               # Global styles & Tailwind CSS utility setup
├── package.json                # Frontend dependencies & build scripts
└── vercel.json                 # Vercel SPA routing configuration
```

---

## 3. Data Models & Database Architecture (MongoDB / Mongoose)

1. **User (`User.js`)**
   - Stores Admin & Member credentials, roles (`admin`, `member`), hashed passwords via bcrypt, and active session tokens.

2. **Class & Workshop (`Class.js`, `Workshop.js`)**
   - Represents studio offerings with schedule, instructor reference, category, capacity, price info, level, and tags.

3. **Event (`Event.js`)**
   - Details upcoming performance events, dates, venue, ticket details, and registration link/form integration.

4. **CommunityMember (`CommunityMember.js`)**
   - Represents creator profiles in the Geet Studio community.
   - Fields: Name, role, primary Art form, bio, tags, social links, `status` (`pending`, `approved`), contact phone (protected until request).

5. **Enrollment (`Enrollment.js`)**
   - Public enrollment request submission model storing participant details (name, email, phone, requested class/event/workshop ID, experience level, note, status).

6. **Query (`Query.js`)**
   - Stores contact & general query submissions from the website contact form and community popup modal.

7. **Instructor (`Instructor.js`)**
   - Founder and lead instructor profile metadata (Arpit Mahor).

8. **Gallery (`GalleryItem.js`)**
   - Media gallery items featuring dance, music, event highlights, and studio space photography.

---

## 4. API Routes Summary

- `GET /api/services` — Fetch developer-managed services.
- `GET /api/classes` — Fetch public active classes.
- `GET /api/workshops` — Fetch upcoming studio workshops.
- `GET /api/events` — Fetch studio events & showcases.
- `GET /api/community` — Fetch approved public community profiles.
- `POST /api/community/access-details` — Request contact details for a community member.
- `GET /api/instructors` — Fetch studio founder/instructor details.
- `GET /api/gallery` — Fetch gallery photos & videos.
- `POST /api/enrollments` — Submit public registration request.
- `POST /api/queries` — Submit public contact form query.
- `POST /api/auth/login` — Admin & user authentication.

---

## 5. Key Design Principles & Security
- **No Direct Payment Dependency**: Public registration and inquiry pipeline without third-party payment gateways.
- **Dynamic Community Feed**: Real-time aggregation of approved members from MongoDB.
- **Privacy Protection**: Phone numbers of community members remain masked until explicitly requested through the access details modal.
- **Responsive Layouts**: Full mobile, tablet, and desktop adaptive design using CSS flex/grid and Tailwind breakpoint utilities.
