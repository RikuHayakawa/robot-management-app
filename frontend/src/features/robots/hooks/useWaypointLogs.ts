import { useQuery } from '@tanstack/react-query';
import { api } from '@/api';
import { QueryKeys } from '@/constants/queryKeys';
import type { components } from '@/api/rest/types';

export type WaypointLogResponse = components['schemas']['WaypointLogResponse'];

export const useWaypointLogs = (robotId: number) => {
  return useQuery<WaypointLogResponse[]>({
    queryKey: QueryKeys.waypointLog.byRobotId(robotId),
    queryFn: async () => {
      return await api.rest.waypointLogsApi.getWaypointLogsByRobotId({ id: robotId });
    },
    enabled: !!robotId,
  });
};
