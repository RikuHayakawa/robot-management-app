import { IWaypointLogRepository } from "../../../domain/waypointLogs/IWaypointLogRepository";
import { INodeRepository } from "../../../domain/nodes/INodeRepository";
import { GetWaypointLogsByRobotIdResultDto } from "../dto";

/**
 * WaypointLog取得Service（Robot IDで取得、Node情報を含む）
 */
export class GetWaypointLogsByRobotIdService {
  constructor(
    private waypointLogRepository: IWaypointLogRepository,
    private nodeRepository: INodeRepository
  ) {}

  /**
   * Robot IDでWaypointLogを取得（Node情報を含めてアンダーフェッチを解決）
   */
  public async invoke(
    robotId: number
  ): Promise<GetWaypointLogsByRobotIdResultDto[]> {
    const waypointLogs = await this.waypointLogRepository.findByRobotId(
      robotId
    );

    // 各WaypointLogに対してNode情報を取得
    const result = await Promise.all(
      waypointLogs.map(async (log) => {
        const node = await this.nodeRepository.findById(log.nodeId);
        if (!node) {
          throw new Error(`Node with id ${log.nodeId} not found`);
        }
        return new GetWaypointLogsByRobotIdResultDto(
          log.id,
          log.robotId,
          log.nodeId,
          node.name, // Node情報を含める
          log.battery,
          log.timestamp,
          log.createdAt,
          log.updatedAt
        );
      })
    );

    return result;
  }
}
