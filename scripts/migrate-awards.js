const fs = require('fs');
const path = require('path');

// パスの設定
const awardJsonPath = path.join(__dirname, '../store/award.json');
const outputPath = path.join(__dirname, '../content/awards.md');

// award.jsonを読み込む
const data = JSON.parse(fs.readFileSync(awardJsonPath, 'utf8'));

// マークダウンの内容を生成
let markdown = `---
title: "受賞・掲載歴"
---

# 受賞・掲載歴

`;

// 各受賞情報を追加
data.award.forEach((item) => {
  markdown += `## ${item.date}\n\n${item.detail}\n\n`;
});

// ファイルに書き込む
fs.writeFileSync(outputPath, markdown, 'utf8');

console.log('✅ 受賞情報を content/awards.md に変換しました');
