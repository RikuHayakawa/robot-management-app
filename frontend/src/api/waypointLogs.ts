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
  async findByRobotId(
    robotId: number,
    mode: ApiMode,
    opts?: { onRow?: (w: WaypointLogWithNode) => void },
  ): Promise<WaypointLogWithNode[]> {
    if (mode === 'rest') {
      const data = await restWaypointLogsApi.getWaypointLogsByRobotId({ id: robotId });
      const result: WaypointLogWithNode[] = [];
      for (const item of data.items) {
        const nodeRes = await restNodesApi.getNodeById({ id: item.nodeId });
        const node: Node = {
          id: nodeRes.id,
          name: nodeRes.name,
          position: { x: nodeRes.position.x, y: nodeRes.position.y },
        };
        const merged: WaypointLogWithNode = {
          id: item.id,
          robotId: item.robotId,
          nodeId: item.nodeId,
          battery: item.battery,
          reachedAt: item.reachedAt,
          node,
        };
        result.push(merged);
        opts?.onRow?.(merged);
      }
      return result;
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
        reachedAt: n.reachedAt,
        node,
      };
    });
  },
};
