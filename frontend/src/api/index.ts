import { ApiClient } from './rest/apiClient';
import { RobotsApi } from './rest/robots';

export * from './rest/types';

const apiClient = ApiClient.getInstance(process.env.NEXT_PUBLIC_API_URL || 'http://localhost:8001');

export const api = {
  rest: {
    client: apiClient,
    robotsApi: new RobotsApi(apiClient),
  },
  // 将来的に graphql: { ... } を追加可能
};

export default api;
