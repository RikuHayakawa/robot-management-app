import { useQuery } from '@tanstack/react-query';
import { api } from '@/api';
import { QueryKeys } from '@/constants/queryKeys';
import type { components } from '@/api/rest/types';

export type NodeResponse = components['schemas']['NodeResponse'];

export const useNodes = () => {
  return useQuery<NodeResponse[]>({
    queryKey: QueryKeys.node.list(),
    queryFn: async () => {
      return await api.rest.nodesApi.getNodes();
    },
  });
};
