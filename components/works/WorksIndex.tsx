'use client'

import { useEffect, useMemo, useRef, useState } from 'react'
import Image from 'next/image'
import Link from 'next/link'
import worksData from '@/data/works.json'
import masthead from '@/data/masthead.json'
import type { Work } from '@/lib/types'

const ALL_WORKS = worksData.works as unknown as Work[]
const ALL = 'ALL' as const
type Filter = typeof ALL | string

// Fig number is stable per work (its position in the full ordered list).
function fig(index: number) {
  return `FIG. ${String(index + 1).padStart(2, '0')}`
}

// ─── Page ───────────────────────────────────────────────────────────────────

export function WorksIndex() {
  const indexed = useMemo(
    () => ALL_WORKS.map((w, i) => ({ ...w, _fig: fig(i), _index: i })),
    []
  )

  // Unique mediaTypes preserving first-occurrence order.
  const mediaTypes = useMemo(() => {
    const seen = new Set<string>()
    const out: string[] = []
    for (const w of ALL_WORKS) {
      if (!seen.has(w.mediaType)) {
        seen.add(w.mediaType)
        out.push(w.mediaType)
      }
    }
    return out
  }, [])

  const [filter, setFilter] = useState<Filter>(ALL)
  const filtered = useMemo(
    () => (filter === ALL ? indexed : indexed.filter((w) => w.mediaType === filter)),
    [filter, indexed]
  )

  return (
    <>
      <CoverSection
        mediaTypes={mediaTypes}
        filter={filter}
        setFilter={setFilter}
        total={ALL_WORKS.length}
        showing={filtered.length}
      />
      <IndexListSection works={filtered} />
    </>
  )
}

// ─── § 01 · Cover (header + filter) ─────────────────────────────────────────

function CoverSection({
  mediaTypes,
  filter,
  setFilter,
  total,
  showing,
}: {
  mediaTypes: string[]
  filter: Filter
  setFilter: (f: Filter) => void
  total: number
  showing: number
}) {
  return (
    <section
      data-page="01"
      data-page-label="Cover"
      style={{ paddingBlock: 'clamp(64px, 10vw, 120px) var(--gap-y-sm)' }}
    >
      <div className="container">
        <p className="t-caption" style={{ margin: 0 }}>
          ⏤ Issue {masthead.issueNumber} · Index of Work
        </p>

        <h1 className="t-display" style={{ margin: '16px 0 0', maxWidth: '80%' }}>
          <span className="t-italic">Works.</span>
        </h1>

        <p
          style={{
            margin: '24px 0 0',
            maxWidth: 540,
            color: 'var(--muted)',
            fontSize: 'var(--type-body)',
            lineHeight: 1.7,
          }}
        >
          {showing}편 — 2025년 한 해 동안 도시를 채운 캠페인 기록.
          기업·공공기관 옥외광고 사례.
        </p>

        {/* Filter row */}
        <div
          style={{
            marginTop: 'var(--gap-y-sm)',
            display: 'flex',
            alignItems: 'baseline',
            gap: 16,
            flexWrap: 'wrap',
          }}
        >
          <span className="t-caption" style={{ color: 'var(--fg)' }}>
            Filter by:
          </span>
          <FilterChip
            label={`All (${total})`}
            active={filter === ALL}
            onClick={() => setFilter(ALL)}
          />
          {mediaTypes.map((m) => (
            <FilterChip
              key={m}
              label={m}
              active={filter === m}
              onClick={() => setFilter(m)}
            />
          ))}
        </div>
      </div>
    </section>
  )
}

function FilterChip({
  label,
  active,
  onClick,
}: {
  label: string
  active: boolean
  onClick: () => void
}) {
  return (
    <button
      type="button"
      onClick={onClick}
      className={`link-rule${active ? ' is-active' : ''}`}
      style={{
        background: 'transparent',
        border: 0,
        padding: 0,
        fontFamily: 'var(--font-mono)',
        fontSize: 12,
        letterSpacing: 'var(--tracking-tight)',
        textTransform: 'uppercase',
        color: active ? 'var(--accent)' : 'var(--fg)',
        cursor: 'pointer',
      }}
    >
      {label}
    </button>
  )
}

// ─── § 02 · Index list with hover floating preview ──────────────────────────

interface PreviewState {
  workId: string
  src: string
  fig: string
  client: string
  mediaType: string
  year: number
}

function IndexListSection({
  works,
}: {
  works: (Work & { _fig: string; _index: number })[]
}) {
  const ulRef = useRef<HTMLUListElement>(null)
  const previewRef = useRef<HTMLDivElement>(null)
  const [preview, setPreview] = useState<PreviewState | null>(null)
  const [supportsHover, setSupportsHover] = useState(false)

  // Smooth-follow refs (avoid React state on every mousemove)
  const target = useRef({ x: 0, y: 0 })
  const current = useRef({ x: 0, y: 0 })
  const rafId = useRef<number>(0)

  useEffect(() => {
    if (typeof window === 'undefined') return
    setSupportsHover(window.matchMedia('(hover: hover) and (pointer: fine)').matches)
  }, [])

  useEffect(() => {
    if (!supportsHover) return

    const onMove = (e: MouseEvent) => {
      target.current.x = e.clientX
      target.current.y = e.clientY
    }
    window.addEventListener('mousemove', onMove)

    const lerp = 0.18
    const loop = () => {
      current.current.x += (target.current.x - current.current.x) * lerp
      current.current.y += (target.current.y - current.current.y) * lerp
      const el = previewRef.current
      if (el) {
        // Offset the preview so it sits below-right of the cursor caption.
        el.style.transform = `translate3d(${current.current.x + 24}px, ${current.current.y + 28}px, 0)`
      }
      rafId.current = requestAnimationFrame(loop)
    }
    rafId.current = requestAnimationFrame(loop)
    return () => {
      window.removeEventListener('mousemove', onMove)
      cancelAnimationFrame(rafId.current)
    }
  }, [supportsHover])

  // Snap initial position so preview doesn't slide in from (0,0)
  const onEnterRow = (w: PreviewState, ev: React.MouseEvent) => {
    if (!supportsHover) return
    current.current.x = ev.clientX
    current.current.y = ev.clientY
    target.current.x = ev.clientX
    target.current.y = ev.clientY
    setPreview(w)
  }

  const onLeaveList = () => {
    if (!supportsHover) return
    setPreview(null)
  }

  return (
    <section
      data-page="02"
      data-page-label="Index"
      style={{ paddingBlock: 'var(--gap-y) 0', borderTop: 'var(--rule)' }}
    >
      <div className="container">
        <ul
          ref={ulRef}
          className={`toc${preview ? ' is-dimming' : ''}`}
          onMouseLeave={onLeaveList}
          style={{ listStyle: 'none', margin: 0, padding: 0 }}
        >
          {works.map((w) => {
            const isActive = preview?.workId === w.id
            return (
              <li
                key={w.id}
                className={`toc__row${isActive ? ' is-active' : ''}`}
                style={{ borderBottom: 'var(--rule)' }}
              >
                <Link
                  href={`/works/${w.slug}`}
                  data-cursor="work"
                  onMouseEnter={(e) =>
                    onEnterRow(
                      {
                        workId: w.id,
                        src: w.thumbnail,
                        fig: w._fig,
                        client: w.client,
                        mediaType: w.mediaType,
                        year: w.year,
                      },
                      e
                    )
                  }
                  style={{
                    display: 'grid',
                    gridTemplateColumns: '88px 1fr auto auto auto',
                    alignItems: 'baseline',
                    gap: 'clamp(16px, 3vw, 40px)',
                    paddingBlock: 28,
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
                    {w._fig}
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

                  {w.isGovernment && (
                    <span
                      className="t-mono show-desktop"
                      style={{
                        fontSize: 10,
                        letterSpacing: 'var(--tracking-tight)',
                        textTransform: 'uppercase',
                        color: 'var(--accent)',
                      }}
                    >
                      § Gov
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

                  <span aria-hidden className="t-mono" style={{ fontSize: 14 }}>
                    →
                  </span>
                </Link>
              </li>
            )
          })}
        </ul>

        {works.length === 0 && (
          <p
            className="t-mono"
            style={{
              padding: '64px 0',
              textAlign: 'center',
              color: 'var(--muted)',
              fontSize: 13,
              letterSpacing: 'var(--tracking-tight)',
              textTransform: 'uppercase',
            }}
          >
            ⏤ No entries in this filter.
          </p>
        )}
      </div>

      {/* Floating preview — fixed-position, follows cursor with lerp */}
      {supportsHover && (
        <div
          ref={previewRef}
          aria-hidden
          style={{
            position: 'fixed',
            top: 0,
            left: 0,
            zIndex: 40,
            pointerEvents: 'none',
            opacity: preview ? 1 : 0,
            transition: 'opacity var(--dur-fast) var(--ease-edit)',
            willChange: 'transform',
          }}
        >
          {preview && (
            <div style={{ width: 320 }}>
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
                  src={preview.src}
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
                  fontSize: 11,
                  letterSpacing: 'var(--tracking-tight)',
                  textTransform: 'uppercase',
                  color: 'var(--fg)',
                }}
              >
                {preview.fig} — {preview.client} / {preview.mediaType} · {preview.year}
              </p>
            </div>
          )}
        </div>
      )}
    </section>
  )
}
