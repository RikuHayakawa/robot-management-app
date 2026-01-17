import express, { Express, Router } from "express";
import cors from "cors";
import swaggerUi from "swagger-ui-express";
import { RegisterRoutes } from "./generated/routes";

const app: Express = express();

// CORS設定
// 環境変数からオリジンを取得（カンマ区切りで複数指定可能）
const corsOrigin = process.env.CORS_ORIGIN || "http://localhost:3001";
const allowedOrigins = corsOrigin.split(",").map((origin) => origin.trim());

app.use(
  cors({
    origin: allowedOrigins.length === 1 ? allowedOrigins[0] : allowedOrigins,
    credentials: true,
  })
);

// JSONボディパーサー
app.use(express.json());

// ヘルスチェックエンドポイント
app.get("/health", (req, res) => {
  res.status(200).json({
    status: "ok",
    timestamp: new Date().toISOString(),
  });
});

// Swagger UI
try {
  const swaggerDocument = require(`./generated/swagger.json`);
  app.use("/docs", swaggerUi.serve);
  app.get("/docs", swaggerUi.setup(swaggerDocument));
} catch (error) {
  console.warn("API 仕様書が見つかりません。'pnpm tsoa:spec' を実行してください。");
}

// tsoa生成のルーター
const router = Router();
RegisterRoutes(router);
app.use(router);

export default app;
