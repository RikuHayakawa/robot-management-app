import {
  CreateRobotInputDto,
  CreateRobotResultDto,
  UpdateRobotInputDto,
  UpdateRobotResultDto,
  GetRobotByIdResultDto,
} from "../../../application/robots/dto";

/**
 * Robot取得用レスポンス
 */
export interface RobotResponse {
  /**
   * Robot ID
   */
  id: number;

  /**
   * Robot name
   */
  name: string;

  /**
   * Robot is active
   */
  isActive: boolean;
}

/**
 * Robot作成用リクエスト
 */
export interface RobotCreateRequest {
  /**
   * Robot name
   */
  name: string;

  /**
   * Robot is active
   */
  isActive: boolean;
}

/**
 * Robot更新用リクエスト
 */
export interface RobotUpdateRequest {
  /**
   * Robot name (optional)
   */
  name?: string;

  /**
   * Robot is active (optional)
   */
  isActive?: boolean;
}

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
  return new CreateRobotInputDto(
    request.name,
    request.isActive
  );
}

/**
 * RobotUpdateRequestからApplication層のUpdateRobotInputDtoに変換
 */
export function toRobotUpdateRequest(
  id: number,
  request: RobotUpdateRequest
): UpdateRobotInputDto {
  return new UpdateRobotInputDto(
    id,
    request.name,
    request.isActive
  );
}
