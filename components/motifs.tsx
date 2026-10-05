import { useId } from 'react'
import { cn } from '@/lib/utils'

export function MjolnirGlyph({ className }: { className?: string }) {
  const id = useId()
  const head = `${id}-head`
  const grip = `${id}-grip`
  return (
    <svg viewBox="0 0 40 70" className={cn('h-[0.7em] w-[0.4em] shrink-0 overflow-visible', className)} aria-hidden="true">
      <defs>
        <linearGradient id={head} x1="0" x2="0" y1="0" y2="1">
          <stop offset="0" stopColor="#f3f6fb" />
          <stop offset="0.55" stopColor="#a9b3c4" />
          <stop offset="1" stopColor="#5d6879" />
        </linearGradient>
        <linearGradient id={grip} x1="0" x2="1">
          <stop offset="0" stopColor="#4a2d18" />
          <stop offset="0.5" stopColor="#8a5a33" />
          <stop offset="1" stopColor="#4a2d18" />
        </linearGradient>
      </defs>
      <polygon points="5,0 35,0 40,5 40,23 35,28 5,28 0,23 0,5" fill={`url(#${head})`} stroke="#1b2433" strokeWidth="1.5" />
      <path d="M9 3 V25 M31 3 V25" stroke="#3d4757" strokeWidth="1.2" opacity="0.7" />
      <path d="M17 9 L22 14 L18 14 L23 20" fill="none" stroke="var(--arc)" strokeWidth="1.6" strokeLinecap="round" strokeLinejoin="round" />
      <rect x="16" y="28" width="8" height="34" fill={`url(#${grip})`} stroke="#1b2433" strokeWidth="1.2" />
      <path d="M16 33 L24 30 M16 38 L24 35 M16 43 L24 40 M16 48 L24 45 M16 53 L24 50 M16 58 L24 55" stroke="#2b190c" strokeWidth="1.2" />
      <rect x="14" y="61" width="12" height="7" rx="1.5" fill={`url(#${head})`} stroke="#1b2433" strokeWidth="1.2" />
    </svg>
  )
}

export function ArcReactorGlyph({ className }: { className?: string }) {
  const core = `${useId()}-core`
  const segments = Array.from({ length: 10 }, (_, i) => i * 36)
  return (
    <svg
      viewBox="0 0 70 70"
      className={cn('h-[0.7em] w-[0.7em] shrink-0 overflow-visible animate-pulse-glow', className)}
      aria-hidden="true"
    >
      <defs>
        <radialGradient id={core}>
          <stop offset="0" stopColor="#ffffff" />
          <stop offset="0.45" stopColor="#bff7ff" />
          <stop offset="1" stopColor="var(--arc)" />
        </radialGradient>
      </defs>
      <circle cx="35" cy="35" r="32" fill="none" stroke="var(--arc)" strokeWidth="5" />
      <circle cx="35" cy="35" r="27" fill="none" stroke="var(--arc)" strokeWidth="1" opacity="0.5" />
      {segments.map((deg) => (
        <rect
          key={deg}
          x="32"
          y="9"
          width="6"
          height="9"
          rx="1"
          fill="var(--arc)"
          opacity="0.85"
          transform={`rotate(${deg} 35 35)`}
        />
      ))}
      <circle cx="35" cy="35" r="14" fill="none" stroke="var(--arc)" strokeWidth="2.5" />
      <circle cx="35" cy="35" r="9" fill={`url(#${core})`} />
    </svg>
  )
}

export function ArcReactor({ className }: { className?: string }) {
  return (
    <svg viewBox="0 0 200 200" className={className} aria-hidden="true">
      <circle cx="100" cy="100" r="96" fill="none" stroke="var(--arc)" strokeWidth="1" opacity="0.35" />
      <g className="origin-center animate-spin-slow">
        <circle cx="100" cy="100" r="88" fill="none" stroke="var(--arc)" strokeWidth="2" strokeDasharray="4 10" />
      </g>
      <g className="origin-center animate-spin-reverse">
        <circle cx="100" cy="100" r="76" fill="none" stroke="var(--gold)" strokeWidth="1.5" strokeDasharray="60 20 10 20" opacity="0.8" />
      </g>
      <circle cx="100" cy="100" r="64" fill="none" stroke="var(--arc)" strokeWidth="1" opacity="0.5" />
    </svg>
  )
}

export function ShieldRings({ className }: { className?: string }) {
  return (
    <svg viewBox="0 0 100 100" className={className} aria-hidden="true">
      <circle cx="50" cy="50" r="48" fill="var(--stark)" />
      <circle cx="50" cy="50" r="38" fill="#f4f6fb" />
      <circle cx="50" cy="50" r="28" fill="var(--stark)" />
      <circle cx="50" cy="50" r="18" fill="var(--cap)" />
      <polygon
        points="50,34 54.2,45.6 66.6,46 56.8,53.6 60.3,65.6 50,58.6 39.7,65.6 43.2,53.6 33.4,46 45.8,45.6"
        fill="#f4f6fb"
      />
    </svg>
  )
}

export function LightningBolt({ className }: { className?: string }) {
  return (
    <svg viewBox="0 0 24 40" className={className} aria-hidden="true">
      <path d="M14 0 L2 22 H11 L8 40 L22 15 H13 L17 0 Z" fill="currentColor" />
    </svg>
  )
}

export function InfinityStone({
  stone,
  color = 'var(--arc)',
  className,
}: {
  stone?: string
  color?: string
  className?: string
}) {
  const norm = stone?.toLowerCase() || ''

  if (norm.includes('space')) {
    return (
      <svg viewBox="0 0 40 40" className={cn('overflow-visible drop-shadow-[0_0_10px_#2f6bff] shrink-0', className)} aria-hidden="true">
        <defs>
          <radialGradient id="space-glow" cx="40%" cy="35%" r="65%">
            <stop offset="0%" stopColor="#e0f7ff" />
            <stop offset="35%" stopColor="#38bdf8" />
            <stop offset="70%" stopColor="#1d4ed8" />
            <stop offset="100%" stopColor="#0f172a" />
          </radialGradient>
          <linearGradient id="space-hl" x1="0" y1="0" x2="1" y2="1">
            <stop offset="0%" stopColor="#ffffff" stopOpacity="0.9" />
            <stop offset="100%" stopColor="#38bdf8" stopOpacity="0.2" />
          </linearGradient>
        </defs>
        <polygon points="12,4 28,4 37,13 37,27 28,36 12,36 3,27 3,13" fill="#0f172a" />
        <polygon points="12,4 28,4 25,11 15,11" fill="#38bdf8" opacity="0.9" />
        <polygon points="28,4 37,13 30,17 25,11" fill="#60a5fa" opacity="0.8" />
        <polygon points="37,13 37,27 30,23 30,17" fill="#1d4ed8" opacity="0.85" />
        <polygon points="37,27 28,36 25,29 30,23" fill="#172554" opacity="0.9" />
        <polygon points="28,36 12,36 15,29 25,29" fill="#1e40af" opacity="0.85" />
        <polygon points="12,36 3,27 10,23 15,29" fill="#1e3a8a" opacity="0.9" />
        <polygon points="3,27 3,13 10,17 10,23" fill="#2563eb" opacity="0.8" />
        <polygon points="3,13 12,4 15,11 10,17" fill="#93c5fd" opacity="0.9" />
        <polygon points="15,11 25,11 30,17 30,23 25,29 15,29 10,23 10,17" fill="url(#space-glow)" />
        <polygon points="15,11 22,11 18,17 12,17" fill="url(#space-hl)" />
        <circle cx="16" cy="14" r="1.5" fill="#ffffff" />
      </svg>
    )
  }

  if (norm.includes('mind')) {
    return (
      <svg viewBox="0 0 40 40" className={cn('overflow-visible drop-shadow-[0_0_10px_#f4c430] shrink-0', className)} aria-hidden="true">
        <defs>
          <radialGradient id="mind-glow" cx="45%" cy="30%" r="65%">
            <stop offset="0%" stopColor="#fffbeb" />
            <stop offset="30%" stopColor="#fde047" />
            <stop offset="70%" stopColor="#ca8a04" />
            <stop offset="100%" stopColor="#713f12" />
          </radialGradient>
          <linearGradient id="mind-hl" x1="0" y1="0" x2="1" y2="1">
            <stop offset="0%" stopColor="#ffffff" stopOpacity="0.95" />
            <stop offset="100%" stopColor="#fef08a" stopOpacity="0.1" />
          </linearGradient>
        </defs>
        <polygon points="20,2 36,20 20,38 4,20" fill="#713f12" />
        <polygon points="20,2 29,14 20,12" fill="#fef08a" opacity="0.95" />
        <polygon points="20,2 11,14 20,12" fill="#fffbeb" opacity="0.9" />
        <polygon points="20,2 36,20 29,14" fill="#fde047" opacity="0.8" />
        <polygon points="20,2 4,20 11,14" fill="#eab308" opacity="0.8" />
        <polygon points="36,20 20,38 27,25" fill="#ca8a04" opacity="0.85" />
        <polygon points="4,20 20,38 13,25" fill="#a16207" opacity="0.9" />
        <polygon points="20,38 27,25 20,28" fill="#854d0e" opacity="0.9" />
        <polygon points="20,38 13,25 20,28" fill="#713f12" opacity="0.95" />
        <polygon points="20,12 29,14 27,25 20,28 13,25 11,14" fill="url(#mind-glow)" />
        <polygon points="20,12 26,14 20,20 14,14" fill="url(#mind-hl)" />
        <circle cx="20" cy="15" r="1.5" fill="#ffffff" />
      </svg>
    )
  }

  if (norm.includes('reality')) {
    return (
      <svg viewBox="0 0 40 40" className={cn('overflow-visible drop-shadow-[0_0_10px_#e0242f] shrink-0', className)} aria-hidden="true">
        <defs>
          <radialGradient id="reality-glow" cx="40%" cy="35%" r="65%">
            <stop offset="0%" stopColor="#fee2e2" />
            <stop offset="35%" stopColor="#f87171" />
            <stop offset="70%" stopColor="#dc2626" />
            <stop offset="100%" stopColor="#450a0a" />
          </radialGradient>
          <linearGradient id="reality-hl" x1="0" y1="0" x2="1" y2="1">
            <stop offset="0%" stopColor="#ffffff" stopOpacity="0.9" />
            <stop offset="100%" stopColor="#f87171" stopOpacity="0.1" />
          </linearGradient>
        </defs>
        <polygon points="14,4 26,4 36,12 37,20 36,28 26,36 14,36 4,28 3,20 4,12" fill="#450a0a" />
        <polygon points="14,4 26,4 24,11 16,11" fill="#fca5a5" opacity="0.9" />
        <polygon points="26,4 36,12 29,16 24,11" fill="#f87171" opacity="0.8" />
        <polygon points="36,12 37,20 30,20 29,16" fill="#ef4444" opacity="0.75" />
        <polygon points="37,20 36,28 29,24 30,20" fill="#b91c1c" opacity="0.85" />
        <polygon points="36,28 26,36 24,29 29,24" fill="#991b1b" opacity="0.9" />
        <polygon points="26,36 14,36 16,29 24,29" fill="#7f1d1d" opacity="0.95" />
        <polygon points="14,36 4,28 11,24 16,29" fill="#991b1b" opacity="0.9" />
        <polygon points="4,28 3,20 10,20 11,24" fill="#dc2626" opacity="0.85" />
        <polygon points="3,20 4,12 11,16 10,20" fill="#ef4444" opacity="0.8" />
        <polygon points="4,12 14,4 16,11 11,16" fill="#fca5a5" opacity="0.9" />
        <polygon points="16,11 24,11 29,16 30,20 29,24 24,29 16,29 11,24 10,20 11,16" fill="url(#reality-glow)" />
        <polygon points="16,11 22,11 18,17 12,17" fill="url(#reality-hl)" />
        <circle cx="17" cy="14" r="1.5" fill="#ffffff" />
      </svg>
    )
  }

  if (norm.includes('power')) {
    return (
      <svg viewBox="0 0 40 40" className={cn('overflow-visible drop-shadow-[0_0_10px_#8b3dff] shrink-0', className)} aria-hidden="true">
        <defs>
          <radialGradient id="power-glow" cx="42%" cy="35%" r="65%">
            <stop offset="0%" stopColor="#faf5ff" />
            <stop offset="35%" stopColor="#c084fc" />
            <stop offset="70%" stopColor="#9333ea" />
            <stop offset="100%" stopColor="#3b0764" />
          </radialGradient>
          <linearGradient id="power-hl" x1="0" y1="0" x2="1" y2="1">
            <stop offset="0%" stopColor="#ffffff" stopOpacity="0.9" />
            <stop offset="100%" stopColor="#d8b4fe" stopOpacity="0.1" />
          </linearGradient>
        </defs>
        <polygon points="13,4 27,4 36,13 36,27 27,36 13,36 4,27 4,13" fill="#3b0764" />
        <polygon points="13,4 27,4 24,11 16,11" fill="#d8b4fe" opacity="0.9" />
        <polygon points="27,4 36,13 29,16 24,11" fill="#c084fc" opacity="0.8" />
        <polygon points="36,13 36,27 29,24 29,16" fill="#a855f7" opacity="0.8" />
        <polygon points="36,27 27,36 24,29 29,24" fill="#7e22ce" opacity="0.9" />
        <polygon points="27,36 13,36 16,29 24,29" fill="#6b21a8" opacity="0.9" />
        <polygon points="13,36 4,27 11,24 16,29" fill="#581c87" opacity="0.95" />
        <polygon points="4,27 4,13 11,16 11,24" fill="#9333ea" opacity="0.8" />
        <polygon points="4,13 13,4 16,11 11,16" fill="#e9d5ff" opacity="0.9" />
        <polygon points="16,11 24,11 29,16 29,24 24,29 16,29 11,24 11,16" fill="url(#power-glow)" />
        <polygon points="16,11 23,11 18,17 12,17" fill="url(#power-hl)" />
        <circle cx="17" cy="14" r="1.5" fill="#ffffff" />
      </svg>
    )
  }

  if (norm.includes('time')) {
    return (
      <svg viewBox="0 0 40 40" className={cn('overflow-visible drop-shadow-[0_0_10px_#10b981] shrink-0', className)} aria-hidden="true">
        <defs>
          <radialGradient id="time-glow" cx="40%" cy="35%" r="65%">
            <stop offset="0%" stopColor="#ecfdf5" />
            <stop offset="35%" stopColor="#34d399" />
            <stop offset="70%" stopColor="#059669" />
            <stop offset="100%" stopColor="#022c22" />
          </radialGradient>
          <linearGradient id="time-hl" x1="0" y1="0" x2="1" y2="1">
            <stop offset="0%" stopColor="#ffffff" stopOpacity="0.9" />
            <stop offset="100%" stopColor="#6ee7b7" stopOpacity="0.1" />
          </linearGradient>
        </defs>
        <polygon points="11,5 29,5 36,12 36,28 29,35 11,35 4,28 4,12" fill="#022c22" />
        <polygon points="11,5 29,5 26,11 14,11" fill="#6ee7b7" opacity="0.9" />
        <polygon points="29,5 36,12 30,16 26,11" fill="#34d399" opacity="0.8" />
        <polygon points="36,12 36,28 30,24 30,16" fill="#10b981" opacity="0.85" />
        <polygon points="36,28 29,35 26,29 30,24" fill="#047857" opacity="0.9" />
        <polygon points="29,35 11,35 14,29 26,29" fill="#065f46" opacity="0.9" />
        <polygon points="11,35 4,28 10,24 14,29" fill="#064e3b" opacity="0.95" />
        <polygon points="4,28 4,12 10,16 10,24" fill="#059669" opacity="0.85" />
        <polygon points="4,12 11,5 14,11 10,16" fill="#a7f3d0" opacity="0.9" />
        <polygon points="14,11 26,11 30,16 30,24 26,29 14,29 10,24 10,16" fill="url(#time-glow)" />
        <polygon points="14,11 24,11 20,17 11,17" fill="url(#time-hl)" />
        <circle cx="16" cy="14" r="1.5" fill="#ffffff" />
      </svg>
    )
  }

  if (norm.includes('soul')) {
    return (
      <svg viewBox="0 0 40 40" className={cn('overflow-visible drop-shadow-[0_0_10px_#f97316] shrink-0', className)} aria-hidden="true">
        <defs>
          <radialGradient id="soul-glow" cx="42%" cy="32%" r="65%">
            <stop offset="0%" stopColor="#fff7ed" />
            <stop offset="35%" stopColor="#fb923c" />
            <stop offset="70%" stopColor="#ea580c" />
            <stop offset="100%" stopColor="#7c2d12" />
          </radialGradient>
          <linearGradient id="soul-hl" x1="0" y1="0" x2="1" y2="1">
            <stop offset="0%" stopColor="#ffffff" stopOpacity="0.95" />
            <stop offset="100%" stopColor="#fed7aa" stopOpacity="0.1" />
          </linearGradient>
        </defs>
        <path d="M20,3 C30,3 36,13 36,22 C36,29 27,35 20,38 C13,35 4,29 4,22 C4,13 10,3 20,3 Z" fill="#7c2d12" />
        <polygon points="20,3 28,10 20,12 12,10" fill="#fed7aa" opacity="0.9" />
        <polygon points="20,3 36,22 29,17 28,10" fill="#fdba74" opacity="0.8" />
        <polygon points="20,3 4,22 11,17 12,10" fill="#fed7aa" opacity="0.85" />
        <polygon points="36,22 20,38 27,27 29,17" fill="#ea580c" opacity="0.85" />
        <polygon points="4,22 20,38 13,27 11,17" fill="#c2410c" opacity="0.9" />
        <polygon points="20,38 27,27 20,29" fill="#9a3412" opacity="0.95" />
        <polygon points="20,38 13,27 20,29" fill="#7c2d12" opacity="0.95" />
        <polygon points="20,12 28,10 29,17 27,27 20,29 13,27 11,17 12,10" fill="url(#soul-glow)" />
        <polygon points="20,12 26,11 21,18 14,17" fill="url(#soul-hl)" />
        <circle cx="19" cy="15" r="1.5" fill="#ffffff" />
      </svg>
    )
  }

  return (
    <span
      className={cn('inline-block size-6 shrink-0', className)}
      style={{ filter: `drop-shadow(0 0 8px ${color})` }}
      aria-hidden="true"
    >
      <span
        className="block size-full"
        style={{
          clipPath: 'polygon(50% 0, 100% 30%, 82% 100%, 18% 100%, 0 30%)',
          background: `radial-gradient(circle at 35% 30%, #fff 0, ${color} 45%, color-mix(in oklab, ${color} 60%, #000) 100%)`,
        }}
      />
    </span>
  )
}

export function SanctumSigil({ className }: { className?: string }) {
  const runes = Array.from({ length: 16 }, (_, i) => i * 22.5)
  return (
    <svg viewBox="0 0 200 200" className={className} aria-hidden="true" fill="none" stroke="var(--mystic)">
      <g className="origin-center animate-spin-slow">
        <circle cx="100" cy="100" r="96" strokeWidth="2" />
        <circle cx="100" cy="100" r="90" strokeWidth="0.8" strokeDasharray="2 6" />
        {runes.map((d) => (
          <path key={d} d="M100 6 v8 M96 10 h8" strokeWidth="1.4" transform={`rotate(${d} 100 100)`} />
        ))}
      </g>
      <g className="origin-center animate-spin-reverse">
        <rect x="42" y="42" width="116" height="116" strokeWidth="1.4" />
        <rect x="42" y="42" width="116" height="116" strokeWidth="1.4" transform="rotate(45 100 100)" />
      </g>
      <circle cx="100" cy="100" r="58" strokeWidth="1.6" />
      <circle cx="100" cy="100" r="30" strokeWidth="1" strokeDasharray="3 5" />
    </svg>
  )
}

export function DoctorStrangePortalRings({ className }: { className?: string }) {
  const outerRunes = Array.from({ length: 24 }, (_, i) => i * 15)
  const sparkSegments = [0, 25, 45, 70, 90, 115, 140, 160, 190, 215, 235, 260, 280, 310, 335, 350]
  const innerRunes = Array.from({ length: 12 }, (_, i) => i * 30)
  // Geometric chord angles matching MCU / sci-fi mystical mandala
  const chords = [0, 30, 60, 90, 120, 150, 180, 210, 240, 270, 300, 330]

  return (
    <svg
      viewBox="0 0 400 400"
      className={cn('pointer-events-none select-none overflow-visible', className)}
      aria-hidden="true"
    >
      <defs>
        <filter id="ds-glow" x="-30%" y="-30%" width="160%" height="160%">
          <feGaussianBlur stdDeviation="3.5" result="blur" />
          <feMerge>
            <feMergeNode in="blur" />
            <feMergeNode in="blur" />
            <feMergeNode in="SourceGraphic" />
          </feMerge>
        </filter>
        <linearGradient id="spark-gold" x1="0" y1="0" x2="1" y2="1">
          <stop offset="0%" stopColor="#ffffff" />
          <stop offset="50%" stopColor="#fde047" />
          <stop offset="100%" stopColor="#ea580c" />
        </linearGradient>
      </defs>

      {/* Layer 1: Geometric Tangent Chords & Outer Mystic Rune Wheel (Clockwise) */}
      <g className="origin-center animate-spin-slow" filter="url(#ds-glow)" stroke="#f97316" fill="none">
        <circle cx="200" cy="200" r="192" strokeWidth="1.5" strokeOpacity="0.4" />
        <circle cx="200" cy="200" r="184" strokeWidth="2.5" strokeDasharray="6 14" strokeOpacity="0.85" />
        <circle cx="200" cy="200" r="176" strokeWidth="1" strokeOpacity="0.5" />
        {/* Intersecting tangent chords */}
        {chords.map((deg) => (
          <line
            key={`chord-${deg}`}
            x1="50"
            y1="200"
            x2="350"
            y2="200"
            stroke="#fb923c"
            strokeWidth="1.2"
            strokeOpacity="0.7"
            transform={`rotate(${deg} 200 200)`}
          />
        ))}
        {outerRunes.map((deg) => (
          <g key={deg} transform={`rotate(${deg} 200 200)`}>
            <line x1="200" y1="8" x2="200" y2="24" strokeWidth="2" stroke="#fdba74" />
            <circle cx="200" cy="16" r="2.5" fill="#fed7aa" stroke="none" />
            <path d="M196 20 L204 20" strokeWidth="1.5" stroke="#f97316" />
          </g>
        ))}
      </g>

      {/* Layer 2: Counter-rotating Sacred Geometry & Cyan/Teal Tech-Mystic Dashes (Reverse) */}
      <g className="origin-center animate-spin-reverse" filter="url(#ds-glow)" stroke="#fb923c" fill="none">
        <rect x="80" y="80" width="240" height="240" strokeWidth="1.8" strokeOpacity="0.75" />
        <rect x="80" y="80" width="240" height="240" strokeWidth="1.8" strokeOpacity="0.75" transform="rotate(45 200 200)" />
        <rect x="80" y="80" width="240" height="240" strokeWidth="1.2" strokeOpacity="0.5" strokeDasharray="8 6" transform="rotate(22.5 200 200)" />
        <rect x="80" y="80" width="240" height="240" strokeWidth="1.2" strokeOpacity="0.5" strokeDasharray="8 6" transform="rotate(67.5 200 200)" />
        {/* Cyan/Teal accent orbital dashed ring */}
        <circle cx="200" cy="200" r="168" stroke="#38bdf8" strokeWidth="2.5" strokeDasharray="6 20" strokeOpacity="0.9" />
        <circle cx="200" cy="200" r="148" strokeWidth="1.5" strokeOpacity="0.6" strokeDasharray="4 8" />
        {innerRunes.map((deg) => (
          <g key={`in-${deg}`} transform={`rotate(${deg} 200 200)`}>
            <polygon points="197,55 203,55 200,48" fill="#fde047" stroke="none" />
            <rect x="198" y="32" width="4" height="6" fill="#38bdf8" stroke="none" />
          </g>
        ))}
      </g>

      {/* Layer 3: Rapid Clockwise Fiery Sparks & Sling-Ring Plasma Arcs */}
      <g className="origin-center animate-portal-cw" filter="url(#ds-glow)">
        <circle
          cx="200"
          cy="200"
          r="164"
          fill="none"
          stroke="url(#spark-gold)"
          strokeWidth="3.5"
          strokeDasharray="40 15 80 20 25 15 60 30"
          strokeLinecap="round"
        />
        <circle
          cx="200"
          cy="200"
          r="156"
          fill="none"
          stroke="#f59e0b"
          strokeWidth="2"
          strokeDasharray="10 30 50 15 30 40"
          strokeLinecap="round"
        />
        {sparkSegments.map((deg, i) => (
          <circle
            key={`spark-${i}`}
            cx={200 + 164 * Math.cos((deg * Math.PI) / 180)}
            cy={200 + 164 * Math.sin((deg * Math.PI) / 180)}
            r={i % 2 === 0 ? 3 : 2}
            fill={i % 3 === 0 ? '#ffffff' : '#fde047'}
          />
        ))}
      </g>

      {/* Layer 4: Rapid Counter-Clockwise Fiery Plasma Sparks & Cyan Embers */}
      <g className="origin-center animate-portal-ccw" filter="url(#ds-glow)">
        <circle
          cx="200"
          cy="200"
          r="174"
          fill="none"
          stroke="#ea580c"
          strokeWidth="2.5"
          strokeDasharray="15 45 70 25 35 50"
          strokeLinecap="round"
        />
        <circle
          cx="200"
          cy="200"
          r="150"
          fill="none"
          stroke="#38bdf8"
          strokeWidth="1.8"
          strokeDasharray="10 35 20 40"
          strokeLinecap="round"
        />
        {sparkSegments.map((deg, i) => (
          <circle
            key={`spark-ccw-${i}`}
            cx={200 + 174 * Math.cos(((deg + 15) * Math.PI) / 180)}
            cy={200 + 174 * Math.sin(((deg + 15) * Math.PI) / 180)}
            r={i % 2 === 0 ? 2.5 : 1.5}
            fill={i % 2 === 0 ? '#38bdf8' : '#f97316'}
          />
        ))}
      </g>

      {/* Inner Boundary Sparkle Ring */}
      <circle cx="200" cy="200" r="142" fill="none" stroke="#fed7aa" strokeWidth="1.5" strokeOpacity="0.8" strokeDasharray="3 7" className="origin-center animate-spin-slow" />
    </svg>
  )
}

export function EyeOfAgamotto({ className }: { className?: string }) {
  return (
    <svg viewBox="0 0 64 64" className={cn('shrink-0 overflow-visible', className)} aria-hidden="true">
      <circle cx="32" cy="32" r="29" fill="none" stroke="var(--mystic)" strokeWidth="2.5" />
      <path d="M4 32 Q32 8 60 32 Q32 56 4 32Z" fill="none" stroke="var(--mystic)" strokeWidth="2" />
      <circle cx="32" cy="32" r="9" fill="var(--color-stone-time)" style={{ filter: 'drop-shadow(0 0 8px var(--color-stone-time))' }} />
      <circle cx="32" cy="32" r="3.5" fill="#06140e" />
    </svg>
  )
}
