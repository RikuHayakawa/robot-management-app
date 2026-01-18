import { IWaypointLogQueryService } from "./interfaces/IWaypointLogQueryService";
import { GetWaypointLogsByRobotIdResultDto } from "../dto";

/**
 * WaypointLog取得Service（Robot IDで取得）
 */
export class GetWaypointLogsByRobotIdService {
  constructor(
    private waypointLogQueryService: IWaypointLogQueryService
  ) {}

  /**
   * Robot IDでWaypointLogを取得
   */
  public async invoke(
    robotId: number
  ): Promise<GetWaypointLogsByRobotIdResultDto[]> {
    return await this.waypointLogQueryService.findByRobotId(robotId);
  }
}
