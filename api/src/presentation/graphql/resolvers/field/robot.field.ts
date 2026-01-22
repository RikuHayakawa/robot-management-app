import { encodeWaypointLogCursor } from "../../../../application/shared/pagination/cursor";
import { clampLimit } from "../../../../application/shared/pagination/clamp";
import type { GraphQLContext } from "../../context";
import { buildConnection } from "../../pagination/connection";
import { WaypointLogType } from "../../types/WaypointLogType";

export const robotField = {
  waypointLogs: async (
    parent: { id: string },
    args: { limit?: number; after?: string },
    ctx: GraphQLContext
  ) => {
    const robotId = parseInt(parent.id, 10);
    const limit = clampLimit(args?.limit ?? 20);
    const cursor = args?.after;
    const result = await ctx.getWaypointLogsByRobotIdService.invoke(robotId, {
      limit,
      cursor,
    });
    return buildConnection({
      items: result.items,
      hasNextPage: result.hasNextPage,
      encodeCursor: encodeWaypointLogCursor,
      toNode: WaypointLogType.from,
    });
  },
};
