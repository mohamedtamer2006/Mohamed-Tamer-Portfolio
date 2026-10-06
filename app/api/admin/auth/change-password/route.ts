import { NextRequest, NextResponse } from 'next/server'
import { verifyAdminRequest, hashPassword } from '@/lib/auth'
import { updateAdminPassword } from '@/lib/db'

export async function POST(request: NextRequest) {
  const isAuth = await verifyAdminRequest(request)
  if (!isAuth) {
    return NextResponse.json({ error: 'Unauthorized' }, { status: 401 })
  }

  try {
    const { newPassword } = await request.json()
    if (!newPassword || newPassword.length < 6) {
      return NextResponse.json(
        { error: 'Password must be at least 6 characters' },
        { status: 400 },
      )
    }

    const { hash, salt } = hashPassword(newPassword)
    await updateAdminPassword(hash, salt)

    return NextResponse.json({ success: true, message: 'Password updated successfully' })
  } catch (err: any) {
    return NextResponse.json({ error: err.message }, { status: 500 })
  }
}
