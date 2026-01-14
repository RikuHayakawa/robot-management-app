import { IRobotRepository } from "../../../../domain/robot/IRobotRepository";
import { Robot } from "../../../../domain/robot/Robot";
import {
  CreateRobotInputDto,
  CreateRobotResultDto,
} from "../../dto";

/**
 * Robot作成Service
 */
export class CreateRobotService {
  constructor(private robotRepository: IRobotRepository) {}

  /**
   * Robotを作成
   */
  public async invoke(input: CreateRobotInputDto): Promise<CreateRobotResultDto> {
    const robot = new Robot(0, input.name, input.status, input.currentNodeId);
    const created = await this.robotRepository.create(robot);

    return new CreateRobotResultDto(
      created.id,
      created.name,
      created.status,
      created.currentNodeId
    );
  }
}
