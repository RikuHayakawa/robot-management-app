# Robot Management API

Robot管理システムのバックエンドAPIサーバーです。

## 必要な環境

- Node.js 24.12.0 (`.node-version`を参照)
- pnpm 10.28.0

## 初回セットアップ

git clone後、以下のコマンドを1つ実行するだけでセットアップと起動が完了します：

```bash
pnpm setup:dev
```

このコマンドは以下を自動的に実行します：

1. `.env`ファイルの作成（`.env.example`からコピー）
2. 依存関係のインストール（`better-sqlite3`のネイティブモジュールも自動ビルド）
3. Prismaクライアントの生成
4. データベースマイグレーションの実行
5. TSOAルートとAPI仕様書の生成
6. 開発サーバーの起動

> **注意**: pnpm v10以降では、ネイティブモジュールのビルドスクリプトはデフォルトでブロックされます。このプロジェクトでは`package.json`の`pnpm.onlyBuiltDependencies`に`better-sqlite3`を指定しているため、自動的にビルドされます。

## 手動セットアップ

セットアップと起動を分けて実行したい場合：

```bash
# セットアップのみ（起動しない）
pnpm setup:init

# 開発サーバーを起動
pnpm dev
```

## 利用可能なコマンド

### 開発

- `pnpm dev` - 開発サーバーを起動（ts-node使用）
- `pnpm start` - 本番用サーバーを起動（ビルド済みファイルを使用）
- `pnpm build` - TypeScriptをコンパイル

### データベース

- `pnpm prisma:generate` - Prismaクライアントを生成
- `pnpm prisma:migrate` - データベースマイグレーションを実行
- `pnpm prisma:studio` - Prisma Studioを起動（データベースGUI）

### API仕様書

- `pnpm tsoa:routes` - TSOAルートを生成
- `pnpm tsoa:spec` - OpenAPI仕様書を生成

### テスト

- `pnpm test` - テストを実行
- `pnpm test:watch` - ウォッチモードでテストを実行
- `pnpm test:ui` - テストUIを起動
- `pnpm test:coverage` - カバレッジレポートを生成

## 環境変数

`.env`ファイルで以下の環境変数を設定できます：

- `PORT` - サーバーのポート番号（デフォルト: 3000）
- `DATABASE_TYPE` - データベースタイプ（デフォルト: sqlite）
- `DATABASE_URL` - データベース接続URL（デフォルト: file:./dev.db）
- `CORS_ORIGIN` - CORS許可オリジン（デフォルト: http://localhost:3001）

## トラブルシューティング

### データベースのリセット

データベースを初期状態に戻す場合：

```bash
rm dev.db
pnpm prisma:migrate
```
