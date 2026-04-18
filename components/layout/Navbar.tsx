'use client'

import { useState, useEffect } from 'react'
import Link from 'next/link'
import { usePathname } from 'next/navigation'

const NAV_ITEMS = [
  { label: 'Home', href: '/' },
  { label: 'About', href: '/about' },
  { label: 'Works', href: '/works' },
  { label: 'Contact', href: '/contact' },
]

export function Navbar() {
  const pathname = usePathname()
  const [scrolled, setScrolled] = useState(false)
  const [menuOpen, setMenuOpen] = useState(false)

  // 홈 페이지에서만 투명 → 스크롤 시 어두운 배경
  // 다른 페이지(크림 배경)는 항상 크림 배경 네비바
  const isHome = pathname === '/'
  const isDark = isHome && !scrolled

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 40)
    window.addEventListener('scroll', onScroll, { passive: true })
    return () => window.removeEventListener('scroll', onScroll)
  }, [])

  useEffect(() => {
    document.body.style.overflow = menuOpen ? 'hidden' : ''
    return () => { document.body.style.overflow = '' }
  }, [menuOpen])

  const navBg = isDark
    ? 'transparent'
    : isHome && scrolled
      ? 'rgba(13,14,22,0.92)'
      : 'rgba(248,245,240,0.95)'

  const navBorder = isDark
    ? 'none'
    : isHome && scrolled
      ? '1px solid rgba(255,255,255,0.08)'
      : '1px solid rgba(0,0,0,0.08)'

  const logoColor = isDark || (isHome && scrolled) ? '#FFFFFF' : '#111111'
  const linkColor = (active: boolean) => {
    if (isDark || (isHome && scrolled)) {
      return active ? '#FFFFFF' : 'rgba(255,255,255,0.7)'
    }
    return active ? '#111111' : '#666666'
  }
  const activeLine = '#F37021'

  return (
    <>
      <header
        role="banner"
        style={{
          position: 'fixed',
          top: 0,
          left: 0,
          right: 0,
          zIndex: 900,
          height: 64,
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'space-between',
          padding: '0 clamp(20px, 4vw, 64px)',
          background: navBg,
          backdropFilter: !isDark ? 'blur(16px)' : 'none',
          WebkitBackdropFilter: !isDark ? 'blur(16px)' : 'none',
          borderBottom: navBorder,
          transition: 'background 0.4s ease, border-color 0.4s ease',
        }}
      >
        {/* 로고 */}
        <Link
          href="/"
          aria-label="오랩 홈으로"
          style={{ textDecoration: 'none', display: 'flex', alignItems: 'center', gap: 8 }}
        >
          <span
            style={{
              fontSize: 20,
              fontWeight: 900,
              color: logoColor,
              letterSpacing: '-0.03em',
              fontFamily: "'Pretendard', sans-serif",
              transition: 'color 0.3s',
            }}
          >
            OOH
          </span>
          <span
            style={{
              fontSize: 20,
              fontWeight: 300,
              color: '#F37021',
              letterSpacing: '0.05em',
            }}
          >
            LAB
          </span>
        </Link>

        {/* 데스크톱 네비 */}
        <nav
          role="navigation"
          aria-label="주요 메뉴"
          style={{ display: 'flex', alignItems: 'center', gap: 40 }}
          className="ooh-desktop-nav"
        >
          {NAV_ITEMS.map((item) => (
            <Link
              key={item.href}
              href={item.href}
              data-cursor-pointer
              style={{
                fontSize: 13,
                fontWeight: pathname === item.href ? 600 : 400,
                color: linkColor(pathname === item.href),
                textDecoration: 'none',
                letterSpacing: '0.08em',
                transition: 'color 0.2s',
                position: 'relative',
              }}
            >
              {item.label}
              {pathname === item.href && (
                <span
                  aria-hidden="true"
                  style={{
                    position: 'absolute',
                    bottom: -4,
                    left: 0,
                    right: 0,
                    height: '1px',
                    background: activeLine,
                  }}
                />
              )}
            </Link>
          ))}
        </nav>

        {/* 데스크톱 CTA + 햄버거 */}
        <div style={{ display: 'flex', alignItems: 'center', gap: 12 }}>
          <div className="ooh-desktop-nav" style={{ display: 'flex', gap: 8 }}>
            <a
              href="https://pf.kakao.com/_OOHLABchannel"
              target="_blank"
              rel="noopener noreferrer"
              data-cursor-pointer
              style={{
                padding: '8px 16px',
                background: '#F37021',
                color: '#fff',
                fontSize: 12,
                fontWeight: 700,
                borderRadius: '6px',
                textDecoration: 'none',
                letterSpacing: '0.05em',
                whiteSpace: 'nowrap',
              }}
            >
              무료 제안 받기
            </a>
            <Link
              href="/contact?type=gov"
              data-cursor-pointer
              style={{
                padding: '8px 16px',
                background: 'transparent',
                color: isDark || (isHome && scrolled) ? 'rgba(255,255,255,0.7)' : '#666666',
                fontSize: 12,
                fontWeight: 500,
                borderRadius: '6px',
                border: isDark || (isHome && scrolled) ? '1px solid rgba(255,255,255,0.2)' : '1px solid #D8D3CB',
                textDecoration: 'none',
                letterSpacing: '0.05em',
                whiteSpace: 'nowrap',
                transition: 'color 0.3s, border-color 0.3s',
              }}
            >
              기관 상담
            </Link>
          </div>

          {/* 햄버거 */}
          <button
            onClick={() => setMenuOpen(!menuOpen)}
            aria-label={menuOpen ? '메뉴 닫기' : '메뉴 열기'}
            aria-expanded={menuOpen}
            className="ooh-mobile-menu-btn"
            style={{
              width: 40,
              height: 40,
              background: 'none',
              border: 'none',
              cursor: 'pointer',
              display: 'flex',
              flexDirection: 'column',
              alignItems: 'center',
              justifyContent: 'center',
              gap: 5,
              padding: 8,
            }}
          >
            {[
              { transform: menuOpen ? 'translateY(6px) rotate(45deg)' : 'none', opacity: 1 },
              { transform: 'none', opacity: menuOpen ? 0 : 1 },
              { transform: menuOpen ? 'translateY(-6px) rotate(-45deg)' : 'none', opacity: 1 },
            ].map((s, i) => (
              <span
                key={i}
                style={{
                  display: 'block',
                  width: 22,
                  height: '1px',
                  background: isDark ? '#fff' : '#111',
                  transformOrigin: 'center',
                  transition: 'transform 0.3s ease, opacity 0.3s ease',
                  transform: s.transform,
                  opacity: s.opacity,
                }}
              />
            ))}
          </button>
        </div>
      </header>

      {/* 모바일 풀스크린 메뉴 */}
      <div
        role="dialog"
        aria-modal="true"
        aria-label="모바일 메뉴"
        aria-hidden={!menuOpen}
        style={{
          position: 'fixed',
          inset: 0,
          zIndex: 800,
          background: '#F8F5F0',
          display: 'flex',
          flexDirection: 'column',
          justifyContent: 'center',
          padding: '80px clamp(32px, 8vw, 80px)',
          transform: menuOpen ? 'translateX(0)' : 'translateX(100%)',
          transition: 'transform 0.5s cubic-bezier(0.16,1,0.3,1)',
          pointerEvents: menuOpen ? 'auto' : 'none',
        }}
      >
        <nav aria-label="모바일 주요 메뉴">
          {NAV_ITEMS.map((item, i) => (
            <Link
              key={item.href}
              href={item.href}
              onClick={() => setMenuOpen(false)}
              style={{
                display: 'block',
                fontSize: 'clamp(36px, 9vw, 64px)',
                fontWeight: 800,
                color: pathname === item.href ? '#F37021' : '#111111',
                textDecoration: 'none',
                lineHeight: 1.15,
                letterSpacing: '-0.02em',
                fontFamily: "'Pretendard', sans-serif",
                transform: menuOpen ? 'translateX(0)' : 'translateX(40px)',
                opacity: menuOpen ? 1 : 0,
                transition: `transform 0.5s ${0.1 + i * 0.07}s cubic-bezier(0.16,1,0.3,1), opacity 0.4s ${0.1 + i * 0.07}s ease`,
                paddingBottom: 8,
                borderBottom: '1px solid #E8E4DB',
                marginBottom: 16,
              }}
            >
              {item.label}
            </Link>
          ))}
        </nav>

        <div
          style={{
            marginTop: 40,
            display: 'flex',
            flexDirection: 'column',
            gap: 12,
            transform: menuOpen ? 'translateX(0)' : 'translateX(40px)',
            opacity: menuOpen ? 1 : 0,
            transition: 'transform 0.5s 0.4s cubic-bezier(0.16,1,0.3,1), opacity 0.4s 0.4s ease',
          }}
        >
          <a
            href="https://pf.kakao.com/_OOHLABchannel"
            target="_blank"
            rel="noopener noreferrer"
            onClick={() => setMenuOpen(false)}
            style={{
              padding: '16px 24px',
              background: '#F37021',
              color: '#fff',
              fontSize: 15,
              fontWeight: 700,
              borderRadius: '8px',
              textDecoration: 'none',
              textAlign: 'center',
            }}
          >
            💬 무료 미디어 제안 받기
          </a>
          <Link
            href="/contact?type=gov"
            onClick={() => setMenuOpen(false)}
            style={{
              padding: '16px 24px',
              background: 'transparent',
              color: '#444444',
              fontSize: 15,
              border: '1px solid #D8D3CB',
              borderRadius: '8px',
              textDecoration: 'none',
              textAlign: 'center',
            }}
          >
            지자체·기관 상담하기
          </Link>
        </div>
      </div>

      <style>{`
        .ooh-desktop-nav { display: flex; }
        .ooh-mobile-menu-btn { display: none; }
        @media (max-width: 768px) {
          .ooh-desktop-nav { display: none !important; }
          .ooh-mobile-menu-btn { display: flex !important; }
        }
      `}</style>
    </>
  )
}
