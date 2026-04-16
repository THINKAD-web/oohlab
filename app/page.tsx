import type { Metadata } from 'next'
import homeData from '@/data/home.json'
import worksData from '@/data/works.json'
import { HeroVideo } from '@/components/home/HeroVideo'
import { StrengthCards } from '@/components/home/StrengthCards'
import { WorksPreview } from '@/components/home/WorksPreview'
import type { HomeData, Work } from '@/lib/types'

export const metadata: Metadata = {
  title: '오랩(OOH-LAB) | 대한민국 대표 옥외광고 대행사',
  description:
    '15년 경력. 말보다 행동으로 증명합니다. 트렌드 미디어믹스로 강력한 결과를 만들어갑니다. 여성기업인증.',
}

export default function HomePage() {
  const data = homeData as unknown as HomeData
  const works = worksData.works as unknown as Work[]

  return (
    <>
      {/* ① 풀스크린 히어로 + 여성기업 배지 */}
      <HeroVideo data={data.hero} />

      {/* ② 핵심 강점 4 카드 */}
      <StrengthCards items={data.strengths} />

      {/* ③ 대표 Works 6 미리보기 */}
      <WorksPreview works={works} />

      {/* ④ 하단 CTA 풀블랙 섹션 */}
      <section
        aria-label="문의 유도"
        style={{
          background: '#000',
          padding: 'clamp(80px, 12vw, 160px) clamp(24px, 6vw, 100px)',
          textAlign: 'center',
          borderTop: '1px solid #1A1A1A',
        }}
      >
        <p
          style={{
            margin: '0 0 16px',
            fontSize: 11,
            letterSpacing: '0.22em',
            textTransform: 'uppercase',
            color: '#FF4D00',
            fontWeight: 600,
          }}
        >
          Action Speaks Louder
        </p>
        <h2
          style={{
            margin: '0 0 48px',
            fontSize: 'clamp(32px, 5vw, 64px)',
            fontWeight: 800,
            color: '#FFFFFF',
            letterSpacing: '-0.02em',
            lineHeight: 1.1,
            fontFamily: "'Pretendard', sans-serif",
          }}
        >
          지금 바로<br />시작하세요.
        </h2>
        <div
          style={{
            display: 'flex',
            gap: 16,
            justifyContent: 'center',
            flexWrap: 'wrap',
          }}
        >
          {data.hero.cta.map((btn) => (
            <a
              key={btn.label}
              href={btn.href}
              target={btn.type === 'kakao' ? '_blank' : undefined}
              rel={btn.type === 'kakao' ? 'noopener noreferrer' : undefined}
              data-cursor-pointer
              style={
                btn.style === 'primary'
                  ? {
                      display: 'inline-flex',
                      alignItems: 'center',
                      gap: 8,
                      padding: '18px 36px',
                      background: '#FF4D00',
                      color: '#fff',
                      fontWeight: 700,
                      fontSize: 16,
                      borderRadius: '4px',
                      textDecoration: 'none',
                    }
                  : {
                      display: 'inline-flex',
                      alignItems: 'center',
                      gap: 8,
                      padding: '18px 36px',
                      background: 'transparent',
                      color: 'rgba(255,255,255,0.65)',
                      fontWeight: 500,
                      fontSize: 16,
                      border: '1px solid rgba(255,255,255,0.25)',
                      borderRadius: '4px',
                      textDecoration: 'none',
                    }
              }
            >
              {btn.label}
            </a>
          ))}
        </div>
      </section>
    </>
  )
}
