import Image from 'next/image'
import { ArcReactor, SanctumSigil } from '@/components/motifs'
import { Wordmark } from '@/components/wordmark'
import { profile } from '@/lib/portfolio-data'

export function Cover() {
  return (
    <section id="cover" className="relative isolate flex min-h-svh items-center overflow-hidden pt-16" aria-label="Cover">
      <Image
        src="/images/cover-backdrop.png"
        alt=""
        fill
        priority
        className="-z-20 object-cover opacity-25 dark:opacity-70"
        sizes="100vw"
      />
      <div className="absolute inset-0 -z-10 bg-gradient-to-b from-background/40 via-background/50 to-background" aria-hidden="true" />
      <div className="halftone pointer-events-none absolute inset-0 -z-10 text-foreground opacity-[0.06] [mask-image:radial-gradient(ellipse_at_center,transparent_30%,black_80%)]" aria-hidden="true" />

      <div className="pointer-events-none absolute inset-4 hud-corners opacity-60 md:inset-8" aria-hidden="true" />
      <p className="pointer-events-none absolute bottom-10 left-10 hidden text-[10px] tracking-[0.35em] text-arc/80 uppercase md:block" aria-hidden="true">
        30.0444° N · 31.2357° E — Cairo
      </p>

      <div className="mx-auto grid w-full max-w-7xl items-center gap-12 px-6 py-16 lg:grid-cols-[1.2fr_1fr]">
        <div className="order-2 flex flex-col gap-6 text-center lg:order-1 lg:text-left">
          <p className="animate-in fade-in slide-in-from-bottom-4 text-sm font-semibold tracking-[0.4em] text-arc uppercase duration-700 glow-arc md:text-base">
            {profile.title}
          </p>
          <h1 className="animate-in fade-in slide-in-from-bottom-6 duration-1000">
            <Wordmark stacked className="justify-center text-[clamp(4rem,13vw,10.5rem)] lg:justify-start" />
          </h1>
        </div>

        <div className="order-1 flex justify-center lg:order-2">
          <div className="relative aspect-square w-[min(78vw,26rem)] animate-in fade-in zoom-in-90 duration-1000">
            <SanctumSigil className="absolute -inset-[10%] size-[120%] opacity-80 drop-shadow-[0_0_14px_var(--mystic)]" />
            <ArcReactor className="absolute inset-0 size-full opacity-60" />
            <div className="absolute inset-[16%] overflow-hidden rounded-full portal-ring animate-float">
              <Image
                src={profile.coverPhoto || '/images/cover-portrait.webp'}
                alt="Portrait of Mohamed Tamer"
                fill
                priority
                className="size-full object-cover"
                sizes="(min-width: 1024px) 480px, 80vw"
              />
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}
