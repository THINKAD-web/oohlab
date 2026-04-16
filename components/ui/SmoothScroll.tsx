'use client'

import { createContext, useContext, useEffect, useRef } from 'react'
import type Lenis from '@studio-freight/lenis'

const LenisContext = createContext<Lenis | null>(null)

export function useLenis() {
  return useContext(LenisContext)
}

export function SmoothScroll({ children }: { children: React.ReactNode }) {
  const lenisRef = useRef<Lenis | null>(null)

  useEffect(() => {
    // 동적 import — SSR에서 실행 방지, 번들 분리
    let rafId: number
    let lenis: Lenis

    async function init() {
      const LenisClass = (await import('@studio-freight/lenis')).default
      lenis = new LenisClass({
        duration: 1.4,
        easing: (t: number) => Math.min(1, 1.001 - Math.pow(2, -10 * t)),
        smoothWheel: true,
        wheelMultiplier: 0.9,
        touchMultiplier: 1.8,
      })
      lenisRef.current = lenis

      // GSAP ScrollTrigger 연동
      try {
        const { ScrollTrigger } = await import('gsap/ScrollTrigger')
        lenis.on('scroll', ScrollTrigger.update)
      } catch {
        // GSAP 미로드 시 무시
      }

      function raf(time: number) {
        lenis.raf(time)
        rafId = requestAnimationFrame(raf)
      }
      rafId = requestAnimationFrame(raf)
    }

    init()

    return () => {
      cancelAnimationFrame(rafId)
      lenis?.destroy()
    }
  }, [])

  return (
    <LenisContext.Provider value={lenisRef.current}>
      {children}
    </LenisContext.Provider>
  )
}
