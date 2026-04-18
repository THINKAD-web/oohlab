'use client'

import { useEffect, useRef, useState, useCallback } from 'react'
import Image from 'next/image'
import Link from 'next/link'
import {
  motion,
  useScroll,
  useTransform,
  useSpring,
  useMotionValue,
  AnimatePresence,
  useInView,
} from 'framer-motion'

interface Work {
  id: string
  client: string
  title: string
  mediaType: string
  thumbnail: string
  heroImage: string
  isGovernment: boolean
  year: number
}

interface Strength {
  id: string
  icon: string
  title: string
  body: string
}

const WORKS: Work[] = [
  {
    id: '1',
    client: '봄툰',
    title: '기업 미디어믹스 옥외광고 캠페인',
    mediaType: '미디어믹스',
    thumbnail: 'https://i.ibb.co/QF1MNdSR/10.png',
    heroImage: 'https://i.ibb.co/5WLkV5rR/5.png',
    isGovernment: false,
    year: 2025,
  },
  {
    id: '2',
    client: '한강유역환경청',
    title: '버스·지하철 광고 진행',
    mediaType: '미디어믹스',
    thumbnail: 'https://i.ibb.co/mVvNvKcM/2026-04-18-1-49-50.png',
    heroImage: 'https://i.ibb.co/jqZ70mw/2026-04-18-1-50-01.png',
    isGovernment: true,
    year: 2025,
  },
  {
    id: '3',
    client: '대한상공회의소',
    title: '기관 전광판 광고 진행',
    mediaType: '전광판',
    thumbnail: 'https://i.ibb.co/GQzvK0Mz/2026-04-18-1-50-15.png',
    heroImage: 'https://i.ibb.co/Rp8V95t1/2026-04-18-1-50-59.png',
    isGovernment: true,
    year: 2025,
  },
  {
    id: '4',
    client: '한국농수산식품유통공사',
    title: '지하철 광고 진행',
    mediaType: '지하철',
    thumbnail: 'https://i.ibb.co/XxZC80hx/2026-04-18-1-51-15.png',
    heroImage: 'https://i.ibb.co/YBn0y7dq/2026-04-18-1-51-24.png',
    isGovernment: true,
    year: 2025,
  },
  {
    id: '5',
    client: '한국인터넷진흥원',
    title: '지하철 광고 진행',
    mediaType: '지하철',
    thumbnail: 'https://i.ibb.co/xSqCFS8w/2026-04-18-1-51-49.png',
    heroImage: 'https://i.ibb.co/gMPcZgv3/2026-04-18-1-52-31.png',
    isGovernment: true,
    year: 2025,
  },
  {
    id: '6',
    client: '한국관광공사',
    title: '지하철 광고 진행',
    mediaType: '지하철',
    thumbnail: 'https://i.ibb.co/wrb0KchV/2026-04-18-1-52-47.png',
    heroImage: 'https://i.ibb.co/PzJwMRfB/2026-04-18-1-53-01.png',
    isGovernment: true,
    year: 2025,
  },
]

const STRENGTHS: Strength[] = [
  { id: 'network', icon: '🔗', title: '15년 강력 네트워크', body: '전국 주요 매체사·옥외광고 업체 독점 협력 관계.' },
  { id: 'mediamix', icon: '⚡', title: '트렌드 미디어믹스', body: 'DOOH·SNS·OOH 크로스 믹스로 최대 도달률 설계.' },
  { id: 'data', icon: '📊', title: '데이터 기반 실행', body: '유동인구 데이터 + 실시간 노출 측정. 낭비 없는 집행.' },
  { id: 'management', icon: '✅', title: '꼼꼼한 원스톱 관리', body: '제안부터 정산까지. 담당자 직접 관리 원칙.' },
]

const YOUTUBE_ID = 'XDBl8ATdt-U'
const POSTER = 'https://i.ibb.co/Y7mK4HvP/2026-04-16-4-28-35.png'

function ScrollProgress() {
  const { scrollYProgress } = useScroll()
  const scaleX = useSpring(scrollYProgress, { stiffness: 100, damping: 30, restDelta: 0.001 })
  return (
    <motion.div
      style={{
        position: 'fixed',
        top: 0,
        left: 0,
        right: 0,
        height: 2,
        background: '#00E5FF',
        transformOrigin: '0%',
        scaleX,
        zIndex: 9999,
      }}
    />
  )
}

function useCountUp(target: number, triggered: boolean, duration = 1800) {
  const [count, setCount] = useState(0)
  useEffect(() => {
    if (!triggered) return
    const startTime = performance.now()
    const tick = (now: number) => {
      const p = Math.min((now - startTime) / duration, 1)
      const eased = 1 - Math.pow(1 - p, 3)
      setCount(Math.round(eased * target))
      if (p < 1) requestAnimationFrame(tick)
    }
    requestAnimationFrame(tick)
  }, [triggered, target, duration])
  return count
}

function StatCounter({ num, unit, label }: { num: number; unit: string; label: string }) {
  const ref = useRef<HTMLDivElement>(null)
  const inView = useInView(ref, { once: true, margin: '-80px' })
  const count = useCountUp(num, inView)
  return (
    <div ref={ref} style={{ display: 'flex', alignItems: 'baseline', gap: 6 }}>
      <span
        style={{
          fontSize: 'clamp(28px,3vw,44px)',
          fontWeight: 900,
          color: '#FFFFFF',
          letterSpacing: '-0.03em',
          lineHeight: 1,
        }}
      >
        {count}
        <span style={{ fontSize: '0.45em', color: '#00E5FF', marginLeft: 2 }}>{unit}</span>
      </span>
      <span
        style={{
          fontSize: 11,
          color: 'rgba(255,255,255,0.4)',
          letterSpacing: '0.1em',
          textTransform: 'uppercase',
        }}
      >
        {label}
      </span>
    </div>
  )
}

function MagneticButton({
  href,
  children,
  primary,
  external,
}: {
  href: string
  children: React.ReactNode
  primary?: boolean
  external?: boolean
}) {
  const ref = useRef<HTMLAnchorElement>(null)
  const x = useMotionValue(0)
  const y = useMotionValue(0)
  const sx = useSpring(x, { stiffness: 200, damping: 18 })
  const sy = useSpring(y, { stiffness: 200, damping: 18 })

  const onMove = useCallback(
    (e: React.MouseEvent) => {
      const el = ref.current
      if (!el) return
      const r = el.getBoundingClientRect()
      x.set((e.clientX - r.left - r.width / 2) * 0.35)
      y.set((e.clientY - r.top - r.height / 2) * 0.35)
    },
    [x, y]
  )

  const onLeave = useCallback(() => {
    x.set(0)
    y.set(0)
  }, [x, y])

  return (
    <motion.a
      ref={ref}
      href={href}
      target={external ? '_blank' : undefined}
      rel={external ? 'noopener noreferrer' : undefined}
      style={{
        display: 'inline-flex',
        alignItems: 'center',
        gap: 10,
        padding: '17px 36px',
        borderRadius: 8,
        fontWeight: 700,
        fontSize: 15,
        textDecoration: 'none',
        cursor: 'pointer',
        letterSpacing: '0.02em',
        userSelect: 'none',
        x: sx,
        y: sy,
        background: primary ? '#00E5FF' : 'transparent',
        color: primary ? '#0A0A0A' : '#FFFFFF',
        border: primary ? 'none' : '1px solid rgba(255,255,255,0.25)',
        boxShadow: primary ? '0 0 32px rgba(0,229,255,0.35)' : 'none',
      }}
      whileHover={{ scale: 1.04 }}
      whileTap={{ scale: 0.97 }}
      onMouseMove={onMove}
      onMouseLeave={onLeave}
    >
      {children}
    </motion.a>
  )
}

function TiltCard({ item, index }: { item: Strength; index: number }) {
  const ref = useRef<HTMLDivElement>(null)
  const x = useMotionValue(0)
  const y = useMotionValue(0)
  const rotateX = useTransform(y, [-0.5, 0.5], ['12deg', '-12deg'])
  const rotateY = useTransform(x, [-0.5, 0.5], ['-12deg', '12deg'])
  const glare = useTransform(x, [-0.5, 0.5], ['rgba(0,229,255,0.08)', 'rgba(0,229,255,0.16)'])

  const onMove = useCallback(
    (e: React.MouseEvent) => {
      const el = ref.current
      if (!el) return
      const r = el.getBoundingClientRect()
      x.set((e.clientX - r.left) / r.width - 0.5)
      y.set((e.clientY - r.top) / r.height - 0.5)
    },
    [x, y]
  )

  const onLeave = useCallback(() => {
    x.set(0)
    y.set(0)
  }, [x, y])

  return (
    <motion.div
      ref={ref}
      style={{ rotateX, rotateY, transformStyle: 'preserve-3d', perspective: 800 }}
      onMouseMove={onMove}
      onMouseLeave={onLeave}
      initial={{ opacity: 0, y: 40 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: '-60px' }}
      transition={{ duration: 0.6, delay: index * 0.1, ease: [0.25, 0.46, 0.45, 0.94] }}
    >
      <motion.div
        style={{
          background: glare,
          border: '1px solid rgba(255,255,255,0.08)',
          borderRadius: 16,
          padding: 'clamp(28px,3vw,40px)',
          height: '100%',
          backdropFilter: 'blur(8px)',
          WebkitBackdropFilter: 'blur(8px)',
          position: 'relative',
          overflow: 'hidden',
        }}
        whileHover={{ borderColor: 'rgba(0,229,255,0.35)' }}
        transition={{ duration: 0.2 }}
      >
        <div style={{ fontSize: 32, marginBottom: 20, display: 'block' }}>{item.icon}</div>
        <h3
          style={{
            margin: '0 0 12px',
            fontSize: 18,
            fontWeight: 700,
            color: '#FFFFFF',
            letterSpacing: '-0.01em',
          }}
        >
          {item.title}
        </h3>
        <p style={{ margin: 0, fontSize: 14, color: 'rgba(255,255,255,0.55)', lineHeight: 1.7 }}>
          {item.body}
        </p>
      </motion.div>
    </motion.div>
  )
}

function WorkCard({ work, onClick, index }: { work: Work; onClick: () => void; index: number }) {
  const [hovered, setHovered] = useState(false)

  const typeColor: Record<string, string> = {
    '미디어믹스': '#00E5FF',
    '전광판': '#A78BFA',
    '지하철': '#34D399',
    '버스': '#FBBF24',
    '디지털사이니지': '#F472B6',
  }
  const accent = typeColor[work.mediaType] || '#00E5FF'

  return (
    <motion.div
      initial={{ opacity: 0, y: 32 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: '-40px' }}
      transition={{ duration: 0.55, delay: index * 0.07, ease: [0.25, 0.46, 0.45, 0.94] }}
      onClick={onClick}
      onMouseEnter={() => setHovered(true)}
      onMouseLeave={() => setHovered(false)}
      style={{
        borderRadius: 12,
        overflow: 'hidden',
        border: `1px solid ${hovered ? 'rgba(0,229,255,0.3)' : 'rgba(255,255,255,0.07)'}`,
        cursor: 'pointer',
        transform: hovered ? 'translateY(-4px)' : 'none',
        transition: 'border-color 0.25s, transform 0.25s, box-shadow 0.25s',
        boxShadow: hovered ? '0 12px 40px rgba(0,229,255,0.12)' : '0 2px 12px rgba(0,0,0,0.3)',
        background: '#111111',
      }}
    >
      <div style={{ position: 'relative', aspectRatio: '4/3', overflow: 'hidden' }}>
        <Image
          src={work.thumbnail}
          alt={work.client}
          fill
          style={{
            objectFit: 'cover',
            transition: 'transform 0.4s',
            transform: hovered ? 'scale(1.06)' : 'scale(1)',
          }}
        />
        <div
          style={{
            position: 'absolute',
            inset: 0,
            background: 'linear-gradient(to top, rgba(0,0,0,0.85) 0%, rgba(0,0,0,0) 60%)',
            opacity: hovered ? 1 : 0,
            transition: 'opacity 0.3s',
            display: 'flex',
            alignItems: 'flex-end',
            padding: 16,
          }}
        >
          <span style={{ fontSize: 12, color: '#FFFFFF', fontWeight: 600 }}>자세히 보기 →</span>
        </div>
        <div
          style={{
            position: 'absolute',
            top: 12,
            left: 12,
            padding: '4px 10px',
            background: 'rgba(0,0,0,0.55)',
            backdropFilter: 'blur(6px)',
            borderRadius: 20,
            fontSize: 11,
            fontWeight: 700,
            color: accent,
            border: `1px solid ${accent}55`,
            letterSpacing: '0.05em',
          }}
        >
          {work.mediaType}
        </div>
        {work.isGovernment && (
          <div
            style={{
              position: 'absolute',
              top: 12,
              right: 12,
              padding: '4px 8px',
              background: 'rgba(0,0,0,0.55)',
              backdropFilter: 'blur(6px)',
              borderRadius: 20,
              fontSize: 10,
              fontWeight: 700,
              color: '#FBBF24',
              border: '1px solid rgba(251,191,36,0.4)',
            }}
          >
            🏛 공공
          </div>
        )}
      </div>
      <div style={{ padding: '16px 20px 20px' }}>
        <p
          style={{
            margin: '0 0 4px',
            fontSize: 12,
            color: 'rgba(255,255,255,0.35)',
            letterSpacing: '0.08em',
          }}
        >
          {work.year}
        </p>
        <h3
          style={{
            margin: '0 0 6px',
            fontSize: 16,
            fontWeight: 700,
            color: '#FFFFFF',
            letterSpacing: '-0.01em',
          }}
        >
          {work.client}
        </h3>
        <p style={{ margin: 0, fontSize: 13, color: 'rgba(255,255,255,0.5)', lineHeight: 1.5 }}>
          {work.title}
        </p>
      </div>
    </motion.div>
  )
}

function Lightbox({ work, onClose }: { work: Work; onClose: () => void }) {
  useEffect(() => {
    const onKey = (e: KeyboardEvent) => {
      if (e.key === 'Escape') onClose()
    }
    window.addEventListener('keydown', onKey)
    document.body.style.overflow = 'hidden'
    return () => {
      window.removeEventListener('keydown', onKey)
      document.body.style.overflow = ''
    }
  }, [onClose])

  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      transition={{ duration: 0.25 }}
      onClick={onClose}
      style={{
        position: 'fixed',
        inset: 0,
        background: 'rgba(0,0,0,0.92)',
        backdropFilter: 'blur(12px)',
        zIndex: 10000,
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        padding: 'clamp(16px, 4vw, 48px)',
      }}
    >
      <motion.div
        initial={{ scale: 0.88, opacity: 0 }}
        animate={{ scale: 1, opacity: 1 }}
        exit={{ scale: 0.88, opacity: 0 }}
        transition={{ duration: 0.3, ease: [0.25, 0.46, 0.45, 0.94] }}
        onClick={(e) => e.stopPropagation()}
        style={{
          background: '#111111',
          borderRadius: 16,
          border: '1px solid rgba(255,255,255,0.1)',
          overflow: 'hidden',
          maxWidth: 800,
          width: '100%',
          maxHeight: '90vh',
          overflowY: 'auto',
        }}
      >
        <div style={{ position: 'relative', aspectRatio: '16/9' }}>
          <Image src={work.heroImage} alt={work.client} fill style={{ objectFit: 'cover' }} />
        </div>
        <div style={{ padding: 'clamp(20px,3vw,32px)' }}>
          <div
            style={{
              display: 'flex',
              justifyContent: 'space-between',
              alignItems: 'flex-start',
              marginBottom: 12,
            }}
          >
            <div>
              <p
                style={{
                  margin: '0 0 4px',
                  fontSize: 11,
                  letterSpacing: '0.1em',
                  color: '#00E5FF',
                  fontWeight: 700,
                }}
              >
                {work.mediaType} · {work.year}
              </p>
              <h2
                style={{
                  margin: 0,
                  fontSize: 'clamp(18px,2.5vw,26px)',
                  fontWeight: 800,
                  color: '#FFFFFF',
                }}
              >
                {work.client}
              </h2>
            </div>
            <button
              onClick={onClose}
              style={{
                background: 'rgba(255,255,255,0.08)',
                border: 'none',
                color: '#FFFFFF',
                width: 36,
                height: 36,
                borderRadius: '50%',
                cursor: 'pointer',
                fontSize: 16,
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                flexShrink: 0,
              }}
            >
              ✕
            </button>
          </div>
          <p style={{ margin: 0, fontSize: 14, color: 'rgba(255,255,255,0.6)', lineHeight: 1.7 }}>
            {work.title}
          </p>
        </div>
      </motion.div>
    </motion.div>
  )
}

function HeroSection() {
  const [displayed, setDisplayed] = useState('')
  const [typed, setTyped] = useState(false)
  const text = '15년 경력. 말보다 행동으로 증명합니다.'

  useEffect(() => {
    const t = setTimeout(() => {
      let i = 0
      const iv = setInterval(() => {
        setDisplayed(text.slice(0, i + 1))
        i++
        if (i >= text.length) {
          clearInterval(iv)
          setTyped(true)
        }
      }, 52)
    }, 500)
    return () => clearTimeout(t)
  }, [text])

  return (
    <section
      style={{
        position: 'relative',
        width: '100%',
        height: '100svh',
        minHeight: 640,
        overflow: 'hidden',
        background: '#0D0E16',
        display: 'flex',
        alignItems: 'center',
      }}
    >
      {/* eslint-disable-next-line @next/next/no-img-element */}
      <img
        src={POSTER}
        alt=""
        aria-hidden
        style={{
          position: 'absolute',
          inset: 0,
          width: '100%',
          height: '100%',
          objectFit: 'cover',
          zIndex: 1,
        }}
      />

      <div
        aria-hidden
        style={{
          position: 'absolute',
          top: '50%',
          left: '50%',
          width: '177.78vh',
          height: '56.25vw',
          minWidth: '100%',
          minHeight: '100%',
          transform: 'translate(-50%, -50%)',
          zIndex: 2,
          pointerEvents: 'none',
        }}
      >
        <iframe
          src={`https://www.youtube.com/embed/${YOUTUBE_ID}?autoplay=1&mute=1&loop=1&playlist=${YOUTUBE_ID}&controls=0&showinfo=0&rel=0&modestbranding=1&playsinline=1`}
          allow="autoplay; encrypted-media"
          title="배경 영상"
          style={{ width: '100%', height: '100%', border: 'none', pointerEvents: 'none' }}
        />
      </div>

      <div
        aria-hidden
        style={{
          position: 'absolute',
          inset: 0,
          background:
            'linear-gradient(105deg, rgba(10,11,18,0.95) 0%, rgba(10,11,18,0.85) 35%, rgba(10,11,18,0.5) 65%, rgba(10,11,18,0.2) 100%)',
          zIndex: 3,
        }}
      />
      <div
        aria-hidden
        style={{
          position: 'absolute',
          bottom: 0,
          left: 0,
          right: 0,
          height: '35%',
          background: 'linear-gradient(to top, rgba(10,10,10,0.8), transparent)',
          zIndex: 3,
        }}
      />

      <div
        style={{
          position: 'relative',
          zIndex: 4,
          width: '100%',
          maxWidth: 1200,
          margin: '0 auto',
          padding: '0 clamp(24px, 6vw, 100px)',
        }}
      >
        <motion.div
          initial={{ opacity: 0, y: 16 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.1 }}
          style={{
            display: 'inline-flex',
            alignItems: 'center',
            gap: 10,
            padding: '7px 16px 7px 10px',
            background: 'rgba(0,229,255,0.1)',
            border: '1px solid rgba(0,229,255,0.3)',
            borderRadius: 100,
            marginBottom: 28,
            backdropFilter: 'blur(8px)',
          }}
        >
          <div
            style={{
              width: 26,
              height: 26,
              borderRadius: '50%',
              background: 'linear-gradient(135deg, #00E5FF, #0099CC)',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              fontSize: 13,
            }}
            aria-hidden
          >
            ♀
          </div>
          <div>
            <p
              style={{
                margin: 0,
                fontSize: 9,
                fontWeight: 700,
                letterSpacing: '0.14em',
                textTransform: 'uppercase',
                color: '#00E5FF',
                lineHeight: 1,
              }}
            >
              여성기업인증
            </p>
            <p style={{ margin: '3px 0 0', fontSize: 11, color: 'rgba(255,255,255,0.8)', lineHeight: 1 }}>
              지자체·공공기관이 선호하는 여성기업 대행사
            </p>
          </div>
        </motion.div>

        <motion.h1
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.7, delay: 0.25 }}
          style={{
            margin: '0 0 20px',
            fontSize: 'clamp(34px,5.5vw,76px)',
            fontWeight: 900,
            color: '#FFFFFF',
            lineHeight: 1.08,
            letterSpacing: '-0.03em',
            maxWidth: 720,
          }}
        >
          {displayed}
          {!typed && (
            <span
              style={{
                display: 'inline-block',
                width: 4,
                height: '0.85em',
                background: '#00E5FF',
                marginLeft: 4,
                verticalAlign: 'middle',
                animation: 'cursorBlink 0.8s step-end infinite',
              }}
              aria-hidden
            />
          )}
        </motion.h1>

        <motion.p
          initial={{ opacity: 0, y: 16 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.45 }}
          style={{
            margin: '0 0 44px',
            fontSize: 'clamp(15px,1.6vw,19px)',
            color: 'rgba(255,255,255,0.68)',
            lineHeight: 1.75,
            maxWidth: 480,
          }}
        >
          트렌드 미디어믹스로 강력한 결과를 만들어갑니다.
        </motion.p>

        <motion.div
          initial={{ opacity: 0, y: 16 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.6 }}
          style={{ display: 'flex', gap: 14, flexWrap: 'wrap', marginBottom: 56 }}
        >
          <MagneticButton href="https://pf.kakao.com/_OOHLABchannel" primary external>
            💬 무료 미디어 제안 받기
          </MagneticButton>
          <MagneticButton href="/contact?type=gov">지자체·기관 상담하기</MagneticButton>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, y: 12 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.8 }}
          style={{ display: 'flex', gap: 'clamp(24px,4vw,56px)', flexWrap: 'wrap' }}
        >
          <StatCounter num={15} unit="년" label="업력" />
          <StatCounter num={45} unit="+" label="매체 파트너" />
          <StatCounter num={800} unit="+" label="집행 사례" />
        </motion.div>
      </div>

      <div
        aria-hidden
        style={{
          position: 'absolute',
          bottom: 32,
          left: '50%',
          transform: 'translateX(-50%)',
          zIndex: 4,
          display: 'flex',
          flexDirection: 'column',
          alignItems: 'center',
          gap: 8,
        }}
      >
        <span
          style={{
            fontSize: 9,
            letterSpacing: '0.2em',
            textTransform: 'uppercase',
            color: 'rgba(255,255,255,0.25)',
          }}
        >
          Scroll
        </span>
        <div
          style={{
            width: 1,
            height: 44,
            background: 'linear-gradient(to bottom, rgba(0,229,255,0.6), transparent)',
          }}
        />
      </div>
    </section>
  )
}

function StrengthsSection() {
  return (
    <section style={{ background: '#0A0A0A', padding: 'clamp(72px,10vw,120px) clamp(24px,6vw,100px)' }}>
      <div style={{ maxWidth: 1200, margin: '0 auto' }}>
        <motion.div
          initial={{ opacity: 0, y: 24 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: '-80px' }}
          transition={{ duration: 0.6 }}
          style={{ textAlign: 'center', marginBottom: 'clamp(48px,6vw,72px)' }}
        >
          <p
            style={{
              margin: '0 0 14px',
              fontSize: 11,
              letterSpacing: '0.22em',
              textTransform: 'uppercase',
              color: '#00E5FF',
              fontWeight: 700,
            }}
          >
            Why OOH-LAB
          </p>
          <h2
            style={{
              margin: '0 0 16px',
              fontSize: 'clamp(28px,4vw,52px)',
              fontWeight: 800,
              color: '#FFFFFF',
              letterSpacing: '-0.025em',
              lineHeight: 1.1,
            }}
          >
            오랩이 다른 이유
          </h2>
          <p
            style={{
              margin: '0 auto',
              fontSize: 15,
              color: 'rgba(255,255,255,0.5)',
              lineHeight: 1.7,
              maxWidth: 460,
            }}
          >
            15년의 현장 경험이 만든 검증된 광고 솔루션
          </p>
        </motion.div>

        <div
          style={{
            display: 'grid',
            gridTemplateColumns: 'repeat(auto-fit, minmax(240px, 1fr))',
            gap: 20,
          }}
        >
          {STRENGTHS.map((item, i) => (
            <TiltCard key={item.id} item={item} index={i} />
          ))}
        </div>
      </div>
    </section>
  )
}

function WorksSection() {
  const [active, setActive] = useState<Work | null>(null)

  return (
    <section
      style={{
        background: '#0D0D0D',
        padding: 'clamp(72px,10vw,120px) clamp(24px,6vw,100px)',
        borderTop: '1px solid rgba(255,255,255,0.04)',
      }}
    >
      <div style={{ maxWidth: 1200, margin: '0 auto' }}>
        <motion.div
          initial={{ opacity: 0, y: 24 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: '-80px' }}
          transition={{ duration: 0.6 }}
          style={{
            display: 'flex',
            justifyContent: 'space-between',
            alignItems: 'flex-end',
            flexWrap: 'wrap',
            gap: 20,
            marginBottom: 'clamp(40px,5vw,60px)',
          }}
        >
          <div>
            <p
              style={{
                margin: '0 0 14px',
                fontSize: 11,
                letterSpacing: '0.22em',
                textTransform: 'uppercase',
                color: '#00E5FF',
                fontWeight: 700,
              }}
            >
              Works
            </p>
            <h2
              style={{
                margin: '0 0 12px',
                fontSize: 'clamp(28px,4vw,52px)',
                fontWeight: 800,
                color: '#FFFFFF',
                letterSpacing: '-0.025em',
                lineHeight: 1.1,
              }}
            >
              대표 캠페인
            </h2>
            <p style={{ margin: 0, fontSize: 15, color: 'rgba(255,255,255,0.5)', lineHeight: 1.7 }}>
              기업부터 공공기관까지 — 결과로 말합니다.
            </p>
          </div>
          <Link
            href="/works"
            style={{
              padding: '12px 24px',
              border: '1px solid rgba(0,229,255,0.35)',
              borderRadius: 8,
              color: '#00E5FF',
              textDecoration: 'none',
              fontSize: 13,
              fontWeight: 700,
              letterSpacing: '0.04em',
              transition: 'background 0.2s',
              whiteSpace: 'nowrap',
            }}
          >
            전체 보기 →
          </Link>
        </motion.div>

        <div
          style={{
            display: 'grid',
            gridTemplateColumns: 'repeat(auto-fill, minmax(300px, 1fr))',
            gap: 20,
          }}
        >
          {WORKS.map((work, i) => (
            <WorkCard key={work.id} work={work} index={i} onClick={() => setActive(work)} />
          ))}
        </div>
      </div>

      <AnimatePresence>
        {active && <Lightbox work={active} onClose={() => setActive(null)} />}
      </AnimatePresence>
    </section>
  )
}

function CTASection() {
  return (
    <section
      style={{
        background: '#0A0A0A',
        padding: 'clamp(80px,12vw,160px) clamp(24px,6vw,100px)',
        textAlign: 'center',
        borderTop: '1px solid rgba(255,255,255,0.05)',
        position: 'relative',
        overflow: 'hidden',
      }}
    >
      <div
        aria-hidden
        style={{
          position: 'absolute',
          top: '50%',
          left: '50%',
          transform: 'translate(-50%,-50%)',
          width: 600,
          height: 600,
          background: 'radial-gradient(circle, rgba(0,229,255,0.07) 0%, transparent 70%)',
          pointerEvents: 'none',
        }}
      />

      <div style={{ position: 'relative', zIndex: 1 }}>
        <motion.p
          initial={{ opacity: 0, y: 16 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5 }}
          style={{
            margin: '0 0 16px',
            fontSize: 11,
            letterSpacing: '0.22em',
            textTransform: 'uppercase',
            color: '#00E5FF',
            fontWeight: 700,
          }}
        >
          Action Speaks Louder
        </motion.p>
        <motion.h2
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6, delay: 0.1 }}
          style={{
            margin: '0 0 20px',
            fontSize: 'clamp(32px,5vw,64px)',
            fontWeight: 900,
            color: '#FFFFFF',
            letterSpacing: '-0.025em',
            lineHeight: 1.08,
          }}
        >
          지금 시작하면
          <br />
          내일이 달라집니다.
        </motion.h2>
        <motion.p
          initial={{ opacity: 0, y: 16 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5, delay: 0.2 }}
          style={{ margin: '0 0 48px', fontSize: 16, color: 'rgba(255,255,255,0.5)', lineHeight: 1.7 }}
        >
          무료 미디어 플랜을 제안해 드립니다.
          <br />
          요청 후 24시간 내 회신 보장.
        </motion.p>
        <motion.div
          initial={{ opacity: 0, y: 16 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5, delay: 0.3 }}
          style={{ display: 'flex', gap: 16, justifyContent: 'center', flexWrap: 'wrap' }}
        >
          <MagneticButton href="https://pf.kakao.com/_OOHLABchannel" primary external>
            💬 카카오톡으로 즉시 상담
          </MagneticButton>
          <MagneticButton href="/contact">문의 폼 작성하기</MagneticButton>
        </motion.div>
      </div>
    </section>
  )
}

export function LandingPage() {
  return (
    <>
      <ScrollProgress />
      <HeroSection />
      <StrengthsSection />
      <WorksSection />
      <CTASection />
    </>
  )
}
