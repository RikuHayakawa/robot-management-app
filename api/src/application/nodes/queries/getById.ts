import { INodeRepository } from "../../../domain/nodes/INodeRepository";
import { GetNodeByIdResultDto } from "../dto";

/**
 * Node詳細取得Service
 */
export class GetNodeByIdService {
  constructor(private nodeRepository: INodeRepository) {}

  /**
   * IDでNodeを取得（x, yを除外）
   */
  public async invoke(id: number): Promise<GetNodeByIdResultDto | null> {
    const node = await this.nodeRepository.findById(id);
    if (!node) {
      return null;
    }
    return new GetNodeByIdResultDto(node.id, node.name);
  }
}
