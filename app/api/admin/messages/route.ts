import { NextRequest, NextResponse } from 'next/server'
import { verifyAdminRequest } from '@/lib/auth'
import { getContactMessages } from '@/lib/db'

export async function GET(request: NextRequest) {
  const isAuth = await verifyAdminRequest(request)
  if (!isAuth) {
    return NextResponse.json({ error: 'Unauthorized' }, { status: 401 })
  }

  const messages = await getContactMessages()
  return NextResponse.json({ messages })
}
