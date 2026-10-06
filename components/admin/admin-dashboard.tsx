'use client'

import { useState, useEffect } from 'react'
import {
  BarChart3,
  FolderGit2,
  Award,
  User,
  Shield,
  LogOut,
  Plus,
  Trash2,
  Edit3,
  ExternalLink,
  Mail,
  Eye,
  MousePointerClick,
  Users,
  CheckCircle2,
  Clock,
  RefreshCw,
  Database,
  Lock,
  ArrowUpRight,
  X,
  Save,
  Upload,
  ImageIcon,
  Loader2,
} from 'lucide-react'
import { ProjectItem, ContactMessage, AnalyticsEvent } from '@/lib/db'
import { Certificate } from '@/lib/portfolio-data'

type ActiveTab = 'analytics' | 'messages' | 'projects' | 'certificates' | 'profile' | 'settings'

export function AdminDashboard({ onClose }: { onClose?: () => void }) {
  const [activeTab, setActiveTab] = useState<ActiveTab>('analytics')
  const [loading, setLoading] = useState(true)
  const [refreshing, setRefreshing] = useState(false)
  const [notification, setNotification] = useState<string | null>(null)

  // Data states
  const [projects, setProjects] = useState<ProjectItem[]>([])
  const [certificates, setCertificates] = useState<Certificate[]>([])
  const [messages, setMessages] = useState<ContactMessage[]>([])
  const [analytics, setAnalytics] = useState<{
    totalPageViews: number
    uniqueVisitors: number
    totalClicks: number
    events: AnalyticsEvent[]
    clicksBreakdown: { href: string; label: string; count: number }[]
  }>({
    totalPageViews: 0,
    uniqueVisitors: 0,
    totalClicks: 0,
    events: [],
    clicksBreakdown: [],
  })
  const [settings, setSettings] = useState<any>({
    profile: {},
    stats: [],
    aboutLines: [],
  })
  const [dbStatus, setDbStatus] = useState<any>({
    mode: 'local',
    configured: false,
    message: '',
  })

  // Modal / Editing states
  const [editingProject, setEditingProject] = useState<{ item: ProjectItem; index?: number } | null>(null)
  const [editingCert, setEditingCert] = useState<{ item: Certificate; index?: number } | null>(null)
  const [newPassword, setNewPassword] = useState('')
  const [uploading, setUploading] = useState(false)

  async function handleFileUpload(file: File, folder: string = 'certs'): Promise<string | null> {
    setUploading(true)
    try {
      const formData = new FormData()
      formData.append('file', file)
      formData.append('folder', folder)
      const res = await fetch('/api/admin/upload', {
        method: 'POST',
        body: formData,
      })
      const data = await res.json()
      if (!res.ok) throw new Error(data.error || 'Upload failed')
      showToast('Image uploaded successfully!')
      return data.url
    } catch (err: any) {
      alert('Upload failed: ' + err.message)
      return null
    } finally {
      setUploading(false)
    }
  }

  function showToast(msg: string) {
    setNotification(msg)
    setTimeout(() => setNotification(null), 4000)
  }

  // Load dashboard data
  async function loadData() {
    setRefreshing(true)
    try {
      const [dataRes, analyticsRes, messagesRes] = await Promise.all([
        fetch('/api/admin/data'),
        fetch('/api/admin/analytics'),
        fetch('/api/admin/messages'),
      ])

      if (dataRes.ok) {
        const d = await dataRes.json()
        setProjects(d.projects || [])
        setCertificates(d.certificates || [])
        setSettings(d.settings || {})
        setDbStatus(d.dbStatus || {})
      }

      if (analyticsRes.ok) {
        const a = await analyticsRes.json()
        setAnalytics(a)
      }

      if (messagesRes.ok) {
        const m = await messagesRes.json()
        setMessages(m.messages || [])
      }
    } catch (err) {
      console.error('Failed to load admin data:', err)
    } finally {
      setLoading(false)
      setRefreshing(false)
    }
  }

  useEffect(() => {
    loadData()
  }, [])

  // Logout handler
  async function handleLogout() {
    await fetch('/api/admin/auth/logout', { method: 'POST' })
    window.location.reload()
  }

  // Projects CRUD
  async function handleSaveProject(project: ProjectItem, index?: number) {
    try {
      const res = await fetch('/api/admin/projects', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ project, index }),
      })
      if (res.ok) {
        const d = await res.json()
        setProjects(d.projects)
        setEditingProject(null)
        showToast('Project saved successfully!')
      }
    } catch (err) {
      alert('Error saving project')
    }
  }

  async function handleDeleteProject(index: number) {
    if (!confirm('Are you sure you want to delete this project?')) return
    try {
      const res = await fetch(`/api/admin/projects/${index}`, { method: 'DELETE' })
      if (res.ok) {
        const d = await res.json()
        setProjects(d.projects)
        showToast('Project removed.')
      }
    } catch (err) {
      alert('Error deleting project')
    }
  }

  // Certificates CRUD
  async function handleSaveCertificate(cert: Certificate, index?: number) {
    try {
      const res = await fetch('/api/admin/certificates', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ certificate: cert, index }),
      })
      if (res.ok) {
        const d = await res.json()
        setCertificates(d.certificates)
        setEditingCert(null)
        showToast('Certificate saved!')
      }
    } catch (err) {
      alert('Error saving certificate')
    }
  }

  async function handleDeleteCertificate(index: number) {
    if (!confirm('Are you sure you want to delete this certificate?')) return
    try {
      const res = await fetch(`/api/admin/certificates/${index}`, { method: 'DELETE' })
      if (res.ok) {
        const d = await res.json()
        setCertificates(d.certificates)
        showToast('Certificate removed.')
      }
    } catch (err) {
      alert('Error deleting certificate')
    }
  }

  // Messages Actions
  async function handleUpdateMessageStatus(id: string, status: 'unread' | 'read' | 'replied') {
    await fetch(`/api/admin/messages/${id}`, {
      method: 'PATCH',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ status }),
    })
    setMessages((prev) => prev.map((m) => (m.id === id ? { ...m, status } : m)))
    showToast(`Marked as ${status}`)
  }

  async function handleDeleteMessage(id: string) {
    if (!confirm('Delete this signal message?')) return
    await fetch(`/api/admin/messages/${id}`, { method: 'DELETE' })
    setMessages((prev) => prev.filter((m) => m.id !== id))
    showToast('Message deleted.')
  }

  // Profile / Settings Save
  async function handleSaveSettings() {
    try {
      const res = await fetch('/api/admin/data', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(settings),
      })
      if (res.ok) {
        showToast('Settings & Stats updated!')
      }
    } catch (err) {
      alert('Error saving settings')
    }
  }

  // Change Password
  async function handleChangePassword(e: React.FormEvent) {
    e.preventDefault()
    if (!newPassword || newPassword.length < 6) {
      alert('Password must be at least 6 characters')
      return
    }
    const res = await fetch('/api/admin/auth/change-password', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ newPassword }),
    })
    if (res.ok) {
      setNewPassword('')
      showToast('Admin password updated successfully!')
    } else {
      alert('Failed to update password')
    }
  }

  return (
    <div className="relative flex min-h-[680px] w-full flex-col overflow-hidden bg-background text-foreground">
      {/* HUD Header */}
      <div className="flex flex-wrap items-center justify-between gap-4 border-b border-border bg-panel/80 px-6 py-4 backdrop-blur-md">
        <div className="flex items-center gap-3">
          <div className="flex size-9 items-center justify-center rounded border border-arc/50 bg-arc/10 text-arc shadow-[0_0_12px_var(--arc)]">
            <Shield className="size-5" />
          </div>
          <div>
            <h2 className="font-display text-2xl leading-none tracking-wide text-stark">Sanctum Command</h2>
            <p className="text-[10px] font-semibold tracking-[0.25em] text-arc uppercase">
              Admin: mohamed.tamer.8006@gmail.com
            </p>
          </div>
        </div>

        {/* Global Action buttons */}
        <div className="flex items-center gap-2">
          <button
            onClick={loadData}
            disabled={refreshing}
            className="flex items-center gap-1.5 border border-border bg-background px-3 py-1.5 text-xs font-medium text-muted-foreground transition-colors hover:text-foreground"
            title="Refresh data"
          >
            <RefreshCw className={`size-3.5 ${refreshing ? 'animate-spin' : ''}`} />
            Refresh
          </button>
          <a
            href="/"
            target="_blank"
            rel="noopener noreferrer"
            className="flex items-center gap-1.5 border border-border bg-background px-3 py-1.5 text-xs font-medium text-muted-foreground transition-colors hover:text-arc"
          >
            <Eye className="size-3.5" />
            Live Site
          </a>
          <button
            onClick={handleLogout}
            className="flex items-center gap-1.5 border border-stark/40 bg-stark/10 px-3 py-1.5 text-xs font-medium text-stark transition-colors hover:bg-stark hover:text-white"
          >
            <LogOut className="size-3.5" />
            Logout
          </button>
          {onClose && (
            <button
              onClick={onClose}
              className="flex size-8 items-center justify-center border border-border bg-background text-muted-foreground transition-colors hover:border-gold hover:text-gold"
              title="Close modal"
            >
              <X className="size-4" />
            </button>
          )}
        </div>
      </div>

      {/* Toast Notification */}
      {notification && (
        <div className="absolute top-16 right-6 z-50 flex items-center gap-2 border border-arc/60 bg-background/95 px-4 py-2.5 text-xs font-semibold text-arc shadow-[0_0_20px_var(--arc)] backdrop-blur">
          <CheckCircle2 className="size-4" />
          {notification}
        </div>
      )}

      {/* Navigation Tabs */}
      <div className="flex flex-wrap border-b border-border bg-panel/30 px-6">
        {[
          { id: 'analytics', label: 'Traffic & Clicks', icon: BarChart3, badge: analytics.totalClicks > 0 ? `${analytics.totalClicks} clicks` : null },
          { id: 'messages', label: 'Signals / Messages', icon: Mail, badge: messages.filter((m) => m.status === 'unread').length > 0 ? `${messages.filter((m) => m.status === 'unread').length} new` : null },
          { id: 'projects', label: 'Projects Manager', icon: FolderGit2, count: projects.length },
          { id: 'certificates', label: 'Certificates Manager', icon: Award, count: certificates.length },
          { id: 'profile', label: 'Info & Stats', icon: User },
          { id: 'settings', label: 'Database & Security', icon: Database },
        ].map((tab) => {
          const Icon = tab.icon
          const isActive = activeTab === tab.id
          return (
            <button
              key={tab.id}
              onClick={() => setActiveTab(tab.id as ActiveTab)}
              className={`flex items-center gap-2 border-b-2 px-4 py-3 text-xs font-semibold tracking-[0.15em] uppercase transition-colors ${
                isActive
                  ? 'border-arc text-arc bg-arc/5'
                  : 'border-transparent text-muted-foreground hover:text-foreground'
              }`}
            >
              <Icon className="size-4" />
              {tab.label}
              {tab.count !== undefined && (
                <span className="rounded bg-border px-1.5 py-0.5 text-[10px] text-muted-foreground">
                  {tab.count}
                </span>
              )}
              {tab.badge && (
                <span className="rounded bg-arc/20 px-1.5 py-0.5 text-[10px] text-arc font-bold">
                  {tab.badge}
                </span>
              )}
            </button>
          )
        })}
      </div>

      {/* Content Area */}
      <div className="flex-1 overflow-y-auto p-6 md:p-8">
        {loading ? (
          <div className="flex h-64 items-center justify-center">
            <RefreshCw className="size-8 animate-spin text-arc" />
          </div>
        ) : (
          <>
            {/* TAB 1: ANALYTICS & TRAFFIC */}
            {activeTab === 'analytics' && (
              <div className="flex flex-col gap-8">
                {/* Metrics Cards */}
                <div className="grid grid-cols-2 gap-4 lg:grid-cols-4">
                  <div className="hud-card p-5">
                    <div className="flex items-center justify-between text-muted-foreground">
                      <span className="text-[11px] font-semibold tracking-[0.2em] uppercase">Page Views</span>
                      <Eye className="size-4 text-arc" />
                    </div>
                    <p className="mt-2 font-display text-4xl text-arc">{analytics.totalPageViews}</p>
                    <p className="text-[10px] text-muted-foreground">Live visits recorded</p>
                  </div>

                  <div className="hud-card p-5">
                    <div className="flex items-center justify-between text-muted-foreground">
                      <span className="text-[11px] font-semibold tracking-[0.2em] uppercase">Unique Visitors</span>
                      <Users className="size-4 text-stark" />
                    </div>
                    <p className="mt-2 font-display text-4xl text-stark">{analytics.uniqueVisitors}</p>
                    <p className="text-[10px] text-muted-foreground">Unique devices / sessions</p>
                  </div>

                  <div className="hud-card p-5">
                    <div className="flex items-center justify-between text-muted-foreground">
                      <span className="text-[11px] font-semibold tracking-[0.2em] uppercase">Link Clicks</span>
                      <MousePointerClick className="size-4 text-gold" />
                    </div>
                    <p className="mt-2 font-display text-4xl text-gold">{analytics.totalClicks}</p>
                    <p className="text-[10px] text-muted-foreground">Outbound & action clicks</p>
                  </div>

                  <div className="hud-card p-5">
                    <div className="flex items-center justify-between text-muted-foreground">
                      <span className="text-[11px] font-semibold tracking-[0.2em] uppercase">Signals / Messages</span>
                      <Mail className="size-4 text-cap" />
                    </div>
                    <p className="mt-2 font-display text-4xl text-cap">{messages.length}</p>
                    <p className="text-[10px] text-muted-foreground">Form submissions</p>
                  </div>
                </div>

                {/* Section: Who Clicked on What Link */}
                <div className="flex flex-col gap-4">
                  <div className="flex items-center justify-between">
                    <div>
                      <h3 className="font-display text-2xl text-gold">Link Clicks Intelligence</h3>
                      <p className="text-xs text-muted-foreground">
                        Real-time tracking of links clicked (GitHub, LinkedIn, CV, Project Demos, Code Repos)
                      </p>
                    </div>
                  </div>

                  {analytics.clicksBreakdown.length === 0 ? (
                    <div className="border border-border/60 bg-panel/30 p-8 text-center text-sm text-muted-foreground">
                      No link clicks recorded yet. Clicks on GitHub, LinkedIn, CV, and projects will appear here in real-time.
                    </div>
                  ) : (
                    <div className="overflow-x-auto border border-border bg-panel/40">
                      <table className="w-full text-left text-xs">
                        <thead className="border-b border-border bg-background/50 text-[10px] font-semibold tracking-[0.2em] text-muted-foreground uppercase">
                          <tr>
                            <th className="px-4 py-3">Link / Action</th>
                            <th className="px-4 py-3">Destination URL</th>
                            <th className="px-4 py-3 text-right">Click Count</th>
                          </tr>
                        </thead>
                        <tbody className="divide-y divide-border/50">
                          {analytics.clicksBreakdown.map((item, idx) => (
                            <tr key={idx} className="hover:bg-arc/5 transition-colors">
                              <td className="px-4 py-3 font-semibold text-foreground flex items-center gap-2">
                                <MousePointerClick className="size-3 text-gold" />
                                {item.label}
                              </td>
                              <td className="px-4 py-3 font-mono text-[11px] text-muted-foreground">
                                <a
                                  href={item.href}
                                  target="_blank"
                                  rel="noopener noreferrer"
                                  className="hover:text-arc inline-flex items-center gap-1"
                                >
                                  {item.href}
                                  <ArrowUpRight className="size-3" />
                                </a>
                              </td>
                              <td className="px-4 py-3 text-right font-display text-base text-gold font-bold">
                                {item.count}
                              </td>
                            </tr>
                          ))}
                        </tbody>
                      </table>
                    </div>
                  )}
                </div>

                {/* Section: Recent Activity Events */}
                <div className="flex flex-col gap-4">
                  <h3 className="font-display text-2xl text-arc">Live Traffic Stream</h3>
                  <div className="max-h-96 overflow-y-auto border border-border bg-panel/30">
                    {analytics.events.length === 0 ? (
                      <p className="p-6 text-center text-xs text-muted-foreground">Awaiting visitor traffic...</p>
                    ) : (
                      <div className="divide-y divide-border/40 text-xs">
                        {analytics.events.map((ev) => (
                          <div key={ev.id} className="flex flex-wrap items-center justify-between gap-3 px-4 py-2.5 hover:bg-background/40">
                            <div className="flex items-center gap-3">
                              <span
                                className={`rounded px-2 py-0.5 text-[9px] font-bold uppercase tracking-wider ${
                                  ev.type === 'pageview' ? 'bg-arc/20 text-arc' : 'bg-gold/20 text-gold'
                                }`}
                              >
                                {ev.type}
                              </span>
                              <span className="font-semibold text-foreground">{ev.label || ev.path}</span>
                              {ev.href && (
                                <span className="font-mono text-[10px] text-muted-foreground truncate max-w-xs">
                                  → {ev.href}
                                </span>
                              )}
                            </div>
                            <div className="flex items-center gap-4 text-[10px] text-muted-foreground font-mono">
                              {ev.ip && <span>IP: {ev.ip}</span>}
                              <span>{new Date(ev.created_at).toLocaleTimeString([], { hour: '2-digit', minute: '2-digit', second: '2-digit' })}</span>
                            </div>
                          </div>
                        ))}
                      </div>
                    )}
                  </div>
                </div>
              </div>
            )}

            {/* TAB 2: SIGNALS / MESSAGES */}
            {activeTab === 'messages' && (
              <div className="flex flex-col gap-6">
                <div>
                  <h3 className="font-display text-2xl text-cap">Signals Received (Contact Inquiries)</h3>
                  <p className="text-xs text-muted-foreground">
                    Inquiries submitted through your portfolio contact form.
                  </p>
                </div>

                {messages.length === 0 ? (
                  <div className="border border-border/60 bg-panel/30 p-12 text-center text-sm text-muted-foreground">
                    <Mail className="mx-auto mb-2 size-8 text-muted-foreground/50" />
                    No signals received yet. Inquiries will be logged here with sender email, requested service, and message.
                  </div>
                ) : (
                  <div className="flex flex-col gap-4">
                    {messages.map((msg) => (
                      <div
                        key={msg.id}
                        className={`hud-card p-6 flex flex-col gap-3 transition-colors ${
                          msg.status === 'unread' ? 'border-arc/60 bg-arc/5' : ''
                        }`}
                      >
                        <div className="flex flex-wrap items-center justify-between gap-2 border-b border-border pb-3">
                          <div className="flex items-center gap-3">
                            <span className="font-display text-2xl">{msg.name}</span>
                            <a
                              href={`mailto:${msg.email}?subject=Re: Portfolio Inquiry`}
                              className="text-xs font-semibold text-arc hover:underline"
                            >
                              {msg.email}
                            </a>
                            <span className="rounded bg-cap/20 px-2.5 py-0.5 text-[10px] font-semibold text-cap uppercase">
                              {msg.service}
                            </span>
                          </div>

                          <div className="flex items-center gap-3 text-xs">
                            <span className="text-muted-foreground text-[11px]">
                              {new Date(msg.created_at).toLocaleString()}
                            </span>
                            <span
                              className={`rounded px-2 py-0.5 text-[10px] font-bold uppercase tracking-wider ${
                                msg.status === 'unread'
                                  ? 'bg-stark text-white'
                                  : msg.status === 'replied'
                                  ? 'bg-emerald-500/20 text-emerald-400'
                                  : 'bg-muted text-muted-foreground'
                              }`}
                            >
                              {msg.status}
                            </span>
                          </div>
                        </div>

                        <p className="text-sm leading-relaxed text-foreground whitespace-pre-wrap">
                          {msg.message}
                        </p>

                        <div className="mt-2 flex flex-wrap items-center justify-between gap-3 border-t border-border/40 pt-3 text-xs">
                          <span className="text-[10px] text-muted-foreground font-mono">
                            Client IP: {msg.ip || 'Unknown'} · {msg.user_agent ? msg.user_agent.substring(0, 50) + '...' : ''}
                          </span>

                          <div className="flex items-center gap-2">
                            {msg.status === 'unread' && (
                              <button
                                onClick={() => handleUpdateMessageStatus(msg.id, 'read')}
                                className="btn-ghost px-2.5 py-1 text-[11px]"
                              >
                                Mark as Read
                              </button>
                            )}
                            <a
                              href={`mailto:${msg.email}?subject=Re: Portfolio Inquiry (${msg.service})`}
                              onClick={() => handleUpdateMessageStatus(msg.id, 'replied')}
                              className="btn-primary px-3 py-1 text-[11px]"
                            >
                              <Mail className="size-3" /> Reply
                            </a>
                            <button
                              onClick={() => handleDeleteMessage(msg.id)}
                              className="border border-border p-1.5 text-muted-foreground hover:border-stark hover:text-stark"
                              title="Delete message"
                            >
                              <Trash2 className="size-3.5" />
                            </button>
                          </div>
                        </div>
                      </div>
                    ))}
                  </div>
                )}
              </div>
            )}

            {/* TAB 3: PROJECTS MANAGER */}
            {activeTab === 'projects' && (
              <div className="flex flex-col gap-6">
                <div className="flex flex-wrap items-center justify-between gap-4">
                  <div>
                    <h3 className="font-display text-2xl text-stark">Projects Command</h3>
                    <p className="text-xs text-muted-foreground">
                      Add, edit, or delete projects and their public links & live demos.
                    </p>
                  </div>

                  <button
                    onClick={() =>
                      setEditingProject({
                        item: {
                          codename: `Mission 0${projects.length + 1}`,
                          title: '',
                          tagline: '',
                          description: '',
                          tags: ['Python', 'FastAPI'],
                          role: 'Lead Developer',
                          status: 'Deployed',
                          image: null,
                          fit: 'cover',
                          links: [
                            { label: 'View Code', href: 'https://github.com/mohamedtamer2006', kind: 'code' },
                          ],
                        },
                      })
                    }
                    className="btn-primary"
                  >
                    <Plus className="size-4" /> Add Project
                  </button>
                </div>

                {/* Projects List */}
                <div className="grid gap-4">
                  {projects.map((proj, idx) => (
                    <div key={idx} className="hud-card p-5 flex flex-col md:flex-row items-start md:items-center justify-between gap-4">
                      <div className="flex flex-col gap-1.5 max-w-2xl">
                        <div className="flex items-center gap-2">
                          <span className="bg-stark px-2 py-0.5 text-[10px] font-bold text-white uppercase">
                            {proj.codename}
                          </span>
                          <span className="border border-arc/40 px-2 py-0.5 text-[10px] text-arc uppercase">
                            {proj.status}
                          </span>
                          <span className="text-xs font-semibold text-gold">{proj.tagline}</span>
                        </div>
                        <h4 className="font-display text-2xl leading-tight">{proj.title}</h4>
                        <p className="text-xs text-muted-foreground line-clamp-2">{proj.description}</p>
                        <div className="flex flex-wrap gap-1.5 mt-1">
                          {proj.tags.map((t, ti) => (
                            <span key={ti} className="border border-border bg-background px-2 py-0.5 text-[10px]">
                              {t}
                            </span>
                          ))}
                        </div>
                      </div>

                      <div className="flex items-center gap-2 shrink-0">
                        <button
                          onClick={() => setEditingProject({ item: { ...proj }, index: idx })}
                          className="btn-ghost px-3 py-1.5 text-xs"
                        >
                          <Edit3 className="size-3.5" /> Edit
                        </button>
                        <button
                          onClick={() => handleDeleteProject(idx)}
                          className="border border-border p-2 text-muted-foreground hover:border-stark hover:text-stark"
                          title="Delete"
                        >
                          <Trash2 className="size-4" />
                        </button>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            )}

            {/* TAB 4: CERTIFICATES MANAGER */}
            {activeTab === 'certificates' && (
              <div className="flex flex-col gap-6">
                <div className="flex flex-wrap items-center justify-between gap-4">
                  <div>
                    <h3 className="font-display text-2xl text-gold">Certificates Honors</h3>
                    <p className="text-xs text-muted-foreground">
                      Add, reorder, or edit verified certificates and credentials.
                    </p>
                  </div>

                  <button
                    onClick={() =>
                      setEditingCert({
                        item: {
                          title: '',
                          issuer: '',
                          year: `${new Date().toLocaleString('default', { month: 'short' })} ${new Date().getFullYear()}`,
                          image: null,
                        },
                      })
                    }
                    className="btn-primary"
                  >
                    <Plus className="size-4" /> Add Certificate
                  </button>
                </div>

                <div className="grid gap-3 sm:grid-cols-2 lg:grid-cols-3">
                  {certificates.map((cert, idx) => (
                    <div key={idx} className="hud-card p-4 flex flex-col justify-between gap-3">
                      <div className="flex flex-col gap-1">
                        <span className="text-[10px] font-semibold text-gold tracking-widest uppercase">
                          {cert.year}
                        </span>
                        <h4 className="font-display text-xl leading-tight">{cert.title}</h4>
                        <p className="text-xs text-muted-foreground">{cert.issuer}</p>
                        {cert.image && (
                          <div className="relative mt-2 aspect-[4/3] w-full overflow-hidden border border-border bg-black/20">
                            {/* eslint-disable-next-line @next/next/no-img-element */}
                            <img src={cert.image} alt={cert.title} className="size-full object-contain" />
                          </div>
                        )}
                      </div>

                      <div className="flex items-center justify-end gap-2 border-t border-border/40 pt-2">
                        <button
                          onClick={() => setEditingCert({ item: { ...cert }, index: idx })}
                          className="btn-ghost px-2.5 py-1 text-xs"
                        >
                          <Edit3 className="size-3" /> Edit
                        </button>
                        <button
                          onClick={() => handleDeleteCertificate(idx)}
                          className="border border-border p-1.5 text-muted-foreground hover:border-stark hover:text-stark"
                        >
                          <Trash2 className="size-3.5" />
                        </button>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            )}

            {/* TAB 5: PROFILE & STATS */}
            {activeTab === 'profile' && (
              <div className="flex flex-col gap-6 max-w-3xl">
                <div>
                  <h3 className="font-display text-2xl text-stark">Identity & Mission Stats</h3>
                  <p className="text-xs text-muted-foreground">
                    Customize your profile information and top stats cards.
                  </p>
                </div>

                {/* Stats Numbers */}
                <div className="hud-card p-6 flex flex-col gap-4">
                  <h4 className="font-display text-xl text-gold">HUD Metric Stats</h4>
                  <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
                    {settings.stats?.map((stat: any, idx: number) => (
                      <div key={idx} className="flex flex-col gap-1 border border-border/60 bg-background/50 p-3">
                        <label className="text-[10px] font-semibold text-muted-foreground uppercase">
                          Label
                          <input
                            type="text"
                            value={stat.label}
                            onChange={(e) => {
                              const newStats = [...settings.stats]
                              newStats[idx].label = e.target.value
                              setSettings({ ...settings, stats: newStats })
                            }}
                            className="mt-1 w-full border border-border bg-background px-2.5 py-1.5 text-xs text-foreground"
                          />
                        </label>
                        <label className="text-[10px] font-semibold text-muted-foreground uppercase mt-2">
                          Value
                          <input
                            type="text"
                            value={stat.value}
                            onChange={(e) => {
                              const newStats = [...settings.stats]
                              newStats[idx].value = e.target.value
                              setSettings({ ...settings, stats: newStats })
                            }}
                            className="mt-1 w-full border border-border bg-background px-2.5 py-1.5 text-sm font-display text-stark"
                          />
                        </label>
                      </div>
                    ))}
                  </div>
                </div>

                {/* Profile Details */}
                <div className="hud-card p-6 flex flex-col gap-4">
                  <h4 className="font-display text-xl text-arc">Contact & Link Coordinates</h4>
                  <div className="grid gap-4 sm:grid-cols-2">
                    <label className="text-xs font-semibold uppercase">
                      Display Title
                      <input
                        type="text"
                        value={settings.profile?.title || ''}
                        onChange={(e) =>
                          setSettings({
                            ...settings,
                            profile: { ...settings.profile, title: e.target.value },
                          })
                        }
                        className="mt-1 w-full border border-border bg-background px-3 py-2 text-sm"
                      />
                    </label>
                    <label className="text-xs font-semibold uppercase">
                      Contact Email
                      <input
                        type="text"
                        value={settings.profile?.email || ''}
                        onChange={(e) =>
                          setSettings({
                            ...settings,
                            profile: { ...settings.profile, email: e.target.value },
                          })
                        }
                        className="mt-1 w-full border border-border bg-background px-3 py-2 text-sm"
                      />
                    </label>
                    <label className="text-xs font-semibold uppercase">
                      GitHub URL
                      <input
                        type="text"
                        value={settings.profile?.github || ''}
                        onChange={(e) =>
                          setSettings({
                            ...settings,
                            profile: { ...settings.profile, github: e.target.value },
                          })
                        }
                        className="mt-1 w-full border border-border bg-background px-3 py-2 text-sm"
                      />
                    </label>
                    <label className="text-xs font-semibold uppercase">
                      LinkedIn URL
                      <input
                        type="text"
                        value={settings.profile?.linkedin || ''}
                        onChange={(e) =>
                          setSettings({
                            ...settings,
                            profile: { ...settings.profile, linkedin: e.target.value },
                          })
                        }
                        className="mt-1 w-full border border-border bg-background px-3 py-2 text-sm"
                      />
                    </label>

                    {/* About Photo Upload */}
                    <div className="flex flex-col gap-2 sm:col-span-2 border border-border/60 bg-background/50 p-3">
                      <span className="font-semibold uppercase text-gold text-xs">About Section Photo</span>
                      <div className="flex items-center gap-3">
                        <label className="btn-ghost flex cursor-pointer items-center gap-2 px-3 py-2 text-xs">
                          {uploading ? (
                            <Loader2 className="size-4 animate-spin text-gold" />
                          ) : (
                            <Upload className="size-4 text-gold" />
                          )}
                          <span>{uploading ? 'Uploading...' : 'Upload New Photo'}</span>
                          <input
                            type="file"
                            accept="image/*"
                            disabled={uploading}
                            className="hidden"
                            onChange={async (e) => {
                              const file = e.target.files?.[0]
                              if (file) {
                                const url = await handleFileUpload(file, 'profile')
                                if (url) {
                                  setSettings({
                                    ...settings,
                                    profile: { ...settings.profile, aboutPhoto: url },
                                  })
                                }
                              }
                            }}
                          />
                        </label>
                        <input
                          type="text"
                          value={settings.profile?.aboutPhoto || ''}
                          onChange={(e) =>
                            setSettings({
                              ...settings,
                              profile: { ...settings.profile, aboutPhoto: e.target.value },
                            })
                          }
                          placeholder="/images/about-photo.webp"
                          className="flex-1 border border-border bg-background px-3 py-2 text-xs"
                        />
                      </div>
                    </div>
                  </div>
                </div>

                {/* About Mission Briefing Lines */}
                <div className="hud-card p-6 flex flex-col gap-4">
                  <div className="flex items-center justify-between">
                    <div>
                      <h4 className="font-display text-xl text-mystic">About Mission Briefing Points</h4>
                      <p className="text-[11px] text-muted-foreground">Edit each paragraph/bullet point shown in the About section.</p>
                    </div>
                  </div>

                  <div className="flex flex-col gap-3">
                    {settings.aboutLines?.map((line: any, idx: number) => (
                      <div key={idx} className="flex flex-col gap-1 border border-border/60 bg-background/50 p-3">
                        <div className="flex items-center justify-between">
                          <span className="text-[10px] font-semibold tracking-widest text-arc uppercase">
                            #{String(idx + 1).padStart(2, '0')} — {line.tag}
                          </span>
                        </div>
                        <input
                          type="text"
                          value={line.tag}
                          onChange={(e) => {
                            const newLines = [...settings.aboutLines]
                            newLines[idx].tag = e.target.value
                            setSettings({ ...settings, aboutLines: newLines })
                          }}
                          placeholder="Tag (e.g. Identity, Statistics, Training)"
                          className="w-full border border-border bg-background px-2.5 py-1 text-xs text-foreground font-semibold mb-1"
                        />
                        <textarea
                          rows={2}
                          value={line.text}
                          onChange={(e) => {
                            const newLines = [...settings.aboutLines]
                            newLines[idx].text = e.target.value
                            setSettings({ ...settings, aboutLines: newLines })
                          }}
                          className="w-full border border-border bg-background px-2.5 py-1.5 text-xs text-foreground"
                        />
                      </div>
                    ))}
                  </div>
                </div>

                <button onClick={handleSaveSettings} className="btn-primary self-start">
                  <Save className="size-4" /> Save Profile, Stats &amp; About Changes
                </button>
              </div>
            )}

            {/* TAB 6: DATABASE & SECURITY */}
            {activeTab === 'settings' && (
              <div className="flex flex-col gap-6 max-w-3xl">
                <div>
                  <h3 className="font-display text-2xl text-mystic">Database Engine & Security</h3>
                  <p className="text-xs text-muted-foreground">
                    Connect Supabase or Neon PostgreSQL, manage your passkey, and verify protection.
                  </p>
                </div>

                {/* Connection Status Banner */}
                <div className="hud-card p-6 flex flex-col gap-3">
                  <div className="flex items-center justify-between">
                    <span className="text-xs font-semibold tracking-widest uppercase text-muted-foreground">
                      Current Storage Mode
                    </span>
                    <span
                      className={`rounded px-2.5 py-1 text-xs font-bold uppercase tracking-wider ${
                        dbStatus.configured ? 'bg-emerald-500/20 text-emerald-400' : 'bg-gold/20 text-gold'
                      }`}
                    >
                      {dbStatus.mode.toUpperCase()}
                    </span>
                  </div>
                  <p className="text-sm">{dbStatus.message}</p>
                </div>

                {/* Setup Guide */}
                <div className="hud-card p-6 flex flex-col gap-4 text-xs leading-relaxed text-muted-foreground">
                  <h4 className="font-display text-xl text-foreground">How to Connect Supabase or Neon</h4>
                  <p>
                    Your portfolio is currently fully persistent and operational. To connect your cloud PostgreSQL database on Vercel or locally, simply add these environment variables:
                  </p>
                  <div className="flex flex-col gap-2 font-mono text-[11px] bg-background/80 p-4 border border-border">
                    <p className="text-arc font-bold"># Option A: For Supabase</p>
                    <p>NEXT_PUBLIC_SUPABASE_URL=https://xyzcompany.supabase.co</p>
                    <p>NEXT_PUBLIC_SUPABASE_ANON_KEY=eyJh...</p>
                    <p>SUPABASE_SERVICE_ROLE_KEY=eyJh... (recommended for admin)</p>
                    <div className="my-2 border-t border-border/50" />
                    <p className="text-gold font-bold"># Option B: For Neon</p>
                    <p>DATABASE_URL=postgres://user:pass@ep-cool-neon.us-east-2.aws.neon.tech/neondb?sslmode=require</p>
                  </div>
                  <p>
                    The complete SQL script is generated at{' '}
                    <code className="text-arc">supabase-neon-schema.sql</code> in your project root. You can run it in your database console in 1 click!
                  </p>
                </div>

                {/* Change Admin Password */}
                <form onSubmit={handleChangePassword} className="hud-card p-6 flex flex-col gap-4">
                  <h4 className="font-display text-xl text-stark flex items-center gap-2">
                    <Lock className="size-5" /> Change Admin Master Passkey
                  </h4>
                  <p className="text-xs text-muted-foreground">
                    Only <strong className="text-arc">mohamed.tamer.8006@gmail.com</strong> can log in to this console. Update your master passkey here:
                  </p>
                  <div className="flex flex-col sm:flex-row gap-3">
                    <input
                      type="password"
                      placeholder="Enter new strong password"
                      value={newPassword}
                      onChange={(e) => setNewPassword(e.target.value)}
                      className="flex-1 border border-border bg-background px-3 py-2 text-sm outline-none focus:border-arc"
                    />
                    <button type="submit" className="btn-primary">
                      Update Passkey
                    </button>
                  </div>
                </form>
              </div>
            )}
          </>
        )}
      </div>

      {/* EDIT PROJECT MODAL */}
      {editingProject && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/80 p-4 backdrop-blur-sm">
          <div className="hud-card flex max-h-[90vh] w-full max-w-2xl flex-col overflow-hidden bg-background p-6">
            <div className="flex items-center justify-between border-b border-border pb-3">
              <h3 className="font-display text-2xl text-stark">
                {editingProject.index !== undefined ? 'Edit Project' : 'New Project Mission'}
              </h3>
              <button
                onClick={() => setEditingProject(null)}
                className="text-muted-foreground hover:text-foreground"
              >
                <X className="size-5" />
              </button>
            </div>

            <div className="flex-1 overflow-y-auto py-4 flex flex-col gap-4 text-xs">
              <div className="grid gap-3 sm:grid-cols-2">
                <label className="font-semibold uppercase">
                  Codename (e.g. Mission 06)
                  <input
                    type="text"
                    value={editingProject.item.codename}
                    onChange={(e) =>
                      setEditingProject({
                        ...editingProject,
                        item: { ...editingProject.item, codename: e.target.value },
                      })
                    }
                    className="mt-1 w-full border border-border bg-background px-3 py-2 text-sm"
                  />
                </label>
                <label className="font-semibold uppercase">
                  Status
                  <select
                    value={editingProject.item.status}
                    onChange={(e) =>
                      setEditingProject({
                        ...editingProject,
                        item: { ...editingProject.item, status: e.target.value },
                      })
                    }
                    className="mt-1 w-full border border-border bg-background px-3 py-2 text-sm"
                  >
                    <option>Deployed</option>
                    <option>In Progress</option>
                    <option>Completed</option>
                    <option>Code available</option>
                  </select>
                </label>
              </div>

              <label className="font-semibold uppercase">
                Project Title
                <input
                  type="text"
                  required
                  value={editingProject.item.title}
                  onChange={(e) =>
                    setEditingProject({
                      ...editingProject,
                      item: { ...editingProject.item, title: e.target.value },
                    })
                  }
                  className="mt-1 w-full border border-border bg-background px-3 py-2 text-sm"
                />
              </label>

              <label className="font-semibold uppercase">
                Tagline
                <input
                  type="text"
                  value={editingProject.item.tagline}
                  onChange={(e) =>
                    setEditingProject({
                      ...editingProject,
                      item: { ...editingProject.item, tagline: e.target.value },
                    })
                  }
                  className="mt-1 w-full border border-border bg-background px-3 py-2 text-sm"
                />
              </label>

              <label className="font-semibold uppercase">
                Description
                <textarea
                  rows={3}
                  value={editingProject.item.description}
                  onChange={(e) =>
                    setEditingProject({
                      ...editingProject,
                      item: { ...editingProject.item, description: e.target.value },
                    })
                  }
                  className="mt-1 w-full border border-border bg-background px-3 py-2 text-sm"
                />
              </label>

              <label className="font-semibold uppercase">
                Role / Result Summary
                <input
                  type="text"
                  value={editingProject.item.role}
                  onChange={(e) =>
                    setEditingProject({
                      ...editingProject,
                      item: { ...editingProject.item, role: e.target.value },
                    })
                  }
                  className="mt-1 w-full border border-border bg-background px-3 py-2 text-sm"
                />
              </label>

              <label className="font-semibold uppercase">
                Tech Stack Tags (comma separated)
                <input
                  type="text"
                  value={editingProject.item.tags?.join(', ')}
                  onChange={(e) =>
                    setEditingProject({
                      ...editingProject,
                      item: {
                        ...editingProject.item,
                        tags: e.target.value.split(',').map((s) => s.trim()).filter(Boolean),
                      },
                    })
                  }
                  className="mt-1 w-full border border-border bg-background px-3 py-2 text-sm"
                />
              </label>

              <div className="flex flex-col gap-2 border border-border/60 bg-background/50 p-3">
                <span className="font-semibold uppercase text-arc">Project Screenshot / Cover</span>
                
                {/* File Upload Input */}
                <div className="flex items-center gap-2">
                  <label className="btn-ghost flex cursor-pointer items-center gap-2 px-3 py-2 text-xs">
                    {uploading ? (
                      <Loader2 className="size-4 animate-spin text-arc" />
                    ) : (
                      <Upload className="size-4 text-arc" />
                    )}
                    <span>{uploading ? 'Uploading...' : 'Upload Screenshot from Computer'}</span>
                    <input
                      type="file"
                      accept="image/*"
                      disabled={uploading}
                      className="hidden"
                      onChange={async (e) => {
                        const file = e.target.files?.[0]
                        if (file) {
                          const url = await handleFileUpload(file, 'projects')
                          if (url) {
                            setEditingProject({
                              ...editingProject,
                              item: { ...editingProject.item, image: url },
                            })
                          }
                        }
                      }}
                    />
                  </label>
                  <span className="text-[10px] text-muted-foreground">PNG, JPG, WebP</span>
                </div>

                {/* Or Direct Path Input */}
                <label className="mt-1 flex flex-col gap-1 font-semibold uppercase text-[10px] text-muted-foreground">
                  Or Image Path / URL:
                  <input
                    type="text"
                    value={editingProject.item.image || ''}
                    onChange={(e) =>
                      setEditingProject({
                        ...editingProject,
                        item: { ...editingProject.item, image: e.target.value || null },
                      })
                    }
                    placeholder="/images/projects/..."
                    className="w-full border border-border bg-background px-3 py-2 text-sm text-foreground"
                  />
                </label>

                {/* Preview */}
                {editingProject.item.image && (
                  <div className="relative mt-2 aspect-[16/10] w-full max-w-[240px] overflow-hidden border border-arc/40 bg-black/40">
                    {/* eslint-disable-next-line @next/next/no-img-element */}
                    <img
                      src={editingProject.item.image}
                      alt="Project Preview"
                      className="size-full object-cover"
                    />
                    <button
                      type="button"
                      onClick={() =>
                        setEditingProject({
                          ...editingProject,
                          item: { ...editingProject.item, image: null },
                        })
                      }
                      className="absolute top-1 right-1 bg-black/80 p-1 text-stark hover:text-white"
                      title="Remove image"
                    >
                      <X className="size-3" />
                    </button>
                  </div>
                )}
              </div>

              {/* Links section */}
              <div className="flex flex-col gap-2 border border-border/60 bg-background/50 p-3">
                <div className="flex items-center justify-between">
                  <span className="font-semibold uppercase text-arc">Project Links (Code & Live Demos)</span>
                  <button
                    type="button"
                    onClick={() => {
                      const currentLinks = editingProject.item.links || []
                      setEditingProject({
                        ...editingProject,
                        item: {
                          ...editingProject.item,
                          links: [...currentLinks, { label: 'View Demo', href: 'https://', kind: 'live' }],
                        },
                      })
                    }}
                    className="btn-ghost px-2 py-0.5 text-[10px]"
                  >
                    + Add Link
                  </button>
                </div>

                {editingProject.item.links?.map((lnk, li) => (
                  <div key={li} className="flex items-center gap-2">
                    <input
                      type="text"
                      placeholder="Label (e.g. Live Demo)"
                      value={lnk.label}
                      onChange={(e) => {
                        const updatedLinks = [...editingProject.item.links]
                        updatedLinks[li].label = e.target.value
                        setEditingProject({
                          ...editingProject,
                          item: { ...editingProject.item, links: updatedLinks },
                        })
                      }}
                      className="w-32 border border-border bg-background px-2 py-1 text-xs"
                    />
                    <input
                      type="text"
                      placeholder="URL (https://...)"
                      value={lnk.href}
                      onChange={(e) => {
                        const updatedLinks = [...editingProject.item.links]
                        updatedLinks[li].href = e.target.value
                        setEditingProject({
                          ...editingProject,
                          item: { ...editingProject.item, links: updatedLinks },
                        })
                      }}
                      className="flex-1 border border-border bg-background px-2 py-1 text-xs"
                    />
                    <select
                      value={lnk.kind}
                      onChange={(e) => {
                        const updatedLinks = [...editingProject.item.links]
                        updatedLinks[li].kind = e.target.value as 'code' | 'live'
                        setEditingProject({
                          ...editingProject,
                          item: { ...editingProject.item, links: updatedLinks },
                        })
                      }}
                      className="border border-border bg-background px-2 py-1 text-xs"
                    >
                      <option value="code">Code</option>
                      <option value="live">Live</option>
                    </select>
                    <button
                      type="button"
                      onClick={() => {
                        const updatedLinks = editingProject.item.links.filter((_, idx) => idx !== li)
                        setEditingProject({
                          ...editingProject,
                          item: { ...editingProject.item, links: updatedLinks },
                        })
                      }}
                      className="text-stark hover:text-white"
                    >
                      <X className="size-3.5" />
                    </button>
                  </div>
                ))}
              </div>
            </div>

            <div className="flex items-center justify-end gap-3 border-t border-border pt-4">
              <button onClick={() => setEditingProject(null)} className="btn-ghost">
                Cancel
              </button>
              <button
                onClick={() => handleSaveProject(editingProject.item, editingProject.index)}
                className="btn-primary"
              >
                Save Project
              </button>
            </div>
          </div>
        </div>
      )}

      {/* EDIT CERTIFICATE MODAL */}
      {editingCert && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/80 p-4 backdrop-blur-sm">
          <div className="hud-card flex max-h-[90vh] w-full max-w-lg flex-col overflow-hidden bg-background p-6">
            <div className="flex items-center justify-between border-b border-border pb-3">
              <h3 className="font-display text-2xl text-gold">
                {editingCert.index !== undefined ? 'Edit Certificate' : 'New Certificate'}
              </h3>
              <button onClick={() => setEditingCert(null)} className="text-muted-foreground hover:text-foreground">
                <X className="size-5" />
              </button>
            </div>

            <div className="flex-1 overflow-y-auto py-4 flex flex-col gap-4 text-xs">
              <label className="font-semibold uppercase">
                Certificate Title
                <input
                  type="text"
                  required
                  value={editingCert.item.title}
                  onChange={(e) =>
                    setEditingCert({
                      ...editingCert,
                      item: { ...editingCert.item, title: e.target.value },
                    })
                  }
                  className="mt-1 w-full border border-border bg-background px-3 py-2 text-sm"
                />
              </label>

              <label className="font-semibold uppercase">
                Issuer (e.g. Huawei, Google Cloud, MCIT)
                <input
                  type="text"
                  value={editingCert.item.issuer}
                  onChange={(e) =>
                    setEditingCert({
                      ...editingCert,
                      item: { ...editingCert.item, issuer: e.target.value },
                    })
                  }
                  className="mt-1 w-full border border-border bg-background px-3 py-2 text-sm"
                />
              </label>

              <label className="font-semibold uppercase">
                Year / Date (e.g. Sep 2026)
                <input
                  type="text"
                  value={editingCert.item.year}
                  onChange={(e) =>
                    setEditingCert({
                      ...editingCert,
                      item: { ...editingCert.item, year: e.target.value },
                    })
                  }
                  className="mt-1 w-full border border-border bg-background px-3 py-2 text-sm"
                />
              </label>

              <div className="flex flex-col gap-2 border border-border/60 bg-background/50 p-3">
                <span className="font-semibold uppercase text-gold">Certificate Photo</span>
                
                {/* File Upload Input */}
                <div className="flex items-center gap-2">
                  <label className="btn-ghost flex cursor-pointer items-center gap-2 px-3 py-2 text-xs">
                    {uploading ? (
                      <Loader2 className="size-4 animate-spin text-gold" />
                    ) : (
                      <Upload className="size-4 text-gold" />
                    )}
                    <span>{uploading ? 'Uploading...' : 'Upload Image from Computer'}</span>
                    <input
                      type="file"
                      accept="image/*"
                      disabled={uploading}
                      className="hidden"
                      onChange={async (e) => {
                        const file = e.target.files?.[0]
                        if (file) {
                          const url = await handleFileUpload(file, 'certs')
                          if (url) {
                            setEditingCert({
                              ...editingCert,
                              item: { ...editingCert.item, image: url },
                            })
                          }
                        }
                      }}
                    />
                  </label>
                  <span className="text-[10px] text-muted-foreground">PNG, JPG, WebP</span>
                </div>

                {/* Or Direct Path Input */}
                <label className="mt-1 flex flex-col gap-1 font-semibold uppercase text-[10px] text-muted-foreground">
                  Or Image Path / URL:
                  <input
                    type="text"
                    value={editingCert.item.image || ''}
                    onChange={(e) =>
                      setEditingCert({
                        ...editingCert,
                        item: { ...editingCert.item, image: e.target.value || null },
                      })
                    }
                    placeholder="/images/certs/..."
                    className="w-full border border-border bg-background px-3 py-2 text-sm text-foreground"
                  />
                </label>

                {/* Preview */}
                {editingCert.item.image && (
                  <div className="relative mt-2 aspect-[4/3] w-full max-w-[200px] overflow-hidden border border-gold/40 bg-black/40">
                    {/* eslint-disable-next-line @next/next/no-img-element */}
                    <img
                      src={editingCert.item.image}
                      alt="Certificate Preview"
                      className="size-full object-contain"
                    />
                    <button
                      type="button"
                      onClick={() =>
                        setEditingCert({
                          ...editingCert,
                          item: { ...editingCert.item, image: null },
                        })
                      }
                      className="absolute top-1 right-1 bg-black/80 p-1 text-stark hover:text-white"
                      title="Remove image"
                    >
                      <X className="size-3" />
                    </button>
                  </div>
                )}
              </div>
            </div>

            <div className="flex items-center justify-end gap-3 border-t border-border pt-4">
              <button onClick={() => setEditingCert(null)} className="btn-ghost">
                Cancel
              </button>
              <button
                onClick={() => handleSaveCertificate(editingCert.item, editingCert.index)}
                className="btn-primary"
              >
                Save Certificate
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  )
}
