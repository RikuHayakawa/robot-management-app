/**
 * WaypointLog取得用レスポンス
 * アンダーフェッチを解決するため、Node情報（id, name）を含む
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

/**
 * Application層のDTOからWaypointLogResponseに変換
 */
export function toWaypointLogResponse(dto: {
  id: number;
  robotId: number;
  nodeId: number;
  battery: number;
  timestamp: Date;
  createdAt: Date;
  updatedAt: Date;
}): WaypointLogResponse {
  return {
    id: dto.id,
    robotId: dto.robotId,
    nodeId: dto.nodeId,
    battery: dto.battery,
    timestamp: dto.timestamp,
    createdAt: dto.createdAt,
    updatedAt: dto.updatedAt,
  };
}
