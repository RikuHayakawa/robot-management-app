import { useQuery } from '@tanstack/react-query';
import { robotsApi } from '@/api';
import { QueryKeys } from '@/constants/queryKeys';
import { useApiSettings } from '@/contexts/ApiSettingsContext';
import type { Robot } from '../types';

export const useRobot = (id: number) => {
  const { mode, isModeReady } = useApiSettings();

  return useQuery<Robot>({
    queryKey: QueryKeys.robot.byId(id, mode),
    queryFn: () => robotsApi.findById(id, mode),
    enabled: !!id && isModeReady,
  });
};
