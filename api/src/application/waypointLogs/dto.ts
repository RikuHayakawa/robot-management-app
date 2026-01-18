/**
 * WaypointLog取得用Result DTO（Node情報を含めてアンダーフェッチを解決）
 */
export class GetWaypointLogsByRobotIdResultDto {
  constructor(
    public readonly id: number,
    public readonly robotId: number,
    public readonly nodeId: number,
    public readonly nodeName: string, // アンダーフェッチ解決のため追加
    public readonly battery: number,
    public readonly timestamp: Date,
    public readonly createdAt: Date,
    public readonly updatedAt: Date
  ) {}
}
