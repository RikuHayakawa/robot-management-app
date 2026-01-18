import { WaypointLog } from "./WaypointLog";

/**
 * WaypointLogリポジトリインターフェース
 * Domain層に定義し、永続化技術を意識しない
 */
export interface IWaypointLogRepository {
  /**
   * Robot IDでWaypointLogを取得
   */
  findByRobotId(robotId: number): Promise<WaypointLog[]>;
}
