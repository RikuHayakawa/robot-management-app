import { GetNodeByIdResultDto } from "../../../application/nodes/dto";
import { NodeResponse } from "../schema/nodes";

/**
 * Application層のDTOからNodeResponseに変換
 */
export function toNodeResponse(dto: GetNodeByIdResultDto): NodeResponse {
  return {
    id: dto.id,
    name: dto.name,
    x: dto.x,
    y: dto.y,
  };
}
