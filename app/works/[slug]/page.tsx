import { notFound } from 'next/navigation'
import type { Metadata } from 'next'
import Image from 'next/image'
import Link from 'next/link'
import worksData from '@/data/works.json'
import type { Work } from '@/lib/types'

interface Props {
  params: Promise<{ slug: string }>
}

// 정적 경로 생성 (빌드타임)
export async function generateStaticParams() {
  return worksData.works.map((w) => ({ slug: w.slug }))
}

// 동적 메타데이터
export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { slug } = await params
  const work = worksData.works.find((w) => w.slug === slug) as Work | undefined
  if (!work) return { title: '사례를 찾을 수 없습니다' }
  return {
    title: `${work.title} | Works`,
    description: work.story,
    openGraph: {
      title: work.title,
      description: work.story,
      images: [{ url: work.heroImage, alt: work.title }],
    },
  }
}

export default async function WorkDetailPage({ params }: Props) {
  const { slug } = await params
  const work = worksData.works.find((w) => w.slug === slug) as Work | undefined
  if (!work) notFound()

  return (
    <div style={{ background: '#0A0A0A', minHeight: '100vh', paddingTop: 64 }}>
      {/* 히어로 */}
      <div style={{ position: 'relative', width: '100%', height: '70vh', minHeight: 400 }}>
        <Image
          src={work.heroImage}
          alt={work.title}
          fill
          priority
          style={{ objectFit: 'cover' }}
        />
        <div
          style={{
            position: 'absolute', inset: 0,
            background: 'linear-gradient(to bottom, rgba(10,10,10,0.2) 0%, rgba(10,10,10,0.85) 100%)',
          }}
        />
        <div
          style={{
            position: 'absolute', bottom: 0, left: 0, right: 0,
            padding: 'clamp(24px, 5vw, 64px)',
          }}
        >
          <p style={{
            margin: '0 0 12px', fontSize: 11, letterSpacing: '0.15em',
            textTransform: 'uppercase', color: 'rgba(255,255,255,0.4)',
          }}>
            {work.mediaType} · {work.year}
          </p>
          <h1 style={{
            margin: 0,
            fontSize: 'clamp(28px, 5vw, 56px)',
            fontWeight: 800,
            color: '#fff',
            letterSpacing: '-0.02em',
            lineHeight: 1.1,
            fontFamily: "'Pretendard', sans-serif",
          }}>
            {work.title}
          </h1>
        </div>
      </div>

      {/* 콘텐츠 */}
      <div style={{ padding: 'clamp(48px, 6vw, 80px) clamp(24px, 8vw, 120px)', maxWidth: 900 }}>
        {/* 배지 */}
        <div style={{ display: 'flex', gap: 8, marginBottom: 28, flexWrap: 'wrap' }}>
          <span style={{
            padding: '4px 12px',
            background: 'rgba(255,255,255,0.08)',
            border: '1px solid rgba(255,255,255,0.12)',
            borderRadius: '2px',
            fontSize: 11, letterSpacing: '0.12em', textTransform: 'uppercase',
            color: 'rgba(255,255,255,0.6)',
          }}>
            {work.mediaType}
          </span>
          {work.isWomenCertProject && (
            <span style={{
              padding: '4px 12px',
              background: 'rgba(255,77,0,0.15)',
              border: '1px solid rgba(255,77,0,0.4)',
              borderRadius: '2px',
              fontSize: 11, letterSpacing: '0.12em', textTransform: 'uppercase',
              color: '#F37021', fontWeight: 700,
            }}>
              여성기업 인증 프로젝트
            </span>
          )}
          {work.isGovernment && (
            <span style={{
              padding: '4px 12px',
              background: 'rgba(255,255,255,0.06)',
              border: '1px solid rgba(255,255,255,0.12)',
              borderRadius: '2px',
              fontSize: 11, letterSpacing: '0.12em', textTransform: 'uppercase',
              color: 'rgba(255,255,255,0.5)',
            }}>
              지자체·공공기관
            </span>
          )}
        </div>

        <p style={{ margin: '0 0 48px', fontSize: 18, color: 'rgba(255,255,255,0.65)', lineHeight: 1.75 }}>
          {work.story}
        </p>

        {/* 성과 지표 (값이 있는 항목만 표시) */}
        {(() => {
          const items = [
            { label: '총 노출수', value: work.stats.impressions },
            { label: '집행 기간', value: work.stats.duration    },
            { label: '집행 지역', value: work.stats.locations   },
            { label: '핵심 성과', value: work.stats.result      },
          ].filter((s) => s.value && s.value.trim() !== '')

          if (items.length === 0) return null

          return (
            <div style={{
              display: 'grid',
              gridTemplateColumns: 'repeat(auto-fit, minmax(160px, 1fr))',
              gap: '1px',
              background: '#1E1E1E',
              border: '1px solid #1E1E1E',
              marginBottom: 48,
            }}>
              {items.map((s) => (
                <div key={s.label} style={{ padding: '28px 24px', background: '#0D0D0D' }}>
                  <p style={{
                    margin: '0 0 8px', fontSize: 10, letterSpacing: '0.15em',
                    textTransform: 'uppercase', color: 'rgba(255,255,255,0.3)',
                  }}>
                    {s.label}
                  </p>
                  <p style={{
                    margin: 0, fontSize: 22, fontWeight: 700, color: '#F37021',
                    fontFamily: "'Pretendard', sans-serif",
                  }}>
                    {s.value}
                  </p>
                </div>
              ))}
            </div>
          )
        })()}

        <div style={{ display: 'flex', gap: 12, flexWrap: 'wrap' }}>
          <Link href="/works" style={{
            padding: '14px 24px',
            border: '1px solid rgba(255,255,255,0.15)',
            color: 'rgba(255,255,255,0.5)',
            borderRadius: '4px',
            textDecoration: 'none',
            fontSize: 13,
          }}>
            ← 전체 사례
          </Link>
          <a
            href="https://pf.kakao.com/_OOHLABchannel"
            target="_blank"
            rel="noopener noreferrer"
            style={{
              padding: '14px 24px',
              background: '#F37021',
              color: '#fff',
              borderRadius: '4px',
              textDecoration: 'none',
              fontSize: 13,
              fontWeight: 700,
            }}
          >
            💬 이 캠페인 문의하기
          </a>
        </div>
      </div>
    </div>
  )
}
