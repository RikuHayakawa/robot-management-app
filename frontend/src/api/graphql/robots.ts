import type { GraphQLClient } from 'graphql-request';
import {
  CreateRobotDocument,
  CreateRobotMutation,
  CreateRobotMutationVariables,
  DeleteRobotDocument,
  DeleteRobotMutation,
  DeleteRobotMutationVariables,
  RobotDocument,
  RobotQuery,
  RobotQueryVariables,
  RobotsDocument,
  RobotsQuery,
  RobotsQueryVariables,
  UpdateRobotDocument,
  UpdateRobotMutation,
  UpdateRobotMutationVariables,
} from './generated';
import type { CreateRobotInput, UpdateRobotInput } from './generated';

export class RobotsGraphQLApi {
  constructor(private client: GraphQLClient) {}

  async getRobots(variables?: RobotsQueryVariables): Promise<RobotsQuery> {
    return this.client.request<RobotsQuery, RobotsQueryVariables>(RobotsDocument, variables ?? {});
  }

  async getRobot(id: string | number): Promise<RobotQuery> {
    return this.client.request<RobotQuery, RobotQueryVariables>(RobotDocument, { id: String(id) });
  }

  async createRobot(input: CreateRobotInput): Promise<CreateRobotMutation> {
    return this.client.request<CreateRobotMutation, CreateRobotMutationVariables>(
      CreateRobotDocument,
      { input },
    );
  }

  async updateRobot(
    id: string | number,
    input: UpdateRobotInput,
  ): Promise<UpdateRobotMutation> {
    return this.client.request<UpdateRobotMutation, UpdateRobotMutationVariables>(
      UpdateRobotDocument,
      { id: String(id), input },
    );
  }

  async deleteRobot(id: string | number): Promise<DeleteRobotMutation> {
    return this.client.request<DeleteRobotMutation, DeleteRobotMutationVariables>(
      DeleteRobotDocument,
      { id: String(id) },
    );
  }
}
