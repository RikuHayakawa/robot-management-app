import type { ApiSchemaPaths } from './types';
import { ApiClient } from './apiClient';

export class WaypointLogsApi {
  constructor(private apiClient: ApiClient) {}

  async getWaypointLogsByRobotId(path: ApiSchemaPaths['/robots/{id}/waypoint-logs']['get']['parameters']['path']) {
    return (
      await this.apiClient.get<
        ApiSchemaPaths['/robots/{id}/waypoint-logs']['get']['responses'][200]['content']['application/json']
      >(`/robots/${path.id}/waypoint-logs`)
    ).data;
  }
}
