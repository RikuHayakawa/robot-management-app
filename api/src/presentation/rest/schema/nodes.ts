/**
 * 座標（Node の地理情報）
 */
export interface Position {
  x: number;
  y: number;
}

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
   * 座標（x, y）
   */
  position: Position;
}
