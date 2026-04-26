import Link from 'next/link'
import notesData from '@/data/notes.json'

export type ContentBlock =
  | { type: 'lead'; text: string }
  | { type: 'h2'; text: string }
  | { type: 'paragraph'; text: string }
  | { type: 'quote'; text: string }

export interface Note {
  slug: string
  no: string
  title: string
  subtitle: string
  category: string
  date: string
  tag: string | null
  content: ContentBlock[]
}

interface Props {
  note: Note
}

export function NoteDetail({ note }: Props) {
  const all = notesData.items as unknown as Note[]
  const idx = all.findIndex((n) => n.slug === note.slug)
  const prev = idx > 0 ? all[idx - 1] : null
  const next = idx < all.length - 1 ? all[idx + 1] : null

  return (
    <article style={{ paddingBlock: 'var(--gap-y-sm) 0' }}>
      {/* ── Header ──────────────────────────────────────── */}
      <section data-page="01" data-page-label="Cover" style={{ paddingBlock: 'clamp(48px, 8vw, 96px) var(--gap-y-sm)' }}>
        <div className="container-text">
          {/* Top meta row */}
          <div
            style={{
              display: 'flex',
              justifyContent: 'space-between',
              alignItems: 'baseline',
              gap: 16,
              flexWrap: 'wrap',
              marginBottom: 'var(--gap-y-sm)',
            }}
          >
            <p className="t-caption" style={{ margin: 0 }}>
              ⏤ Note {note.no} · {note.category} · {note.date}
            </p>
            <Link
              href="/notes"
              className="link-rule"
              style={{
                fontFamily: 'var(--font-mono)',
                fontSize: 12,
                letterSpacing: 'var(--tracking-tight)',
                textTransform: 'uppercase',
                color: 'var(--fg)',
              }}
            >
              ← Index of Notes
            </Link>
          </div>

          {/* Title */}
          <h1
            style={{
              margin: 0,
              fontFamily: 'var(--font-serif)',
              fontWeight: 400,
              fontSize: 'clamp(36px, 5vw, 56px)',
              letterSpacing: '-0.02em',
              lineHeight: 1.12,
              fontVariationSettings: "'opsz' 96, 'SOFT' 50",
              color: 'var(--fg)',
            }}
          >
            {note.title}
          </h1>

          {/* Subtitle */}
          <p
            style={{
              margin: '16px 0 0',
              fontFamily: 'var(--font-serif)',
              fontStyle: 'italic',
              fontWeight: 300,
              fontSize: 'clamp(22px, 2.4vw, 28px)',
              lineHeight: 1.3,
              letterSpacing: '-0.01em',
              fontVariationSettings: "'opsz' 72, 'SOFT' 50, 'WONK' 1",
              color: 'var(--muted)',
            }}
          >
            {note.subtitle}
          </p>

          {/* Tag chip — only when present */}
          {note.tag && (
            <p style={{ margin: '20px 0 0' }}>
              <span
                className="t-mono"
                style={{
                  fontSize: 10,
                  letterSpacing: 'var(--tracking-label)',
                  textTransform: 'uppercase',
                  color: 'var(--accent)',
                  border: '1px solid var(--accent)',
                  padding: '4px 8px',
                }}
              >
                ★ {note.tag}
              </span>
            </p>
          )}
        </div>
      </section>

      <hr className="divider" />

      {/* ── Body ─────────────────────────────────────────── */}
      <section data-page="02" data-page-label="Body" style={{ paddingBlock: 'var(--gap-y)' }}>
        <div className="container-text">
          {note.content.map((block, i) => (
            <ContentRenderer key={i} block={block} />
          ))}
        </div>
      </section>

      <hr className="divider" />

      {/* ── Navigation ───────────────────────────────────── */}
      <section data-page-label="Navigation" style={{ paddingBlock: 'var(--gap-y)' }}>
        <div className="container">
          <div
            style={{
              display: 'grid',
              gridTemplateColumns: 'repeat(auto-fit, minmax(200px, 1fr))',
              gap: 'var(--gap-x)',
              alignItems: 'start',
            }}
          >
            <NeighborLink note={prev} direction="prev" />
            <div style={{ textAlign: 'center' }}>
              <Link
                href="/notes"
                className="link-rule"
                style={{
                  fontFamily: 'var(--font-mono)',
                  fontSize: 12,
                  letterSpacing: 'var(--tracking-tight)',
                  textTransform: 'uppercase',
                  color: 'var(--fg)',
                }}
              >
                Index of Notes →
              </Link>
            </div>
            <NeighborLink note={next} direction="next" />
          </div>
        </div>
      </section>
    </article>
  )
}

// ─── Content block renderer ─────────────────────────────────────────────────

function ContentRenderer({ block }: { block: ContentBlock }) {
  switch (block.type) {
    case 'lead':
      return (
        <p
          style={{
            margin: '0 0 var(--gap-y-sm)',
            fontSize: 'clamp(18px, 1.8vw, 20px)',
            lineHeight: 1.7,
            color: 'var(--fg)',
            fontWeight: 500,
          }}
        >
          {block.text}
        </p>
      )

    case 'h2':
      return (
        <h2
          style={{
            margin: '40px 0 16px',
            fontFamily: 'var(--font-serif)',
            fontWeight: 400,
            fontSize: 'clamp(22px, 2.2vw, 28px)',
            fontStyle: 'italic',
            letterSpacing: '-0.01em',
            lineHeight: 1.3,
            fontVariationSettings: "'opsz' 72, 'SOFT' 50, 'WONK' 1",
            color: 'var(--fg)',
          }}
        >
          {block.text}
        </h2>
      )

    case 'paragraph':
      return (
        <p
          style={{
            margin: '0 0 16px',
            fontSize: 17,
            lineHeight: 1.8,
            color: 'var(--fg)',
          }}
        >
          {block.text}
        </p>
      )

    case 'quote':
      return (
        <blockquote
          style={{
            margin: '32px 0',
            paddingLeft: 16,
            borderLeft: '1px solid var(--fg)',
            fontFamily: 'var(--font-serif)',
            fontStyle: 'italic',
            fontWeight: 400,
            fontSize: 'clamp(20px, 2.2vw, 24px)',
            lineHeight: 1.5,
            letterSpacing: '-0.01em',
            fontVariationSettings: "'opsz' 72, 'SOFT' 50, 'WONK' 1",
            color: 'var(--fg)',
          }}
        >
          {block.text}
        </blockquote>
      )
  }
}

// ─── Neighbor link (prev/next) ──────────────────────────────────────────────

function NeighborLink({
  note,
  direction,
}: {
  note: Note | null
  direction: 'prev' | 'next'
}) {
  if (!note) {
    return (
      <p
        className="t-mono"
        style={{
          margin: 0,
          fontSize: 11,
          letterSpacing: 'var(--tracking-tight)',
          textTransform: 'uppercase',
          color: 'var(--muted)',
          textAlign: direction === 'prev' ? 'left' : 'right',
        }}
      >
        ⏤ End of issue
      </p>
    )
  }
  const align = direction === 'prev' ? 'left' : 'right'
  return (
    <Link
      href={`/notes/${note.slug}`}
      style={{ display: 'block', textAlign: align }}
    >
      <span
        className="t-mono"
        style={{
          display: 'block',
          fontSize: 11,
          letterSpacing: 'var(--tracking-tight)',
          textTransform: 'uppercase',
          color: 'var(--muted)',
          marginBottom: 6,
        }}
      >
        {direction === 'prev' ? '← Previous' : 'Next →'}
      </span>
      <span
        className="link-rule"
        style={{
          fontFamily: 'var(--font-serif)',
          fontStyle: 'italic',
          fontWeight: 300,
          fontSize: 'clamp(18px, 2vw, 24px)',
          letterSpacing: '-0.01em',
          fontVariationSettings: "'opsz' 72, 'SOFT' 50, 'WONK' 1",
          color: 'var(--fg)',
        }}
      >
        {note.title}
      </span>
    </Link>
  )
}
