/**
 * Robot更新用REST API Request型
 * Application層のUpdateRobotInputDtoとは分離
 */
export class UpdateRobotRequest {
  /**
   * Robot name (optional)
   */
  public name?: string;

  /**
   * Robot status (optional)
   */
  public status?: "idle" | "moving";

  /**
   * Current node ID (optional)
   */
  public currentNodeId?: number | null;
}
