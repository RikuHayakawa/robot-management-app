import {
  decodeRobotCursor,
  encodeRobotCursor,
} from "../../../application/shared/pagination/cursor";
import type { PaginatedResult } from "../../../application/shared/pagination/types";
import { GetRobotByIdResultDto } from "../../../application/robots/dto";
import { IRobotQueryService } from "../../../application/robots/queries/interfaces/IRobotQueryService";
import type { PrismaClient } from "../../../generated/prisma/client";

const ROBOT_SELECT = {
  id: true,
  name: true,
  isActive: true,
  createdAt: true,
  updatedAt: true,
} as const;

type RobotRow = {
  id: number;
  name: string;
  isActive: boolean;
  createdAt: Date;
  updatedAt: Date;
};

/**
 * Robotクエリサービス実装（Read 専用。Prisma を直接使用し、Repository は呼ばない）
 */
export class RobotQueryService implements IRobotQueryService {
  constructor(private readonly prisma: PrismaClient) {}

  private toDto(row: RobotRow): GetRobotByIdResultDto {
    return new GetRobotByIdResultDto(
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
  public async findById(id: number): Promise<GetRobotByIdResultDto | null> {
    const row = await this.prisma.robot.findUnique({
      where: { id },
      select: ROBOT_SELECT,
    });
    return row ? this.toDto(row) : null;
  }

  /**
   * 複数IDでRobotを一括取得（DataLoader用。入力idsの順で (Dto|null)[] を返す）
   */
  public async findByIds(
    ids: number[]
  ): Promise<(GetRobotByIdResultDto | null)[]> {
    if (ids.length === 0) return [];
    const rows = await this.prisma.robot.findMany({
      where: { id: { in: ids } },
      select: ROBOT_SELECT,
    });
    const map = new Map(rows.map((r) => [r.id, this.toDto(r)]));
    return ids.map((id) => map.get(id) ?? null);
  }

  /**
   * すべてのRobotを取得
   */
  public async findAll(): Promise<GetRobotByIdResultDto[]> {
    const rows = await this.prisma.robot.findMany({
      select: ROBOT_SELECT,
    });
    return rows.map((r) => this.toDto(r));
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
    const rows = await this.prisma.robot.findMany({
      where: after ? { id: { gt: after.id } } : undefined,
      orderBy: { id: "asc" },
      take,
      select: ROBOT_SELECT,
    });
    const hasNextPage = rows.length > args.limit;
    const items = rows.slice(0, args.limit).map((r) => this.toDto(r));
    const nextCursor =
      items.length > 0 ? encodeRobotCursor(items[items.length - 1]) : null;
    return { items, nextCursor, hasNextPage };
  }
}
