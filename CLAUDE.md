# CLAUDE.md

This file provides guidance to Claude Code (claude.ai/code) when working with code in this repository.

## Overview

Packwiz-managed Minecraft modpack for NeoForge 1.21.1, centered on **Create Aeronautics**. Managed via [packwiz](https://packwiz.infra.link/).

- Pack name: `Cteate Aeronautics Pack` (v0.1.0)
- Minecraft: 1.21.1 / NeoForge 21.1.228
- Remote install URL: `https://raw.githubusercontent.com/AncApple/CreateAeronauticsNSserver/refs/heads/main/pack.toml`

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

## Important Notes

- `index.toml` と `pack.toml` の `hash` は `packwiz refresh` / `packwiz update` が自動更新するため直接編集しない。
- モッドの `side` フィールドは `both` / `client` / `server` のいずれか。クライアント専用 mod（見た目系）は `client` に設定する。
- `.packwizignore` に除外パターンを追加した後は `packwiz refresh` を実行してインデックスを反映させること。
