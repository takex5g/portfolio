import fs from 'fs'
import path from 'path'
import matter from 'gray-matter'
import { remark } from 'remark'
import html from 'remark-html'

const worksDirectory = path.join(process.cwd(), 'content/works')

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

    // マークダウンをHTMLに変換
    const processedContent = await remark()
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
