import {
  decodeWaypointLogCursor,
  encodeWaypointLogCursor,
} from "../../../application/shared/pagination/cursor";
import type { PaginatedResult } from "../../../application/shared/pagination/types";
import { GetWaypointLogsByRobotIdResultDto } from "../../../application/waypointLogs/dto";
import { IWaypointLogQueryService } from "../../../application/waypointLogs/queries/interfaces/IWaypointLogQueryService";
import { WaypointLogGetPayload } from "../../../generated/prisma/models/WaypointLog";
import type { PrismaClient } from "../../../generated/prisma/client";

/**
 * Prismaのselect結果の型を取得
 */
type WaypointLogSelectResult = WaypointLogGetPayload<{
  select: {
    id: true;
    robotId: true;
    nodeId: true;
    battery: true;
    reachedAt: true;
  };
}>;

/**
 * WaypointLogクエリサービス実装
 */
export class WaypointLogQueryService implements IWaypointLogQueryService {
  constructor(private readonly prisma: PrismaClient) {}

  /**
   * Robot IDでWaypointLogを取得
   */
  public async findByRobotId(
    robotId: number
  ): Promise<GetWaypointLogsByRobotIdResultDto[]> {
    const waypointLogs = await this.prisma.waypointLog.findMany({
      where: { robotId },
      orderBy: { reachedAt: "desc" },
      select: {
        id: true,
        robotId: true,
        nodeId: true,
        battery: true,
        reachedAt: true,
      },
    });

    return waypointLogs.map(
      (log: WaypointLogSelectResult) =>
        new GetWaypointLogsByRobotIdResultDto(
          log.id,
          log.robotId,
          log.nodeId,
          log.battery,
          log.reachedAt,
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
            { reachedAt: { lt: new Date(cursor.reachedAt) } },
            {
              AND: [
                { reachedAt: new Date(cursor.reachedAt) },
                { id: { lt: cursor.id } },
              ],
            },
          ],
        }
      : { robotId };
    const rows = await this.prisma.waypointLog.findMany({
      where,
      orderBy: [{ reachedAt: "desc" }, { id: "desc" }],
      take,
      select: {
        id: true,
        robotId: true,
        nodeId: true,
        battery: true,
        reachedAt: true,
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
          r.reachedAt,
        )
    );
    const nextCursor =
      items.length > 0
        ? encodeWaypointLogCursor(items[items.length - 1])
        : null;
    return { items, nextCursor, hasNextPage };
  }
}
