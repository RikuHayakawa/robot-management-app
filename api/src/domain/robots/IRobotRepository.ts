import { Robot } from "./Robot";

export interface IRobotRepository {
  /**
   * IDでRobotを取得
   */
  findById(id: number): Promise<Robot | null>;

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
