'use client'

import { useEffect, useState } from 'react'
import Link from 'next/link'
import { usePathname } from 'next/navigation'
import masthead from '@/data/masthead.json'

const NAV_ITEMS = [
  { label: 'Index', href: '/' },
  { label: 'Works', href: '/works' },
  { label: 'About', href: '/about' },
  { label: 'Contact', href: '/contact' },
]

function isActive(pathname: string, href: string) {
  if (href === '/') return pathname === '/'
  return pathname === href || pathname.startsWith(href + '/')
}

export function Navbar() {
  const pathname = usePathname()
  const [open, setOpen] = useState(false)

  // Lock scroll while overlay open
  useEffect(() => {
    document.body.style.overflow = open ? 'hidden' : ''
    return () => {
      document.body.style.overflow = ''
    }
  }, [open])

  // Close overlay on route change
  useEffect(() => {
    setOpen(false)
  }, [pathname])

  return (
    <>
      <header
        role="banner"
        style={{
          position: 'sticky',
          top: 0,
          zIndex: 'var(--z-nav)' as unknown as number,
          background: 'var(--bg)',
          borderBottom: 'var(--rule)',
          height: 'var(--nav-h)',
        }}
      >
        <div
          className="container"
          style={{
            height: '100%',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'space-between',
            gap: 24,
          }}
        >
          {/* Wordmark + issue meta */}
          <div style={{ display: 'flex', alignItems: 'baseline', gap: 12, minWidth: 0 }}>
            <Link
              href="/"
              aria-label="OOH-LAB · Home"
              style={{
                fontFamily: 'var(--font-serif)',
                fontStyle: 'italic',
                fontWeight: 400,
                fontSize: 22,
                lineHeight: 1,
                letterSpacing: '-0.01em',
                fontVariationSettings: "'opsz' 36, 'SOFT' 50, 'WONK' 1",
                color: 'var(--fg)',
                whiteSpace: 'nowrap',
              }}
            >
              OOH-LAB
            </Link>
            <span
              className="t-mono show-desktop"
              aria-hidden
              style={{
                fontSize: 11,
                letterSpacing: 'var(--tracking-tight)',
                textTransform: 'uppercase',
                color: 'var(--muted)',
                whiteSpace: 'nowrap',
              }}
            >
              · Issue {masthead.issueNumber}
            </span>
          </div>

          {/* Desktop nav + CTA */}
          <nav
            aria-label="Primary"
            className="show-desktop"
            style={{ alignItems: 'center', gap: 32 }}
          >
            {NAV_ITEMS.map((item) => {
              const active = isActive(pathname, item.href)
              return (
                <Link
                  key={item.href}
                  href={item.href}
                  className={`link-rule${active ? ' is-active' : ''}`}
                  style={{
                    fontFamily: 'var(--font-mono)',
                    fontSize: 12,
                    letterSpacing: 'var(--tracking-tight)',
                    textTransform: 'uppercase',
                    color: 'var(--fg)',
                    fontWeight: 500,
                  }}
                >
                  {item.label}
                </Link>
              )
            })}
            <Link
              href="/contact"
              style={{
                marginLeft: 8,
                padding: '7px 14px',
                border: '1px solid var(--accent)',
                color: 'var(--accent)',
                fontFamily: 'var(--font-mono)',
                fontSize: 12,
                letterSpacing: 'var(--tracking-tight)',
                textTransform: 'uppercase',
                fontWeight: 500,
                whiteSpace: 'nowrap',
                transition:
                  'background var(--dur-fast) var(--ease-edit), color var(--dur-fast) var(--ease-edit)',
              }}
              onMouseEnter={(e) => {
                e.currentTarget.style.background = 'var(--accent)'
                e.currentTarget.style.color = 'var(--bg)'
              }}
              onMouseLeave={(e) => {
                e.currentTarget.style.background = 'transparent'
                e.currentTarget.style.color = 'var(--accent)'
              }}
            >
              ✦ Next Issue →
            </Link>
          </nav>

          {/* Mobile toggle */}
          <button
            type="button"
            onClick={() => setOpen((v) => !v)}
            aria-expanded={open}
            aria-controls="mobile-overlay"
            aria-label={open ? 'Close index' : 'Open index'}
            className="show-mobile"
            style={{
              alignItems: 'center',
              gap: 6,
              background: 'transparent',
              border: 0,
              padding: '6px 0',
              cursor: 'pointer',
              fontFamily: 'var(--font-mono)',
              fontSize: 12,
              letterSpacing: 'var(--tracking-tight)',
              textTransform: 'uppercase',
              color: 'var(--fg)',
              fontWeight: 500,
            }}
          >
            <span>{open ? 'Close' : 'Index'}</span>
            <span aria-hidden>{open ? '✕' : '↓'}</span>
          </button>
        </div>
      </header>

      {/* Mobile overlay */}
      <div
        id="mobile-overlay"
        role="dialog"
        aria-modal="true"
        aria-hidden={!open}
        style={{
          position: 'fixed',
          inset: 0,
          zIndex: 'calc(var(--z-nav) - 1)' as unknown as number,
          background: 'var(--bg)',
          opacity: open ? 1 : 0,
          visibility: open ? 'visible' : 'hidden',
          transition: `opacity var(--dur) var(--ease-edit), visibility 0s linear ${open ? '0s' : 'var(--dur)'}`,
          paddingTop: 'var(--nav-h)',
        }}
      >
        <div
          className="container"
          style={{
            paddingTop: 'var(--gap-y-sm)',
            paddingBottom: 'var(--gap-y-sm)',
            display: 'flex',
            flexDirection: 'column',
            gap: 'var(--gap-y-sm)',
            minHeight: 'calc(100vh - var(--nav-h))',
          }}
        >
          {/* Masthead caption */}
          <p className="t-caption" style={{ margin: 0 }}>
            ⏤ Issue {masthead.issueNumber} · {masthead.season}
          </p>

          {/* Big serif italic links */}
          <nav aria-label="Primary mobile" style={{ display: 'flex', flexDirection: 'column' }}>
            {NAV_ITEMS.map((item, i) => {
              const active = isActive(pathname, item.href)
              return (
                <Link
                  key={item.href}
                  href={item.href}
                  style={{
                    fontFamily: 'var(--font-serif)',
                    fontStyle: 'italic',
                    fontWeight: 300,
                    fontSize: 'clamp(40px, 12vw, 72px)',
                    lineHeight: 1.05,
                    letterSpacing: 'var(--track-h1)',
                    fontVariationSettings: "'opsz' 96, 'SOFT' 50, 'WONK' 1",
                    color: active ? 'var(--accent)' : 'var(--fg)',
                    paddingBlock: 12,
                    borderBottom: 'var(--rule)',
                    transform: open ? 'translateX(0)' : 'translateX(-12px)',
                    opacity: open ? 1 : 0,
                    transition: `opacity var(--dur) var(--ease-edit) ${0.05 + i * 0.06}s, transform var(--dur) var(--ease-edit) ${0.05 + i * 0.06}s`,
                  }}
                >
                  <span style={{ marginRight: 16, color: 'var(--muted)', fontSize: '0.4em' }}>
                    №&nbsp;{String(i + 1).padStart(2, '0')}
                  </span>
                  {item.label}
                </Link>
              )
            })}
          </nav>

          {/* Footer of overlay */}
          <div style={{ marginTop: 'auto', display: 'flex', flexDirection: 'column', gap: 12 }}>
            <Link
              href="/contact"
              style={{
                padding: '14px 18px',
                background: 'var(--accent)',
                color: 'var(--bg)',
                fontFamily: 'var(--font-mono)',
                fontSize: 13,
                letterSpacing: 'var(--tracking-tight)',
                textTransform: 'uppercase',
                fontWeight: 500,
                textAlign: 'center',
              }}
            >
              ✦ Next Issue → /contact
            </Link>
            <p className="t-caption" style={{ margin: 0 }}>
              {masthead.cursorLabels.default}
            </p>
          </div>
        </div>
      </div>
    </>
  )
}
