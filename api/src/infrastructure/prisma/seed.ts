import prisma from "./client";

/**
 * node.md の座標（id 0〜81）。複数 point がある場合はコメントアウトされていない方を採用。
 */
const NODE_COORDS: { x: number; y: number }[] = [
  { x: 0.0, y: 0.0 },
  { x: -18.7192398099578, y: 1.065049359574914 },
  { x: -77.0, y: 6.843244920950383 },
  { x: -102.92311511543812, y: 9.296806560829282 },
  { x: -102.00264180992963, y: 31.0 },
  { x: -96.0, y: 30.5 },
  { x: -75.5, y: 24.5 },
  { x: -76.0, y: 19.5 },
  { x: -48.53830204572296, y: 18.0 },
  { x: -47.85434818750946, y: 24.19326150882989 },
  { x: -39.21399433014449, y: 23.0 },
  { x: -18.5, y: 21.26285163220018 },
  { x: -18.0, y: 28.5 },
  { x: 12.0, y: 25.5 },
  { x: 215.0, y: 16.5 },
  { x: 208.5026626153849, y: -70.97430323902518 },
  { x: 227.50792410538998, y: -70.37761059915647 },
  { x: 232.20815408334602, y: -97.04539341339841 },
  { x: 240.6245821219636, y: -149.70605530496687 },
  { x: 248.28197155165253, y: -263.59313603909686 },
  { x: 257.4849282322102, y: -318.81259988667443 },
  { x: 331.2716608279152, y: -324.39098061434925 },
  { x: 353.1043200772838, y: -320.0490797753446 },
  { x: 426.45974323141854, y: -323.6258362173103 },
  { x: 469.0676600072766, y: -341.1111017172225 },
  { x: 547.7095260815695, y: -347.5099560394883 },
  { x: 535.1095262459712, y: -375.4565908270888 },
  { x: 547.2169213662855, y: -246.89149211812764 },
  { x: 548.5846890734974, y: -206.8585228244774 },
  { x: 499.08414461644134, y: -194.63329605665058 },
  { x: 398.9390930896043, y: -186.47796296328306 },
  { x: 384.9307007333264, y: -201.43224065983668 },
  { x: 373.68104114430025, y: -210.3113762009889 },
  { x: 361.2294228216051, y: -222.50705822231248 },
  { x: 316.16461604624055, y: -245.93135711550713 },
  { x: 280.2597307357937, y: -186.24419601727277 },
  { x: 283.94035375572275, y: -149.33915040222928 },
  { x: 267.5537052091677, y: -130.10417763050646 },
  { x: 206.13475366623607, y: -102.34522680239752 },
  { x: 208.32437864755047, y: -261.1074640713632 },
  { x: 206.4577917730203, y: -344.17671677516773 },
  { x: 372.4377122678561, y: -341.97402877081186 },
  { x: 366.69080180011224, y: -349.79581614769995 },
  { x: 376.5103684179485, y: -368.41392005234957 },
  { x: 422.03529138385784, y: -372.6153085757978 },
  { x: 427.5643599673058, y: -349.7048993976787 },
  { x: 530.1823892093962, y: -219.88580330275 },
  { x: 499.0340348437894, y: -209.49749405216426 },
  { x: 482.38005377771333, y: -218.54766743490472 },
  { x: 441.67206069501117, y: -247.89300093054771 },
  { x: 408.04867904353887, y: -223.06006244011223 },
  { x: 440.3906093027326, y: -259.63953078445047 },
  { x: 355.89308462908957, y: -215.46803924022242 },
  { x: 337.49604098603595, y: -189.78025230579078 },
  { x: 342.18546809459804, y: -179.5080246445723 },
  { x: 345.2480573921348, y: -150.80597383202985 },
  { x: 577.6545206979499, y: -198.9235673956573 },
  { x: 428.35992625157814, y: -284.4853426832706 },
  { x: -120.09695073246257, y: 11.900423268321902 },
  { x: -101.15017030364834, y: 34.794009445700794 },
  { x: -75.0, y: 31.0 },
  { x: -39.0, y: 29.895327675621957 },
  { x: 564.6103953681886, y: -197.58044581580907 },
  { x: 230.7077384479926, y: -103.35423718811944 },
  { x: 229.23353426670656, y: -59.30088634509593 },
  { x: 412.5381262767478, y: -71.79335205396637 },
  { x: 503.1640375695424, y: -77.08555521257222 },
  { x: 502.10791719175177, y: -103.14423970971256 },
  { x: 352.1029179269681, y: -92.41038561426103 },
  { x: 351.36682708305307, y: -103.60740725696087 },
  { x: 233.79565837269183, y: -81.53014272497967 },
  { x: 449.0445837629377, y: -191.8317838050425 },
  { x: 448.6048929677927, y: -200.25834539486095 },
  { x: 230.9259732842911, y: -32.69357834663242 },
  { x: 415.1440279657254, y: -37.70801052916795 },
  { x: 553.974614927487, y: -80.99846570659429 },
  { x: 541.3340784315369, y: -106.7310001864098 },
  { x: 319.54668086359743, y: -116.7293515582569 },
  { x: 411.22418723691953, y: -96.51843436900526 },
  { x: -95.0, y: 27.0 },
  { x: -14.0, y: 49.0 },
  { x: -73.0, y: 55.0 },
];

/** WaypointLog: シード日の営業時間（分、0:00 起点）。9:00=540, 18:00=1080 */
const WORK_START_MINUTES = 9 * 60;
const WORK_END_MINUTES = 18 * 60;

/** WaypointLog: 充電残量の初期範囲（1本目） */
const BATTERY_INITIAL_MIN = 80;
const BATTERY_INITIAL_MAX = 100;

/** WaypointLog: 1回あたりの消費量の範囲（前の値から減算、1%〜2%） */
const BATTERY_DECREMENT_MIN = 1;
const BATTERY_DECREMENT_MAX = 2;

/**
 * ランダムな整数を生成（min以上max以下）
 */
function randomInt(min: number, max: number): number {
  return Math.floor(Math.random() * (max - min + 1)) + min;
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

  // Node 82個を作成（node.md の座標を参照）
  console.log(`📍 Creating ${NODE_COORDS.length} nodes...`);
  const nodes = await Promise.all(
    NODE_COORDS.map((coord, i) =>
      prisma.node.create({
        data: {
          name: `Node-${i + 1}`,
          x: coord.x,
          y: coord.y,
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

  // WaypointLogを作成（各ロボットごとに5〜20個。シード日の日付のみ、battery は時刻が遅いほど低下）
  console.log("📍 Creating waypoint logs...");
  let totalWaypointLogs = 0;
  const seedDate = new Date();
  const y = seedDate.getFullYear();
  const m = seedDate.getMonth();
  const d = seedDate.getDate();

  for (const robot of robots) {
    const logCount = randomInt(5, 20);
    const direction = Math.random() < 0.5 ? -1 : 1;
    const startIndex =
      direction === 1
        ? randomInt(0, NODE_COORDS.length - logCount)
        : randomInt(logCount - 1, NODE_COORDS.length - 1);

    const minuteOffsets = Array.from({ length: logCount }, () =>
      randomInt(WORK_START_MINUTES, WORK_END_MINUTES - 1)
    ).sort((a, b) => a - b);
    const timestamps = minuteOffsets.map(
      (min) => new Date(y, m, d, Math.floor(min / 60), min % 60, 0, 0)
    );

    const batteries: number[] = [];
    batteries[0] = randomInt(BATTERY_INITIAL_MIN, BATTERY_INITIAL_MAX);
    for (let i = 1; i < logCount; i++) {
      batteries[i] = Math.max(
        1,
        batteries[i - 1] - randomInt(BATTERY_DECREMENT_MIN, BATTERY_DECREMENT_MAX)
      );
    }

    const waypointLogs = await Promise.all(
      timestamps.map((ts, i) => {
        const nodeIndex = startIndex + direction * i;
        return prisma.waypointLog.create({
          data: {
            robotId: robot.id,
            nodeId: nodes[nodeIndex].id,
            battery: batteries[i],
            reachedAt: ts,
          },
        });
      })
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
