import prisma from "../../clients";
import { IWaypointLogRepository } from "../../../../domain/waypointLogs/IWaypointLogRepository";
import { WaypointLog } from "../../../../domain/waypointLogs/WaypointLog";
import { WaypointLogGetPayload } from "../../../../generated/prisma/models/WaypointLog";

/**
 * Prismaのselect結果の型を取得
 */
type WaypointLogSelectResult = WaypointLogGetPayload<{
  select: {
    id: true;
    robotId: true;
    nodeId: true;
    battery: true;
    timestamp: true;
    createdAt: true;
    updatedAt: true;
  };
}>;

/**
 * WaypointLogリポジトリ実装（RDB用）
 * DomainのIWaypointLogRepositoryを実装し、Prismaを使用してデータベースアクセスを行う
 */
export class WaypointLogRepository implements IWaypointLogRepository {
  /**
   * DB rowからWaypointLogエンティティに変換
   */
  private toDomain(row: WaypointLogSelectResult): WaypointLog {
    return new WaypointLog(
      row.id,
      row.robotId,
      row.nodeId,
      row.battery,
      row.timestamp,
      row.createdAt,
      row.updatedAt
    );
  }

  /**
   * Robot IDでWaypointLogを取得
   */
  public async findByRobotId(robotId: number): Promise<WaypointLog[]> {
    const waypointLogs = await prisma.waypointLog.findMany({
      where: { robotId },
      select: {
        id: true,
        robotId: true,
        nodeId: true,
        battery: true,
        timestamp: true,
        createdAt: true,
        updatedAt: true,
      },
      orderBy: {
        timestamp: "desc",
      },
    });
    return waypointLogs.map((log) => this.toDomain(log));
  }
}

// シングルトンインスタンスをエクスポート
export const waypointLogRepository = new WaypointLogRepository();
