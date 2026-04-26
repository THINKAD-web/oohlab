import type { CSSProperties } from 'react'

/**
 * Editorial marquee strip — pure CSS infinite loop.
 * Two text copies make `translateX(-50%)` seamless.
 * Pauses on hover/focus and on prefers-reduced-motion (handled in globals.css).
 */
export function Marquee({
  text,
  speed = 60,
  ariaLabel,
}: {
  text: string
  /** Seconds for one full loop. */
  speed?: number
  ariaLabel?: string
}) {
  return (
    <div
      className="marquee"
      aria-label={ariaLabel}
      role={ariaLabel ? 'marquee' : undefined}
      style={{ '--marquee-duration': `${speed}s` } as CSSProperties}
    >
      <div className="marquee__track">
        <span className="marquee__item" aria-hidden={!ariaLabel}>
          {text}
        </span>
        <span className="marquee__item" aria-hidden>
          {text}
        </span>
      </div>
    </div>
  )
}
