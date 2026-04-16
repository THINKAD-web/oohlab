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

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 40)
    window.addEventListener('scroll', onScroll, { passive: true })
    return () => window.removeEventListener('scroll', onScroll)
  }, [])

  // 메뉴 열릴 때 스크롤 잠금
  useEffect(() => {
    document.body.style.overflow = menuOpen ? 'hidden' : ''
    return () => { document.body.style.overflow = '' }
  }, [menuOpen])

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
          background: scrolled
            ? 'rgba(10,10,10,0.92)'
            : 'transparent',
          backdropFilter: scrolled ? 'blur(16px)' : 'none',
          WebkitBackdropFilter: scrolled ? 'blur(16px)' : 'none',
          borderBottom: scrolled
            ? '1px solid rgba(255,255,255,0.06)'
            : 'none',
          transition: 'background 0.4s ease, backdrop-filter 0.4s ease, border-color 0.4s ease',
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
              color: '#FFFFFF',
              letterSpacing: '-0.03em',
              fontFamily: "'Pretendard', sans-serif",
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
          style={{
            display: 'flex',
            alignItems: 'center',
            gap: 40,
          }}
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
                color: pathname === item.href
                  ? '#FFFFFF'
                  : 'rgba(255,255,255,0.5)',
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
                    background: '#F37021',
                  }}
                />
              )}
            </Link>
          ))}
        </nav>

        {/* 데스크톱 CTA + 햄버거 */}
        <div style={{ display: 'flex', alignItems: 'center', gap: 12 }}>
          {/* CTA 버튼들 — 데스크톱만 */}
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
                borderRadius: '3px',
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
                color: 'rgba(255,255,255,0.6)',
                fontSize: 12,
                fontWeight: 500,
                borderRadius: '3px',
                border: '1px solid rgba(255,255,255,0.2)',
                textDecoration: 'none',
                letterSpacing: '0.05em',
                whiteSpace: 'nowrap',
              }}
            >
              기관 상담
            </Link>
          </div>

          {/* 햄버거 — 모바일 */}
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
            <span
              style={{
                display: 'block',
                width: 22,
                height: '1px',
                background: '#fff',
                transformOrigin: 'center',
                transition: 'transform 0.3s ease, opacity 0.3s ease',
                transform: menuOpen ? 'translateY(6px) rotate(45deg)' : 'none',
              }}
            />
            <span
              style={{
                display: 'block',
                width: 22,
                height: '1px',
                background: '#fff',
                transition: 'opacity 0.3s ease',
                opacity: menuOpen ? 0 : 1,
              }}
            />
            <span
              style={{
                display: 'block',
                width: 22,
                height: '1px',
                background: '#fff',
                transformOrigin: 'center',
                transition: 'transform 0.3s ease, opacity 0.3s ease',
                transform: menuOpen ? 'translateY(-6px) rotate(-45deg)' : 'none',
              }}
            />
          </button>
        </div>
      </header>

      {/* ── 모바일 풀스크린 메뉴 ── */}
      <div
        role="dialog"
        aria-modal="true"
        aria-label="모바일 메뉴"
        aria-hidden={!menuOpen}
        style={{
          position: 'fixed',
          inset: 0,
          zIndex: 800,
          background: '#0A0A0A',
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
                color: pathname === item.href ? '#F37021' : 'rgba(255,255,255,0.85)',
                textDecoration: 'none',
                lineHeight: 1.15,
                letterSpacing: '-0.02em',
                fontFamily: "'Pretendard', sans-serif",
                transform: menuOpen ? 'translateX(0)' : 'translateX(40px)',
                opacity: menuOpen ? 1 : 0,
                transition: `transform 0.5s ${0.1 + i * 0.07}s cubic-bezier(0.16,1,0.3,1), opacity 0.4s ${0.1 + i * 0.07}s ease`,
                paddingBottom: 8,
                borderBottom: '1px solid #1A1A1A',
                marginBottom: 16,
              }}
            >
              {item.label}
            </Link>
          ))}
        </nav>

        {/* 모바일 CTA */}
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
              borderRadius: '4px',
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
              color: 'rgba(255,255,255,0.6)',
              fontSize: 15,
              border: '1px solid rgba(255,255,255,0.15)',
              borderRadius: '4px',
              textDecoration: 'none',
              textAlign: 'center',
            }}
          >
            지자체·기관 상담하기
          </Link>
        </div>
      </div>

      {/* 반응형 CSS */}
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
