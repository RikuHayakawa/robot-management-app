import { useQuery } from '@tanstack/react-query';
import { api } from '@/api';
import { QueryKeys } from '@/constants/queryKeys';
import { useApiSettings } from '@/contexts/ApiSettingsContext';
import type { ApiSchemaComponents } from '@/api/rest/types';

export type RobotResponse = ApiSchemaComponents['schemas']['RobotResponse'];

export const useRobot = (id: number) => {
  const { mode } = useApiSettings();

  return useQuery<RobotResponse>({
    queryKey: QueryKeys.robot.byId(id, mode),
    queryFn: async () => {
      if (mode === 'rest') {
        return await api.rest.robotsApi.getRobotById({ id });
      }
      const data = await api.graphql.robotsApi.getRobot(id);
      if (!data.robot) throw new Error('Not found');
      const r = data.robot;
      return {
        id: Number(r.id),
        name: r.name,
        isActive: r.isActive,
        createdAt: r.createdAt,
        updatedAt: r.updatedAt,
      };
    },
    enabled: !!id,
  });
};
