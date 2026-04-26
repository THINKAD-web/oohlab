'use client'

import { useEffect, useState } from 'react'
import { usePathname } from 'next/navigation'

interface Section {
  el: Element
  page: string
  label?: string
}

/**
 * Left-rail scroll indicator (≥1024px, hover-capable devices only).
 *
 * Reads sections from `[data-page]` elements on the current route. Each section
 * provides a 2-digit page number; `[data-page-label]` is optional metadata
 * shown on hover.
 *
 * Default: vertical tick rail with current page in --accent + caption "PAGE 03 / 04".
 * Hover/focus: rail expands to show a vertical progress bar of the page scroll.
 */
export function ScrollIndicator() {
  const pathname = usePathname()
  const [enabled, setEnabled] = useState(false)
  const [sections, setSections] = useState<Section[]>([])
  const [active, setActive] = useState(0)
  const [progress, setProgress] = useState(0) // 0–1
  const [hover, setHover] = useState(false)

  // Gate to desktop + hover-capable
  useEffect(() => {
    if (typeof window === 'undefined') return
    const mq = window.matchMedia('(hover: hover) and (pointer: fine) and (min-width: 1024px)')
    const apply = () => setEnabled(mq.matches)
    apply()
    mq.addEventListener('change', apply)
    return () => mq.removeEventListener('change', apply)
  }, [])

  // (Re)collect sections when route changes
  useEffect(() => {
    if (!enabled) return
    // Defer one frame so the new route's DOM is mounted
    const id = requestAnimationFrame(() => {
      const nodes = Array.from(document.querySelectorAll<HTMLElement>('[data-page]'))
      const collected: Section[] = nodes.map((el) => ({
        el,
        page: el.dataset.page ?? '',
        label: el.dataset.pageLabel,
      }))
      setSections(collected)
      setActive(0)
    })
    return () => cancelAnimationFrame(id)
  }, [pathname, enabled])

  // Track active section via IntersectionObserver
  useEffect(() => {
    if (!enabled || sections.length === 0) return
    const visible = new Map<Element, number>()
    const obs = new IntersectionObserver(
      (entries) => {
        for (const entry of entries) {
          if (entry.isIntersecting) visible.set(entry.target, entry.intersectionRatio)
          else visible.delete(entry.target)
        }
        if (visible.size === 0) return
        let bestEl: Element | null = null
        let bestRatio = -1
        for (const [el, ratio] of visible) {
          if (ratio > bestRatio) {
            bestRatio = ratio
            bestEl = el
          }
        }
        if (bestEl) {
          const idx = sections.findIndex((s) => s.el === bestEl)
          if (idx >= 0) setActive(idx)
        }
      },
      { threshold: [0, 0.25, 0.5, 0.75, 1] }
    )
    sections.forEach((s) => obs.observe(s.el))
    return () => obs.disconnect()
  }, [sections, enabled])

  // Track scroll progress (for hover bar)
  useEffect(() => {
    if (!enabled) return
    const onScroll = () => {
      const doc = document.documentElement
      const max = doc.scrollHeight - doc.clientHeight
      setProgress(max > 0 ? Math.min(1, Math.max(0, doc.scrollTop / max)) : 0)
    }
    onScroll()
    window.addEventListener('scroll', onScroll, { passive: true })
    return () => window.removeEventListener('scroll', onScroll)
  }, [enabled])

  if (!enabled || sections.length === 0) return null

  const current = sections[active]
  const total = sections.length
  const pageLabel = current.page || String(active + 1).padStart(2, '0')
  const totalLabel = String(total).padStart(2, '0')

  return (
    <aside
      aria-label="Page progress"
      onMouseEnter={() => setHover(true)}
      onMouseLeave={() => setHover(false)}
      style={{
        position: 'fixed',
        top: '50%',
        left: 16,
        transform: 'translateY(-50%)',
        zIndex: 'var(--z-nav)' as unknown as number,
        display: 'flex',
        flexDirection: 'column',
        gap: 12,
        alignItems: 'flex-start',
        padding: '12px 6px',
        pointerEvents: 'auto',
      }}
    >
      <p
        className="t-mono"
        style={{
          margin: 0,
          fontSize: 10,
          letterSpacing: 'var(--tracking-tight)',
          textTransform: 'uppercase',
          color: 'var(--muted)',
          writingMode: 'vertical-rl',
          transform: 'rotate(180deg)',
        }}
      >
        {hover && current.label ? current.label : 'Page'}
      </p>

      {/* Tick rail / progress bar */}
      <div
        style={{
          position: 'relative',
          width: 14,
          height: Math.max(120, total * 16),
          display: 'flex',
          flexDirection: 'column',
          justifyContent: 'space-between',
          alignItems: 'center',
        }}
      >
        {/* Background rail (always present) */}
        <span
          aria-hidden
          style={{
            position: 'absolute',
            left: '50%',
            top: 0,
            bottom: 0,
            width: 1,
            background: 'var(--border)',
            transform: 'translateX(-0.5px)',
          }}
        />
        {/* Progress fill — visible on hover */}
        <span
          aria-hidden
          style={{
            position: 'absolute',
            left: '50%',
            top: 0,
            width: 1,
            height: `${progress * 100}%`,
            background: 'var(--accent)',
            transform: 'translateX(-0.5px)',
            opacity: hover ? 1 : 0,
            transition: 'opacity var(--dur-fast) var(--ease-edit)',
          }}
        />
        {/* Tick marks per section */}
        {sections.map((s, i) => (
          <span
            key={s.page + i}
            aria-hidden
            style={{
              position: 'relative',
              width: 8,
              height: 1,
              background: i === active ? 'var(--accent)' : 'var(--fg)',
              opacity: hover ? 0 : i === active ? 1 : 0.45,
              transition: 'opacity var(--dur-fast) var(--ease-edit), background var(--dur-fast) var(--ease-edit)',
            }}
          />
        ))}
      </div>

      <p
        className="t-mono"
        style={{
          margin: 0,
          fontSize: 10,
          letterSpacing: 'var(--tracking-tight)',
          textTransform: 'uppercase',
          color: 'var(--fg)',
          writingMode: 'vertical-rl',
          transform: 'rotate(180deg)',
        }}
      >
        {pageLabel} / {totalLabel}
      </p>
    </aside>
  )
}
