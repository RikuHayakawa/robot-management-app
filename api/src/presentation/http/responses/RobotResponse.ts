import {
  CreateRobotResultDto,
  UpdateRobotResultDto,
  GetRobotByIdResultDto,
} from "../../../application/robot/dto";
/**
 * REST API用Robot Response
 * Application層のResult DTOから変換
 */
export class RobotResponse {
  constructor(
    public readonly id: number,
    public readonly name: string,
    public readonly status: "idle" | "moving",
    public readonly currentNodeId: number | null
  ) {}

  /**
   * CreateRobotResultDtoから変換
   */
  static fromCreateResult(dto: CreateRobotResultDto): RobotResponse {
    return new RobotResponse(dto.id, dto.name, dto.status, dto.currentNodeId);
  }

  /**
   * UpdateRobotResultDtoから変換
   */
  static fromUpdateResult(dto: UpdateRobotResultDto): RobotResponse {
    return new RobotResponse(dto.id, dto.name, dto.status, dto.currentNodeId);
  }

  /**
   * GetRobotByIdResultDtoから変換
   */
  static fromQueryResult(dto: GetRobotByIdResultDto): RobotResponse {
    return new RobotResponse(dto.id, dto.name, dto.status, dto.currentNodeId);
  }
}
