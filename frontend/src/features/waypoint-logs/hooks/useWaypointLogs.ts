import { useQuery, useQueryClient } from '@tanstack/react-query';
import { waypointLogsApi, type WaypointLogWithNode } from '@/api';
import { QueryKeys } from '@/constants/queryKeys';
import { useApiSettings } from '@/contexts/ApiSettingsContext';

export const useWaypointLogs = (robotId: number) => {
  const { mode, isModeReady } = useApiSettings();
  const queryClient = useQueryClient();

  return useQuery<WaypointLogWithNode[]>({
    queryKey: QueryKeys.waypointLog.byRobotId(robotId, mode),
    queryFn: () => {
      queryClient.setQueryData(QueryKeys.waypointLog.byRobotId(robotId, mode), []);
      return waypointLogsApi.findByRobotId(robotId, mode, {
        onRow: (w) => {
          queryClient.setQueryData(
            QueryKeys.waypointLog.byRobotId(robotId, mode),
            (prev: WaypointLogWithNode[] | undefined) => [...(prev ?? []), w],
          );
        },
      });
    },
    enabled: !!robotId && isModeReady,
  });
};
