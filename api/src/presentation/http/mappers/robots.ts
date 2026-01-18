import {
  CreateRobotInputDto,
  CreateRobotResultDto,
  UpdateRobotInputDto,
  UpdateRobotResultDto,
  GetRobotByIdResultDto,
} from "../../../application/robots/dto";
import {
  RobotResponse,
  RobotCreateRequest,
  RobotUpdateRequest,
} from "../schema/robots";

/**
 * Application層のDTOからRobotResponseに変換
 */
export function toRobotResponse(
  dto: GetRobotByIdResultDto | CreateRobotResultDto | UpdateRobotResultDto
): RobotResponse {
  return {
    id: dto.id,
    name: dto.name,
    isActive: dto.isActive,
  };
}

/**
 * RobotCreateRequestからApplication層のCreateRobotInputDtoに変換
 */
export function toRobotCreateRequest(
  request: RobotCreateRequest
): CreateRobotInputDto {
  return new CreateRobotInputDto(request.name, request.isActive);
}

/**
 * RobotUpdateRequestからApplication層のUpdateRobotInputDtoに変換
 */
export function toRobotUpdateRequest(
  id: number,
  request: RobotUpdateRequest
): UpdateRobotInputDto {
  return new UpdateRobotInputDto(id, request.name, request.isActive);
}
