import { Reveal } from '@/components/reveal'
import { cn } from '@/lib/utils'

export function SectionHeading({
  index,
  code,
  label,
  intro,
  align = 'left',
}: {
  index: string
  code: string
  label: string
  intro?: string
  align?: 'left' | 'center'
}) {
  return (
    <Reveal className={cn('mb-12 flex flex-col gap-4 md:mb-16', align === 'center' && 'items-center text-center')}>
      <p className="flex items-center gap-3 text-[11px] font-semibold tracking-[0.35em] text-arc uppercase">
        <span className="inline-block size-1.5 rotate-45 bg-stark" aria-hidden="true" />
        File {index} <span className="h-px w-10 bg-arc/50" aria-hidden="true" /> Sanctum Archive: Level 7
      </p>
      <h2 className={cn('flex flex-wrap items-center gap-x-5 gap-y-3', align === 'center' && 'justify-center')}>
        <span className="font-display text-5xl leading-[0.9] text-balance md:text-7xl">{code}</span>
        <span className="border border-gold/60 bg-gold/10 px-3 py-1 text-xs font-semibold tracking-[0.25em] text-gold uppercase">
          {label}
        </span>
      </h2>
      {intro ? <p className="max-w-2xl text-pretty text-muted-foreground md:text-lg">{intro}</p> : null}
    </Reveal>
  )
}
