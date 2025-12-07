import fs from 'fs'
import path from 'path'
import matter from 'gray-matter'
import { remark } from 'remark'
import html from 'remark-html'
import {
  remarkBlogcard,
  extractBlogcardUrls,
  prefetchOgpData,
} from './remark-blogcard'

const worksDirectory = path.join(process.cwd(), 'content/works')
const contentDirectory = path.join(process.cwd(), 'content')

export interface WorkMetadata {
  slug: string
  title: string
  date: string
  tags: string[]
  description: string
  image: string
}

export interface Work extends WorkMetadata {
  contentHtml: string
}

export function getAllWorks(): WorkMetadata[] {
  const fileNames = fs.readdirSync(worksDirectory)
  const allWorks = fileNames
    .filter((fileName) => fileName.endsWith('.md'))
    .map((fileName) => {
      const slug = fileName.replace(/\.md$/, '')
      const fullPath = path.join(worksDirectory, fileName)
      const fileContents = fs.readFileSync(fullPath, 'utf8')
      const { data } = matter(fileContents)

      return {
        slug,
        title: data.title,
        date: data.date,
        tags: data.tags || [],
        description: data.description,
        image: data.image,
      } as WorkMetadata
    })

  // 日付順にソート（新しい順）
  return allWorks.sort((a, b) => {
    if (a.date < b.date) {
      return 1
    } else {
      return -1
    }
  })
}

export async function getWorkBySlug(slug: string): Promise<Work | null> {
  try {
    const fullPath = path.join(worksDirectory, `${slug}.md`)
    const fileContents = fs.readFileSync(fullPath, 'utf8')
    const { data, content } = matter(fileContents)

    // ブログカードのURLを抽出してOGPを事前取得
    const blogcardUrls = extractBlogcardUrls(content)
    const ogpCache = await prefetchOgpData(blogcardUrls)

    // マークダウンをHTMLに変換（ブログカードプラグイン付き）
    const processedContent = await remark()
      .use(remarkBlogcard, { ogpCache })
      .use(html, { sanitize: false })
      .process(content)
    const contentHtml = processedContent.toString()

    return {
      slug,
      title: data.title,
      date: data.date,
      tags: data.tags || [],
      description: data.description,
      image: data.image,
      contentHtml,
    } as Work
  } catch {
    return null
  }
}

export function getWorksByTag(tag: string): WorkMetadata[] {
  const allWorks = getAllWorks()
  return allWorks.filter((work) => work.tags.includes(tag))
}

export function getAllTags(): string[] {
  const allWorks = getAllWorks()
  const tags = new Set<string>()
  allWorks.forEach((work) => {
    work.tags.forEach((tag) => tags.add(tag))
  })
  return Array.from(tags).sort()
}

export interface Award {
  date: string
  detail: string
}

export function getAwards(): Award[] {
  const fullPath = path.join(contentDirectory, 'awards.md')
  const fileContents = fs.readFileSync(fullPath, 'utf8')
  const { content } = matter(fileContents)

  const awards: Award[] = []
  const lines = content.split('\n')

  let currentDate = ''
  let currentDetail = ''

  for (const line of lines) {
    const dateMatch = line.match(/^## (\d{4}\/\d{2}\/\d{2})/)
    if (dateMatch) {
      if (currentDate && currentDetail) {
        awards.push({ date: currentDate, detail: currentDetail.trim() })
      }
      currentDate = dateMatch[1]
      currentDetail = ''
    } else if (currentDate && line.trim()) {
      currentDetail += line.trim() + ' '
    }
  }

  if (currentDate && currentDetail) {
    awards.push({ date: currentDate, detail: currentDetail.trim() })
  }

  return awards
}
