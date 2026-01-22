import { GraphQLScalarType, Kind } from "graphql";
import { makeExecutableSchema } from "@graphql-tools/schema";
import { typeDefs } from "./schema/typeDefs";
import { nodeQuery } from "./resolvers/query/node.query";
import { robotQuery } from "./resolvers/query/robot.query";
import { robotMutation } from "./resolvers/mutation/robot.mutation";
import { robotField } from "./resolvers/field/robot.field";
import { waypointLogField } from "./resolvers/field/waypointLog.field";

const DateTimeScalar = new GraphQLScalarType({
  name: "DateTime",
  description: "ISO 8601 datetime",
  serialize: (v: unknown) => (v instanceof Date ? v.toISOString() : v),
  parseValue: (v: unknown) => (typeof v === "string" ? new Date(v) : v),
  parseLiteral: (ast) =>
    ast.kind === Kind.STRING ? new Date(ast.value) : null,
});

const resolvers = {
  Query: { ...robotQuery, ...nodeQuery },
  Mutation: robotMutation,
  Robot: robotField,
  WaypointLog: waypointLogField,
  DateTime: DateTimeScalar,
};

export const schema = makeExecutableSchema({
  typeDefs,
  resolvers,
});
