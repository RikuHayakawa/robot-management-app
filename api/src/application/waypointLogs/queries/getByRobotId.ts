import { clampLimit, DEFAULT_LIMIT } from "../../pagination/types";
import type { PaginationInput } from "../../pagination/types";
import type { PaginatedResult } from "../../pagination/types";
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
