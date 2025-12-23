'use client'

import { useState } from 'react'
import type { Award } from '@/lib/content'

interface AwardsFilterProps {
  awards: Award[]
  categories: string[]
  categoryColors: Record<string, string>
}

export default function AwardsFilter({
  awards,
  categories,
  categoryColors,
}: AwardsFilterProps) {
  const [selectedCategory, setSelectedCategory] = useState<string>('ALL')

  const filteredAwards =
    selectedCategory === 'ALL'
      ? awards
      : awards.filter((award) => award.category === selectedCategory)

  return (
    <div>
      {/* カテゴリフィルター */}
      <div className="flex flex-wrap gap-1.5 mb-4 text-xs text-gray-500 dark:text-gray-400">
        <button
          onClick={() => setSelectedCategory('ALL')}
          className={`px-2 py-0.5 transition-colors ${
            selectedCategory === 'ALL'
              ? 'text-gray-900 underline underline-offset-2 dark:text-gray-100'
              : 'hover:text-gray-700 dark:hover:text-gray-200'
          }`}
        >
          すべて
        </button>
        {categories.map((category) => (
          <button
            key={category}
            onClick={() => setSelectedCategory(category)}
            className={`px-2 py-0.5 transition-colors ${
              selectedCategory === category
                ? 'text-gray-900 underline underline-offset-2 dark:text-gray-100'
                : 'hover:text-gray-700 dark:hover:text-gray-200'
            }`}
          >
            {category}
          </button>
        ))}
      </div>

      {/* 受賞・出展テーブル */}
      <table className="w-full">
        <tbody>
          {filteredAwards.map((award, index) => (
            <tr key={index} className="border-b border-gray-200 dark:border-gray-700">
              <th className="py-3 px-2 text-left align-top font-normal text-sm whitespace-nowrap">
                {award.date}
              </th>
              <td className="py-3 px-2 text-sm">
                {award.category && (
                  <span
                    className={`inline-block px-2 py-0.5 text-xs rounded mr-2 ${categoryColors[award.category] || 'bg-gray-100 text-gray-800 dark:bg-gray-800 dark:text-gray-100'}`}
                  >
                    {award.category}
                  </span>
                )}
                <span
                  dangerouslySetInnerHTML={{
                    __html: award.detail.replace(
                      /\[([^\]]+)\]\(([^)]+)\)/g,
                      '<a href="$2" class="text-blue-600 hover:underline dark:text-blue-400 dark:hover:text-blue-300">$1</a>'
                    ),
                  }}
                />
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  )
}
