'use client'

import { useEffect, useState } from 'react'
import { ArrowRight } from 'lucide-react'
import { PhotoPlaceholder } from '@/components/photo-placeholder'
import { Reveal } from '@/components/reveal'
import { SectionHeading } from '@/components/section-heading'
import {
  aboutLines as defaultAboutLines,
  profile as defaultProfile,
  stats as defaultStats,
} from '@/lib/portfolio-data'

export function About() {
  const [dataStats, setDataStats] = useState(defaultStats)
  const [dataLines, setDataLines] = useState(defaultAboutLines)
  const [dataProfile, setDataProfile] = useState(defaultProfile)

  useEffect(() => {
    fetch('/api/portfolio-data')
      .then((res) => res.json())
      .then((data) => {
        if (data.stats && Array.isArray(data.stats)) setDataStats(data.stats)
        if (data.aboutLines && Array.isArray(data.aboutLines)) setDataLines(data.aboutLines)
        if (data.profile) setDataProfile(data.profile)
      })
      .catch(() => {})
  }, [])
  return (
    <section id="about" className="scroll-mt-16 py-24 md:py-32">
      <div className="mx-auto max-w-6xl px-4">
        <SectionHeading index="02" code="Mission Briefing" label="About Me" />

        <div className="grid gap-10 lg:grid-cols-[0.8fr_1.2fr] lg:gap-14">
          <Reveal>
            <div className="hud-corners relative p-3 [--hud-c:var(--stark)]">
              <PhotoPlaceholder
                src={dataProfile.aboutPhoto}
                alt="Mohamed Tamer at work"
                hint="Portrait, 4:5 ratio"
                className="aspect-[4/5] w-full"
              />
              <div className="absolute -right-2 -bottom-4 border border-gold/60 bg-background px-4 py-2 text-[11px] font-semibold tracking-[0.25em] text-gold uppercase">
                Agent: M. Tamer
              </div>
            </div>
          </Reveal>

          <div className="flex flex-col gap-8">
            <ol className="flex flex-col divide-y divide-border border-y border-border">
              {dataLines.map((line, i) => (
                <Reveal key={line.tag} delay={i * 60}>
                  <li className="grid gap-1 py-3.5 sm:grid-cols-[8.5rem_1fr] sm:gap-4">
                    <span className="flex items-center gap-2 text-[11px] font-semibold tracking-[0.25em] text-arc uppercase">
                      <span className="font-display text-sm text-stark">{String(i + 1).padStart(2, '0')}</span>
                      {line.tag}
                    </span>
                    <p
                      className={
                        i === dataLines.length - 1
                          ? 'font-display text-2xl tracking-wide text-gold'
                          : 'text-pretty leading-relaxed text-foreground/90'
                      }
                    >
                      {line.text}
                    </p>
                  </li>
                </Reveal>
              ))}
            </ol>

            <Reveal className="grid grid-cols-2 gap-3 sm:grid-cols-3">
              {dataStats.map((stat) => (
                <div key={stat.label} className="hud-card px-4 py-4 text-center">
                  <p className="font-display text-4xl text-stark">{stat.value}</p>
                  <p className="text-[11px] tracking-[0.15em] text-muted-foreground uppercase">{stat.label}</p>
                </div>
              ))}
            </Reveal>

            <Reveal className="flex flex-wrap gap-3">
              <a href="#contact" className="btn-primary">
                Start a project <ArrowRight className="size-4" aria-hidden="true" />
              </a>
              <a href="#projects" className="btn-ghost">
                See my missions
              </a>
            </Reveal>
          </div>
        </div>
      </div>
    </section>
  )
}
