import type { Metadata } from 'next'
import { ContactInfo } from '@/components/contact/ContactInfo'
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
        {/* 왼쪽: 헤더 + 카카오 + 지자체 강조 (Client Component) */}
        <ContactInfo />

        {/* 오른쪽: 문의 폼 (Client Component) */}
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
