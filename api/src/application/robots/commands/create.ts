import { IRobotRepository } from "../../../domain/robots/IRobotRepository";
import { Robot } from "../../../domain/robots/Robot";
import {
  CreateRobotInputDto,
  CreateRobotResultDto,
} from "../dto";

/**
 * Robot作成Service
 */
export class CreateRobotService {
  constructor(private robotRepository: IRobotRepository) {}

  /**
   * Robotを作成
   */
  public async invoke(input: CreateRobotInputDto): Promise<CreateRobotResultDto> {
    const robot = new Robot(0, input.name, input.isActive);
    const created = await this.robotRepository.create(robot);

    return new CreateRobotResultDto(
      created.id,
      created.name,
      created.isActive
    );
  }
}
