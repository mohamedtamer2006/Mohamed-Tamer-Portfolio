import fs from 'fs'
import path from 'path'
import { neon } from '@neondatabase/serverless'
import { createClient, SupabaseClient } from '@supabase/supabase-js'
import {
  projects as defaultProjects,
  certificates as defaultCertificates,
  stats as defaultStats,
  aboutLines as defaultAboutLines,
  profile as defaultProfile,
  type Certificate,
} from './portfolio-data'
import { hashPassword } from './auth'

export type ProjectItem = {
  codename: string
  title: string
  tagline: string
  description: string
  tags: string[]
  role: string
  status: string
  image: string | null
  fit?: 'cover' | 'contain'
  links: { label: string; href: string; kind: 'code' | 'live' }[]
}

export type AnalyticsEvent = {
  id: string
  type: 'pageview' | 'click'
  label?: string
  href?: string
  path?: string
  referrer?: string
  user_agent?: string
  screen?: string
  ip?: string
  visitor_id?: string
  created_at: string
}

export type ContactMessage = {
  id: string
  name: string
  email: string
  service: string
  message: string
  status: 'unread' | 'read' | 'replied'
  ip?: string
  user_agent?: string
  created_at: string
}

export type PortfolioStore = {
  projects: ProjectItem[]
  certificates: Certificate[]
  stats: { value: string; label: string }[]
  aboutLines: { tag: string; text: string }[]
  profile: typeof defaultProfile
  analytics: AnalyticsEvent[]
  messages: ContactMessage[]
  admin: {
    email: string
    passwordHash: string
    salt: string
  }
}

// File path for local JSON store fallback
const LOCAL_STORE_PATH = path.join(process.cwd(), 'data', 'portfolio-store.json')

// Get database connection mode
export function getDatabaseStatus(): {
  mode: 'supabase' | 'neon' | 'local'
  configured: boolean
  message: string
} {
  if (process.env.NEXT_PUBLIC_SUPABASE_URL && (process.env.SUPABASE_SERVICE_ROLE_KEY || process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY)) {
    return {
      mode: 'supabase',
      configured: true,
      message: 'Connected to Supabase PostgreSQL',
    }
  }
  if (process.env.DATABASE_URL) {
    return {
      mode: 'neon',
      configured: true,
      message: 'Connected to Neon Serverless PostgreSQL',
    }
  }
  return {
    mode: 'local',
    configured: false,
    message: 'Running on Persistent Local JSON Store. Add Supabase or Neon in settings to enable cloud database.',
  }
}

// -------------------------------------------------------------
// LOCAL STORE HELPERS
// -------------------------------------------------------------
function getInitialStore(): PortfolioStore {
  const defaultAdminPassword = process.env.ADMIN_PASSWORD || 'StarkSanctum2026!'
  const { hash, salt } = hashPassword(defaultAdminPassword)

  return {
    projects: [...defaultProjects],
    certificates: [...defaultCertificates],
    stats: [...defaultStats],
    aboutLines: [...defaultAboutLines],
    profile: { ...defaultProfile },
    analytics: [],
    messages: [],
    admin: {
      email: 'mohamed.tamer.8006@gmail.com',
      passwordHash: hash,
      salt: salt,
    },
  }
}

export function readLocalStore(): PortfolioStore {
  try {
    if (!fs.existsSync(LOCAL_STORE_PATH)) {
      const initial = getInitialStore()
      fs.mkdirSync(path.dirname(LOCAL_STORE_PATH), { recursive: true })
      fs.writeFileSync(LOCAL_STORE_PATH, JSON.stringify(initial, null, 2), 'utf-8')
      return initial
    }
    const data = fs.readFileSync(LOCAL_STORE_PATH, 'utf-8')
    const parsed = JSON.parse(data)
    return {
      ...getInitialStore(),
      ...parsed,
    }
  } catch (error) {
    console.error('Error reading local store:', error)
    return getInitialStore()
  }
}

export function writeLocalStore(store: PortfolioStore): void {
  try {
    fs.mkdirSync(path.dirname(LOCAL_STORE_PATH), { recursive: true })
    fs.writeFileSync(LOCAL_STORE_PATH, JSON.stringify(store, null, 2), 'utf-8')
  } catch (error) {
    console.error('Error writing local store:', error)
  }
}

// -------------------------------------------------------------
// SUPABASE CLIENT
// -------------------------------------------------------------
function getSupabaseClient(): SupabaseClient | null {
  const url = process.env.NEXT_PUBLIC_SUPABASE_URL
  const key = process.env.SUPABASE_SERVICE_ROLE_KEY || process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY
  if (url && key) {
    return createClient(url, key)
  }
  return null
}

// -------------------------------------------------------------
// NEON CLIENT
// -------------------------------------------------------------
function getNeonSql() {
  const url = process.env.DATABASE_URL
  if (url) {
    return neon(url)
  }
  return null
}

// -------------------------------------------------------------
// DATA REPOSITORY FUNCTIONS
// -------------------------------------------------------------

// 1. Projects
export async function getProjects(): Promise<ProjectItem[]> {
  const supabase = getSupabaseClient()
  if (supabase) {
    try {
      const { data, error } = await supabase
        .from('portfolio_projects')
        .select('*')
        .order('display_order', { ascending: true })
      if (!error && data && data.length > 0) {
        return data.map((item) => ({
          codename: item.codename,
          title: item.title,
          tagline: item.tagline,
          description: item.description,
          tags: item.tags || [],
          role: item.role,
          status: item.status,
          image: item.image,
          fit: item.fit,
          links: item.links || [],
        }))
      }
    } catch (e) {
      console.warn('Supabase query failed, falling back:', e)
    }
  }

  const neonSql = getNeonSql()
  if (neonSql) {
    try {
      const rows = await neonSql`SELECT * FROM portfolio_projects ORDER BY display_order ASC`
      if (rows && rows.length > 0) {
        return rows.map((item: any) => ({
          codename: item.codename,
          title: item.title,
          tagline: item.tagline,
          description: item.description,
          tags: item.tags || [],
          role: item.role,
          status: item.status,
          image: item.image,
          fit: item.fit,
          links: item.links || [],
        }))
      }
    } catch (e) {
      console.warn('Neon query failed, falling back:', e)
    }
  }

  const store = readLocalStore()
  return store.projects
}

export async function saveProjects(projects: ProjectItem[]): Promise<boolean> {
  const supabase = getSupabaseClient()
  if (supabase) {
    try {
      // Upsert into Supabase
      const rows = projects.map((p, idx) => ({
        id: p.title.toLowerCase().replace(/[^a-z0-9]+/g, '-'),
        codename: p.codename,
        title: p.title,
        tagline: p.tagline,
        description: p.description,
        tags: p.tags,
        role: p.role,
        status: p.status,
        image: p.image,
        fit: p.fit || 'cover',
        links: p.links,
        display_order: idx,
        updated_at: new Date().toISOString(),
      }))
      await supabase.from('portfolio_projects').upsert(rows)
    } catch (e) {
      console.error('Error saving projects to Supabase:', e)
    }
  }

  const neonSql = getNeonSql()
  if (neonSql) {
    try {
      for (let idx = 0; idx < projects.length; idx++) {
        const p = projects[idx]
        const id = p.title.toLowerCase().replace(/[^a-z0-9]+/g, '-')
        await neonSql`
          INSERT INTO portfolio_projects (id, codename, title, tagline, description, tags, role, status, image, fit, links, display_order, updated_at)
          VALUES (${id}, ${p.codename}, ${p.title}, ${p.tagline}, ${p.description}, ${p.tags}, ${p.role}, ${p.status}, ${p.image}, ${p.fit || 'cover'}, ${JSON.stringify(p.links)}, ${idx}, NOW())
          ON CONFLICT (id) DO UPDATE SET
            codename = EXCLUDED.codename,
            title = EXCLUDED.title,
            tagline = EXCLUDED.tagline,
            description = EXCLUDED.description,
            tags = EXCLUDED.tags,
            role = EXCLUDED.role,
            status = EXCLUDED.status,
            image = EXCLUDED.image,
            fit = EXCLUDED.fit,
            links = EXCLUDED.links,
            display_order = EXCLUDED.display_order,
            updated_at = NOW()
        `
      }
    } catch (e) {
      console.error('Error saving projects to Neon:', e)
    }
  }

  const store = readLocalStore()
  store.projects = projects
  writeLocalStore(store)
  return true
}

// 2. Certificates
export async function getCertificates(): Promise<Certificate[]> {
  const supabase = getSupabaseClient()
  if (supabase) {
    try {
      const { data, error } = await supabase
        .from('portfolio_certificates')
        .select('*')
        .order('display_order', { ascending: true })
      if (!error && data && data.length > 0) {
        return data.map((item) => ({
          title: item.title,
          issuer: item.issuer,
          year: item.year,
          image: item.image,
        }))
      }
    } catch (e) {
      console.warn('Supabase certificates query failed:', e)
    }
  }

  const neonSql = getNeonSql()
  if (neonSql) {
    try {
      const rows = await neonSql`SELECT * FROM portfolio_certificates ORDER BY display_order ASC`
      if (rows && rows.length > 0) {
        return rows.map((item: any) => ({
          title: item.title,
          issuer: item.issuer,
          year: item.year,
          image: item.image,
        }))
      }
    } catch (e) {
      console.warn('Neon certificates query failed:', e)
    }
  }

  const store = readLocalStore()
  return store.certificates
}

export async function saveCertificates(certificates: Certificate[]): Promise<boolean> {
  const supabase = getSupabaseClient()
  if (supabase) {
    try {
      const rows = certificates.map((c, idx) => ({
        id: c.title.toLowerCase().replace(/[^a-z0-9]+/g, '-'),
        title: c.title,
        issuer: c.issuer,
        year: c.year,
        image: c.image,
        display_order: idx,
        updated_at: new Date().toISOString(),
      }))
      await supabase.from('portfolio_certificates').upsert(rows)
    } catch (e) {
      console.error('Error saving certificates to Supabase:', e)
    }
  }

  const neonSql = getNeonSql()
  if (neonSql) {
    try {
      for (let idx = 0; idx < certificates.length; idx++) {
        const c = certificates[idx]
        const id = c.title.toLowerCase().replace(/[^a-z0-9]+/g, '-')
        await neonSql`
          INSERT INTO portfolio_certificates (id, title, issuer, year, image, display_order, updated_at)
          VALUES (${id}, ${c.title}, ${c.issuer}, ${c.year}, ${c.image}, ${idx}, NOW())
          ON CONFLICT (id) DO UPDATE SET
            title = EXCLUDED.title,
            issuer = EXCLUDED.issuer,
            year = EXCLUDED.year,
            image = EXCLUDED.image,
            display_order = EXCLUDED.display_order,
            updated_at = NOW()
        `
      }
    } catch (e) {
      console.error('Error saving certificates to Neon:', e)
    }
  }

  const store = readLocalStore()
  store.certificates = certificates
  writeLocalStore(store)
  return true
}

// 3. Settings (Stats, About, Profile)
export async function getPortfolioSettings() {
  const store = readLocalStore()
  return {
    profile: store.profile,
    stats: store.stats,
    aboutLines: store.aboutLines,
  }
}

export async function savePortfolioSettings(settings: {
  profile?: any
  stats?: any
  aboutLines?: any
}) {
  const store = readLocalStore()
  if (settings.profile) store.profile = { ...store.profile, ...settings.profile }
  if (settings.stats) store.stats = settings.stats
  if (settings.aboutLines) store.aboutLines = settings.aboutLines
  writeLocalStore(store)
  return true
}

// 4. Analytics
export async function logEvent(event: Omit<AnalyticsEvent, 'id' | 'created_at'>): Promise<void> {
  const id = `ev_${Date.now()}_${Math.random().toString(36).substring(2, 7)}`
  const created_at = new Date().toISOString()
  const fullEvent: AnalyticsEvent = { ...event, id, created_at }

  const supabase = getSupabaseClient()
  if (supabase) {
    try {
      await supabase.from('portfolio_analytics').insert([fullEvent])
    } catch (e) {
      console.warn('Error logging analytics to Supabase:', e)
    }
  }

  const neonSql = getNeonSql()
  if (neonSql) {
    try {
      await neonSql`
        INSERT INTO portfolio_analytics (id, type, label, href, path, referrer, user_agent, screen, ip, visitor_id, created_at)
        VALUES (${id}, ${event.type}, ${event.label || null}, ${event.href || null}, ${event.path || '/'}, ${event.referrer || null}, ${event.user_agent || null}, ${event.screen || null}, ${event.ip || null}, ${event.visitor_id || null}, NOW())
      `
    } catch (e) {
      console.warn('Error logging analytics to Neon:', e)
    }
  }

  // Always keep in local store as well for immediate dashboard access
  const store = readLocalStore()
  store.analytics.unshift(fullEvent)
  // Limit analytics memory to last 1000 events
  if (store.analytics.length > 1000) {
    store.analytics = store.analytics.slice(0, 1000)
  }
  writeLocalStore(store)
}

export async function getAnalyticsSummary(): Promise<{
  totalPageViews: number
  uniqueVisitors: number
  totalClicks: number
  events: AnalyticsEvent[]
  clicksBreakdown: { href: string; label: string; count: number }[]
}> {
  const store = readLocalStore()
  const events = store.analytics || []

  let pageviews = 0
  let clicks = 0
  const uniqueVisitorSet = new Set<string>()
  const clickMap = new Map<string, { href: string; label: string; count: number }>()

  for (const ev of events) {
    if (ev.type === 'pageview') {
      pageviews++
      if (ev.visitor_id) uniqueVisitorSet.add(ev.visitor_id)
      else if (ev.ip) uniqueVisitorSet.add(ev.ip)
    } else if (ev.type === 'click') {
      clicks++
      const key = `${ev.href || 'unknown'}__${ev.label || 'unknown'}`
      const existing = clickMap.get(key)
      if (existing) {
        existing.count++
      } else {
        clickMap.set(key, {
          href: ev.href || '#',
          label: ev.label || 'Link',
          count: 1,
        })
      }
    }
  }

  const clicksBreakdown = Array.from(clickMap.values()).sort((a, b) => b.count - a.count)

  return {
    totalPageViews: pageviews,
    uniqueVisitors: uniqueVisitorSet.size || Math.min(pageviews, 1),
    totalClicks: clicks,
    events: events.slice(0, 200),
    clicksBreakdown,
  }
}

// 5. Contact Messages ("who file or send email")
export async function saveContactMessage(msg: Omit<ContactMessage, 'id' | 'status' | 'created_at'>): Promise<ContactMessage> {
  const id = `msg_${Date.now()}_${Math.random().toString(36).substring(2, 7)}`
  const created_at = new Date().toISOString()
  const message: ContactMessage = {
    ...msg,
    id,
    status: 'unread',
    created_at,
  }

  const supabase = getSupabaseClient()
  if (supabase) {
    try {
      await supabase.from('portfolio_messages').insert([message])
    } catch (e) {
      console.warn('Error saving message to Supabase:', e)
    }
  }

  const neonSql = getNeonSql()
  if (neonSql) {
    try {
      await neonSql`
        INSERT INTO portfolio_messages (id, name, email, service, message, status, ip, user_agent, created_at)
        VALUES (${id}, ${message.name}, ${message.email}, ${message.service || null}, ${message.message}, ${message.status}, ${message.ip || null}, ${message.user_agent || null}, NOW())
      `
    } catch (e) {
      console.warn('Error saving message to Neon:', e)
    }
  }

  const store = readLocalStore()
  store.messages.unshift(message)
  writeLocalStore(store)

  // Also log as an analytics event
  await logEvent({
    type: 'click',
    label: `Contact Form Sent by ${msg.name} (${msg.email})`,
    href: `mailto:${msg.email}`,
    path: '/#contact',
    ip: msg.ip,
    user_agent: msg.user_agent,
  })

  return message
}

export async function getContactMessages(): Promise<ContactMessage[]> {
  const store = readLocalStore()
  return store.messages || []
}

export async function updateMessageStatus(id: string, status: 'unread' | 'read' | 'replied'): Promise<boolean> {
  const store = readLocalStore()
  const msg = store.messages.find((m) => m.id === id)
  if (msg) {
    msg.status = status
    writeLocalStore(store)
    return true
  }
  return false
}

export async function deleteContactMessage(id: string): Promise<boolean> {
  const store = readLocalStore()
  store.messages = store.messages.filter((m) => m.id !== id)
  writeLocalStore(store)
  return true
}

// 6. Admin Credentials
export async function getAdminCredentials() {
  const store = readLocalStore()
  return store.admin
}

export async function updateAdminPassword(newPasswordHash: string, newSalt: string) {
  const store = readLocalStore()
  store.admin.passwordHash = newPasswordHash
  store.admin.salt = newSalt
  writeLocalStore(store)
  return true
}
