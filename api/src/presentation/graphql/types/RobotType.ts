import type { RobotResultDto } from "../../../application/robots/dto";

/**
 * Result DTO waypointLogs は field resolverで取得
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
