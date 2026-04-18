'use client'

import { useEffect, useRef, useState } from 'react'
import Link from 'next/link'
import type { HomeData } from '@/lib/types'

interface Props {
  data: HomeData['hero']
}

function TypewriterSlogan({ text }: { text: string }) {
  const [displayed, setDisplayed] = useState('')
  const [done, setDone] = useState(false)

  useEffect(() => {
    const startDelay = setTimeout(() => {
      let i = 0
      const interval = setInterval(() => {
        setDisplayed(text.slice(0, i + 1))
        i++
        if (i >= text.length) {
          clearInterval(interval)
          setDone(true)
        }
      }, 55)
      return () => clearInterval(interval)
    }, 400)
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
            width: '4px',
            height: '0.85em',
            backgroundColor: '#F37021',
            marginLeft: '4px',
            verticalAlign: 'middle',
            animation: 'ooh-cursor-blink 0.8s step-end infinite',
          }}
        />
      )}
    </span>
  )
}

function WomenCertBadge({ data }: { data: HomeData['hero']['womenCertHero'] }) {
  return (
    <div
      style={{
        display: 'inline-flex',
        alignItems: 'center',
        gap: '10px',
        padding: '8px 16px',
        background: 'rgba(243,112,33,0.1)',
        border: '1px solid rgba(243,112,33,0.3)',
        borderRadius: '100px',
        backdropFilter: 'blur(8px)',
        WebkitBackdropFilter: 'blur(8px)',
      }}
    >
      <div
        style={{
          width: 28,
          height: 28,
          borderRadius: '50%',
          background: 'linear-gradient(135deg, #F37021 0%, #FF9A3C 100%)',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
          flexShrink: 0,
          fontSize: 14,
        }}
        aria-hidden="true"
      >
        ♀
      </div>
      <div>
        <p style={{ margin: 0, fontSize: 10, fontWeight: 700, letterSpacing: '0.12em', textTransform: 'uppercase', color: '#F37021', lineHeight: 1 }}>
          {data.label}
        </p>
        <p style={{ margin: '3px 0 0', fontSize: 11, color: 'rgba(255,255,255,0.8)', lineHeight: 1.3, maxWidth: 220 }}>
          {data.highlight}
        </p>
      </div>
    </div>
  )
}

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
        minHeight: 640,
        overflow: 'hidden',
        background: '#0D0E16',
        display: 'flex',
        alignItems: 'center',
      }}
      aria-label="오랩 히어로 섹션"
    >
      {/* ── CSS 배경 — 항상 표시 (video 없을 때도 광고 느낌) ── */}
      <div
        aria-hidden="true"
        style={{
          position: 'absolute',
          inset: 0,
          background: 'radial-gradient(ellipse 90% 70% at 75% 20%, rgba(243,112,33,0.14) 0%, transparent 65%)',
          zIndex: 0,
        }}
      />
      <div
        aria-hidden="true"
        style={{
          position: 'absolute',
          inset: 0,
          backgroundImage:
            'linear-gradient(rgba(255,255,255,0.025) 1px, transparent 1px), linear-gradient(90deg, rgba(255,255,255,0.025) 1px, transparent 1px)',
          backgroundSize: '72px 72px',
          zIndex: 0,
        }}
      />
      {/* 오른쪽 상단 광고판 프레임 장식 */}
      <div
        aria-hidden="true"
        style={{
          position: 'absolute',
          top: '8%',
          right: '4%',
          width: 'clamp(120px, 18vw, 260px)',
          aspectRatio: '16/9',
          border: '2px solid rgba(243,112,33,0.25)',
          borderRadius: '4px',
          zIndex: 0,
          boxShadow: 'inset 0 0 40px rgba(243,112,33,0.04)',
        }}
      />
      <div
        aria-hidden="true"
        style={{
          position: 'absolute',
          top: 'calc(8% + clamp(80px, 12vw, 175px) + 16px)',
          right: 'calc(4% + clamp(20px, 3vw, 48px))',
          width: 'clamp(60px, 9vw, 130px)',
          aspectRatio: '9/16',
          border: '2px solid rgba(243,112,33,0.15)',
          borderRadius: '4px',
          zIndex: 0,
        }}
      />

      {/* ── 유튜브 배경 영상 (optional) ── */}
      {data.youtubeId && (
        <div
          aria-hidden="true"
          style={{
            position: 'absolute',
            top: '50%', left: '50%',
            width: '177.78vh', height: '56.25vw',
            minWidth: '100%', minHeight: '100%',
            transform: 'translate(-50%, -50%)',
            zIndex: 1, pointerEvents: 'none', opacity: 0.35,
          }}
        >
          <iframe
            src={`https://www.youtube.com/embed/${data.youtubeId}?autoplay=1&mute=1&loop=1&playlist=${data.youtubeId}&controls=0&showinfo=0&rel=0&modestbranding=1&playsinline=1`}
            allow="autoplay; encrypted-media"
            title="배경 영상"
            style={{ width: '100%', height: '100%', border: 'none', pointerEvents: 'none' }}
          />
        </div>
      )}

      {/* ── 로컬 영상 (optional) ── */}
      {!data.youtubeId && data.video && (
        <video
          ref={videoRef}
          autoPlay muted loop playsInline
          poster={data.videoPoster}
          style={{
            position: 'absolute', inset: 0,
            width: '100%', height: '100%', objectFit: 'cover',
            opacity: videoLoaded ? 0.35 : 0,
            transition: 'opacity 2s ease',
            zIndex: 1,
          }}
        >
          <source src={data.video} type="video/webm" />
          <source src={data.videoMp4} type="video/mp4" />
        </video>
      )}

      {/* ── 그라디언트 오버레이 ── */}
      <div
        aria-hidden="true"
        style={{
          position: 'absolute', inset: 0, zIndex: 2,
          background: 'linear-gradient(135deg, rgba(13,14,22,0.92) 0%, rgba(13,14,22,0.65) 60%, rgba(13,14,22,0.5) 100%)',
        }}
      />

      {/* ── 콘텐츠 레이어 ── */}
      <div
        style={{
          position: 'relative',
          zIndex: 3,
          width: '100%',
          maxWidth: 1200,
          margin: '0 auto',
          padding: '0 clamp(24px, 6vw, 100px)',
          display: 'grid',
          gridTemplateColumns: '1fr auto',
          gap: 'clamp(32px, 5vw, 72px)',
          alignItems: 'center',
        }}
      >
        {/* 왼쪽: 메인 카피 */}
        <div>
          {/* 여성기업인증 배지 */}
          <div
            style={{
              marginBottom: 36,
              animation: 'ooh-fadein 0.7s ease both',
            }}
          >
            <WomenCertBadge data={data.womenCertHero} />
          </div>

          {/* 메인 슬로건 */}
          <h1
            style={{
              margin: '0 0 20px',
              fontSize: 'clamp(40px, 6.5vw, 84px)',
              fontWeight: 900,
              color: '#FFFFFF',
              lineHeight: 1.05,
              letterSpacing: '-0.03em',
              fontFamily: "'Pretendard', sans-serif",
              animation: 'ooh-fadein 0.7s 0.12s ease both',
            }}
          >
            <TypewriterSlogan text={data.slogan} />
          </h1>

          {/* 서브 슬로건 */}
          <p
            style={{
              margin: '0 0 48px',
              fontSize: 'clamp(15px, 1.8vw, 20px)',
              color: 'rgba(255,255,255,0.68)',
              letterSpacing: '0.01em',
              lineHeight: 1.7,
              maxWidth: 500,
              animation: 'ooh-fadein 0.7s 0.35s ease both',
              opacity: 0,
            }}
          >
            {data.subSlogan}
          </p>

          {/* CTA 버튼 */}
          <div
            style={{
              display: 'flex',
              gap: 12,
              flexWrap: 'wrap',
              animation: 'ooh-fadein 0.7s 0.6s ease both',
              opacity: 0,
            }}
          >
            {data.cta.map((btn) => (
              <Link
                key={btn.label}
                href={btn.href}
                target={btn.type === 'kakao' ? '_blank' : undefined}
                rel={btn.type === 'kakao' ? 'noopener noreferrer' : undefined}
                style={
                  btn.style === 'primary'
                    ? {
                        display: 'inline-flex',
                        alignItems: 'center',
                        gap: 8,
                        padding: '16px 32px',
                        background: '#F37021',
                        color: '#fff',
                        fontWeight: 700,
                        fontSize: 15,
                        borderRadius: '8px',
                        textDecoration: 'none',
                        letterSpacing: '0.01em',
                        boxShadow: '0 4px 24px rgba(243,112,33,0.4)',
                      }
                    : {
                        display: 'inline-flex',
                        alignItems: 'center',
                        gap: 8,
                        padding: '16px 32px',
                        background: 'rgba(255,255,255,0.07)',
                        color: '#FFFFFF',
                        fontWeight: 600,
                        fontSize: 15,
                        borderRadius: '8px',
                        border: '1px solid rgba(255,255,255,0.2)',
                        textDecoration: 'none',
                        backdropFilter: 'blur(8px)',
                        WebkitBackdropFilter: 'blur(8px)',
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

        {/* 오른쪽: 실적 수치 패널 */}
        <div
          className="ooh-hero-stats"
          style={{
            display: 'flex',
            flexDirection: 'column',
            gap: 8,
            animation: 'ooh-fadein 0.7s 0.85s ease both',
            opacity: 0,
          }}
        >
          {[
            { num: '15', unit: '년', label: '업력' },
            { num: '45+', unit: '개', label: '매체 파트너' },
            { num: '800+', unit: '건', label: '집행 사례' },
          ].map((stat) => (
            <div
              key={stat.label}
              style={{
                padding: '22px 28px',
                background: 'rgba(255,255,255,0.04)',
                border: '1px solid rgba(255,255,255,0.08)',
                borderRadius: '12px',
                backdropFilter: 'blur(16px)',
                WebkitBackdropFilter: 'blur(16px)',
                minWidth: 148,
              }}
            >
              <span
                style={{
                  display: 'block',
                  fontSize: 'clamp(28px, 3.5vw, 42px)',
                  fontWeight: 900,
                  color: '#F37021',
                  letterSpacing: '-0.03em',
                  lineHeight: 1,
                  fontFamily: "'Pretendard', sans-serif",
                  fontVariantNumeric: 'tabular-nums',
                }}
              >
                {stat.num}
                <span
                  style={{
                    fontSize: '0.45em',
                    color: 'rgba(255,255,255,0.45)',
                    fontWeight: 400,
                    marginLeft: 2,
                  }}
                >
                  {stat.unit}
                </span>
              </span>
              <span
                style={{
                  display: 'block',
                  marginTop: 8,
                  fontSize: 10,
                  color: 'rgba(255,255,255,0.4)',
                  letterSpacing: '0.14em',
                  textTransform: 'uppercase',
                }}
              >
                {stat.label}
              </span>
            </div>
          ))}
        </div>
      </div>

      {/* ── 스크롤 인디케이터 ── */}
      <div
        aria-hidden="true"
        style={{
          position: 'absolute',
          bottom: 32,
          left: '50%',
          transform: 'translateX(-50%)',
          zIndex: 4,
          display: 'flex',
          flexDirection: 'column',
          alignItems: 'center',
          gap: 8,
          animation: 'ooh-fadein 1s 1.3s ease both',
          opacity: 0,
        }}
      >
        <span
          style={{
            fontSize: 9,
            letterSpacing: '0.2em',
            textTransform: 'uppercase',
            color: 'rgba(255,255,255,0.25)',
          }}
        >
          Scroll
        </span>
        <div
          style={{
            width: 1,
            height: 44,
            background:
              'linear-gradient(to bottom, rgba(255,255,255,0.45) 0%, rgba(255,255,255,0) 100%)',
            animation: 'ooh-scroll-line 1.8s ease infinite',
          }}
        />
      </div>

      {/* ── 글로벌 keyframes ── */}
      <style>{`
        @keyframes ooh-fadein {
          from { opacity: 0; transform: translateY(14px); }
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
        .ooh-hero-stats { display: flex; }
        @media (max-width: 800px) { .ooh-hero-stats { display: none !important; } }
        @media (prefers-reduced-motion: reduce) {
          * { animation-duration: 0.01ms !important; }
        }
      `}</style>
    </section>
  )
}
