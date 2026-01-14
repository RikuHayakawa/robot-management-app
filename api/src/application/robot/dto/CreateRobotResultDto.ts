/**
 * Robot作成用Result DTO
 */
export class CreateRobotResultDto {
  constructor(
    public readonly id: number,
    public readonly name: string,
    public readonly status: "idle" | "moving",
    public readonly currentNodeId: number | null
  ) {}
}
