import type { Metadata } from 'next'
import { NotesIndex } from '@/components/notes/NotesIndex'

export const metadata: Metadata = {
  title: 'Notes — Editorial',
  description:
    '옥외광고 인사이트와 업계 노트. 지하철 vs SNS, 위치 선정 기준, 공공기관 입찰 가이드, 2026 OOH 트렌드, 견적 읽기.',
}

export default function NotesPage() {
  return <NotesIndex />
}
