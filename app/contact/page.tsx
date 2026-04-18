import type { Metadata } from 'next'
import { ContactInfo } from '@/components/contact/ContactInfo'
import { ContactForm } from '@/components/contact/ContactForm'

export const metadata: Metadata = {
  title: 'Contact — 문의하기',
  description: '오랩에 문의하세요. 무료 미디어 제안, 지자체·공공기관 전용 상담 가능.',
}

export default function ContactPage() {
  return (
    <div style={{ minHeight: '100vh' }}>
      <div
        style={{
          display: 'grid',
          gridTemplateColumns: 'repeat(auto-fit, minmax(300px, 1fr))',
          minHeight: '100vh',
        }}
      >
        {/* 왼쪽: 어두운 다크 패널 */}
        <ContactInfo />

        {/* 오른쪽: 크림 패널 */}
        <div
          style={{
            padding: 'clamp(48px, 7vw, 88px) clamp(24px, 6vw, 80px)',
            display: 'flex',
            flexDirection: 'column',
            justifyContent: 'center',
            background: '#F8F5F0',
            paddingTop: 'calc(clamp(48px, 7vw, 88px) + 64px)',
          }}
        >
          <ContactForm />
        </div>
      </div>
    </div>
  )
}
