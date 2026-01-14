/**
 * Robot更新用Input DTO
 */
export class UpdateRobotInputDto {
  constructor(
    public readonly id: number,
    public readonly name?: string,
    public readonly status?: "idle" | "moving",
    public readonly currentNodeId?: number | null
  ) {}
}
