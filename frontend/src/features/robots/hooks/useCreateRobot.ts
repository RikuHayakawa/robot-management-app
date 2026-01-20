import { useMutation, useQueryClient } from '@tanstack/react-query';
import { robotsApi } from '@/api';
import { useApiSettings } from '@/contexts/ApiSettingsContext';
import type { RobotFormData } from '../types';

export const useCreateRobot = () => {
  const queryClient = useQueryClient();
  const { mode } = useApiSettings();

  return useMutation({
    mutationFn: (data: RobotFormData) => robotsApi.create(data, mode),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['robot', 'list'] });
    },
  });
};
