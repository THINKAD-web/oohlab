import type { Metadata } from 'next'
import Link from 'next/link'
import { COMPANY } from '@/lib/company'

export const metadata: Metadata = {
  title: '개인정보처리방침',
  description: `${COMPANY.koreanName}(${COMPANY.legalName})의 개인정보 처리방침 안내 페이지입니다.`,
  robots: { index: true, follow: true },
}

export default function PrivacyPage() {
  return (
    <div style={{ background: '#0A0A0A', minHeight: '100vh', paddingTop: 64, color: '#fff' }}>
        <div style={{ padding: 'clamp(48px, 6vw, 80px) clamp(24px, 8vw, 120px)', maxWidth: 900 }}>
          <p style={{
            margin: '0 0 12px',
            fontSize: 11,
            letterSpacing: '0.2em',
            textTransform: 'uppercase',
            color: 'rgba(255,255,255,0.35)',
          }}>
            Privacy Policy
          </p>
          <h1 style={{
            margin: '0 0 40px',
            fontSize: 'clamp(28px, 4vw, 44px)',
            fontWeight: 800,
            letterSpacing: '-0.02em',
            fontFamily: "'Pretendard', sans-serif",
          }}>
            개인정보처리방침
          </h1>

          <div style={{ fontSize: 15, lineHeight: 1.8, color: 'rgba(255,255,255,0.75)' }}>
            <p>
              {COMPANY.koreanName}({COMPANY.legalName}, 이하 &quot;회사&quot;)는
              이용자의 개인정보를 중요시하며, 「개인정보 보호법」 등 관련 법령을 준수하고 있습니다.
              본 방침은 회사가 운영하는 웹사이트({COMPANY.siteUrl.replace(/^https?:\/\//, '')})의
              문의 폼을 통해 수집되는 개인정보에 한해 적용됩니다.
            </p>

            <Section title="1. 수집하는 개인정보 항목">
              <ul>
                <li>필수 항목: 이름, 연락처, 문의 유형</li>
                <li>선택 항목: 회사/기관명, 이메일, 문의 내용</li>
                <li>자동 수집: 접속 로그, IP 주소, 쿠키, 접속 환경</li>
              </ul>
            </Section>

            <Section title="2. 개인정보 수집·이용 목적">
              <ul>
                <li>문의 접수 및 회신</li>
                <li>광고 집행·제안을 위한 상담 및 견적 제공</li>
                <li>서비스 품질 개선을 위한 통계 분석</li>
              </ul>
            </Section>

            <Section title="3. 개인정보의 보유 및 이용 기간">
              <p>
                수집된 개인정보는 문의 회신 및 상담 완료 후 <strong>최대 1년간</strong> 보관 후 즉시 파기합니다.
                다만, 관계 법령에 따라 보존할 필요가 있는 경우 해당 기간 동안 보관합니다.
              </p>
            </Section>

            <Section title="4. 개인정보의 제3자 제공">
              <p>
                회사는 이용자의 개인정보를 원칙적으로 제3자에게 제공하지 않습니다.
                다만, 이용자의 사전 동의가 있거나 법령의 규정에 따라 요구되는 경우에만 제공합니다.
              </p>
            </Section>

            <Section title="5. 이용자의 권리">
              <p>
                이용자는 언제든지 등록된 개인정보의 열람·정정·삭제를 요청할 수 있으며,
                아래 연락처를 통해 신청하실 수 있습니다.
              </p>
            </Section>

            <Section title="6. 개인정보 보호 책임자">
              <ul>
                {COMPANY.ceo && <li>책임자: {COMPANY.ceo}</li>}
                <li>이메일: {COMPANY.email}</li>
                {COMPANY.phone && <li>전화: {COMPANY.phone}</li>}
              </ul>
            </Section>

            <Section title="7. 방침 변경">
              <p>
                본 방침은 법령·정책 또는 보안기술의 변경에 따라 개정될 수 있으며,
                변경 시 본 페이지를 통해 공지합니다.
              </p>
            </Section>

            <p style={{ marginTop: 48, fontSize: 13, color: 'rgba(255,255,255,0.4)' }}>
              공고일자: {new Date().getFullYear()}년 1월 1일 · 시행일자: {new Date().getFullYear()}년 1월 1일
            </p>
          </div>

        <div style={{ marginTop: 64, paddingTop: 24, borderTop: '1px solid #1E1E1E' }}>
          <Link href="/" style={{
            fontSize: 13,
            color: 'rgba(255,255,255,0.5)',
            textDecoration: 'none',
          }}>
            ← 홈으로
          </Link>
        </div>
      </div>
    </div>
  )
}

function Section({ title, children }: { title: string; children: React.ReactNode }) {
  return (
    <div style={{ marginBottom: 32 }}>
      <h2 style={{
        margin: '0 0 12px',
        fontSize: 17,
        fontWeight: 700,
        color: '#fff',
        fontFamily: "'Pretendard', sans-serif",
      }}>
        {title}
      </h2>
      <div>{children}</div>
    </div>
  )
}
