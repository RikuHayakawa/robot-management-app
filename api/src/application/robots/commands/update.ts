import { IRobotRepository } from "../../../domain/robots/IRobotRepository";
import { Robot } from "../../../domain/robots/Robot";
import {
  UpdateRobotInputDto,
  UpdateRobotResultDto,
} from "../dto";

/**
 * Robot更新Service
 */
export class UpdateRobotService {
  constructor(private robotRepository: IRobotRepository) {}

  /**
   * Robotを更新
   */
  public async invoke(input: UpdateRobotInputDto): Promise<UpdateRobotResultDto> {
    const robot = await this.robotRepository.findById(input.id);
    if (!robot) {
      throw new Error("Robot not found");
    }

    // 名前やisActiveの変更がある場合は新しいインスタンスを作成
    const updatedRobot = new Robot(
      robot.id,
      input.name ?? robot.name,
      input.isActive !== undefined ? input.isActive : robot.isActive
    );

    const saved = await this.robotRepository.update(updatedRobot);

    return new UpdateRobotResultDto(
      saved.id,
      saved.name,
      saved.isActive,
      saved.createdAt!,
      saved.updatedAt!
    );
  }
}
