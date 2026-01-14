export class Robot {
  constructor(
    public readonly id: number,
    public readonly name: string,
    private _status: "idle" | "moving",
    public readonly currentNodeId: number | null
  ) {
    this.validate();
  }

  /**
   * バリデーション
   */
  private validate(): void {
    if (!this.name || this.name.trim().length === 0) {
      throw new Error("Robot name cannot be empty");
    }
    if (this._status !== "idle" && this._status !== "moving") {
      throw new Error("Robot status must be 'idle' or 'moving'");
    }
  }

  /**
   * ステータスを取得
   */
  public get status(): "idle" | "moving" {
    return this._status;
  }

  /**
   * 移動を開始する
   */
  public startMoving(targetNodeId: number | null): void {
    if (this._status === "moving") {
      throw new Error("Robot is already moving");
    }
    if (targetNodeId !== null && targetNodeId <= 0) {
      throw new Error("Target node ID must be positive");
    }
    this._status = "moving";
  }

  /**
   * 移動を停止する
   */
  public stopMoving(): void {
    if (this._status === "idle") {
      throw new Error("Robot is already idle");
    }
    this._status = "idle";
  }

  /**
   * 移動中かどうかを判定
   */
  public isMoving(): boolean {
    return this._status === "moving";
  }

  /**
   * アイドル状態かどうかを判定
   */
  public isIdle(): boolean {
    return this._status === "idle";
  }

  /**
   * 移動可能かどうかを判定
   */
  public canMove(): boolean {
    return this._status === "idle";
  }
}
