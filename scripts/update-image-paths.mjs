#!/usr/bin/env node
/**
 * Markdownファイル内の画像パスを .webp に更新するスクリプト
 */

import fs from 'fs'
import path from 'path'
import { fileURLToPath } from 'url'

const __filename = fileURLToPath(import.meta.url)
const __dirname = path.dirname(__filename)

const CONTENT_DIR = path.join(__dirname, '..', 'content')

// WebPファイルが存在するかチェック
function webpExists(imagePath) {
  // /images/works/xxx.png -> public/images/works/xxx.webp
  const webpPath = imagePath.replace(/\.(png|jpg|jpeg)$/i, '.webp')
  const fullPath = path.join(__dirname, '..', 'public', webpPath)
  return fs.existsSync(fullPath)
}

function processMarkdownFile(filePath) {
  let content = fs.readFileSync(filePath, 'utf-8')
  let modified = false

  // front-matter内のimage: フィールドを更新
  const imageRegex = /^(image:\s*)(["']?)([^"'\n]+\.(png|jpg|jpeg))(["']?)/gim
  content = content.replace(imageRegex, (match, prefix, openQuote, imagePath) => {
    if (webpExists(imagePath)) {
      modified = true
      const newPath = imagePath.replace(/\.(png|jpg|jpeg)$/i, '.webp')
      console.log(`  ${imagePath} -> ${newPath}`)
      // クォートを統一して閉じる
      const quote = openQuote || '"'
      return `${prefix}${quote}${newPath}${quote}`
    }
    return match
  })

  // Markdown内の画像参照を更新 ![alt](path)
  const mdImageRegex = /(\!\[[^\]]*\]\()([^)]+\.(png|jpg|jpeg))(\))/gi
  content = content.replace(mdImageRegex, (match, prefix, imagePath, ext, suffix) => {
    if (webpExists(imagePath)) {
      modified = true
      const newPath = imagePath.replace(/\.(png|jpg|jpeg)$/i, '.webp')
      console.log(`  ${imagePath} -> ${newPath}`)
      return `${prefix}${newPath}${suffix}`
    }
    return match
  })

  if (modified) {
    fs.writeFileSync(filePath, content)
    return true
  }
  return false
}

function processDirectory(dir) {
  const files = fs.readdirSync(dir)
  let count = 0

  for (const file of files) {
    const filePath = path.join(dir, file)
    const stat = fs.statSync(filePath)

    if (stat.isDirectory()) {
      count += processDirectory(filePath)
    } else if (file.endsWith('.md')) {
      console.log(`📄 ${path.relative(CONTENT_DIR, filePath)}`)
      if (processMarkdownFile(filePath)) {
        count++
      }
    }
  }

  return count
}

console.log('🔄 Markdownファイルの画像パスを更新中...\n')

const updatedCount = processDirectory(CONTENT_DIR)

console.log(`\n✅ 完了: ${updatedCount}ファイルを更新しました`)
