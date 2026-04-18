'use client'

import { useState } from 'react'
import type { Work, MediaType } from '@/lib/types'

const MEDIA_FILTERS: Array<{ label: string; value: MediaType | 'ALL' }> = [
  { label: '전체', value: 'ALL' },
  { label: '미디어믹스', value: '미디어믹스' },
  { label: '전광판', value: '전광판' },
  { label: '지하철', value: '지하철' },
  { label: '버스', value: '버스' },
  { label: '디지털사이니지', value: '디지털사이니지' },
  { label: '외벽', value: '외벽' },
]

const TYPE_COLORS: Record<string, string> = {
  '미디어믹스':     '#F37021',
  '전광판':         '#E8B86D',
  '지하철':         '#6D9EE8',
  '버스':           '#72C472',
  '디지털사이니지': '#C86DD2',
  '외벽':           '#D2916D',
  'DOOH':           '#F37021',
}

interface Props {
  works: Work[]
}

export function WorksList({ works }: Props) {
  const [mediaFilter, setMediaFilter] = useState<MediaType | 'ALL'>('ALL')
  const [govOnly, setGovOnly] = useState(false)

  const filtered = works.filter((w) => {
    if (mediaFilter !== 'ALL' && w.mediaType !== mediaFilter) return false
    if (govOnly && !w.isGovernment) return false
    return true
  })

  return (
    <div>
      {/* ── 필터 바 ── */}
      <div
        role="toolbar"
        aria-label="작업 필터"
        style={{
          display: 'flex',
          gap: 8,
          flexWrap: 'wrap',
          alignItems: 'center',
          marginBottom: 48,
        }}
      >
        {MEDIA_FILTERS.map((f) => (
          <button
            key={f.value}
            onClick={() => setMediaFilter(f.value)}
            aria-pressed={mediaFilter === f.value}
            style={{
              padding: '6px 14px',
              background: mediaFilter === f.value ? '#F37021' : 'transparent',
              color: mediaFilter === f.value ? '#fff' : 'rgba(255,255,255,0.5)',
              border: `1px solid ${mediaFilter === f.value ? '#F37021' : 'rgba(255,255,255,0.12)'}`,
              borderRadius: '2px',
              fontSize: 12,
              fontWeight: mediaFilter === f.value ? 700 : 400,
              letterSpacing: '0.06em',
              cursor: 'pointer',
              transition: 'all 0.18s',
              fontFamily: "'Pretendard', sans-serif",
            }}
          >
            {f.label}
          </button>
        ))}

        <div style={{ width: 1, height: 20, background: '#222', margin: '0 4px' }} />

        <button
          onClick={() => setGovOnly(!govOnly)}
          aria-pressed={govOnly}
          style={{
            padding: '6px 14px',
            background: govOnly ? 'rgba(255,255,255,0.08)' : 'transparent',
            color: govOnly ? '#fff' : 'rgba(255,255,255,0.4)',
            border: `1px solid ${govOnly ? 'rgba(255,255,255,0.2)' : 'rgba(255,255,255,0.08)'}`,
            borderRadius: '2px',
            fontSize: 12,
            letterSpacing: '0.06em',
            cursor: 'pointer',
            transition: 'all 0.18s',
            fontFamily: "'Pretendard', sans-serif",
          }}
        >
          🏛 지자체·공공기관
        </button>
      </div>

      {/* ── 헤더 행 ── */}
      <div
        aria-hidden="true"
        style={{
          display: 'grid',
          gridTemplateColumns: '56px 1fr auto',
          gap: '0 24px',
          padding: '0 0 12px',
          borderBottom: '1px solid #222',
          marginBottom: 0,
        }}
      >
        <span style={{ fontSize: 10, letterSpacing: '0.15em', textTransform: 'uppercase', color: 'rgba(255,255,255,0.2)' }}>#</span>
        <span style={{ fontSize: 10, letterSpacing: '0.15em', textTransform: 'uppercase', color: 'rgba(255,255,255,0.2)' }}>캠페인</span>
        <span style={{ fontSize: 10, letterSpacing: '0.15em', textTransform: 'uppercase', color: 'rgba(255,255,255,0.2)', textAlign: 'right' }}>매체 · 연도</span>
      </div>

      {/* ── 목록 ── */}
      {filtered.length === 0 ? (
        <div style={{ padding: '64px 0', textAlign: 'center', color: 'rgba(255,255,255,0.3)', fontSize: 14 }}>
          해당 조건의 사례가 없습니다.
        </div>
      ) : (
        <div>
          {filtered.map((work, i) => (
            <WorksListRow key={work.id} work={work} index={i} />
          ))}
        </div>
      )}

      {/* ── 하단 안내 ── */}
      <p
        style={{
          marginTop: 56,
          fontSize: 13,
          color: 'rgba(255,255,255,0.3)',
          textAlign: 'center',
          fontStyle: 'italic',
          letterSpacing: '0.01em',
        }}
      >
        추가 사례는 문의 주시면 PDF로 바로 전달드립니다.
      </p>
    </div>
  )
}

function WorksListRow({ work, index }: { work: Work; index: number }) {
  const typeColor = TYPE_COLORS[work.mediaType] || 'rgba(255,255,255,0.5)'

  return (
    <div
      style={{
        display: 'grid',
        gridTemplateColumns: '56px 1fr auto',
        gap: '0 24px',
        alignItems: 'center',
        padding: '22px 0',
        borderBottom: '1px solid #1A1A1A',
        transition: 'background 0.15s',
      }}
      onMouseEnter={(e) => { e.currentTarget.style.background = '#0F0F0F' }}
      onMouseLeave={(e) => { e.currentTarget.style.background = 'transparent' }}
    >
      {/* 번호 */}
      <span
        style={{
          fontSize: 13,
          fontWeight: 700,
          color: 'rgba(255,255,255,0.2)',
          letterSpacing: '0.05em',
          fontFamily: "'Pretendard', sans-serif",
          fontVariantNumeric: 'tabular-nums',
        }}
      >
        {String(index + 1).padStart(2, '0')}
      </span>

      {/* 타이틀 + 배지 */}
      <div style={{ minWidth: 0 }}>
        <div style={{ display: 'flex', alignItems: 'center', gap: 8, flexWrap: 'wrap', marginBottom: 4 }}>
          <span
            style={{
              fontSize: 15,
              fontWeight: 600,
              color: '#E8E8E8',
              lineHeight: 1.3,
              fontFamily: "'Pretendard', sans-serif",
              letterSpacing: '-0.01em',
            }}
          >
            {work.client}
          </span>
          {work.isWomenCertProject && (
            <span
              style={{
                padding: '2px 7px',
                background: 'rgba(243,112,33,0.15)',
                border: '1px solid rgba(243,112,33,0.35)',
                borderRadius: '2px',
                fontSize: 10,
                fontWeight: 700,
                color: '#F37021',
                letterSpacing: '0.08em',
                textTransform: 'uppercase',
                flexShrink: 0,
              }}
            >
              여성기업
            </span>
          )}
          {work.isGovernment && (
            <span
              style={{
                padding: '2px 7px',
                background: 'rgba(255,255,255,0.06)',
                border: '1px solid rgba(255,255,255,0.1)',
                borderRadius: '2px',
                fontSize: 10,
                color: 'rgba(255,255,255,0.45)',
                letterSpacing: '0.08em',
                textTransform: 'uppercase',
                flexShrink: 0,
              }}
            >
              공공
            </span>
          )}
        </div>
        <p
          style={{
            margin: 0,
            fontSize: 12,
            color: 'rgba(255,255,255,0.4)',
            lineHeight: 1.4,
            overflow: 'hidden',
            textOverflow: 'ellipsis',
            whiteSpace: 'nowrap',
          }}
        >
          {work.title}
        </p>
      </div>

      {/* 매체 + 연도 */}
      <div style={{ textAlign: 'right', flexShrink: 0 }}>
        <span
          style={{
            display: 'block',
            fontSize: 12,
            fontWeight: 600,
            color: typeColor,
            letterSpacing: '0.04em',
            marginBottom: 2,
          }}
        >
          {work.mediaType}
        </span>
        <span
          style={{
            display: 'block',
            fontSize: 11,
            color: 'rgba(255,255,255,0.3)',
            fontVariantNumeric: 'tabular-nums',
          }}
        >
          {work.year}
        </span>
      </div>
    </div>
  )
}
