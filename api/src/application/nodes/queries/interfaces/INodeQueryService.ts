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
}
