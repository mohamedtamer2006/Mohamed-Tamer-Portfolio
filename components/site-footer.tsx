'use client'

import { useRouter } from 'next/navigation'
import { ArrowUp } from 'lucide-react'
import { Wordmark } from '@/components/wordmark'

export function SiteFooter() {
  const router = useRouter()

  function handleOpenAdmin() {
    router.push('/admin')
  }

  return (
    <footer className="border-t border-border py-10">
      <div className="mx-auto flex max-w-6xl flex-col items-center justify-between gap-6 px-4 md:flex-row">
        <button
          type="button"
          onClick={handleOpenAdmin}
          className="text-left cursor-default focus:outline-none"
        >
          <Wordmark className="text-3xl" />
        </button>
        <p className="text-center text-xs tracking-[0.2em] text-muted-foreground uppercase">
          Guarded by the Sanctum · Designed & built by Mohamed Tamer · Cairo, Egypt · {new Date().getFullYear()}
        </p>
        <a href="#cover" className="btn-ghost px-4 py-2 text-xs">
          <ArrowUp className="size-4" aria-hidden="true" /> Back to top
        </a>
      </div>
    </footer>
  )
}
