export type AppConfig = {
  port: number;
  corsOrigin: string[];
  databaseUrl: string;
};

export function loadConfig(): AppConfig {
  const port = Number(process.env.PORT) || 3000;
  const corsOrigin = (process.env.CORS_ORIGIN || "http://localhost:3001")
    .split(",")
    .map((o) => o.trim());
  const databaseUrl = process.env.DATABASE_URL || "file:./dev.db";

  return { port, corsOrigin, databaseUrl };
}
