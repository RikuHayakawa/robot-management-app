/**
 * WaypointLog取得用レスポンス
 */
export interface WaypointLogResponse {
  /**
   * WaypointLog ID
   */
  id: number;

  /**
   * Robot ID
   */
  robotId: number;

  /**
   * Node ID
   */
  nodeId: number;

  /**
   * Battery level
   */
  battery: number;

  /**
   * Timestamp
   */
  timestamp: Date;

  /**
   * Created at
   */
  createdAt: Date;

  /**
   * Updated at
   */
  updatedAt: Date;
}
