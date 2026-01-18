export class Node {
  constructor(
    public readonly id: number,
    public readonly name: string,
    public readonly x: number,
    public readonly y: number
  ) {
    this.validate();
  }

  /**
   * バリデーション
   */
  private validate(): void {
    if (!this.name || this.name.trim().length === 0) {
      throw new Error("Node name cannot be empty");
    }
  }
}
