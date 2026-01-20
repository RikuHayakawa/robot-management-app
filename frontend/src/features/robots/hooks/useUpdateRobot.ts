import { useMutation, useQueryClient } from '@tanstack/react-query';
import { robotsApi } from '@/api';
import { useApiSettings } from '@/contexts/ApiSettingsContext';
import type { RobotFormData } from '../types';

export const useUpdateRobot = () => {
  const queryClient = useQueryClient();
  const { mode } = useApiSettings();

  return useMutation({
    mutationFn: ({ id, data }: { id: number; data: Partial<RobotFormData> }) =>
      robotsApi.update(id, data, mode),
    onSuccess: (_, variables) => {
      queryClient.invalidateQueries({ queryKey: ['robot', 'list'] });
      queryClient.invalidateQueries({ queryKey: ['robot', 'byId', variables.id] });
    },
  });
};
