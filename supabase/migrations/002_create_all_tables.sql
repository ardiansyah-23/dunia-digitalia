-- ============================================================
-- MIGRATION 002: Create All Required Tables for Dunia Digitalia
-- Run this SQL in Supabase Dashboard → SQL Editor
-- ============================================================

-- Drop old tables first to ensure new structure is applied cleanly
DROP TABLE IF EXISTS products CASCADE;
DROP TABLE IF EXISTS categories CASCADE;
DROP TABLE IF EXISTS orders CASCADE;
DROP TABLE IF EXISTS users CASCADE;
DROP TABLE IF EXISTS coupons CASCADE;
DROP TABLE IF EXISTS testimonials CASCADE;
DROP TABLE IF EXISTS articles CASCADE;
DROP TABLE IF EXISTS messages CASCADE;
DROP TABLE IF EXISTS services CASCADE;
DROP TABLE IF EXISTS settings CASCADE;
DROP TABLE IF EXISTS projects CASCADE;
DROP TABLE IF EXISTS gallery CASCADE;

-- -------------------------------------------------------
-- 1. PRODUCTS TABLE
-- -------------------------------------------------------
CREATE TABLE products (
  id TEXT PRIMARY KEY,
  title TEXT NOT NULL,
  slug TEXT UNIQUE,
  "shortDescription" TEXT,
  description TEXT,
  category TEXT,
  price NUMERIC NOT NULL DEFAULT 0,
  "discountPrice" NUMERIC DEFAULT 0,
  version TEXT DEFAULT 'v1.0.0',
  "demoUrl" TEXT,
  "downloadUrl" TEXT,
  thumbnail TEXT,
  screenshots TEXT[],
  features TEXT[],
  "salesCount" INT DEFAULT 0,
  rating NUMERIC DEFAULT 5.0,
  "reviewCount" INT DEFAULT 0,
  "isFeatured" BOOLEAN DEFAULT false,
  "position" INT DEFAULT 0,
  "createdAt" TEXT,
  created_at TIMESTAMPTZ DEFAULT NOW(),
  updated_at TIMESTAMPTZ DEFAULT NOW()
);

-- -------------------------------------------------------
-- 2. CATEGORIES TABLE
-- -------------------------------------------------------
CREATE TABLE categories (
  id TEXT PRIMARY KEY,
  name TEXT NOT NULL,
  slug TEXT UNIQUE,
  description TEXT,
  icon TEXT,
  color TEXT,
  "productCount" INT DEFAULT 0,
  featured BOOLEAN DEFAULT false,
  active BOOLEAN DEFAULT true,
  created_at TIMESTAMPTZ DEFAULT NOW(),
  updated_at TIMESTAMPTZ DEFAULT NOW()
);

-- -------------------------------------------------------
-- 3. ORDERS TABLE
-- -------------------------------------------------------
CREATE TABLE orders (
  id TEXT PRIMARY KEY,
  customer_name TEXT NOT NULL,
  customer_email TEXT NOT NULL,
  product_id TEXT,
  product_title TEXT,
  amount NUMERIC NOT NULL DEFAULT 0,
  payment_method TEXT,
  payment_channel TEXT,
  tripay_reference TEXT,
  status TEXT DEFAULT 'Pending',
  notes TEXT,
  created_at TIMESTAMPTZ DEFAULT NOW(),
  updated_at TIMESTAMPTZ DEFAULT NOW()
);

-- -------------------------------------------------------
-- 3b. USERS TABLE
-- -------------------------------------------------------
CREATE TABLE users (
  id TEXT PRIMARY KEY,
  name TEXT NOT NULL,
  email TEXT NOT NULL UNIQUE,
  role TEXT DEFAULT 'Customer',
  "joinedDate" TEXT,
  "ordersCount" INT DEFAULT 0,
  created_at TIMESTAMPTZ DEFAULT NOW(),
  updated_at TIMESTAMPTZ DEFAULT NOW()
);

-- -------------------------------------------------------
-- 4. COUPONS TABLE
-- -------------------------------------------------------
CREATE TABLE coupons (
  id TEXT PRIMARY KEY,
  code TEXT NOT NULL UNIQUE,
  type TEXT NOT NULL DEFAULT 'fixed',
  value NUMERIC NOT NULL DEFAULT 0,
  "usageLimit" INT DEFAULT 100,
  "usedCount" INT DEFAULT 0,
  active BOOLEAN DEFAULT true,
  expires_at TIMESTAMPTZ,
  created_at TIMESTAMPTZ DEFAULT NOW(),
  updated_at TIMESTAMPTZ DEFAULT NOW()
);

-- -------------------------------------------------------
-- 5. TESTIMONIALS TABLE
-- -------------------------------------------------------
CREATE TABLE testimonials (
  id TEXT PRIMARY KEY,
  name TEXT NOT NULL,
  role TEXT,
  company TEXT,
  content TEXT NOT NULL,
  rating INT DEFAULT 5,
  featured BOOLEAN DEFAULT true,
  avatar_url TEXT,
  created_at TIMESTAMPTZ DEFAULT NOW(),
  updated_at TIMESTAMPTZ DEFAULT NOW()
);

-- -------------------------------------------------------
-- 6. ARTICLES TABLE
-- -------------------------------------------------------
CREATE TABLE articles (
  id TEXT PRIMARY KEY,
  title TEXT NOT NULL,
  slug TEXT UNIQUE,
  excerpt TEXT,
  content TEXT,
  cover_image TEXT,
  category TEXT DEFAULT 'Tutorial',
  author TEXT DEFAULT 'Admin',
  published BOOLEAN DEFAULT false,
  featured BOOLEAN DEFAULT false,
  views INT DEFAULT 0,
  created_at TIMESTAMPTZ DEFAULT NOW(),
  updated_at TIMESTAMPTZ DEFAULT NOW()
);

-- -------------------------------------------------------
-- 7. MESSAGES TABLE (Contact Form Submissions)
-- -------------------------------------------------------
CREATE TABLE messages (
  id TEXT PRIMARY KEY,
  name TEXT NOT NULL,
  email TEXT NOT NULL,
  phone TEXT,
  subject TEXT,
  message TEXT NOT NULL,
  read BOOLEAN DEFAULT false,
  replied BOOLEAN DEFAULT false,
  created_at TIMESTAMPTZ DEFAULT NOW(),
  updated_at TIMESTAMPTZ DEFAULT NOW()
);

-- -------------------------------------------------------
-- 8. SERVICES TABLE (Jasa Web)
-- -------------------------------------------------------
CREATE TABLE services (
  id TEXT PRIMARY KEY,
  title TEXT NOT NULL,
  "startingPrice" NUMERIC NOT NULL DEFAULT 0,
  description TEXT,
  features TEXT[],
  "estimatedDays" TEXT DEFAULT '3 - 5 Hari',
  active BOOLEAN DEFAULT true,
  created_at TIMESTAMPTZ DEFAULT NOW(),
  updated_at TIMESTAMPTZ DEFAULT NOW()
);

-- -------------------------------------------------------
-- 9. SETTINGS TABLE (Site Configuration)
-- -------------------------------------------------------
CREATE TABLE settings (
  id TEXT PRIMARY KEY DEFAULT 'main',
  "siteName" TEXT DEFAULT 'Dunia Digitalia',
  tagline TEXT,
  email TEXT,
  phone TEXT,
  address TEXT,
  "workingHours" TEXT,
  "tripayMerchantCode" TEXT,
  "tripayMode" TEXT DEFAULT 'sandbox',
  logo_url TEXT,
  og_image TEXT,
  created_at TIMESTAMPTZ DEFAULT NOW(),
  updated_at TIMESTAMPTZ DEFAULT NOW()
);

-- -------------------------------------------------------
-- 10. PROJECTS / PORTFOLIO TABLE
-- -------------------------------------------------------
CREATE TABLE projects (
  id TEXT PRIMARY KEY,
  title TEXT NOT NULL,
  description TEXT,
  category TEXT,
  tags TEXT[],
  images TEXT[],
  demo_url TEXT,
  featured BOOLEAN DEFAULT false,
  active BOOLEAN DEFAULT true,
  created_at TIMESTAMPTZ DEFAULT NOW(),
  updated_at TIMESTAMPTZ DEFAULT NOW()
);

-- -------------------------------------------------------
-- 11. GALLERY TABLE
-- -------------------------------------------------------
CREATE TABLE gallery (
  id TEXT PRIMARY KEY,
  title TEXT,
  description TEXT,
  image_url TEXT NOT NULL,
  category TEXT,
  featured BOOLEAN DEFAULT false,
  created_at TIMESTAMPTZ DEFAULT NOW(),
  updated_at TIMESTAMPTZ DEFAULT NOW()
);

-- ============================================================
-- DISABLE ROW LEVEL SECURITY (for admin-only tables)
-- This allows full read/write access from the app
-- ============================================================
ALTER TABLE products DISABLE ROW LEVEL SECURITY;
ALTER TABLE categories DISABLE ROW LEVEL SECURITY;
ALTER TABLE orders DISABLE ROW LEVEL SECURITY;
ALTER TABLE users DISABLE ROW LEVEL SECURITY;
ALTER TABLE coupons DISABLE ROW LEVEL SECURITY;
ALTER TABLE testimonials DISABLE ROW LEVEL SECURITY;
ALTER TABLE articles DISABLE ROW LEVEL SECURITY;
ALTER TABLE messages DISABLE ROW LEVEL SECURITY;
ALTER TABLE services DISABLE ROW LEVEL SECURITY;
ALTER TABLE settings DISABLE ROW LEVEL SECURITY;
ALTER TABLE projects DISABLE ROW LEVEL SECURITY;
ALTER TABLE gallery DISABLE ROW LEVEL SECURITY;

-- ============================================================
-- INSERT DEFAULT SETTINGS ROW
-- ============================================================
INSERT INTO settings (id, "siteName", tagline, email, phone, address, "workingHours", "tripayMerchantCode", "tripayMode")
VALUES (
  'main',
  'Dunia Digitalia',
  'Digital Marketplace & Web Development Agency',
  'hello@duniadigitalia.com',
  '+62 812 3456 7890',
  'Pancoran, Jakarta Selatan, DKI Jakarta, Indonesia',
  'Senin - Jumat, 09.00 - 18.00 WIB',
  'T12345',
  'sandbox'
)
ON CONFLICT (id) DO NOTHING;

-- ============================================================
-- INSERT DEFAULT USERS
-- ============================================================
INSERT INTO users (id, name, email, role, "joinedDate", "ordersCount")
VALUES 
  ('1', 'Admin Utama', 'admin@duniadigitalia.com', 'Super Admin', '1 Jan 2026', 0),
  ('2', 'Budi Santoso', 'budi@example.com', 'Customer', '15 Jan 2026', 3),
  ('3', 'Siti Rahma', 'siti@example.com', 'Customer', '20 Jan 2026', 1)
ON CONFLICT (id) DO NOTHING;

-- ============================================================
-- STORAGE BUCKETS SETUP & POLICIES
-- ============================================================
INSERT INTO storage.buckets (id, name, public)
VALUES ('uploads', 'uploads', true)
ON CONFLICT (id) DO NOTHING;

-- Storage policies for uploads
DROP POLICY IF EXISTS "Public Access" ON storage.objects;
CREATE POLICY "Public Access" ON storage.objects FOR ALL USING (bucket_id = 'uploads') WITH CHECK (bucket_id = 'uploads');
