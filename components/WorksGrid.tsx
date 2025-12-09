'use client'

import { useState, useEffect, useRef, Suspense } from 'react'
import { useSearchParams, useRouter } from 'next/navigation'
import { motion, AnimatePresence } from 'framer-motion'
import WorkCard from './WorkCard'
import type { WorkMetadata } from '@/lib/content'

interface WorksGridProps {
  initialWorks: WorkMetadata[]
  tags: string[]
}

interface TagSyncProps {
  tags: string[]
  onTagChange: (tag: string, isFromUrl: boolean) => void
}

function TagSync({ tags, onTagChange }: TagSyncProps) {
  const searchParams = useSearchParams()
  const isInitialMount = useRef(true)

  useEffect(() => {
    const tagFromUrl = searchParams?.get('tag')
    if (tagFromUrl && tags.includes(tagFromUrl)) {
      onTagChange(tagFromUrl, isInitialMount.current)
    } else if (!tagFromUrl) {
      onTagChange('ALL', false)
    }
    isInitialMount.current = false
  }, [searchParams, tags, onTagChange])

  return null
}

export default function WorksGrid({ initialWorks, tags }: WorksGridProps) {
  const router = useRouter()
  const [selectedTag, setSelectedTag] = useState('ALL')
  const [isFromMenu, setIsFromMenu] = useState(false)

  const handleTagChange = (tag: string, isFromUrl: boolean) => {
    setSelectedTag(tag)
    if (isFromUrl) {
      setIsFromMenu(false)
    }
  }

  const filteredWorks =
    selectedTag === 'ALL'
      ? initialWorks
      : initialWorks.filter((work) => work.tags.includes(selectedTag))

  return (
    <div className="grid grid-cols-1 grid-rows-[auto_1fr] sm:grid-cols-[auto_1fr] sm:grid-rows-1">
      <Suspense fallback={null}>
        <TagSync tags={tags} onTagChange={handleTagChange} />
      </Suspense>

      {/* タグメニュー */}
      <div className="pr-0 font-display sm:pr-[15px]">
        <ul className="list-none pl-2.5 flex justify-around mb-4 sm:pl-0 sm:block sm:mb-0 md:pl-2.5">
          {tags.map((tag) => (
            <li
              key={tag}
              className="p-0 text-sm sm:py-5 sm:px-2.5 sm:text-xl md:text-3xl"
            >
              <input
                type="radio"
                value={tag}
                id={tag}
                checked={selectedTag === tag}
                onChange={(e) => {
                  const newTag = e.target.value
                  setSelectedTag(newTag)
                  setIsFromMenu(true)
                  if (newTag === 'ALL') {
                    router.push('/')
                  } else {
                    router.push(`/?tag=${newTag}`)
                  }
                }}
                className="hidden"
              />
              <label
                htmlFor={tag}
                className="cursor-pointer font-normal data-[checked=true]:font-bold"
                data-checked={selectedTag === tag}
              >
                {tag}
              </label>
            </li>
          ))}
        </ul>
      </div>

      {/* 作品グリッド */}
      <div>
        {selectedTag !== 'ALL' && !isFromMenu && (
          <div className="text-[19px] py-[15px] sm:text-2xl">
            タグ絞り込み:
            <span className="font-bold font-display">{selectedTag}</span>
          </div>
        )}

        <div className="mx-auto w-full grid gap-[15px] grid-cols-[repeat(auto-fill,minmax(160px,1fr))] auto-rows-[200px] sm:grid-cols-[repeat(auto-fill,minmax(250px,1fr))]">
          <AnimatePresence mode="popLayout">
            {filteredWorks.map((work) => (
              <motion.div
                key={work.slug}
                layout
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                exit={{ opacity: 0, position: 'absolute' }}
                transition={{
                  opacity: { duration: 0.3, ease: 'easeInOut' },
                  layout: { duration: 0.3, ease: 'easeInOut' },
                }}
                className="h-full"
              >
                <WorkCard work={work} />
              </motion.div>
            ))}
          </AnimatePresence>
        </div>
      </div>
    </div>
  )
}
