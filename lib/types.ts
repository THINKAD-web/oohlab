// ─────────────────────────────────────────────
//  OOH-LAB 전체 타입 정의
//  모든 JSON 데이터는 이 타입을 기준으로 작성
// ─────────────────────────────────────────────

// ──────────────────────────────
//  WORKS
// ──────────────────────────────

/** Works 카드 한 건 */
export interface Work {
  id: string
  slug: string                     // URL: /works/[slug]
  title: string
  client: string
  clientType: ClientType
  mediaType: MediaType
  category: string[]               // 필터 복수 태그
  isPublic: boolean                // false → 비공개 (모달 제목만 표시)
  isGovernment: boolean            // 지자체·공공기관 여부
  isWomenCertProject: boolean      // 여성기업인증 활용 프로젝트 여부
  year: number
  thumbnail: string                // 정적 썸네일 (1:1 또는 4:3)
  videoPreview: string | null      // hover 시 재생될 짧은 WebM (5–10s)
  videoFull: string | null         // 모달 전체 영상 WebM
  heroImage: string                // 모달 풀스크린 히어로 이미지
  stats: WorkStats
  story: string                    // 한 줄 스토리 (모달 표시)
  tags: string[]
}

export type ClientType = '대기업' | '중소기업' | '스타트업' | '지자체·공공기관'
export type MediaType =
  | 'DOOH'
  | '빌보드'
  | '버스쉘터'
  | '버스'
  | '지하철'
  | '전광판'
  | '외벽'
  | '디지털사이니지'
  | '미디어믹스'
  | '현수막·배너'

/** Works 성과 지표 */
export interface WorkStats {
  impressions: string              // 예: "1,200만"
  duration: string                 // 예: "4주"
  locations: string                // 예: "서울 12개소"
  result: string                   // 핵심 성과 한 줄
}

/** Works 필터 상태 */
export interface WorksFilter {
  mediaType: MediaType | 'ALL'
  clientType: ClientType | 'ALL'
  isGovernment: boolean
  isWomenCertProject: boolean
}

// ──────────────────────────────
//  HOME
// ──────────────────────────────

export interface HomeData {
  hero: HeroData
  strengths: StrengthItem[]
  womenCert: WomenCertData
}

export interface HeroWomenCert {
  badge: string
  label: string
  highlight: string
}

export interface HeroData {
  video: string
  videoMp4: string                 // Safari fallback
  videoPoster: string              // 영상 로드 전 플레이스홀더
  slogan: string                   // 메인 슬로건 (타이핑 애니메이션)
  subSlogan: string                // 서브 슬로건
  youtubeId?: string               // 유튜브 배경 영상 ID (있으면 영상 우선)
  womenCertHero: HeroWomenCert     // Hero 섹션 여성기업인증 배지
  cta: CtaButton[]
}

export interface CtaButton {
  label: string
  type: 'kakao' | 'internal' | 'external'
  href: string
  style: 'primary' | 'secondary'
}

export interface StrengthItem {
  id: string
  icon: 'grid' | 'layers' | 'chart' | 'check'
  title: string
  body: string
}

export interface WomenCertData {
  badge: string                    // 배지 이미지 경로
  cert: string                     // 인증서 이미지 경로
  headline: string
  highlight: string                // 강조 문구
  benefits: string[]
}

// ──────────────────────────────
//  ABOUT
// ──────────────────────────────

export interface AboutData {
  headline: string
  subHeadline: string
  stats: StatItem[]
  timeline: TimelineItem[]
  womenCertSection: WomenCertSection
  partners: PartnerLogo[]
  closingLine: string
}

export interface StatItem {
  // NOTE: 아래 value는 플레이스홀더. 실제 데이터로 교체 시 숫자만 변경
  label: string
  value: number                    // 애니메이션 카운터 최종값
  unit: string                     // 예: "년", "%", "건+"
  prefix?: string                  // 예: "$", "약"
}

export interface TimelineItem {
  year: number
  event: string                    // 한 줄 임팩트 문장
}

export interface WomenCertSection {
  headline: string
  subline: string
  certImage: string
  badgeImage: string
  benefits: WomenBenefit[]
}

export interface WomenBenefit {
  title: string
  desc: string
}

export interface PartnerLogo {
  name: string
  logo: string                     // SVG 경로
}

// ──────────────────────────────
//  CONTACT
// ──────────────────────────────

export interface ContactData {
  headline: string
  subline: string
  kakaoChannelId: string
  kakaoLabel: string
  govSection: GovContactSection
  formFields: FormField[]
  map: MapConfig
}

export interface GovContactSection {
  headline: string
  body: string
  ctaLabel: string
  ctaHref: string
}

export interface FormField {
  id: string
  label: string
  type: 'text' | 'email' | 'tel' | 'select' | 'textarea'
  placeholder: string
  required: boolean
  options?: string[]               // select 타입일 때
}

export interface MapConfig {
  lat: number
  lng: number
  label: string
  address: string
}

// ──────────────────────────────
//  NAVBAR / GLOBAL
// ──────────────────────────────

export interface NavItem {
  label: string
  href: string
}

export interface SiteConfig {
  name: string
  tagline: string
  url: string
  ogImage: string
  social: {
    kakao: string
    instagram?: string
  }
}
