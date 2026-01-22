import { clampLimit, DEFAULT_LIMIT } from "../../shared";
import type { PaginationInput, PaginatedResult } from "../../shared";
import { GetRobotByIdResultDto } from "../dto";
import { IRobotQueryService } from "./interfaces/IRobotQueryService";

/**
 * Robot一覧取得Service
 */
export class GetAllRobotsService {
  constructor(private robotQueryService: IRobotQueryService) {}

  /**
   * カーソルペジネーションでRobot一覧を取得
   */
  public async invoke(
    input?: PaginationInput
  ): Promise<PaginatedResult<GetRobotByIdResultDto>> {
    const limit = clampLimit(input?.limit ?? DEFAULT_LIMIT);
    const cursor = input?.cursor;
    return this.robotQueryService.findAllPaginated({ limit, cursor });
  }
}
