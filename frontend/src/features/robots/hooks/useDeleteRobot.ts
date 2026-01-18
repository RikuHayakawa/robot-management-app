import { useMutation, useQueryClient } from '@tanstack/react-query';
import { api } from '@/api';
import { QueryKeys } from '@/constants/queryKeys';

export const useDeleteRobot = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: async (id: number) => {
      return await api.rest.robotsApi.deleteRobot({ id });
    },
    onSuccess: (_, id) => {
      // ロボット一覧と個別のロボットのクエリキャッシュを無効化
      queryClient.invalidateQueries({ queryKey: QueryKeys.robot.list() });
      queryClient.invalidateQueries({ queryKey: QueryKeys.robot.byId(id) });
    },
  });
};
