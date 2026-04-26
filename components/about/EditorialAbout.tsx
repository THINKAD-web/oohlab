'use client'

import aboutData from '@/data/about.json'
import masthead from '@/data/masthead.json'
import { useCountUp, useInView } from '@/lib/hooks'
import type { AboutData } from '@/lib/types'

const DATA = aboutData as unknown as AboutData

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

// ─── § 03 · Certifications & Standing ───────────────────────────────────────

function CertificationsSection() {
  const { ref, inView } = useInView<HTMLDivElement>(0.15)
  const cert = DATA.womenCertSection
  return (
    <section
      data-page="03"
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

// ─── § 04 · Chronology ──────────────────────────────────────────────────────

function ChronologySection() {
  const { ref, inView } = useInView<HTMLDivElement>(0.05)
  return (
    <section
      data-page="04"
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

// ─── § 05 · Network (partners) ──────────────────────────────────────────────

function NetworkSection() {
  const { ref, inView } = useInView<HTMLDivElement>(0.15)
  return (
    <section
      data-page="05"
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
      <CertificationsSection />
      <ChronologySection />
      <NetworkSection />
    </>
  )
}
