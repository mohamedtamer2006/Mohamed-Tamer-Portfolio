import { SectionDivider } from '@/components/section-divider'
import { SiteFooter } from '@/components/site-footer'
import { SiteNav } from '@/components/site-nav'
import { About } from '@/components/sections/about'
import { Certificates } from '@/components/sections/certificates'
import { Contact } from '@/components/sections/contact'
import { Cover } from '@/components/sections/cover'
import { Education } from '@/components/sections/education'
import { Experience } from '@/components/sections/experience'
import { Projects } from '@/components/sections/projects'
import { Services } from '@/components/sections/services'
import { Skills } from '@/components/sections/skills'
import { Testimonials } from '@/components/sections/testimonials'
import { Usp } from '@/components/sections/usp'

export default function Page() {
  return (
    <>
      <SiteNav />
      <main>
        <Cover />
        <SectionDivider emblem="shield" />
        <About />
        <SectionDivider emblem="eye" />
        <Usp />
        <SectionDivider emblem="reactor" />
        <Education />
        <SectionDivider emblem="shield" />
        <Skills />
        <SectionDivider emblem="eye" />
        <Projects />
        <SectionDivider emblem="reactor" />
        <Experience />
        <SectionDivider emblem="shield" />
        <Services />
        <SectionDivider emblem="eye" />
        <Certificates />
        <SectionDivider emblem="reactor" />
        <Testimonials />
        <SectionDivider emblem="shield" />
        <Contact />
      </main>
      <SiteFooter />
    </>
  )
}
