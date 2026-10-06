import { NextRequest, NextResponse } from 'next/server'
import { verifyAdminRequest } from '@/lib/auth'
import { getProjects, saveProjects } from '@/lib/db'

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
  const current = await getProjects()

  // Filter out by index or title
  const updated = current.filter((p, idx) => {
    if (String(idx) === decodedId) return false
    if (p.title.toLowerCase() === decodedId.toLowerCase()) return false
    return true
  })

  await saveProjects(updated)
  return NextResponse.json({ success: true, projects: updated })
}
