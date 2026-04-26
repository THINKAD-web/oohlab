'use client'

import Link from 'next/link'
import capabilitiesData from '@/data/capabilities.json'
import worksData from '@/data/works.json'
import { useInView } from '@/lib/hooks'
import type { Work } from '@/lib/types'

interface CapabilityItem {
  number: string
  code: string
  title: string
  subtitle: string
  description: string
  examples: string[]
  relatedWorks: string[]
}

const DATA = capabilitiesData as {
  headline: string
  intro: string
  introParagraphs: string[]
  items: CapabilityItem[]
}

const WORKS_BY_SLUG = new Map(
  (worksData.works as unknown as Work[]).map((w) => [w.slug, w])
)

// ─── § 01 · Hero ────────────────────────────────────────────────────────────

function HeroSection() {
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
          ⏤ Services · Capabilities
        </p>

        <h1 className="t-display" style={{ margin: '16px 0 0', maxWidth: '78%' }}>
          Capabilities<span className="t-italic">.</span>
        </h1>

        <p
          className="t-display t-italic"
          style={{
            margin: '8px 0 0',
            color: 'var(--muted)',
            fontSize: 'clamp(28px, 4vw, 48px)',
            lineHeight: 1.05,
          }}
        >
          {DATA.intro}
        </p>
      </div>
    </section>
  )
}

// ─── § 02 · Intro paragraphs ────────────────────────────────────────────────

function IntroSection() {
  const { ref, inView } = useInView<HTMLDivElement>(0.15)
  return (
    <section
      data-page="02"
      data-page-label="Overview"
      style={{ paddingBlock: 'var(--gap-y-sm) var(--gap-y)', borderTop: 'var(--rule)' }}
    >
      <div
        ref={ref}
        className={`container-text stagger${inView ? ' is-visible' : ''}`}
      >
        <p className="t-caption" style={{ margin: 0 }}>
          ¶ Overview
        </p>

        <hr className="divider divider-draw" style={{ marginTop: 16 }} />

        <div
          style={{
            marginTop: 'var(--gap-y-sm)',
            display: 'flex',
            flexDirection: 'column',
            gap: 16,
          }}
        >
          {DATA.introParagraphs.map((p, i) => (
            <p
              key={i}
              style={{
                margin: 0,
                fontSize: 'var(--type-body)',
                lineHeight: 1.8,
                color: i === 0 ? 'var(--fg)' : 'var(--muted)',
              }}
            >
              {p}
            </p>
          ))}
        </div>
      </div>
    </section>
  )
}

// ─── § 03 · Grid (6 capability cards) ───────────────────────────────────────

function GridSection() {
  const { ref, inView } = useInView<HTMLDivElement>(0.05)
  return (
    <section
      data-page="03"
      data-page-label="Index"
      style={{ paddingBlock: 'var(--gap-y) 0', borderTop: 'var(--rule)' }}
    >
      <div
        ref={ref}
        className={`container stagger${inView ? ' is-visible' : ''}`}
      >
        <p className="t-caption" style={{ margin: 0 }}>
          § Index of Capabilities
        </p>

        <h2 className="t-h2" style={{ margin: '16px 0 0' }}>
          Six <span className="t-italic">categories.</span>
        </h2>

        <hr className="divider divider-draw" style={{ marginTop: 'var(--gap-y-sm)' }} />

        {/* Card grid — hairline borders define cells, no card chrome */}
        <ul
          style={{
            listStyle: 'none',
            margin: 0,
            padding: 0,
            display: 'grid',
            gridTemplateColumns: 'repeat(auto-fit, minmax(360px, 1fr))',
            borderLeft: 'var(--rule)',
          }}
        >
          {DATA.items.map((item) => (
            <Card key={item.code} item={item} />
          ))}
        </ul>
      </div>
    </section>
  )
}

function Card({ item }: { item: CapabilityItem }) {
  const related = item.relatedWorks
    .map((slug) => WORKS_BY_SLUG.get(slug))
    .filter((w): w is Work => Boolean(w))

  return (
    <li
      style={{
        borderRight: 'var(--rule)',
        borderBottom: 'var(--rule)',
        padding: 'clamp(28px, 3vw, 40px)',
        display: 'flex',
        flexDirection: 'column',
        gap: 16,
        background: 'var(--bg)',
      }}
    >
      <div
        style={{
          display: 'flex',
          justifyContent: 'space-between',
          alignItems: 'baseline',
          gap: 16,
        }}
      >
        <span
          style={{
            fontFamily: 'var(--font-serif)',
            fontStyle: 'italic',
            fontWeight: 300,
            fontSize: 'clamp(56px, 7vw, 96px)',
            lineHeight: 0.92,
            letterSpacing: '-0.04em',
            fontVariationSettings: "'opsz' 144, 'SOFT' 50, 'WONK' 1",
            color: 'var(--muted)',
            fontVariantNumeric: 'tabular-nums',
          }}
        >
          {item.number}
        </span>
        <span
          className="t-mono"
          style={{
            fontSize: 11,
            letterSpacing: 'var(--tracking-label)',
            textTransform: 'uppercase',
            color: 'var(--accent)',
            whiteSpace: 'nowrap',
          }}
        >
          {item.code}
        </span>
      </div>

      <div>
        <h3
          style={{
            margin: 0,
            fontFamily: 'var(--font-serif)',
            fontWeight: 400,
            fontSize: 'clamp(22px, 2.4vw, 30px)',
            letterSpacing: '-0.01em',
            lineHeight: 1.2,
            fontVariationSettings: "'opsz' 72, 'SOFT' 50",
            color: 'var(--fg)',
          }}
        >
          {item.title}
        </h3>
        <p
          className="t-mono"
          style={{
            margin: '4px 0 0',
            fontSize: 11,
            letterSpacing: 'var(--tracking-tight)',
            textTransform: 'uppercase',
            color: 'var(--muted)',
          }}
        >
          {item.subtitle}
        </p>
      </div>

      <p
        style={{
          margin: 0,
          fontSize: 'var(--type-small)',
          lineHeight: 1.7,
          color: 'var(--fg)',
        }}
      >
        {item.description}
      </p>

      {item.examples.length > 0 && (
        <div>
          <p
            className="t-caption"
            style={{ margin: '0 0 6px' }}
          >
            ⏤ Examples
          </p>
          <p
            style={{
              margin: 0,
              fontSize: 'var(--type-small)',
              lineHeight: 1.6,
              color: 'var(--muted)',
            }}
          >
            {item.examples.join(' · ')}
          </p>
        </div>
      )}

      {related.length > 0 && (
        <div style={{ marginTop: 'auto', paddingTop: 12 }}>
          <p
            className="t-caption"
            style={{ margin: '0 0 6px' }}
          >
            § Related works
          </p>
          <ul
            style={{
              listStyle: 'none',
              margin: 0,
              padding: 0,
              display: 'flex',
              flexDirection: 'column',
              gap: 4,
            }}
          >
            {related.map((w) => (
              <li key={w.slug}>
                <Link
                  href={`/works/${w.slug}`}
                  className="link-rule"
                  style={{
                    fontFamily: 'var(--font-mono)',
                    fontSize: 12,
                    letterSpacing: 'var(--tracking-tight)',
                    color: 'var(--fg)',
                  }}
                >
                  → {w.client}
                </Link>
              </li>
            ))}
          </ul>
        </div>
      )}
    </li>
  )
}

// ─── § Footer · Inquiry ────────────────────────────────────────────────────

function InquirySection() {
  const { ref, inView } = useInView<HTMLDivElement>(0.2)
  return (
    <section
      data-page-label="Inquiry"
      style={{
        borderTop: 'var(--rule)',
        paddingBlock: 'var(--gap-y)',
      }}
    >
      <div
        ref={ref}
        className={`container stagger${inView ? ' is-visible' : ''}`}
      >
        <p className="t-caption" style={{ margin: 0 }}>
          § Inquiry
        </p>
        <h2 className="t-h2" style={{ margin: '12px 0 0', maxWidth: 720 }}>
          Custom <span className="t-italic">media plan.</span>
        </h2>
        <p
          style={{
            margin: '20px 0 0',
            maxWidth: 540,
            color: 'var(--muted)',
            fontSize: 'var(--type-body)',
            lineHeight: 1.7,
          }}
        >
          예산·집행 기간·목표 노출량을 알려주시면 6개 카테고리 중 적합한 조합으로 견적을 보내드립니다.
        </p>
        <div style={{ marginTop: 'var(--gap-y-sm)' }}>
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
            ✦ Request a media plan → /contact
          </Link>
        </div>
      </div>
    </section>
  )
}

// ─── Composition ────────────────────────────────────────────────────────────

export function EditorialCapabilities() {
  return (
    <>
      <HeroSection />
      <IntroSection />
      <GridSection />
      <InquirySection />
    </>
  )
}
