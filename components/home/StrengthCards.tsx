'use client'

import { useEffect, useRef } from 'react'
import type { StrengthItem } from '@/lib/types'

const ICONS: Record<string, React.ReactNode> = {
  grid: (
    <svg width="22" height="22" viewBox="0 0 24 24" fill="none" aria-hidden="true">
      <rect x="3" y="3" width="7" height="7" rx="2" stroke="currentColor" strokeWidth="1.5"/>
      <rect x="14" y="3" width="7" height="7" rx="2" stroke="currentColor" strokeWidth="1.5"/>
      <rect x="3" y="14" width="7" height="7" rx="2" stroke="currentColor" strokeWidth="1.5"/>
      <rect x="14" y="14" width="7" height="7" rx="2" stroke="currentColor" strokeWidth="1.5"/>
    </svg>
  ),
  layers: (
    <svg width="22" height="22" viewBox="0 0 24 24" fill="none" aria-hidden="true">
      <path d="M12 2L2 7l10 5 10-5-10-5z" stroke="currentColor" strokeWidth="1.5" strokeLinejoin="round"/>
      <path d="M2 12l10 5 10-5" stroke="currentColor" strokeWidth="1.5" strokeLinejoin="round"/>
      <path d="M2 17l10 5 10-5" stroke="currentColor" strokeWidth="1.5" strokeLinejoin="round"/>
    </svg>
  ),
  chart: (
    <svg width="22" height="22" viewBox="0 0 24 24" fill="none" aria-hidden="true">
      <path d="M3 3v18h18" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round"/>
      <path d="M7 16l4-6 4 3 4-6" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/>
    </svg>
  ),
  check: (
    <svg width="22" height="22" viewBox="0 0 24 24" fill="none" aria-hidden="true">
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
        { opacity: 0, y: 32 },
        {
          opacity: 1, y: 0,
          duration: 0.8,
          delay: index * 0.1,
          ease: 'power3.out',
          scrollTrigger: { trigger: el, start: 'top 84%', once: true },
        }
      )
    }
    animate()
  }, [index])

  return (
    <div ref={cardRef} style={{ opacity: 0 }}>
      <div
        style={{
          padding: '36px 32px',
          background: '#FFFFFF',
          border: '1px solid #E8E4DB',
          borderRadius: '12px',
          cursor: 'default',
          transition: 'box-shadow 0.25s ease, border-color 0.25s ease, transform 0.25s ease',
          boxShadow: '0 2px 12px rgba(0,0,0,0.05)',
          height: '100%',
        }}
        onMouseEnter={(e) => {
          e.currentTarget.style.boxShadow = '0 8px 32px rgba(243,112,33,0.12)'
          e.currentTarget.style.borderColor = '#F37021'
          e.currentTarget.style.transform = 'translateY(-3px)'
        }}
        onMouseLeave={(e) => {
          e.currentTarget.style.boxShadow = '0 2px 12px rgba(0,0,0,0.05)'
          e.currentTarget.style.borderColor = '#E8E4DB'
          e.currentTarget.style.transform = 'translateY(0)'
        }}
      >
        <div
          style={{
            width: 48,
            height: 48,
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            color: '#F37021',
            marginBottom: 24,
            background: 'rgba(243,112,33,0.08)',
            borderRadius: '10px',
          }}
        >
          {ICONS[item.icon]}
        </div>

        <h3
          style={{
            margin: '0 0 10px',
            fontSize: 18,
            fontWeight: 700,
            color: '#111111',
            letterSpacing: '-0.01em',
            fontFamily: "'Pretendard', sans-serif",
          }}
        >
          {item.title}
        </h3>

        <p
          style={{
            margin: 0,
            fontSize: 14,
            lineHeight: 1.75,
            color: '#666666',
            fontFamily: "'Pretendard', sans-serif",
          }}
        >
          {item.body}
        </p>
      </div>
    </div>
  )
}

export function StrengthCards({ items }: Props) {
  return (
    <section
      aria-label="오랩 핵심 강점"
      style={{
        background: '#F8F5F0',
        padding: 'clamp(80px, 10vw, 140px) clamp(24px, 6vw, 100px)',
      }}
    >
      <p
        style={{
          margin: '0 0 16px',
          fontSize: 11,
          letterSpacing: '0.22em',
          textTransform: 'uppercase',
          color: '#F37021',
          fontWeight: 700,
        }}
      >
        Why OOH-LAB
      </p>

      <h2
        style={{
          margin: '0 0 64px',
          fontSize: 'clamp(28px, 4vw, 48px)',
          fontWeight: 800,
          color: '#111111',
          letterSpacing: '-0.03em',
          lineHeight: 1.15,
          fontFamily: "'Pretendard', sans-serif",
          maxWidth: 560,
        }}
      >
        시스템처럼 정확하고,<br />
        광고처럼 강렬하게.
      </h2>

      <div
        style={{
          display: 'grid',
          gridTemplateColumns: 'repeat(auto-fit, minmax(240px, 1fr))',
          gap: '20px',
        }}
      >
        {items.map((item, i) => (
          <StrengthCard key={item.id} item={item} index={i} />
        ))}
      </div>
    </section>
  )
}
