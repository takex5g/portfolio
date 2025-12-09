---
title: "ランダムワード生成器"
slug: "wordgenerator"
date: "2020-02-22"
tags: ["WEB"]
description: "100万語からランダムに5単語表示するWEBサービス"
image: "/images/works/wordgenerator.webp"
---

<iframe 
  class="hatenablogcard" 
  style="width:100%;height:155px;max-width:680px;" 
  title="お題をランダムに表示します。小説や漫画の書き出しで困ったりアイデアを出したい時にお使いください。" 
  src="https://hatenablog-parts.com/embed?url=https://theme.mononichi.com/" 
  width="300" height="150" frameborder="0" scrolling="no">
</iframe>

ランダム単語ガチャのライバルを作ろうという意味不明な発想で作りました。ランダムに選ぶ処理をPHPバックエンド側で実装しました。また、ある程度ランダム単語をキューに溜めておくことで引き直し時もタイムロスがありません。

PHPのみでの実装だったサイトを、部分的にvue.jsを使って再構築しました。

