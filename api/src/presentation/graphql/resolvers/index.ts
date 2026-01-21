import { nodeQuery } from "./query/node.query";
import { robotQuery } from "./query/robot.query";
import { robotMutation } from "./mutation/robot.mutation";
import { robotField } from "./field/robot.field";
import { waypointLogField } from "./field/waypointLog.field";

export function createResolvers() {
  return {
    Query: { ...robotQuery, ...nodeQuery },
    Mutation: robotMutation,
    Robot: robotField,
    WaypointLog: waypointLogField,
  };
}
