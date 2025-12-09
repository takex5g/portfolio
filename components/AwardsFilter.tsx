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
      <div className="flex flex-wrap gap-1.5 mb-4 text-xs text-gray-500">
        <button
          onClick={() => setSelectedCategory('ALL')}
          className={`px-2 py-0.5 transition-colors ${
            selectedCategory === 'ALL'
              ? 'text-gray-900 underline underline-offset-2'
              : 'hover:text-gray-700'
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
                ? 'text-gray-900 underline underline-offset-2'
                : 'hover:text-gray-700'
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
            <tr key={index} className="border-b border-gray-200">
              <th className="py-3 px-2 text-left align-top font-normal text-sm whitespace-nowrap">
                {award.date}
              </th>
              <td className="py-3 px-2 text-sm">
                {award.category && (
                  <span
                    className={`inline-block px-2 py-0.5 text-xs rounded mr-2 ${categoryColors[award.category] || 'bg-gray-100 text-gray-800'}`}
                  >
                    {award.category}
                  </span>
                )}
                <span
                  dangerouslySetInnerHTML={{
                    __html: award.detail.replace(
                      /\[([^\]]+)\]\(([^)]+)\)/g,
                      '<a href="$2" class="text-blue-600 hover:underline">$1</a>'
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
