import { NextRequest, NextResponse } from 'next/server'
import { verifyAdminRequest } from '@/lib/auth'
import {
  getProjects,
  getCertificates,
  getPortfolioSettings,
  getDatabaseStatus,
  savePortfolioSettings,
} from '@/lib/db'

export async function GET(request: NextRequest) {
  const isAuth = await verifyAdminRequest(request)
  if (!isAuth) {
    return NextResponse.json({ error: 'Unauthorized' }, { status: 401 })
  }

  const [projects, certificates, settings] = await Promise.all([
    getProjects(),
    getCertificates(),
    getPortfolioSettings(),
  ])

  return NextResponse.json({
    projects,
    certificates,
    settings,
    dbStatus: getDatabaseStatus(),
  })
}

export async function POST(request: NextRequest) {
  const isAuth = await verifyAdminRequest(request)
  if (!isAuth) {
    return NextResponse.json({ error: 'Unauthorized' }, { status: 401 })
  }

  try {
    const body = await request.json()
    await savePortfolioSettings(body)
    return NextResponse.json({ success: true, message: 'Settings saved' })
  } catch (err: any) {
    return NextResponse.json({ error: err.message }, { status: 500 })
  }
}
