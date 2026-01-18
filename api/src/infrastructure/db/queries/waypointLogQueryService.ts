import prisma from "../clients";
import { IWaypointLogQueryService } from "../../../application/waypointLogs/queries/interfaces/IWaypointLogQueryService";
import { GetWaypointLogsByRobotIdResultDto } from "../../../application/waypointLogs/dto";
import { WaypointLogGetPayload } from "../../../generated/prisma/models/WaypointLog";

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
  };
}>;

/**
 * WaypointLogクエリサービス実装
 */
export class WaypointLogQueryService implements IWaypointLogQueryService {
  /**
   * Robot IDでWaypointLogを取得
   */
  public async findByRobotId(
    robotId: number
  ): Promise<GetWaypointLogsByRobotIdResultDto[]> {
    const waypointLogs = await prisma.waypointLog.findMany({
      where: { robotId },
      orderBy: { timestamp: "desc" },
      select: {
        id: true,
        robotId: true,
        nodeId: true,
        battery: true,
        timestamp: true,
      },
    });

    return waypointLogs.map(
      (log: WaypointLogSelectResult) =>
        new GetWaypointLogsByRobotIdResultDto(
          log.id,
          log.robotId,
          log.nodeId,
          log.battery,
          log.timestamp,
        )
    );
  }
}

// シングルトンインスタンスをエクスポート
export const waypointLogQueryService = new WaypointLogQueryService();
