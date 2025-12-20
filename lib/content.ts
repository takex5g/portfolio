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
const clientWorksDirectory = path.join(process.cwd(), 'content/client-works')
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

export function getAllTags(): string[] {
  const allWorks = getAllWorks()
  const tags = new Set<string>()
  allWorks.forEach((work) => {
    work.tags.forEach((tag) => tags.add(tag))
  })

  // カスタム順序: OTHRを最後に
  const tagOrder = ['HARDWARE', 'WEB', 'BUZZ', 'OTHR']
  return Array.from(tags).sort((a, b) => {
    const indexA = tagOrder.indexOf(a)
    const indexB = tagOrder.indexOf(b)
    // tagOrderにないタグはOTHRの前に
    const orderA = indexA === -1 ? tagOrder.length - 1 : indexA
    const orderB = indexB === -1 ? tagOrder.length - 1 : indexB
    return orderA - orderB
  })
}

// Client Works 関連の関数
export function getAllClientWorks(): WorkMetadata[] {
  const allWorks: WorkMetadata[] = []

  // client-worksディレクトリから取得
  if (fs.existsSync(clientWorksDirectory)) {
    const fileNames = fs.readdirSync(clientWorksDirectory)
    fileNames
      .filter((fileName) => fileName.endsWith('.md'))
      .forEach((fileName) => {
        const slug = fileName.replace(/\.md$/, '')
        const fullPath = path.join(clientWorksDirectory, fileName)
        const fileContents = fs.readFileSync(fullPath, 'utf8')
        const { data } = matter(fileContents)

        allWorks.push({
          slug,
          title: data.title,
          date: data.date,
          tags: data.tags || [],
          description: data.description,
          image: data.image,
        } as WorkMetadata)
      })
  }

  // worksディレクトリからshowInClientWorks: trueのものを取得
  if (fs.existsSync(worksDirectory)) {
    const fileNames = fs.readdirSync(worksDirectory)
    fileNames
      .filter((fileName) => fileName.endsWith('.md'))
      .forEach((fileName) => {
        const slug = fileName.replace(/\.md$/, '')
        const fullPath = path.join(worksDirectory, fileName)
        const fileContents = fs.readFileSync(fullPath, 'utf8')
        const { data } = matter(fileContents)

        if (data.showInClientWorks) {
          allWorks.push({
            slug,
            title: data.title,
            date: data.date,
            tags: data.tags || [],
            description: data.description,
            image: data.image,
          } as WorkMetadata)
        }
      })
  }

  return allWorks.sort((a, b) => {
    if (a.date < b.date) {
      return 1
    } else {
      return -1
    }
  })
}

export async function getClientWorkBySlug(slug: string): Promise<Work | null> {
  // まずclient-worksディレクトリを探す
  let fullPath = path.join(clientWorksDirectory, `${slug}.md`)

  // 見つからなければworksディレクトリでshowInClientWorksがtrueのものを探す
  if (!fs.existsSync(fullPath)) {
    const worksPath = path.join(worksDirectory, `${slug}.md`)
    if (fs.existsSync(worksPath)) {
      const fileContents = fs.readFileSync(worksPath, 'utf8')
      const { data } = matter(fileContents)
      if (data.showInClientWorks) {
        fullPath = worksPath
      }
    }
  }

  try {
    const fileContents = fs.readFileSync(fullPath, 'utf8')
    const { data, content } = matter(fileContents)

    const blogcardUrls = extractBlogcardUrls(content)
    const ogpCache = await prefetchOgpData(blogcardUrls)

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

export interface Award {
  date: string
  category: string
  detail: string
}

export function getAwards(): Award[] {
  const fullPath = path.join(contentDirectory, 'awards.md')
  const fileContents = fs.readFileSync(fullPath, 'utf8')
  const { content } = matter(fileContents)

  const awards: Award[] = []
  const lines = content.split('\n')

  let currentDate = ''
  let currentCategory = ''
  let currentDetail = ''

  for (const line of lines) {
    const dateMatch = line.match(/^## (\d{4}\/\d{2}\/\d{2})/)
    const categoryMatch = line.match(/^category:\s*(.+)/)

    if (dateMatch) {
      if (currentDate && currentDetail) {
        awards.push({
          date: currentDate,
          category: currentCategory,
          detail: currentDetail.trim(),
        })
      }
      currentDate = dateMatch[1]
      currentCategory = ''
      currentDetail = ''
    } else if (categoryMatch) {
      currentCategory = categoryMatch[1].trim()
    } else if (currentDate && line.trim() && !line.startsWith('#')) {
      currentDetail += line.trim() + ' '
    }
  }

  if (currentDate && currentDetail) {
    awards.push({
      date: currentDate,
      category: currentCategory,
      detail: currentDetail.trim(),
    })
  }

  return awards
}

export function getAwardCategories(): string[] {
  const awards = getAwards()
  const categories = new Set<string>()
  awards.forEach((award) => {
    if (award.category) {
      categories.add(award.category)
    }
  })
  return Array.from(categories)
}
