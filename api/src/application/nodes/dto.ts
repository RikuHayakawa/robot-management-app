/**
 * Node詳細用Result DTO（x, yを除外してオーバーフェッチを解決）
 */
export class GetNodeByIdResultDto {
  constructor(
    public readonly id: number,
    public readonly name: string,
    public readonly x: number,
    public readonly y: number,
  ) {}
}
