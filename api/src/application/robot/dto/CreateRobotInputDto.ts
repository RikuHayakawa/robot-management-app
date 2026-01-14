/**
 * Robot作成用Input DTO
 */
export class CreateRobotInputDto {
  constructor(
    public readonly name: string,
    public readonly status: "idle" | "moving",
    public readonly currentNodeId: number | null
  ) {}
}
