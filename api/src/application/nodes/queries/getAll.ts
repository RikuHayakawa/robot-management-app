import { INodeRepository } from "../../../domain/nodes/INodeRepository";
import { GetNodeByIdResultDto } from "../dto";

/**
 * Node一覧取得Service
 */
export class GetAllNodesService {
  constructor(private nodeRepository: INodeRepository) {}

  /**
   * すべてのNodeを取得（x, yを除外）
   */
  public async invoke(): Promise<GetNodeByIdResultDto[]> {
    const nodes = await this.nodeRepository.findAll();
    return nodes.map((node) => new GetNodeByIdResultDto(node.id, node.name, node.x, node.y));
  }
}
