import type { Metadata } from 'next'
import { EditorialAbout } from '@/components/about/EditorialAbout'

export const metadata: Metadata = {
  title: 'About — Vol. 15 / 2026',
  description:
    '오랩(OOH-LAB) 소개. 옥외광고 전문 대행사. 2010년 서울 설립. 여성기업인증 보유.',
}

export default function AboutPage() {
  return <EditorialAbout />
}
