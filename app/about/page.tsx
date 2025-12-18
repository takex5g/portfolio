import type { Metadata } from 'next'
import { getAwards, getAwardCategories } from '@/lib/content'
import YumoyaIcon from '@/components/YumoyaIcon'
import AwardsFilter from '@/components/AwardsFilter'
import { SocialIcon } from '@/components/OptimizedImage'

const categoryColors: Record<string, string> = {
  受賞: 'bg-yellow-100 text-yellow-800',
  テレビ出演: 'bg-red-100 text-red-800',
  メディア掲載: 'bg-blue-100 text-blue-800',
  イベント出展: 'bg-green-100 text-green-800',
  企業コラボ: 'bg-purple-100 text-purple-800',
  リリース: 'bg-gray-100 text-gray-800',
}

export const metadata: Metadata = {
  title: 'About | まいにちものづくり',
  description: 'ゆうもやのプロフィールページ',
}

export default function AboutPage() {
  const awards = getAwards()
  const categories = getAwardCategories()

  return (
    <div className="container mx-auto max-w-4xl">
      <div className="py-8">
        <div className="flex justify-center mb-4">
          <YumoyaIcon />
        </div>
        <h1 className="text-3xl font-bold text-center mb-6 font-display">
          ゆうもや
        </h1>
        <div className="mb-8 text-center space-y-4">
          <p>ハードウェアからWEBまで。ゆるふわものづくりをやってます</p>
          <p>
            様々なソフトウェアやハードウェア、時には最先端技術を使って創作を行い、
            <br className="hidden md:inline" />
            想像力溢れる面白いモノを作ります
          </p>
        </div>

        <div className="bg-gray-50 p-6 rounded-lg mb-8">
          <p className="font-semibold mb-2">メール</p>
          <p className="font-display mb-2">takex5g@mononichi.com</p>
          <p className="text-sm text-gray-600">
            （
            <a
              href="https://twitter.com/takex5g"
              target="_blank"
              rel="noopener noreferrer"
              className="text-blue-600 hover:underline"
            >
              Twitter
            </a>
            のDMもお使いください）
          </p>
        </div>

        <div className="flex justify-center gap-6 mb-12">
          <a
            href="https://twitter.com/takex5g"
            target="_blank"
            rel="noopener noreferrer"
            className="flex flex-col items-center gap-2 hover:opacity-70 transition-opacity"
          >
            <SocialIcon platform="twitter" size="md" />
            <span className="font-display">Twitter</span>
          </a>
          <a
            href="https://www.instagram.com/takex5g"
            target="_blank"
            rel="noopener noreferrer"
            className="flex flex-col items-center gap-2 hover:opacity-70 transition-opacity"
          >
            <SocialIcon platform="instagram" size="md" />
            <span className="font-display">Instagram</span>
          </a>
          <a
            href="https://github.com/takex5g"
            target="_blank"
            rel="noopener noreferrer"
            className="flex flex-col items-center gap-2 hover:opacity-70 transition-opacity"
          >
            <SocialIcon platform="github" size="md" />
            <span className="font-display">GitHub</span>
          </a>
        </div>

        <div>
          <h2 className="text-2xl font-bold mb-6 font-display">
            受賞・出展など
          </h2>
          <AwardsFilter
            awards={awards}
            categories={categories}
            categoryColors={categoryColors}
          />
        </div>
      </div>
    </div>
  )
}
