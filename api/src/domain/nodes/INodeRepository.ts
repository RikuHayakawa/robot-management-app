import { Node } from "./Node";

/**
 * Nodeリポジトリインターフェース
 * Domain層に定義し、永続化技術を意識しない
 */
export interface INodeRepository {
  /**
   * IDでNodeを取得
   */
  findById(id: number): Promise<Node | null>;

  /**
   * すべてのNodeを取得
   */
  findAll(): Promise<Node[]>;
}
