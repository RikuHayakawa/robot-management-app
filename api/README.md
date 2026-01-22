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

## データベースのシード（初期データ投入）

開発用の初期データを投入するには：

```bash
npm run prisma:seed
```

このコマンドは以下のデータを投入します：

- **Node**: 82個のノード（座標データ、`Node-1` 〜 `Node-82`）
- **Robot**: 10機のロボット（`Robot-1` 〜 `Robot-10`、ランダムに `isActive` が設定）
- **WaypointLog**: 各ロボットごとに5〜20個の移動ログ（シード実行日の日付、battery は時刻が遅いほど低下）

**注意事項**:
- `setup:init` や `setup:dev` では seed は自動実行されません。必要に応じて手動で実行してください。
- 既存データがある場合は、seed 実行時に自動的に削除されてから新しいデータが投入されます。

## その他のコマンド

### Prisma Studio（データベースGUI）

```bash
npm run prisma:studio
```

ブラウザでデータベースの内容を確認・編集できます。

### テスト

```bash
# テスト実行
npm run test

# ウォッチモード
npm run test:watch

# カバレッジ付きテスト
npm run test:coverage
```

### API ドキュメント

- **Swagger UI**: `http://localhost:3000/docs`（開発サーバー起動後）
- **GraphQL Playground**: `http://localhost:3000/graphql`（開発サーバー起動後）

API ドキュメントを再生成する場合：

```bash
npm run tsoa:spec  # Swagger JSON を生成
npm run tsoa:routes  # ルート定義を生成
```
