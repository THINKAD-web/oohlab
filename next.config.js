/** @type {import('next').NextConfig} */
const nextConfig = {
  // 이미지 최적화 도메인 설정
  images: {
    formats: ['image/avif', 'image/webp'],
    // 외부 이미지 허용 도메인 (필요 시 추가)
    remotePatterns: [
      {
        protocol: 'https',
        hostname: 'i.ibb.co',  // ImgBB 이미지 호스팅
        pathname: '/**',
      },
      {
        protocol: 'https',
        hostname: 'ibb.co',
        pathname: '/**',
      },
    ],
    // 이미지 품질 기본값 (Lighthouse 최적화)
    deviceSizes: [640, 750, 828, 1080, 1200, 1920],
    imageSizes: [16, 32, 48, 64, 96, 128, 256],
  },

  // 성능 최적화
  compress: true,
  poweredByHeader: false,

  // 보안 헤더
  async headers() {
    return [
      {
        source: '/(.*)',
        headers: [
          { key: 'X-Content-Type-Options', value: 'nosniff' },
          { key: 'X-Frame-Options', value: 'DENY' },
          { key: 'Referrer-Policy', value: 'strict-origin-when-cross-origin' },
        ],
      },
      // 영상 파일 캐시 최대화
      {
        source: '/videos/(.*)',
        headers: [
          { key: 'Cache-Control', value: 'public, max-age=31536000, immutable' },
        ],
      },
      // 폰트 캐시
      {
        source: '/fonts/(.*)',
        headers: [
          { key: 'Cache-Control', value: 'public, max-age=31536000, immutable' },
        ],
      },
    ]
  },
}

module.exports = nextConfig
