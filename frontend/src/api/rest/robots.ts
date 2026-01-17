import type { ApiSchemaPaths } from './types';
import { ApiClient } from './apiClient';

export class RobotsApi {
  constructor(private apiClient: ApiClient) {}

  async getRobots() {
    return (
      await this.apiClient.get<ApiSchemaPaths['/robots']['get']['responses'][200]['content']['application/json']>(
        '/robots',
      )
    ).data;
  }

  async getRobotById(path: ApiSchemaPaths['/robots/{id}']['get']['parameters']['path']) {
    return (
      await this.apiClient.get<
        ApiSchemaPaths['/robots/{id}']['get']['responses'][200]['content']['application/json']
      >(`/robots/${path.id}`)
    ).data;
  }

  async postRobot(requestBody?: ApiSchemaPaths['/robots']['post']['requestBody']['content']['application/json']) {
    return (
      await this.apiClient.post<ApiSchemaPaths['/robots']['post']['responses'][200]['content']['application/json']>(
        '/robots',
        requestBody,
      )
    ).data;
  }

  async putRobotById(
    path: ApiSchemaPaths['/robots/{id}']['put']['parameters']['path'],
    requestBody?: ApiSchemaPaths['/robots/{id}']['put']['requestBody']['content']['application/json'],
  ) {
    return (
      await this.apiClient.put<
        ApiSchemaPaths['/robots/{id}']['put']['responses'][200]['content']['application/json']
      >(`/robots/${path.id}`, requestBody)
    ).data;
  }

  async deleteRobot(path: ApiSchemaPaths['/robots/{id}']['delete']['parameters']['path']) {
    return (
      await this.apiClient.delete<
        ApiSchemaPaths['/robots/{id}']['delete']['responses'][200]['content']['application/json']
      >(`/robots/${path.id}`)
    ).data;
  }
}
