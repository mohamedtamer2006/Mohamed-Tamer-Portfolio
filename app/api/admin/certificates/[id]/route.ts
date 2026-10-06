import { NextRequest, NextResponse } from 'next/server'
import { verifyAdminRequest } from '@/lib/auth'
import { getCertificates, saveCertificates } from '@/lib/db'

export async function DELETE(
  request: NextRequest,
  { params }: { params: Promise<{ id: string }> },
) {
  const isAuth = await verifyAdminRequest(request)
  if (!isAuth) {
    return NextResponse.json({ error: 'Unauthorized' }, { status: 401 })
  }

  const { id } = await params
  const decodedId = decodeURIComponent(id)
  const current = await getCertificates()

  const updated = current.filter((c, idx) => {
    if (String(idx) === decodedId) return false
    if (c.title.toLowerCase() === decodedId.toLowerCase()) return false
    return true
  })

  await saveCertificates(updated)
  return NextResponse.json({ success: true, certificates: updated })
}
