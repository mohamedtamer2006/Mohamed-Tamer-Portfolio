import Image from 'next/image'
import { GraduationCap, Cpu } from 'lucide-react'
import { Reveal } from '@/components/reveal'
import { SectionHeading } from '@/components/section-heading'
import { education } from '@/lib/portfolio-data'

const icons = [GraduationCap, Cpu]

export function Education() {
  return (
    <section id="education" className="scroll-mt-16 py-24 md:py-32">
      <div className="mx-auto max-w-6xl px-4">
        <SectionHeading index="04" code="Origin Story" label="Education" />

        <div className="grid gap-6 md:grid-cols-2">
          {education.map((item, i) => {
            const Icon = icons[i % icons.length]
            return (
              <Reveal key={item.title} delay={i * 120}>
                <article className="hud-card group flex h-full flex-col gap-5 p-7 md:p-8">
                  <div className="flex items-start justify-between gap-4">
                    <span className="flex size-14 items-center justify-center bg-cap text-white clip-hud">
                      <Icon className="size-6" aria-hidden="true" />
                    </span>
                    <span className="border border-arc/40 px-3 py-1 text-[11px] font-semibold tracking-[0.2em] text-arc uppercase">
                      {item.period}
                    </span>
                  </div>
                  <div className="flex flex-col gap-2">
                    <h3 className="font-display text-4xl leading-none">{item.title}</h3>
                    <p className="font-medium text-foreground/90">{item.org}</p>
                    <p className="text-sm font-semibold tracking-[0.15em] text-gold uppercase">{item.status}</p>
                  </div>
                  {item.image && (
                    <div className="relative aspect-video w-full overflow-hidden border border-border/80">
                      <Image
                        src={item.image}
                        alt={item.title}
                        fill
                        className="object-cover transition-transform duration-500 group-hover:scale-105"
                        sizes="(max-width: 768px) 100vw, 50vw"
                      />
                    </div>
                  )}
                  <ul className="mt-auto flex flex-col gap-2 border-t border-border pt-5">
                    {item.points.map((point) => (
                      <li key={point} className="flex gap-3 text-sm leading-relaxed text-muted-foreground">
                        <span className="mt-2 size-1.5 shrink-0 rotate-45 bg-stark" aria-hidden="true" />
                        {point}
                      </li>
                    ))}
                  </ul>
                </article>
              </Reveal>
            )
          })}
        </div>
      </div>
    </section>
  )
}
