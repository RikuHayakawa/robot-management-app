export class Robot {
  constructor(
    public readonly id: number,
    public readonly name: string,
    public readonly isActive: boolean
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
  }
}
