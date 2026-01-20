import { useQuery } from '@tanstack/react-query';
import { robotsApi } from '@/api';
import { QueryKeys } from '@/constants/queryKeys';
import { useApiSettings } from '@/contexts/ApiSettingsContext';
import type { Robot } from '../types';

export const useRobots = () => {
  const { mode } = useApiSettings();

  return useQuery<Robot[]>({
    queryKey: QueryKeys.robot.list(mode),
    queryFn: () => robotsApi.findAll(mode),
  });
};
