import { NextResponse } from 'next/server'
import { getProjects, getCertificates, getPortfolioSettings } from '@/lib/db'

export async function GET() {
  try {
    const [projects, certificates, settings] = await Promise.all([
      getProjects(),
      getCertificates(),
      getPortfolioSettings(),
    ])

    return NextResponse.json({
      projects,
      certificates,
      profile: settings.profile,
      stats: settings.stats,
      aboutLines: settings.aboutLines,
    })
  } catch (err: any) {
    return NextResponse.json({ error: err.message }, { status: 500 })
  }
}
