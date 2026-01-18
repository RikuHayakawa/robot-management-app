import { IRobotQueryService } from "./interfaces/IRobotQueryService";
import { GetRobotByIdResultDto } from "../dto";

/**
 * Robot詳細取得Service
 */
export class GetRobotByIdService {
  constructor(private robotQueryService: IRobotQueryService) {}

  /**
   * IDでRobotを取得
   */
  public async invoke(id: number): Promise<GetRobotByIdResultDto | null> {
    return await this.robotQueryService.findById(id);
  }
}
