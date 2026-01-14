import express, { Express } from "express";
import robotRouter from "./presentation/http/routers/robotRouter";

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

// REST API ルーター
app.use("/api/robots", robotRouter);

export default app;
