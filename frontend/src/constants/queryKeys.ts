import type { ApiMode } from '@/api';

export const QueryKeys = {
  robot: (() => {
    const key = 'robot';
    return {
      baseList: () => [key, 'list'] as const,
      list: (mode: ApiMode) => [key, 'list', mode] as const,
      byId: (id: number, mode: ApiMode) => [key, 'byId', id, mode] as const,
    };
  })(),
  node: (() => {
    const key = 'node';
    return {
      baseList: () => [key, 'list'] as const,
      list: (mode: ApiMode) => [key, 'list', mode] as const,
      byId: (id: number, mode: ApiMode) => [key, 'byId', id, mode] as const,
    };
  })(),
  waypointLog: (() => {
    const key = 'waypointLog';
    return {
      baseList: () => [key, 'list'] as const,
      list: (mode: ApiMode) => [key, 'list', mode] as const,
      byId: (id: number, mode: ApiMode) => [key, 'byId', id, mode] as const,
      byRobotId: (robotId: number, mode: ApiMode) =>
        [key, 'byRobotId', robotId, mode] as const,
    };
  })(),
};
