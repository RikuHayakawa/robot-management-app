import { INodeQueryService } from "./interfaces/INodeQueryService";
import { GetNodeByIdResultDto } from "../dto";

/**
 * Node一覧取得Service
 */
export class GetAllNodesService {
  constructor(private nodeQueryService: INodeQueryService) {}

  /**
   * すべてのNodeを取得
   */
  public async invoke(): Promise<GetNodeByIdResultDto[]> {
    return await this.nodeQueryService.findAll();
  }
}
