import { clampLimit, DEFAULT_LIMIT } from "../../shared";
import type { PaginationInput, PaginatedResult } from "../../shared";
import { GetWaypointLogsByRobotIdResultDto } from "../dto";
import { IWaypointLogQueryService } from "./interfaces/IWaypointLogQueryService";

/**
 * WaypointLog取得Service（Robot IDで取得）
 */
export class GetWaypointLogsByRobotIdService {
  constructor(
    private waypointLogQueryService: IWaypointLogQueryService
  ) {}

  /**
   * Robot IDでWaypointLogをカーソルペジネーションで取得
   */
  public async invoke(
    robotId: number,
    input?: PaginationInput
  ): Promise<PaginatedResult<GetWaypointLogsByRobotIdResultDto>> {
    const limit = clampLimit(input?.limit ?? DEFAULT_LIMIT);
    const cursor = input?.cursor;
    return this.waypointLogQueryService.findByRobotIdPaginated(robotId, {
      limit,
      cursor,
    });
  }
}
