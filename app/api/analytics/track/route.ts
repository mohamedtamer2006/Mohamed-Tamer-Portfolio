import { NextRequest, NextResponse } from 'next/server'
import { logEvent } from '@/lib/db'

export async function POST(request: NextRequest) {
  try {
    const body = await request.json()
    const { type, label, href, path, referrer, screen, visitor_id } = body

    if (!type || !['pageview', 'click'].includes(type)) {
      return NextResponse.json({ error: 'Invalid event type' }, { status: 400 })
    }

    const forwardedFor = request.headers.get('x-forwarded-for')
    const ip = forwardedFor ? forwardedFor.split(',')[0].trim() : '127.0.0.1'
    const user_agent = request.headers.get('user-agent') || 'Unknown'

    await logEvent({
      type,
      label: label || (type === 'pageview' ? 'Page View' : 'Link Click'),
      href,
      path: path || '/',
      referrer: referrer || request.headers.get('referer') || '',
      user_agent,
      screen,
      ip,
      visitor_id,
    })

    return NextResponse.json({ success: true })
  } catch (err: any) {
    return NextResponse.json({ error: err.message }, { status: 500 })
  }
}
