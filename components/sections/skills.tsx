import { InfinityStone } from '@/components/motifs'
import { Reveal } from '@/components/reveal'
import { SectionHeading } from '@/components/section-heading'
import { skillGroups, softSkills, spokenLanguages } from '@/lib/portfolio-data'

export function Skills() {
  return (
    <section id="skills" className="relative scroll-mt-16 py-24 md:py-32">
      <div className="mx-auto max-w-6xl px-4">
        <SectionHeading
          index="05"
          code="Arsenal"
          label="Skills"
          intro="Every category is powered by its own Infinity Stone. Together, they cover the full journey from idea to deployed product."
        />

        <Reveal>
          <div className="hud-corners relative border border-border bg-panel p-4 backdrop-blur-sm md:p-6">
            <div className="mb-4 flex items-center justify-between border-b border-border pb-3 text-[10px] font-semibold tracking-[0.35em] text-arc uppercase">
              <span>Stark HUD // Skill matrix</span>
              <span className="flex items-center gap-2">
                <span className="size-1.5 animate-pulse rounded-full bg-stone-time" aria-hidden="true" />
                All systems go
              </span>
            </div>

            <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3">
              {skillGroups.map((group, i) => (
                <Reveal key={group.category} delay={i * 80}>
                  <article
                    className="group relative h-full overflow-hidden border border-border bg-background/50 p-5 transition-all duration-300 hover:-translate-y-1"
                    style={{ ['--stone' as string]: group.color }}
                  >
                    <span
                      className="absolute inset-x-0 top-0 h-0.5 opacity-70 transition-opacity group-hover:opacity-100"
                      style={{ background: group.color, boxShadow: `0 0 16px ${group.color}` }}
                      aria-hidden="true"
                    />
                    <div className="mb-4 flex items-center gap-3">
                      <InfinityStone stone={group.stone} color={group.color} className="size-7" />
                      <div>
                        <h3 className="font-display text-3xl leading-none">{group.category}</h3>
                        <p className="text-[10px] font-semibold tracking-[0.3em] uppercase" style={{ color: group.color }}>
                          {group.stone}
                        </p>
                      </div>
                    </div>
                    <ul className="flex flex-wrap gap-2">
                      {group.skills.map((skill) => (
                        <li
                          key={skill}
                          className="border px-2.5 py-1 text-xs font-medium transition-colors group-hover:bg-[color-mix(in_oklab,var(--stone)_10%,transparent)]"
                          style={{ borderColor: `color-mix(in oklab, ${group.color} 45%, transparent)` }}
                        >
                          {skill}
                        </li>
                      ))}
                    </ul>
                  </article>
                </Reveal>
              ))}

              <Reveal className="md:col-span-2 lg:col-span-3">
                <div className="flex flex-wrap items-center gap-x-8 gap-y-3 border border-cap/40 bg-cap/5 p-5">
                  <p className="font-display text-3xl leading-none text-cap" style={{ textShadow: '0 0 18px var(--cap)' }}>Soft Skills</p>
                  {softSkills.map((s) => (
                    <p key={s} className="text-sm font-semibold">{s}</p>
                  ))}
                </div>
              </Reveal>

              <Reveal className="md:col-span-2 lg:col-span-3">
                <div className="flex flex-wrap items-center gap-x-8 gap-y-3 border border-mystic/40 bg-mystic/5 p-5">
                  <p className="font-display text-3xl leading-none text-mystic glow-mystic">Tongues</p>
                  {spokenLanguages.map((l) => (
                    <p key={l.name} className="text-sm">
                      <span className="font-semibold">{l.name}</span> <span className="text-muted-foreground">· {l.level}</span>
                    </p>
                  ))}
                </div>
              </Reveal>
            </div>
          </div>
        </Reveal>
      </div>
    </section>
  )
}
