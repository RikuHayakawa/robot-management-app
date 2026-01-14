import { IRobotRepository } from "../../../../domain/robot/IRobotRepository";

/**
 * Robot削除Service
 */
export class DeleteRobotService {
  constructor(private robotRepository: IRobotRepository) {}

  /**
   * Robotを削除
   */
  public async invoke(id: number): Promise<void> {
    const robot = await this.robotRepository.findById(id);
    if (!robot) {
      throw new Error("Robot not found");
    }
    await this.robotRepository.delete(id);
  }
}
