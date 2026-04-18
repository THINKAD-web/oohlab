'use client'

import { useEffect, useRef, useState } from 'react'
import Image from 'next/image'
import Link from 'next/link'
import type { Work } from '@/lib/types'

const TYPE_COLORS: Record<string, string> = {
  '미디어믹스':     '#E05C00',
  '전광판':         '#B8720A',
  '지하철':         '#1D56C4',
  '버스':           '#16A34A',
  '디지털사이니지': '#7C22C7',
  '외벽':           '#B04A00',
  'DOOH':           '#E05C00',
  '빌보드':         '#B04A00',
  '버스쉘터':       '#16A34A',
  '현수막·배너':    '#888888',
}

function WorkCard({ work, index }: { work: Work; index: number }) {
  const [hovered, setHovered] = useState(false)
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
        { opacity: 0, y: 28 },
        {
          opacity: 1, y: 0,
          duration: 0.75,
          delay: (index % 3) * 0.1,
          ease: 'power3.out',
          scrollTrigger: { trigger: el, start: 'top 88%', once: true },
        }
      )
    }
    animate()
  }, [index])

  const typeColor = TYPE_COLORS[work.mediaType] || '#888888'

  return (
    <div
      ref={cardRef}
      style={{ opacity: 0 }}
      onMouseEnter={() => setHovered(true)}
      onMouseLeave={() => setHovered(false)}
    >
      <div
        style={{
          background: '#FFFFFF',
          borderRadius: '14px',
          overflow: 'hidden',
          border: '1px solid #E8E4DB',
          boxShadow: hovered
            ? '0 16px 48px rgba(0,0,0,0.12)'
            : '0 2px 12px rgba(0,0,0,0.05)',
          transform: hovered ? 'translateY(-5px)' : 'translateY(0)',
          transition: 'box-shadow 0.35s ease, transform 0.35s ease',
          cursor: 'default',
        }}
      >
        {/* 이미지 */}
        <div
          style={{
            position: 'relative',
            aspectRatio: '4/3',
            overflow: 'hidden',
            background: '#F0EDE6',
          }}
        >
          <div
            style={{
              position: 'absolute',
              inset: 0,
              transform: hovered ? 'scale(1.06)' : 'scale(1)',
              transition: 'transform 0.6s cubic-bezier(0.16,1,0.3,1)',
            }}
          >
            <Image
              src={work.thumbnail}
              alt={`${work.client} 캠페인`}
              fill
              sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 33vw"
              style={{ objectFit: 'cover' }}
            />
          </div>

          {/* 호버 오버레이 */}
          <div
            style={{
              position: 'absolute',
              inset: 0,
              background: 'rgba(15,17,23,0.35)',
              opacity: hovered ? 1 : 0,
              transition: 'opacity 0.35s ease',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
            }}
          >
            <span
              style={{
                fontSize: 13,
                fontWeight: 600,
                color: '#FFFFFF',
                letterSpacing: '0.08em',
                opacity: hovered ? 1 : 0,
                transform: hovered ? 'translateY(0)' : 'translateY(6px)',
                transition: 'opacity 0.3s 0.05s ease, transform 0.3s 0.05s ease',
              }}
            >
              {work.client}
            </span>
          </div>

          {/* 매체 배지 */}
          <div
            style={{
              position: 'absolute',
              top: 12,
              left: 12,
              padding: '4px 10px',
              background: 'rgba(0,0,0,0.55)',
              backdropFilter: 'blur(8px)',
              WebkitBackdropFilter: 'blur(8px)',
              borderRadius: '100px',
              fontSize: 10,
              fontWeight: 700,
              color: '#FFFFFF',
              letterSpacing: '0.06em',
              textTransform: 'uppercase',
            }}
          >
            {work.mediaType}
          </div>

          {/* 여성기업 배지 */}
          {work.isWomenCertProject && (
            <div
              style={{
                position: 'absolute',
                top: 12,
                right: 12,
                padding: '4px 8px',
                background: 'rgba(243,112,33,0.85)',
                borderRadius: '100px',
                fontSize: 9,
                fontWeight: 700,
                color: '#FFFFFF',
                letterSpacing: '0.06em',
              }}
            >
              여성기업
            </div>
          )}
        </div>

        {/* 텍스트 */}
        <div style={{ padding: '16px 20px 18px' }}>
          <div
            style={{
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'space-between',
              gap: 8,
            }}
          >
            <h3
              style={{
                margin: 0,
                fontSize: 15,
                fontWeight: 700,
                color: '#111111',
                fontFamily: "'Pretendard', sans-serif",
                letterSpacing: '-0.01em',
                overflow: 'hidden',
                textOverflow: 'ellipsis',
                whiteSpace: 'nowrap',
              }}
            >
              {work.client}
            </h3>
            <span
              style={{
                fontSize: 12,
                color: typeColor,
                fontWeight: 600,
                flexShrink: 0,
              }}
            >
              {work.year}
            </span>
          </div>
          <p
            style={{
              margin: '4px 0 0',
              fontSize: 12,
              color: '#999999',
              overflow: 'hidden',
              textOverflow: 'ellipsis',
              whiteSpace: 'nowrap',
            }}
          >
            {work.title}
          </p>
        </div>
      </div>
    </div>
  )
}

interface Props {
  works: Work[]
}

export function WorksPreview({ works }: Props) {
  const preview = works.filter((w) => w.isPublic).slice(0, 6)

  return (
    <section
      aria-label="대표 집행 사례"
      style={{
        background: '#F8F5F0',
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
          marginBottom: 48,
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
              fontWeight: 700,
            }}
          >
            Selected Works
          </p>
          <h2
            style={{
              margin: 0,
              fontSize: 'clamp(28px, 4vw, 48px)',
              fontWeight: 800,
              color: '#111111',
              letterSpacing: '-0.03em',
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
            display: 'inline-flex',
            alignItems: 'center',
            gap: 8,
            fontSize: 13,
            fontWeight: 600,
            color: '#111111',
            textDecoration: 'none',
            letterSpacing: '0.05em',
            padding: '10px 20px',
            border: '1px solid #D8D3CB',
            borderRadius: '100px',
            transition: 'border-color 0.2s, background 0.2s',
          }}
          onMouseEnter={(e) => {
            e.currentTarget.style.borderColor = '#F37021'
            e.currentTarget.style.background = 'rgba(243,112,33,0.05)'
          }}
          onMouseLeave={(e) => {
            e.currentTarget.style.borderColor = '#D8D3CB'
            e.currentTarget.style.background = 'transparent'
          }}
        >
          전체 보기 <span aria-hidden="true" style={{ color: '#F37021' }}>→</span>
        </Link>
      </div>

      {/* 사진 그리드 */}
      <div
        style={{
          display: 'grid',
          gridTemplateColumns: 'repeat(3, 1fr)',
          gap: 20,
        }}
        className="ooh-works-grid"
      >
        {preview.map((work, i) => (
          <WorkCard key={work.id} work={work} index={i} />
        ))}
      </div>

      {/* 하단 */}
      <p
        style={{
          marginTop: 48,
          fontSize: 13,
          color: '#AAAAAA',
          textAlign: 'center',
          fontStyle: 'italic',
        }}
      >
        추가 사례는 문의 주시면 PDF로 바로 전달드립니다.
      </p>

      <style>{`
        @media (max-width: 768px) {
          .ooh-works-grid { grid-template-columns: repeat(2, 1fr) !important; }
        }
        @media (max-width: 480px) {
          .ooh-works-grid { grid-template-columns: 1fr !important; }
        }
      `}</style>
    </section>
  )
}
