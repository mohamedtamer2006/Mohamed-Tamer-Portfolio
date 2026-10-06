'use client'

import { useEffect, useState } from 'react'
import { ExternalLink, Target } from 'lucide-react'
import { GithubIcon as Github } from '@/components/brand-icons'
import { PhotoPlaceholder } from '@/components/photo-placeholder'
import { Reveal } from '@/components/reveal'
import { SectionHeading } from '@/components/section-heading'
import { projects as defaultProjects } from '@/lib/portfolio-data'
import { cn } from '@/lib/utils'

export function Projects() {
  const [items, setItems] = useState(defaultProjects)

  useEffect(() => {
    fetch('/api/portfolio-data')
      .then((res) => res.json())
      .then((data) => {
        if (data.projects && Array.isArray(data.projects) && data.projects.length > 0) {
          setItems(data.projects)
        }
      })
      .catch(() => {})
  }, [])

  return (
    <section id="projects" className="scroll-mt-16 py-24 md:py-32">
      <div className="mx-auto max-w-6xl px-4">
        <SectionHeading
          index="06"
          code="Missions"
          label="Projects"
          intro="Real projects with public code and live demos. Each one started as a problem worth solving."
        />

        <div className="flex flex-col gap-10">
          {items.map((project, i) => (
            <Reveal key={project.title}>
              <article className="hud-card group grid overflow-hidden lg:grid-cols-2">
                <div className={cn('relative min-h-64 border-border lg:min-h-full', i % 2 === 1 && 'lg:order-2')}>
                  <PhotoPlaceholder
                    src={project.image}
                    alt={`${project.title} screenshot`}
                    label="Add project image"
                    hint="16:10 screenshot"
                    fit={project.fit ?? 'cover'}
                    className="absolute inset-0 size-full border-0 transition-transform duration-500 group-hover:scale-[1.03]"
                  />
                  <span className="absolute top-4 left-4 bg-stark px-3 py-1 text-[11px] font-semibold tracking-[0.25em] text-white uppercase clip-hud">
                    {project.codename}
                  </span>
                  <span className="absolute top-4 right-4 flex items-center gap-2 border border-arc/40 bg-background/80 px-3 py-1 text-[10px] font-semibold tracking-[0.2em] text-arc uppercase backdrop-blur">
                    <span className="size-1.5 rounded-full bg-stone-time" aria-hidden="true" />
                    {project.status}
                  </span>
                </div>

                <div className="flex flex-col gap-5 p-6 md:p-9">
                  <div className="flex flex-col gap-1">
                    <p className="text-xs font-semibold tracking-[0.3em] text-gold uppercase">{project.tagline}</p>
                    <h3 className="font-display text-4xl leading-none text-balance md:text-5xl">{project.title}</h3>
                  </div>
                  <p className="leading-relaxed text-muted-foreground">{project.description}</p>

                  <ul className="flex flex-wrap gap-2" aria-label="Tech stack">
                    {project.tags.map((tag) => (
                      <li key={tag} className="border border-cap/40 bg-cap/10 px-2.5 py-1 text-xs font-medium">
                        {tag}
                      </li>
                    ))}
                  </ul>

                  <p className="flex items-start gap-3 border-l-2 border-stark bg-stark/5 px-4 py-3 text-sm">
                    <Target className="mt-0.5 size-4 shrink-0 text-stark" aria-hidden="true" />
                    <span>
                      <span className="font-semibold tracking-[0.15em] uppercase">Role / Result: </span>
                      <span className="text-muted-foreground">{project.role}</span>
                    </span>
                  </p>

                  <div className="mt-auto flex flex-wrap gap-3 pt-2">
                    {project.links.map((link) => (
                      <a
                        key={link.href}
                        href={link.href}
                        target="_blank"
                        rel="noopener noreferrer"
                        className={link.kind === 'live' ? 'btn-primary' : 'btn-ghost'}
                      >
                        {link.kind === 'live' ? (
                          <ExternalLink className="size-4" aria-hidden="true" />
                        ) : (
                          <Github className="size-4" aria-hidden="true" />
                        )}
                        {link.label}
                        <span className="sr-only"> for {project.title} (opens in a new tab)</span>
                      </a>
                    ))}
                  </div>
                </div>
              </article>
            </Reveal>
          ))}
        </div>
      </div>
    </section>
  )
}
