'use client'

import aboutData from '@/data/about.json'
import interviewData from '@/data/interview.json'
import masthead from '@/data/masthead.json'
import { useCountUp, useInView } from '@/lib/hooks'
import type { AboutData } from '@/lib/types'

const DATA = aboutData as unknown as AboutData

interface InterviewQA {
  id: string
  question: string
  /** Answer body — paragraphs separated by `\n\n`. Inline `<em>` allowed. */
  answer: string
}

const INTERVIEW = interviewData as {
  subtitle: string
  intro: string
  qa: InterviewQA[]
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
          ⏤ About OOH-LAB · Volume {masthead.volume}
        </p>

        <h1 className="t-display" style={{ margin: '16px 0 0', maxWidth: '78%' }}>
          Vol. {masthead.volume} / {masthead.year}
        </h1>

        <p
          className="t-display t-italic"
          style={{
            margin: '8px 0 0',
            color: 'var(--muted)',
            fontSize: 'clamp(32px, 4.5vw, 56px)',
            lineHeight: 1.05,
          }}
        >
          Seoul, Korea.
        </p>

        <p
          style={{
            margin: '32px 0 0',
            maxWidth: 540,
            fontSize: 'var(--type-body)',
            color: 'var(--muted)',
            lineHeight: 1.7,
          }}
        >
          옥외광고 전문 대행사. 2010년 서울에서 시작.
          기업 캠페인부터 지자체·공공기관 입찰까지.
        </p>
      </div>
    </section>
  )
}

// ─── § 02 · Stats ───────────────────────────────────────────────────────────

function StatsSection() {
  const { ref, inView } = useInView<HTMLDivElement>(0.15)
  return (
    <section
      data-page="02"
      data-page-label="Stats"
      style={{ paddingBlock: 'var(--gap-y)', borderTop: 'var(--rule)' }}
    >
      <div
        ref={ref}
        className={`container stagger${inView ? ' is-visible' : ''}`}
      >
        <p className="t-caption" style={{ margin: 0 }}>
          § In numbers
        </p>

        <hr className="divider divider-draw" style={{ marginTop: 16 }} />

        <div
          style={{
            marginTop: 'var(--gap-y-sm)',
            display: 'grid',
            gridTemplateColumns: 'repeat(auto-fit, minmax(200px, 1fr))',
            gap: 'var(--gap-x)',
            rowGap: 'var(--gap-y-sm)',
          }}
        >
          {DATA.stats.map((s) => (
            <Stat
              key={s.label}
              label={s.label}
              value={s.value}
              unit={s.unit}
              prefix={s.prefix}
            />
          ))}
        </div>
      </div>
    </section>
  )
}

function Stat({
  label,
  value,
  unit,
  prefix,
}: {
  label: string
  value: number
  unit: string
  prefix?: string
}) {
  const { ref, inView } = useInView<HTMLDivElement>()
  const count = useCountUp(value, inView, 1500)
  const display = count.toLocaleString('en-US')
  return (
    <div ref={ref} style={{ display: 'flex', flexDirection: 'column', gap: 8 }}>
      {prefix && (
        <span
          className="t-mono"
          style={{
            fontSize: 11,
            letterSpacing: 'var(--tracking-tight)',
            textTransform: 'uppercase',
            color: 'var(--muted)',
          }}
        >
          {prefix}
        </span>
      )}
      <span
        style={{
          fontFamily: 'var(--font-serif)',
          fontWeight: 300,
          fontSize: 'clamp(48px, 6vw, 80px)',
          lineHeight: 1,
          letterSpacing: '-0.03em',
          color: 'var(--fg)',
          fontVariantNumeric: 'tabular-nums',
        }}
      >
        {display}
        <span style={{ color: 'var(--muted)', fontSize: '0.45em', marginLeft: 4 }}>
          {unit}
        </span>
      </span>
      <span
        className="t-mono"
        style={{
          fontSize: 11,
          letterSpacing: 'var(--tracking-tight)',
          textTransform: 'uppercase',
          color: 'var(--muted)',
        }}
      >
        {label}
      </span>
    </div>
  )
}

// ─── § 05 · Certifications & Standing ───────────────────────────────────────

function CertificationsSection() {
  const { ref, inView } = useInView<HTMLDivElement>(0.15)
  const cert = DATA.womenCertSection
  return (
    <section
      data-page="05"
      data-page-label="Standing"
      style={{
        paddingBlock: 'var(--gap-y)',
        background: 'var(--surface)',
        borderTop: 'var(--rule)',
        borderBottom: 'var(--rule)',
      }}
    >
      <div
        ref={ref}
        className={`container stagger${inView ? ' is-visible' : ''}`}
      >
        <p className="t-caption" style={{ margin: 0 }}>
          ⏤ Certifications &amp; Standing
        </p>

        <h2
          className="t-h2"
          style={{ margin: '16px 0 0', maxWidth: 720 }}
        >
          Women-owned. <span className="t-italic">Government-eligible.</span>
        </h2>

        <p
          style={{
            margin: '20px 0 0',
            maxWidth: 540,
            fontSize: 'var(--type-body)',
            color: 'var(--muted)',
            lineHeight: 1.7,
          }}
        >
          {cert.subline}
        </p>

        <hr className="divider divider-draw" style={{ marginTop: 'var(--gap-y-sm)' }} />

        <dl
          style={{
            margin: 0,
            display: 'grid',
            gridTemplateColumns: 'repeat(auto-fit, minmax(240px, 1fr))',
            gap: 'var(--gap-x)',
            rowGap: 'var(--gap-y-sm)',
            paddingTop: 'var(--gap-y-sm)',
          }}
        >
          {cert.benefits.map((b, i) => (
            <div key={b.title} style={{ display: 'flex', flexDirection: 'column', gap: 8 }}>
              <span
                className="t-mono"
                style={{
                  fontSize: 11,
                  letterSpacing: 'var(--tracking-tight)',
                  textTransform: 'uppercase',
                  color: 'var(--muted)',
                }}
              >
                № {String(i + 1).padStart(2, '0')}
              </span>
              <dt
                className="t-h3"
                style={{ margin: 0 }}
              >
                {b.title}
              </dt>
              <dd
                style={{
                  margin: 0,
                  fontSize: 'var(--type-small)',
                  lineHeight: 1.7,
                  color: 'var(--muted)',
                }}
              >
                {b.desc}
              </dd>
            </div>
          ))}
        </dl>
      </div>
    </section>
  )
}

// ─── § 03 · Chronology ──────────────────────────────────────────────────────

function ChronologySection() {
  const { ref, inView } = useInView<HTMLDivElement>(0.05)
  return (
    <section
      data-page="03"
      data-page-label="Chronology"
      style={{ paddingBlock: 'var(--gap-y)' }}
    >
      <div
        ref={ref}
        className={`container stagger${inView ? ' is-visible' : ''}`}
      >
        <p className="t-caption" style={{ margin: 0 }}>
          ⏤ Chronology
        </p>

        <h2 className="t-h1" style={{ margin: '16px 0 0' }}>
          Fifteen <span className="t-italic">years.</span>
        </h2>

        <hr className="divider divider-draw" style={{ marginTop: 'var(--gap-y-sm)' }} />

        <ol style={{ listStyle: 'none', margin: 0, padding: 0 }}>
          {DATA.timeline.map((item, i) => (
            <ChronologyEntry
              key={item.year}
              year={item.year}
              event={item.event}
              index={i}
              total={DATA.timeline.length}
            />
          ))}
        </ol>
      </div>
    </section>
  )
}

function ChronologyEntry({
  year,
  event,
  index,
  total,
}: {
  year: number
  event: string
  index: number
  total: number
}) {
  return (
    <li
      style={{
        borderBottom: 'var(--rule)',
        paddingBlock: 'clamp(40px, 6vw, 72px)',
      }}
    >
      <div
        style={{
          display: 'grid',
          gridTemplateColumns: '1fr',
          gap: 16,
        }}
      >
        <p
          className="t-mono"
          style={{
            margin: 0,
            fontSize: 11,
            letterSpacing: 'var(--tracking-tight)',
            textTransform: 'uppercase',
            color: 'var(--muted)',
          }}
        >
          № {String(index + 1).padStart(2, '0')} / {String(total).padStart(2, '0')}
        </p>
        <h3
          style={{
            margin: 0,
            fontFamily: 'var(--font-serif)',
            fontStyle: 'italic',
            fontWeight: 300,
            fontSize: 'clamp(80px, 14vw, 200px)',
            letterSpacing: '-0.04em',
            lineHeight: 0.92,
            fontVariationSettings: "'opsz' 144, 'SOFT' 50, 'WONK' 1",
            color: 'var(--fg)',
            fontVariantNumeric: 'tabular-nums',
          }}
        >
          {year}
        </h3>
        <p
          style={{
            margin: 0,
            maxWidth: 720,
            fontSize: 'clamp(17px, 1.6vw, 19px)',
            lineHeight: 1.7,
            color: 'var(--muted)',
          }}
        >
          {event}
        </p>
      </div>
    </li>
  )
}

// ─── § 04 · Interview (From the Founder) ────────────────────────────────────

function InterviewSection() {
  const { ref, inView } = useInView<HTMLDivElement>(0.05)
  return (
    <section
      data-page="04"
      data-page-label="Interview"
      style={{ paddingBlock: 'var(--gap-y)', borderTop: 'var(--rule)' }}
    >
      <div
        ref={ref}
        className={`container stagger${inView ? ' is-visible' : ''}`}
      >
        <p className="t-caption" style={{ margin: 0 }}>
          ⏤ {INTERVIEW.subtitle}
        </p>

        <div
          style={{
            marginTop: 'var(--gap-y-sm)',
            display: 'grid',
            gridTemplateColumns: 'minmax(220px, 5fr) minmax(0, 7fr)',
            gap: 'clamp(24px, 5vw, 64px)',
            alignItems: 'start',
          }}
        >
          {/* Photo placeholder (5 cols) */}
          <div
            style={{
              position: 'sticky',
              top: 'calc(var(--nav-h) + 24px)',
              alignSelf: 'start',
            }}
          >
            <div
              role="img"
              aria-label="Founder portrait — TBD"
              style={{
                position: 'relative',
                width: '100%',
                aspectRatio: '3/4',
                background: 'var(--surface)',
                border: 'var(--rule)',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
              }}
            >
              <span
                className="t-mono"
                style={{
                  fontSize: 11,
                  letterSpacing: 'var(--tracking-label)',
                  textTransform: 'uppercase',
                  color: 'var(--muted)',
                }}
              >
                ⏤ Photo TBD
              </span>
            </div>
          </div>

          {/* Right column (7 cols): intro quote + Q&A list */}
          <div>
            <blockquote
              className="t-h1 t-italic"
              style={{
                margin: 0,
                color: 'var(--fg)',
                fontVariationSettings: "'opsz' 96, 'SOFT' 50, 'WONK' 1",
              }}
            >
              &ldquo;{INTERVIEW.intro}&rdquo;
            </blockquote>

            <div style={{ marginTop: 'var(--gap-y)' }}>
              {INTERVIEW.qa.map((item, i) => (
                <QABlock key={item.id} item={item} isLast={i === INTERVIEW.qa.length - 1} />
              ))}
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}

function QABlock({ item, isLast }: { item: InterviewQA; isLast: boolean }) {
  const paragraphs = item.answer.split(/\n\n+/)
  return (
    <div>
      <p
        className="t-caption"
        style={{ margin: 0, color: 'var(--accent)' }}
      >
        ⏤ Q.{item.id}
      </p>
      <h3
        style={{
          margin: '8px 0 0',
          fontFamily: 'var(--font-serif)',
          fontStyle: 'italic',
          fontWeight: 300,
          fontSize: 'clamp(24px, 2.6vw, 32px)',
          letterSpacing: '-0.01em',
          lineHeight: 1.25,
          fontVariationSettings: "'opsz' 72, 'SOFT' 50, 'WONK' 1",
          color: 'var(--fg)',
        }}
      >
        {item.question}
      </h3>

      <div
        style={{
          marginTop: 12,
          display: 'flex',
          flexDirection: 'column',
          gap: 16,
          maxWidth: 720,
        }}
      >
        {paragraphs.map((p, i) => (
          <p
            key={i}
            style={{
              margin: 0,
              fontSize: 'var(--type-body)',
              lineHeight: 1.7,
              color: i === 0 ? 'var(--fg)' : 'var(--muted)',
            }}
            // Inline <em> tags inside dummy answers are author-controlled
            // and trusted (no user input), so dangerouslySetInnerHTML is safe.
            dangerouslySetInnerHTML={{ __html: p }}
          />
        ))}
      </div>

      {!isLast && (
        <hr className="divider" style={{ marginBlock: 32 }} />
      )}
    </div>
  )
}

// ─── § 06 · Network (partners) ──────────────────────────────────────────────

function NetworkSection() {
  const { ref, inView } = useInView<HTMLDivElement>(0.15)
  return (
    <section
      data-page="06"
      data-page-label="Network"
      style={{ paddingBlock: 'var(--gap-y)', borderTop: 'var(--rule)' }}
    >
      <div
        ref={ref}
        className={`container stagger${inView ? ' is-visible' : ''}`}
      >
        <p className="t-caption" style={{ margin: 0 }}>
          ⏤ Network
        </p>

        <h2 className="t-h2" style={{ margin: '16px 0 0' }}>
          Media <span className="t-italic">partners.</span>
        </h2>

        <p
          style={{
            margin: '20px 0 0',
            maxWidth: 540,
            color: 'var(--muted)',
            fontSize: 'var(--type-small)',
            lineHeight: 1.7,
          }}
        >
          전국 매체사 / 옥외 광고 운영사와 직접 협력 관계.
        </p>

        <hr className="divider divider-draw" style={{ marginTop: 'var(--gap-y-sm)' }} />

        <ul
          style={{
            listStyle: 'none',
            margin: 0,
            padding: 0,
            display: 'grid',
            gridTemplateColumns: 'repeat(auto-fit, minmax(220px, 1fr))',
            borderTop: 'var(--rule)',
            borderLeft: 'var(--rule)',
          }}
        >
          {DATA.partners.map((p) => (
            <li
              key={p.name}
              style={{
                padding: '24px 20px',
                borderRight: 'var(--rule)',
                borderBottom: 'var(--rule)',
                fontFamily: 'var(--font-mono)',
                fontSize: 13,
                letterSpacing: 'var(--tracking-tight)',
                color: 'var(--fg)',
              }}
            >
              {p.name}
            </li>
          ))}
        </ul>
      </div>
    </section>
  )
}

// ─── Composition ────────────────────────────────────────────────────────────

export function EditorialAbout() {
  return (
    <>
      <CoverSection />
      <StatsSection />
      <ChronologySection />
      <InterviewSection />
      <CertificationsSection />
      <NetworkSection />
    </>
  )
}
