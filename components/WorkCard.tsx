import Link from 'next/link'
import Image from 'next/image'
import type { WorkMetadata } from '@/lib/content'

interface WorkCardProps {
  work: WorkMetadata
}

export default function WorkCard({ work }: WorkCardProps) {
  return (
    <div className="rounded-sm overflow-hidden h-full">
      <div className="w-full h-full relative overflow-hidden group">
        <Link href={`/works/${work.slug}`} className="block w-full h-full">
          <Image
            src={work.image || '/images/works/default.png'}
            alt={work.title}
            fill
            className="object-cover"
            loading="lazy"
            sizes="(max-width: 450px) 160px, 250px"
          />
          <div className="absolute z-10 w-[calc(100%-5px)] pl-[5px] h-full top-40 transition-transform duration-300 bg-white/60 group-hover:-translate-y-12 sm:w-[calc(100%-3px)] sm:pl-[3px] sm:top-[155px]">
            <p className="text-lg font-bold mt-[5px] mb-[5px] sm:mt-[2px]">
              {work.title}
            </p>
            <p className="mt-0 mb-0 opacity-0 transition-opacity duration-300 group-hover:opacity-100">
              {work.description}
            </p>
          </div>
        </Link>
      </div>
    </div>
  )
}
