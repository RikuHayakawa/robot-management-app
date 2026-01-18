import { clampLimit, DEFAULT_LIMIT } from "../../pagination/types";
import type { PaginationInput } from "../../pagination/types";
import type { PaginatedResult } from "../../pagination/types";
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
