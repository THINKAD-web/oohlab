'use client'

import Link from 'next/link'
import { useEffect, useRef, useState } from 'react'
import worksData from '@/data/works.json'
import masthead from '@/data/masthead.json'
import type { Work } from '@/lib/types'

const WORKS = (worksData.works as unknown as Work[]).slice(0, 6)

const HERO_LINE_1 = 'Out of Home,'
const HERO_LINE_2 = 'Out of Ordinary.'
const TYPE_DELAY = 50 // ms / char (brief: 0.05s)

// ─── Helpers ────────────────────────────────────────────────────────────────

function useInView<T extends Element>(threshold = 0.15) {
  const ref = useRef<T | null>(null)
  const [inView, setInView] = useState(false)
  useEffect(() => {
    const el = ref.current
    if (!el || inView) return
    const obs = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setInView(true)
          obs.disconnect()
        }
      },
      { threshold }
    )
    obs.observe(el)
    return () => obs.disconnect()
  }, [inView, threshold])
  return { ref, inView }
}

function useCountUp(target: number, triggered: boolean, duration = 1200) {
  const [count, setCount] = useState(0)
  useEffect(() => {
    if (!triggered) return
    const start = performance.now()
    let raf = 0
    const tick = (now: number) => {
      const p = Math.min((now - start) / duration, 1)
      const eased = 1 - Math.pow(1 - p, 3) // ease-out cubic
      setCount(Math.round(eased * target))
      if (p < 1) raf = requestAnimationFrame(tick)
    }
    raf = requestAnimationFrame(tick)
    return () => cancelAnimationFrame(raf)
  }, [triggered, target, duration])
  return count
}

// ─── Section 01 · Hero ──────────────────────────────────────────────────────

function HeroSection() {
  const [first, setFirst] = useState('')
  const [second, setSecond] = useState('')
  const [phase, setPhase] = useState<'first' | 'pause' | 'second' | 'done'>('first')

  useEffect(() => {
    let i = 0
    const start = setTimeout(() => {
      const iv = setInterval(() => {
        i++
        setFirst(HERO_LINE_1.slice(0, i))
        if (i >= HERO_LINE_1.length) {
          clearInterval(iv)
          setPhase('pause')
          setTimeout(() => {
            setPhase('second')
            let j = 0
            const iv2 = setInterval(() => {
              j++
              setSecond(HERO_LINE_2.slice(0, j))
              if (j >= HERO_LINE_2.length) {
                clearInterval(iv2)
                setPhase('done')
              }
            }, TYPE_DELAY)
          }, 400)
        }
      }, TYPE_DELAY)
    }, 250)
    return () => clearTimeout(start)
  }, [])

  return (
    <section
      data-page="01"
      data-page-label="Cover"
      style={{
        paddingBlock: 'clamp(80px, 12vw, 160px)',
      }}
    >
      <div className="container">
        <div style={{ maxWidth: '72%' }}>
          <p
            className="t-caption"
            style={{ marginBottom: 'var(--gap-y-sm)' }}
          >
            ⏤ Issue {masthead.issueNumber} · {masthead.season}
          </p>

          <h1 className="t-display" style={{ margin: 0 }}>
            <span style={{ display: 'block' }}>
              {first}
              {phase === 'first' && <span className="cursor-blink" aria-hidden />}
            </span>
            <span style={{ display: 'block', minHeight: '1em' }}>
              <span className="t-italic" style={{ display: 'inline' }}>
                {second}
                {phase === 'second' && <span className="cursor-blink" aria-hidden />}
              </span>
            </span>
          </h1>

          <p
            style={{
              margin: '32px 0 0',
              maxWidth: 540,
              fontSize: 'var(--type-body)',
              color: 'var(--muted)',
              lineHeight: 1.7,
            }}
          >
            도시는 매체다. 15년, 800건, 47개 지자체.
          </p>

          {/* Stats — counter-up #9 */}
          <div
            style={{
              marginTop: 'var(--gap-y)',
              display: 'flex',
              gap: 'clamp(32px, 6vw, 72px)',
              flexWrap: 'wrap',
            }}
          >
            <Stat target={15} suffix="" caption="Years" />
            <Stat target={800} suffix="+" caption="Cases" />
            {/* TODO[PM]: confirm "47 Cities" — placeholder pulled from brief copy. */}
            <Stat target={47} suffix="" caption="Cities" />
          </div>
        </div>
      </div>
    </section>
  )
}

function Stat({ target, suffix, caption }: { target: number; suffix: string; caption: string }) {
  const { ref, inView } = useInView<HTMLDivElement>()
  const count = useCountUp(target, inView, 1200)
  return (
    <div ref={ref} style={{ display: 'flex', flexDirection: 'column', gap: 8 }}>
      <span
        className="t-mono"
        style={{
          fontFamily: 'var(--font-serif)',
          fontWeight: 300,
          fontSize: 'clamp(40px, 5vw, 64px)',
          lineHeight: 1,
          letterSpacing: '-0.02em',
          color: 'var(--fg)',
          fontVariantNumeric: 'tabular-nums',
        }}
      >
        {count}
        <span style={{ color: 'var(--muted)' }}>{suffix}</span>
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
        {caption}
      </span>
    </div>
  )
}

// ─── Section 02 · Index of Work ─────────────────────────────────────────────

function IndexOfWorkSection() {
  const { ref, inView } = useInView<HTMLDivElement>(0.1)
  return (
    <section
      data-page="02"
      data-page-label="Index of Work"
      style={{ paddingBlock: 'var(--gap-y)', borderTop: 'var(--rule)' }}
    >
      <div
        ref={ref}
        className={`container stagger${inView ? ' is-visible' : ''}`}
      >
        <p className="t-caption" style={{ margin: 0 }}>
          ⏤ Index of Work
        </p>
        <h2 className="t-h1" style={{ margin: '16px 0 0' }}>
          <span className="t-italic">Works.</span>
        </h2>
        <p
          style={{
            margin: '16px 0 0',
            maxWidth: 540,
            color: 'var(--muted)',
            fontSize: 'var(--type-small)',
            lineHeight: 1.7,
          }}
        >
          기업·기관 캠페인 6편. 매체 선정부터 집행·정산까지 한 번에.
        </p>

        <hr className="divider divider-draw" style={{ marginTop: 40 }} />

        <ul style={{ listStyle: 'none', margin: 0, padding: 0 }}>
          {WORKS.map((w, i) => (
            <WorkRow key={w.id} index={i} work={w} />
          ))}
        </ul>

        <div
          style={{
            display: 'flex',
            justifyContent: 'flex-end',
            marginTop: 'var(--gap-y-sm)',
          }}
        >
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
            See all of Issue {masthead.issueNumber} →
          </Link>
        </div>
      </div>
    </section>
  )
}

function WorkRow({ work, index }: { work: Work; index: number }) {
  const fig = String(index + 1).padStart(2, '0')
  return (
    <li style={{ borderBottom: 'var(--rule)' }}>
      <Link
        href={`/works/${work.slug}`}
        data-cursor="work"
        style={{
          display: 'grid',
          gridTemplateColumns: '64px 1fr auto auto',
          alignItems: 'baseline',
          gap: 'clamp(16px, 3vw, 40px)',
          paddingBlock: 24,
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
          № {fig}
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
          {work.client}
        </span>

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
          {work.mediaType} · {work.year}
        </span>

        <span
          aria-hidden
          className="t-mono"
          style={{
            fontSize: 14,
            color: 'var(--fg)',
          }}
        >
          →
        </span>
      </Link>
    </li>
  )
}

// ─── Section 03 · Editor's Note ─────────────────────────────────────────────

function EditorsNoteSection() {
  const { ref, inView } = useInView<HTMLDivElement>(0.2)
  return (
    <section
      data-page="03"
      data-page-label="Editor's Note"
      style={{
        paddingBlock: 'var(--gap-y)',
        background: 'var(--surface)',
        borderTop: 'var(--rule)',
        borderBottom: 'var(--rule)',
      }}
    >
      <div
        ref={ref}
        className={`container-text stagger${inView ? ' is-visible' : ''}`}
      >
        <p className="t-caption" style={{ margin: 0 }}>
          ⏤ Editor&rsquo;s Note
        </p>

        <h2 className="t-h2" style={{ margin: '16px 0 0' }}>
          From the desk.
        </h2>

        <div style={{ marginTop: 'var(--gap-y-sm)', display: 'flex', flexDirection: 'column', gap: 16 }}>
          <p style={{ margin: 0, fontSize: 'var(--type-body)', lineHeight: 1.8 }}>
            Issue {masthead.issueNumber}은 2025년 한 해 동안 도시를 채운 옥외광고 작업을 모았습니다.
            기업 캠페인부터 한강유역환경청·한국관광공사·대한상공회의소 같은 공공기관까지, 매체 선정부터
            제작·집행·정산까지 한 호흡으로 처리한 사례 중 일부입니다.
          </p>
          <p style={{ margin: 0, fontSize: 'var(--type-body)', lineHeight: 1.8 }}>
            오랩은 2010년 서울에서 시작했습니다. 여성기업인증을 보유하고 있고, 지자체·공공기관 입찰 우대
            대상입니다. 광고는 매체부터 정확해야 한다고 생각합니다 — 화려한 카피보다 적합한 위치, 적합한
            시간대가 결과를 만든다는 입장입니다.
          </p>
          <p style={{ margin: 0, fontSize: 'var(--type-body)', lineHeight: 1.8 }}>
            다음 호는 진행 중입니다. 새 프로젝트 문의는 24시간 내 회신합니다.
          </p>
        </div>

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

// ─── Section 04 · Masthead mini ─────────────────────────────────────────────

function MastheadSection() {
  const { ref, inView } = useInView<HTMLDivElement>(0.2)
  return (
    <section
      data-page="04"
      data-page-label="Masthead"
      style={{ paddingBlock: 'var(--gap-y)' }}
    >
      <div
        ref={ref}
        className={`container stagger${inView ? ' is-visible' : ''}`}
      >
        <p className="t-caption" style={{ margin: 0 }}>
          ⏤ Masthead
        </p>

        <hr className="divider divider-draw" style={{ marginTop: 16 }} />

        <div
          style={{
            marginTop: 'var(--gap-y-sm)',
            display: 'grid',
            gridTemplateColumns: 'repeat(auto-fit, minmax(200px, 1fr))',
            gap: 'var(--gap-x)',
            rowGap: 'var(--gap-y-sm)',
            alignItems: 'start',
          }}
        >
          <MastheadCol heading="Publisher">
            <p style={{ margin: 0 }}>OOH-LAB</p>
            <p style={{ margin: 0 }}>Founded 2010</p>
            <p style={{ margin: 0 }}>Women-owned, certified</p>
          </MastheadCol>

          <MastheadCol heading="Office">
            <p style={{ margin: 0 }}>Seoul · Korea</p>
            <p style={{ margin: 0 }}>36.5° N</p>
          </MastheadCol>

          <MastheadCol heading="About">
            <p style={{ margin: 0 }}>
              Vol. {masthead.volume} / {masthead.year}
            </p>
            <p style={{ margin: 0 }}>
              <Link
                href="/about"
                className="link-rule"
                style={{ color: 'var(--fg)' }}
              >
                More in Vol. {masthead.volume} →
              </Link>
            </p>
          </MastheadCol>
        </div>

        <hr className="divider divider-draw" style={{ marginTop: 'var(--gap-y-sm)' }} />
      </div>
    </section>
  )
}

function MastheadCol({ heading, children }: { heading: string; children: React.ReactNode }) {
  return (
    <div style={{ display: 'flex', flexDirection: 'column', gap: 8 }}>
      <p className="t-caption" style={{ margin: 0 }}>
        {heading}
      </p>
      <div
        style={{
          fontSize: 'var(--type-small)',
          lineHeight: 1.7,
          color: 'var(--fg)',
        }}
      >
        {children}
      </div>
    </div>
  )
}

// ─── Composition ────────────────────────────────────────────────────────────

export function EditorialHome() {
  return (
    <>
      <HeroSection />
      <IndexOfWorkSection />
      <EditorsNoteSection />
      <MastheadSection />
    </>
  )
}
