/**
 * Robot取得用レスポンス
 */
export interface RobotResponse {
  /**
   * Robot ID
   */
  id: number;

  /**
   * Robot name
   */
  name: string;

  /**
   * Robot is active
   */
  isActive: boolean;
}

/**
 * Robot作成用リクエスト
 */
export interface RobotCreateRequest {
  /**
   * Robot name
   */
  name: string;

  /**
   * Robot is active
   */
  isActive: boolean;
}

/**
 * Robot更新用リクエスト
 */
export interface RobotUpdateRequest {
  /**
   * Robot name (optional)
   */
  name?: string;

  /**
   * Robot is active (optional)
   */
  isActive?: boolean;
}
