'use client'

import { Moon, Sun } from 'lucide-react'
import { useTheme } from 'next-themes'

export function ThemeToggle() {
  const { resolvedTheme, setTheme } = useTheme()

  return (
    <button
      type="button"
      onClick={() => setTheme(resolvedTheme === 'dark' ? 'light' : 'dark')}
      className="group inline-flex h-9 items-center gap-2 rounded-full border border-border bg-foreground/5 px-1 text-[11px] font-semibold tracking-[0.2em] uppercase transition-colors hover:border-arc/60"
      aria-label="Switch between dark and light mode"
    >
      <span className="flex size-7 items-center justify-center rounded-full bg-arc/15 text-arc transition-transform group-hover:rotate-12">
        <Moon className="size-4 dark:hidden" aria-hidden="true" />
        <Sun className="hidden size-4 dark:block" aria-hidden="true" />
      </span>
      <span className="hidden pr-2 sm:inline">
        <span className="dark:hidden">Dark</span>
        <span className="hidden dark:inline">Light</span>
      </span>
    </button>
  )
}
