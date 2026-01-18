import { useQuery } from '@tanstack/react-query';
import { api } from '@/api';
import { QueryKeys } from '@/constants/queryKeys';
import { useApiSettings } from '@/contexts/ApiSettingsContext';
import type { ApiSchemaComponents } from '@/api/rest/types';

export type WaypointLogResponse =
  ApiSchemaComponents['schemas']['WaypointLogResponse'];

export const useWaypointLogs = (robotId: number) => {
  const { mode } = useApiSettings();

  return useQuery<WaypointLogResponse[]>({
    queryKey: QueryKeys.waypointLog.byRobotId(robotId, mode),
    queryFn: async () => {
      if (mode === 'rest') {
        const data =
          await api.rest.waypointLogsApi.getWaypointLogsByRobotId({ id: robotId });
        return data.items;
      }
      const conn =
        await api.graphql.waypointLogsApi.getWaypointLogsByRobotId(robotId);
      if (!conn) return [];
      return conn.edges.map((e) => e.node).map((n) => ({
        id: Number(n.id),
        robotId: Number(n.robotId),
        nodeId: Number(n.nodeId),
        battery: n.battery,
        timestamp: n.timestamp,
      }));
    },
    enabled: !!robotId,
  });
};
