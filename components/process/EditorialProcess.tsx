'use client'

import Link from 'next/link'
import processData from '@/data/process.json'
import masthead from '@/data/masthead.json'
import { useInView } from '@/lib/hooks'

interface Chapter {
  number: string
  label: string
  title: string
  paragraphs: string[]
}

const DATA = processData as {
  headline: string
  intro: string
  chapters: Chapter[]
}

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
          ⏤ Chapter Five · Issue {masthead.issueNumber}
        </p>

        <h1 className="t-display" style={{ margin: '16px 0 0', maxWidth: '78%' }}>
          How <span className="t-italic">We Work.</span>
        </h1>

        <p
          style={{
            margin: '32px 0 0',
            maxWidth: 600,
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

// ─── § 02..06 · Chapters ────────────────────────────────────────────────────

function ChapterSection({ chapter, pageNo }: { chapter: Chapter; pageNo: string }) {
  const { ref, inView } = useInView<HTMLDivElement>(0.1)
  return (
    <section
      data-page={pageNo}
      data-page-label={chapter.label}
      style={{ borderTop: 'var(--rule)', paddingBlock: 'var(--gap-y)' }}
    >
      <div
        ref={ref}
        className={`container stagger${inView ? ' is-visible' : ''}`}
      >
        <div
          style={{
            display: 'grid',
            gridTemplateColumns: 'minmax(140px, 30%) 1fr',
            gap: 'clamp(24px, 5vw, 80px)',
            alignItems: 'start',
          }}
        >
          {/* Sticky chapter number rail */}
          <div
            style={{
              position: 'sticky',
              top: 'calc(var(--nav-h) + 24px)',
              alignSelf: 'start',
            }}
          >
            <span
              style={{
                display: 'block',
                fontFamily: 'var(--font-serif)',
                fontStyle: 'italic',
                fontWeight: 300,
                fontSize: 'clamp(80px, 12vw, 160px)',
                lineHeight: 0.9,
                letterSpacing: '-0.04em',
                fontVariationSettings: "'opsz' 144, 'SOFT' 50, 'WONK' 1",
                color: 'var(--muted)',
                fontVariantNumeric: 'tabular-nums',
              }}
            >
              {chapter.number}
            </span>
          </div>

          {/* Chapter body */}
          <div>
            <p className="t-caption" style={{ margin: 0 }}>
              ⏤ {chapter.label}
            </p>
            <h2
              className="t-h2"
              style={{ margin: '12px 0 0' }}
            >
              {chapter.title}
            </h2>
            <div
              style={{
                marginTop: 'var(--gap-y-sm)',
                display: 'flex',
                flexDirection: 'column',
                gap: 16,
                maxWidth: 'var(--max-w-text)',
              }}
            >
              {chapter.paragraphs.map((p, i) => (
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
        </div>
      </div>
    </section>
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
          Bring your <span className="t-italic">brief.</span>
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
          5단계 중 어디서든 시작할 수 있습니다. 이미 매체 후보가 정해져 있어도 좋습니다.
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
            ✦ Next Issue → /contact
          </Link>
        </div>
      </div>
    </section>
  )
}

// ─── Composition ────────────────────────────────────────────────────────────

export function EditorialProcess() {
  return (
    <>
      <HeroSection />
      {DATA.chapters.map((chapter, i) => (
        <ChapterSection
          key={chapter.number}
          chapter={chapter}
          pageNo={String(i + 2).padStart(2, '0')}
        />
      ))}
      <InquirySection />
    </>
  )
}
