'use client'

import { Send } from 'lucide-react'
import { type FormEvent, useState } from 'react'
import { profile } from '@/lib/portfolio-data'

export function ContactForm() {
  const [sent, setSent] = useState(false)

  function handleSubmit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault()
    const data = new FormData(event.currentTarget)
    const name = String(data.get('name') ?? '').trim()
    const email = String(data.get('email') ?? '').trim()
    const service = String(data.get('service') ?? '')
    const message = String(data.get('message') ?? '').trim()

    const subject = `Project inquiry: ${service} — ${name}`
    const body = `${message}\n\n— ${name}\n${email}`
    window.location.href = `mailto:${profile.email}?subject=${encodeURIComponent(subject)}&body=${encodeURIComponent(body)}`
    setSent(true)
  }

  const field =
    'w-full border border-border bg-background/70 px-4 py-3 text-sm font-normal tracking-normal normal-case outline-none transition-colors placeholder:text-muted-foreground/70 focus:border-arc focus:ring-2 focus:ring-arc/30'

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
      <button type="submit" className="btn-primary justify-center">
        <Send className="size-4" aria-hidden="true" />
        Hire Me
      </button>
      <p className="text-xs text-muted-foreground" aria-live="polite">
        {sent
          ? 'Your email app should open with the message ready. If it does not, email me directly.'
          : 'Opens your email app with the message pre-filled. I reply within 24 hours.'}
      </p>
    </form>
  )
}
