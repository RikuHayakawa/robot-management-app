import { useQuery } from '@tanstack/react-query';
import { api } from '@/api';
import { QueryKeys } from '@/constants/queryKeys';
import { useApiSettings } from '@/contexts/ApiSettingsContext';
import type { ApiSchemaComponents } from '@/api/rest/types';

export type NodeResponse = ApiSchemaComponents['schemas']['NodeResponse'];

export const useNodes = () => {
  const { mode } = useApiSettings();

  return useQuery<NodeResponse[]>({
    queryKey: QueryKeys.node.list(mode),
    queryFn: async () => {
      if (mode === 'rest') {
        const data = await api.rest.nodesApi.getNodes();
        return data.items;
      }
      const data = await api.graphql.nodesApi.getNodes();
      return data.nodes.edges.map((e) => e.node).map((n) => ({
        id: Number(n.id),
        name: n.name,
        x: n.x,
        y: n.y,
      }));
    },
  });
};
