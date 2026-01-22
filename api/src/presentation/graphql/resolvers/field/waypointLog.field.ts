import { GraphQLError } from "graphql";
import type { GraphQLContext } from "../../context";
import { NodeType } from "../../types/NodeType";
import { RobotType } from "../../types/RobotType";

export const waypointLogField = {
  node: async (parent: { nodeId: number }, _: unknown, ctx: GraphQLContext) => {
    const dto = await ctx.nodeLoader.load(parent.nodeId);
    if (!dto)
      throw new GraphQLError(
        "Node not found",
        undefined,
        undefined,
        undefined,
        undefined,
        undefined,
        { code: "NOT_FOUND" }
      );
    return NodeType.from(dto);
  },
  robot: async (parent: { robotId: number }, _: unknown, ctx: GraphQLContext) => {
    const dto = await ctx.robotLoader.load(parent.robotId);
    if (!dto)
      throw new GraphQLError(
        "Robot not found",
        undefined,
        undefined,
        undefined,
        undefined,
        undefined,
        { code: "NOT_FOUND" }
      );
    return RobotType.from(dto);
  },
};
