import { notFound } from 'next/navigation'
import type { Metadata } from 'next'
import { getClientWorkBySlug, getAllClientWorks } from '@/lib/content'
import ArticleContent from '@/components/ArticleContent'

interface ClientWorkPageProps {
  params: Promise<{
    slug: string
  }>
}

export async function generateStaticParams() {
  const works = getAllClientWorks()
  return works.map((work) => ({
    slug: work.slug,
  }))
}

export async function generateMetadata({
  params,
}: ClientWorkPageProps): Promise<Metadata> {
  const { slug } = await params
  const work = await getClientWorkBySlug(slug)

  if (!work) {
    return {
      title: 'Not Found',
    }
  }

  return {
    title: `${work.title} | まいにちものづくり`,
    description: work.description,
    openGraph: {
      title: work.title,
      description: work.description,
      images: work.image ? [work.image] : [],
    },
  }
}

export default async function ClientWorkPage({ params }: ClientWorkPageProps) {
  const { slug } = await params
  const work = await getClientWorkBySlug(slug)

  if (!work) {
    notFound()
  }

  return (
    <article className="max-w-4xl mx-auto py-8">
      <header className="mb-8">
        <h1 className="text-4xl font-bold mb-4 font-display">{work.title}</h1>
        <p className="text-gray-600 mb-2 dark:text-gray-300">{work.description}</p>
        <time className="text-sm text-gray-500 dark:text-gray-400">{work.date}</time>
      </header>

      <ArticleContent html={work.contentHtml} />
    </article>
  )
}
