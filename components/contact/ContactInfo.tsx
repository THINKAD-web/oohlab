'use client'

import { useState } from 'react'

export function ContactInfo() {
  const [kakaoHovered, setKakaoHovered] = useState(false)

  return (
    <div style={{ display: 'flex', flexDirection: 'column' }}>
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
        Contact
      </p>
      <h1
        style={{
          margin: '0 0 20px',
          fontSize: 'clamp(28px, 4vw, 52px)',
          fontWeight: 800,
          color: '#111111',
          letterSpacing: '-0.025em',
          lineHeight: 1.1,
          fontFamily: "'Pretendard', sans-serif",
        }}
      >
        지금 시작하면<br />내일이 달라집니다.
      </h1>
      <p
        style={{
          margin: '0 0 40px',
          fontSize: 15,
          color: '#666666',
          lineHeight: 1.75,
          maxWidth: 380,
        }}
      >
        무료 미디어 플랜을 제안해드립니다.<br />
        요청 후 24시간 내 회신 보장.
      </p>

      {/* 카카오톡 즉시 연결 */}
      <a
        href="https://pf.kakao.com/_OOHLABchannel"
        target="_blank"
        rel="noopener noreferrer"
        onMouseEnter={() => setKakaoHovered(true)}
        onMouseLeave={() => setKakaoHovered(false)}
        style={{
          display: 'inline-flex',
          alignItems: 'center',
          gap: 12,
          padding: '16px 24px',
          background: '#FAE100',
          color: '#191600',
          fontWeight: 800,
          fontSize: 15,
          borderRadius: '10px',
          textDecoration: 'none',
          width: 'fit-content',
          marginBottom: 40,
          letterSpacing: '0.01em',
          transform: kakaoHovered ? 'translateY(-2px)' : 'none',
          boxShadow: kakaoHovered
            ? '0 8px 24px rgba(250,225,0,0.35)'
            : '0 2px 8px rgba(0,0,0,0.08)',
          transition: 'transform 0.2s, box-shadow 0.2s',
        }}
      >
        <span aria-hidden="true" style={{ fontSize: 22 }}>💬</span>
        카카오톡으로 즉시 상담
      </a>

      {/* 연락 정보 */}
      <div style={{ display: 'flex', flexDirection: 'column', gap: 12, marginBottom: 40 }}>
        {[
          { icon: '📍', label: '주소', value: '서울특별시 중구' },
          { icon: '⏰', label: '운영시간', value: '평일 09:00 – 18:00' },
          { icon: '📧', label: '이메일', value: 'contact@oohlab.co.kr' },
        ].map((item) => (
          <div key={item.label} style={{ display: 'flex', alignItems: 'center', gap: 12 }}>
            <span style={{ fontSize: 16, flexShrink: 0 }}>{item.icon}</span>
            <div>
              <span style={{ fontSize: 10, letterSpacing: '0.12em', textTransform: 'uppercase', color: '#AAAAAA', display: 'block', marginBottom: 1 }}>
                {item.label}
              </span>
              <span style={{ fontSize: 13, color: '#444444', fontWeight: 500 }}>
                {item.value}
              </span>
            </div>
          </div>
        ))}
      </div>

      {/* 지자체·공공기관 전용 */}
      <div
        style={{
          padding: '24px',
          background: '#FFFFFF',
          border: '1px solid #E8E4DB',
          borderLeft: '3px solid #F37021',
          borderRadius: '10px',
          boxShadow: '0 2px 12px rgba(0,0,0,0.04)',
        }}
      >
        <p
          style={{
            margin: '0 0 8px',
            fontSize: 11,
            letterSpacing: '0.15em',
            textTransform: 'uppercase',
            color: '#F37021',
            fontWeight: 700,
          }}
        >
          🏛 지자체·공공기관 전용
        </p>
        <p
          style={{
            margin: '0 0 8px',
            fontSize: 14,
            color: '#111111',
            fontWeight: 700,
            lineHeight: 1.4,
          }}
        >
          여성기업인증 수의계약 · 공공입찰 가산점
        </p>
        <p
          style={{
            margin: '0 0 14px',
            fontSize: 13,
            color: '#666666',
            lineHeight: 1.65,
          }}
        >
          예산 규모·집행 목적·일정을 알려주시면<br />
          맞춤 제안서를 바로 드립니다.
        </p>
        <a
          href="mailto:gov@oohlab.co.kr"
          style={{
            fontSize: 12,
            color: '#F37021',
            textDecoration: 'none',
            fontWeight: 700,
            letterSpacing: '0.04em',
          }}
        >
          gov@oohlab.co.kr →
        </a>
      </div>
    </div>
  )
}
