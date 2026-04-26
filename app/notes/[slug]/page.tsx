import { notFound } from 'next/navigation'
import type { Metadata } from 'next'
import notesData from '@/data/notes.json'
import { NoteDetail, type Note } from '@/components/notes/NoteDetail'

const NOTES = notesData.items as unknown as Note[]

interface Props {
  params: Promise<{ slug: string }>
}

export async function generateStaticParams() {
  return NOTES.map((n) => ({ slug: n.slug }))
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { slug } = await params
  const note = NOTES.find((n) => n.slug === slug)
  if (!note) return { title: '글을 찾을 수 없습니다' }
  return {
    title: `${note.title} — Notes`,
    description: note.subtitle,
  }
}

export default async function NoteDetailPage({ params }: Props) {
  const { slug } = await params
  const note = NOTES.find((n) => n.slug === slug)
  if (!note) notFound()
  return <NoteDetail note={note} />
}
