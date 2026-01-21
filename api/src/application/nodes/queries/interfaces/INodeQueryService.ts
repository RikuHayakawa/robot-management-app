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
   * 複数IDでNodeを一括取得（DataLoader用。入力idsの順で (Dto|null)[] を返す）
   */
  findByIds(ids: number[]): Promise<(GetNodeByIdResultDto | null)[]>;

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
