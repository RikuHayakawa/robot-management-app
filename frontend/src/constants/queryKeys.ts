export const QueryKeys = {
  robot: (() => {
    const key = 'robot';
    return {
      baseList: () => [key, 'list'] as const,
      list: () => [key, 'list'] as const,
      byId: (id: number) => [key, 'byId', id] as const,
    };
  })(),
  node: (() => {
    const key = 'node';
    return {
      baseList: () => [key, 'list'] as const,
      list: () => [key, 'list'] as const,
      byId: (id: number) => [key, 'byId', id] as const,
    };
  })(),
  waypointLog: (() => {
    const key = 'waypointLog';
    return {
      baseList: () => [key, 'list'] as const,
      list: () => [key, 'list'] as const,
      byId: (id: number) => [key, 'byId', id] as const,
      byRobotId: (robotId: number) => [key, 'byRobotId', robotId] as const,
    };
  })(),
};
