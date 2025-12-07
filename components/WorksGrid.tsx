'use client'

import { useState } from 'react'
import WorkCard from './WorkCard'
import type { WorkMetadata } from '@/lib/content'

interface WorksGridProps {
  initialWorks: WorkMetadata[]
  tags: string[]
}

export default function WorksGrid({ initialWorks, tags }: WorksGridProps) {
  const [selectedTag, setSelectedTag] = useState('ALL')

  const filteredWorks = selectedTag === 'ALL'
    ? initialWorks
    : initialWorks.filter(work => work.tags.includes(selectedTag))

  return (
    <div className="grid grid-cols-[auto_1fr] sm:grid-cols-1 sm:grid-rows-[auto_1fr]">
      {/* タグメニュー */}
      <div className="pr-[15px] font-display sm:pr-0">
        <ul className="list-none pl-0 sm:flex sm:justify-around sm:mb-4">
          {tags.map((tag) => (
            <li key={tag} className="py-5 px-2.5 text-3xl sm:p-0 sm:text-sm lg:text-xl lg:py-5">
              <input
                type="radio"
                value={tag}
                id={tag}
                checked={selectedTag === tag}
                onChange={(e) => setSelectedTag(e.target.value)}
                className="hidden"
              />
              <label
                htmlFor={tag}
                className="cursor-pointer font-normal peer-checked:font-bold data-[checked=true]:font-bold"
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
        {selectedTag !== 'ALL' && (
          <div className="text-2xl py-[15px] sm:text-[19px]">
            タグ絞り込み: <span className="font-bold font-display">{selectedTag}</span>
          </div>
        )}

        <div className="mx-auto w-full grid gap-[15px] grid-cols-[repeat(auto-fill,minmax(250px,1fr))] auto-rows-[200px] sm:grid-cols-[repeat(auto-fill,minmax(160px,1fr))]">
          {filteredWorks.map((work) => (
            <WorkCard key={work.slug} work={work} />
          ))}
        </div>
      </div>
    </div>
  )
}
