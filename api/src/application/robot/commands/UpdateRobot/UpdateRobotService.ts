import { IRobotRepository } from "../../../../domain/robot/IRobotRepository";
import { Robot } from "../../../../domain/robot/Robot";
import {
  UpdateRobotInputDto,
  UpdateRobotResultDto,
} from "../../dto";

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

    // ステータス変更の場合はDomainメソッドを使用
    if (input.status && input.status !== robot.status) {
      if (input.status === "moving") {
        robot.startMoving(input.currentNodeId ?? robot.currentNodeId);
      } else {
        robot.stopMoving();
      }
    }

    // 名前やcurrentNodeIdの変更がある場合は新しいインスタンスを作成
    const updatedRobot = new Robot(
      robot.id,
      input.name ?? robot.name,
      robot.status, // Domainメソッドで更新済み
      input.currentNodeId !== undefined ? input.currentNodeId : robot.currentNodeId
    );

    const saved = await this.robotRepository.update(updatedRobot);

    return new UpdateRobotResultDto(
      saved.id,
      saved.name,
      saved.status,
      saved.currentNodeId
    );
  }
}
