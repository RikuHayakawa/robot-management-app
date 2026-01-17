import { IRobotRepository } from "../../../domain/robots/IRobotRepository";
import { GetRobotByIdResultDto } from "../dto";

/**
 * Robot詳細取得Service
 */
export class GetRobotByIdService {
  constructor(private robotRepository: IRobotRepository) {}

  /**
   * IDでRobotを取得
   */
  public async invoke(id: number): Promise<GetRobotByIdResultDto | null> {
    const robot = await this.robotRepository.findById(id);
    if (!robot) {
      return null;
    }
    return new GetRobotByIdResultDto(
      robot.id,
      robot.name,
      robot.isActive
    );
  }
}
