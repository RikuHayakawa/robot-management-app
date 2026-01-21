# Robot Management Frontend

## .env の作成

`.env.example` をコピーして `.env` を作成し、必要に応じて値を編集してください。

```bash
cp .env.example .env
```

主な変数：`NEXT_PUBLIC_API_URL`（APIのURL。開発時は `http://localhost:3000` など）

- パッケージのインストール

```bash
npm install
```

- 開発環境の起動

```bash
npm run dev -p 3001
```

- ビルド

```bash
npm run build
```

- TypeScriptの型チェック

```bash
npm run tsc
```
