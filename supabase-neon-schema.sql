-- ==============================================================================
-- Mohamed Tamer Portfolio - Supabase & Neon PostgreSQL Database Schema
-- Run this in your Supabase SQL Editor or Neon SQL Console to set up your tables.
-- ==============================================================================

-- 1. Projects table
CREATE TABLE IF NOT EXISTS portfolio_projects (
  id TEXT PRIMARY KEY,
  codename TEXT NOT NULL,
  title TEXT NOT NULL,
  tagline TEXT NOT NULL,
  description TEXT NOT NULL,
  tags TEXT[] NOT NULL DEFAULT '{}',
  role TEXT NOT NULL,
  status TEXT NOT NULL DEFAULT 'Deployed',
  image TEXT,
  fit TEXT DEFAULT 'cover',
  links JSONB NOT NULL DEFAULT '[]'::jsonb,
  display_order INTEGER DEFAULT 0,
  created_at TIMESTAMPTZ DEFAULT NOW(),
  updated_at TIMESTAMPTZ DEFAULT NOW()
);

-- 2. Certificates table
CREATE TABLE IF NOT EXISTS portfolio_certificates (
  id TEXT PRIMARY KEY,
  title TEXT NOT NULL,
  issuer TEXT NOT NULL,
  year TEXT NOT NULL,
  image TEXT,
  display_order INTEGER DEFAULT 0,
  created_at TIMESTAMPTZ DEFAULT NOW(),
  updated_at TIMESTAMPTZ DEFAULT NOW()
);

-- 3. Settings table (Profile, Stats, About Lines)
CREATE TABLE IF NOT EXISTS portfolio_settings (
  id TEXT PRIMARY KEY DEFAULT 'main',
  profile JSONB NOT NULL DEFAULT '{}'::jsonb,
  stats JSONB NOT NULL DEFAULT '[]'::jsonb,
  about_lines JSONB NOT NULL DEFAULT '[]'::jsonb,
  updated_at TIMESTAMPTZ DEFAULT NOW()
);

-- 4. Analytics events (Pageviews & Link Clicks)
CREATE TABLE IF NOT EXISTS portfolio_analytics (
  id TEXT PRIMARY KEY,
  type TEXT NOT NULL, -- 'pageview' | 'click'
  label TEXT,         -- Label of the clicked link or page title
  href TEXT,          -- Target URL of the clicked link
  path TEXT DEFAULT '/',
  referrer TEXT,
  user_agent TEXT,
  screen TEXT,
  ip TEXT,
  visitor_id TEXT,
  created_at TIMESTAMPTZ DEFAULT NOW()
);

-- Indexes for fast analytics queries
CREATE INDEX IF NOT EXISTS idx_analytics_type ON portfolio_analytics(type);
CREATE INDEX IF NOT EXISTS idx_analytics_created_at ON portfolio_analytics(created_at DESC);
CREATE INDEX IF NOT EXISTS idx_analytics_href ON portfolio_analytics(href);

-- 5. Contact Messages ("who file or send email")
CREATE TABLE IF NOT EXISTS portfolio_messages (
  id TEXT PRIMARY KEY,
  name TEXT NOT NULL,
  email TEXT NOT NULL,
  service TEXT,
  message TEXT NOT NULL,
  status TEXT DEFAULT 'unread', -- 'unread' | 'read' | 'replied'
  ip TEXT,
  user_agent TEXT,
  created_at TIMESTAMPTZ DEFAULT NOW()
);

CREATE INDEX IF NOT EXISTS idx_messages_created_at ON portfolio_messages(created_at DESC);

-- 6. Admin Credentials
CREATE TABLE IF NOT EXISTS portfolio_admin (
  id TEXT PRIMARY KEY DEFAULT 'admin',
  email TEXT NOT NULL DEFAULT 'mohamed.tamer.8006@gmail.com',
  password_hash TEXT NOT NULL,
  salt TEXT NOT NULL,
  updated_at TIMESTAMPTZ DEFAULT NOW()
);

-- Enable Row Level Security (RLS) if using Supabase (Optional, can be customized)
-- If using Service Role Key on the Next.js server, it bypasses RLS securely.
ALTER TABLE portfolio_projects ENABLE ROW LEVEL SECURITY;
ALTER TABLE portfolio_certificates ENABLE ROW LEVEL SECURITY;
ALTER TABLE portfolio_settings ENABLE ROW LEVEL SECURITY;
ALTER TABLE portfolio_analytics ENABLE ROW LEVEL SECURITY;
ALTER TABLE portfolio_messages ENABLE ROW LEVEL SECURITY;
ALTER TABLE portfolio_admin ENABLE ROW LEVEL SECURITY;

-- Allow public read of projects, certificates, settings
CREATE POLICY "Public read projects" ON portfolio_projects FOR SELECT USING (true);
CREATE POLICY "Public read certificates" ON portfolio_certificates FOR SELECT USING (true);
CREATE POLICY "Public read settings" ON portfolio_settings FOR SELECT USING (true);

-- Allow public insertion of analytics and messages
CREATE POLICY "Public insert analytics" ON portfolio_analytics FOR INSERT WITH CHECK (true);
CREATE POLICY "Public insert messages" ON portfolio_messages FOR INSERT WITH CHECK (true);
