import { ApiClient } from './rest/apiClient';
import { RobotsApi } from './rest/robots';
import { WaypointLogsApi } from './rest/waypointLogs';
import { NodesApi } from './rest/nodes';

export * from './rest/types';

const apiClient = ApiClient.getInstance(process.env.NEXT_PUBLIC_API_URL || 'http://localhost:3000');

export const api = {
  rest: {
    client: apiClient,
    robotsApi: new RobotsApi(apiClient),
    waypointLogsApi: new WaypointLogsApi(apiClient),
    nodesApi: new NodesApi(apiClient),
  },
  // 将来的に graphql: { ... } を追加可能
};

export default api;
