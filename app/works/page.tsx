import type { Metadata } from 'next'
import { WorksIndex } from '@/components/works/WorksIndex'

export const metadata: Metadata = {
  title: 'Works — Index of Issue 01',
  description:
    '오랩이 직접 집행한 옥외광고·DOOH 캠페인. 기업·공공기관 사례. 매체별 필터.',
}

export default function WorksPage() {
  return <WorksIndex />
}
