import { IocContainer } from "@tsoa/runtime";
import { CreateRobotService, UpdateRobotService, DeleteRobotService } from "../../application/robot/commands";
import { GetAllRobotsService, GetRobotByIdService } from "../../application/robot/queries";
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
  // tsoaはコントローラーのクラスコンストラクタを渡す
  if (controller instanceof RobotController) {
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
