import { GetWaypointLogsByRobotIdResultDto } from "../../dto";

/**
 * WaypointLogクエリサービスインターフェース
 */
export interface IWaypointLogQueryService {
  /**
   * Robot IDでWaypointLogを取得（Node情報を含む）
   */
  findByRobotId(robotId: number): Promise<GetWaypointLogsByRobotIdResultDto[]>;
}
