import {
  decodeWaypointLogCursor,
  encodeWaypointLogCursor,
} from "../../../application/pagination/cursor";
import type { PaginatedResult } from "../../../application/pagination/types";
import { GetWaypointLogsByRobotIdResultDto } from "../../../application/waypointLogs/dto";
import { IWaypointLogQueryService } from "../../../application/waypointLogs/queries/interfaces/IWaypointLogQueryService";
import { WaypointLogGetPayload } from "../../../generated/prisma/models/WaypointLog";
import prisma from "../clients";

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

  /**
   * Robot IDでWaypointLogをカーソルペジネーションで取得
   */
  public async findByRobotIdPaginated(
    robotId: number,
    args: { limit: number; cursor?: string }
  ): Promise<PaginatedResult<GetWaypointLogsByRobotIdResultDto>> {
    const cursor = args.cursor ? decodeWaypointLogCursor(args.cursor) : null;
    const take = args.limit + 1;
    const where = cursor
      ? {
          robotId,
          OR: [
            { timestamp: { lt: new Date(cursor.timestamp) } },
            {
              AND: [
                { timestamp: new Date(cursor.timestamp) },
                { id: { lt: cursor.id } },
              ],
            },
          ],
        }
      : { robotId };
    const rows = await prisma.waypointLog.findMany({
      where,
      orderBy: [{ timestamp: "desc" }, { id: "desc" }],
      take,
      select: {
        id: true,
        robotId: true,
        nodeId: true,
        battery: true,
        timestamp: true,
      },
    });
    const hasNextPage = rows.length > args.limit;
    const items = rows.slice(0, args.limit).map(
      (r: WaypointLogSelectResult) =>
        new GetWaypointLogsByRobotIdResultDto(
          r.id,
          r.robotId,
          r.nodeId,
          r.battery,
          r.timestamp,
        )
    );
    const nextCursor =
      items.length > 0
        ? encodeWaypointLogCursor(items[items.length - 1])
        : null;
    return { items, nextCursor, hasNextPage };
  }
}

// シングルトンインスタンスをエクスポート
export const waypointLogQueryService = new WaypointLogQueryService();
