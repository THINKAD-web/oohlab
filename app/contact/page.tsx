import type { Metadata } from 'next'
import { EditorialContact } from '@/components/contact/EditorialContact'

export const metadata: Metadata = {
  title: 'Contact — Next Issue',
  description:
    '오랩 프로젝트 문의. 24시간 내 회신. 매체 선정부터 집행·정산까지. 여성기업인증 — 지자체·공공기관 직접선.',
}

export default function ContactPage() {
  return <EditorialContact />
}
