---
title: '卒業式の筒で演奏するポンマシーン'
slug: 'ponmashine'
date: '2025-09-22'
tags: ['HARDWARE']
description: '筒でポンポン演奏するマシン'
image: '/images/works/ponmashine.webp'
---

卒業式の筒を使って演奏するマシンです。

### 仕組み

システムは以下のような構成になっています：

1. **音楽生成**: Macbook Pro上のAbleton LiveがMIDI信号を生成します
2. **信号変換**: Node.js/ATEM SDKで作成したMIDI・ATEM変換ソフトが、Ableton LiveからのMIDI信号を受信し、LAN経由でポンマシーンを制御する信号に変換します
3. **マシン制御**: LANスイッチングハブを経由して、OSC（Open Sound Control）プロトコルでポンマシーンに制御信号を送信します
4. **物理動作**: ポンマシーン内のSTEP400がステッピングモーターを制御し、筒をポンポンと叩いて演奏します

また、同じシステムでカメラの切り替え制御（ATEM mini pro ISO経由）も同時に行われています。

### アプリケーション

制御アプリケーションはElectron + React + TypeScriptで構築されており、以下の機能を提供しています：

- **卒業式の筒の自動開閉制御**: MIDI信号で筒の開閉を制御（Port 1/2で複数の筒を個別制御）
- **BlackMagic ATEMスイッチャー制御**: MIDI信号でカメラ切り替えを制御（Port 3、ノートC/D/E/F → カメラ1/2/3/4に対応）
- **ステッピングモーター制御**: STEP400コントローラー（4軸）をOSCで制御し、筒の開閉機構を駆動

![ポンマシーンの画像](/images/works/ponmashine-detail.jpg)

ソースコードを公開しています

https://github.com/takex5g/PON-MACHINE

### 使用技術

**ハードウェア**: 3D CAD(Fusion360), 3Dプリンター, Arduino, ステッピングモーター, STEP400

**ソフトウェア**: Electron 38, React 19, TypeScript, Ableton Live, Node.js, ATEM SDK, OSC (UDP), Web MIDI API
