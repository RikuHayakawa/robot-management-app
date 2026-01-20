import { ApiClient } from './rest/apiClient';
import { WaypointLogsApi } from './rest/waypointLogs';
import { getInstance } from './graphql/client';
import { WaypointLogsGraphQLApi } from './graphql/waypointLogs';
import type { ApiMode, WaypointLog } from './types';

const restApi = new WaypointLogsApi(
  ApiClient.getInstance(process.env.NEXT_PUBLIC_API_URL),
);
const gqlApi = new WaypointLogsGraphQLApi(getInstance());

export const waypointLogsApi = {
  async findByRobotId(robotId: number, mode: ApiMode): Promise<WaypointLog[]> {
    if (mode === 'rest') {
      const data = await restApi.getWaypointLogsByRobotId({ id: robotId });
      return data.items;
    }
    const conn = await gqlApi.getWaypointLogsByRobotId(robotId);
    if (!conn) return [];
    return (conn?.edges ?? []).map(({ node }) => ({
      id: Number(node.id),
      robotId: Number(node.robotId),
      nodeId: Number(node.nodeId),
      battery: node.battery,
      timestamp: node.timestamp,
    }));
  },
};
