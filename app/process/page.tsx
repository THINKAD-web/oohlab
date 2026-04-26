import type { Metadata } from 'next'
import { EditorialProcess } from '@/components/process/EditorialProcess'

export const metadata: Metadata = {
  title: 'Process — How We Work',
  description:
    '오랩의 5단계 작업 프로세스. Brief · Survey · Propose · Execute · Report. 매체 선정부터 결과 보고까지.',
}

export default function ProcessPage() {
  return <EditorialProcess />
}
