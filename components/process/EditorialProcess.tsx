'use client'

import Link from 'next/link'
import processData from '@/data/process.json'
import masthead from '@/data/masthead.json'
import { useInView } from '@/lib/hooks'

interface Chapter {
  number: string
  label: string
  /** Italic Fraunces pull-quote shown above the chapter body (24–28px). */
  lead: string
  paragraphs: string[]
}

interface FooterBlock {
  label: string
  text: string
  linkText: string
  href: string
}

const DATA = processData as {
  headline: string
  subheadline: string
  intro: string[]
  chapters: Chapter[]
  footer: FooterBlock
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
          className="t-display t-italic"
          style={{
            margin: '8px 0 0',
            color: 'var(--muted)',
            fontSize: 'clamp(28px, 4vw, 48px)',
            lineHeight: 1.05,
          }}
        >
          {DATA.subheadline}
        </p>

        <div
          style={{
            marginTop: 'var(--gap-y-sm)',
            display: 'flex',
            flexDirection: 'column',
            gap: 16,
            maxWidth: 'var(--max-w-text)',
          }}
        >
          {DATA.intro.map((p, i) => (
            <p
              key={i}
              style={{
                margin: 0,
                fontSize: i < 2 ? 'clamp(17px, 1.7vw, 20px)' : 'var(--type-body)',
                lineHeight: i < 2 ? 1.5 : 1.8,
                color: i === 0 ? 'var(--fg)' : 'var(--muted)',
                fontWeight: i < 2 ? 500 : 400,
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

            {/* Pull-quote lead — italic Fraunces 24-28px */}
            <p
              style={{
                margin: '16px 0 0',
                maxWidth: 'var(--max-w-text)',
                fontFamily: 'var(--font-serif)',
                fontStyle: 'italic',
                fontWeight: 400,
                fontSize: 'clamp(22px, 2.4vw, 28px)',
                lineHeight: 1.4,
                letterSpacing: '-0.01em',
                fontVariationSettings: "'opsz' 72, 'SOFT' 50, 'WONK' 1",
                color: 'var(--fg)',
              }}
            >
              {chapter.lead}
            </p>

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

function InquirySection({ footer }: { footer: FooterBlock }) {
  const { ref, inView } = useInView<HTMLDivElement>(0.2)
  return (
    <section
      data-page-label={footer.label}
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
          § {footer.label}
        </p>
        <h2 className="t-h2" style={{ margin: '12px 0 0', maxWidth: 720 }}>
          {footer.text}
        </h2>
        <div style={{ marginTop: 'var(--gap-y-sm)' }}>
          <Link
            href={footer.href}
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
            ✦ {footer.linkText} → {footer.href}
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
      <InquirySection footer={DATA.footer} />
    </>
  )
}
