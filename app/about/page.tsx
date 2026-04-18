import type { Metadata } from 'next'
import aboutData from '@/data/about.json'
import { Timeline, CounterStats } from '@/components/about/Timeline'
import { PartnerLogos } from '@/components/about/PartnerLogos'
import type { AboutData } from '@/lib/types'

export const metadata: Metadata = {
  title: 'About — 오랩 소개',
  description: '15년 경력 옥외광고 전문 대행사 오랩. 여성기업인증 보유. 지자체·공공기관 우선 협상 대상.',
}

export default function AboutPage() {
  const data = aboutData as unknown as AboutData

  return (
    <div style={{ background: '#F8F5F0', minHeight: '100vh', paddingTop: 100 }}>
      <div style={{ padding: '0 clamp(24px, 6vw, 100px)' }}>

        {/* ── 페이지 헤더 ── */}
        <div style={{ marginBottom: 'clamp(60px, 8vw, 100px)', maxWidth: 700 }}>
          <p style={{ margin: '0 0 16px', fontSize: 11, letterSpacing: '0.22em', textTransform: 'uppercase', color: '#F37021', fontWeight: 700 }}>
            About OOH-LAB
          </p>
          <h1
            style={{
              margin: '0 0 20px',
              fontSize: 'clamp(36px, 6vw, 72px)',
              fontWeight: 800,
              color: '#111111',
              letterSpacing: '-0.025em',
              lineHeight: 1.05,
              fontFamily: "'Pretendard', sans-serif",
            }}
          >
            {data.headline}
          </h1>
          <p style={{ margin: 0, fontSize: 16, color: '#666666', lineHeight: 1.7 }}>
            {data.subHeadline}
          </p>
        </div>

        {/* ── 숫자 카운터 ── */}
        <CounterStats stats={data.stats} />

        {/* ── 여성기업인증 강조 섹션 ── */}
        <section
          aria-label="여성기업인증 상세"
          style={{
            marginBottom: 'clamp(60px, 8vw, 100px)',
            padding: 'clamp(40px, 6vw, 72px)',
            background: '#FFFFFF',
            border: '1px solid #E8E4DB',
            borderRadius: '16px',
            boxShadow: '0 4px 24px rgba(0,0,0,0.04)',
            display: 'grid',
            gridTemplateColumns: 'auto 1fr',
            gap: 'clamp(32px, 5vw, 64px)',
            alignItems: 'center',
          }}
        >
          {/* 배지 */}
          <div style={{ textAlign: 'center' }}>
            <div
              style={{
                width: 'clamp(80px, 12vw, 140px)',
                height: 'clamp(80px, 12vw, 140px)',
                borderRadius: '50%',
                background: 'linear-gradient(135deg, #F37021 0%, #FF9A3C 100%)',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                fontSize: 'clamp(36px, 6vw, 64px)',
                margin: '0 auto 16px',
                boxShadow: '0 8px 32px rgba(243,112,33,0.25)',
              }}
              aria-hidden="true"
            >
              ♀
            </div>
            <span style={{ fontSize: 11, letterSpacing: '0.15em', textTransform: 'uppercase', color: '#F37021', fontWeight: 700 }}>
              인증완료
            </span>
          </div>

          {/* 텍스트 */}
          <div>
            <h2 style={{ margin: '0 0 8px', fontSize: 'clamp(22px, 3.5vw, 36px)', fontWeight: 800, color: '#111111', letterSpacing: '-0.02em', fontFamily: "'Pretendard', sans-serif" }}>
              {data.womenCertSection.headline}
            </h2>
            <p style={{ margin: '0 0 28px', fontSize: 15, color: '#F37021', fontWeight: 600 }}>
              {data.womenCertSection.subline}
            </p>
            <ul style={{ margin: 0, padding: 0, listStyle: 'none', display: 'flex', flexDirection: 'column', gap: 12 }}>
              {data.womenCertSection.benefits.map((b) => (
                <li key={b.title} style={{ display: 'flex', gap: 12, alignItems: 'flex-start' }}>
                  <span aria-hidden="true" style={{ color: '#F37021', fontSize: 16, lineHeight: '22px', flexShrink: 0 }}>→</span>
                  <div>
                    <strong style={{ display: 'block', fontSize: 14, color: '#111111', fontWeight: 600, marginBottom: 2 }}>{b.title}</strong>
                    <span style={{ fontSize: 13, color: '#888888' }}>{b.desc}</span>
                  </div>
                </li>
              ))}
            </ul>
          </div>
        </section>

        {/* ── 15년 타임라인 ── */}
        <section aria-labelledby="timeline-heading" style={{ marginBottom: 'clamp(60px, 8vw, 100px)' }}>
          <p style={{ margin: '0 0 16px', fontSize: 11, letterSpacing: '0.22em', textTransform: 'uppercase', color: '#F37021', fontWeight: 700 }}>
            Timeline
          </p>
          <h2
            id="timeline-heading"
            style={{ margin: '0 0 56px', fontSize: 'clamp(24px, 4vw, 44px)', fontWeight: 800, color: '#111111', letterSpacing: '-0.02em', fontFamily: "'Pretendard', sans-serif" }}
          >
            15년이 쌓인 자리.
          </h2>
          <Timeline items={data.timeline} />
        </section>

        {/* ── 파트너 매체사 ── */}
        <section aria-label="파트너 매체사" style={{ marginBottom: 'clamp(60px, 8vw, 100px)' }}>
          <p style={{ margin: '0 0 32px', fontSize: 11, letterSpacing: '0.22em', textTransform: 'uppercase', color: '#AAAAAA', fontWeight: 600 }}>
            Media Partners
          </p>
          <PartnerLogos partners={data.partners} />
        </section>

        {/* ── 클로징 문구 ── */}
        <div style={{ textAlign: 'center', padding: 'clamp(60px, 8vw, 100px) 0', borderTop: '1px solid #E8E4DB' }}>
          <p style={{ margin: '0 0 8px', fontSize: 11, letterSpacing: '0.22em', textTransform: 'uppercase', color: '#F37021', fontWeight: 700 }}>
            OOH-LAB
          </p>
          <h2 style={{ margin: 0, fontSize: 'clamp(40px, 7vw, 88px)', fontWeight: 900, color: '#111111', letterSpacing: '-0.03em', lineHeight: 1, fontFamily: "'Pretendard', sans-serif" }}>
            {data.closingLine}
          </h2>
        </div>

      </div>
    </div>
  )
}
