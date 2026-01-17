import { IRobotRepository } from "../../../domain/robots/IRobotRepository";
import { GetRobotByIdResultDto } from "../dto";

/**
 * Robot一覧取得Service
 */
export class GetAllRobotsService {
  constructor(private robotRepository: IRobotRepository) {}

  /**
   * すべてのRobotを取得
   */
  public async invoke(): Promise<GetRobotByIdResultDto[]> {
    const robots = await this.robotRepository.findAll();
    return robots.map(
      (robot) =>
        new GetRobotByIdResultDto(
          robot.id,
          robot.name,
          robot.isActive
        )
    );
  }
}
