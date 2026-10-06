import crypto from 'crypto'
import { cookies } from 'next/headers'
import { NextRequest } from 'next/server'

export const AUTHORIZED_ADMIN_EMAIL = 'mohamed.tamer.8006@gmail.com'
export const ADMIN_COOKIE_NAME = 'stark_admin_token'

const JWT_SECRET =
  process.env.ADMIN_JWT_SECRET ||
  process.env.ADMIN_PASSWORD ||
  'sanctum-iron-protocol-secret-key-mt-2026'

// Hash password with salt
export function hashPassword(password: string, salt?: string) {
  const generatedSalt = salt || crypto.randomBytes(16).toString('hex')
  const hash = crypto.pbkdf2Sync(password, generatedSalt, 100000, 64, 'sha512').toString('hex')
  return { hash, salt: generatedSalt }
}

export function verifyPassword(password: string, hash: string, salt: string) {
  const check = crypto.pbkdf2Sync(password, salt, 100000, 64, 'sha512').toString('hex')
  return crypto.timingSafeEqual(Buffer.from(check, 'hex'), Buffer.from(hash, 'hex'))
}

// Simple signed token (HMAC-SHA256)
export function createAdminToken(email: string): string {
  const payload = {
    email: email.toLowerCase(),
    role: 'admin',
    exp: Date.now() + 1000 * 60 * 60 * 24 * 7, // 7 days
    iat: Date.now(),
  }
  const payloadBase64 = Buffer.from(JSON.stringify(payload)).toString('base64url')
  const signature = crypto
    .createHmac('sha256', JWT_SECRET)
    .update(payloadBase64)
    .digest('base64url')
  return `${payloadBase64}.${signature}`
}

export function verifyAdminToken(token: string): { valid: boolean; email?: string } {
  try {
    const [payloadBase64, signature] = token.split('.')
    if (!payloadBase64 || !signature) return { valid: false }

    const expectedSignature = crypto
      .createHmac('sha256', JWT_SECRET)
      .update(payloadBase64)
      .digest('base64url')

    if (
      !crypto.timingSafeEqual(
        Buffer.from(signature, 'utf-8'),
        Buffer.from(expectedSignature, 'utf-8'),
      )
    ) {
      return { valid: false }
    }

    const payload = JSON.parse(Buffer.from(payloadBase64, 'base64url').toString('utf-8'))
    if (Date.now() > payload.exp) return { valid: false }

    // STRICT EMAIL CHECK: Must match authorized email
    if (payload.email?.toLowerCase() !== AUTHORIZED_ADMIN_EMAIL.toLowerCase()) {
      return { valid: false }
    }

    return { valid: true, email: payload.email }
  } catch {
    return { valid: false }
  }
}

// Request validator for API Route Handlers
export async function verifyAdminRequest(request?: NextRequest): Promise<boolean> {
  // Check Authorization header first if present
  if (request) {
    const authHeader = request.headers.get('authorization')
    if (authHeader && authHeader.startsWith('Bearer ')) {
      const token = authHeader.substring(7)
      const res = verifyAdminToken(token)
      if (res.valid) return true
    }
  }

  // Fallback to cookie
  try {
    const cookieStore = await cookies()
    const token = cookieStore.get(ADMIN_COOKIE_NAME)?.value
    if (token) {
      const res = verifyAdminToken(token)
      if (res.valid) return true
    }
  } catch {
    // cookies() might not be available in some edge contexts
  }

  return false
}
