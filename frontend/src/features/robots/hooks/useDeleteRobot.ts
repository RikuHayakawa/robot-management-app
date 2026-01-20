import { useMutation, useQueryClient } from '@tanstack/react-query';
import { robotsApi } from '@/api';
import { useApiSettings } from '@/contexts/ApiSettingsContext';

export const useDeleteRobot = () => {
  const queryClient = useQueryClient();
  const { mode } = useApiSettings();

  return useMutation({
    mutationFn: (id: number) => robotsApi.delete(id, mode),
    onSuccess: (_, id) => {
      queryClient.invalidateQueries({ queryKey: ['robot', 'list'] });
      queryClient.invalidateQueries({ queryKey: ['robot', 'byId', id] });
    },
  });
};
