'use client'

import { useEffect, useRef } from 'react'
import type { TimelineItem, StatItem } from '@/lib/types'

// ──────────────────────────────
//  CounterStats — 숫자 카운트 애니메이션
// ──────────────────────────────
export function CounterStats({ stats }: { stats: StatItem[] }) {
  const containerRef = useRef<HTMLDivElement>(null)
  const countersRef = useRef<(HTMLSpanElement | null)[]>([])

  useEffect(() => {
    const el = containerRef.current
    if (!el) return

    async function animate() {
      const { gsap } = await import('gsap')
      const { ScrollTrigger } = await import('gsap/ScrollTrigger')
      gsap.registerPlugin(ScrollTrigger)

      const onEnter = () => {
        stats.forEach((stat, i) => {
          const target = countersRef.current[i]
          if (!target) return
          // gsap.to on a plain proxy object — correct GSAP 3 pattern for counters
          const proxy = { val: 0 }
          gsap.to(proxy, {
            val: stat.value,
            duration: 1.8,
            delay: i * 0.15,
            ease: 'power2.out',
            onUpdate() {
              const v = Math.round(proxy.val)
              target.textContent =
                (stat.prefix ? stat.prefix + ' ' : '') +
                v.toLocaleString() +
                stat.unit
            },
          })
        })
      }

      ScrollTrigger.create({
        trigger: el,
        start: 'top 75%',
        once: true,
        onEnter,
      })
    }
    animate()
  }, [stats])

  return (
    <div
      ref={containerRef}
      style={{
        display: 'grid',
        gridTemplateColumns: 'repeat(auto-fit, minmax(160px, 1fr))',
        gap: '1px',
        background: '#1E1E1E',
        border: '1px solid #1E1E1E',
        marginBottom: 'clamp(60px, 8vw, 100px)',
      }}
    >
      {stats.map((stat, i) => (
        <div
          key={stat.label}
          style={{ padding: '40px 32px', background: '#0D0D0D' }}
        >
          <span
            ref={(el) => { countersRef.current[i] = el }}
            aria-label={`${stat.label}: ${stat.prefix ?? ''}${stat.value}${stat.unit}`}
            style={{
              display: 'block',
              fontSize: 'clamp(32px, 5vw, 54px)',
              fontWeight: 800,
              color: '#FF4D00',
              lineHeight: 1,
              marginBottom: 12,
              fontFamily: "'Pretendard', sans-serif",
              letterSpacing: '-0.02em',
              fontVariantNumeric: 'tabular-nums',
            }}
          >
            0
          </span>
          <p
            style={{
              margin: 0,
              fontSize: 12,
              letterSpacing: '0.15em',
              textTransform: 'uppercase',
              color: 'rgba(255,255,255,0.35)',
              fontWeight: 500,
            }}
          >
            {stat.label}
          </p>
        </div>
      ))}
    </div>
  )
}

// ──────────────────────────────
//  Timeline — GSAP ScrollTrigger 라인 드로우
// ──────────────────────────────
export function Timeline({ items }: { items: TimelineItem[] }) {
  const containerRef = useRef<HTMLDivElement>(null)
  const lineRef = useRef<HTMLDivElement>(null)
  const itemRefs = useRef<(HTMLDivElement | null)[]>([])

  useEffect(() => {
    const container = containerRef.current
    const line = lineRef.current
    if (!container || !line) return

    async function animate() {
      const { gsap } = await import('gsap')
      const { ScrollTrigger } = await import('gsap/ScrollTrigger')
      gsap.registerPlugin(ScrollTrigger)

      // 중앙 라인 드로우
      gsap.fromTo(
        line,
        { scaleY: 0 },
        {
          scaleY: 1,
          duration: 1.5,
          ease: 'none',
          scrollTrigger: {
            trigger: container,
            start: 'top 70%',
            end: 'bottom 60%',
            scrub: 0.8,
          },
        }
      )

      // 각 아이템 등장
      itemRefs.current.forEach((el, i) => {
        if (!el) return
        const isRight = i % 2 === 0
        gsap.fromTo(
          el,
          { opacity: 0, x: isRight ? 40 : -40 },
          {
            opacity: 1,
            x: 0,
            duration: 0.9,
            ease: 'power3.out',
            scrollTrigger: {
              trigger: el,
              start: 'top 82%',
              once: true,
            },
          }
        )
      })
    }
    animate()
  }, [])

  return (
    <div
      ref={containerRef}
      style={{
        position: 'relative',
        marginBottom: 'clamp(60px, 8vw, 100px)',
      }}
      aria-label="오랩 15년 연혁"
    >
      {/* 중앙 수직선 */}
      <div
        style={{
          position: 'absolute',
          left: '50%',
          top: 0,
          bottom: 0,
          width: '1px',
          background: '#1E1E1E',
          transform: 'translateX(-50%)',
        }}
      >
        <div
          ref={lineRef}
          style={{
            width: '100%',
            height: '100%',
            background: '#FF4D00',
            transformOrigin: 'top',
            transform: 'scaleY(0)',
          }}
        />
      </div>

      {/* 아이템들 */}
      <div style={{ display: 'flex', flexDirection: 'column', gap: 0 }}>
        {items.map((item, i) => {
          const isRight = i % 2 === 0
          return (
            <div
              key={item.year}
              ref={(el) => { itemRefs.current[i] = el }}
              style={{
                display: 'grid',
                gridTemplateColumns: '1fr 40px 1fr',
                alignItems: 'center',
                marginBottom: 40,
                opacity: 0, // GSAP 진입 전
              }}
            >
              {/* 왼쪽 콘텐츠 */}
              <div
                style={{
                  textAlign: 'right',
                  paddingRight: 28,
                  ...(isRight && { visibility: 'hidden' }),
                }}
              >
                {!isRight && (
                  <>
                    <span
                      style={{
                        display: 'block',
                        fontSize: 'clamp(28px, 4vw, 40px)',
                        fontWeight: 800,
                        color: '#FF4D00',
                        letterSpacing: '-0.03em',
                        lineHeight: 1,
                        fontFamily: "'Pretendard', sans-serif",
                        marginBottom: 8,
                        fontVariantNumeric: 'tabular-nums',
                      }}
                    >
                      {item.year}
                    </span>
                    <p
                      style={{
                        margin: 0,
                        fontSize: 14,
                        color: 'rgba(255,255,255,0.65)',
                        lineHeight: 1.6,
                        fontFamily: "'Pretendard', sans-serif",
                      }}
                    >
                      {item.event}
                    </p>
                  </>
                )}
              </div>

              {/* 중앙 도트 */}
              <div style={{ display: 'flex', justifyContent: 'center' }}>
                <div
                  style={{
                    width: 12,
                    height: 12,
                    borderRadius: '50%',
                    background: '#FF4D00',
                    border: '2px solid #0A0A0A',
                    boxShadow: '0 0 0 1px #FF4D00',
                    zIndex: 1,
                    flexShrink: 0,
                  }}
                />
              </div>

              {/* 오른쪽 콘텐츠 */}
              <div
                style={{
                  paddingLeft: 28,
                  ...(! isRight && { visibility: 'hidden' }),
                }}
              >
                {isRight && (
                  <>
                    <span
                      style={{
                        display: 'block',
                        fontSize: 'clamp(28px, 4vw, 40px)',
                        fontWeight: 800,
                        color: '#FF4D00',
                        letterSpacing: '-0.03em',
                        lineHeight: 1,
                        fontFamily: "'Pretendard', sans-serif",
                        marginBottom: 8,
                        fontVariantNumeric: 'tabular-nums',
                      }}
                    >
                      {item.year}
                    </span>
                    <p
                      style={{
                        margin: 0,
                        fontSize: 14,
                        color: 'rgba(255,255,255,0.65)',
                        lineHeight: 1.6,
                        fontFamily: "'Pretendard', sans-serif",
                      }}
                    >
                      {item.event}
                    </p>
                  </>
                )}
              </div>
            </div>
          )
        })}
      </div>
    </div>
  )
}
