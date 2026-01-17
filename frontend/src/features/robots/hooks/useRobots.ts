import { useQuery } from '@tanstack/react-query';
import { api } from '@/api';
import { QueryKeys } from '@/constants/queryKeys';
import type { RobotWithDates } from '../types';

export const useRobots = () => {
  return useQuery<RobotWithDates[]>({
    queryKey: QueryKeys.robot.list(),
    queryFn: async () => {
      const robots = await api.rest.robotsApi.getRobots();
      // APIレスポンスにcreatedAt/updatedAtがないため、モックデータを追加
      return robots.map((robot) => ({
        ...robot,
        createdAt: new Date(Date.now() - Math.random() * 7 * 24 * 60 * 60 * 1000).toISOString(),
        updatedAt: new Date(Date.now() - Math.random() * 24 * 60 * 60 * 1000).toISOString(),
      }));
    },
  });
};
