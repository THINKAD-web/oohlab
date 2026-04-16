import type { Metadata } from 'next'
import { Navbar } from '@/components/layout/Navbar'
import { CustomCursor } from '@/components/ui/CustomCursor'
import { SmoothScroll } from '@/components/ui/SmoothScroll'

// ── Pretendard 폰트 (로컬 호스팅 권장 / CDN fallback)
// 실제 배포 시 public/fonts 폴더에 Pretendard WOFF2 파일 배치
// next/font/local을 사용하면 FOUT 없이 최적화됨

export const metadata: Metadata = {
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
    url: 'https://oohlab.co.kr',
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
    // Naver 소유권 확인 코드 (실제 코드로 교체)
    'naver-site-verification': 'NAVER_VERIFICATION_CODE',
  },
  alternates: {
    canonical: 'https://oohlab.co.kr',
  },
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="ko">
      <head>
        {/* Pretendard CDN — 프로덕션에서는 next/font/local 권장 */}
        <link
          rel="stylesheet"
          href="https://cdn.jsdelivr.net/gh/orioncactus/pretendard@v1.3.9/dist/web/static/pretendard-dynamic-subset.min.css"
        />
      </head>
      <body
        style={{
          margin: 0,
          padding: 0,
          background: '#0A0A0A',
          color: '#FFFFFF',
          fontFamily: "'Pretendard', -apple-system, BlinkMacSystemFont, sans-serif",
          overflowX: 'hidden',
          // 커스텀 커서 적용 (데스크톱)
          cursor: 'none',
        }}
      >
        <SmoothScroll>
          <CustomCursor />
          <Navbar />
          <main id="main-content">{children}</main>
        </SmoothScroll>

        {/* 전역 CSS 리셋 + 유틸리티 */}
        <style>{`
          *, *::before, *::after { box-sizing: border-box; }
          img, video { max-width: 100%; display: block; }
          button { font-family: inherit; }
          a { font-family: inherit; }
          /* 모바일에서는 기본 커서 복원 */
          @media (pointer: coarse) {
            body { cursor: auto !important; }
          }
          /* 스크롤바 스타일링 */
          ::-webkit-scrollbar { width: 3px; }
          ::-webkit-scrollbar-track { background: #0A0A0A; }
          ::-webkit-scrollbar-thumb { background: #333; border-radius: 2px; }
          /* 선택 색상 */
          ::selection { background: #F37021; color: #fff; }
        `}</style>
      </body>
    </html>
  )
}
