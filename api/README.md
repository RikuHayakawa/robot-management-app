# Robot Management API

Robot管理システムのバックエンドAPIサーバーです。

## 必要な環境

- Node.js 24.12.0 (`.node-version`を参照)

## .env の作成

`.env.example` をコピーして `.env` を作成します。`npm run setup:init` および `npm run setup:dev` では自動作成されます。手動で行う場合：

```bash
cp .env.example .env
```

必要に応じて `.env` 内の値（`DATABASE_URL`、`CORS_ORIGIN`、`PORT` など）を編集してください。

## 初回セットアップ

git clone後、以下のコマンドを1つ実行するだけでセットアップと起動が完了します：

```bash
npm run setup:dev
```

## 手動セットアップ

セットアップと起動を分けて実行したい場合：

```bash
# セットアップのみ（起動しない）
npm run setup:init

# 開発サーバーを起動
npm run dev
```
