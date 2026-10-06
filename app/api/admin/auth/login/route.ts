import { NextRequest, NextResponse } from 'next/server'
import {
  AUTHORIZED_ADMIN_EMAIL,
  ADMIN_COOKIE_NAME,
  createAdminToken,
  verifyPassword,
} from '@/lib/auth'
import { getAdminCredentials } from '@/lib/db'

export async function POST(request: NextRequest) {
  try {
    const body = await request.json()
    const { email, password } = body

    if (!email || !password) {
      return NextResponse.json({ error: 'Email and password are required' }, { status: 400 })
    }

    // STRICT ACCESS CONTROL: ONLY mohamed.tamer.8006@gmail.com CAN ACCESS
    if (email.trim().toLowerCase() !== AUTHORIZED_ADMIN_EMAIL.toLowerCase()) {
      return NextResponse.json(
        { error: 'Access denied: unauthorized identity.' },
        { status: 403 },
      )
    }

    // Verify password against DB or env
    const admin = await getAdminCredentials()
    const envPassword = process.env.ADMIN_PASSWORD || 'StarkSanctum2026!'

    let isValid = false

    // Check against stored hash if salt exists
    if (admin.passwordHash && admin.salt) {
      try {
        isValid = verifyPassword(password, admin.passwordHash, admin.salt)
      } catch {
        isValid = false
      }
    }

    // Also allow env password or default fallback passkey
    if (!isValid && (password === envPassword || password === 'StarkSanctum2026!')) {
      isValid = true
    }

    if (!isValid) {
      return NextResponse.json({ error: 'Invalid password' }, { status: 401 })
    }

    // Generate signed token
    const token = createAdminToken(AUTHORIZED_ADMIN_EMAIL)

    const response = NextResponse.json({
      success: true,
      email: AUTHORIZED_ADMIN_EMAIL,
      message: 'Access granted to Sanctum Command',
    })

    // Set HttpOnly cookie
    response.cookies.set({
      name: ADMIN_COOKIE_NAME,
      value: token,
      httpOnly: true,
      secure: process.env.NODE_ENV === 'production',
      sameSite: 'lax',
      path: '/',
      maxAge: 60 * 60 * 24 * 7, // 7 days
    })

    return response
  } catch (err: any) {
    return NextResponse.json({ error: err.message || 'Authentication error' }, { status: 500 })
  }
}
