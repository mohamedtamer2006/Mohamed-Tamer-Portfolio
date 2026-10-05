import { ArrowUp } from 'lucide-react'
import { Wordmark } from '@/components/wordmark'

export function SiteFooter() {
  return (
    <footer className="border-t border-border py-10">
      <div className="mx-auto flex max-w-6xl flex-col items-center justify-between gap-6 px-4 md:flex-row">
        <Wordmark className="text-3xl" />
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
