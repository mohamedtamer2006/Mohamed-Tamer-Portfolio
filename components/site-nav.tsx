'use client'

import { useEffect, useState } from 'react'
import { Menu, X } from 'lucide-react'
import { ThemeToggle } from '@/components/theme-toggle'
import { Wordmark } from '@/components/wordmark'
import { navLinks } from '@/lib/portfolio-data'
import { cn } from '@/lib/utils'

export function SiteNav() {
  const [open, setOpen] = useState(false)
  const [active, setActive] = useState<string>('')
  const [scrolled, setScrolled] = useState(false)

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 24)
    onScroll()
    window.addEventListener('scroll', onScroll, { passive: true })

    const sections = navLinks
      .map((link) => document.getElementById(link.id))
      .filter((el): el is HTMLElement => Boolean(el))
    const observer = new IntersectionObserver(
      (entries) => {
        for (const entry of entries) {
          if (entry.isIntersecting) setActive(entry.target.id)
        }
      },
      { rootMargin: '-45% 0px -50% 0px' },
    )
    sections.forEach((s) => observer.observe(s))

    return () => {
      window.removeEventListener('scroll', onScroll)
      observer.disconnect()
    }
  }, [])

  return (
    <header
      className={cn(
        'fixed inset-x-0 top-0 z-50 transition-all duration-300',
        scrolled || open ? 'border-b border-border bg-background/85 backdrop-blur-md' : 'bg-transparent',
      )}
    >
      <nav className="mx-auto flex h-16 max-w-7xl items-center justify-between gap-4 px-4" aria-label="Primary">
        <a href="#cover" className="text-2xl" onClick={() => setOpen(false)}>
          <Wordmark />
        </a>

        <ul className="hidden items-center gap-0.5 xl:flex">
          {navLinks.map((link) => (
            <li key={link.id}>
              <a
                href={`#${link.id}`}
                aria-current={active === link.id ? 'true' : undefined}
                className={cn(
                  'relative px-2.5 py-2 text-[11px] font-semibold tracking-[0.18em] uppercase transition-colors hover:text-arc',
                  active === link.id ? 'text-arc' : 'text-muted-foreground',
                )}
              >
                {link.label}
                <span
                  className={cn(
                    'absolute inset-x-2.5 -bottom-0.5 h-0.5 origin-left bg-stark transition-transform duration-300',
                    active === link.id ? 'scale-x-100' : 'scale-x-0',
                  )}
                  aria-hidden="true"
                />
              </a>
            </li>
          ))}
        </ul>

        <div className="flex items-center gap-2">
          <ThemeToggle />
          <a href="#contact" className="btn-primary hidden shrink-0 !px-4 !py-2 !text-xs whitespace-nowrap sm:inline-flex">
            Hire Me
          </a>
          <button
            type="button"
            className="inline-flex size-9 items-center justify-center rounded-full border border-border xl:hidden"
            onClick={() => setOpen((v) => !v)}
            aria-expanded={open}
            aria-controls="mobile-menu"
            aria-label={open ? 'Close menu' : 'Open menu'}
          >
            {open ? <X className="size-4" /> : <Menu className="size-4" />}
          </button>
        </div>
      </nav>

      <div
        id="mobile-menu"
        className={cn(
          'overflow-hidden border-border transition-[max-height] duration-300 xl:hidden',
          open ? 'max-h-[80vh] border-t' : 'max-h-0',
        )}
      >
        <ul className="mx-auto grid max-w-7xl grid-cols-2 gap-1 px-4 py-4 sm:grid-cols-3">
          {navLinks.map((link, i) => (
            <li key={link.id}>
              <a
                href={`#${link.id}`}
                onClick={() => setOpen(false)}
                className={cn(
                  'flex items-center gap-3 border border-transparent px-3 py-3 text-sm font-semibold tracking-[0.15em] uppercase hover:border-arc/40 hover:text-arc',
                  active === link.id ? 'text-arc' : 'text-foreground',
                )}
              >
                <span className="font-display text-base text-stark">{String(i + 2).padStart(2, '0')}</span>
                {link.label}
              </a>
            </li>
          ))}
          <li className="col-span-2 sm:hidden">
            <a href="#contact" onClick={() => setOpen(false)} className="btn-primary w-full">
              Hire Me
            </a>
          </li>
        </ul>
      </div>
    </header>
  )
}
