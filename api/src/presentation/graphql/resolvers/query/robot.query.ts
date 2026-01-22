import { encodeRobotCursor } from "../../../../application/shared/pagination/cursor";
import { clampLimit } from "../../../../application/shared/pagination/clamp";
import type { GraphQLContext } from "../../context";
import { buildConnection } from "../../pagination/connection";
import { RobotType } from "../../types/RobotType";

export const robotQuery = {
  robots: async (
    _: unknown,
    args: { limit?: number; after?: string },
    ctx: GraphQLContext
  ) => {
    const limit = clampLimit(args?.limit ?? 20);
    const cursor = args?.after;
    const result = await ctx.getAllRobotsService.invoke({ limit, cursor });
    return buildConnection({
      items: result.items,
      hasNextPage: result.hasNextPage,
      encodeCursor: encodeRobotCursor,
      toNode: RobotType.from,
    });
  },
  robot: async (_: unknown, args: { id: string }, ctx: GraphQLContext) => {
    const id = parseInt(args.id, 10);
    if (Number.isNaN(id)) return null;
    const dto = await ctx.getRobotByIdService.invoke(id);
    if (!dto) return null;
    return RobotType.from(dto);
  },
};
