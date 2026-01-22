import { encodeNodeCursor } from "../../../../application/shared/pagination/cursor";
import { clampLimit } from "../../../../application/shared/pagination/clamp";
import type { GraphQLContext } from "../../context";
import { buildConnection } from "../../pagination/connection";
import { NodeType } from "../../types/NodeType";

export const nodeQuery = {
  nodes: async (
    _: unknown,
    args: { limit?: number; after?: string },
    ctx: GraphQLContext
  ) => {
    const limit = clampLimit(args?.limit ?? 20);
    const cursor = args?.after;
    const result = await ctx.getAllNodesService.invoke({ limit, cursor });
    return buildConnection({
      items: result.items,
      hasNextPage: result.hasNextPage,
      encodeCursor: encodeNodeCursor,
      toNode: NodeType.from,
    });
  },
  node: async (_: unknown, args: { id: string }, ctx: GraphQLContext) => {
    const id = parseInt(args.id, 10);
    if (Number.isNaN(id)) return null;
    const dto = await ctx.getNodeByIdService.invoke(id);
    if (!dto) return null;
    return NodeType.from(dto);
  },
};
