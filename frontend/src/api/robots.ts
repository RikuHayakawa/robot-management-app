import { ApiClient } from './rest/apiClient';
import { RobotsApi } from './rest/robots';
import { getInstance } from './graphql/client';
import { RobotsGraphQLApi } from './graphql/robots';
import type { ApiMode, Robot, RobotCreateInput, RobotUpdateInput } from './types';

const restApi = new RobotsApi(
  ApiClient.getInstance(process.env.NEXT_PUBLIC_API_URL),
);
const gqlApi = new RobotsGraphQLApi(getInstance());

function mapGqlRobot(r: { id: string; name: string; isActive: boolean; createdAt: string; updatedAt: string }): Robot {
  return {
    id: Number(r.id),
    name: r.name,
    isActive: r.isActive,
    createdAt: r.createdAt,
    updatedAt: r.updatedAt,
  };
}

export const robotsApi = {
  async findAll(mode: ApiMode): Promise<Robot[]> {
    if (mode === 'rest') {
      const data = await restApi.getRobots();
      return data.items;
    }
    const data = await gqlApi.getRobots();
    return (data?.robots?.edges ?? []).map(({ node }) => mapGqlRobot(node));
  },

  async findById(id: number, mode: ApiMode): Promise<Robot> {
    if (mode === 'rest') {
      return await restApi.getRobotById({ id });
    }
    const data = await gqlApi.getRobot(id);
    if (!data.robot) throw new Error('Not found');
    return mapGqlRobot(data.robot);
  },

  async create(data: RobotCreateInput, mode: ApiMode): Promise<Robot> {
    if (mode === 'rest') {
      return await restApi.postRobot({ name: data.name, isActive: data.isActive });
    }
    const res = await gqlApi.createRobot({ name: data.name, isActive: data.isActive });
    return mapGqlRobot(res.createRobot);
  },

  async update(id: number, data: RobotUpdateInput, mode: ApiMode): Promise<Robot> {
    if (mode === 'rest') {
      return await restApi.putRobotById({ id }, { name: data.name, isActive: data.isActive });
    }
    const res = await gqlApi.updateRobot(id, { name: data.name, isActive: data.isActive });
    return mapGqlRobot(res.updateRobot);
  },

  async delete(id: number, mode: ApiMode): Promise<void> {
    if (mode === 'rest') {
      await restApi.deleteRobot({ id });
      return;
    }
    await gqlApi.deleteRobot(id);
  },
};
