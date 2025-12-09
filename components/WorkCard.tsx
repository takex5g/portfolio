import Link from 'next/link'
import Image from 'next/image'
import type { WorkMetadata } from '@/lib/content'

interface WorkCardProps {
  work: WorkMetadata
  basePath?: string
}

export default function WorkCard({ work, basePath = 'works' }: WorkCardProps) {
  return (
    <div className="rounded-sm overflow-hidden h-full">
      <div className="w-full h-full relative overflow-hidden group">
        <Link
          href={`/${basePath}/${work.slug}`}
          className="block w-full h-full"
        >
          <Image
            src={work.image || '/images/works/default.png'}
            alt={work.title}
            fill
            className="object-cover"
            loading="lazy"
            sizes="(max-width: 450px) 160px, 250px"
          />
          <div className="absolute inset-x-0 bottom-0 px-2 pt-1 bg-white/60 translate-y-[calc(100%-2.5rem)] transition-transform duration-300 group-hover:translate-y-0">
            <p className="text-lg font-bold mb-1">{work.title}</p>
            <p className="opacity-0 transition-opacity duration-300 group-hover:opacity-100">
              {work.description}
            </p>
          </div>
        </Link>
      </div>
    </div>
  )
}
