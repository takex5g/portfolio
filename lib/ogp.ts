import fs from 'fs'
import path from 'path'
import ogs from 'open-graph-scraper'

export interface OgpData {
  url: string
  title: string
  description: string
  image: string
  siteName: string
  favicon: string
  isUnavailable?: boolean
}

const CACHE_DIR = path.join(process.cwd(), '.cache/ogp')

function getCachePath(url: string): string {
  const hash = Buffer.from(url).toString('base64url')
  return path.join(CACHE_DIR, `${hash}.json`)
}

function ensureCacheDir(): void {
  if (!fs.existsSync(CACHE_DIR)) {
    fs.mkdirSync(CACHE_DIR, { recursive: true })
  }
}

function getFromCache(url: string): OgpData | null {
  const cachePath = getCachePath(url)
  if (fs.existsSync(cachePath)) {
    try {
      const cached = JSON.parse(fs.readFileSync(cachePath, 'utf8'))
      return cached as OgpData
    } catch {
      return null
    }
  }
  return null
}

function saveToCache(url: string, data: OgpData): void {
  ensureCacheDir()
  const cachePath = getCachePath(url)
  fs.writeFileSync(cachePath, JSON.stringify(data, null, 2))
}

function getFaviconUrl(url: string): string {
  try {
    const urlObj = new URL(url)
    return `https://www.google.com/s2/favicons?domain=${urlObj.hostname}&sz=32`
  } catch {
    return ''
  }
}

export async function fetchOgp(url: string): Promise<OgpData> {
  // キャッシュをチェック
  const cached = getFromCache(url)
  if (cached) {
    return cached
  }

  try {
    const { result } = await ogs({ url })

    const ogpData: OgpData = {
      url,
      title: result.ogTitle || result.dcTitle || url,
      description: result.ogDescription || result.dcDescription || '',
      image: result.ogImage?.[0]?.url || '',
      siteName: result.ogSiteName || new URL(url).hostname,
      favicon: getFaviconUrl(url),
    }

    // キャッシュに保存
    saveToCache(url, ogpData)

    return ogpData
  } catch (error) {
    console.error(`Failed to fetch OGP for ${url}:`, error)

    // エラー時のフォールバック（サイトが利用不可）
    const fallback: OgpData = {
      url,
      title: new URL(url).hostname,
      description: 'このサイトは404の可能性があります',
      image: '',
      siteName: new URL(url).hostname,
      favicon: getFaviconUrl(url),
      isUnavailable: true,
    }

    // エラー時もキャッシュに保存（再取得を防ぐ）
    saveToCache(url, fallback)

    return fallback
  }
}
