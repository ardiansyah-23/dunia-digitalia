# Dunia Digitalia — Production-Ready Next.js 15 Platform

Platform agensi digital & edukasi teknologi terdepan berbasis di Pancoran, Jakarta Selatan.

## 🚀 Tech Stack

- **Framework**: Next.js 15 (App Router) + React 19 + TypeScript
- **Styling**: Tailwind CSS v4 + Plus Jakarta Sans Typography
- **Backend & Database**: Firebase (Firestore, Authentication, Storage)
- **Animations**: Framer Motion
- **Editor**: TipTap Rich Text Editor
- **Deployment Ready**: Vercel & Firebase Hosting compatible

---

## ⚡ Quick Start

### 1. Clone & Install Dependencies
```bash
cd dunia-digitalia
npm install
```

### 2. Environment Variables
Salin `.env.local.example` ke `.env.local` dan lengkapi dengan kredensial Firebase Anda:
```bash
cp .env.local.example .env.local
```

### 3. Run Development Server
```bash
npm run dev
```
Buka `http://localhost:3000` di browser.

---

## 📂 Project Structure

```
dunia-digitalia/
├── app/
│   ├── (public)/          # Public Pages (Home, About, Services, Portfolio, Tutorial, Articles, Contact)
│   ├── (admin)/           # Protected Admin Dashboard & Management CRUD
│   ├── globals.css        # Custom CSS Variables, Animations, Tokens
│   ├── robots.ts          # SEO Robots
│   └── sitemap.ts         # Dynamic Sitemap
├── components/
│   ├── animations/        # 3D Globe, Circuit Lines, Particle Canvas, CountUp, FadeUp
│   ├── layout/            # Navbar, Footer, PageTransition
│   ├── sections/          # Hero, Stats, Services, Portfolio, Articles, Testimonials, FAQ, Contact
│   └── admin/             # Admin Sidebar, TipTap Rich Editor, Image Upload
├── lib/
│   ├── firebase/          # Firebase Config, Firestore, Auth, Storage helpers
│   ├── constants/         # Navigation, Services, FAQ constants
│   ├── utils/             # SEO Metadata Generator, Date format, Tailwind merge
│   └── hooks/             # Auth & Firestore Hooks
└── types/                 # Full TypeScript Interfaces
```

---

## 🛡️ Production & Deployment

### Vercel Deployment
1. Import repository ke Vercel.
2. Tambahkan Environment Variables dari `.env.local`.
3. Deploy!

### Firebase Hosting Deployment
```bash
npm run build
firebase deploy
```

---

© 2026 Dunia Digitalia. All rights reserved.
