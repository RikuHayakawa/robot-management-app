import {
  decodeRobotCursor,
  encodeRobotCursor,
} from "../../../application/pagination/cursor";
import type { PaginatedResult } from "../../../application/pagination/types";
import { GetRobotByIdResultDto } from "../../../application/robots/dto";
import { IRobotQueryService } from "../../../application/robots/queries/interfaces/IRobotQueryService";
import prisma from "../clients";
import { robotRepository } from "../repositories/robotRepository";

/**
 * Robotクエリサービス実装
 */
export class RobotQueryService implements IRobotQueryService {
  /**
   * IDでRobotを取得
   */
  public async findById(id: number): Promise<GetRobotByIdResultDto | null> {
    const robot = await robotRepository.findById(id);
    if (!robot) {
      return null;
    }
    return new GetRobotByIdResultDto(
      robot.id,
      robot.name,
      robot.isActive,
      robot.createdAt!,
      robot.updatedAt!
    );
  }

  /**
   * 複数IDでRobotを一括取得（DataLoader用。入力idsの順で (Dto|null)[] を返す）
   */
  public async findByIds(
    ids: number[]
  ): Promise<(GetRobotByIdResultDto | null)[]> {
    const robots = await robotRepository.findByIds(ids);
    return robots.map((r) =>
      r
        ? new GetRobotByIdResultDto(
            r.id,
            r.name,
            r.isActive,
            r.createdAt!,
            r.updatedAt!
          )
        : null
    );
  }

  /**
   * すべてのRobotを取得
   */
  public async findAll(): Promise<GetRobotByIdResultDto[]> {
    const robots = await robotRepository.findAll();
    return robots.map(
      (robot) =>
        new GetRobotByIdResultDto(
          robot.id,
          robot.name,
          robot.isActive,
          robot.createdAt!,
          robot.updatedAt!
        )
    );
  }

  /**
   * カーソルペジネーションでRobot一覧を取得
   */
  public async findAllPaginated(args: {
    limit: number;
    cursor?: string;
  }): Promise<PaginatedResult<GetRobotByIdResultDto>> {
    const after = args.cursor ? decodeRobotCursor(args.cursor) : null;
    const take = args.limit + 1;
    const rows = await prisma.robot.findMany({
      where: after ? { id: { gt: after.id } } : undefined,
      orderBy: { id: "asc" },
      take,
      select: {
        id: true,
        name: true,
        isActive: true,
        createdAt: true,
        updatedAt: true,
      },
    });
    const hasNextPage = rows.length > args.limit;
    const items = rows.slice(0, args.limit).map(
      (r) =>
        new GetRobotByIdResultDto(
          r.id,
          r.name,
          r.isActive,
          r.createdAt,
          r.updatedAt
        )
    );
    const nextCursor =
      items.length > 0 ? encodeRobotCursor(items[items.length - 1]) : null;
    return { items, nextCursor, hasNextPage };
  }
}

export const robotQueryService = new RobotQueryService();
