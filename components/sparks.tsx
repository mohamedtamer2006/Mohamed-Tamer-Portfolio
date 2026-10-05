'use client'

import { useEffect, useRef } from 'react'

type P = { x: number; y: number; vx: number; vy: number; life: number }

export function SparkCursor() {
  const ref = useRef<HTMLCanvasElement>(null)
  useEffect(() => {
    const c = ref.current
    if (!c || matchMedia('(prefers-reduced-motion: reduce), (pointer: coarse)').matches) return
    const ctx = c.getContext('2d')!
    const fit = () => ((c.width = innerWidth), (c.height = innerHeight))
    fit()
    addEventListener('resize', fit)
    const ps: P[] = []
    const move = (e: MouseEvent) => {
      for (let i = 0; i < 2; i++) ps.push({ x: e.clientX, y: e.clientY, vx: (Math.random() - 0.5) * 2, vy: Math.random() * 1.5 + 0.3, life: 1 })
    }
    addEventListener('mousemove', move)
    let raf = 0
    const tick = () => {
      ctx.clearRect(0, 0, c.width, c.height)
      for (let i = ps.length - 1; i >= 0; i--) {
        const p = ps[i]
        p.x += p.vx; p.y += p.vy; p.vy += 0.04; p.life -= 0.025
        if (p.life <= 0) { ps.splice(i, 1); continue }
        ctx.fillStyle = `rgba(255,${130 + p.life * 60},30,${p.life})`
        ctx.shadowColor = '#ff8a1f'; ctx.shadowBlur = 8
        ctx.fillRect(p.x, p.y, 2.2, 2.2)
      }
      raf = requestAnimationFrame(tick)
    }
    tick()
    return () => { cancelAnimationFrame(raf); removeEventListener('resize', fit); removeEventListener('mousemove', move) }
  }, [])
  return <canvas ref={ref} className="pointer-events-none fixed inset-0 z-[60]" aria-hidden="true" />
}

export function ScrollProgress() {
  const ref = useRef<HTMLDivElement>(null)
  useEffect(() => {
    const on = () => {
      const h = document.documentElement
      ref.current?.style.setProperty('width', `${(h.scrollTop / (h.scrollHeight - h.clientHeight || 1)) * 100}%`)
    }
    on(); addEventListener('scroll', on, { passive: true })
    return () => removeEventListener('scroll', on)
  }, [])
  return (
    <div className="fixed inset-x-0 top-0 z-[70] h-0.5" aria-hidden="true">
      <div ref={ref} className="h-full bg-gradient-to-r from-stark to-mystic shadow-[0_0_12px_var(--mystic)]" />
    </div>
  )
}
