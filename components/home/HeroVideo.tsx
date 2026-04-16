'use client'

import { useEffect, useRef, useState } from 'react'
import Link from 'next/link'
import type { HomeData } from '@/lib/types'

interface Props {
  data: HomeData['hero']
}

// ──────────────────────────────
//  ParticleOverlay (경량 CSS 기반)
//  Canvas 대신 CSS animation으로 LED 점멸 효과
//  GPU composite layer만 사용 — 성능 최우선
// ──────────────────────────────
function ParticleOverlay() {
  // 파티클 수를 최소화 (30개), requestAnimationFrame 없이 CSS-only
  const particles = Array.from({ length: 30 }, (_, i) => ({
    id: i,
    top: `${Math.random() * 100}%`,
    left: `${Math.random() * 100}%`,
    size: Math.random() > 0.7 ? 2 : 1,
    delay: `${(Math.random() * 6).toFixed(2)}s`,
    duration: `${(3 + Math.random() * 5).toFixed(2)}s`,
  }))

  return (
    <div
      aria-hidden="true"
      style={{
        position: 'absolute',
        inset: 0,
        pointerEvents: 'none',
        zIndex: 2,
        overflow: 'hidden',
      }}
    >
      <style>{`
        @keyframes ooh-blink {
          0%, 100% { opacity: 0; }
          50% { opacity: 1; }
        }
      `}</style>
      {particles.map((p) => (
        <span
          key={p.id}
          style={{
            position: 'absolute',
            top: p.top,
            left: p.left,
            width: p.size,
            height: p.size,
            borderRadius: '50%',
            backgroundColor: 'rgba(255,255,255,0.55)',
            animation: `ooh-blink ${p.duration} ${p.delay} ease-in-out infinite`,
          }}
        />
      ))}
    </div>
  )
}

// ──────────────────────────────
//  TypewriterSlogan
// ──────────────────────────────
function TypewriterSlogan({ text }: { text: string }) {
  const [displayed, setDisplayed] = useState('')
  const [done, setDone] = useState(false)

  useEffect(() => {
    // 500ms 지연 후 타이핑 시작 (영상 로드 여유)
    const startDelay = setTimeout(() => {
      let i = 0
      const interval = setInterval(() => {
        setDisplayed(text.slice(0, i + 1))
        i++
        if (i >= text.length) {
          clearInterval(interval)
          setDone(true)
        }
      }, 60)
      return () => clearInterval(interval)
    }, 500)
    return () => clearTimeout(startDelay)
  }, [text])

  return (
    <span>
      {displayed}
      {!done && (
        <span
          aria-hidden="true"
          style={{
            display: 'inline-block',
            width: '3px',
            height: '1em',
            backgroundColor: '#FF4D00',
            marginLeft: '4px',
            verticalAlign: 'middle',
            animation: 'ooh-cursor-blink 0.8s step-end infinite',
          }}
        />
      )}
    </span>
  )
}

// ──────────────────────────────
//  WomenCertBadge (Hero 전용)
//  3D hover 애니메이션 — CSS perspective
// ──────────────────────────────
function WomenCertBadge({ data }: { data: HomeData['hero']['womenCertHero'] }) {
  const [tilt, setTilt] = useState({ x: 0, y: 0 })
  const [hovered, setHovered] = useState(false)

  const onMove = (e: React.MouseEvent<HTMLDivElement>) => {
    const rect = e.currentTarget.getBoundingClientRect()
    const cx = rect.left + rect.width / 2
    const cy = rect.top + rect.height / 2
    const dx = ((e.clientX - cx) / (rect.width / 2)) * 12
    const dy = ((e.clientY - cy) / (rect.height / 2)) * -12
    setTilt({ x: dy, y: dx })
  }

  return (
    <div
      onMouseMove={onMove}
      onMouseEnter={() => setHovered(true)}
      onMouseLeave={() => { setTilt({ x: 0, y: 0 }); setHovered(false) }}
      style={{
        perspective: '600px',
        display: 'inline-block',
        cursor: 'default',
      }}
    >
      <div
        style={{
          transform: `rotateX(${tilt.x}deg) rotateY(${tilt.y}deg) scale(${hovered ? 1.08 : 1})`,
          transition: hovered
            ? 'transform 0.1s ease-out'
            : 'transform 0.5s cubic-bezier(0.16,1,0.3,1)',
          display: 'flex',
          alignItems: 'center',
          gap: '12px',
          padding: '10px 18px',
          background: 'rgba(255,255,255,0.08)',
          border: '1px solid rgba(255,255,255,0.25)',
          borderRadius: '8px',
          backdropFilter: 'blur(12px)',
          WebkitBackdropFilter: 'blur(12px)',
        }}
      >
        {/* 배지 이미지 또는 fallback 아이콘 */}
        <div
          style={{
            width: 36,
            height: 36,
            borderRadius: '50%',
            background: 'linear-gradient(135deg, #FF4D00 0%, #FF8C42 100%)',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            flexShrink: 0,
            fontSize: 18,
          }}
          aria-hidden="true"
        >
          ♀
        </div>
        <div>
          <p
            style={{
              margin: 0,
              fontSize: 11,
              fontWeight: 600,
              letterSpacing: '0.12em',
              textTransform: 'uppercase',
              color: '#FF4D00',
              lineHeight: 1,
            }}
          >
            {data.label}
          </p>
          <p
            style={{
              margin: '4px 0 0',
              fontSize: 12,
              color: 'rgba(255,255,255,0.85)',
              lineHeight: 1.3,
              maxWidth: 200,
            }}
          >
            {data.highlight}
          </p>
        </div>
        {/* 반짝이 효과 */}
        {hovered && (
          <div
            aria-hidden="true"
            style={{
              position: 'absolute',
              inset: 0,
              borderRadius: '8px',
              background:
                'linear-gradient(135deg, rgba(255,77,0,0.15) 0%, transparent 60%)',
              pointerEvents: 'none',
            }}
          />
        )}
      </div>
    </div>
  )
}

// ──────────────────────────────
//  HeroVideo (메인)
// ──────────────────────────────
export function HeroVideo({ data }: Props) {
  const videoRef = useRef<HTMLVideoElement>(null)
  const [videoLoaded, setVideoLoaded] = useState(false)

  useEffect(() => {
    const video = videoRef.current
    if (!video) return
    video.addEventListener('canplaythrough', () => setVideoLoaded(true))
  }, [])

  return (
    <section
      style={{
        position: 'relative',
        width: '100%',
        height: '100svh',
        minHeight: 600,
        overflow: 'hidden',
        background: '#0A0A0A',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
      }}
      aria-label="오랩 히어로 섹션"
    >
      {/* ── 배경 영상 ── */}
      <video
        ref={videoRef}
        autoPlay
        muted
        loop
        playsInline
        poster={data.videoPoster}
        style={{
          position: 'absolute',
          inset: 0,
          width: '100%',
          height: '100%',
          objectFit: 'cover',
          opacity: videoLoaded ? 1 : 0,
          transition: 'opacity 1.5s ease',
          zIndex: 1,
        }}
      >
        <source src={data.video} type="video/webm" />
        <source src={data.videoMp4} type="video/mp4" />
      </video>

      {/* ── 그라디언트 오버레이 ── */}
      <div
        aria-hidden="true"
        style={{
          position: 'absolute',
          inset: 0,
          background:
            'linear-gradient(to bottom, rgba(10,10,10,0.3) 0%, rgba(10,10,10,0.55) 50%, rgba(10,10,10,0.8) 100%)',
          zIndex: 3,
        }}
      />

      {/* ── LED Particle Overlay ── */}
      <ParticleOverlay />

      {/* ── 콘텐츠 레이어 ── */}
      <div
        style={{
          position: 'relative',
          zIndex: 4,
          textAlign: 'center',
          padding: '0 24px',
          maxWidth: 900,
          width: '100%',
        }}
      >
        {/* 여성기업인증 배지 */}
        <div
          style={{
            display: 'flex',
            justifyContent: 'center',
            marginBottom: 36,
            animation: 'ooh-fadein 0.8s ease both',
          }}
        >
          <WomenCertBadge data={data.womenCertHero} />
        </div>

        {/* 메인 슬로건 */}
        <h1
          style={{
            margin: '0 0 20px',
            fontSize: 'clamp(28px, 5.5vw, 68px)',
            fontWeight: 800,
            color: '#FFFFFF',
            lineHeight: 1.1,
            letterSpacing: '-0.02em',
            fontFamily: "'Pretendard', sans-serif",
            animation: 'ooh-fadein 0.8s 0.2s ease both',
          }}
        >
          <TypewriterSlogan text={data.slogan} />
        </h1>

        {/* 서브 슬로건 */}
        <p
          style={{
            margin: '0 0 48px',
            fontSize: 'clamp(14px, 2vw, 20px)',
            color: 'rgba(255,255,255,0.65)',
            letterSpacing: '0.01em',
            fontWeight: 400,
            animation: 'ooh-fadein 0.8s 0.5s ease both',
            opacity: 0,
          }}
        >
          {data.subSlogan}
        </p>

        {/* CTA 버튼 */}
        <div
          style={{
            display: 'flex',
            gap: 16,
            justifyContent: 'center',
            flexWrap: 'wrap',
            animation: 'ooh-fadein 0.8s 0.8s ease both',
            opacity: 0,
          }}
        >
          {data.cta.map((btn) => (
            <Link
              key={btn.label}
              href={btn.href}
              target={btn.type === 'kakao' ? '_blank' : undefined}
              rel={btn.type === 'kakao' ? 'noopener noreferrer' : undefined}
              data-cursor-pointer
              style={
                btn.style === 'primary'
                  ? {
                      display: 'inline-flex',
                      alignItems: 'center',
                      gap: 8,
                      padding: '16px 32px',
                      background: '#FF4D00',
                      color: '#fff',
                      fontWeight: 700,
                      fontSize: 15,
                      borderRadius: '4px',
                      textDecoration: 'none',
                      letterSpacing: '0.01em',
                      transition: 'background 0.2s, transform 0.2s',
                    }
                  : {
                      display: 'inline-flex',
                      alignItems: 'center',
                      gap: 8,
                      padding: '16px 32px',
                      background: 'transparent',
                      color: '#fff',
                      fontWeight: 600,
                      fontSize: 15,
                      borderRadius: '4px',
                      border: '1px solid rgba(255,255,255,0.4)',
                      textDecoration: 'none',
                      letterSpacing: '0.01em',
                      transition: 'border-color 0.2s, background 0.2s',
                    }
              }
            >
              {btn.type === 'kakao' && (
                <span aria-hidden="true" style={{ fontSize: 16 }}>💬</span>
              )}
              {btn.label}
            </Link>
          ))}
        </div>
      </div>

      {/* ── 스크롤 인디케이터 ── */}
      <div
        aria-hidden="true"
        style={{
          position: 'absolute',
          bottom: 36,
          left: '50%',
          transform: 'translateX(-50%)',
          zIndex: 4,
          display: 'flex',
          flexDirection: 'column',
          alignItems: 'center',
          gap: 8,
          animation: 'ooh-fadein 1s 1.2s ease both',
          opacity: 0,
        }}
      >
        <span
          style={{
            fontSize: 11,
            letterSpacing: '0.18em',
            textTransform: 'uppercase',
            color: 'rgba(255,255,255,0.35)',
          }}
        >
          Scroll
        </span>
        <div
          style={{
            width: 1,
            height: 40,
            background:
              'linear-gradient(to bottom, rgba(255,255,255,0.5) 0%, rgba(255,255,255,0) 100%)',
            animation: 'ooh-scroll-line 1.8s ease infinite',
          }}
        />
      </div>

      {/* ── 글로벌 keyframes ── */}
      <style>{`
        @keyframes ooh-fadein {
          from { opacity: 0; transform: translateY(16px); }
          to   { opacity: 1; transform: translateY(0); }
        }
        @keyframes ooh-cursor-blink {
          0%, 100% { opacity: 1; }
          50%       { opacity: 0; }
        }
        @keyframes ooh-scroll-line {
          0%   { transform: scaleY(0); transform-origin: top; }
          50%  { transform: scaleY(1); transform-origin: top; }
          51%  { transform: scaleY(1); transform-origin: bottom; }
          100% { transform: scaleY(0); transform-origin: bottom; }
        }
        @media (prefers-reduced-motion: reduce) {
          * { animation-duration: 0.01ms !important; }
        }
      `}</style>
    </section>
  )
}
