import type { PaginatedResult } from "../../../pagination/types";
import { GetRobotByIdResultDto } from "../../dto";

/**
 * Robotクエリサービスインターフェース
 */
export interface IRobotQueryService {
  /**
   * IDでRobotを取得
   */
  findById(id: number): Promise<GetRobotByIdResultDto | null>;

  /**
   * 複数IDでRobotを一括取得（DataLoader用。入力idsの順で (Dto|null)[] を返す）
   */
  findByIds(ids: number[]): Promise<(GetRobotByIdResultDto | null)[]>;

  /**
   * すべてのRobotを取得
   */
  findAll(): Promise<GetRobotByIdResultDto[]>;

  /**
   * カーソルペジネーションでRobot一覧を取得
   */
  findAllPaginated(args: {
    limit: number;
    cursor?: string;
  }): Promise<PaginatedResult<GetRobotByIdResultDto>>;
}
