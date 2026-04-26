'use client'

import { useEffect, useRef, useState, type CSSProperties } from 'react'
import masthead from '@/data/masthead.json'

type Variant = keyof typeof masthead.cursorLabels
const LABELS = masthead.cursorLabels

/**
 * Editorial cursor — variant-aware glyph + mono caption.
 *
 * Activation gates (all must hold):
 *   (hover: hover) AND (pointer: fine) AND (min-width: 1024px) AND
 *   NOT prefers-reduced-motion
 * Otherwise the native cursor is preserved (touch / accessibility).
 *
 * Variant detection happens via mouseover bubbling: walk closest() for
 * an explicit [data-cursor=NAME] override, then fall back to element
 * type (textarea/input/select → input, img → image, a → link, button →
 * button), default otherwise.
 */
export function CustomCursor() {
  const rootRef = useRef<HTMLDivElement>(null)
  const labelRef = useRef<HTMLSpanElement>(null)

  const [enabled, setEnabled] = useState(false)
  const [variant, setVariant] = useState<Variant>('default')
  const [visible, setVisible] = useState(false)
  const [pulse, setPulse] = useState(0) // increment to retrigger click animation

  const target = useRef({ x: 0, y: 0 })
  const current = useRef({ x: 0, y: 0 })
  const rafId = useRef<number>(0)

  // ── Activation media query (with prefers-reduced-motion) ────────────────
  useEffect(() => {
    if (typeof window === 'undefined') return
    const mq = window.matchMedia(
      '(hover: hover) and (pointer: fine) and (min-width: 1024px) and (prefers-reduced-motion: no-preference)'
    )
    const sync = () => setEnabled(mq.matches)
    sync()
    mq.addEventListener('change', sync)
    return () => mq.removeEventListener('change', sync)
  }, [])

  // ── Pointer + variant tracking ─────────────────────────────────────────
  useEffect(() => {
    if (!enabled) return

    const visibleRef = { current: false }

    const onMove = (e: MouseEvent) => {
      target.current.x = e.clientX
      target.current.y = e.clientY
      if (!visibleRef.current) {
        // Snap so first appearance doesn't slide in from (0,0)
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
      // Explicit override has priority
      const overrideEl = t.closest('[data-cursor]') as HTMLElement | null
      if (overrideEl?.dataset.cursor && overrideEl.dataset.cursor in LABELS) {
        setVariant(overrideEl.dataset.cursor as Variant)
        return
      }
      // Tag-based fallback. Order matters: input/textarea > image > link > button
      const semantic = t.closest('input, textarea, select, img, a, button') as HTMLElement | null
      if (!semantic) {
        setVariant('default')
        return
      }
      const tag = semantic.tagName
      if (tag === 'INPUT' || tag === 'TEXTAREA' || tag === 'SELECT') setVariant('input')
      else if (tag === 'IMG') setVariant('image')
      else if (tag === 'A') setVariant('link')
      else if (tag === 'BUTTON') setVariant('button')
      else setVariant('default')
    }

    const onClick = () => {
      setPulse((p) => p + 1)
    }

    const lerp = 0.18
    const tick = () => {
      current.current.x += (target.current.x - current.current.x) * lerp
      current.current.y += (target.current.y - current.current.y) * lerp
      const el = rootRef.current
      if (el) {
        el.style.transform = `translate3d(${current.current.x}px, ${current.current.y}px, 0)`
      }
      rafId.current = requestAnimationFrame(tick)
    }

    window.addEventListener('mousemove', onMove)
    window.addEventListener('mouseover', onOver)
    window.addEventListener('mousedown', onClick)
    document.addEventListener('mouseleave', onLeave)
    rafId.current = requestAnimationFrame(tick)

    return () => {
      window.removeEventListener('mousemove', onMove)
      window.removeEventListener('mouseover', onOver)
      window.removeEventListener('mousedown', onClick)
      document.removeEventListener('mouseleave', onLeave)
      cancelAnimationFrame(rafId.current)
    }
  }, [enabled])

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
      <div
        style={{
          position: 'absolute',
          left: 0,
          top: 0,
          display: 'flex',
          alignItems: 'center',
          gap: 12,
          // Center the glyph on the actual cursor point.
          transform: 'translate(-50%, -50%)',
        }}
      >
        <Glyph variant={variant} pulseKey={pulse} />
        <span
          ref={labelRef}
          key={variant}
          style={{
            fontFamily: 'var(--font-mono)',
            fontSize: 11,
            letterSpacing: 'var(--tracking-caption)',
            textTransform: 'uppercase',
            color: 'var(--fg)',
            whiteSpace: 'nowrap',
            // Re-mounting (key={variant}) restarts the fade.
            animation: 'cursor-label 0.2s var(--ease-edit) both',
            transform: 'translateY(0.5px)',
          }}
        >
          {LABELS[variant]}
        </span>
      </div>
    </div>
  )
}

// ─── Glyph per variant ──────────────────────────────────────────────────────

function Glyph({ variant, pulseKey }: { variant: Variant; pulseKey: number }) {
  // Pulse animation: brief 1.8x scale on every click. We re-key the wrapper
  // so the animation restarts on each pulseKey change.
  const wrapperStyle: CSSProperties = {
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    transformOrigin: 'center',
    animation: 'cursor-pulse 0.16s var(--ease-edit)',
  }

  return (
    <span key={pulseKey} style={wrapperStyle}>
      {renderShape(variant)}
    </span>
  )
}

function renderShape(variant: Variant) {
  // Common positioning so each glyph can be sized independently.
  const base: CSSProperties = {
    display: 'inline-block',
    background: 'var(--accent)',
    color: 'var(--accent)',
    transition: 'all var(--dur-fast) var(--ease-edit)',
  }

  switch (variant) {
    case 'link':
      // Slightly larger square for link affordance
      return <span style={{ ...base, width: 12, height: 12 }} />
    case 'work':
      // Filled disc — "◉ VIEW" reinforced by the glyph itself
      return (
        <span
          style={{
            ...base,
            width: 12,
            height: 12,
            borderRadius: '50%',
            background: 'var(--accent)',
          }}
        />
      )
    case 'button':
      // Star-like 4-pt pictogram; render via CSS-only SVG
      return (
        <svg width={12} height={12} viewBox="0 0 12 12" aria-hidden focusable="false">
          <path
            d="M6 0 L7 5 L12 6 L7 7 L6 12 L5 7 L0 6 L5 5 Z"
            fill="var(--accent)"
          />
        </svg>
      )
    case 'input':
      // Vertical caret-like rule
      return <span style={{ ...base, width: 1, height: 14 }} />
    case 'image':
      // Hollow ring — "○ ZOOM"
      return (
        <span
          style={{
            display: 'inline-block',
            width: 12,
            height: 12,
            borderRadius: '50%',
            border: '1px solid var(--accent)',
            background: 'transparent',
          }}
        />
      )
    case 'default':
    default:
      // 8px square — paper-mag base mark
      return <span style={{ ...base, width: 8, height: 8 }} />
  }
}
