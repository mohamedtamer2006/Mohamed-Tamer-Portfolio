import Image from 'next/image'
import { ImagePlus } from 'lucide-react'
import { cn } from '@/lib/utils'

export function PhotoPlaceholder({
  src,
  alt,
  label = 'Add your photo',
  hint,
  className,
  rounded = false,
  fit = 'cover',
}: {
  fit?: 'cover' | 'contain'
  src?: string | null
  alt: string
  label?: string
  hint?: string
  className?: string
  rounded?: boolean
}) {
  if (src) {
    return (
      <div className={cn('relative overflow-hidden', rounded && 'rounded-full', className)}>
        <Image src={src} alt={alt} fill className={fit === 'contain' ? 'object-contain' : 'object-cover'} sizes="(min-width: 1024px) 480px, 80vw" />
      </div>
    )
  }

  return (
    <div
      className={cn(
        'relative flex flex-col items-center justify-center gap-2 overflow-hidden border-2 border-dashed border-arc/50 bg-arc/5 text-center text-arc',
        rounded && 'rounded-full',
        className,
      )}
      role="img"
      aria-label={`${alt} — placeholder`}
    >
      <span className="halftone pointer-events-none absolute inset-0 text-arc opacity-[0.08]" aria-hidden="true" />
      <ImagePlus className="size-8" aria-hidden="true" />
      <span className="text-xs font-semibold tracking-[0.25em] uppercase">{label}</span>
      {hint ? <span className="px-4 text-[11px] text-muted-foreground">{hint}</span> : null}
    </div>
  )
}
