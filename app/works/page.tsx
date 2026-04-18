import type { Metadata } from 'next'
import worksData from '@/data/works.json'
import { WorksGrid } from '@/components/works/WorksGrid'
import type { Work } from '@/lib/types'

export const metadata: Metadata = {
  title: 'Works — 집행 사례',
  description:
    '오랩이 직접 집행한 대표 옥외광고·DOOH 캠페인 사례. 지자체, 대기업, 스타트업 전 분야.',
}

export default function WorksPage() {
  const works = worksData.works as unknown as Work[]

  return (
    <div
      style={{
        background: '#0A0A0A',
        minHeight: '100vh',
        paddingTop: 100,
        paddingBottom: 100,
      }}
    >
      <div style={{ padding: '0 clamp(24px, 6vw, 100px)' }}>
        <div style={{ marginBottom: 64 }}>
          <p
            style={{
              margin: '0 0 14px',
              fontSize: 11,
              letterSpacing: '0.22em',
              textTransform: 'uppercase',
              color: '#F37021',
              fontWeight: 600,
            }}
          >
            Our Works
          </p>
          <h1
            style={{
              margin: '0 0 16px',
              fontSize: 'clamp(32px, 5vw, 64px)',
              fontWeight: 800,
              color: '#FFFFFF',
              letterSpacing: '-0.025em',
              lineHeight: 1.05,
              fontFamily: "'Pretendard', sans-serif",
            }}
          >
            결과가 증거입니다.
          </h1>
          <p
            style={{
              margin: 0,
              fontSize: 15,
              color: 'rgba(255,255,255,0.55)',
              maxWidth: 440,
              lineHeight: 1.65,
            }}
          >
            15년 간 직접 집행한 대표 캠페인. 숫자가 말합니다.
          </p>
        </div>

        <WorksGrid works={works} />
      </div>
    </div>
  )
}
