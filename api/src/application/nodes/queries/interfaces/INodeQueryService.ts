import type { PaginatedResult } from "../../../pagination/types";
import { GetNodeByIdResultDto } from "../../dto";

/**
 * Nodeクエリサービスインターフェース
 */
export interface INodeQueryService {
  /**
   * IDでNodeを取得
   */
  findById(id: number): Promise<GetNodeByIdResultDto | null>;

  /**
   * すべてのNodeを取得
   */
  findAll(): Promise<GetNodeByIdResultDto[]>;

  /**
   * カーソルペジネーションでNode一覧を取得
   */
  findAllPaginated(args: {
    limit: number;
    cursor?: string;
  }): Promise<PaginatedResult<GetNodeByIdResultDto>>;
}
