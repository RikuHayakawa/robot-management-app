import { readFileSync } from 'fs';
import { join } from 'path';

const base = __dirname;

const schemaPaths: string[] = [
  join(base, 'schema.graphql'),
  join(base, 'scalar', 'datetime.graphql'),
  join(base, 'common', 'pageInfo.graphql'),
  join(base, 'common', 'position.graphql'),
  join(base, 'robot', 'robot.type.graphql'),
  join(base, 'robot', 'robot.connection.graphql'),
  join(base, 'robot', 'robot.input.graphql'),
  join(base, 'node', 'node.type.graphql'),
  join(base, 'node', 'node.connection.graphql'),
  join(base, 'waypointLog', 'waypointLog.type.graphql'),
  join(base, 'waypointLog', 'waypointLog.connection.graphql'),
  join(base, 'query', 'query.graphql'),
  join(base, 'robot', 'robot.mutation.graphql'),
];

export const typeDefs = schemaPaths.map((p) => readFileSync(p, 'utf-8'));
