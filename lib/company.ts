/**
 * 회사 정보 (한 곳에서 관리)
 *
 * 실제 배포 전에 이 파일의 값들을 회사 정보로 교체하세요.
 * 값이 비어 있으면 푸터/법적 정보 영역에서 자동으로 숨겨집니다.
 */
export const COMPANY = {
  legalName: 'OOH-LAB Co., Ltd.',
  koreanName: '오랩',
  tagline: '말보다 행동으로 증명합니다.',
  description: '여성기업인증 · 옥외광고 전문 대행사',

  // TODO: 실제 사업자 정보로 교체
  ceo: '',                       // 예: '김오랩'
  businessNumber: '',            // 예: '123-45-67890'
  address: '',                   // 예: '서울특별시 강남구 테헤란로 123'
  phone: '',                     // 예: '02-1234-5678'
  email: 'contact@oohlab.co.kr',

  // 외부 링크
  kakaoChannel:
    process.env.NEXT_PUBLIC_KAKAO_CHANNEL_URL ||
    'https://pf.kakao.com/_OOHLABchannel',

  // 사이트 URL (canonical, sitemap 등에서 사용)
  siteUrl: process.env.NEXT_PUBLIC_SITE_URL || 'https://oohlab.co.kr',
} as const
