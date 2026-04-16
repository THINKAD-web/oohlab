'use client'

import { useState } from 'react'

interface Props {
  /** 표시 크기 */
  size?: 'sm' | 'md' | 'lg'
  /** 배지 전용 모드 (텍스트 없이 아이콘+레이블만) */
  compact?: boolean
}

/**
 * WomenCertBadge
 * 사이트 전역에서 재사용 가능한 여성기업인증 배지
 * Hero, About, Works 카드 등 다양한 맥락에서 사용
 */
export function WomenCertBadge({ size = 'md', compact = false }: Props) {
  const [hovered, setHovered] = useState(false)
  const [tilt, setTilt] = useState({ x: 0, y: 0 })

  const sizeMap = {
    sm: { padding: '6px 12px', iconSize: 24, labelSize: 10, textSize: 11 },
    md: { padding: '10px 16px', iconSize: 32, labelSize: 11, textSize: 12 },
    lg: { padding: '14px 22px', iconSize: 44, labelSize: 13, textSize: 14 },
  }
  const s = sizeMap[size]

  const onMove = (e: React.MouseEvent<HTMLDivElement>) => {
    const rect = e.currentTarget.getBoundingClientRect()
    const dx = ((e.clientX - rect.left - rect.width / 2) / (rect.width / 2)) * 10
    const dy = ((e.clientY - rect.top - rect.height / 2) / (rect.height / 2)) * -10
    setTilt({ x: dy, y: dx })
  }

  return (
    <div
      onMouseMove={onMove}
      onMouseEnter={() => setHovered(true)}
      onMouseLeave={() => { setTilt({ x: 0, y: 0 }); setHovered(false) }}
      role="img"
      aria-label="여성기업인증 — 지자체·공공기관이 선호하는 여성기업 대행사"
      style={{ perspective: '500px', display: 'inline-block' }}
    >
      <div
        style={{
          transform: `rotateX(${tilt.x}deg) rotateY(${tilt.y}deg) scale(${hovered ? 1.06 : 1})`,
          transition: hovered
            ? 'transform 0.08s ease-out'
            : 'transform 0.55s cubic-bezier(0.16,1,0.3,1)',
          display: 'inline-flex',
          alignItems: 'center',
          gap: compact ? 8 : 10,
          padding: s.padding,
          background: hovered ? 'rgba(255,77,0,0.12)' : 'rgba(255,255,255,0.06)',
          border: `1px solid ${hovered ? 'rgba(255,77,0,0.6)' : 'rgba(255,255,255,0.15)'}`,
          borderRadius: '4px',
          backdropFilter: 'blur(10px)',
          WebkitBackdropFilter: 'blur(10px)',
          transition: 'background 0.3s, border-color 0.3s, transform 0.08s',
          cursor: 'default',
          userSelect: 'none',
          position: 'relative',
          overflow: 'hidden',
        }}
      >
        {/* 아이콘 원 */}
        <div
          aria-hidden="true"
          style={{
            width: s.iconSize,
            height: s.iconSize,
            borderRadius: '50%',
            background: 'linear-gradient(135deg, #FF4D00 0%, #FF8040 100%)',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            fontSize: s.iconSize * 0.45,
            flexShrink: 0,
            boxShadow: hovered ? '0 0 16px rgba(255,77,0,0.5)' : 'none',
            transition: 'box-shadow 0.3s',
          }}
        >
          ♀
        </div>

        {/* 텍스트 */}
        <div>
          <p
            style={{
              margin: 0,
              fontSize: s.labelSize,
              fontWeight: 700,
              letterSpacing: '0.14em',
              textTransform: 'uppercase',
              color: '#FF4D00',
              lineHeight: 1,
            }}
          >
            여성기업인증
          </p>
          {!compact && (
            <p
              style={{
                margin: '4px 0 0',
                fontSize: s.textSize,
                color: 'rgba(255,255,255,0.7)',
                lineHeight: 1.35,
                maxWidth: 220,
              }}
            >
              지자체·공공기관이 선호하는 여성기업 대행사
            </p>
          )}
        </div>

        {/* 광택 반사 효과 */}
        <div
          aria-hidden="true"
          style={{
            position: 'absolute',
            top: 0,
            left: '-100%',
            width: '60%',
            height: '100%',
            background:
              'linear-gradient(90deg, transparent 0%, rgba(255,255,255,0.08) 50%, transparent 100%)',
            transform: hovered ? 'translateX(350%)' : 'translateX(0)',
            transition: 'transform 0.6s ease',
            pointerEvents: 'none',
          }}
        />
      </div>
    </div>
  )
}
