import { PrismaClient } from "../../../generated/prisma/client"
import { PrismaBetterSqlite3 } from "@prisma/adapter-better-sqlite3";

/**
 * SQLiteクライアントを作成
 */
export function createSqliteClient(): PrismaClient {
  const databaseUrl = process.env.DATABASE_URL || "file:./dev.db";
  // Prismaの"file:"形式からファイルパスを抽出
  const filePath = databaseUrl.replace(/^file:/, "");

  const adapter = new PrismaBetterSqlite3({ url: filePath });

  return new PrismaClient({
    adapter,
  });
}
