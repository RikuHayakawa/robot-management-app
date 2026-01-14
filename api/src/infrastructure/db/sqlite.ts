import { PrismaClient } from "../../../node_modules/.prisma/client/client";
import { PrismaClientSQLite } from "@prisma/adapter-sqlite3";
import Database from "better-sqlite3";

// Prisma 7では、SQLiteを使用する場合、better-sqlite3のadapterが必要です
const databaseUrl = process.env.DATABASE_URL || "file:./dev.db";
const sqliteDb = new Database(databaseUrl.replace("file:", ""));
const adapter = new PrismaClientSQLite(sqliteDb);

const prisma = new PrismaClient({
  adapter,
});

export default prisma;
