import { GraphQLError } from "graphql";
import {
  encodeNodeCursor,
  encodeRobotCursor,
  encodeWaypointLogCursor,
} from "../../../application/pagination/cursor";
import { clampLimit } from "../../../application/pagination/types";
import { CreateRobotInputDto } from "../../../application/robots/dto";
import { UpdateRobotInputDto } from "../../../application/robots/dto";
import type { GraphQLContext } from "../context";
import { RobotType, NodeType, WaypointLogType } from "../types";

export function createResolvers() {
  return {
    Query: {
      robots: async (
        _: unknown,
        args: { limit?: number; after?: string },
        ctx: GraphQLContext
      ) => {
        const limit = clampLimit(args?.limit ?? 20);
        const cursor = args?.after;
        const result = await ctx.getAllRobotsService.invoke({ limit, cursor });
        const edges = result.items.map((dto) => ({
          node: RobotType.from(dto),
          cursor: encodeRobotCursor(dto),
        }));
        return {
          edges,
          pageInfo: {
            hasNextPage: result.hasNextPage,
            endCursor:
              edges.length > 0 ? edges[edges.length - 1].cursor : null,
          },
        };
      },
      robot: async (_: unknown, args: { id: string }, ctx: GraphQLContext) => {
        const id = parseInt(args.id, 10);
        if (Number.isNaN(id)) return null;
        const dto = await ctx.getRobotByIdService.invoke(id);
        if (!dto) return null;
        return RobotType.from(dto);
      },
      nodes: async (
        _: unknown,
        args: { limit?: number; after?: string },
        ctx: GraphQLContext
      ) => {
        const limit = clampLimit(args?.limit ?? 20);
        const cursor = args?.after;
        const result = await ctx.getAllNodesService.invoke({ limit, cursor });
        const edges = result.items.map((dto) => ({
          node: NodeType.from(dto),
          cursor: encodeNodeCursor(dto),
        }));
        return {
          edges,
          pageInfo: {
            hasNextPage: result.hasNextPage,
            endCursor:
              edges.length > 0 ? edges[edges.length - 1].cursor : null,
          },
        };
      },
      node: async (_: unknown, args: { id: string }, ctx: GraphQLContext) => {
        const id = parseInt(args.id, 10);
        if (Number.isNaN(id)) return null;
        const dto = await ctx.getNodeByIdService.invoke(id);
        if (!dto) return null;
        return NodeType.from(dto);
      },
    },
    Mutation: {
      createRobot: async (
        _: unknown,
        args: { input: { name: string; isActive: boolean } },
        ctx: GraphQLContext
      ) => {
        const input = new CreateRobotInputDto(args.input.name, args.input.isActive);
        const dto = await ctx.createRobotService.invoke(input);
        return RobotType.from(dto);
      },
      updateRobot: async (
        _: unknown,
        args: { id: string; input: { name?: string; isActive?: boolean } },
        ctx: GraphQLContext
      ) => {
        const id = parseInt(args.id, 10);
        if (Number.isNaN(id)) throw new GraphQLError("Invalid id", undefined, undefined, undefined, undefined, undefined, { code: "BAD_USER_INPUT" });
        const input = new UpdateRobotInputDto(id, args.input.name, args.input.isActive);
        try {
          const dto = await ctx.updateRobotService.invoke(input);
          return RobotType.from(dto);
        } catch (e) {
          if (e instanceof Error && e.message === "Robot not found") {
            throw new GraphQLError("Robot not found", undefined, undefined, undefined, undefined, undefined, { code: "NOT_FOUND" });
          }
          throw e;
        }
      },
      deleteRobot: async (_: unknown, args: { id: string }, ctx: GraphQLContext) => {
        const id = parseInt(args.id, 10);
        if (Number.isNaN(id)) throw new GraphQLError("Invalid id", undefined, undefined, undefined, undefined, undefined, { code: "BAD_USER_INPUT" });
        try {
          await ctx.deleteRobotService.invoke(id);
          return true;
        } catch (e) {
          if (e instanceof Error && e.message === "Robot not found") {
            throw new GraphQLError("Robot not found", undefined, undefined, undefined, undefined, undefined, { code: "NOT_FOUND" });
          }
          throw e;
        }
      },
    },
    Robot: {
      waypointLogs: async (
        parent: { id: string },
        args: { limit?: number; after?: string },
        ctx: GraphQLContext
      ) => {
        const robotId = parseInt(parent.id, 10);
        const limit = clampLimit(args?.limit ?? 20);
        const cursor = args?.after;
        const result = await ctx.getWaypointLogsByRobotIdService.invoke(
          robotId,
          { limit, cursor }
        );
        const edges = result.items.map((dto) => ({
          node: WaypointLogType.from(dto),
          cursor: encodeWaypointLogCursor(dto),
        }));
        return {
          edges,
          pageInfo: {
            hasNextPage: result.hasNextPage,
            endCursor:
              edges.length > 0 ? edges[edges.length - 1].cursor : null,
          },
        };
      },
    },
    WaypointLog: {
      node: async (parent: { nodeId: number }, _: unknown, ctx: GraphQLContext) => {
        const dto = await ctx.nodeLoader.load(parent.nodeId);
        if (!dto) throw new GraphQLError("Node not found", undefined, undefined, undefined, undefined, undefined, { code: "NOT_FOUND" });
        return NodeType.from(dto);
      },
      robot: async (parent: { robotId: number }, _: unknown, ctx: GraphQLContext) => {
        const dto = await ctx.robotLoader.load(parent.robotId);
        if (!dto) throw new GraphQLError("Robot not found", undefined, undefined, undefined, undefined, undefined, { code: "NOT_FOUND" });
        return RobotType.from(dto);
      },
    },
  };
}
