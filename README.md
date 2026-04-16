# OOH-LAB 공식 웹사이트

> 대한민국 대표 옥외광고 대행사 오랩(OOH-LAB) 공식 사이트

---

## 기술 스택

| 영역 | 기술 |
|------|------|
| 프레임워크 | Next.js 15 (App Router) |
| 언어 | TypeScript |
| 스타일 | Inline styles (CSS-in-JS 없이 성능 최적화) |
| 애니메이션 | GSAP + ScrollTrigger |
| 스크롤 | Lenis (smooth cinematic scroll) |
| 배포 | Vercel (Git push → 자동배포) |
| 폰트 | Pretendard (한국어 최적화) |

---

## 로컬 실행

```bash
# 의존성 설치
npm install

# 개발 서버 실행
npm run dev

# 빌드
npm run build
```

---

## 콘텐츠 수정 방법

### Works 사례 추가/수정

`data/works.json` 파일만 수정하면 됩니다.

```json
{
  "id": "new-work-2025",
  "slug": "new-work-2025",
  "title": "새 캠페인 제목",
  "client": "클라이언트명",
  "clientType": "대기업",
  "mediaType": "DOOH",
  "isPublic": true,
  "isGovernment": false,
  "isWomenCertProject": false,
  "year": 2025,
  "thumbnail": "/images/works/new-thumb.jpg",
  "videoPreview": "/videos/works/new-preview.webm",
  "videoFull": null,
  "heroImage": "/images/works/new-hero.jpg",
  "stats": {
    "impressions": "500만",
    "duration": "2주",
    "locations": "서울 10개소",
    "result": "목표 대비 130% 달성"
  },
  "story": "한 줄 스토리.",
  "tags": ["태그1", "태그2"]
}
```

### 슬로건·문구 변경

- `data/home.json` → Hero 슬로건, 서브슬로건, CTA 문구
- `data/about.json` → About 페이지 헤드라인, 숫자 통계, 타임라인

### 숫자 통계 업데이트 (`data/about.json`)

```json
"stats": [
  { "label": "업력",       "value": 15,   "unit": "년"  },
  { "label": "집행 매체 수","value": 2400, "unit": "개+" },
  { "label": "완료 캠페인", "value": 680,  "unit": "건+" },
  { "label": "고객 재계약률","value": 91,  "unit": "%"   }
]
```
`value` 숫자만 변경하면 카운터 애니메이션에 자동 반영됩니다.

---

## 이미지·영상 가이드

### 이미지 규격

| 용도 | 권장 크기 | 포맷 |
|------|-----------|------|
| Works 썸네일 | 800×600 px | WebP |
| Works 히어로 | 1920×1080 px | WebP |
| OG 이미지 | 1200×630 px | JPG |

### 영상 규격

| 용도 | 권장 길이 | 포맷 | 용량 |
|------|-----------|------|------|
| Hero 루프 | 10–30초 | WebM (VP9) | < 8MB |
| Works 미리보기 | 5–8초 | WebM (VP9) | < 2MB |
| Works 풀 영상 | 30–90초 | WebM (VP9) | < 20MB |

**WebM 변환 (ffmpeg)**
```bash
# Hero 루프 (고품질)
ffmpeg -i input.mp4 -c:v libvpx-vp9 -b:v 2M -crf 30 -vf scale=1920:1080 -an output.webm

# Works 미리보기 (경량)
ffmpeg -i input.mp4 -c:v libvpx-vp9 -b:v 800k -crf 35 -vf scale=1280:720 -an -t 8 preview.webm
```

---

## 배포

```bash
# Vercel CLI 배포 (최초 1회)
npx vercel

# 이후 Git push로 자동 배포
git add .
git commit -m "Update works"
git push origin main
```

### 환경변수 (Vercel 대시보드)

```
NEXT_PUBLIC_KAKAO_CHANNEL_ID=_OOHLABchannel
NEXT_PUBLIC_GA_ID=G-XXXXXXXXXX
RESEND_API_KEY=re_xxxxxxxxxx          # 문의폼 이메일 발송
SLACK_WEBHOOK_URL=https://hooks...    # 문의 알림 (선택)
```

---

## 폴더 구조

```
oohlab/
├── app/                    # Next.js App Router 페이지
│   ├── layout.tsx          # 루트 레이아웃 (Lenis, fonts)
│   ├── page.tsx            # Home
│   ├── about/page.tsx
│   ├── works/
│   │   ├── page.tsx        # Works 목록 (모달 중심)
│   │   └── [slug]/page.tsx # SEO용 동적 라우트
│   ├── contact/page.tsx
│   ├── api/contact/route.ts
│   ├── sitemap.ts
│   └── robots.ts
├── components/
│   ├── layout/             # Navbar, Footer
│   ├── home/               # HeroVideo, StrengthCards, WorksPreview
│   ├── about/              # Timeline, CounterStats
│   ├── works/              # WorksGrid (필터+카드+모달)
│   ├── contact/            # ContactForm
│   └── ui/                 # SmoothScroll, CustomCursor, WomenCertBadge
├── data/                   # ← 콘텐츠 수정은 여기만
│   ├── works.json
│   ├── home.json
│   ├── about.json
│   └── contact.json
├── lib/
│   └── types.ts            # TypeScript 타입 정의
└── public/
    ├── videos/             # WebM 영상
    ├── images/             # 이미지
    └── fonts/              # Pretendard WOFF2
```

---

## 성능 목표

- Lighthouse Performance: 95+
- LCP: < 2.5s
- CLS: < 0.1
- FID: < 100ms
- 모바일 First Paint: < 1.5s

---

## 디자인 원칙

- **컬러**: `#0A0A0A` (배경) · `#FFFFFF` (텍스트) · `#FF4D00` (강조색)
- **타이포**: Pretendard (한국어 최적화, Variable Font)
- **간격 원칙**: `clamp()` 함수로 반응형 여백 자동화
- **애니메이션 easing**: `cubic-bezier(0.16, 1, 0.3, 1)` (cinematic)
- **reduced-motion**: `@media (prefers-reduced-motion: reduce)` 전역 적용

---

*OOH-LAB — 말보다 행동으로 증명합니다.*
