import type { Plugin } from 'unified'
import type { Root, Html } from 'mdast'
import { visit } from 'unist-util-visit'
import { fetchOgp, type OgpData } from './ogp'

// hatenablog-parts の iframe から URL を抽出する正規表現
const HATENA_IFRAME_REGEX =
  /<iframe[^>]*class="hatenablogcard"[^>]*src="https:\/\/hatenablog-parts\.com\/embed\?url=([^"]+)"[^>]*>[\s\S]*?<\/iframe>/g

// OGPデータからブログカードHTMLを生成
function createBlogCardHtml(ogp: OgpData): string {
  const imageHtml = ogp.image
    ? `<div class="blogcard-image"><img src="${ogp.image}" alt="" loading="lazy" /></div>`
    : ''

  const descriptionHtml = ogp.description
    ? `<div class="blogcard-description">${escapeHtml(ogp.description)}</div>`
    : ''

  return `<a href="${ogp.url}" class="blogcard" target="_blank" rel="noopener noreferrer">
  ${imageHtml}
  <div class="blogcard-content">
    <div class="blogcard-title">${escapeHtml(ogp.title)}</div>
    ${descriptionHtml}
    <div class="blogcard-meta">
      <img src="${ogp.favicon}" alt="" class="blogcard-favicon" width="16" height="16" />
      <span class="blogcard-site">${escapeHtml(ogp.siteName)}</span>
    </div>
  </div>
</a>`
}

function escapeHtml(str: string): string {
  return str
    .replace(/&/g, '&amp;')
    .replace(/</g, '&lt;')
    .replace(/>/g, '&gt;')
    .replace(/"/g, '&quot;')
}

// Markdown内のすべてのhatena iframe URLを抽出
export function extractBlogcardUrls(content: string): string[] {
  const urls: string[] = []
  let match
  const regex = new RegExp(HATENA_IFRAME_REGEX.source, 'g')
  while ((match = regex.exec(content)) !== null) {
    urls.push(decodeURIComponent(match[1]))
  }
  return urls
}

// ビルド時にOGPを事前取得してキャッシュに保存
export async function prefetchOgpData(
  urls: string[]
): Promise<Map<string, OgpData>> {
  const uniqueUrls = [...new Set(urls)]
  const results = new Map<string, OgpData>()

  for (const url of uniqueUrls) {
    const ogp = await fetchOgp(url)
    results.set(url, ogp)
  }

  return results
}

// remarkプラグイン: hatena iframe をブログカードHTMLに変換
export const remarkBlogcard: Plugin<
  [{ ogpCache: Map<string, OgpData> }],
  Root
> = (options) => {
  const { ogpCache } = options

  return (tree) => {
    visit(tree, 'html', (node: Html) => {
      let newValue = node.value
      let match
      const regex = new RegExp(HATENA_IFRAME_REGEX.source, 'g')

      while ((match = regex.exec(node.value)) !== null) {
        const fullMatch = match[0]
        const url = decodeURIComponent(match[1])
        const ogp = ogpCache.get(url)

        if (ogp) {
          const blogcardHtml = createBlogCardHtml(ogp)
          newValue = newValue.replace(fullMatch, blogcardHtml)
        }
      }

      node.value = newValue
    })
  }
}
