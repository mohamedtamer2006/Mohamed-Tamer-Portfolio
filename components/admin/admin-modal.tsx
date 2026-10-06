'use client'

import { useState, useEffect } from 'react'
import { Shield, Lock, X, AlertTriangle, KeyRound, Loader2 } from 'lucide-react'
import { AdminDashboard } from './admin-dashboard'

export function AdminModal() {
  const [open, setOpen] = useState(false)
  const [authenticated, setAuthenticated] = useState<boolean | null>(null)
  const [checkingAuth, setCheckingAuth] = useState(false)
  const [email, setEmail] = useState('mohamed.tamer.8006@gmail.com')
  const [password, setPassword] = useState('')
  const [submitting, setSubmitting] = useState(false)
  const [error, setError] = useState<string | null>(null)

  // Listen for open events and hotkeys
  useEffect(() => {
    function handleOpenEvent() {
      setOpen(true)
      checkAuth()
    }

    function handleKeyDown(e: KeyboardEvent) {
      // Hotkey: Ctrl+Shift+A or Cmd+Shift+A
      if ((e.ctrlKey || e.metaKey) && e.shiftKey && (e.key === 'A' || e.key === 'a')) {
        e.preventDefault()
        setOpen((prev) => !prev)
        if (!open) checkAuth()
      }
    }

    window.addEventListener('open-sanctum-admin', handleOpenEvent)
    window.addEventListener('keydown', handleKeyDown)

    return () => {
      window.removeEventListener('open-sanctum-admin', handleOpenEvent)
      window.removeEventListener('keydown', handleKeyDown)
    }
  }, [open])

  async function checkAuth() {
    setCheckingAuth(true)
    setError(null)
    try {
      const res = await fetch('/api/admin/auth/me')
      if (res.ok) {
        const data = await res.json()
        setAuthenticated(data.authenticated === true)
      } else {
        setAuthenticated(false)
      }
    } catch {
      setAuthenticated(false)
    } finally {
      setCheckingAuth(false)
    }
  }

  async function handleLogin(e: React.FormEvent) {
    e.preventDefault()
    setSubmitting(true)
    setError(null)

    try {
      const res = await fetch('/api/admin/auth/login', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ email, password }),
      })

      const data = await res.json()

      if (!res.ok) {
        throw new Error(data.error || 'Authentication failed')
      }

      setAuthenticated(true)
      setPassword('')
    } catch (err: any) {
      setError(err.message || 'Access denied.')
    } finally {
      setSubmitting(false)
    }
  }

  if (!open) return null

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/85 p-2 md:p-6 backdrop-blur-md animate-in fade-in duration-200">
      <div className="relative flex max-h-[96vh] w-full max-w-6xl flex-col overflow-hidden border border-arc/40 bg-background shadow-[0_0_50px_-10px_var(--arc)]">
        {checkingAuth ? (
          <div className="flex h-96 flex-col items-center justify-center gap-3 p-8 text-center">
            <Loader2 className="size-8 animate-spin text-arc" />
            <p className="font-display text-xl text-stark">Verifying Security Credentials...</p>
          </div>
        ) : authenticated ? (
          <AdminDashboard onClose={() => setOpen(false)} />
        ) : (
          /* LOGIN FORM MODAL */
          <div className="flex flex-col p-6 sm:p-10 max-w-md mx-auto w-full">
            <div className="flex items-center justify-between border-b border-border pb-4">
              <div className="flex items-center gap-3">
                <span className="flex size-10 items-center justify-center border border-arc bg-arc/10 text-arc shadow-[0_0_15px_var(--arc)]">
                  <Shield className="size-5" />
                </span>
                <div>
                  <h3 className="font-display text-2xl leading-none text-stark">Sanctum Access</h3>
                  <p className="text-[10px] font-semibold tracking-[0.25em] text-arc uppercase">
                    Admin Command Protocol
                  </p>
                </div>
              </div>
              <button
                onClick={() => setOpen(false)}
                className="text-muted-foreground transition-colors hover:text-gold"
              >
                <X className="size-5" />
              </button>
            </div>

            <form onSubmit={handleLogin} className="mt-6 flex flex-col gap-4 text-xs">
              <div className="rounded border border-stark/30 bg-stark/5 p-3 text-[11px] leading-relaxed text-muted-foreground">
                <span className="font-semibold text-stark uppercase tracking-wider block mb-0.5">
                  Authorized Administrator Only:
                </span>
                Access is restricted strictly to verified identity{' '}
                <strong className="text-arc">mohamed.tamer.8006@gmail.com</strong>.
              </div>

              {error && (
                <div className="flex items-start gap-2 border border-stark bg-stark/15 p-3 text-xs text-stark">
                  <AlertTriangle className="size-4 shrink-0 mt-0.5" />
                  <span>{error}</span>
                </div>
              )}

              <label className="flex flex-col gap-1.5 font-semibold tracking-wider uppercase">
                Admin Email
                <input
                  type="email"
                  required
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  className="border border-border bg-background px-3 py-2.5 text-sm text-foreground outline-none focus:border-arc"
                />
              </label>

              <label className="flex flex-col gap-1.5 font-semibold tracking-wider uppercase">
                Master Passkey
                <input
                  type="password"
                  required
                  autoFocus
                  placeholder="Enter your admin passkey"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  className="border border-border bg-background px-3 py-2.5 text-sm text-foreground outline-none focus:border-arc"
                />
              </label>

              <button
                type="submit"
                disabled={submitting}
                className="btn-primary mt-2 justify-center py-3 text-sm"
              >
                {submitting ? (
                  <>
                    <Loader2 className="size-4 animate-spin" /> Verifying...
                  </>
                ) : (
                  <>
                    <KeyRound className="size-4" /> Authenticate &amp; Open Command
                  </>
                )}
              </button>

              <p className="text-[10px] text-center text-muted-foreground mt-2">
                Protected by HMAC SHA-256 session encryption &amp; audit logging.
              </p>
            </form>
          </div>
        )}
      </div>
    </div>
  )
}
