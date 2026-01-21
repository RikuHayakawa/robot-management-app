import type { GetNodeByIdResultDto } from "../../../application/nodes/dto";

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
