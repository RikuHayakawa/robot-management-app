/**
 * Node取得用レスポンス
 */
export interface NodeResponse {
  /**
   * Node ID
   */
  id: number;

  /**
   * Node name
   */
  name: string;

  /**
   * Node X座標
   */
  x: number;

  /**
   * Node Y座標
   */
  y: number;
}

/**
 * Application層のDTOからNodeResponseに変換
 */
export function toNodeResponse(dto: {
  id: number;
  name: string;
  x: number;
  y: number;
}): NodeResponse {
  return {
    id: dto.id,
    name: dto.name,
    x: dto.x,
    y: dto.y,
  };
}
