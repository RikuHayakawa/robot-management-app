import type { RobotResultDto } from "../../../application/robots/dto";
import type { GetNodeByIdResultDto } from "../../../application/nodes/dto";
import type { GetWaypointLogsByRobotIdResultDto } from "../../../application/waypointLogs/dto";

/**
 * Result DTO → GraphQL Robot 形（id, name, isActive, createdAt, updatedAt。waypointLogs は field resolver）
 * createdAt / updatedAt は Date のまま返し、DateTime スカラーが ISO 文字列に serialize する。
 */
export const RobotType = {
  from(dto: RobotResultDto): { id: string; name: string; isActive: boolean; createdAt: Date; updatedAt: Date } {
    return {
      id: String(dto.id),
      name: dto.name,
      isActive: dto.isActive,
      createdAt: dto.createdAt,
      updatedAt: dto.updatedAt,
    };
  },
};

/**
 * Result DTO → GraphQL Node 形（position に x, y を格納）
 */
export const NodeType = {
  from(dto: GetNodeByIdResultDto): { id: string; name: string; position: { x: number; y: number } } {
    return {
      id: String(dto.id),
      name: dto.name,
      position: { x: dto.x, y: dto.y },
    };
  },
};

/**
 * Result DTO → GraphQL WaypointLog 形。node/robot は field resolver。
 * parent.nodeId / parent.robotId を number のまま持たせる。
 * timestamp は Date のまま返し、DateTime スカラーが ISO 文字列に serialize する。
 */
export const WaypointLogType = {
  from(
    dto: GetWaypointLogsByRobotIdResultDto
  ): { id: string; robotId: number; nodeId: number; battery: number; timestamp: Date } {
    return {
      id: String(dto.id),
      robotId: dto.robotId,
      nodeId: dto.nodeId,
      battery: dto.battery,
      timestamp: dto.timestamp,
    };
  },
};
