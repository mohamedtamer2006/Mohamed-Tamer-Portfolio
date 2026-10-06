import { NextRequest, NextResponse } from 'next/server'
import { saveContactMessage } from '@/lib/db'

export async function POST(request: NextRequest) {
  try {
    const body = await request.json()
    const { name, email, service, message } = body

    if (!name || !email || !message) {
      return NextResponse.json(
        { error: 'Name, email, and message are required' },
        { status: 400 },
      )
    }

    const forwardedFor = request.headers.get('x-forwarded-for')
    const ip = forwardedFor ? forwardedFor.split(',')[0].trim() : '127.0.0.1'
    const user_agent = request.headers.get('user-agent') || 'Unknown'

    const saved = await saveContactMessage({
      name: name.trim(),
      email: email.trim(),
      service: service || 'General Inquiry',
      message: message.trim(),
      ip,
      user_agent,
    })

    return NextResponse.json({
      success: true,
      message: 'Signal received and logged to Sanctum Command',
      id: saved.id,
    })
  } catch (err: any) {
    return NextResponse.json({ error: err.message }, { status: 500 })
  }
}
