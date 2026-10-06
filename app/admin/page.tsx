'use client'

import { useState, useEffect } from 'react'
import { Shield, Lock, AlertTriangle, KeyRound, Loader2, ArrowLeft } from 'lucide-react'
import Link from 'next/link'
import { AdminDashboard } from '@/components/admin/admin-dashboard'

export default function AdminPage() {
  const [authenticated, setAuthenticated] = useState<boolean | null>(null)
  const [checkingAuth, setCheckingAuth] = useState(true)
  const [email, setEmail] = useState('mohamed.tamer.8006@gmail.com')
  const [password, setPassword] = useState('')
  const [submitting, setSubmitting] = useState(false)
  const [error, setError] = useState<string | null>(null)

  useEffect(() => {
    async function checkAuth() {
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
    checkAuth()
  }, [])

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

  if (checkingAuth) {
    return (
      <div className="flex min-h-screen flex-col items-center justify-center bg-background p-4 text-foreground">
        <Loader2 className="size-8 animate-spin text-arc" />
        <p className="mt-3 font-display text-xl text-stark">Accessing Sanctum Security Protocol...</p>
      </div>
    )
  }

  if (authenticated) {
    return (
      <main className="min-h-screen bg-background text-foreground">
        <AdminDashboard />
      </main>
    )
  }

  return (
    <main className="flex min-h-screen flex-col items-center justify-center bg-background p-4 text-foreground">
      <div className="w-full max-w-md border border-arc/40 bg-panel/80 p-8 shadow-[0_0_50px_-10px_var(--arc)] backdrop-blur-md">
        <div className="mb-6 flex items-center justify-between border-b border-border pb-4">
          <div className="flex items-center gap-3">
            <span className="flex size-10 items-center justify-center border border-arc bg-arc/10 text-arc shadow-[0_0_15px_var(--arc)]">
              <Shield className="size-5" />
            </span>
            <div>
              <h1 className="font-display text-2xl leading-none text-stark">Sanctum Command</h1>
              <p className="text-[10px] font-semibold tracking-[0.25em] text-arc uppercase">
                Admin Authentication
              </p>
            </div>
          </div>
          <Link href="/" className="text-xs text-muted-foreground hover:text-arc flex items-center gap-1">
            <ArrowLeft className="size-3.5" /> Back
          </Link>
        </div>

        <form onSubmit={handleLogin} className="flex flex-col gap-4 text-xs">
          <div className="rounded border border-stark/30 bg-stark/5 p-3 text-[11px] leading-relaxed text-muted-foreground">
            <span className="font-semibold text-stark uppercase tracking-wider block mb-0.5">
              Strict Access Verification:
            </span>
            Only <strong className="text-arc">mohamed.tamer.8006@gmail.com</strong> is authorized to enter this dashboard.
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
              placeholder="Enter master passkey"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              className="border border-border bg-background px-3 py-2.5 text-sm text-foreground outline-none focus:border-arc"
            />
          </label>

          <button type="submit" disabled={submitting} className="btn-primary mt-2 justify-center py-3 text-sm">
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
        </form>
      </div>
    </main>
  )
}
