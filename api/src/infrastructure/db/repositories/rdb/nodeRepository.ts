import prisma from "../../clients";
import { INodeRepository } from "../../../../domain/nodes/INodeRepository";
import { Node } from "../../../../domain/nodes/Node";
import { NodeGetPayload } from "../../../../generated/prisma/models/Node";

/**
 * Prismaのselect結果の型を取得
 */
type NodeSelectResult = NodeGetPayload<{
  select: {
    id: true;
    name: true;
    x: true;
    y: true;
  };
}>;

/**
 * Nodeリポジトリ実装（RDB用）
 * DomainのINodeRepositoryを実装し、Prismaを使用してデータベースアクセスを行う
 */
export class NodeRepository implements INodeRepository {
  /**
   * DB rowからNodeエンティティに変換
   */
  private toDomain(row: NodeSelectResult): Node {
    return new Node(row.id, row.name, row.x, row.y);
  }

  /**
   * すべてのNodeを取得
   */
  public async findAll(): Promise<Node[]> {
    const nodes = await prisma.node.findMany({
      select: {
        id: true,
        name: true,
        x: true,
        y: true,
      },
    });
    return nodes.map((n) => this.toDomain(n));
  }

  /**
   * IDでNodeを取得
   */
  public async findById(id: number): Promise<Node | null> {
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
    return this.toDomain(node);
  }
}

// シングルトンインスタンスをエクスポート
export const nodeRepository = new NodeRepository();
