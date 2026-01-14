import prisma from "./sqlite";
import { IRobotRepository } from "../../domain/robot/IRobotRepository";
import { Robot } from "../../domain/robot/Robot";

/**
 * Robotリポジトリ実装
 * DomainのIRobotRepositoryを実装し、Prismaを使用してデータベースアクセスを行う
 */
export class RobotRepository implements IRobotRepository {
  /**
   * DB rowからRobotエンティティに変換
   */
  private toDomain(
    row: {
      id: number;
      name: string;
      status: string;
      currentNodeId: number | null;
    }
  ): Robot {
    return new Robot(
      row.id,
      row.name,
      row.status as "idle" | "moving",
      row.currentNodeId
    );
  }

  /**
   * すべてのRobotを取得
   */
  public async findAll(): Promise<Robot[]> {
    const robots = await prisma.robot.findMany({
      select: {
        id: true,
        name: true,
        status: true,
        currentNodeId: true,
      },
    });
    return robots.map((r) => this.toDomain(r));
  }

  /**
   * IDでRobotを取得
   */
  public async findById(id: number): Promise<Robot | null> {
    const robot = await prisma.robot.findUnique({
      where: { id },
      select: {
        id: true,
        name: true,
        status: true,
        currentNodeId: true,
      },
    });
    if (!robot) {
      return null;
    }
    return this.toDomain(robot);
  }

  /**
   * Robotを作成
   */
  public async create(robot: Robot): Promise<Robot> {
    const created = await prisma.robot.create({
      data: {
        name: robot.name,
        status: robot.status,
        currentNodeId: robot.currentNodeId,
      },
      select: {
        id: true,
        name: true,
        status: true,
        currentNodeId: true,
      },
    });
    return this.toDomain(created);
  }

  /**
   * Robotを更新
   */
  public async update(robot: Robot): Promise<Robot> {
    const updated = await prisma.robot.update({
      where: { id: robot.id },
      data: {
        name: robot.name,
        status: robot.status,
        currentNodeId: robot.currentNodeId,
      },
      select: {
        id: true,
        name: true,
        status: true,
        currentNodeId: true,
      },
    });
    return this.toDomain(updated);
  }

  /**
   * Robotを削除
   */
  public async delete(id: number): Promise<void> {
    await prisma.robot.delete({
      where: { id },
    });
  }
}

// シングルトンインスタンスをエクスポート
export const robotRepository = new RobotRepository();
