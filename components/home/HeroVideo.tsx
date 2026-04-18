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
      {/* ── 포스터 이미지 (항상 최하단 — 즉시 표시) ── */}
      {data.videoPoster && (
        // eslint-disable-next-line @next/next/no-img-element
        <img
          src={data.videoPoster}
          alt=""
          aria-hidden="true"
          style={{
            position: 'absolute',
            inset: 0,
            width: '100%',
            height: '100%',
            objectFit: 'cover',
            zIndex: 1,
          }}
        />
      )}

      {/* ── 유튜브 배경 영상 ── */}
      {data.youtubeId && (
        <div
          aria-hidden="true"
          style={{
            position: 'absolute',
            top: '50%',
            left: '50%',
            width: '177.78vh',
            height: '56.25vw',
            minWidth: '100%',
            minHeight: '100%',
            transform: 'translate(-50%, -50%)',
            zIndex: 2,
            pointerEvents: 'none',
          }}
        >
          <iframe
            src={`https://www.youtube.com/embed/${data.youtubeId}?autoplay=1&mute=1&loop=1&playlist=${data.youtubeId}&controls=0&showinfo=0&rel=0&modestbranding=1&playsinline=1&enablejsapi=1`}
            allow="autoplay; encrypted-media"
            allowFullScreen={false}
            title="배경 영상"
            style={{
              width: '100%',
              height: '100%',
              border: 'none',
              pointerEvents: 'none',
            }}
          />
        </div>
      )}

      {/* ── 로컬 WebM (유튜브 없을 때) ── */}
      {!data.youtubeId && data.video && (
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
            zIndex: 2,
          }}
        >
          <source src={data.video} type="video/webm" />
          <source src={data.videoMp4} type="video/mp4" />
        </video>
      )}

      {/* ── 그라디언트: 왼쪽 텍스트 영역만 어둡게, 오른쪽은 영상 보이게 ── */}
      <div
        aria-hidden="true"
        style={{
          position: 'absolute',
          inset: 0,
          background:
            'linear-gradient(105deg, rgba(10,11,18,0.92) 0%, rgba(10,11,18,0.80) 35%, rgba(10,11,18,0.45) 60%, rgba(10,11,18,0.15) 100%)',
          zIndex: 3,
        }}
      />
      {/* 하단 그라디언트 (섹션 전환부 자연스럽게) */}
      <div
        aria-hidden="true"
        style={{
          position: 'absolute',
          bottom: 0,
          left: 0,
          right: 0,
          height: '30%',
          background:
            'linear-gradient(to top, rgba(10,11,18,0.7) 0%, transparent 100%)',
          zIndex: 3,
        }}
      />

      {/* ── 콘텐츠 ── */}
      <div
        style={{
          position: 'relative',
          zIndex: 4,
          width: '100%',
          maxWidth: 1200,
          margin: '0 auto',
          padding: '0 clamp(24px, 6vw, 100px)',
        }}
      >
        {/* 여성기업인증 배지 */}
        <div
          style={{
            display: 'inline-flex',
            alignItems: 'center',
            gap: 10,
            padding: '7px 16px 7px 10px',
            background: 'rgba(243,112,33,0.12)',
            border: '1px solid rgba(243,112,33,0.35)',
            borderRadius: '100px',
            marginBottom: 32,
            animation: 'ooh-fadein 0.7s ease both',
            backdropFilter: 'blur(8px)',
            WebkitBackdropFilter: 'blur(8px)',
          }}
        >
          <div
            style={{
              width: 26,
              height: 26,
              borderRadius: '50%',
              background: 'linear-gradient(135deg, #F37021 0%, #FF9A3C 100%)',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              fontSize: 13,
              flexShrink: 0,
            }}
            aria-hidden="true"
          >
            ♀
          </div>
          <div>
            <p style={{ margin: 0, fontSize: 9, fontWeight: 700, letterSpacing: '0.14em', textTransform: 'uppercase', color: '#F37021', lineHeight: 1 }}>
              {data.womenCertHero.label}
            </p>
            <p style={{ margin: '3px 0 0', fontSize: 11, color: 'rgba(255,255,255,0.85)', lineHeight: 1 }}>
              {data.womenCertHero.highlight}
            </p>
          </div>
        </div>

        {/* 메인 슬로건 */}
        <h1
          style={{
            margin: '0 0 20px',
            fontSize: 'clamp(36px, 5.5vw, 76px)',
            fontWeight: 900,
            color: '#FFFFFF',
            lineHeight: 1.08,
            letterSpacing: '-0.03em',
            fontFamily: "'Pretendard', sans-serif",
            maxWidth: 700,
            animation: 'ooh-fadein 0.7s 0.12s ease both',
          }}
        >
          <TypewriterSlogan text={data.slogan} />
        </h1>

        {/* 서브 슬로건 */}
        <p
          style={{
            margin: '0 0 48px',
            fontSize: 'clamp(15px, 1.6vw, 19px)',
            color: 'rgba(255,255,255,0.72)',
            letterSpacing: '0.01em',
            lineHeight: 1.7,
            maxWidth: 480,
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
            marginBottom: 56,
            animation: 'ooh-fadein 0.7s 0.55s ease both',
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
                      boxShadow: '0 4px 24px rgba(243,112,33,0.45)',
                    }
                  : {
                      display: 'inline-flex',
                      alignItems: 'center',
                      gap: 8,
                      padding: '15px 32px',
                      background: 'rgba(255,255,255,0.08)',
                      color: '#FFFFFF',
                      fontWeight: 600,
                      fontSize: 15,
                      borderRadius: '8px',
                      border: '1px solid rgba(255,255,255,0.25)',
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

        {/* 실적 수치 스트립 */}
        <div
          style={{
            display: 'flex',
            gap: 'clamp(24px, 4vw, 56px)',
            flexWrap: 'wrap',
            animation: 'ooh-fadein 0.7s 0.75s ease both',
            opacity: 0,
          }}
        >
          {[
            { num: '15', unit: '년', label: '업력' },
            { num: '45+', unit: '개', label: '매체 파트너' },
            { num: '800+', unit: '건', label: '집행 사례' },
          ].map((stat) => (
            <div key={stat.label} style={{ display: 'flex', alignItems: 'baseline', gap: 8 }}>
              <span
                style={{
                  fontSize: 'clamp(28px, 3vw, 40px)',
                  fontWeight: 900,
                  color: '#FFFFFF',
                  letterSpacing: '-0.03em',
                  fontFamily: "'Pretendard', sans-serif",
                  fontVariantNumeric: 'tabular-nums',
                  lineHeight: 1,
                }}
              >
                {stat.num}
                <span style={{ fontSize: '0.5em', color: '#F37021', marginLeft: 1 }}>{stat.unit}</span>
              </span>
              <span
                style={{
                  fontSize: 11,
                  color: 'rgba(255,255,255,0.45)',
                  letterSpacing: '0.1em',
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
          animation: 'ooh-fadein 1s 1.2s ease both',
          opacity: 0,
        }}
      >
        <span style={{ fontSize: 9, letterSpacing: '0.2em', textTransform: 'uppercase', color: 'rgba(255,255,255,0.28)' }}>
          Scroll
        </span>
        <div
          style={{
            width: 1,
            height: 44,
            background: 'linear-gradient(to bottom, rgba(255,255,255,0.45) 0%, rgba(255,255,255,0) 100%)',
            animation: 'ooh-scroll-line 1.8s ease infinite',
          }}
        />
      </div>

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
        @media (prefers-reduced-motion: reduce) {
          * { animation-duration: 0.01ms !important; }
        }
      `}</style>
    </section>
  )
}
