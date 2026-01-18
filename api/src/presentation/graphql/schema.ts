import { makeExecutableSchema } from "@graphql-tools/schema";
import { typeDefs } from "./schema/typeDefs";
import { createResolvers } from "./resolvers";

const resolvers = createResolvers();

export const schema = makeExecutableSchema({
  typeDefs,
  resolvers,
});
