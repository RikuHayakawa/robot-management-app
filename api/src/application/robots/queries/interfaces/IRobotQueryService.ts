import { GetRobotByIdResultDto } from "../../dto";

/**
 * Robotクエリサービスインターフェース
 */
export interface IRobotQueryService {
  /**
   * IDでRobotを取得
   */
  findById(id: number): Promise<GetRobotByIdResultDto | null>;

  /**
   * すべてのRobotを取得
   */
  findAll(): Promise<GetRobotByIdResultDto[]>;
}
