import { NextRequest, NextResponse } from 'next/server'
import { verifyAdminRequest } from '@/lib/auth'
import { getProjects, saveProjects, ProjectItem } from '@/lib/db'

export async function GET(request: NextRequest) {
  const isAuth = await verifyAdminRequest(request)
  if (!isAuth) {
    return NextResponse.json({ error: 'Unauthorized' }, { status: 401 })
  }
  const projects = await getProjects()
  return NextResponse.json({ projects })
}

export async function POST(request: NextRequest) {
  const isAuth = await verifyAdminRequest(request)
  if (!isAuth) {
    return NextResponse.json({ error: 'Unauthorized' }, { status: 401 })
  }

  try {
    const body = await request.json()
    const { project, index } = body as { project: ProjectItem; index?: number }

    if (!project || !project.title) {
      return NextResponse.json({ error: 'Project title is required' }, { status: 400 })
    }

    const currentProjects = await getProjects()
    let updated = [...currentProjects]

    if (typeof index === 'number' && index >= 0 && index < updated.length) {
      // Update existing by index
      updated[index] = project
    } else {
      // Check if project with same title already exists
      const existingIdx = updated.findIndex((p) => p.title.toLowerCase() === project.title.toLowerCase())
      if (existingIdx !== -1) {
        updated[existingIdx] = project
      } else {
        // Prepend or append new project
        updated.unshift(project)
      }
    }

    await saveProjects(updated)
    return NextResponse.json({ success: true, projects: updated })
  } catch (err: any) {
    return NextResponse.json({ error: err.message }, { status: 500 })
  }
}
