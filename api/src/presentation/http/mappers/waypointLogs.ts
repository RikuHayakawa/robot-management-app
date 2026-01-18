import { GetWaypointLogsByRobotIdResultDto } from "../../../application/waypointLogs/dto";
import { WaypointLogResponse } from "../schema/waypointLogs";

/**
 * Application層のDTOからWaypointLogResponseに変換
 */
export function toWaypointLogResponse(
  dto: GetWaypointLogsByRobotIdResultDto
): WaypointLogResponse {
  return {
    id: dto.id,
    robotId: dto.robotId,
    nodeId: dto.nodeId,
    battery: dto.battery,
    timestamp: dto.timestamp,
    createdAt: dto.createdAt,
    updatedAt: dto.updatedAt,
  };
}
