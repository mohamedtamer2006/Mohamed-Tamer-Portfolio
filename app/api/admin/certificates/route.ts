import { NextRequest, NextResponse } from 'next/server'
import { verifyAdminRequest } from '@/lib/auth'
import { getCertificates, saveCertificates } from '@/lib/db'
import { Certificate } from '@/lib/portfolio-data'

export async function GET(request: NextRequest) {
  const isAuth = await verifyAdminRequest(request)
  if (!isAuth) {
    return NextResponse.json({ error: 'Unauthorized' }, { status: 401 })
  }
  const certificates = await getCertificates()
  return NextResponse.json({ certificates })
}

export async function POST(request: NextRequest) {
  const isAuth = await verifyAdminRequest(request)
  if (!isAuth) {
    return NextResponse.json({ error: 'Unauthorized' }, { status: 401 })
  }

  try {
    const body = await request.json()
    const { certificate, index } = body as { certificate: Certificate; index?: number }

    if (!certificate || !certificate.title) {
      return NextResponse.json({ error: 'Certificate title is required' }, { status: 400 })
    }

    const current = await getCertificates()
    let updated = [...current]

    if (typeof index === 'number' && index >= 0 && index < updated.length) {
      updated[index] = certificate
    } else {
      const existingIdx = updated.findIndex((c) => c.title.toLowerCase() === certificate.title.toLowerCase())
      if (existingIdx !== -1) {
        updated[existingIdx] = certificate
      } else {
        // Prepend new certificate (newest first)
        updated.unshift(certificate)
      }
    }

    await saveCertificates(updated)
    return NextResponse.json({ success: true, certificates: updated })
  } catch (err: any) {
    return NextResponse.json({ error: err.message }, { status: 500 })
  }
}
