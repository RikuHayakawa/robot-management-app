/**
 * Robot作成用REST API Request型
 * Application層のCreateRobotInputDtoとは分離
 */
export class CreateRobotRequest {
  /**
   * Robot name
   */
  public name!: string;

  /**
   * Robot status
   */
  public status!: "idle" | "moving";

  /**
   * Current node ID (optional)
   */
  public currentNodeId?: number | null;
}
