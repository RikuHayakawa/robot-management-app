import { useQuery } from '@tanstack/react-query';
import { api } from '@/api';
import { QueryKeys } from '@/constants/queryKeys';
import type { Robot } from '../types';

export const useRobots = () => {
  return useQuery<Robot[]>({
    queryKey: QueryKeys.robot.list(),
    queryFn: async () => {
      const robots = await api.rest.robotsApi.getRobots();
      return robots;
    },
  });
};
