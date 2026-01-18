import { GraphQLError } from "graphql";
import { CreateRobotInputDto } from "../../../application/robots/dto";
import { UpdateRobotInputDto } from "../../../application/robots/dto";
import type { GraphQLContext } from "../context";
import { RobotType, NodeType, WaypointLogType } from "../types";

export function createResolvers() {
  return {
    Query: {
      robots: async (_: unknown, __: unknown, ctx: GraphQLContext) => {
        const dtos = await ctx.getAllRobotsService.invoke();
        return dtos.map((dto) => RobotType.from(dto));
      },
      robot: async (_: unknown, args: { id: string }, ctx: GraphQLContext) => {
        const id = parseInt(args.id, 10);
        if (Number.isNaN(id)) return null;
        const dto = await ctx.getRobotByIdService.invoke(id);
        if (!dto) return null;
        return RobotType.from(dto);
      },
      nodes: async (_: unknown, __: unknown, ctx: GraphQLContext) => {
        const dtos = await ctx.getAllNodesService.invoke();
        return dtos.map((dto) => NodeType.from(dto));
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
      waypointLogs: async (parent: { id: string }, _: unknown, ctx: GraphQLContext) => {
        const robotId = parseInt(parent.id, 10);
        const dtos = await ctx.getWaypointLogsByRobotIdService.invoke(robotId);
        return dtos.map((dto) => WaypointLogType.from(dto));
      },
    },
    WaypointLog: {
      node: async (parent: { nodeId: number }, _: unknown, ctx: GraphQLContext) => {
        const dto = await ctx.getNodeByIdService.invoke(parent.nodeId);
        if (!dto) throw new GraphQLError("Node not found", undefined, undefined, undefined, undefined, undefined, { code: "NOT_FOUND" });
        return NodeType.from(dto);
      },
      robot: async (parent: { robotId: number }, _: unknown, ctx: GraphQLContext) => {
        const dto = await ctx.getRobotByIdService.invoke(parent.robotId);
        if (!dto) throw new GraphQLError("Robot not found", undefined, undefined, undefined, undefined, undefined, { code: "NOT_FOUND" });
        return RobotType.from(dto);
      },
    },
  };
}
