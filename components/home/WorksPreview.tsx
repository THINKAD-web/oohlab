'use client'

import { useEffect, useRef } from 'react'
import Link from 'next/link'
import type { Work } from '@/lib/types'

const TYPE_COLORS: Record<string, string> = {
  '미디어믹스':     '#F37021',
  '전광판':         '#E8B86D',
  '지하철':         '#6D9EE8',
  '버스':           '#72C472',
  '디지털사이니지': '#C86DD2',
  '외벽':           '#D2916D',
  'DOOH':           '#F37021',
}

function WorkRow({ work, index }: { work: Work; index: number }) {
  const rowRef = useRef<HTMLDivElement>(null)

  useEffect(() => {
    const el = rowRef.current
    if (!el) return
    async function animate() {
      const { gsap } = await import('gsap')
      const { ScrollTrigger } = await import('gsap/ScrollTrigger')
      gsap.registerPlugin(ScrollTrigger)
      gsap.fromTo(
        el,
        { opacity: 0, y: 20 },
        {
          opacity: 1, y: 0,
          duration: 0.7,
          delay: index * 0.06,
          ease: 'power3.out',
          scrollTrigger: { trigger: el, start: 'top 88%', once: true },
        }
      )
    }
    animate()
  }, [index])

  const typeColor = TYPE_COLORS[work.mediaType] || 'rgba(255,255,255,0.4)'

  return (
    <div
      ref={rowRef}
      style={{ opacity: 0 }}
    >
      <div
        style={{
          display: 'grid',
          gridTemplateColumns: '40px 1fr auto',
          gap: '0 20px',
          alignItems: 'center',
          padding: '20px 0',
          borderBottom: '1px solid #1E2A3A',
          transition: 'background 0.15s',
        }}
        onMouseEnter={(e) => { e.currentTarget.style.background = '#1A2535' }}
        onMouseLeave={(e) => { e.currentTarget.style.background = 'transparent' }}
      >
        {/* 번호 */}
        <span
          style={{
            fontSize: 12,
            fontWeight: 700,
            color: 'rgba(255,255,255,0.2)',
            fontVariantNumeric: 'tabular-nums',
            fontFamily: "'Pretendard', sans-serif",
          }}
        >
          {String(index + 1).padStart(2, '0')}
        </span>

        {/* 클라이언트 + 타이틀 */}
        <div>
          <div style={{ display: 'flex', alignItems: 'center', gap: 8, marginBottom: 3, flexWrap: 'wrap' }}>
            <span
              style={{
                fontSize: 15,
                fontWeight: 600,
                color: '#E8E8E8',
                letterSpacing: '-0.01em',
                fontFamily: "'Pretendard', sans-serif",
              }}
            >
              {work.client}
            </span>
            {work.isWomenCertProject && (
              <span
                style={{
                  padding: '2px 6px',
                  background: 'rgba(243,112,33,0.15)',
                  border: '1px solid rgba(243,112,33,0.3)',
                  borderRadius: '2px',
                  fontSize: 9,
                  fontWeight: 700,
                  color: '#F37021',
                  letterSpacing: '0.08em',
                  textTransform: 'uppercase',
                }}
              >
                여성기업
              </span>
            )}
            {work.isGovernment && (
              <span
                style={{
                  padding: '2px 6px',
                  background: 'rgba(255,255,255,0.05)',
                  border: '1px solid rgba(255,255,255,0.1)',
                  borderRadius: '2px',
                  fontSize: 9,
                  color: 'rgba(255,255,255,0.4)',
                  letterSpacing: '0.08em',
                  textTransform: 'uppercase',
                }}
              >
                공공
              </span>
            )}
          </div>
          <p
            style={{
              margin: 0,
              fontSize: 12,
              color: 'rgba(255,255,255,0.38)',
              overflow: 'hidden',
              textOverflow: 'ellipsis',
              whiteSpace: 'nowrap',
            }}
          >
            {work.title}
          </p>
        </div>

        {/* 매체 + 연도 */}
        <div style={{ textAlign: 'right', flexShrink: 0 }}>
          <span
            style={{
              display: 'block',
              fontSize: 12,
              fontWeight: 600,
              color: typeColor,
              marginBottom: 2,
            }}
          >
            {work.mediaType}
          </span>
          <span
            style={{
              display: 'block',
              fontSize: 11,
              color: 'rgba(255,255,255,0.28)',
              fontVariantNumeric: 'tabular-nums',
            }}
          >
            {work.year}
          </span>
        </div>
      </div>
    </div>
  )
}

interface Props {
  works: Work[]
}

export function WorksPreview({ works }: Props) {
  const preview = works.filter((w) => w.isPublic).slice(0, 8)

  return (
    <section
      aria-label="대표 집행 사례"
      style={{
        background: '#111827',
        padding: 'clamp(80px, 10vw, 140px) clamp(24px, 6vw, 100px)',
      }}
    >
      {/* 헤더 */}
      <div
        style={{
          display: 'flex',
          alignItems: 'flex-end',
          justifyContent: 'space-between',
          gap: 24,
          flexWrap: 'wrap',
          marginBottom: 40,
        }}
      >
        <div>
          <p
            style={{
              margin: '0 0 14px',
              fontSize: 11,
              letterSpacing: '0.22em',
              textTransform: 'uppercase',
              color: '#F37021',
              fontWeight: 600,
            }}
          >
            Selected Works
          </p>
          <h2
            style={{
              margin: 0,
              fontSize: 'clamp(28px, 4vw, 48px)',
              fontWeight: 800,
              color: '#FFFFFF',
              letterSpacing: '-0.02em',
              lineHeight: 1.1,
              fontFamily: "'Pretendard', sans-serif",
            }}
          >
            말이 아닌 결과.
          </h2>
        </div>
        <Link
          href="/works"
          style={{
            fontSize: 13,
            color: 'rgba(255,255,255,0.5)',
            textDecoration: 'none',
            letterSpacing: '0.08em',
            display: 'flex',
            alignItems: 'center',
            gap: 6,
            transition: 'color 0.2s',
            whiteSpace: 'nowrap',
          }}
        >
          전체 보기 <span aria-hidden="true">→</span>
        </Link>
      </div>

      {/* 헤더 행 */}
      <div
        aria-hidden="true"
        style={{
          display: 'grid',
          gridTemplateColumns: '40px 1fr auto',
          gap: '0 20px',
          padding: '0 0 10px',
          borderBottom: '1px solid #1E2A3A',
        }}
      >
        <span style={{ fontSize: 10, letterSpacing: '0.15em', textTransform: 'uppercase', color: 'rgba(255,255,255,0.18)' }}>#</span>
        <span style={{ fontSize: 10, letterSpacing: '0.15em', textTransform: 'uppercase', color: 'rgba(255,255,255,0.18)' }}>캠페인</span>
        <span style={{ fontSize: 10, letterSpacing: '0.15em', textTransform: 'uppercase', color: 'rgba(255,255,255,0.18)', textAlign: 'right' }}>매체 · 연도</span>
      </div>

      {/* 리스트 */}
      {preview.map((work, i) => (
        <WorkRow key={work.id} work={work} index={i} />
      ))}

      {/* 하단 */}
      <p
        style={{
          marginTop: 40,
          fontSize: 13,
          color: 'rgba(255,255,255,0.3)',
          textAlign: 'center',
          fontStyle: 'italic',
        }}
      >
        추가 사례는 문의 주시면 PDF로 바로 전달드립니다.
      </p>
    </section>
  )
}
