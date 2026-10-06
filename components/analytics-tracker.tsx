'use client'

import { useEffect } from 'react'

export function AnalyticsTracker() {
  useEffect(() => {
    // Generate or retrieve persistent visitor id
    let visitorId = ''
    try {
      visitorId = localStorage.getItem('stark_visitor_id') || ''
      if (!visitorId) {
        visitorId = `v_${Date.now().toString(36)}_${Math.random().toString(36).substring(2, 8)}`
        localStorage.setItem('stark_visitor_id', visitorId)
      }
    } catch {
      visitorId = `v_${Date.now().toString(36)}`
    }

    // Track Pageview
    try {
      const pageViewData = {
        type: 'pageview',
        path: window.location.pathname + window.location.hash,
        referrer: document.referrer || '',
        screen: `${window.screen.width}x${window.screen.height}`,
        visitor_id: visitorId,
      }

      fetch('/api/analytics/track', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(pageViewData),
      }).catch(() => {})
    } catch {
      // Non-blocking
    }

    // Global Link & CTA Click Tracker
    function handleDocumentClick(e: MouseEvent) {
      try {
        const target = e.target as HTMLElement | null
        if (!target) return

        // Find nearest anchor tag or button
        const anchor = target.closest('a')
        const button = target.closest('button')

        if (anchor && anchor.href) {
          const href = anchor.getAttribute('href') || anchor.href
          // Ignore purely internal in-page hash jumps unless they are key navigation links
          const label =
            anchor.getAttribute('data-track') ||
            anchor.innerText?.trim() ||
            anchor.getAttribute('aria-label') ||
            anchor.title ||
            'Link'

          const clickData = {
            type: 'click',
            label: label.substring(0, 100),
            href: href,
            path: window.location.pathname,
            referrer: document.referrer || '',
            visitor_id: visitorId,
          }

          if (navigator.sendBeacon) {
            const blob = new Blob([JSON.stringify(clickData)], { type: 'application/json' })
            navigator.sendBeacon('/api/analytics/track', blob)
          } else {
            fetch('/api/analytics/track', {
              method: 'POST',
              headers: { 'Content-Type': 'application/json' },
              body: JSON.stringify(clickData),
              keepalive: true,
            }).catch(() => {})
          }
        } else if (button && button.getAttribute('data-track')) {
          const label = button.getAttribute('data-track') || button.innerText?.trim() || 'Button'
          const clickData = {
            type: 'click',
            label: label.substring(0, 100),
            href: '#action',
            path: window.location.pathname,
            referrer: document.referrer || '',
            visitor_id: visitorId,
          }
          fetch('/api/analytics/track', {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify(clickData),
            keepalive: true,
          }).catch(() => {})
        }
      } catch {
        // Non-blocking
      }
    }

    document.addEventListener('click', handleDocumentClick, { capture: true })

    return () => {
      document.removeEventListener('click', handleDocumentClick, { capture: true })
    }
  }, [])

  return null
}
