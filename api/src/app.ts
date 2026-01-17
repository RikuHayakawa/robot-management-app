import express, { Express, Router } from "express";
import swaggerUi from "swagger-ui-express";
import { RegisterRoutes } from "./generated/routes";

const app: Express = express();

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
RegisterRoutes(app as Router);

export default app;
