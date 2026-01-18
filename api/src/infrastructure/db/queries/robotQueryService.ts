import { IRobotQueryService } from "../../../application/robots/queries/interfaces/IRobotQueryService";
import { GetRobotByIdResultDto } from "../../../application/robots/dto";
import { robotRepository } from "../repositories/robotRepository";

/**
 * Robotクエリサービス実装
 * IRobotRepository を使用して DTO を返す
 */
export class RobotQueryService implements IRobotQueryService {
  /**
   * IDでRobotを取得
   */
  public async findById(id: number): Promise<GetRobotByIdResultDto | null> {
    const robot = await robotRepository.findById(id);
    if (!robot) {
      return null;
    }
    return new GetRobotByIdResultDto(
      robot.id,
      robot.name,
      robot.isActive,
      robot.createdAt!,
      robot.updatedAt!
    );
  }

  /**
   * すべてのRobotを取得
   */
  public async findAll(): Promise<GetRobotByIdResultDto[]> {
    const robots = await robotRepository.findAll();
    return robots.map(
      (robot) =>
        new GetRobotByIdResultDto(
          robot.id,
          robot.name,
          robot.isActive,
          robot.createdAt!,
          robot.updatedAt!
        )
    );
  }
}

export const robotQueryService = new RobotQueryService();
