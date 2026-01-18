import { INodeQueryService } from "./interfaces/INodeQueryService";
import { GetNodeByIdResultDto } from "../dto";

/**
 * Node詳細取得Service
 */
export class GetNodeByIdService {
  constructor(private nodeQueryService: INodeQueryService) {}

  /**
   * IDでNodeを取得
   */
  public async invoke(id: number): Promise<GetNodeByIdResultDto | null> {
    return await this.nodeQueryService.findById(id);
  }
}
