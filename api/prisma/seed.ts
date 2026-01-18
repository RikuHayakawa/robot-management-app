import { PrismaClient } from "../src/generated/prisma/client";
import { PrismaBetterSqlite3 } from "@prisma/adapter-better-sqlite3";

/**
 * データベースクライアントを作成
 */
function createPrismaClient(): PrismaClient {
  const databaseUrl = process.env.DATABASE_URL || "file:./dev.db";
  const filePath = databaseUrl.replace(/^file:/, "");
  const adapter = new PrismaBetterSqlite3({ url: filePath });

  return new PrismaClient({
    adapter,
  });
}

const prisma = createPrismaClient();

/**
 * ランダムな整数を生成（min以上max以下）
 */
function randomInt(min: number, max: number): number {
  return Math.floor(Math.random() * (max - min + 1)) + min;
}

/**
 * ランダムな浮動小数点数を生成（min以上max未満）
 */
function randomFloat(min: number, max: number): number {
  return Math.random() * (max - min) + min;
}

/**
 * 過去N日間のランダムな日時を生成
 */
function randomDateInPast(daysAgo: number): Date {
  const now = new Date();
  const past = new Date(now.getTime() - daysAgo * 24 * 60 * 60 * 1000);
  const randomTime = past.getTime() + Math.random() * (now.getTime() - past.getTime());
  return new Date(randomTime);
}

/**
 * シードデータを生成
 */
async function main() {
  console.log("🌱 Starting seed...\n");

  // 既存データの確認
  const existingRobots = await prisma.robot.count();
  const existingNodes = await prisma.node.count();
  const existingWaypointLogs = await prisma.waypointLog.count();

  if (existingRobots > 0 || existingNodes > 0 || existingWaypointLogs > 0) {
    console.log("⚠️  Existing data found:");
    console.log(`   Robots: ${existingRobots}`);
    console.log(`   Nodes: ${existingNodes}`);
    console.log(`   WaypointLogs: ${existingWaypointLogs}`);
    console.log("   Clearing existing data...\n");

    // 既存データを削除（外部キー制約のため順序に注意）
    await prisma.waypointLog.deleteMany();
    await prisma.robot.deleteMany();
    await prisma.node.deleteMany();
  }

  // Node 15個を作成
  console.log("📍 Creating 15 nodes...");
  const nodes = await Promise.all(
    Array.from({ length: 15 }, (_, i) =>
      prisma.node.create({
        data: {
          name: `Node-${i + 1}`,
          x: randomFloat(0, 100),
          y: randomFloat(0, 100),
        },
      })
    )
  );
  console.log(`✅ Created ${nodes.length} nodes\n`);

  // Robot 10機を作成
  console.log("🤖 Creating 10 robots...");
  const robots = await Promise.all(
    Array.from({ length: 10 }, (_, i) =>
      prisma.robot.create({
        data: {
          name: `Robot-${i + 1}`,
          isActive: Math.random() > 0.5,
        },
      })
    )
  );
  console.log(`✅ Created ${robots.length} robots\n`);

  // WaypointLogを作成（各ロボットごとに5〜20個）
  console.log("📍 Creating waypoint logs...");
  let totalWaypointLogs = 0;

  for (const robot of robots) {
    const logCount = randomInt(5, 20);
    const timestamps = Array.from({ length: logCount }, () =>
      randomDateInPast(30)
    ).sort((a, b) => a.getTime() - b.getTime()); // 時系列順にソート

    const waypointLogs = await Promise.all(
      timestamps.map((timestamp) =>
        prisma.waypointLog.create({
          data: {
            robotId: robot.id,
            nodeId: nodes[randomInt(0, nodes.length - 1)].id,
            battery: randomInt(0, 100),
            timestamp,
          },
        })
      )
    );

    totalWaypointLogs += waypointLogs.length;
    console.log(`   Robot ${robot.name}: ${waypointLogs.length} waypoint logs`);
  }

  console.log(`\n✅ Created ${totalWaypointLogs} waypoint logs in total\n`);

  // 結果のサマリー
  console.log("📊 Seed Summary:");
  console.log(`   Nodes: ${nodes.length}`);
  console.log(`   Robots: ${robots.length}`);
  console.log(`   WaypointLogs: ${totalWaypointLogs}`);
  console.log("\n✨ Seed completed successfully!");
}

main()
  .catch((e) => {
    console.error("❌ Error during seed:", e);
    process.exit(1);
  })
  .finally(async () => {
    await prisma.$disconnect();
  });
