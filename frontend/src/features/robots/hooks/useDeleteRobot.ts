import { useMutation, useQueryClient } from '@tanstack/react-query';
import { api } from '@/api';
import { useApiSettings } from '@/contexts/ApiSettingsContext';

export const useDeleteRobot = () => {
  const queryClient = useQueryClient();
  const { mode } = useApiSettings();

  return useMutation({
    mutationFn: async (id: number) => {
      if (mode === 'rest') {
        await api.rest.robotsApi.deleteRobot({ id });
        return;
      }
      await api.graphql.robotsApi.deleteRobot(id);
    },
    onSuccess: (_, id) => {
      queryClient.invalidateQueries({ queryKey: ['robot', 'list'] });
      queryClient.invalidateQueries({ queryKey: ['robot', 'byId', id] });
    },
  });
};
