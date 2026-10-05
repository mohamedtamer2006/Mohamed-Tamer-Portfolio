import { ArcReactorGlyph, MjolnirGlyph } from '@/components/motifs'
import { cn } from '@/lib/utils'

export function Wordmark({ className, stacked = false }: { className?: string; stacked?: boolean }) {
  return (
    <span
      className={cn(
        'font-display inline-flex items-baseline gap-x-[0.25em] whitespace-nowrap uppercase',
        stacked ? 'flex-wrap gap-y-[0.02em] leading-[0.85]' : 'shrink-0 flex-nowrap leading-none',
        className,
      )}
      role="img"
      aria-label="Mohamed Tamer"
    >
      <span className={cn('inline-flex items-baseline', stacked && 'basis-full [justify-content:inherit]')}>
        M
        <ArcReactorGlyph className="mx-[0.02em]" />
        HAMED
      </span>
      <span className="inline-flex items-baseline text-stark">
        <MjolnirGlyph className="mr-[0.03em]" />
        AMER
      </span>
    </span>
  )
}
