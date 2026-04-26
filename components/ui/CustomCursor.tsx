'use client'

import { useEffect, useRef, useState } from 'react'
import masthead from '@/data/masthead.json'

type Variant = keyof typeof masthead.cursorLabels
const LABELS = masthead.cursorLabels

/**
 * Editorial cursor — small red dot + mono caption that follows with ~100ms lag.
 * Variants: default / link / work / button (overridable via [data-cursor=…]).
 * Disabled on touch devices via `(hover: hover)` media query.
 */
export function CustomCursor() {
  const rootRef = useRef<HTMLDivElement>(null)
  const [enabled, setEnabled] = useState(false)
  const [variant, setVariant] = useState<Variant>('default')
  const [visible, setVisible] = useState(false)

  // Latest target / current rendered position (refs to avoid re-renders)
  const target = useRef({ x: 0, y: 0 })
  const current = useRef({ x: 0, y: 0 })
  const rafId = useRef<number>(0)

  useEffect(() => {
    if (typeof window === 'undefined') return
    const supports = window.matchMedia('(hover: hover) and (pointer: fine)').matches
    if (!supports) return
    setEnabled(true)

    const visibleRef = { current: false }

    const onMove = (e: MouseEvent) => {
      target.current.x = e.clientX
      target.current.y = e.clientY
      if (!visibleRef.current) {
        // Snap position on first appearance to avoid initial slide from (0,0)
        current.current.x = e.clientX
        current.current.y = e.clientY
        visibleRef.current = true
        setVisible(true)
      }
    }

    const onLeave = () => {
      visibleRef.current = false
      setVisible(false)
    }

    const onOver = (e: MouseEvent) => {
      const t = e.target as Element | null
      if (!t || !(t instanceof Element)) {
        setVariant('default')
        return
      }
      const match = t.closest('[data-cursor], a, button')
      if (!match) {
        setVariant('default')
        return
      }
      const v = (match as HTMLElement).dataset.cursor
      if (v && v in LABELS) {
        setVariant(v as Variant)
        return
      }
      const tag = match.tagName
      if (tag === 'A') setVariant('link')
      else if (tag === 'BUTTON') setVariant('button')
      else setVariant('default')
    }

    const lerpFactor = 0.18 // ≈100ms convergence at 60fps

    const loop = () => {
      current.current.x += (target.current.x - current.current.x) * lerpFactor
      current.current.y += (target.current.y - current.current.y) * lerpFactor
      const el = rootRef.current
      if (el) {
        el.style.transform = `translate3d(${current.current.x}px, ${current.current.y}px, 0)`
      }
      rafId.current = requestAnimationFrame(loop)
    }

    window.addEventListener('mousemove', onMove)
    window.addEventListener('mouseover', onOver)
    document.addEventListener('mouseleave', onLeave)
    rafId.current = requestAnimationFrame(loop)

    return () => {
      window.removeEventListener('mousemove', onMove)
      window.removeEventListener('mouseover', onOver)
      document.removeEventListener('mouseleave', onLeave)
      cancelAnimationFrame(rafId.current)
    }
  }, [])

  if (!enabled) return null

  return (
    <div
      ref={rootRef}
      aria-hidden
      style={{
        position: 'fixed',
        top: 0,
        left: 0,
        zIndex: 'var(--z-cursor)' as unknown as number,
        pointerEvents: 'none',
        opacity: visible ? 1 : 0,
        transition: 'opacity var(--dur-fast) var(--ease-edit)',
        willChange: 'transform',
      }}
    >
      {/* Anchor at the dot center */}
      <div
        style={{
          position: 'absolute',
          left: -4,
          top: -4,
          display: 'flex',
          alignItems: 'center',
          gap: 10,
        }}
      >
        <span
          aria-hidden
          style={{
            width: 8,
            height: 8,
            background: 'var(--accent)',
            display: 'block',
            flexShrink: 0,
          }}
        />
        <span
          style={{
            fontFamily: 'var(--font-mono)',
            fontSize: 11,
            letterSpacing: 'var(--tracking-tight)',
            textTransform: 'uppercase',
            color: 'var(--fg)',
            whiteSpace: 'nowrap',
            transform: 'translateY(0.5px)',
            transition: 'opacity var(--dur-fast) var(--ease-edit)',
          }}
        >
          {LABELS[variant]}
        </span>
      </div>
    </div>
  )
}
