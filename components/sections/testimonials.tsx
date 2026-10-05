import { Quote, Star } from 'lucide-react'
import { Reveal } from '@/components/reveal'
import { SectionHeading } from '@/components/section-heading'
import { testimonials } from '@/lib/portfolio-data'

export function Testimonials() {
  return (
    <section id="testimonials" className="scroll-mt-16 py-24 md:py-32">
      <div className="mx-auto max-w-6xl px-4">
        <SectionHeading index="10" code="Intel Reports" label="Testimonials" />

        <div className="grid gap-6 md:grid-cols-3">
          {testimonials.map((t, i) => (
            <Reveal key={i} delay={i * 100}>
              <figure className="hud-card flex h-full flex-col gap-5 p-7">
                <div className="flex items-center justify-between">
                  <Quote className="size-9 text-stark" aria-hidden="true" />
                  <div className="flex gap-0.5 text-gold" aria-label="5 out of 5 stars">
                    {Array.from({ length: 5 }, (_, s) => (
                      <Star key={s} className="size-4 fill-current" aria-hidden="true" />
                    ))}
                  </div>
                </div>
                <blockquote className="flex-1 text-pretty leading-relaxed text-foreground/90">{t.quote}</blockquote>
                <figcaption className="flex items-center gap-3 border-t border-border pt-4">
                  <span className="flex size-10 items-center justify-center rounded-full bg-cap font-display text-lg text-white">
                    {i + 1}
                  </span>
                  <span>
                    <span className="block font-semibold">{t.name}</span>
                    <span className="block text-xs tracking-[0.15em] text-muted-foreground uppercase">{t.role}</span>
                  </span>
                </figcaption>
              </figure>
            </Reveal>
          ))}
        </div>
      </div>
    </section>
  )
}
