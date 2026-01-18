import { useQuery } from '@tanstack/react-query';
import { api } from '@/api';
import { QueryKeys } from '@/constants/queryKeys';
import type { ApiSchemaComponents } from '@/api/rest/types';

export type RobotResponse = ApiSchemaComponents['schemas']['RobotResponse'];

export const useRobot = (id: number) => {
  return useQuery<RobotResponse>({
    queryKey: QueryKeys.robot.byId(id),
    queryFn: async () => {
      return await api.rest.robotsApi.getRobotById({ id });
    },
    enabled: !!id,
  });
};
