import { BrainCircuit, MessagesSquare, Server, Zap } from 'lucide-react'
import { Reveal } from '@/components/reveal'
import { SectionHeading } from '@/components/section-heading'
import { usps } from '@/lib/portfolio-data'

const icons = { brain: BrainCircuit, server: Server, zap: Zap, message: MessagesSquare }
const accents = {
  arc: 'var(--arc)',
  stark: 'var(--stark)',
  gold: 'var(--gold)',
  cap: 'var(--cap)',
}

export function Usp() {
  return (
    <section id="why-me" className="relative scroll-mt-16 overflow-hidden py-24 md:py-32">
      <div className="halftone pointer-events-none absolute inset-0 text-stark opacity-[0.05] [mask-image:linear-gradient(to_bottom,transparent,black_30%,black_70%,transparent)]" aria-hidden="true" />
      <div className="relative mx-auto max-w-6xl px-4">
        <SectionHeading
          index="03"
          code="Superpowers"
          label="Why Hire Me"
          intro="Four reasons clients and recruiters call me in when it matters."
        />

        <div className="grid gap-5 sm:grid-cols-2 lg:grid-cols-4">
          {usps.map((usp, i) => {
            const Icon = icons[usp.icon]
            const color = accents[usp.accent]
            return (
              <Reveal key={usp.title} delay={i * 90}>
                <article
                  className="hud-card group flex h-full flex-col gap-5 overflow-hidden p-6"
                  style={{ ['--hud-c' as string]: color }}
                >
                  <span className="hud-corners pointer-events-none absolute inset-0 opacity-70" style={{ ['--hud-c' as string]: color }} aria-hidden="true" />
                  <span
                    className="font-display pointer-events-none absolute -top-4 -right-1 text-8xl leading-none text-outline opacity-30 transition-opacity group-hover:opacity-60"
                    style={{ ['--stroke' as string]: color }}
                    aria-hidden="true"
                  >
                    {String(i + 1).padStart(2, '0')}
                  </span>
                  <span
                    className="flex size-12 items-center justify-center rounded-full border-2 transition-transform duration-300 group-hover:scale-110"
                    style={{ borderColor: color, color, boxShadow: `0 0 24px -6px ${color}` }}
                  >
                    <Icon className="size-5" aria-hidden="true" />
                  </span>
                  <h3 className="font-display text-3xl leading-none">{usp.title}</h3>
                  <p className="text-sm leading-relaxed text-muted-foreground">{usp.text}</p>
                </article>
              </Reveal>
            )
          })}
        </div>
      </div>
    </section>
  )
}
