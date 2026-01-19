import { useQuery } from '@tanstack/react-query';
import { api } from '@/api';
import { QueryKeys } from '@/constants/queryKeys';
import { useApiSettings } from '@/contexts/ApiSettingsContext';
import type { Robot } from '../types';

export const useRobots = () => {
  const { mode } = useApiSettings();

  return useQuery<Robot[]>({
    queryKey: QueryKeys.robot.list(mode),
    queryFn: async () => {
      if (mode === 'rest') {
        const data = await api.rest.robotsApi.getRobots();
        return data.items;
      }
      const data = await api.graphql.robotsApi.getRobots();
      return data.robots.edges.map((e) => e.node).map((n) => ({
        id: Number(n.id),
        name: n.name,
        isActive: n.isActive,
        createdAt: n.createdAt,
        updatedAt: n.updatedAt,
      }));
    },
  });
};
