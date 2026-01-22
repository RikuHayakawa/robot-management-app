import type { PaginatedResult } from "../../../shared";
import { GetWaypointLogsByRobotIdResultDto } from "../../dto";

/**
 * WaypointLogクエリサービスインターフェース
 */
export interface IWaypointLogQueryService {
  /**
   * Robot IDでWaypointLogを取得（Node情報を含む）
   */
  findByRobotId(robotId: number): Promise<GetWaypointLogsByRobotIdResultDto[]>;

  /**
   * Robot IDでWaypointLogをカーソルペジネーションで取得
   */
  findByRobotIdPaginated(
    robotId: number,
    args: { limit: number; cursor?: string }
  ): Promise<PaginatedResult<GetWaypointLogsByRobotIdResultDto>>;
}
