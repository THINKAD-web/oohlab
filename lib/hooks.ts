import { useEffect, useRef, useState } from 'react'

/**
 * Trigger once when the observed element first crosses the viewport threshold.
 * Returns a stable ref + boolean. The observer disconnects after first hit.
 */
export function useInView<T extends Element>(threshold = 0.15) {
  const ref = useRef<T | null>(null)
  const [inView, setInView] = useState(false)
  useEffect(() => {
    const el = ref.current
    if (!el || inView) return
    const obs = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setInView(true)
          obs.disconnect()
        }
      },
      { threshold }
    )
    obs.observe(el)
    return () => obs.disconnect()
  }, [inView, threshold])
  return { ref, inView }
}

/**
 * Ease-out cubic count-up from 0 → target. Starts when `triggered` flips true.
 */
export function useCountUp(target: number, triggered: boolean, duration = 1200) {
  const [count, setCount] = useState(0)
  useEffect(() => {
    if (!triggered) return
    const start = performance.now()
    let raf = 0
    const tick = (now: number) => {
      const p = Math.min((now - start) / duration, 1)
      const eased = 1 - Math.pow(1 - p, 3)
      setCount(Math.round(eased * target))
      if (p < 1) raf = requestAnimationFrame(tick)
    }
    raf = requestAnimationFrame(tick)
    return () => cancelAnimationFrame(raf)
  }, [triggered, target, duration])
  return count
}
