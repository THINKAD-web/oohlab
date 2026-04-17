import Link from 'next/link'
import { COMPANY } from '@/lib/company'

export function Footer() {
  const year = new Date().getFullYear()

  const legalParts = [
    COMPANY.businessNumber && `사업자등록번호: ${COMPANY.businessNumber}`,
    COMPANY.ceo && `대표: ${COMPANY.ceo}`,
    COMPANY.address,
  ].filter(Boolean) as string[]

  return (
    <footer
      role="contentinfo"
      style={{
        background: '#000',
        borderTop: '1px solid #141414',
        padding: 'clamp(40px, 5vw, 64px) clamp(24px, 6vw, 100px)',
      }}
    >
      <div
        style={{
          display: 'flex',
          justifyContent: 'space-between',
          alignItems: 'flex-start',
          gap: 32,
          flexWrap: 'wrap',
          marginBottom: 40,
        }}
      >
        {/* 로고 + 슬로건 */}
        <div>
          <Link href="/" style={{ textDecoration: 'none', display: 'flex', alignItems: 'center', gap: 8, marginBottom: 12 }}>
            <span style={{ fontSize: 18, fontWeight: 900, color: '#FFFFFF', letterSpacing: '-0.03em', fontFamily: "'Pretendard', sans-serif" }}>OOH</span>
            <span style={{ fontSize: 18, fontWeight: 300, color: '#F37021', letterSpacing: '0.05em' }}>LAB</span>
          </Link>
          <p style={{ margin: 0, fontSize: 12, color: 'rgba(255,255,255,0.3)', lineHeight: 1.6, maxWidth: 280 }}>
            {COMPANY.tagline}<br />
            {COMPANY.description}
          </p>
        </div>

        {/* 링크 */}
        <nav aria-label="하단 메뉴" style={{ display: 'flex', gap: 40, flexWrap: 'wrap' }}>
          {[
            { label: 'Home', href: '/' },
            { label: 'About', href: '/about' },
            { label: 'Works', href: '/works' },
            { label: 'Contact', href: '/contact' },
          ].map((item) => (
            <Link
              key={item.href}
              href={item.href}
              style={{ fontSize: 12, color: 'rgba(255,255,255,0.35)', textDecoration: 'none', letterSpacing: '0.08em', transition: 'color 0.2s' }}
            >
              {item.label}
            </Link>
          ))}
        </nav>

        {/* 카카오 CTA */}
        <a
          href={COMPANY.kakaoChannel}
          target="_blank"
          rel="noopener noreferrer"
          style={{
            display: 'inline-flex',
            alignItems: 'center',
            gap: 8,
            padding: '10px 18px',
            background: '#FAE100',
            color: '#191600',
            fontWeight: 700,
            fontSize: 12,
            borderRadius: '3px',
            textDecoration: 'none',
            letterSpacing: '0.03em',
            whiteSpace: 'nowrap',
          }}
        >
          💬 카카오톡 상담
        </a>
      </div>

      {/* 하단 법적 정보 */}
      <div
        style={{
          paddingTop: 24,
          borderTop: '1px solid #141414',
          display: 'flex',
          justifyContent: 'space-between',
          alignItems: 'center',
          gap: 16,
          flexWrap: 'wrap',
        }}
      >
        <p style={{ margin: 0, fontSize: 11, color: 'rgba(255,255,255,0.18)', lineHeight: 1.6 }}>
          © {year} {COMPANY.legalName}. All rights reserved.
          {legalParts.map((part, i) => (
            <span key={i}>
              <span style={{ margin: '0 8px', opacity: 0.4 }}>|</span>
              {part}
            </span>
          ))}
        </p>
        <p style={{ margin: 0, fontSize: 11, color: 'rgba(255,255,255,0.18)' }}>
          <Link href="/privacy" style={{ color: 'inherit', textDecoration: 'none' }}>개인정보처리방침</Link>
        </p>
      </div>
    </footer>
  )
}
