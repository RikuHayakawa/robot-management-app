import { GraphQLError } from "graphql";
import { CreateRobotInputDto, UpdateRobotInputDto } from "../../../../application/robots/dto";
import type { GraphQLContext } from "../../context";
import { RobotType } from "../../types";

export const robotMutation = {
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
    if (Number.isNaN(id))
      throw new GraphQLError("Invalid id", undefined, undefined, undefined, undefined, undefined, {
        code: "BAD_USER_INPUT",
      });
    const input = new UpdateRobotInputDto(id, args.input.name, args.input.isActive);
    try {
      const dto = await ctx.updateRobotService.invoke(input);
      return RobotType.from(dto);
    } catch (e) {
      if (e instanceof Error && e.message === "Robot not found") {
        throw new GraphQLError(
          "Robot not found",
          undefined,
          undefined,
          undefined,
          undefined,
          undefined,
          { code: "NOT_FOUND" }
        );
      }
      throw e;
    }
  },
  deleteRobot: async (_: unknown, args: { id: string }, ctx: GraphQLContext) => {
    const id = parseInt(args.id, 10);
    if (Number.isNaN(id))
      throw new GraphQLError("Invalid id", undefined, undefined, undefined, undefined, undefined, {
        code: "BAD_USER_INPUT",
      });
    try {
      await ctx.deleteRobotService.invoke(id);
      return true;
    } catch (e) {
      if (e instanceof Error && e.message === "Robot not found") {
        throw new GraphQLError(
          "Robot not found",
          undefined,
          undefined,
          undefined,
          undefined,
          undefined,
          { code: "NOT_FOUND" }
        );
      }
      throw e;
    }
  },
};
