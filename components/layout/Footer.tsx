import Link from 'next/link'

export function Footer() {
  const year = new Date().getFullYear()

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
            <span style={{ fontSize: 18, fontWeight: 300, color: '#FF4D00', letterSpacing: '0.05em' }}>LAB</span>
          </Link>
          <p style={{ margin: 0, fontSize: 12, color: 'rgba(255,255,255,0.3)', lineHeight: 1.6, maxWidth: 280 }}>
            말보다 행동으로 증명합니다.<br />
            여성기업인증 · 옥외광고 전문 대행사
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
          href="https://pf.kakao.com/_OOHLABchannel"
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
          © {year} OOH-LAB Co., Ltd. All rights reserved.
          <span style={{ margin: '0 8px', opacity: 0.4 }}>|</span>
          사업자등록번호: 000-00-00000
          <span style={{ margin: '0 8px', opacity: 0.4 }}>|</span>
          대표: 홍길동
          <span style={{ margin: '0 8px', opacity: 0.4 }}>|</span>
          서울특별시 강남구 테헤란로 000
        </p>
        <p style={{ margin: 0, fontSize: 11, color: 'rgba(255,255,255,0.18)' }}>
          <a href="/privacy" style={{ color: 'inherit', textDecoration: 'none' }}>개인정보처리방침</a>
        </p>
      </div>
    </footer>
  )
}
