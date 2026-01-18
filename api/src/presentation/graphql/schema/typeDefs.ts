export const typeDefs = `# --- Types ---

type Robot {
  id: ID!
  name: String!
  isActive: Boolean!
  waypointLogs: [WaypointLog!]!
}

type WaypointLog {
  id: ID!
  robotId: ID!
  nodeId: ID!
  battery: Int!
  timestamp: String!
  node: Node!
  robot: Robot!
}

type Node {
  id: ID!
  name: String!
  x: Float!
  y: Float!
}

# --- Queries (Read) ---

type Query {
  robots: [Robot!]!
  robot(id: ID!): Robot
  nodes: [Node!]!
  node(id: ID!): Node
}

# --- Mutations (CRUD: Robotのみ) ---

input CreateRobotInput {
  name: String!
  isActive: Boolean!
}

input UpdateRobotInput {
  name: String
  isActive: Boolean
}

type Mutation {
  createRobot(input: CreateRobotInput!): Robot!
  updateRobot(id: ID!, input: UpdateRobotInput!): Robot!
  deleteRobot(id: ID!): Boolean!
}
`;
