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

## KubeJSの書き方ルール

KubeJS に関して不明点や迷った場合は、必ず https://kubejs.com/wiki/ を参照して情報を収集すること。

### 基本構文（1.21対応）
```javascript
// server_scripts/example.js
ServerEvents.recipes(event => {
    // レシピ追加
    event.shaped('minecraft:diamond', [
        'AAA',
        'A A',
        'AAA'
    ], {
        A: 'minecraft:dirt'
    });

    // レシピ削除
    event.remove({ output: 'minecraft:torch' });
});
```

### startup_scripts（アイテム登録など）
```javascript
StartupEvents.registry('item', event => {
    event.create('kubejs:custom_item')
        .displayName('Custom Item')
        .tooltip('説明文');
});
```

### よく使うイベント
- `ServerEvents.recipes` - レシピ追加・削除
- `ServerEvents.tags` - タグ操作
- `ItemEvents.tooltip` - ツールチップ追加
- `BlockEvents.rightClicked` - ブロック右クリック処理

---

## Important Notes

- `index.toml` と `pack.toml` の `hash` は `packwiz refresh` / `packwiz update` が自動更新するため直接編集しない。
- Modの `side` フィールドは `both` / `client` / `server` のいずれか。クライアント専用Mod（見た目系）は `client` に設定する。
- `.packwizignore` に除外パターンを追加した後は `packwiz refresh` を実行してインデックスを反映させること。
- ファイルの追加・編集・削除を伴う作業が完了したら、必ず `packwiz refresh` を実行してインデックスを最新状態に保つこと。

## 参考リンク

- [Packwiz公式ドキュメント](https://packwiz.infra.link/)
- [KubeJS Wiki](https://kubejs.com/wiki)
- [NeoForge公式](https://neoforged.net/)
