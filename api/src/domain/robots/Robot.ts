export class Robot {
  constructor(
    public readonly id: number,
    public readonly name: string,
    public readonly isActive: boolean,
    public readonly createdAt?: Date,
    public readonly updatedAt?: Date
  ) {
    this.validate();
  }

  /**
   * バリデーション
   */
  private validate(): void {
    if (!this.name || this.name.trim().length === 0) {
      throw new Error("ロボット名は必須です");
    }
  }
}
