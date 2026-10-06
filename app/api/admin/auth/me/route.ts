import { NextRequest, NextResponse } from 'next/server'
import { verifyAdminRequest, AUTHORIZED_ADMIN_EMAIL } from '@/lib/auth'

export async function GET(request: NextRequest) {
  const isAuth = await verifyAdminRequest(request)
  if (!isAuth) {
    return NextResponse.json({ authenticated: false }, { status: 401 })
  }
  return NextResponse.json({
    authenticated: true,
    email: AUTHORIZED_ADMIN_EMAIL,
  })
}
