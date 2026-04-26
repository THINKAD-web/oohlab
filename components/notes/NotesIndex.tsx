'use client'

import Link from 'next/link'
import { useState } from 'react'
import notesData from '@/data/notes.json'
import { useInView } from '@/lib/hooks'

interface NoteIndexEntry {
  slug: string
  no: string
  title: string
  subtitle: string
  category: string
  date: string
  tag: string | null
}

const DATA = notesData as {
  headline: string
  intro: string
  items: NoteIndexEntry[]
}

// ─── Page ───────────────────────────────────────────────────────────────────

export function NotesIndex() {
  return (
    <>
      <CoverSection />
      <ListSection />
    </>
  )
}

// ─── § 01 · Cover ───────────────────────────────────────────────────────────

function CoverSection() {
  const { ref, inView } = useInView<HTMLDivElement>(0.05)
  return (
    <section
      data-page="01"
      data-page-label="Cover"
      style={{ paddingBlock: 'clamp(64px, 10vw, 120px) var(--gap-y-sm)' }}
    >
      <div
        ref={ref}
        className={`container stagger${inView ? ' is-visible' : ''}`}
      >
        <p className="t-caption" style={{ margin: 0 }}>
          ⏤ Notes
        </p>

        <h1 className="t-display" style={{ margin: '16px 0 0', maxWidth: '78%' }}>
          <span className="t-italic">Editorial.</span>
        </h1>

        <p
          style={{
            margin: '24px 0 0',
            maxWidth: 540,
            fontSize: 'var(--type-body)',
            color: 'var(--muted)',
            lineHeight: 1.7,
          }}
        >
          {DATA.intro}
        </p>
      </div>
    </section>
  )
}

// ─── § 02 · List (TOC) ──────────────────────────────────────────────────────

function ListSection() {
  const [hoveredId, setHoveredId] = useState<string | null>(null)

  return (
    <section
      data-page="02"
      data-page-label="Index"
      style={{ paddingBlock: 'var(--gap-y) 0', borderTop: 'var(--rule)' }}
    >
      <div className="container">
        <ul
          className={`toc${hoveredId ? ' is-dimming' : ''}`}
          onMouseLeave={() => setHoveredId(null)}
          style={{ listStyle: 'none', margin: 0, padding: 0 }}
        >
          {DATA.items.map((note) => (
            <Row
              key={note.slug}
              note={note}
              isActive={hoveredId === note.slug}
              onEnter={() => setHoveredId(note.slug)}
            />
          ))}
        </ul>
      </div>
    </section>
  )
}

function Row({
  note,
  isActive,
  onEnter,
}: {
  note: NoteIndexEntry
  isActive: boolean
  onEnter: () => void
}) {
  const ariaLabel = `Note ${note.no}, ${note.title}, ${note.category}, ${note.date}`
  return (
    <li
      className={`toc__row${isActive ? ' is-active' : ''}`}
      style={{ borderBottom: 'var(--rule)' }}
    >
      <Link
        href={`/notes/${note.slug}`}
        data-cursor="link"
        aria-label={ariaLabel}
        onMouseEnter={onEnter}
        style={{
          display: 'grid',
          gridTemplateColumns: 'minmax(72px, auto) 1fr auto auto auto',
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
          № {note.no}
        </span>

        <span style={{ display: 'flex', flexDirection: 'column', gap: 4 }}>
          <span
            style={{
              fontFamily: 'var(--font-serif)',
              fontStyle: 'italic',
              fontWeight: 300,
              fontSize: 'clamp(20px, 2.6vw, 30px)',
              letterSpacing: '-0.01em',
              lineHeight: 1.2,
              fontVariationSettings: "'opsz' 72, 'SOFT' 50, 'WONK' 1",
            }}
          >
            {note.title}
          </span>
          <span
            className="t-mono show-desktop"
            style={{
              fontSize: 11,
              letterSpacing: 'var(--tracking-tight)',
              textTransform: 'uppercase',
              color: 'var(--muted)',
            }}
          >
            ⏤ {note.subtitle}
          </span>
        </span>

        {/* PUBLIC tag chip — only renders when present */}
        {note.tag && (
          <span
            className="t-mono show-desktop"
            style={{
              fontSize: 10,
              letterSpacing: 'var(--tracking-label)',
              textTransform: 'uppercase',
              color: 'var(--accent)',
              border: '1px solid var(--accent)',
              padding: '4px 8px',
              whiteSpace: 'nowrap',
              alignSelf: 'center',
            }}
          >
            ★ {note.tag}
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
          {note.category} · {note.date}
        </span>

        {/* Arrow appears only on hover */}
        <span
          aria-hidden
          className="t-mono"
          style={{
            fontSize: 14,
            color: 'var(--fg)',
            opacity: isActive ? 1 : 0,
            transform: `translateX(${isActive ? 0 : -4}px)`,
            transition:
              'opacity var(--dur-fast) var(--ease-edit), transform var(--dur-fast) var(--ease-edit)',
          }}
        >
          →
        </span>
      </Link>
    </li>
  )
}
