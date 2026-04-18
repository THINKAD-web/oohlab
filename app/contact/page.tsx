import type { Metadata } from 'next'
import { ContactInfo } from '@/components/contact/ContactInfo'
import { ContactForm } from '@/components/contact/ContactForm'

export const metadata: Metadata = {
  title: 'Contact — 문의하기',
  description: '오랩에 문의하세요. 무료 미디어 제안, 지자체·공공기관 전용 상담 가능.',
}

export default function ContactPage() {
  return (
    <div
      style={{
        background: '#F8F5F0',
        minHeight: '100vh',
        paddingTop: 64,
      }}
    >
      <div
        style={{
          maxWidth: 1200,
          margin: '0 auto',
          display: 'grid',
          gridTemplateColumns: 'repeat(auto-fit, minmax(320px, 1fr))',
          gap: 'clamp(40px, 6vw, 80px)',
          padding: 'clamp(48px, 7vw, 88px) clamp(24px, 6vw, 80px)',
          alignItems: 'start',
        }}
      >
        <ContactInfo />
        <ContactForm />
      </div>
    </div>
  )
}
