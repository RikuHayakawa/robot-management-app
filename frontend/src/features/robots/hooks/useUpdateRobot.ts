import { useMutation, useQueryClient } from '@tanstack/react-query';
import { api } from '@/api';
import { QueryKeys } from '@/constants/queryKeys';
import type { RobotFormData } from '../types';

export const useUpdateRobot = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: async ({ id, data }: { id: number; data: Partial<RobotFormData> }) => {
      return await api.rest.robotsApi.putRobotById(
        { id },
        {
          name: data.name,
          isActive: data.isActive,
        },
      );
    },
    onSuccess: (_, variables) => {
      // ロボット一覧と個別のロボットのクエリキャッシュを無効化
      queryClient.invalidateQueries({ queryKey: QueryKeys.robot.list() });
      queryClient.invalidateQueries({ queryKey: QueryKeys.robot.byId(variables.id) });
    },
  });
};
