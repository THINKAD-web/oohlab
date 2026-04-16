'use client'

import { useEffect, useRef, useState } from 'react'
import Link from 'next/link'
import Image from 'next/image'
import type { Work } from '@/lib/types'

interface CardProps {
  work: Work
  index: number
}

function WorkPreviewCard({ work, index }: CardProps) {
  const cardRef = useRef<HTMLDivElement>(null)
  const videoRef = useRef<HTMLVideoElement>(null)
  const [hovered, setHovered] = useState(false)
  const [videoReady, setVideoReady] = useState(false)

  // GSAP 스크롤 진입 애니메이션
  useEffect(() => {
    const el = cardRef.current
    if (!el) return
    async function animate() {
      const { gsap } = await import('gsap')
      const { ScrollTrigger } = await import('gsap/ScrollTrigger')
      gsap.registerPlugin(ScrollTrigger)
      gsap.fromTo(
        el,
        { opacity: 0, y: 50 },
        {
          opacity: 1, y: 0,
          duration: 1,
          delay: (index % 3) * 0.15,
          ease: 'power3.out',
          scrollTrigger: { trigger: el, start: 'top 85%', once: true },
        }
      )
    }
    animate()
  }, [index])

  // hover 시 영상 재생 (Intersection Observer로 lazy load)
  useEffect(() => {
    const video = videoRef.current
    if (!video || !work.videoPreview) return

    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          video.src = work.videoPreview!
          video.load()
          video.addEventListener('canplaythrough', () => setVideoReady(true), { once: true })
          observer.disconnect()
        }
      },
      { threshold: 0.2 }
    )
    observer.observe(video)
    return () => observer.disconnect()
  }, [work.videoPreview])

  useEffect(() => {
    const video = videoRef.current
    if (!video || !videoReady) return
    if (hovered) {
      video.play().catch(() => {/* 자동재생 정책 무시 */})
    } else {
      video.pause()
      video.currentTime = 0
    }
  }, [hovered, videoReady])

  const aspectRatio = index === 0 || index === 3 ? '3/4' : '4/3'

  return (
    <div
      ref={cardRef}
      style={{ opacity: 0 }} // GSAP 진입 전
    >
      <div
        onMouseEnter={() => setHovered(true)}
        onMouseLeave={() => setHovered(false)}
        style={{
          position: 'relative',
          aspectRatio,
          overflow: 'hidden',
          background: '#111',
          cursor: 'pointer',
        }}
      >
        {/* 썸네일 이미지 */}
        <div
          style={{
            position: 'absolute',
            inset: 0,
            transition: 'transform 0.7s cubic-bezier(0.16,1,0.3,1)',
            transform: hovered ? 'scale(1.06)' : 'scale(1)',
          }}
        >
          <Image
            src={work.thumbnail}
            alt={work.title}
            fill
            sizes="(max-width: 768px) 100vw, 33vw"
            style={{ objectFit: 'cover' }}
          />
        </div>

        {/* hover 영상 레이어 */}
        {work.videoPreview && (
          <video
            ref={videoRef}
            muted
            loop
            playsInline
            style={{
              position: 'absolute',
              inset: 0,
              width: '100%',
              height: '100%',
              objectFit: 'cover',
              opacity: hovered && videoReady ? 1 : 0,
              transition: 'opacity 0.5s ease',
              zIndex: 1,
            }}
          />
        )}

        {/* 하단 그라디언트 오버레이 */}
        <div
          aria-hidden="true"
          style={{
            position: 'absolute',
            inset: 0,
            background: 'linear-gradient(to top, rgba(10,10,10,0.88) 0%, rgba(10,10,10,0.1) 50%, transparent 100%)',
            zIndex: 2,
            transition: 'opacity 0.4s ease',
            opacity: hovered ? 0.7 : 1,
          }}
        />

        {/* 여성기업 / 지자체 배지 */}
        {(work.isGovernment || work.isWomenCertProject) && (
          <div
            style={{
              position: 'absolute',
              top: 16,
              left: 16,
              zIndex: 3,
              display: 'flex',
              gap: 6,
            }}
          >
            {work.isWomenCertProject && (
              <span
                style={{
                  padding: '4px 10px',
                  background: '#FF4D00',
                  color: '#fff',
                  fontSize: 10,
                  fontWeight: 700,
                  letterSpacing: '0.1em',
                  textTransform: 'uppercase',
                  borderRadius: '2px',
                }}
              >
                여성기업
              </span>
            )}
            {work.isGovernment && (
              <span
                style={{
                  padding: '4px 10px',
                  background: 'rgba(255,255,255,0.12)',
                  color: 'rgba(255,255,255,0.85)',
                  fontSize: 10,
                  fontWeight: 600,
                  letterSpacing: '0.1em',
                  textTransform: 'uppercase',
                  borderRadius: '2px',
                  backdropFilter: 'blur(8px)',
                }}
              >
                지자체
              </span>
            )}
          </div>
        )}

        {/* 카드 하단 텍스트 */}
        <div
          style={{
            position: 'absolute',
            bottom: 0,
            left: 0,
            right: 0,
            padding: '20px 20px 20px',
            zIndex: 3,
          }}
        >
          <p
            style={{
              margin: '0 0 6px',
              fontSize: 11,
              letterSpacing: '0.15em',
              textTransform: 'uppercase',
              color: 'rgba(255,255,255,0.45)',
            }}
          >
            {work.mediaType} · {work.year}
          </p>
          <h3
            style={{
              margin: 0,
              fontSize: 'clamp(15px, 2vw, 18px)',
              fontWeight: 700,
              color: '#fff',
              lineHeight: 1.25,
              fontFamily: "'Pretendard', sans-serif",
            }}
          >
            {work.title}
          </h3>
          {/* hover 시 성과 등장 */}
          <p
            style={{
              margin: '8px 0 0',
              fontSize: 13,
              color: '#FF4D00',
              fontWeight: 600,
              opacity: hovered ? 1 : 0,
              transform: hovered ? 'translateY(0)' : 'translateY(8px)',
              transition: 'opacity 0.35s ease, transform 0.35s ease',
            }}
          >
            {work.stats.result}
          </p>
        </div>
      </div>
    </div>
  )
}

interface Props {
  works: Work[]
}

export function WorksPreview({ works }: Props) {
  // 상위 6개만 표시
  const preview = works.filter((w) => w.isPublic).slice(0, 6)

  return (
    <section
      aria-label="대표 집행 사례"
      style={{
        background: '#0A0A0A',
        padding: 'clamp(80px, 10vw, 140px) 0',
      }}
    >
      {/* 섹션 헤더 */}
      <div
        style={{
          padding: '0 clamp(24px, 6vw, 100px)',
          marginBottom: 48,
          display: 'flex',
          alignItems: 'flex-end',
          justifyContent: 'space-between',
          gap: 24,
          flexWrap: 'wrap',
        }}
      >
        <div>
          <p
            style={{
              margin: '0 0 16px',
              fontSize: 11,
              letterSpacing: '0.22em',
              textTransform: 'uppercase',
              color: '#FF4D00',
              fontWeight: 600,
            }}
          >
            Selected Works
          </p>
          <h2
            style={{
              margin: 0,
              fontSize: 'clamp(28px, 4vw, 48px)',
              fontWeight: 800,
              color: '#FFFFFF',
              letterSpacing: '-0.02em',
              lineHeight: 1.1,
              fontFamily: "'Pretendard', sans-serif",
            }}
          >
            말이 아닌 결과.
          </h2>
        </div>
        <Link
          href="/works"
          data-cursor-pointer
          style={{
            fontSize: 13,
            color: 'rgba(255,255,255,0.45)',
            textDecoration: 'none',
            letterSpacing: '0.08em',
            display: 'flex',
            alignItems: 'center',
            gap: 6,
            transition: 'color 0.2s',
            whiteSpace: 'nowrap',
          }}
        >
          전체 사례 보기
          <span aria-hidden="true" style={{ fontSize: 18 }}>→</span>
        </Link>
      </div>

      {/* 3열 Masonry-like 그리드 */}
      <div
        style={{
          display: 'grid',
          gridTemplateColumns: 'repeat(3, 1fr)',
          gap: '1px',
          background: '#1A1A1A',
        }}
      >
        {preview.map((work, i) => (
          <WorkPreviewCard key={work.id} work={work} index={i} />
        ))}
      </div>

      {/* 하단 CTA */}
      <div
        style={{
          padding: '48px clamp(24px, 6vw, 100px) 0',
          textAlign: 'center',
        }}
      >
        <p
          style={{
            margin: 0,
            fontSize: 14,
            color: 'rgba(255,255,255,0.35)',
            fontStyle: 'italic',
          }}
        >
          추가 사례는 문의 주시면 바로 PDF로 전달드립니다.
        </p>
      </div>
    </section>
  )
}
