'use client'

import { useEffect, useRef, useState } from 'react'

/**
 * CustomCursor
 * - 데스크톱 (pointer device)에서만 활성화
 * - 모바일·터치 디바이스에서는 완전히 비활성화 (CSS + JS 이중 체크)
 * - 성능: transform만 사용 (layout 재계산 없음), will-change 최소화
 */
export function CustomCursor() {
  const cursorRef = useRef<HTMLDivElement>(null)
  const dotRef = useRef<HTMLDivElement>(null)
  const [isActive, setIsActive] = useState(false)
  const [isPointer, setIsPointer] = useState(false)
  const pos = useRef({ x: 0, y: 0 })
  const dotPos = useRef({ x: 0, y: 0 })
  const rafId = useRef<number>(0)

  useEffect(() => {
    // 터치 기기 or 세밀한 포인터 없으면 비활성화
    const hasPointer = window.matchMedia('(pointer: fine)').matches
    if (!hasPointer) return

    setIsActive(true)

    const onMove = (e: MouseEvent) => {
      pos.current = { x: e.clientX, y: e.clientY }
    }

    const onEnterLink = () => setIsPointer(true)
    const onLeaveLink = () => setIsPointer(false)

    // 링크·버튼 hover 감지
    const links = document.querySelectorAll('a, button, [data-cursor-pointer]')
    links.forEach((el) => {
      el.addEventListener('mouseenter', onEnterLink)
      el.addEventListener('mouseleave', onLeaveLink)
    })

    window.addEventListener('mousemove', onMove)

    // rAF 루프 — 두 커서 레이어 각기 다른 lerp
    function loop() {
      // 도트: 즉각 추적
      dotPos.current.x += (pos.current.x - dotPos.current.x) * 0.95
      dotPos.current.y += (pos.current.y - dotPos.current.y) * 0.95

      if (dotRef.current) {
        dotRef.current.style.transform = `translate(${dotPos.current.x - 4}px, ${dotPos.current.y - 4}px)`
      }
      // 링: 부드러운 lag
      if (cursorRef.current) {
        cursorRef.current.style.transform = `translate(${pos.current.x - 20}px, ${pos.current.y - 20}px)`
      }

      rafId.current = requestAnimationFrame(loop)
    }
    rafId.current = requestAnimationFrame(loop)

    return () => {
      window.removeEventListener('mousemove', onMove)
      links.forEach((el) => {
        el.removeEventListener('mouseenter', onEnterLink)
        el.removeEventListener('mouseleave', onLeaveLink)
      })
      cancelAnimationFrame(rafId.current)
    }
  }, [])

  if (!isActive) return null

  return (
    <>
      {/* 외부 링 */}
      <div
        ref={cursorRef}
        aria-hidden="true"
        style={{
          position: 'fixed',
          top: 0,
          left: 0,
          width: 40,
          height: 40,
          borderRadius: '50%',
          border: '1px solid rgba(255,255,255,0.6)',
          pointerEvents: 'none',
          zIndex: 9999,
          transition: 'width 0.25s ease, height 0.25s ease, border-color 0.25s ease',
          willChange: 'transform',
          ...(isPointer && {
            width: 64,
            height: 64,
            borderColor: '#FF4D00',
            marginLeft: -12,
            marginTop: -12,
          }),
        }}
      />
      {/* 내부 도트 */}
      <div
        ref={dotRef}
        aria-hidden="true"
        style={{
          position: 'fixed',
          top: 0,
          left: 0,
          width: 8,
          height: 8,
          borderRadius: '50%',
          backgroundColor: isPointer ? '#FF4D00' : '#fff',
          pointerEvents: 'none',
          zIndex: 9999,
          transition: 'background-color 0.2s ease',
          willChange: 'transform',
        }}
      />
    </>
  )
}
