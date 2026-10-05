import { ArrowUpRight, Bot, BrainCircuit, Layers, Server } from 'lucide-react'
import { Reveal } from '@/components/reveal'
import { SectionHeading } from '@/components/section-heading'
import { services } from '@/lib/portfolio-data'

const icons = { bot: Bot, server: Server, brain: BrainCircuit, layers: Layers }

export function Services() {
  return (
    <section id="services" className="scroll-mt-16 py-24 md:py-32">
      <div className="mx-auto max-w-6xl px-4">
        <SectionHeading
          index="08"
          code="Call for Backup"
          label="Services"
          intro="Need a specialist on your team? Here is what I can take off your plate."
        />

        <div className="grid gap-5 sm:grid-cols-2">
          {services.map((service, i) => {
            const Icon = icons[service.icon]
            return (
              <Reveal key={service.title} delay={i * 80}>
                <a href="#contact" className="hud-card group flex h-full items-start gap-5 p-6 md:p-8">
                  <span className="flex size-14 shrink-0 items-center justify-center bg-stark/10 text-stark ring-1 ring-stark/40 transition-colors clip-hud group-hover:bg-stark group-hover:text-white">
                    <Icon className="size-6" aria-hidden="true" />
                  </span>
                  <span className="flex flex-1 flex-col gap-2">
                    <span className="font-display text-3xl leading-none">{service.title}</span>
                    <span className="text-sm leading-relaxed text-muted-foreground">{service.benefit}</span>
                  </span>
                  <ArrowUpRight
                    className="size-5 shrink-0 text-arc transition-transform group-hover:translate-x-1 group-hover:-translate-y-1"
                    aria-hidden="true"
                  />
                </a>
              </Reveal>
            )
          })}
        </div>
      </div>
    </section>
  )
}
