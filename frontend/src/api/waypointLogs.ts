import { ApiClient } from './rest/apiClient';
import { NodesApi } from './rest/nodes';
import { WaypointLogsApi } from './rest/waypointLogs';
import { getInstance } from './graphql/client';
import { WaypointLogsGraphQLApi } from './graphql/waypointLogs';
import type { ApiMode, Node, WaypointLogWithNode } from './types';

const apiClient = ApiClient.getInstance(process.env.NEXT_PUBLIC_API_URL);
const restWaypointLogsApi = new WaypointLogsApi(apiClient);
const restNodesApi = new NodesApi(apiClient);
const gqlApi = new WaypointLogsGraphQLApi(getInstance());

export const waypointLogsApi = {
  async findByRobotId(robotId: number, mode: ApiMode): Promise<WaypointLogWithNode[]> {
    if (mode === 'rest') {
      const data = await restWaypointLogsApi.getWaypointLogsByRobotId({ id: robotId });
      const nodeIds = [...new Set(data.items.map((i) => i.nodeId))];
      const nodeResults = await Promise.all(
        nodeIds.map((id) => restNodesApi.getNodeById({ id })),
      );
      const nodeMap = new Map<number, Node>();
      nodeResults.forEach((n) => nodeMap.set(n.id, n));

      return data.items.map((item) => {
        const node = nodeMap.get(item.nodeId);
        if (!node) throw new Error(`Node not found: ${item.nodeId}`);
        return {
          id: item.id,
          robotId: item.robotId,
          nodeId: item.nodeId,
          battery: item.battery,
          timestamp: item.timestamp,
          node,
        };
      });
    }

    const conn = await gqlApi.getWaypointLogsByRobotId(robotId);
    if (!conn) return [];
    return (conn?.edges ?? []).map(({ node: n }) => {
      const node: Node = {
        id: Number(n.node.id),
        name: n.node.name,
        position: { x: n.node.position.x, y: n.node.position.y },
      };
      return {
        id: Number(n.id),
        robotId: Number(n.robotId),
        nodeId: Number(n.nodeId),
        battery: n.battery,
        timestamp: n.timestamp,
        node,
      };
    });
  },
};
