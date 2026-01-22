import type { PrismaClient } from "../../../generated/prisma/client";
import { IRobotRepository } from "../../../domain/robots/IRobotRepository";
import { Robot } from "../../../domain/robots/Robot";
import { RobotGetPayload } from "../../../generated/prisma/models/Robot";

/**
 * Prismaのselect結果の型を取得
 */
type RobotSelectResult = RobotGetPayload<{
  select: {
    id: true;
    name: true;
    isActive: true;
    createdAt: true;
    updatedAt: true;
  };
}>;

/**
 * Robotリポジトリ実装（RDB用）
 * DomainのIRobotRepositoryを実装し、Prismaを使用してデータベースアクセスを行う
 */
export class RobotRepository implements IRobotRepository {
  constructor(private readonly prisma: PrismaClient) {}

  /**
   * DB rowからRobotエンティティに変換
   */
  private toDomain(row: RobotSelectResult): Robot {
    return new Robot(
      row.id,
      row.name,
      row.isActive,
      row.createdAt,
      row.updatedAt
    );
  }

  /**
   * IDでRobotを取得
   */
  public async findById(id: number): Promise<Robot | null> {
    const robot = await this.prisma.robot.findUnique({
      where: { id },
      select: {
        id: true,
        name: true,
        isActive: true,
        createdAt: true,
        updatedAt: true,
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
    const created = await this.prisma.robot.create({
      data: {
        name: robot.name,
        isActive: robot.isActive,
      },
      select: {
        id: true,
        name: true,
        isActive: true,
        createdAt: true,
        updatedAt: true,
      },
    });
    return this.toDomain(created);
  }

  /**
   * Robotを更新
   */
  public async update(robot: Robot): Promise<Robot> {
    const updated = await this.prisma.robot.update({
      where: { id: robot.id },
      data: {
        name: robot.name,
        isActive: robot.isActive,
      },
      select: {
        id: true,
        name: true,
        isActive: true,
        createdAt: true,
        updatedAt: true,
      },
    });
    return this.toDomain(updated);
  }

  /**
   * Robotを削除
   */
  public async delete(id: number): Promise<void> {
    await this.prisma.robot.delete({
      where: { id },
    });
  }
}
