import { GetNodeByIdResultDto } from "../../dto";

/**
 * Nodeクエリサービスインターフェース
 * CQRS原則に従い、クエリ専用のインターフェース
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
}
