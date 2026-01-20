import { useQuery } from '@tanstack/react-query';
import { waypointLogsApi, type WaypointLogWithNode } from '@/api';
import { QueryKeys } from '@/constants/queryKeys';
import { useApiSettings } from '@/contexts/ApiSettingsContext';

export const useWaypointLogs = (robotId: number) => {
  const { mode } = useApiSettings();

  return useQuery<WaypointLogWithNode[]>({
    queryKey: QueryKeys.waypointLog.byRobotId(robotId, mode),
    queryFn: () => waypointLogsApi.findByRobotId(robotId, mode),
    enabled: !!robotId,
  });
};
