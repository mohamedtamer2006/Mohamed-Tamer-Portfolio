import Image from 'next/image'
import { Reveal } from '@/components/reveal'
import { SectionHeading } from '@/components/section-heading'
import { experience, leadership } from '@/lib/portfolio-data'

export function Experience() {
  return (
    <section id="experience" className="scroll-mt-16 py-24 md:py-32">
      <div className="mx-auto max-w-4xl px-4">
        <SectionHeading index="07" code="Field Log" label="Work Experience" />

        <ol className="relative flex flex-col gap-10 border-l-2 border-border pl-8 md:pl-12">
          <span
            className="absolute top-0 -left-[2px] h-full w-0.5 bg-gradient-to-b from-stark via-gold to-arc"
            aria-hidden="true"
          />
          {experience.map((item, i) => (
            <li key={item.role} className="relative">
              <span
                className="absolute top-2 -left-[calc(2rem+9px)] flex size-4 items-center justify-center rounded-full border-2 border-arc bg-background shadow-[0_0_14px_var(--arc)] md:-left-[calc(3rem+9px)]"
                aria-hidden="true"
              >
                <span className="size-1.5 rounded-full bg-arc" />
              </span>
              <Reveal delay={i * 100}>
                <article className="hud-card flex flex-col gap-4 p-6 md:p-8">
                  <p className="text-[11px] font-semibold tracking-[0.3em] text-arc uppercase">{item.period}</p>
                  <div>
                    <h3 className="font-display text-3xl leading-none md:text-4xl">{item.role}</h3>
                    <p className="mt-1 font-medium text-gold">{item.org}</p>
                  </div>
                  <ul className="flex flex-col gap-2.5">
                    {item.points.map((point) => (
                      <li key={point} className="flex gap-3 text-sm leading-relaxed text-muted-foreground md:text-base">
                        <span className="mt-2 size-1.5 shrink-0 rotate-45 bg-stark" aria-hidden="true" />
                        {point}
                      </li>
                    ))}
                  </ul>
                </article>
              </Reveal>
            </li>
          ))}
        </ol>

        <h3 className="mt-20 mb-6 font-display text-4xl text-mystic glow-mystic">Leadership &amp; Involvement</h3>
        <div className="flex flex-col gap-5">
          {leadership.map((l, i) => (
            <Reveal key={l.title} delay={i * 100}>
              <article className="hud-card flex h-full flex-col gap-4 border-mystic/30 p-6">
                <p className="text-[11px] font-semibold tracking-[0.3em] text-mystic uppercase">{l.period}</p>
                <h4 className="font-display text-2xl leading-tight">{l.title}</h4>
                <p className="text-sm leading-relaxed text-muted-foreground">{l.text}</p>
                {l.photos && l.photos.length > 0 && (
                  <div className="mt-2 grid grid-cols-2 gap-2 sm:grid-cols-3 lg:grid-cols-5">
                    {l.photos.map((photo, pi) => (
                      <div key={pi} className="relative aspect-[4/3] overflow-hidden border border-mystic/20">
                        <Image
                          src={photo}
                          alt={`${l.title} — photo ${pi + 1}`}
                          fill
                          className="object-cover transition-transform duration-500 hover:scale-110"
                          sizes="(max-width: 640px) 50vw, (max-width: 1024px) 33vw, 20vw"
                        />
                      </div>
                    ))}
                  </div>
                )}
              </article>
            </Reveal>
          ))}
        </div>
      </div>
    </section>
  )
}
