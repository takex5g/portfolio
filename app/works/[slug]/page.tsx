import { notFound } from 'next/navigation'
import type { Metadata } from 'next'
import { getWorkBySlug, getAllWorks } from '@/lib/content'

interface WorkPageProps {
  params: Promise<{
    slug: string
  }>
}

export async function generateStaticParams() {
  const works = getAllWorks()
  return works.map((work) => ({
    slug: work.slug,
  }))
}

export async function generateMetadata({
  params,
}: WorkPageProps): Promise<Metadata> {
  const { slug } = await params
  const work = await getWorkBySlug(slug)

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

export default async function WorkPage({ params }: WorkPageProps) {
  const { slug } = await params
  const work = await getWorkBySlug(slug)

  if (!work) {
    notFound()
  }

  return (
    <article className="max-w-4xl mx-auto py-8">
      <header className="mb-8">
        <h1 className="text-4xl font-bold mb-4 font-display">
          {work.title}
        </h1>
        <div className="flex flex-wrap gap-2 mb-4">
          {work.tags.map((tag) => (
            <span
              key={tag}
              className="px-3 py-1 bg-gray-200 rounded-full text-sm font-display"
            >
              {tag}
            </span>
          ))}
        </div>
        <p className="text-gray-600 mb-2">{work.description}</p>
        <time className="text-sm text-gray-500">{work.date}</time>
      </header>

      <div
        className="prose prose-lg max-w-none"
        dangerouslySetInnerHTML={{ __html: work.contentHtml }}
      />
    </article>
  )
}
