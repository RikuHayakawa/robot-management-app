import type { GetWaypointLogsByRobotIdResultDto } from "../../../application/waypointLogs/dto";

/**
 * Result DTO node/robot は field resolverで取得
 */
export const WaypointLogType = {
  from(
    dto: GetWaypointLogsByRobotIdResultDto
  ): { id: string; robotId: number; nodeId: number; battery: number; reachedAt: Date } {
    return {
      id: String(dto.id),
      robotId: dto.robotId,
      nodeId: dto.nodeId,
      battery: dto.battery,
      reachedAt: dto.reachedAt,
    };
  },
};
