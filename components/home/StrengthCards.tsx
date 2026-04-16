'use client'

import { useEffect, useRef } from 'react'
import type { StrengthItem } from '@/lib/types'

const ICONS: Record<string, React.ReactNode> = {
  grid: (
    <svg width="24" height="24" viewBox="0 0 24 24" fill="none" aria-hidden="true">
      <rect x="3" y="3" width="7" height="7" rx="1.5" stroke="currentColor" strokeWidth="1.5"/>
      <rect x="14" y="3" width="7" height="7" rx="1.5" stroke="currentColor" strokeWidth="1.5"/>
      <rect x="3" y="14" width="7" height="7" rx="1.5" stroke="currentColor" strokeWidth="1.5"/>
      <rect x="14" y="14" width="7" height="7" rx="1.5" stroke="currentColor" strokeWidth="1.5"/>
    </svg>
  ),
  layers: (
    <svg width="24" height="24" viewBox="0 0 24 24" fill="none" aria-hidden="true">
      <path d="M12 2L2 7l10 5 10-5-10-5z" stroke="currentColor" strokeWidth="1.5" strokeLinejoin="round"/>
      <path d="M2 12l10 5 10-5" stroke="currentColor" strokeWidth="1.5" strokeLinejoin="round"/>
      <path d="M2 17l10 5 10-5" stroke="currentColor" strokeWidth="1.5" strokeLinejoin="round"/>
    </svg>
  ),
  chart: (
    <svg width="24" height="24" viewBox="0 0 24 24" fill="none" aria-hidden="true">
      <path d="M3 3v18h18" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round"/>
      <path d="M7 16l4-6 4 3 4-6" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/>
    </svg>
  ),
  check: (
    <svg width="24" height="24" viewBox="0 0 24 24" fill="none" aria-hidden="true">
      <circle cx="12" cy="12" r="9" stroke="currentColor" strokeWidth="1.5"/>
      <path d="M8 12l3 3 5-5" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/>
    </svg>
  ),
}

interface Props {
  items: StrengthItem[]
}

function StrengthCard({ item, index }: { item: StrengthItem; index: number }) {
  const cardRef = useRef<HTMLDivElement>(null)

  useEffect(() => {
    const el = cardRef.current
    if (!el) return

    async function animate() {
      const { gsap } = await import('gsap')
      const { ScrollTrigger } = await import('gsap/ScrollTrigger')
      gsap.registerPlugin(ScrollTrigger)

      gsap.fromTo(
        el,
        { opacity: 0, y: 40 },
        {
          opacity: 1,
          y: 0,
          duration: 0.9,
          delay: index * 0.12,
          ease: 'power3.out',
          scrollTrigger: {
            trigger: el,
            start: 'top 82%',
            once: true,
          },
        }
      )
    }
    animate()
  }, [index])

  return (
    <div
      ref={cardRef}
      style={{
        opacity: 0, // GSAP 진입 전 숨김
        padding: '36px 32px',
        background: '#111111',
        border: '1px solid #1E1E1E',
        borderRadius: '2px',
        cursor: 'default',
        transition: 'border-color 0.3s ease, background 0.3s ease',
        position: 'relative',
        overflow: 'hidden',
      }}
      onMouseEnter={(e) => {
        const el = e.currentTarget
        el.style.borderColor = '#F37021'
        el.style.background = '#131313'
      }}
      onMouseLeave={(e) => {
        const el = e.currentTarget
        el.style.borderColor = '#1E1E1E'
        el.style.background = '#111111'
      }}
    >
      {/* 오렌지 라인 — 좌측 강조 */}
      <div
        aria-hidden="true"
        style={{
          position: 'absolute',
          left: 0,
          top: 0,
          width: '3px',
          height: '100%',
          background: '#F37021',
          transform: 'scaleY(0)',
          transformOrigin: 'top',
          transition: 'transform 0.35s cubic-bezier(0.16,1,0.3,1)',
        }}
        className="ooh-card-line"
      />

      {/* 아이콘 */}
      <div
        style={{
          width: 48,
          height: 48,
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
          color: '#F37021',
          marginBottom: 24,
          background: 'rgba(255,77,0,0.08)',
          borderRadius: '4px',
        }}
      >
        {ICONS[item.icon]}
      </div>

      {/* 제목 */}
      <h3
        style={{
          margin: '0 0 12px',
          fontSize: 20,
          fontWeight: 700,
          color: '#FFFFFF',
          letterSpacing: '-0.01em',
          fontFamily: "'Pretendard', sans-serif",
        }}
      >
        {item.title}
      </h3>

      {/* 설명 */}
      <p
        style={{
          margin: 0,
          fontSize: 14,
          lineHeight: 1.7,
          color: 'rgba(255,255,255,0.5)',
          fontFamily: "'Pretendard', sans-serif",
        }}
      >
        {item.body}
      </p>

      <style>{`
        .ooh-strength-card:hover .ooh-card-line {
          transform: scaleY(1) !important;
        }
      `}</style>
    </div>
  )
}

export function StrengthCards({ items }: Props) {
  const sectionRef = useRef<HTMLElement>(null)

  return (
    <section
      ref={sectionRef}
      aria-label="오랩 핵심 강점"
      style={{
        background: '#0A0A0A',
        padding: 'clamp(80px, 10vw, 140px) clamp(24px, 6vw, 100px)',
      }}
    >
      {/* 섹션 레이블 */}
      <p
        style={{
          margin: '0 0 16px',
          fontSize: 11,
          letterSpacing: '0.22em',
          textTransform: 'uppercase',
          color: '#F37021',
          fontWeight: 600,
        }}
      >
        Why OOH-LAB
      </p>

      <h2
        style={{
          margin: '0 0 64px',
          fontSize: 'clamp(28px, 4vw, 48px)',
          fontWeight: 800,
          color: '#FFFFFF',
          letterSpacing: '-0.02em',
          lineHeight: 1.15,
          fontFamily: "'Pretendard', sans-serif",
          maxWidth: 560,
        }}
      >
        시스템처럼 정확하고,<br />
        광고처럼 강렬하게.
      </h2>

      {/* 4 카드 그리드 */}
      <div
        style={{
          display: 'grid',
          gridTemplateColumns: 'repeat(auto-fit, minmax(240px, 1fr))',
          gap: '1px',
          background: '#1E1E1E',
          border: '1px solid #1E1E1E',
        }}
      >
        {items.map((item, i) => (
          <StrengthCard key={item.id} item={item} index={i} />
        ))}
      </div>
    </section>
  )
}
