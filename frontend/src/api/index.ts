import { getInstance } from './graphql/client';
import { NodesGraphQLApi } from './graphql/nodes';
import { RobotsGraphQLApi } from './graphql/robots';
import { WaypointLogsGraphQLApi } from './graphql/waypointLogs';
import { ApiClient } from './rest/apiClient';
import { NodesApi } from './rest/nodes';
import { RobotsApi } from './rest/robots';
import { WaypointLogsApi } from './rest/waypointLogs';

export * from './rest/types';

const apiClient = ApiClient.getInstance(process.env.NEXT_PUBLIC_API_URL || 'http://localhost:3000');
const graphqlClient = getInstance();

export const api = {
  rest: {
    client: apiClient,
    robotsApi: new RobotsApi(apiClient),
    waypointLogsApi: new WaypointLogsApi(apiClient),
    nodesApi: new NodesApi(apiClient),
  },
  graphql: {
    client: graphqlClient,
    robotsApi: new RobotsGraphQLApi(graphqlClient),
    nodesApi: new NodesGraphQLApi(graphqlClient),
    waypointLogsApi: new WaypointLogsGraphQLApi(graphqlClient),
  },
};

export default api;
