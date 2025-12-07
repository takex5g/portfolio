const fs = require('fs');
const path = require('path');

// パスの設定
const dataJsonPath = path.join(__dirname, '../store/data.json');
const oldContentDir = path.join(__dirname, '../content/article');
const newContentDir = path.join(__dirname, '../content/works');
const staticImgDir = path.join(__dirname, '../static/worksimg');

// data.jsonを読み込む
const data = JSON.parse(fs.readFileSync(dataJsonPath, 'utf8'));

// 日付をYYYYMMDD形式からYYYY-MM-DD形式に変換
function formatDate(dateNum) {
  const dateStr = dateNum.toString();
  const year = dateStr.slice(0, 4);
  const month = dateStr.slice(4, 6);
  const day = dateStr.slice(6, 8);
  return `${year}-${month}-${day}`;
}

// 各作品を処理
data.products.forEach((product) => {
  const { caption, title, date, tag, desc } = product;

  // 旧マークダウンファイルのパス
  const oldMdPath = path.join(oldContentDir, `${caption}.md`);

  // マークダウンファイルが存在するか確認
  if (!fs.existsSync(oldMdPath)) {
    console.warn(`⚠️  ${caption}.md が見つかりません`);
    return;
  }

  // 旧マークダウンの内容を読み込む
  const oldContent = fs.readFileSync(oldMdPath, 'utf8');

  // 画像パスを確認（存在する場合のみ）
  let imagePath = '';
  const possibleImagePath = path.join(staticImgDir, `${caption}.png`);
  if (fs.existsSync(possibleImagePath)) {
    imagePath = `/images/works/${caption}.png`;
  }

  // フロントマターを生成
  const frontmatter = `---
title: "${title}"
slug: "${caption}"
date: "${formatDate(date)}"
tags: ${JSON.stringify(tag)}
description: "${desc}"
image: "${imagePath}"
---

`;

  // 新しいマークダウンファイルの内容
  const newContent = frontmatter + oldContent;

  // 新しいマークダウンファイルに書き込む
  const newMdPath = path.join(newContentDir, `${caption}.md`);
  fs.writeFileSync(newMdPath, newContent, 'utf8');

  console.log(`✅ ${caption}.md を変換しました`);
});

console.log('\n🎉 すべての作品の変換が完了しました！');
console.log(`📁 新しいマークダウンファイル: content/works/`);
