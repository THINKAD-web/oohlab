import Image from 'next/image'
import Link from 'next/link'
import worksData from '@/data/works.json'
import masthead from '@/data/masthead.json'
import type { Work } from '@/lib/types'

interface Props {
  work: Work
}

export function WorkDetail({ work }: Props) {
  const allWorks = worksData.works as unknown as Work[]
  const index = allWorks.findIndex((w) => w.slug === work.slug)
  const fig = `FIG. ${String(index + 1).padStart(2, '0')}`
  const prev = index > 0 ? allWorks[index - 1] : null
  const next = index < allWorks.length - 1 ? allWorks[index + 1] : null

  const stats = [
    { label: 'Locations', value: work.stats.locations },
    { label: 'Duration', value: work.stats.duration },
    { label: 'Impressions', value: work.stats.impressions },
    { label: 'Result', value: work.stats.result },
  ].filter((s) => s.value && s.value.trim() !== '')

  return (
    <article style={{ paddingBlock: 'var(--gap-y-sm) 0' }}>
      {/* § 01 — Cover */}
      <section data-page="01" data-page-label="Cover" style={{ paddingBottom: 'var(--gap-y-sm)' }}>
        <div className="container">
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
              ⏤ Issue {masthead.issueNumber} · Vol. {masthead.volume} · {fig}
            </p>
            <Link
              href="/works"
              className="link-rule"
              style={{
                fontFamily: 'var(--font-mono)',
                fontSize: 12,
                letterSpacing: 'var(--tracking-tight)',
                textTransform: 'uppercase',
                color: 'var(--fg)',
              }}
            >
              ← Index of Work
            </Link>
          </div>

          {/* Title block */}
          <div style={{ maxWidth: '78%' }}>
            <h1
              className="t-display"
              style={{
                margin: 0,
                fontStyle: 'italic',
                fontVariationSettings: "'opsz' 144, 'SOFT' 50, 'WONK' 1",
              }}
            >
              {work.client}
            </h1>
            <p
              style={{
                margin: '24px 0 0',
                fontSize: 'clamp(20px, 2.4vw, 28px)',
                lineHeight: 1.3,
                color: 'var(--fg)',
                fontWeight: 400,
                letterSpacing: '-0.01em',
              }}
            >
              {work.title}
            </p>
          </div>

          {/* Tag row */}
          <div
            style={{
              marginTop: 'var(--gap-y-sm)',
              display: 'flex',
              gap: 24,
              flexWrap: 'wrap',
            }}
          >
            <Tag label={work.mediaType} />
            <Tag label={String(work.year)} />
            {work.isGovernment && <Tag label="Government" accent />}
            {work.isWomenCertProject && <Tag label="Women-cert" accent />}
          </div>
        </div>
      </section>

      <hr className="divider" />

      {/* § 02 — Hero image */}
      <section data-page="02" data-page-label="Plate" style={{ paddingBlock: 'var(--gap-y-sm)' }}>
        <div className="container">
          <div
            style={{
              position: 'relative',
              width: '100%',
              aspectRatio: '16 / 9',
              border: 'var(--rule)',
              background: 'var(--surface)',
            }}
          >
            <Image
              src={work.heroImage}
              alt={work.title}
              fill
              priority
              sizes="(min-width: 1320px) 1320px, 100vw"
              style={{ objectFit: 'cover' }}
            />
          </div>
          <p
            className="t-mono"
            style={{
              margin: '12px 0 0',
              fontSize: 11,
              letterSpacing: 'var(--tracking-tight)',
              textTransform: 'uppercase',
              color: 'var(--muted)',
            }}
          >
            ⏤ Plate {String(index + 1).padStart(2, '0')} · {work.client}
          </p>
        </div>
      </section>

      <hr className="divider" />

      {/* § 03 — Story */}
      <section data-page="03" data-page-label="Story" style={{ paddingBlock: 'var(--gap-y)' }}>
        <div className="container-text">
          <p className="t-caption" style={{ margin: 0 }}>
            ¶ Story
          </p>
          <p
            style={{
              margin: '20px 0 0',
              fontSize: 'clamp(17px, 1.6vw, 19px)',
              lineHeight: 1.8,
              color: 'var(--fg)',
            }}
          >
            {work.story}
          </p>
        </div>
      </section>

      {stats.length > 0 && (
        <>
          <hr className="divider" />

          {/* § 04 — Stats */}
          <section data-page="04" data-page-label="Stats" style={{ paddingBlock: 'var(--gap-y)' }}>
            <div className="container-text">
              <p className="t-caption" style={{ margin: '0 0 24px' }}>
                § Specifications
              </p>
              <dl style={{ margin: 0 }}>
                {stats.map((s) => (
                  <div
                    key={s.label}
                    style={{
                      display: 'grid',
                      gridTemplateColumns: '160px 1fr',
                      gap: 'var(--gap-x)',
                      paddingBlock: 16,
                      borderBottom: 'var(--rule)',
                    }}
                  >
                    <dt
                      className="t-mono"
                      style={{
                        margin: 0,
                        fontSize: 11,
                        letterSpacing: 'var(--tracking-tight)',
                        textTransform: 'uppercase',
                        color: 'var(--muted)',
                      }}
                    >
                      {s.label}
                    </dt>
                    <dd style={{ margin: 0, fontSize: 'var(--type-body)', lineHeight: 1.6 }}>
                      {s.value}
                    </dd>
                  </div>
                ))}
              </dl>
            </div>
          </section>
        </>
      )}

      {work.tags.length > 0 && (
        <>
          <hr className="divider" />

          {/* § 05 — Filed under */}
          <section data-page="05" data-page-label="Filed Under" style={{ paddingBlock: 'var(--gap-y)' }}>
            <div className="container-text">
              <p className="t-caption" style={{ margin: '0 0 16px' }}>
                ⏤ Filed under
              </p>
              <ul
                style={{
                  listStyle: 'none',
                  margin: 0,
                  padding: 0,
                  display: 'flex',
                  flexWrap: 'wrap',
                  gap: 8,
                }}
              >
                {work.tags.map((t) => (
                  <li
                    key={t}
                    className="t-mono"
                    style={{
                      fontSize: 11,
                      letterSpacing: 'var(--tracking-tight)',
                      textTransform: 'uppercase',
                      color: 'var(--muted)',
                      paddingInline: 12,
                      paddingBlock: 6,
                      border: 'var(--rule)',
                    }}
                  >
                    #{t}
                  </li>
                ))}
              </ul>
            </div>
          </section>
        </>
      )}

      <hr className="divider" />

      {/* § 06 — Footer of article */}
      <section data-page="06" data-page-label="Next" style={{ paddingBlock: 'var(--gap-y)' }}>
        <div className="container">
          <div
            style={{
              display: 'grid',
              gridTemplateColumns: 'repeat(auto-fit, minmax(240px, 1fr))',
              gap: 'var(--gap-x)',
              alignItems: 'start',
            }}
          >
            <NeighborLink work={prev} direction="prev" />
            <div style={{ textAlign: 'center' }}>
              <Link
                href="/contact"
                className="link-rule"
                style={{
                  fontFamily: 'var(--font-mono)',
                  fontSize: 13,
                  letterSpacing: 'var(--tracking-tight)',
                  textTransform: 'uppercase',
                  color: 'var(--accent)',
                  fontWeight: 500,
                }}
              >
                ✦ Inquire about this work →
              </Link>
            </div>
            <NeighborLink work={next} direction="next" />
          </div>
        </div>
      </section>
    </article>
  )
}

function Tag({ label, accent }: { label: string; accent?: boolean }) {
  return (
    <span
      className="t-mono"
      style={{
        fontSize: 11,
        letterSpacing: 'var(--tracking-tight)',
        textTransform: 'uppercase',
        color: accent ? 'var(--accent)' : 'var(--muted)',
      }}
    >
      {accent && '§ '}{label}
    </span>
  )
}

function NeighborLink({
  work,
  direction,
}: {
  work: Work | null
  direction: 'prev' | 'next'
}) {
  if (!work) {
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
      href={`/works/${work.slug}`}
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
          fontSize: 'clamp(20px, 2.4vw, 28px)',
          letterSpacing: '-0.01em',
          fontVariationSettings: "'opsz' 72, 'SOFT' 50, 'WONK' 1",
          color: 'var(--fg)',
        }}
      >
        {work.client}
      </span>
    </Link>
  )
}
