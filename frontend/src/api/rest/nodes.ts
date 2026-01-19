import type { ApiSchemaPaths } from './types';
import { ApiClient } from './apiClient';

export class NodesApi {
  constructor(private apiClient: ApiClient) {}

  async getNodes(
    params: ApiSchemaPaths['/nodes']['get']['parameters']['query']
  ) {
    return (
      await this.apiClient.get<ApiSchemaPaths['/nodes']['get']['responses'][200]['content']['application/json']>(
        '/nodes',
        { params },
      )
    ).data;
  }

  async getNodeById(path: ApiSchemaPaths['/nodes/{id}']['get']['parameters']['path']) {
    return (
      await this.apiClient.get<
        ApiSchemaPaths['/nodes/{id}']['get']['responses'][200]['content']['application/json']
      >(`/nodes/${path.id}`)
    ).data;
  }
}
