-- ============================================================
-- MIGRATION 002: Create All Required Tables for Dunia Digitalia
-- Run this SQL in Supabase Dashboard → SQL Editor
-- ============================================================

-- -------------------------------------------------------
-- 1. PRODUCTS TABLE
-- -------------------------------------------------------
CREATE TABLE IF NOT EXISTS products (
  id TEXT PRIMARY KEY,
  name TEXT NOT NULL,
  slug TEXT UNIQUE,
  description TEXT,
  price NUMERIC NOT NULL DEFAULT 0,
  original_price NUMERIC,
  category TEXT,
  subcategory TEXT,
  tags TEXT[],
  images TEXT[],
  demo_url TEXT,
  features TEXT[],
  tech_stack TEXT[],
  rating NUMERIC DEFAULT 5,
  review_count INT DEFAULT 0,
  download_count INT DEFAULT 0,
  featured BOOLEAN DEFAULT false,
  active BOOLEAN DEFAULT true,
  created_at TIMESTAMPTZ DEFAULT NOW(),
  updated_at TIMESTAMPTZ DEFAULT NOW()
);

-- -------------------------------------------------------
-- 2. CATEGORIES TABLE
-- -------------------------------------------------------
CREATE TABLE IF NOT EXISTS categories (
  id TEXT PRIMARY KEY,
  name TEXT NOT NULL,
  slug TEXT UNIQUE,
  description TEXT,
  icon TEXT,
  color TEXT,
  count INT DEFAULT 0,
  featured BOOLEAN DEFAULT false,
  active BOOLEAN DEFAULT true,
  created_at TIMESTAMPTZ DEFAULT NOW(),
  updated_at TIMESTAMPTZ DEFAULT NOW()
);

-- -------------------------------------------------------
-- 3. ORDERS TABLE
-- -------------------------------------------------------
CREATE TABLE IF NOT EXISTS orders (
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
-- 4. COUPONS TABLE
-- -------------------------------------------------------
CREATE TABLE IF NOT EXISTS coupons (
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
CREATE TABLE IF NOT EXISTS testimonials (
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
CREATE TABLE IF NOT EXISTS articles (
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
CREATE TABLE IF NOT EXISTS messages (
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
CREATE TABLE IF NOT EXISTS services (
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
DROP TABLE IF EXISTS settings;
CREATE TABLE settings (
  id TEXT PRIMARY KEY DEFAULT 'main',
  site_name TEXT DEFAULT 'Dunia Digitalia',
  tagline TEXT,
  email TEXT,
  phone TEXT,
  address TEXT,
  working_hours TEXT,
  tripay_merchant_code TEXT,
  tripay_mode TEXT DEFAULT 'sandbox',
  hero_title TEXT,
  hero_subtitle TEXT,
  about_text TEXT,
  logo_url TEXT,
  og_image TEXT,
  created_at TIMESTAMPTZ DEFAULT NOW(),
  updated_at TIMESTAMPTZ DEFAULT NOW()
);

-- -------------------------------------------------------
-- 10. PROJECTS / PORTFOLIO TABLE
-- -------------------------------------------------------
CREATE TABLE IF NOT EXISTS projects (
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
CREATE TABLE IF NOT EXISTS gallery (
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
INSERT INTO settings (id, site_name, tagline, email, phone, address, working_hours, tripay_merchant_code, tripay_mode)
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

