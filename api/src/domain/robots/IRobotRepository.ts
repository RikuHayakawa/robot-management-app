import { Robot } from "./Robot";

/**
 * Robotリポジトリインターフェース
 * Domain層に定義し、永続化技術を意識しない
 */
export interface IRobotRepository {
  /**
   * IDでRobotを取得
   */
  findById(id: number): Promise<Robot | null>;

  /**
   * すべてのRobotを取得
   */
  findAll(): Promise<Robot[]>;

  /**
   * Robotを作成
   */
  create(robot: Robot): Promise<Robot>;

  /**
   * Robotを更新
   */
  update(robot: Robot): Promise<Robot>;

  /**
   * Robotを削除
   */
  delete(id: number): Promise<void>;
}
