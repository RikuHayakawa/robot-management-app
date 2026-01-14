/**
 * Robot詳細用Result DTO（共通）
 */
export class GetRobotByIdResultDto {
  constructor(
    public readonly id: number,
    public readonly name: string,
    public readonly status: "idle" | "moving",
    public readonly currentNodeId: number | null
  ) {}
}
