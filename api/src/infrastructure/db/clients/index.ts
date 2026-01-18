import { PrismaClient } from "../../../generated/prisma/client";
import { createSqliteClient } from "./sqlite";

type DatabaseType = "sqlite" | "postgresql" | "mysql";

/**
 * 環境変数に基づいてデータベースクライアントを作成
 */
function createDatabaseClient(): PrismaClient {
  const dbType = (process.env.DATABASE_TYPE || "sqlite") as DatabaseType;

  switch (dbType) {
    case "sqlite":
      return createSqliteClient();
    default:
      throw new Error(`Unsupported database type: ${dbType}`);
  }
}

/**
 * シングルトンインスタンス
 */
const prisma = createDatabaseClient();
export default prisma;
