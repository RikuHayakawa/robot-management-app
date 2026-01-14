import { PrismaClient } from "../../../generated/prisma/client";
import { createSqliteClient } from "./sqlite";

export type DatabaseType = "sqlite" | "postgresql" | "mysql";

/**
 * 環境変数に基づいてデータベースクライアントを作成
 */
export function createDatabaseClient(): PrismaClient {
  const dbType = (process.env.DATABASE_TYPE || "sqlite") as DatabaseType;

  switch (dbType) {
    case "sqlite":
    default:
      return createSqliteClient();
    // 将来的に追加可能:
    // case "postgresql":
    //   return createPostgresqlClient();
    // case "mysql":
    //   return createMysqlClient();
  }
}

/**
 * シングルトンインスタンス
 */
export const prisma = createDatabaseClient();
export default prisma;
