import { notFound } from 'next/navigation'
import type { Metadata } from 'next'
import worksData from '@/data/works.json'
import type { Work } from '@/lib/types'
import { WorkDetail } from '@/components/works/WorkDetail'

interface Props {
  params: Promise<{ slug: string }>
}

export async function generateStaticParams() {
  return worksData.works.map((w) => ({ slug: w.slug }))
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { slug } = await params
  const work = worksData.works.find((w) => w.slug === slug) as Work | undefined
  if (!work) return { title: '사례를 찾을 수 없습니다' }
  return {
    title: `${work.client} — ${work.title}`,
    description: work.story,
    openGraph: {
      title: work.title,
      description: work.story,
      images: [{ url: work.heroImage, alt: work.title }],
    },
  }
}

export default async function WorkDetailPage({ params }: Props) {
  const { slug } = await params
  const work = worksData.works.find((w) => w.slug === slug) as Work | undefined
  if (!work) notFound()
  return <WorkDetail work={work} />
}
