'use client'

import { Send, CheckCircle2, Loader2, Mail } from 'lucide-react'
import { type FormEvent, useState } from 'react'
import { profile } from '@/lib/portfolio-data'

export function ContactForm() {
  const [sent, setSent] = useState(false)
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState<string | null>(null)

  async function handleSubmit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault()
    setLoading(true)
    setError(null)

    const data = new FormData(event.currentTarget)
    const name = String(data.get('name') ?? '').trim()
    const email = String(data.get('email') ?? '').trim()
    const service = String(data.get('service') ?? '')
    const message = String(data.get('message') ?? '').trim()

    try {
      // 1. Save to Database & Sanctum Dashboard
      const res = await fetch('/api/contact', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ name, email, service, message }),
      })

      if (!res.ok) {
        throw new Error('Failed to record message')
      }

      setSent(true)

      // 2. Also prepare mailto fallback
      const subject = `Project inquiry: ${service} — ${name}`
      const body = `${message}\n\n— ${name}\n${email}`
      // Optional subtle prompt to open client if desired
    } catch (err: any) {
      console.warn('Backend save failed, opening mail client directly:', err)
      const subject = `Project inquiry: ${service} — ${name}`
      const body = `${message}\n\n— ${name}\n${email}`
      window.location.href = `mailto:${profile.email}?subject=${encodeURIComponent(subject)}&body=${encodeURIComponent(body)}`
      setSent(true)
    } finally {
      setLoading(false)
    }
  }

  const field =
    'w-full border border-border bg-background/70 px-4 py-3 text-sm font-normal tracking-normal normal-case outline-none transition-colors placeholder:text-muted-foreground/70 focus:border-arc focus:ring-2 focus:ring-arc/30'

  if (sent) {
    return (
      <div className="hud-card flex flex-col items-center justify-center gap-4 p-8 text-center" aria-live="polite">
        <div className="flex size-14 items-center justify-center rounded-full border border-arc/40 bg-arc/10 text-arc shadow-[0_0_20px_var(--arc)]">
          <CheckCircle2 className="size-8" />
        </div>
        <div className="flex flex-col gap-1">
          <h4 className="font-display text-3xl leading-none text-stark">Signal Received</h4>
          <p className="text-xs font-semibold tracking-[0.25em] text-arc uppercase">Logged in Mission Control</p>
        </div>
        <p className="max-w-md text-sm leading-relaxed text-muted-foreground">
          Thank you! Your message has been securely recorded. Mohamed Tamer will review your briefing and reply within 24 hours.
        </p>
        <div className="mt-2 flex flex-wrap justify-center gap-3">
          <button
            type="button"
            onClick={() => setSent(false)}
            className="btn-ghost text-xs"
          >
            Send Another Signal
          </button>
          <a
            href={`mailto:${profile.email}`}
            className="btn-primary text-xs"
          >
            <Mail className="size-3.5" /> Email Directly
          </a>
        </div>
      </div>
    )
  }

  return (
    <form onSubmit={handleSubmit} className="hud-card flex flex-col gap-4 p-6 md:p-8" aria-label="Hire me form">
      <div className="flex items-center justify-between border-b border-border pb-3">
        <p className="font-display text-3xl leading-none">Send a Signal</p>
        <span className="text-[10px] font-semibold tracking-[0.3em] text-arc uppercase">Secure channel</span>
      </div>
      <div className="grid gap-4 sm:grid-cols-2">
        <label className="flex flex-col gap-1.5 text-xs font-semibold tracking-[0.2em] uppercase">
          Name
          <input name="name" required autoComplete="name" placeholder="Tony Stark" className={field} />
        </label>
        <label className="flex flex-col gap-1.5 text-xs font-semibold tracking-[0.2em] uppercase">
          Email
          <input
            name="email"
            type="email"
            required
            autoComplete="email"
            placeholder="you@company.com"
            className={field}
          />
        </label>
      </div>
      <label className="flex flex-col gap-1.5 text-xs font-semibold tracking-[0.2em] uppercase">
        I need help with
        <select name="service" className={field} defaultValue="RAG & AI chatbot">
          <option>RAG & AI chatbot</option>
          <option>FastAPI / backend API</option>
          <option>Machine learning model</option>
          <option>Full-stack web app</option>
          <option>Internship / full-time role</option>
          <option>Something else</option>
        </select>
      </label>
      <label className="flex flex-col gap-1.5 text-xs font-semibold tracking-[0.2em] uppercase">
        Mission details
        <textarea
          name="message"
          required
          rows={4}
          placeholder="Tell me about your project, timeline, and goals."
          className={`${field} resize-y normal-case tracking-normal`}
        />
      </label>
      <button type="submit" disabled={loading} className="btn-primary justify-center">
        {loading ? (
          <>
            <Loader2 className="size-4 animate-spin" aria-hidden="true" />
            Transmitting Signal...
          </>
        ) : (
          <>
            <Send className="size-4" aria-hidden="true" />
            Hire Me
          </>
        )}
      </button>
      <p className="text-xs text-muted-foreground" aria-live="polite">
        Messages are securely logged to the mission control dashboard. I reply within 24 hours.
      </p>
    </form>
  )
}
