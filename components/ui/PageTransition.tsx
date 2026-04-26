'use client'

import { useEffect, useRef, useState } from 'react'
import { usePathname } from 'next/navigation'

/**
 * Page transition overlay — cover → reveal on every pathname change.
 *
 * On first mount it stays inert (no transition on initial page load).
 * Each subsequent pathname change increments a key so the overlay
 * re-mounts and CSS keyframes restart from frame 0.
 *
 * The overlay covers the viewport at translateY(0), holds for ~360ms
 * while the new route paints, then slides up to translateY(-100%).
 * "→ NEXT ISSUE" mono caption appears centered during the cover phase.
 */
export function PageTransition() {
  const pathname = usePathname()
  const [animKey, setAnimKey] = useState(0)
  const isFirst = useRef(true)

  useEffect(() => {
    if (isFirst.current) {
      isFirst.current = false
      return
    }
    setAnimKey((k) => k + 1)
  }, [pathname])

  if (animKey === 0) return null

  return (
    <div key={animKey} className="page-transition" aria-hidden>
      <span className="page-transition__label">→ Next Issue</span>
    </div>
  )
}
