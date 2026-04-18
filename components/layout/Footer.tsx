import Link from 'next/link'
import { COMPANY } from '@/lib/company'

export function Footer() {
  const year = new Date().getFullYear()

  return (
    <footer
      role="contentinfo"
      style={{
        background: '#F0EDE6',
        borderTop: '1px solid #E8E4DB',
        padding: 'clamp(24px, 3vw, 36px) clamp(24px, 6vw, 100px)',
      }}
    >
      <div
        style={{
          display: 'flex',
          justifyContent: 'space-between',
          alignItems: 'center',
          gap: 24,
          flexWrap: 'wrap',
        }}
      >
        {/* 로고 */}
        <Link
          href="/"
          style={{ textDecoration: 'none', display: 'flex', alignItems: 'center', gap: 6 }}
        >
          <span
            style={{
              fontSize: 15,
              fontWeight: 900,
              color: '#111111',
              letterSpacing: '-0.03em',
              fontFamily: "'Pretendard', sans-serif",
            }}
          >
            OOH
          </span>
          <span style={{ fontSize: 15, fontWeight: 300, color: '#F37021', letterSpacing: '0.05em' }}>
            LAB
          </span>
        </Link>

        {/* 카카오 CTA */}
        <a
          href={COMPANY.kakaoChannel}
          target="_blank"
          rel="noopener noreferrer"
          style={{
            display: 'inline-flex',
            alignItems: 'center',
            gap: 6,
            padding: '8px 16px',
            background: '#FAE100',
            color: '#191600',
            fontWeight: 700,
            fontSize: 12,
            borderRadius: '6px',
            textDecoration: 'none',
            letterSpacing: '0.02em',
          }}
        >
          💬 카카오톡 상담
        </a>
      </div>

      {/* 하단 */}
      <div
        style={{
          marginTop: 16,
          paddingTop: 16,
          borderTop: '1px solid #E0DBD2',
          display: 'flex',
          justifyContent: 'space-between',
          alignItems: 'center',
          gap: 12,
          flexWrap: 'wrap',
        }}
      >
        <p style={{ margin: 0, fontSize: 11, color: '#AAAAAA' }}>
          © {year} {COMPANY.legalName}. All rights reserved.
        </p>
        <Link
          href="/privacy"
          style={{ fontSize: 11, color: '#AAAAAA', textDecoration: 'none' }}
        >
          개인정보처리방침
        </Link>
      </div>
    </footer>
  )
}
