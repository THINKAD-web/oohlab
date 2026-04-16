'use client'

import { useEffect, useRef } from 'react'

/**
 * SmoothScroll — Lenis cinematic scroll provider
 *
 * 패키지명: lenis  (구 @studio-freight/lenis 에서 rename)
 * 설치: npm install lenis
 *
 * GSAP ScrollTrigger 연동 포함.
 * SSR 안전: 모든 Lenis 초기화는 useEffect 내 동적 import로 처리.
 */
export function SmoothScroll({ children }: { children: React.ReactNode }) {
  const initiated = useRef(false)

  useEffect(() => {
    if (initiated.current) return
    initiated.current = true

    let rafId: number

    async function init() {
      // 동적 import — 브라우저 전용 (SSR 완전 차단)
      const { default: Lenis } = await import('lenis')

      const lenis = new Lenis({
        duration: 1.4,
        easing: (t: number) => Math.min(1, 1.001 - Math.pow(2, -10 * t)),
        smoothWheel: true,
        wheelMultiplier: 0.9,
        touchMultiplier: 1.8,
      })

      // GSAP ScrollTrigger 연동 (optional — GSAP 없어도 동작)
      try {
        const { gsap } = await import('gsap')
        const { ScrollTrigger } = await import('gsap/ScrollTrigger')
        gsap.registerPlugin(ScrollTrigger)

        // GSAP ticker에 Lenis raf 연결 (공식 권장 방식)
        gsap.ticker.add((time) => {
          lenis.raf(time * 1000)
        })
        gsap.ticker.lagSmoothing(0)
        lenis.on('scroll', ScrollTrigger.update)
      } catch {
        // GSAP 없을 때 fallback — 수동 RAF
        function raf(time: number) {
          lenis.raf(time)
          rafId = requestAnimationFrame(raf)
        }
        rafId = requestAnimationFrame(raf)
      }

      return () => {
        lenis.destroy()
        cancelAnimationFrame(rafId)
      }
    }

    let cleanup: (() => void) | undefined
    init().then((fn) => { cleanup = fn })

    return () => { cleanup?.() }
  }, [])

  return <>{children}</>
}
