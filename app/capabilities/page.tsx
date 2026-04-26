import type { Metadata } from 'next'
import { EditorialCapabilities } from '@/components/capabilities/EditorialCapabilities'

export const metadata: Metadata = {
  title: 'Capabilities — Services',
  description:
    'OOH-LAB이 직접 운영·집행하는 옥외광고 매체 6 카테고리. DOOH · 지하철 · 버스·쉘터 · 빌보드 · 외벽 · 교통매체.',
}

export default function CapabilitiesPage() {
  return <EditorialCapabilities />
}
