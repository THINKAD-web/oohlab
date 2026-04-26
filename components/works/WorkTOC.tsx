'use client'

import { useEffect, useRef, useState } from 'react'
import Image from 'next/image'
import Link from 'next/link'
import type { Work } from '@/lib/types'

export interface WorkTOCEntry extends Work {
  /** Stable issue page label, e.g. "FIG. 03". */
  fig: string
}

interface Props {
  works: WorkTOCEntry[]
  /** Show "§ Gov" tag column on government-client rows. Default: true. */
  showGovTag?: boolean
  /** How many thumbnails to warm via priority preload. Default: 8. */
  prefetchCount?: number
}

/**
 * Magazine TOC list with two view modes (chosen at runtime, single render):
 *
 * Desktop (≥1024 + hover): floating thumbnail follows cursor with a soft lerp;
 * other rows dim to 0.3 via .toc.is-dimming. The preview anchors at
 * (cursor.x + 24, cursor.y - 140) per spec, fades in 0→1 + scales 0.98→1.
 *
 * Mobile / tablet / touch: row tap toggles an inline accordion (image + caption
 * + Read link). One open at a time. Arrow rotates → → ↓. Smooth height via
 * grid-template-rows 0fr → 1fr (Chrome 117+, Safari 17+).
 *
 * `prefers-reduced-motion`: disables lerp (snap to cursor), shortens fades.
 */
export function WorkTOC({ works, showGovTag = true, prefetchCount = 8 }: Props) {
  // ── Capability detection (client-only) ──────────────────────────────────
  const [hoverCapable, setHoverCapable] = useState(false)
  const [reducedMotion, setReducedMotion] = useState(false)

  useEffect(() => {
    const mqHover = window.matchMedia(
      '(hover: hover) and (pointer: fine) and (min-width: 1024px)'
    )
    const mqReduce = window.matchMedia('(prefers-reduced-motion: reduce)')
    const sync = () => {
      setHoverCapable(mqHover.matches)
      setReducedMotion(mqReduce.matches)
    }
    sync()
    mqHover.addEventListener('change', sync)
    mqReduce.addEventListener('change', sync)
    return () => {
      mqHover.removeEventListener('change', sync)
      mqReduce.removeEventListener('change', sync)
    }
  }, [])

  // ── Hover state (desktop) ───────────────────────────────────────────────
  const [hovered, setHovered] = useState<WorkTOCEntry | null>(null)
  const previewRef = useRef<HTMLDivElement>(null)
  const target = useRef({ x: 0, y: 0 })
  const current = useRef({ x: 0, y: 0 })
  const rafId = useRef<number>(0)

  useEffect(() => {
    if (!hoverCapable) return
    const onMove = (e: MouseEvent) => {
      target.current.x = e.clientX
      target.current.y = e.clientY
    }
    window.addEventListener('mousemove', onMove)

    // ~100ms convergence at 60fps; snap when reduced-motion.
    const lerp = reducedMotion ? 1 : 0.18
    const tick = () => {
      current.current.x += (target.current.x - current.current.x) * lerp
      current.current.y += (target.current.y - current.current.y) * lerp
      const el = previewRef.current
      if (el) {
        // Brief: cursor.x + 24, cursor.y − 140
        el.style.transform = `translate3d(${current.current.x + 24}px, ${
          current.current.y - 140
        }px, 0)`
      }
      rafId.current = requestAnimationFrame(tick)
    }
    rafId.current = requestAnimationFrame(tick)
    return () => {
      window.removeEventListener('mousemove', onMove)
      cancelAnimationFrame(rafId.current)
    }
  }, [hoverCapable, reducedMotion])

  // ── Tap state (mobile) ──────────────────────────────────────────────────
  const [openId, setOpenId] = useState<string | null>(null)

  // ── Handlers ────────────────────────────────────────────────────────────
  const onEnterRow = (w: WorkTOCEntry, e: React.MouseEvent) => {
    if (!hoverCapable) return
    // Snap initial position so preview doesn't slide in from (0,0)
    current.current.x = e.clientX
    current.current.y = e.clientY
    target.current.x = e.clientX
    target.current.y = e.clientY
    setHovered(w)
  }

  const onLeaveList = () => {
    if (!hoverCapable) return
    setHovered(null)
  }

  const onClickRow = (w: WorkTOCEntry, e: React.MouseEvent) => {
    if (hoverCapable) return // desktop: let Link navigate
    e.preventDefault()
    setOpenId((prev) => (prev === w.id ? null : w.id))
  }

  return (
    <>
      <ul
        className={`toc${hovered ? ' is-dimming' : ''}`}
        onMouseLeave={onLeaveList}
        style={{ listStyle: 'none', margin: 0, padding: 0 }}
      >
        {works.map((w) => {
          const isHovered = hovered?.id === w.id
          const isOpen = openId === w.id
          const ariaLabel = `${w.fig}, ${w.client}, ${w.mediaType}, ${w.year}`
          return (
            <li
              key={w.id}
              className={`toc__row${isHovered ? ' is-active' : ''}`}
              style={{ borderBottom: 'var(--rule)' }}
            >
              <Link
                href={`/works/${w.slug}`}
                data-cursor="work"
                aria-label={ariaLabel}
                aria-expanded={!hoverCapable ? isOpen : undefined}
                onMouseEnter={(e) => onEnterRow(w, e)}
                onClick={(e) => onClickRow(w, e)}
                style={{
                  display: 'grid',
                  gridTemplateColumns: showGovTag
                    ? 'minmax(72px, auto) 1fr auto auto auto'
                    : 'minmax(72px, auto) 1fr auto auto',
                  alignItems: 'baseline',
                  gap: 'clamp(16px, 3vw, 40px)',
                  paddingBlock: 26,
                  color: 'var(--fg)',
                }}
              >
                <span
                  className="t-mono"
                  style={{
                    fontSize: 11,
                    letterSpacing: 'var(--tracking-tight)',
                    textTransform: 'uppercase',
                    color: 'var(--muted)',
                  }}
                >
                  {w.fig}
                </span>

                <span
                  style={{
                    fontFamily: 'var(--font-serif)',
                    fontStyle: 'italic',
                    fontWeight: 300,
                    fontSize: 'clamp(22px, 3vw, 36px)',
                    letterSpacing: '-0.01em',
                    lineHeight: 1.15,
                    fontVariationSettings: "'opsz' 72, 'SOFT' 50, 'WONK' 1",
                  }}
                >
                  {w.client}
                </span>

                {showGovTag && (
                  <span
                    className="t-mono show-desktop"
                    style={{
                      fontSize: 10,
                      letterSpacing: 'var(--tracking-tight)',
                      textTransform: 'uppercase',
                      color: w.isGovernment ? 'var(--accent)' : 'transparent',
                    }}
                  >
                    {w.isGovernment ? '§ Gov' : '·'}
                  </span>
                )}

                <span
                  className="t-mono show-desktop"
                  style={{
                    fontSize: 11,
                    letterSpacing: 'var(--tracking-tight)',
                    textTransform: 'uppercase',
                    color: 'var(--muted)',
                    whiteSpace: 'nowrap',
                  }}
                >
                  {w.mediaType} · {w.year}
                </span>

                <span
                  aria-hidden
                  className="t-mono"
                  style={{
                    fontSize: 14,
                    color: 'var(--fg)',
                    transform: isOpen ? 'rotate(90deg)' : 'rotate(0)',
                    transformOrigin: 'center',
                    transition: 'transform var(--dur-fast) var(--ease-edit)',
                  }}
                >
                  →
                </span>
              </Link>

              {/* Mobile accordion panel */}
              <div
                className={`toc__panel${isOpen ? ' is-open' : ''}`}
                aria-hidden={!isOpen}
              >
                <div className="toc__panel-inner">
                  <div
                    style={{
                      paddingBottom: 24,
                      display: 'flex',
                      flexDirection: 'column',
                      gap: 12,
                    }}
                  >
                    <div
                      style={{
                        position: 'relative',
                        width: '100%',
                        aspectRatio: '4/3',
                        border: 'var(--rule)',
                        background: 'var(--surface)',
                      }}
                    >
                      <Image
                        src={w.thumbnail}
                        alt={w.title}
                        fill
                        sizes="(max-width: 1024px) 100vw, 0"
                        style={{ objectFit: 'cover' }}
                      />
                    </div>
                    <p
                      className="t-mono"
                      style={{
                        margin: 0,
                        fontSize: 10,
                        letterSpacing: '0.2em',
                        textTransform: 'uppercase',
                        color: 'var(--muted)',
                      }}
                    >
                      {w.fig} — {w.client} / {w.mediaType} · {w.year}
                    </p>
                    <Link
                      href={`/works/${w.slug}`}
                      className="link-rule"
                      style={{
                        alignSelf: 'flex-start',
                        fontFamily: 'var(--font-mono)',
                        fontSize: 12,
                        letterSpacing: 'var(--tracking-tight)',
                        textTransform: 'uppercase',
                        color: 'var(--accent)',
                        fontWeight: 500,
                      }}
                    >
                      → Read article
                    </Link>
                  </div>
                </div>
              </div>
            </li>
          )
        })}
      </ul>

      {/* Floating preview — rendered only on hover-capable devices */}
      {hoverCapable && (
        <div
          ref={previewRef}
          aria-hidden
          style={{
            position: 'fixed',
            top: 0,
            left: 0,
            zIndex: 40,
            pointerEvents: 'none',
            opacity: hovered ? 1 : 0,
            transform: 'translate3d(0, 0, 0)',
            transition: `opacity ${
              reducedMotion ? '0s' : '0.3s'
            } var(--ease-edit)`,
            willChange: 'transform',
          }}
        >
          {hovered && (
            <div
              style={{
                width: 320,
                transform: hovered ? 'scale(1)' : 'scale(0.98)',
                transition: `transform ${
                  reducedMotion ? '0s' : '0.5s'
                } var(--ease-edit)`,
              }}
            >
              <div
                style={{
                  position: 'relative',
                  width: 320,
                  height: 240,
                  border: 'var(--rule)',
                  background: 'var(--surface)',
                }}
              >
                <Image
                  src={hovered.thumbnail}
                  alt=""
                  fill
                  sizes="320px"
                  style={{ objectFit: 'cover' }}
                />
              </div>
              <p
                className="t-mono"
                style={{
                  margin: '8px 0 0',
                  fontSize: 10,
                  letterSpacing: '0.2em',
                  textTransform: 'uppercase',
                  color: 'var(--muted)',
                }}
              >
                {hovered.fig} — {hovered.client} / {hovered.mediaType} ·{' '}
                {hovered.year}
              </p>
            </div>
          )}
        </div>
      )}

      {/* Image prefetch — warm browser cache for the first N thumbnails so
          floating preview doesn't flash on first hover. Hidden + priority
          tells Next/Image to emit a <link rel="preload">. */}
      <div
        aria-hidden
        style={{
          position: 'absolute',
          width: 0,
          height: 0,
          overflow: 'hidden',
          pointerEvents: 'none',
        }}
      >
        {works.slice(0, prefetchCount).map((w) => (
          <Image
            key={`prefetch-${w.id}`}
            src={w.thumbnail}
            alt=""
            width={1}
            height={1}
            priority
          />
        ))}
      </div>
    </>
  )
}
