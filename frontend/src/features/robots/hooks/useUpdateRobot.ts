import { useMutation, useQueryClient } from '@tanstack/react-query';
import { api } from '@/api';
import { QueryKeys } from '@/constants/queryKeys';
import { useApiSettings } from '@/contexts/ApiSettingsContext';
import type { RobotFormData } from '../types';
import type { RobotResponse } from './useRobot';

function normalizeRobot(r: {
  id: string;
  name: string;
  isActive: boolean;
  createdAt: string;
  updatedAt: string;
}): RobotResponse {
  return {
    id: Number(r.id),
    name: r.name,
    isActive: r.isActive,
    createdAt: r.createdAt,
    updatedAt: r.updatedAt,
  };
}

export const useUpdateRobot = () => {
  const queryClient = useQueryClient();
  const { mode } = useApiSettings();

  return useMutation({
    mutationFn: async ({ id, data }: { id: number; data: Partial<RobotFormData> }) => {
      if (mode === 'rest') {
        return await api.rest.robotsApi.putRobotById(
          { id },
          { name: data.name, isActive: data.isActive },
        );
      }
      const res = await api.graphql.robotsApi.updateRobot(id, {
        name: data.name,
        isActive: data.isActive,
      });
      return normalizeRobot(res.updateRobot);
    },
    onSuccess: (_, variables) => {
      queryClient.invalidateQueries({ queryKey: ['robot', 'list'] });
      queryClient.invalidateQueries({ queryKey: ['robot', 'byId', variables.id] });
    },
  });
};
