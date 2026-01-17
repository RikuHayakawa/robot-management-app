import { IocContainer } from "@tsoa/runtime";
import { CreateRobotService } from "../../application/robots/commands/create";
import { UpdateRobotService } from "../../application/robots/commands/update";
import { DeleteRobotService } from "../../application/robots/commands/delete";
import { GetAllRobotsService } from "../../application/robots/queries/getAll";
import { GetRobotByIdService } from "../../application/robots/queries/getById";
import { robotRepository } from "../db/repositories/rdb/robotRepository";
import { RobotController } from "../../presentation/http/controllers/robotController";
import { ServiceIdentifier } from "tsoa";

/**
 * tsoa用のDIコンテナ
 * Controllerのインスタンスを生成する
 */
function get<T>(controller: ServiceIdentifier<T>): T {
  // Serviceインスタンスを生成
  const getAllRobotsService = new GetAllRobotsService(robotRepository);
  const getRobotByIdService = new GetRobotByIdService(robotRepository);
  const createRobotService = new CreateRobotService(robotRepository);
  const updateRobotService = new UpdateRobotService(robotRepository);
  const deleteRobotService = new DeleteRobotService(robotRepository);

  // Controllerインスタンスを生成
  if (controller === RobotController) {
    return new RobotController(
      getAllRobotsService,
      getRobotByIdService,
      createRobotService,
      updateRobotService,
      deleteRobotService
    ) as T;
  }

  throw new Error(`Unknown controller: ${(controller as any).name || "unknown"}`);
}

/**
 * tsoaが期待するiocContainerオブジェクト
 */
export const iocContainer: IocContainer = {
  get,
};
