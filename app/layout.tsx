import './globals.css'
import type { Metadata } from 'next'
import { Navbar } from '@/components/layout/Navbar'
import { Footer } from '@/components/layout/Footer'
import { CustomCursor } from '@/components/ui/CustomCursor'
import { SmoothScroll } from '@/components/ui/SmoothScroll'

export const metadata: Metadata = {
  metadataBase: new URL(process.env.NEXT_PUBLIC_SITE_URL || 'https://oohlab.co.kr'),
  title: {
    default: '오랩(OOH-LAB) | 대한민국 대표 옥외광고 대행사',
    template: '%s | OOH-LAB',
  },
  description:
    '15년 경력, 전국 2,400개+ 매체 네트워크. DOOH·옥외광고·미디어믹스 전문 대행사. 여성기업인증. 지자체·공공기관 우선 협상 대상.',
  keywords: [
    '옥외광고', 'OOH', 'DOOH', '광고대행사', '미디어믹스',
    '여성기업인증', '지자체광고', '공공기관광고', '전광판광고',
    '버스쉘터광고', '지하철광고', '빌보드', '오랩',
  ],
  authors: [{ name: '오랩(OOH-LAB)' }],
  creator: 'OOH-LAB',
  openGraph: {
    type: 'website',
    locale: 'ko_KR',
    url: process.env.NEXT_PUBLIC_SITE_URL || 'https://oohlab.co.kr',
    siteName: '오랩(OOH-LAB)',
    title: '오랩 — 말보다 행동으로 증명합니다',
    description: '15년 경력 옥외광고 전문 대행사. 여성기업인증.',
    images: [
      {
        url: '/og-image.jpg',
        width: 1200,
        height: 630,
        alt: '오랩(OOH-LAB) 옥외광고 대행사',
      },
    ],
  },
  twitter: {
    card: 'summary_large_image',
    title: '오랩 — 말보다 행동으로 증명합니다',
    description: '15년 경력 옥외광고 전문 대행사. 여성기업인증.',
    images: ['/og-image.jpg'],
  },
  robots: {
    index: true,
    follow: true,
    googleBot: { index: true, follow: true, 'max-image-preview': 'large' },
  },
  other: {
    // Naver 소유권 확인 코드 — .env의 NAVER_SITE_VERIFICATION에서 주입
    ...(process.env.NAVER_SITE_VERIFICATION
      ? { 'naver-site-verification': process.env.NAVER_SITE_VERIFICATION }
      : {}),
  },
  verification: {
    // Google Search Console 코드 — .env의 GOOGLE_SITE_VERIFICATION에서 주입
    ...(process.env.GOOGLE_SITE_VERIFICATION
      ? { google: process.env.GOOGLE_SITE_VERIFICATION }
      : {}),
  },
  alternates: {
    canonical: process.env.NEXT_PUBLIC_SITE_URL || 'https://oohlab.co.kr',
  },
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="ko">
      <body>
        <SmoothScroll>
          <CustomCursor />
          <Navbar />
          <main id="main-content">{children}</main>
          <Footer />
        </SmoothScroll>
      </body>
    </html>
  )
}
