import { IRobotQueryService } from "./interfaces/IRobotQueryService";
import { GetRobotByIdResultDto } from "../dto";

/**
 * Robot一覧取得Service
 */
export class GetAllRobotsService {
  constructor(private robotQueryService: IRobotQueryService) {}

  /**
   * すべてのRobotを取得
   */
  public async invoke(): Promise<GetRobotByIdResultDto[]> {
    return await this.robotQueryService.findAll();
  }
}
