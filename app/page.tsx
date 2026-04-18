import type { Metadata } from 'next'
import { LandingPage } from '@/components/home/LandingPage'

export const metadata: Metadata = {
  title: '오랩(OOH-LAB) | 대한민국 대표 옥외광고 대행사',
  description:
    '15년 경력. 말보다 행동으로 증명합니다. 트렌드 미디어믹스로 강력한 결과를 만들어갑니다. 여성기업인증.',
}

export default function HomePage() {
  return <LandingPage />
}
