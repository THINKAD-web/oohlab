'use client'

import { useMemo, useState } from 'react'
import worksData from '@/data/works.json'
import masthead from '@/data/masthead.json'
import type { Work } from '@/lib/types'
import { WorkTOC, type WorkTOCEntry } from './WorkTOC'

const ALL_WORKS = worksData.works as unknown as Work[]
const ALL = 'ALL' as const
type Filter = typeof ALL | string

function fig(index: number) {
  return `FIG. ${String(index + 1).padStart(2, '0')}`
}

// ─── Page ───────────────────────────────────────────────────────────────────

export function WorksIndex() {
  // Stable FIG. number per work — its position in the full ordered list,
  // never re-numbered by filter.
  const indexed = useMemo<WorkTOCEntry[]>(
    () => ALL_WORKS.map((w, i) => ({ ...w, fig: fig(i) })),
    []
  )

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

      <section
        data-page="02"
        data-page-label="Index"
        style={{ paddingBlock: 'var(--gap-y) 0', borderTop: 'var(--rule)' }}
      >
        <div className="container">
          <WorkTOC works={filtered} prefetchCount={8} />
          {filtered.length === 0 && (
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
      </section>
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
