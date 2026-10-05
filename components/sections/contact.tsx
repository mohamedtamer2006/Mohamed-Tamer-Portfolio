import { Download, Mail, Phone } from 'lucide-react'
import { GithubIcon, LinkedinIcon } from '@/components/brand-icons'
import { ContactForm } from '@/components/contact-form'
import { SanctumSigil, ShieldRings } from '@/components/motifs'
import { Reveal } from '@/components/reveal'
import { currentlyLearning, profile } from '@/lib/portfolio-data'

const channels = [
  { label: 'Email', value: profile.email, href: `mailto:${profile.email}`, Icon: Mail, external: false },
  { label: 'Phone / WhatsApp', value: profile.phone, href: `tel:${profile.phone.replace(/\s/g, '')}`, Icon: Phone, external: false },
  { label: 'GitHub', value: 'mohamedtamer2006', href: profile.github, Icon: GithubIcon, external: true },
  { label: 'LinkedIn', value: 'Mohamed Tamer', href: profile.linkedin, Icon: LinkedinIcon, external: true },
]

export function Contact() {
  return (
    <section id="contact" className="relative scroll-mt-16 overflow-hidden pt-24 pb-0 md:pt-32">
      <SanctumSigil className="pointer-events-none absolute -bottom-32 -left-40 size-[36rem] opacity-[0.12]" />
      <ShieldRings className="pointer-events-none absolute -top-40 -right-40 size-[34rem] opacity-[0.08]" />
      <div className="halftone pointer-events-none absolute inset-0 text-stark opacity-[0.06] [mask-image:radial-gradient(ellipse_at_left,black,transparent_70%)]" aria-hidden="true" />

      <div className="relative mx-auto max-w-6xl px-4">
        <Reveal className="mb-12 flex flex-col gap-5 md:mb-16">
          <p className="flex items-center gap-3 text-[11px] font-semibold tracking-[0.35em] text-arc uppercase">
            <span className="inline-block size-1.5 rotate-45 bg-stark" aria-hidden="true" />
            File 11 <span className="h-px w-10 bg-arc/50" aria-hidden="true" /> Final call
          </p>
          <h2 className="flex flex-wrap items-center gap-x-5 gap-y-3">
            <span className="font-display text-7xl leading-[0.85] text-stark md:text-[9rem]">Assemble</span>
            <span className="border border-gold/60 bg-gold/10 px-3 py-1 text-xs font-semibold tracking-[0.25em] text-gold uppercase">
              Contact
            </span>
          </h2>
          <p className="font-display text-4xl leading-tight text-balance md:text-5xl">
            Ready to build something heroic? <span className="text-mystic glow-mystic">Open a portal, let's talk.</span>
          </p>
        </Reveal>

        <div className="grid gap-8 lg:grid-cols-[1fr_1.1fr]">
          <Reveal className="flex flex-col gap-4">
            {channels.map(({ label, value, href, Icon, external }) => (
              <a
                key={label}
                href={href}
                {...(external ? { target: '_blank', rel: 'noopener noreferrer' } : {})}
                className="hud-card group flex items-center gap-4 p-5"
              >
                <span className="flex size-12 shrink-0 items-center justify-center bg-cap text-white transition-colors clip-hud group-hover:bg-stark">
                  <Icon className="size-5" />
                </span>
                <span className="min-w-0">
                  <span className="block text-[11px] font-semibold tracking-[0.3em] text-arc uppercase">{label}</span>
                  <span className="block truncate font-medium">{value}</span>
                </span>
              </a>
            ))}

            <div className="flex flex-wrap gap-3 pt-2">
              <a href={profile.cvUrl} download className="btn-gold">
                <Download className="size-4" aria-hidden="true" />
                Download CV
              </a>
              <a href={`mailto:${profile.email}?subject=Hiring%20inquiry`} className="btn-ghost">
                <Mail className="size-4" aria-hidden="true" />
                Email me directly
              </a>
            </div>
          </Reveal>

          <Reveal delay={120}>
            <ContactForm />
          </Reveal>
        </div>
      </div>

      <div className="relative mt-20 border-y border-border bg-panel py-4" aria-label="Currently learning">
        <div className="flex overflow-hidden [mask-image:linear-gradient(to_right,transparent,black_10%,black_90%,transparent)]">
          <div className="flex shrink-0 animate-marquee items-center gap-8 pr-8">
            {[0, 1].map((copy) => (
              <div key={copy} className="flex shrink-0 items-center gap-8" aria-hidden={copy === 1}>
                <span className="font-display text-2xl whitespace-nowrap text-gold">Currently Learning</span>
                {currentlyLearning.map((topic) => (
                  <span key={topic} className="flex items-center gap-8 whitespace-nowrap">
                    <span className="size-2 rotate-45 bg-arc shadow-[0_0_10px_var(--arc)]" aria-hidden="true" />
                    <span className="text-sm font-semibold tracking-[0.25em] uppercase">{topic}</span>
                  </span>
                ))}
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  )
}
