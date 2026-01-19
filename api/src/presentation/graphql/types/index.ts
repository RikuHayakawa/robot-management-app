import type { RobotResultDto } from "../../../application/robots/dto";
import type { GetNodeByIdResultDto } from "../../../application/nodes/dto";
import type { GetWaypointLogsByRobotIdResultDto } from "../../../application/waypointLogs/dto";

/**
 * Result DTO → GraphQL Robot 形（id, name, isActive, createdAt, updatedAt。waypointLogs は field resolver）
 */
export const RobotType = {
  from(dto: RobotResultDto): { id: string; name: string; isActive: boolean; createdAt: string; updatedAt: string } {
    return {
      id: String(dto.id),
      name: dto.name,
      isActive: dto.isActive,
      createdAt: dto.createdAt.toISOString(),
      updatedAt: dto.updatedAt.toISOString(),
    };
  },
};

/**
 * Result DTO → GraphQL Node 形
 */
export const NodeType = {
  from(dto: GetNodeByIdResultDto): { id: string; name: string; x: number; y: number } {
    return {
      id: String(dto.id),
      name: dto.name,
      x: dto.x,
      y: dto.y,
    };
  },
};

/**
 * Result DTO → GraphQL WaypointLog 形。node/robot は field resolver。
 * parent.nodeId / parent.robotId を number のまま持たせる。
 */
export const WaypointLogType = {
  from(
    dto: GetWaypointLogsByRobotIdResultDto
  ): { id: string; robotId: number; nodeId: number; battery: number; timestamp: string } {
    return {
      id: String(dto.id),
      robotId: dto.robotId,
      nodeId: dto.nodeId,
      battery: dto.battery,
      timestamp: dto.timestamp.toISOString(),
    };
  },
};
