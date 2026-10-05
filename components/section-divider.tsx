import { ArcReactorGlyph, EyeOfAgamotto, LightningBolt, ShieldRings } from '@/components/motifs'

export function SectionDivider({ emblem = 'shield' }: { emblem?: 'shield' | 'reactor' | 'bolt' | 'eye' }) {
  return (
    <div className="mx-auto flex max-w-6xl items-center gap-4 px-4" aria-hidden="true">
      <span className="h-px flex-1 bg-gradient-to-r from-transparent via-stark/60 to-gold/70" />
      <LightningBolt className="h-4 w-3 text-gold" />
      <span className="flex size-12 items-center justify-center rounded-full border border-arc/40 bg-background shadow-[0_0_30px_-6px_var(--arc)]">
        {emblem === 'shield' && <ShieldRings className="size-8" />}
        {emblem === 'reactor' && <ArcReactorGlyph className="!size-8" />}
        {emblem === 'eye' && <EyeOfAgamotto className="size-8" />}
        {emblem === 'bolt' && <LightningBolt className="h-7 w-5 text-arc" />}
      </span>
      <LightningBolt className="h-4 w-3 -scale-x-100 text-gold" />
      <span className="h-px flex-1 bg-gradient-to-l from-transparent via-cap/60 to-arc/70" />
    </div>
  )
}
