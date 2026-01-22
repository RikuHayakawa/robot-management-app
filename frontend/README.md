# Robot Management Frontend

Robot管理システムのフロントエンドアプリケーション（Next.js）です。

## 必要な環境

- Node.js 24.12.0 (`.node-version`を参照)
- バックエンドAPIが起動していること（`http://localhost:3000` など）

## 初回セットアップ

### 1. .env の作成

`.env.example` をコピーして `.env` を作成し、必要に応じて値を編集してください。

```bash
cp .env.example .env
```

主な変数：
- `NEXT_PUBLIC_API_URL`: APIのURL（開発時は `http://localhost:3000`）

### 2. パッケージのインストール

```bash
npm install
```

### 3. 開発環境の起動

```bash
npm run dev -- -p 3001
```

ブラウザで `http://localhost:3001` にアクセスします。

**注意**: `-p 3001` の前に `--` が必要です。これによりポート番号が Next.js に正しく渡されます。

## その他のコマンド

### ビルド

```bash
npm run build
```

### 本番環境の起動

```bash
npm run start
```

### TypeScriptの型チェック

```bash
npm run tsc
```

### API スキーマの型生成

```bash
# REST API の型を生成
npm run generate:types

# GraphQL の型を生成
npm run generate:graphql
```

### コードフォーマット

```bash
npm run prettier
```
