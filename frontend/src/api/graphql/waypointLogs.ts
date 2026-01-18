import type { GraphQLClient } from 'graphql-request';
import {
  WaypointLogsByRobotIdDocument,
  WaypointLogsByRobotIdQuery,
  WaypointLogsByRobotIdQueryVariables,
} from './generated';

type WaypointLogsResult = NonNullable<
  WaypointLogsByRobotIdQuery['robot']
>['waypointLogs'];

export class WaypointLogsGraphQLApi {
  constructor(private client: GraphQLClient) {}

  async getWaypointLogsByRobotId(
    robotId: string | number,
    variables?: Omit<WaypointLogsByRobotIdQueryVariables, 'id'>,
  ): Promise<WaypointLogsResult | null> {
    const result = await this.client.request<
      WaypointLogsByRobotIdQuery,
      WaypointLogsByRobotIdQueryVariables
    >(WaypointLogsByRobotIdDocument, { id: String(robotId), ...variables });
    return result.robot?.waypointLogs ?? null;
  }
}
