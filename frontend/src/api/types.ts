export type ApiMode = 'rest' | 'graphql';

// id は UI 側で number に統一（REST に合わせ、GraphQL の string は Adapter で変換）
export interface Robot {
  id: number;
  name: string;
  isActive: boolean;
  createdAt: string;
  updatedAt: string;
}

export interface Node {
  id: number;
  name: string;
  x: number;
  y: number;
}

export interface WaypointLog {
  id: number;
  robotId: number;
  nodeId: number;
  battery: number;
  timestamp: string;
}

// Adapter の create/update 用（Feature の RobotFormData と同形）
export interface RobotCreateInput {
  name: string;
  isActive: boolean;
}
export type RobotUpdateInput = Partial<RobotCreateInput>;
