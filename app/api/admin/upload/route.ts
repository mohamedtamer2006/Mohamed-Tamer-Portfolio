import { NextRequest, NextResponse } from 'next/server'
import { verifyAdminRequest } from '@/lib/auth'
import path from 'path'
import fs from 'fs'

export async function POST(request: NextRequest) {
  const isAuth = await verifyAdminRequest(request)
  if (!isAuth) {
    return NextResponse.json({ error: 'Unauthorized' }, { status: 401 })
  }

  try {
    const formData = await request.formData()
    const file = formData.get('file') as File | null
    const folder = (formData.get('folder') as string) || 'certs'

    if (!file) {
      return NextResponse.json({ error: 'No file uploaded' }, { status: 400 })
    }

    const bytes = await file.arrayBuffer()
    const buffer = Buffer.from(bytes)

    // Clean filename
    const ext = path.extname(file.name) || '.png'
    const baseName = path.basename(file.name, ext).toLowerCase().replace(/[^a-z0-9_-]/g, '_')
    const fileName = `${baseName}_${Date.now()}${ext}`

    // Target directory in public/images
    const uploadDir = path.join(process.cwd(), 'public', 'images', folder)
    if (!fs.existsSync(uploadDir)) {
      fs.mkdirSync(uploadDir, { recursive: true })
    }

    const filePath = path.join(uploadDir, fileName)
    fs.writeFileSync(filePath, buffer)

    const publicUrl = `/images/${folder}/${fileName}`
    return NextResponse.json({ success: true, url: publicUrl })
  } catch (err: any) {
    console.error('File upload failed:', err)
    return NextResponse.json({ error: err.message || 'File upload failed' }, { status: 500 })
  }
}
