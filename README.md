# portfolio

> まいにちものづくりのポートフォリオ
> https://mononichi.com/

## Setup

```bash
# install dependencies
yarn install

# initialize submodules
git submodule update --init --recursive

# serve with hot reload at localhost:3000
yarn dev

# build for production (includes submodules)
yarn build
```

## Submodules

このリポジトリは以下のプロジェクトをsubmoduleとして含んでいます。

| Submodule | パス | URL |
|-----------|------|-----|
| twitterXmachine | `/twitterX` | https://mononichi.com/twitterX/ |

### 仕組み

- `yarn build` 実行時に `scripts/build-submodules.sh` が自動実行される
- 各submoduleがビルドされ、出力が `public/` 配下にコピーされる
- Next.jsビルド時に静的ファイルとして含まれる

### submoduleの追加方法

```bash
# 1. submoduleを追加
git submodule add https://github.com/username/repo.git repo-name

# 2. scripts/build-submodules.sh にビルド処理を追加

# 3. .gitignore に出力先を追加
echo "/public/path-name" >> .gitignore
```

### submoduleの更新

```bash
# 最新のコミットに更新
git submodule update --remote

# 変更をコミット
git add submodule-name
git commit -m "Update submodule-name"
```

## 記事の更新方法

### Works（個人制作）

`content/works/` にMarkdownファイルを追加します。

```markdown
---
title: "作品タイトル"
slug: "file-name"
date: "2024-01-01"
tags: ["HARDWARE", "Web"]
description: "作品の説明文"
image: "/images/works/sample.png"
---

本文をここに書きます。
```

- 画像は `public/images/works/` に配置
- タグは複数指定可能

### Client Works（クライアントワーク）

`content/client-works/` にMarkdownファイルを追加します。

```markdown
---
title: "プロジェクト名"
date: "2024-01-01"
tags: ["Web", "AI"]
description: "プロジェクトの説明文"
image: "/images/client-works/sample.png"
---

本文をここに書きます。
```

- 画像は `public/images/client-works/` に配置

### Claude Codeで記事を作成

ツイートURLから記事を自動生成できます。

```bash
# Works（個人制作）の記事を作成
/new-work https://twitter.com/takex5g/status/xxxxx

# Client Worksの記事を作成
/new-client-work https://twitter.com/takex5g/status/xxxxx
```

ツイートの内容から記事のMarkdownファイルが自動生成されます。
作成後、サムネイル画像を該当フォルダに配置してください。
