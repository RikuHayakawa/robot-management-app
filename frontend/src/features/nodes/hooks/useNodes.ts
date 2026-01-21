import { useQuery } from '@tanstack/react-query';
import { nodesApi, type Node } from '@/api';
import { QueryKeys } from '@/constants/queryKeys';
import { useApiSettings } from '@/contexts/ApiSettingsContext';

export const useNodes = () => {
  const { mode, isModeReady } = useApiSettings();

  return useQuery<Node[]>({
    queryKey: QueryKeys.node.list(mode),
    queryFn: () => nodesApi.findAll(mode, { limit: 100, cursor: '' }),
    enabled: isModeReady,
  });
};
