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
  /**
   * Robot ID
   */
  public id!: number;

  /**
   * Robot name
   */
  public name!: string;

  /**
   * Robot status
   */
  public status!: "idle" | "moving";

  /**
   * Current node ID
   */
  public currentNodeId!: number | null;

  constructor(
    id: number,
    name: string,
    status: "idle" | "moving",
    currentNodeId: number | null
  ) {
    this.id = id;
    this.name = name;
    this.status = status;
    this.currentNodeId = currentNodeId;
  }

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
