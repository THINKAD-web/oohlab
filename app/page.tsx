import type { Metadata } from 'next'
import { EditorialHome } from '@/components/home/EditorialHome'

export const metadata: Metadata = {
  title: '오랩(OOH-LAB) | 대한민국 대표 옥외광고 대행사',
  description:
    '15년 경력 옥외광고 전문 대행사. 도시는 매체다 — 기업·공공기관 캠페인 사례. 여성기업인증.',
}

export default function HomePage() {
  return <EditorialHome />
}
