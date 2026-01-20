import { ApiClient } from './rest/apiClient';
import { NodesApi } from './rest/nodes';
import { getInstance } from './graphql/client';
import { NodesGraphQLApi } from './graphql/nodes';
import type { ApiMode, Node } from './types';

const restApi = new NodesApi(
  ApiClient.getInstance(process.env.NEXT_PUBLIC_API_URL),
);
const gqlApi = new NodesGraphQLApi(getInstance());

export const nodesApi = {
  async findAll(
    mode: ApiMode,
    opts?: { limit?: number; cursor?: string },
  ): Promise<Node[]> {
    const limit = opts?.limit ?? 100;
    const cursor = opts?.cursor ?? '';

    if (mode === 'rest') {
      const data = await restApi.getNodes({ limit, cursor });
      return data.items;
    }
    const variables = { limit, ...(cursor ? { after: cursor } : {}) };
    const data = await gqlApi.getNodes(variables);
    return (data?.nodes?.edges ?? []).map(({ node }) => ({
      id: Number(node.id),
      name: node.name,
      position: { x: node.position.x, y: node.position.y },
    }));
  },
};
