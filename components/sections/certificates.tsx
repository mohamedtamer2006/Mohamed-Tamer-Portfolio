import { Award } from 'lucide-react'
import { PhotoPlaceholder } from '@/components/photo-placeholder'
import { Reveal } from '@/components/reveal'
import { SectionHeading } from '@/components/section-heading'
import { certificates } from '@/lib/portfolio-data'

export function Certificates() {
  return (
    <section id="certificates" className="relative scroll-mt-16 overflow-hidden py-24 md:py-32">
      <div
        className="pointer-events-none absolute inset-0 bg-[radial-gradient(ellipse_at_top,color-mix(in_oklab,var(--gold)_16%,transparent),transparent_60%)]"
        aria-hidden="true"
      />
      <div className="relative mx-auto max-w-6xl px-4">
        <SectionHeading
          index="09"
          code="Hall of Honors"
          label="Certificates"
          intro="Medals earned in training. Each one is proof of a skill I put to work."
          align="center"
        />

        <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
          {certificates.map((cert, i) => (
            <Reveal key={`${cert.title}-${i}`} delay={(i % 3) * 90}>
              <article className="group relative flex h-full flex-col items-center gap-4 border border-gold/40 bg-panel p-6 pt-0 text-center transition-all duration-300 hover:-translate-y-1.5 hover:border-gold hover:shadow-[0_20px_60px_-25px_var(--gold)]">
                <div className="flex flex-col items-center" aria-hidden="true">
                  <div className="flex h-10 gap-1">
                    <span className="w-4 bg-stark [clip-path:polygon(0_0,100%_0,100%_100%,50%_80%,0_100%)]" />
                    <span className="w-4 bg-[#f4f6fb] [clip-path:polygon(0_0,100%_0,100%_100%,50%_80%,0_100%)]" />
                    <span className="w-4 bg-cap [clip-path:polygon(0_0,100%_0,100%_100%,50%_80%,0_100%)]" />
                  </div>
                  <span className="-mt-1 flex size-16 items-center justify-center rounded-full bg-[conic-gradient(from_0deg,#b8860b,#ffe08a,#c9971c,#fff3c4,#b8860b)] p-1 shadow-[0_0_30px_-6px_var(--gold)] transition-transform duration-500 group-hover:rotate-[360deg]">
                    <span className="flex size-full items-center justify-center rounded-full bg-[#1a1408] text-gold ring-2 ring-[#ffe08a]/50">
                      <Award className="size-6" />
                    </span>
                  </span>
                </div>

                {cert.image && (
                  <PhotoPlaceholder
                    src={cert.image}
                    alt={`${cert.title} certificate`}
                    label="Certificate on file"
                    fit="contain"
                    className="aspect-[4/3] w-full border-gold/40 bg-gold/5 text-gold"
                  />
                )}

                <div className="flex flex-col gap-1">
                  <h3 className="font-display text-2xl leading-tight">{cert.title}</h3>
                  <p className="text-sm text-muted-foreground">
                    {cert.issuer} <span className="text-gold">·</span> {cert.year}
                  </p>
                </div>
              </article>
            </Reveal>
          ))}
        </div>
      </div>
    </section>
  )
}
