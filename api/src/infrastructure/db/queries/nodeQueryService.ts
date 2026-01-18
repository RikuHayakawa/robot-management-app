import prisma from "../clients";
import { INodeQueryService } from "../../../application/nodes/queries/interfaces/INodeQueryService";
import { GetNodeByIdResultDto } from "../../../application/nodes/dto";



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
}

// シングルトンインスタンスをエクスポート
export const nodeQueryService = new NodeQueryService();
