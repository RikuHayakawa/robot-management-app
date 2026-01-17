import { useMutation, useQueryClient } from '@tanstack/react-query';
import { api } from '@/api';
import { QueryKeys } from '@/constants/queryKeys';
import type { RobotFormData } from '../types';

export const useCreateRobot = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: async (data: RobotFormData) => {
      return await api.rest.robotsApi.postRobot({
        name: data.name,
        isActive: data.isActive,
      });
    },
    onSuccess: () => {
      // ロボット一覧のクエリキャッシュを無効化
      queryClient.invalidateQueries({ queryKey: QueryKeys.robot.list() });
    },
  });
};
