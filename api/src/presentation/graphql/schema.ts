import { GraphQLScalarType, Kind } from "graphql";
import { makeExecutableSchema } from "@graphql-tools/schema";
import { typeDefs } from "./schema/typeDefs";
import { createResolvers } from "./resolvers";

const DateTimeScalar = new GraphQLScalarType({
  name: "DateTime",
  description: "ISO 8601 datetime",
  serialize: (v: unknown) => (v instanceof Date ? v.toISOString() : v),
  parseValue: (v: unknown) => (typeof v === "string" ? new Date(v) : v),
  parseLiteral: (ast) =>
    ast.kind === Kind.STRING ? new Date(ast.value) : null,
});

const resolvers = {
  ...createResolvers(),
  DateTime: DateTimeScalar,
};

export const schema = makeExecutableSchema({
  typeDefs,
  resolvers,
});
