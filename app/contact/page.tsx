import type { Metadata } from 'next'
import { ContactForm } from '@/components/contact/ContactForm'

export const metadata: Metadata = {
  title: 'Contact — 문의하기',
  description: '오랩에 문의하세요. 무료 미디어 제안, 지자체·공공기관 전용 상담 가능.',
}

export default function ContactPage() {
  return (
    <div style={{ background: '#0A0A0A', minHeight: '100vh', paddingTop: 100 }}>
      <div
        style={{
          display: 'grid',
          gridTemplateColumns: 'repeat(auto-fit, minmax(300px, 1fr))',
          minHeight: 'calc(100vh - 100px)',
        }}
      >
        {/* ── 왼쪽: 헤더 + 지자체 강조 ── */}
        <div
          style={{
            padding: 'clamp(48px, 7vw, 88px) clamp(24px, 6vw, 80px)',
            display: 'flex',
            flexDirection: 'column',
            justifyContent: 'center',
            borderRight: '1px solid #1A1A1A',
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
            Contact
          </p>
          <h1
            style={{
              margin: '0 0 24px',
              fontSize: 'clamp(32px, 5vw, 58px)',
              fontWeight: 800,
              color: '#FFFFFF',
              letterSpacing: '-0.025em',
              lineHeight: 1.1,
              fontFamily: "'Pretendard', sans-serif",
            }}
          >
            지금 시작하면<br />내일이 달라집니다.
          </h1>
          <p
            style={{
              margin: '0 0 48px',
              fontSize: 15,
              color: 'rgba(255,255,255,0.4)',
              lineHeight: 1.7,
              maxWidth: 380,
            }}
          >
            무료 미디어 플랜을 제안해드립니다.<br />
            요청 후 24시간 내 회신 보장.
          </p>

          {/* 카카오톡 즉시 연결 */}
          <a
            href="https://pf.kakao.com/_OOHLABchannel"
            target="_blank"
            rel="noopener noreferrer"
            style={{
              display: 'inline-flex',
              alignItems: 'center',
              gap: 12,
              padding: '18px 28px',
              background: '#FAE100',
              color: '#191600',
              fontWeight: 800,
              fontSize: 15,
              borderRadius: '4px',
              textDecoration: 'none',
              width: 'fit-content',
              marginBottom: 48,
              letterSpacing: '0.01em',
              transition: 'transform 0.2s, box-shadow 0.2s',
            }}
            onMouseEnter={(e) => {
              e.currentTarget.style.transform = 'translateY(-2px)'
              e.currentTarget.style.boxShadow = '0 8px 24px rgba(250,225,0,0.25)'
            }}
            onMouseLeave={(e) => {
              e.currentTarget.style.transform = 'none'
              e.currentTarget.style.boxShadow = 'none'
            }}
          >
            <span aria-hidden="true" style={{ fontSize: 22 }}>💬</span>
            카카오톡으로 즉시 상담
          </a>

          {/* 지자체·공공기관 전용 */}
          <div
            style={{
              padding: '24px',
              background: 'rgba(255,77,0,0.06)',
              border: '1px solid rgba(255,77,0,0.2)',
              borderRadius: '4px',
              maxWidth: 420,
            }}
          >
            <p
              style={{
                margin: '0 0 8px',
                fontSize: 11,
                letterSpacing: '0.15em',
                textTransform: 'uppercase',
                color: '#FF4D00',
                fontWeight: 700,
              }}
            >
              🏛 지자체·공공기관 전용
            </p>
            <p
              style={{
                margin: '0 0 12px',
                fontSize: 14,
                color: '#FFFFFF',
                fontWeight: 600,
                lineHeight: 1.4,
              }}
            >
              여성기업인증 수의계약 · 공공입찰 가산점
            </p>
            <p
              style={{
                margin: '0 0 16px',
                fontSize: 13,
                color: 'rgba(255,255,255,0.45)',
                lineHeight: 1.6,
              }}
            >
              예산 규모·집행 목적·일정을 알려주시면<br />
              맞춤 제안서를 바로 드립니다.
            </p>
            <a
              href="mailto:gov@oohlab.co.kr"
              style={{
                fontSize: 12,
                color: '#FF4D00',
                textDecoration: 'none',
                fontWeight: 600,
                letterSpacing: '0.05em',
              }}
            >
              gov@oohlab.co.kr →
            </a>
          </div>
        </div>

        {/* ── 오른쪽: 문의 폼 ── */}
        <div
          style={{
            padding: 'clamp(48px, 7vw, 88px) clamp(24px, 6vw, 80px)',
            display: 'flex',
            flexDirection: 'column',
            justifyContent: 'center',
          }}
        >
          <ContactForm />
        </div>
      </div>
    </div>
  )
}
