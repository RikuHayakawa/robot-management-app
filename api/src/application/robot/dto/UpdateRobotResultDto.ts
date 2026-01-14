/**
 * Robot更新用Result DTO
 */
export class UpdateRobotResultDto {
  constructor(
    public readonly id: number,
    public readonly name: string,
    public readonly status: "idle" | "moving",
    public readonly currentNodeId: number | null
  ) {}
}
