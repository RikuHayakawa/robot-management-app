import {
  decodeNodeCursor,
  encodeNodeCursor,
} from "../../../application/pagination/cursor";
import type { PaginatedResult } from "../../../application/pagination/types";
import { GetNodeByIdResultDto } from "../../../application/nodes/dto";
import { INodeQueryService } from "../../../application/nodes/queries/interfaces/INodeQueryService";
import prisma from "../clients";

/**
 * Nodeクエリサービス実装
 * Prismaを直接使用してDTOを返す（Domainエンティティを経由しない）
 */
export class NodeQueryService implements INodeQueryService {
  /**
   * IDでNodeを取得
   */
  public async findById(
    id: number
  ): Promise<GetNodeByIdResultDto | null> {
    const node = await prisma.node.findUnique({
      where: { id },
      select: {
        id: true,
        name: true,
        x: true,
        y: true,
      },
    });

    if (!node) {
      return null;
    }

    return new GetNodeByIdResultDto(node.id, node.name, node.x, node.y);
  }

  /**
   * 複数IDでNodeを一括取得（DataLoader用。入力idsの順で (Dto|null)[] を返す）
   */
  public async findByIds(
    ids: number[]
  ): Promise<(GetNodeByIdResultDto | null)[]> {
    if (ids.length === 0) return [];
    const rows = await prisma.node.findMany({
      where: { id: { in: ids } },
      select: { id: true, name: true, x: true, y: true },
    });
    const map = new Map(
      rows.map((r) => [
        r.id,
        new GetNodeByIdResultDto(r.id, r.name, r.x, r.y),
      ])
    );
    return ids.map((id) => map.get(id) ?? null);
  }

  /**
   * すべてのNodeを取得
   */
  public async findAll(): Promise<GetNodeByIdResultDto[]> {
    const nodes = await prisma.node.findMany({
      select: {
        id: true,
        name: true,
        x: true,
        y: true,
      },
    });

    return nodes.map(
      (node: { id: number; name: string; x: number; y: number }) =>
        new GetNodeByIdResultDto(node.id, node.name, node.x, node.y)
    );
  }

  /**
   * カーソルペジネーションでNode一覧を取得
   */
  public async findAllPaginated(args: {
    limit: number;
    cursor?: string;
  }): Promise<PaginatedResult<GetNodeByIdResultDto>> {
    const after = args.cursor ? decodeNodeCursor(args.cursor) : null;
    const take = args.limit + 1;
    const rows = await prisma.node.findMany({
      where: after ? { id: { gt: after.id } } : undefined,
      orderBy: { id: "asc" },
      take,
      select: { id: true, name: true, x: true, y: true },
    });
    const hasNextPage = rows.length > args.limit;
    const items = rows.slice(0, args.limit).map(
      (r) => new GetNodeByIdResultDto(r.id, r.name, r.x, r.y)
    );
    const nextCursor =
      items.length > 0 ? encodeNodeCursor(items[items.length - 1]) : null;
    return { items, nextCursor, hasNextPage };
  }
}

// シングルトンインスタンスをエクスポート
export const nodeQueryService = new NodeQueryService();
