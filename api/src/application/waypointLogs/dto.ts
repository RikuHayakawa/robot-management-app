/**
 * WaypointLog取得用Result DTO
 */
export class GetWaypointLogsByRobotIdResultDto {
  constructor(
    public readonly id: number,
    public readonly robotId: number,
    public readonly nodeId: number,
    public readonly battery: number,
    public readonly timestamp: Date,
    public readonly createdAt: Date,
    public readonly updatedAt: Date
  ) {}
}
