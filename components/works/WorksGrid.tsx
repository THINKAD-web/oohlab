'use client'

import { useState, useRef, useEffect, useCallback } from 'react'
import Image from 'next/image'
import type { Work, MediaType, ClientType } from '@/lib/types'

// ──────────────────────────────
//  필터 설정
// ──────────────────────────────
const MEDIA_TYPES: Array<{ label: string; value: MediaType | 'ALL' }> = [
  { label: '전체', value: 'ALL' },
  { label: 'DOOH', value: 'DOOH' },
  { label: '빌보드', value: '빌보드' },
  { label: '버스쉘터', value: '버스쉘터' },
  { label: '지하철', value: '지하철' },
  { label: '미디어믹스', value: '미디어믹스' },
]

// ──────────────────────────────
//  WorkModal (풀스크린)
// ──────────────────────────────
function WorkModal({ work, onClose }: { work: Work; onClose: () => void }) {
  const videoRef = useRef<HTMLVideoElement>(null)

  // ESC 닫기
  useEffect(() => {
    const onKey = (e: KeyboardEvent) => { if (e.key === 'Escape') onClose() }
    window.addEventListener('keydown', onKey)
    document.body.style.overflow = 'hidden'
    return () => {
      window.removeEventListener('keydown', onKey)
      document.body.style.overflow = ''
    }
  }, [onClose])

  // 영상 자동재생
  useEffect(() => {
    if (work.videoFull && videoRef.current) {
      videoRef.current.play().catch(() => {})
    }
  }, [work.videoFull])

  return (
    <div
      role="dialog"
      aria-modal="true"
      aria-label={`${work.title} 상세 정보`}
      style={{
        position: 'fixed',
        inset: 0,
        zIndex: 1000,
        background: '#000',
        display: 'flex',
        flexDirection: 'column',
        overflowY: 'auto',
        animation: 'ooh-modal-in 0.45s cubic-bezier(0.16,1,0.3,1) both',
      }}
    >
      {/* 닫기 버튼 */}
      <button
        onClick={onClose}
        aria-label="닫기"
        style={{
          position: 'fixed',
          top: 24,
          right: 24,
          zIndex: 10,
          width: 44,
          height: 44,
          borderRadius: '50%',
          background: 'rgba(255,255,255,0.08)',
          border: '1px solid rgba(255,255,255,0.15)',
          color: '#fff',
          fontSize: 20,
          cursor: 'pointer',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
          backdropFilter: 'blur(10px)',
          transition: 'background 0.2s',
        }}
      >
        ✕
      </button>

      {/* 히어로 영상/이미지 */}
      <div style={{ position: 'relative', width: '100%', height: '65vh', minHeight: 320 }}>
        {work.videoFull ? (
          <video
            ref={videoRef}
            loop
            muted
            playsInline
            controls
            style={{ width: '100%', height: '100%', objectFit: 'cover' }}
          >
            <source src={work.videoFull} type="video/webm" />
          </video>
        ) : (
          <Image
            src={work.heroImage}
            alt={work.title}
            fill
            priority
            style={{ objectFit: 'cover' }}
          />
        )}
        <div
          aria-hidden="true"
          style={{
            position: 'absolute',
            bottom: 0,
            left: 0,
            right: 0,
            height: '40%',
            background: 'linear-gradient(to top, #000 0%, transparent 100%)',
          }}
        />
      </div>

      {/* 콘텐츠 */}
      <div
        style={{
          padding: 'clamp(32px, 5vw, 72px) clamp(24px, 8vw, 120px)',
          maxWidth: 960,
        }}
      >
        {/* 배지 */}
        <div style={{ display: 'flex', gap: 8, marginBottom: 20, flexWrap: 'wrap' }}>
          <span
            style={{
              padding: '4px 12px',
              background: 'rgba(255,255,255,0.08)',
              border: '1px solid rgba(255,255,255,0.12)',
              borderRadius: '2px',
              fontSize: 11,
              letterSpacing: '0.12em',
              textTransform: 'uppercase',
              color: 'rgba(255,255,255,0.6)',
            }}
          >
            {work.mediaType}
          </span>
          {work.isWomenCertProject && (
            <span
              style={{
                padding: '4px 12px',
                background: 'rgba(255,77,0,0.15)',
                border: '1px solid rgba(255,77,0,0.4)',
                borderRadius: '2px',
                fontSize: 11,
                letterSpacing: '0.12em',
                textTransform: 'uppercase',
                color: '#FF4D00',
                fontWeight: 700,
              }}
            >
              여성기업 인증 프로젝트
            </span>
          )}
          {work.isGovernment && (
            <span
              style={{
                padding: '4px 12px',
                background: 'rgba(255,255,255,0.06)',
                border: '1px solid rgba(255,255,255,0.12)',
                borderRadius: '2px',
                fontSize: 11,
                letterSpacing: '0.12em',
                textTransform: 'uppercase',
                color: 'rgba(255,255,255,0.5)',
              }}
            >
              지자체·공공기관
            </span>
          )}
        </div>

        <h2
          style={{
            margin: '0 0 16px',
            fontSize: 'clamp(24px, 4vw, 48px)',
            fontWeight: 800,
            color: '#fff',
            letterSpacing: '-0.02em',
            lineHeight: 1.1,
            fontFamily: "'Pretendard', sans-serif",
          }}
        >
          {work.title}
        </h2>

        <p
          style={{
            margin: '0 0 48px',
            fontSize: 16,
            color: 'rgba(255,255,255,0.55)',
            lineHeight: 1.7,
          }}
        >
          {work.story}
        </p>

        {/* 성과 지표 4개 */}
        <div
          style={{
            display: 'grid',
            gridTemplateColumns: 'repeat(auto-fit, minmax(160px, 1fr))',
            gap: '1px',
            background: '#1E1E1E',
            border: '1px solid #1E1E1E',
            marginBottom: 48,
          }}
        >
          {[
            { label: '총 노출수', value: work.stats.impressions },
            { label: '집행 기간', value: work.stats.duration },
            { label: '집행 지역', value: work.stats.locations },
            { label: '핵심 성과', value: work.stats.result },
          ].map((stat) => (
            <div
              key={stat.label}
              style={{ padding: '28px 24px', background: '#0D0D0D' }}
            >
              <p
                style={{
                  margin: '0 0 8px',
                  fontSize: 11,
                  letterSpacing: '0.15em',
                  textTransform: 'uppercase',
                  color: 'rgba(255,255,255,0.35)',
                }}
              >
                {stat.label}
              </p>
              <p
                style={{
                  margin: 0,
                  fontSize: 'clamp(16px, 2vw, 22px)',
                  fontWeight: 700,
                  color: '#FF4D00',
                  lineHeight: 1.2,
                  fontFamily: "'Pretendard', sans-serif",
                }}
              >
                {stat.value}
              </p>
            </div>
          ))}
        </div>

        {/* SEO 링크 (숨김) + 문의 CTA */}
        <div style={{ display: 'flex', gap: 12, alignItems: 'center', flexWrap: 'wrap' }}>
          <a
            href={`/works/${work.slug}`}
            style={{
              fontSize: 12,
              color: 'rgba(255,255,255,0.2)',
              textDecoration: 'none',
              letterSpacing: '0.08em',
            }}
          >
            ↗ 상세 페이지
          </a>
          <a
            href="https://pf.kakao.com/_OOHLABchannel"
            target="_blank"
            rel="noopener noreferrer"
            style={{
              padding: '14px 28px',
              background: '#FF4D00',
              color: '#fff',
              fontSize: 14,
              fontWeight: 700,
              borderRadius: '4px',
              textDecoration: 'none',
              letterSpacing: '0.02em',
              transition: 'background 0.2s',
            }}
          >
            💬 이 캠페인 문의하기
          </a>
        </div>
      </div>

      <style>{`
        @keyframes ooh-modal-in {
          from { opacity: 0; transform: translateY(30px); }
          to   { opacity: 1; transform: translateY(0); }
        }
      `}</style>
    </div>
  )
}

// ──────────────────────────────
//  WorkCard
// ──────────────────────────────
function WorkCard({
  work,
  index,
  onClick,
}: {
  work: Work
  index: number
  onClick: () => void
}) {
  const cardRef = useRef<HTMLDivElement>(null)
  const videoRef = useRef<HTMLVideoElement>(null)
  const [hovered, setHovered] = useState(false)
  const [videoReady, setVideoReady] = useState(false)

  useEffect(() => {
    const el = cardRef.current
    if (!el) return
    async function animate() {
      const { gsap } = await import('gsap')
      const { ScrollTrigger } = await import('gsap/ScrollTrigger')
      gsap.registerPlugin(ScrollTrigger)
      gsap.fromTo(
        el,
        { opacity: 0, y: 36 },
        {
          opacity: 1, y: 0, duration: 0.8,
          delay: (index % 3) * 0.1,
          ease: 'power3.out',
          scrollTrigger: { trigger: el, start: 'top 88%', once: true },
        }
      )
    }
    animate()
  }, [index])

  useEffect(() => {
    const video = videoRef.current
    if (!video || !work.videoPreview) return
    const obs = new IntersectionObserver(
      ([e]) => {
        if (e.isIntersecting) {
          video.src = work.videoPreview!
          video.load()
          video.addEventListener('canplaythrough', () => setVideoReady(true), { once: true })
          obs.disconnect()
        }
      },
      { threshold: 0.3 }
    )
    obs.observe(video)
    return () => obs.disconnect()
  }, [work.videoPreview])

  useEffect(() => {
    const video = videoRef.current
    if (!video || !videoReady) return
    hovered ? video.play().catch(() => {}) : (video.pause(), (video.currentTime = 0))
  }, [hovered, videoReady])

  return (
    <div ref={cardRef} style={{ opacity: 0 }}>
      <button
        onClick={onClick}
        onMouseEnter={() => setHovered(true)}
        onMouseLeave={() => setHovered(false)}
        aria-label={`${work.title} 상세 보기`}
        data-cursor-pointer
        style={{
          display: 'block',
          width: '100%',
          border: 'none',
          padding: 0,
          background: 'none',
          cursor: 'pointer',
          textAlign: 'left',
        }}
      >
        <div
          style={{
            position: 'relative',
            aspectRatio: '4/3',
            overflow: 'hidden',
            background: '#111',
          }}
        >
          <div
            style={{
              position: 'absolute', inset: 0,
              transition: 'transform 0.7s cubic-bezier(0.16,1,0.3,1)',
              transform: hovered ? 'scale(1.05)' : 'scale(1)',
            }}
          >
            <Image
              src={work.thumbnail}
              alt={work.title}
              fill
              sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 33vw"
              style={{ objectFit: 'cover' }}
            />
          </div>
          {work.videoPreview && (
            <video
              ref={videoRef}
              muted loop playsInline
              style={{
                position: 'absolute', inset: 0, width: '100%', height: '100%',
                objectFit: 'cover', zIndex: 1,
                opacity: hovered && videoReady ? 1 : 0,
                transition: 'opacity 0.45s ease',
              }}
            />
          )}
          <div
            aria-hidden="true"
            style={{
              position: 'absolute', inset: 0, zIndex: 2,
              background: 'linear-gradient(to top, rgba(0,0,0,0.85) 0%, rgba(0,0,0,0.1) 55%, transparent 100%)',
            }}
          />
          {/* 배지 */}
          <div style={{ position: 'absolute', top: 12, left: 12, zIndex: 3, display: 'flex', gap: 6 }}>
            {work.isWomenCertProject && (
              <span style={{ padding: '3px 8px', background: '#FF4D00', color: '#fff', fontSize: 9, fontWeight: 700, letterSpacing: '0.1em', textTransform: 'uppercase', borderRadius: '2px' }}>
                여성기업
              </span>
            )}
            {work.isGovernment && (
              <span style={{ padding: '3px 8px', background: 'rgba(255,255,255,0.1)', color: 'rgba(255,255,255,0.75)', fontSize: 9, letterSpacing: '0.1em', textTransform: 'uppercase', borderRadius: '2px', backdropFilter: 'blur(6px)' }}>
                지자체
              </span>
            )}
          </div>
          {/* 호버 재생 아이콘 */}
          <div
            aria-hidden="true"
            style={{
              position: 'absolute', top: '50%', left: '50%',
              transform: `translate(-50%, -50%) scale(${hovered ? 1 : 0.6})`,
              opacity: hovered ? 1 : 0,
              transition: 'opacity 0.3s, transform 0.3s',
              zIndex: 3,
              width: 48, height: 48,
              borderRadius: '50%',
              background: 'rgba(255,77,0,0.9)',
              display: 'flex', alignItems: 'center', justifyContent: 'center',
            }}
          >
            <svg width="16" height="16" viewBox="0 0 16 16" fill="#fff"><path d="M4 2l10 6-10 6V2z"/></svg>
          </div>
        </div>

        {/* 텍스트 */}
        <div style={{ padding: '16px 4px 4px' }}>
          <p style={{ margin: '0 0 4px', fontSize: 10, letterSpacing: '0.15em', textTransform: 'uppercase', color: 'rgba(255,255,255,0.35)' }}>
            {work.mediaType} · {work.year}
          </p>
          <h3 style={{ margin: '0 0 4px', fontSize: 15, fontWeight: 700, color: '#fff', lineHeight: 1.25, fontFamily: "'Pretendard', sans-serif" }}>
            {work.title}
          </h3>
          <p style={{ margin: 0, fontSize: 12, color: '#FF4D00', fontWeight: 600, opacity: hovered ? 1 : 0, transition: 'opacity 0.3s' }}>
            {work.stats.result}
          </p>
        </div>
      </button>
    </div>
  )
}

// ──────────────────────────────
//  WorksGrid (메인 컴포넌트)
// ──────────────────────────────
interface Props {
  works: Work[]
}

export function WorksGrid({ works }: Props) {
  const [mediaFilter, setMediaFilter] = useState<MediaType | 'ALL'>('ALL')
  const [govOnly, setGovOnly] = useState(false)
  const [womenOnly, setWomenOnly] = useState(false)
  const [selectedWork, setSelectedWork] = useState<Work | null>(null)

  const filtered = works.filter((w) => {
    if (mediaFilter !== 'ALL' && w.mediaType !== mediaFilter) return false
    if (govOnly && !w.isGovernment) return false
    if (womenOnly && !w.isWomenCertProject) return false
    return true
  })

  return (
    <>
      {/* ── 필터 바 ── */}
      <div
        role="toolbar"
        aria-label="작업 필터"
        style={{
          display: 'flex',
          gap: 8,
          flexWrap: 'wrap',
          alignItems: 'center',
          marginBottom: 48,
          paddingBottom: 24,
          borderBottom: '1px solid #1E1E1E',
        }}
      >
        {/* 매체 유형 필터 */}
        {MEDIA_TYPES.map((t) => (
          <button
            key={t.value}
            onClick={() => setMediaFilter(t.value)}
            aria-pressed={mediaFilter === t.value}
            style={{
              padding: '8px 16px',
              background: mediaFilter === t.value ? '#FF4D00' : 'transparent',
              color: mediaFilter === t.value ? '#fff' : 'rgba(255,255,255,0.45)',
              border: `1px solid ${mediaFilter === t.value ? '#FF4D00' : 'rgba(255,255,255,0.12)'}`,
              borderRadius: '2px',
              fontSize: 12,
              fontWeight: mediaFilter === t.value ? 700 : 400,
              letterSpacing: '0.08em',
              cursor: 'pointer',
              transition: 'all 0.2s',
            }}
          >
            {t.label}
          </button>
        ))}

        {/* 구분선 */}
        <div style={{ width: 1, height: 24, background: '#1E1E1E', margin: '0 4px' }} />

        {/* 지자체 토글 */}
        <button
          onClick={() => setGovOnly(!govOnly)}
          aria-pressed={govOnly}
          style={{
            padding: '8px 16px',
            background: govOnly ? 'rgba(255,255,255,0.1)' : 'transparent',
            color: govOnly ? '#fff' : 'rgba(255,255,255,0.35)',
            border: `1px solid ${govOnly ? 'rgba(255,255,255,0.25)' : 'rgba(255,255,255,0.08)'}`,
            borderRadius: '2px',
            fontSize: 12,
            letterSpacing: '0.08em',
            cursor: 'pointer',
            transition: 'all 0.2s',
          }}
        >
          🏛 지자체 프로젝트
        </button>

        {/* 여성기업 토글 */}
        <button
          onClick={() => setWomenOnly(!womenOnly)}
          aria-pressed={womenOnly}
          style={{
            padding: '8px 16px',
            background: womenOnly ? 'rgba(255,77,0,0.15)' : 'transparent',
            color: womenOnly ? '#FF4D00' : 'rgba(255,255,255,0.35)',
            border: `1px solid ${womenOnly ? 'rgba(255,77,0,0.4)' : 'rgba(255,255,255,0.08)'}`,
            borderRadius: '2px',
            fontSize: 12,
            fontWeight: womenOnly ? 700 : 400,
            letterSpacing: '0.08em',
            cursor: 'pointer',
            transition: 'all 0.2s',
          }}
        >
          ♀ 여성기업 인증 프로젝트
        </button>
      </div>

      {/* ── 그리드 ── */}
      {filtered.length === 0 ? (
        <div style={{ textAlign: 'center', padding: '80px 0', color: 'rgba(255,255,255,0.3)', fontSize: 15 }}>
          해당 조건의 사례가 없습니다. 문의 주시면 바로 안내해 드립니다.
        </div>
      ) : (
        <div
          style={{
            display: 'grid',
            gridTemplateColumns: 'repeat(auto-fill, minmax(280px, 1fr))',
            gap: 24,
          }}
        >
          {filtered.map((work, i) => (
            <WorkCard
              key={work.id}
              work={work}
              index={i}
              onClick={() => setSelectedWork(work)}
            />
          ))}
        </div>
      )}

      {/* ── 하단 문구 ── */}
      <p
        style={{
          marginTop: 64,
          textAlign: 'center',
          fontSize: 14,
          color: 'rgba(255,255,255,0.3)',
          fontStyle: 'italic',
        }}
      >
        추가 사례는 문의 주시면 바로 PDF로 전달드립니다.
      </p>

      {/* ── 풀스크린 모달 ── */}
      {selectedWork && (
        <WorkModal work={selectedWork} onClose={() => setSelectedWork(null)} />
      )}
    </>
  )
}
