import { clampLimit, DEFAULT_LIMIT } from "../../pagination/types";
import type { PaginationInput } from "../../pagination/types";
import type { PaginatedResult } from "../../pagination/types";
import { GetNodeByIdResultDto } from "../dto";
import { INodeQueryService } from "./interfaces/INodeQueryService";

/**
 * Node一覧取得Service
 */
export class GetAllNodesService {
  constructor(private nodeQueryService: INodeQueryService) {}

  /**
   * カーソルペジネーションでNode一覧を取得
   */
  public async invoke(
    input?: PaginationInput
  ): Promise<PaginatedResult<GetNodeByIdResultDto>> {
    const limit = clampLimit(input?.limit ?? DEFAULT_LIMIT);
    const cursor = input?.cursor;
    return this.nodeQueryService.findAllPaginated({ limit, cursor });
  }
}
