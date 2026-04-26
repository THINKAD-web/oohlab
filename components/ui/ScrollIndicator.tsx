'use client'

import { useEffect, useState } from 'react'
import { usePathname, useRouter } from 'next/navigation'

/**
 * Vertical page indicator at the left rail (≥1024 + hover-capable).
 *
 * Maps the site to an 11-page magazine metaphor:
 *   /            → pages 01–02
 *   /works (+ /works/[slug])  → pages 03–08
 *   /about       → pages 09–10
 *   /contact     → page 11
 *
 * Active page is computed from pathname + scroll progress within the
 * current route. Clicking a dash navigates to the page's owning route.
 *
 * Hidden on touch / small viewports — same gates as the editorial cursor.
 */

interface PageRange {
  /** Inclusive page numbers covered by this route. */
  range: [number, number]
  /** Pathname prefix that maps to this range. */
  prefix: string
  /** Exact path the dash navigates to on click. */
  href: string
}

const ROUTE_RANGES: PageRange[] = [
  { range: [1, 2], prefix: '/', href: '/' },
  { range: [3, 8], prefix: '/works', href: '/works' },
  { range: [9, 10], prefix: '/about', href: '/about' },
  { range: [11, 11], prefix: '/contact', href: '/contact' },
]

const TOTAL_PAGES = 11

function rangeForPathname(pathname: string): PageRange | null {
  // Order matters: match longer prefixes first ('/works' before '/').
  const ordered = [...ROUTE_RANGES].sort(
    (a, b) => b.prefix.length - a.prefix.length
  )
  for (const r of ordered) {
    if (r.prefix === '/' ? pathname === '/' : pathname.startsWith(r.prefix)) {
      return r
    }
  }
  return null
}

function rangeForPage(page: number): PageRange | null {
  return ROUTE_RANGES.find((r) => page >= r.range[0] && page <= r.range[1]) ?? null
}

export function ScrollIndicator() {
  const pathname = usePathname()
  const router = useRouter()

  const [enabled, setEnabled] = useState(false)
  const [activePage, setActivePage] = useState(0)

  // Activation: desktop, hover-capable. (No prefers-reduced-motion gate —
  // the indicator is purely informational; motion is just width changes.)
  useEffect(() => {
    if (typeof window === 'undefined') return
    const mq = window.matchMedia('(hover: hover) and (pointer: fine) and (min-width: 1024px)')
    const sync = () => setEnabled(mq.matches)
    sync()
    mq.addEventListener('change', sync)
    return () => mq.removeEventListener('change', sync)
  }, [])

  // Recompute active page on scroll + on route change.
  useEffect(() => {
    if (!enabled) return
    const route = rangeForPathname(pathname)

    const computeActive = () => {
      if (!route) {
        setActivePage(0)
        return
      }
      const [lo, hi] = route.range
      const span = hi - lo + 1
      if (span === 1) {
        setActivePage(lo)
        return
      }
      const doc = document.documentElement
      const max = doc.scrollHeight - doc.clientHeight
      const progress = max > 0 ? Math.min(1, Math.max(0, doc.scrollTop / max)) : 0
      // Last bucket inclusive: progress 1.0 → highest page in range
      const idx = Math.min(span - 1, Math.floor(progress * span))
      setActivePage(lo + idx)
    }

    computeActive()
    const onScroll = () => computeActive()
    window.addEventListener('scroll', onScroll, { passive: true })
    return () => window.removeEventListener('scroll', onScroll)
  }, [pathname, enabled])

  if (!enabled) return null

  const handleNav = (page: number) => {
    const r = rangeForPage(page)
    if (!r) return
    router.push(r.href)
  }

  return (
    <aside
      aria-label="Issue page indicator"
      style={{
        position: 'fixed',
        left: 16,
        top: '50%',
        transform: 'translateY(-50%)',
        zIndex: 'var(--z-scroll-indicator, 30)' as unknown as number,
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'flex-start',
        gap: 6,
      }}
    >
      {Array.from({ length: TOTAL_PAGES }, (_, i) => {
        const page = i + 1
        const isEndpoint = page === 1 || page === TOTAL_PAGES
        const isActive = page === activePage
        const route = rangeForPage(page)
        const label = String(page).padStart(2, '0')
        return (
          <button
            key={page}
            type="button"
            onClick={() => handleNav(page)}
            aria-label={`Go to page ${label} (${route?.href ?? ''})`}
            aria-current={isActive ? 'page' : undefined}
            data-cursor="link"
            className="scroll-indicator__btn"
            style={{
              background: 'transparent',
              border: 0,
              padding: '4px 0',
              display: 'flex',
              alignItems: 'center',
              cursor: 'pointer',
              minHeight: 12,
            }}
          >
            {isEndpoint ? (
              <span
                style={{
                  fontFamily: 'var(--font-mono)',
                  fontSize: 9,
                  letterSpacing: '0.2em',
                  color: isActive ? 'var(--fg)' : 'var(--muted)',
                  transition: 'color var(--dur-fast) var(--ease-edit)',
                }}
              >
                {label}
              </span>
            ) : (
              <span
                aria-hidden
                className="scroll-indicator__dash"
                data-active={isActive ? 'true' : undefined}
                style={{
                  display: 'block',
                  height: 1,
                  width: isActive ? 12 : 8,
                  background: isActive ? 'var(--accent)' : 'var(--border)',
                  transition:
                    'width var(--dur-fast) var(--ease-edit), background var(--dur-fast) var(--ease-edit)',
                }}
              />
            )}
          </button>
        )
      })}
    </aside>
  )
}
