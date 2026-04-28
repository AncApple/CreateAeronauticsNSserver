# CLAUDE.md

This file provides guidance to Claude Code (claude.ai/code) when working with code in this repository.

## Overview

Packwiz-managed Minecraft modpack for NeoForge 1.21.1, centered on **Create Aeronautics**. Managed via [packwiz](https://packwiz.infra.link/).

- Pack name: `Cteate Aeronautics Pack` (v0.1.0)
- Minecraft: 1.21.1 / NeoForge 21.1.228
- Remote install URL: `https://raw.githubusercontent.com/AncApple/CreateAeronauticsNSserver/refs/heads/main/pack.toml`

## プロジェクト概要

<!-- ModPackの目的・コンセプトを1〜2行で記述 -->
- **ModPack名**: Create Aeronautics Pack
- **目的**: Createを中心とした航空機・建築をテーマにしたModPack
- **配布形式**: Packwiz（GitHub経由 + packwiz-installer-bootstrap）

## 環境情報

| 項目 | 値 |
|---|---|
| Minecraft | 1.21.1 |
| ModLoader | NeoForge 21.1.228 |
| Java | 21以上 |
| Packwiz実行環境 | WSL（Ubuntu） |
| 作業フォルダ | `/mnt/d/work/minecraft/CreateAeronauticsNSserver` |
| ランチャー | Prism Launcher 11.0.2 |
## Common Commands

```sh
# インデックス再生成（ファイル追加・削除後に必ず実行）
packwiz refresh

# Modrinth からモッド追加
packwiz modrinth add <mod-slug>

# モッド一括アップデート
packwiz update --all

# .mrpack エクスポート
packwiz modrinth export
```

## Structure

- `pack.toml` — パック本体のメタ情報・バージョン定義
- `index.toml` — packwiz が自動管理するファイル一覧（手動編集不要、`packwiz refresh` で再生成）
- `mods/*.pw.toml` — 各モッドの定義ファイル（Modrinth URL・ハッシュ・side）
- `.packwizignore` — `index.toml` への自動追加から除外するファイルのパターン（.gitignore 形式）

## KubeJS 編集ガイド

### 対象バージョン
- Minecraft: **1.21.1**
- KubeJS: **2101.7.2** (NeoForge 21.1.x)
- これ以外のバージョンの情報は **使わない**。

### 情報源の優先順位 (厳守)

1. **`docs/` 配下のファイルのみを情報源とする。**
2. **不明点があっても WebSearch / WebFetch / 学習済み知識で補完しない。**
   - docs に書かれていない API・記法・挙動は「docs に記載なし」と明示し、
     ユーザーに確認する。推測で書かない。
3. KubeJS 公式 Wiki、GitHub Issue、ブログ、Stack Overflow 等の外部情報源は
   ユーザーが明示的に許可した場合のみ参照する。

### 検索の入り口

KubeJS 関連のタスクを受けたら、最初に以下を必ず読む:

1. `docs/_meta/MACHINE_INDEX.md` — ページ索引・ディレクトリ構造・パッケージマップ
2. 索引から該当ページを特定し、そのページ全体を読む

MACHINE_INDEX の `pages:` セクションは slug / file / topics で引ける。
タスクのキーワードを `topics:` と照合してページを選ぶ。

### ページの読み方

各ページは2層構造:

- **`kjs-event` / `kjs-method` / `kjs-type` のコードブロック** = 機械可読 API 定義。
  シグネチャ・引数型・戻り値・キャンセル可否などの **正準情報**。実装判断はここを根拠にする。
- **散文部分** = 人間向け解説・例・「よくある間違い」。
  コード例の文脈やパターンを掴むために読む。

機械可読ブロックと散文が矛盾した場合は **機械可読ブロックを優先**。

### 作業フロー

1. **計画**: ユーザーの依頼を MACHINE_INDEX の `topics:` と突き合わせ、
   読むべきページを列挙する。複数ページにまたがる場合はすべて読む。
2. **実装**: 該当ページの機械可読ブロックを根拠にコードを書く。
   docs に無い API は使わない。
3. **検証前の自己チェック**:
   - 使った API はすべて docs のいずれかのページに登場したか？
   - スクリプト配置先 (`startup_scripts/` / `server_scripts/` / `client_scripts/`) は
     ページ記載通りか？
   - バージョンは 1.21.1 / KubeJS 2101.x の API か？

### docs に情報が無いとき

以下の対応を取る (この順):

1. MACHINE_INDEX の `package_map:` を見て、関連 Java ソースのパスを確認する
   (ただしソース閲覧はユーザーに環境がある前提で、勝手に clone しない)
2. それでも分からない場合、**推測せずユーザーに質問する**:
   - 「`<API名>` は docs に記載がありません。
     使い方をご存知ですか? あるいは別のアプローチを取りますか?」

### やってはいけないこと

- ❌ docs に無い API を「たぶんこう書ける」で書く
- ❌ 1.20.1 / 1.19.2 等の古いバージョンの記法を混ぜる
  (例: 旧 NBT 記法 `{Damage:5}` を 1.21.1 で使う)
- ❌ "KubeJS Wiki によると..." のような外部情報の引用
- ❌ MACHINE_INDEX を読まずに `docs/` 配下を grep で探索しはじめる
  (索引を経由したほうが速い)

### ファイル名規約

docs 配下のファイル名・ディレクトリ名は **ASCII のみ** (Windows 11 互換)。
新規ページを作る場合もこの規約を守る。


---

## Important Notes

- `index.toml` と `pack.toml` の `hash` は `packwiz refresh` / `packwiz update` が自動更新するため直接編集しない。
- Modの `side` フィールドは `both` / `client` / `server` のいずれか。クライアント専用Mod（見た目系）は `client` に設定する。
- `.packwizignore` に除外パターンを追加した後は `packwiz refresh` を実行してインデックスを反映させること。
- ファイルの追加・編集・削除を伴う作業が完了したら、必ず `packwiz refresh` を実行してインデックスを最新状態に保つこと。

## 参考リンク

- [Packwiz公式ドキュメント](https://packwiz.infra.link/)
- [NeoForge公式](https://neoforged.net/)
