'use client'

import Image from 'next/image'
import { useState, useEffect } from 'react'
import awards from '@/store/award.json'

interface Award {
  date: string
  detail: string
}

export default function AboutPage() {
  const [animePos, setAnimePos] = useState(0)

  const doAnime = () => {
    setAnimePos(Math.floor(Math.random() * 3))
  }

  useEffect(() => {
    const yumoanime = () => {
      const timeout = setTimeout(
        () => {
          doAnime()
          yumoanime()
        },
        (Math.floor(Math.random() * 6) + 5) * 1000
      )
      return timeout
    }

    const timeout = yumoanime()
    return () => clearTimeout(timeout)
  }, [])

  const getTransformY = () => {
    if (animePos === 0) return 0
    if (animePos === 1) return 40
    return 85
  }

  return (
    <div className="container mx-auto max-w-4xl">
      <div className="py-8">
        <div className="flex justify-center mb-4">
          <div
            className="w-[100px] h-[100px] rounded-full overflow-hidden relative cursor-pointer"
            style={{ backgroundColor: '#b6d55d' }}
            onClick={doAnime}
          >
            <Image
              src="/images/takex5g_transparent.png"
              width={100}
              height={100}
              alt="ゆうもや"
              className="absolute left-0 transition-transform duration-[800ms]"
              style={{ transform: `translateY(${getTransformY()}px)` }}
            />
          </div>
        </div>
        <h1 className="text-3xl font-bold text-center mb-6 font-display">
          ゆうもや
        </h1>
        <div className="mb-8 text-center space-y-4">
          <p>ハードウェアからWEBまで。ゆるふわものづくりをやってます</p>
          <p>
            様々なソフトウェアやハードウェア、時には最先端技術を使って創作を行い、
            <br className="hidden md:inline" />
            ユーモアセンスの溢れる面白いモノを作ります
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
            <Image
              src="/images/twitter.svg"
              width={48}
              height={48}
              alt="Twitter"
            />
            <span className="font-display">Twitter</span>
          </a>
          <a
            href="https://github.com/takex5g"
            target="_blank"
            rel="noopener noreferrer"
            className="flex flex-col items-center gap-2 hover:opacity-70 transition-opacity"
          >
            <Image
              src="/images/github.svg"
              width={48}
              height={48}
              alt="GitHub"
            />
            <span className="font-display">GitHub</span>
          </a>
        </div>

        <div>
          <h2 className="text-2xl font-bold mb-6 font-display">
            受賞・出展など
          </h2>
          <table className="w-full">
            <tbody>
              {(awards.award as Award[]).map((award, index) => (
                <tr key={index} className="border-b border-gray-200">
                  <th className="py-3 px-2 text-left align-top font-normal text-sm whitespace-nowrap">
                    {award.date}
                  </th>
                  <td
                    className="py-3 px-2 text-sm"
                    dangerouslySetInnerHTML={{
                      __html: award.detail.replace(
                        /\[([^\]]+)\]\(([^)]+)\)/g,
                        '<a href="$2" class="text-blue-600 hover:underline">$1</a>'
                      ),
                    }}
                  />
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  )
}
