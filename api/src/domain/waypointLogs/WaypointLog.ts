export class WaypointLog {
  constructor(
    public readonly id: number,
    public readonly robotId: number,
    public readonly nodeId: number,
    public readonly battery: number,
    public readonly timestamp: Date,
    public readonly createdAt: Date,
    public readonly updatedAt: Date
  ) {
    this.validate();
  }

  /**
   * バリデーション
   */
  private validate(): void {
    if (this.battery < 0 || this.battery > 100) {
      throw new Error("Battery level must be between 0 and 100");
    }
  }
}
