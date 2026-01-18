import { IocContainer } from "@tsoa/runtime";
import { CreateRobotService } from "../../application/robots/commands/create";
import { UpdateRobotService } from "../../application/robots/commands/update";
import { DeleteRobotService } from "../../application/robots/commands/delete";
import { GetAllRobotsService } from "../../application/robots/queries/getAll";
import { GetRobotByIdService } from "../../application/robots/queries/getById";
import { GetWaypointLogsByRobotIdService } from "../../application/waypointLogs/queries/getByRobotId";
import { GetNodeByIdService } from "../../application/nodes/queries/getById";
import { GetAllNodesService } from "../../application/nodes/queries/getAll";
import { robotRepository } from "../db/repositories/robotRepository";
import { robotQueryService } from "../db/queries/robotQueryService";
import { nodeQueryService } from "../db/queries/nodeQueryService";
import { waypointLogQueryService } from "../db/queries/waypointLogQueryService";
import { RobotController } from "../../presentation/http/controllers/robotController";
import { NodeController } from "../../presentation/http/controllers/nodeController";
import { ServiceIdentifier } from "tsoa";

/**
 * tsoa用のDIコンテナ
 * Controllerのインスタンスを生成する
 */
function get<T>(controller: ServiceIdentifier<T>): T {
  // Serviceインスタンスを生成
  const getAllRobotsService = new GetAllRobotsService(robotQueryService);
  const getRobotByIdService = new GetRobotByIdService(robotQueryService);
  const createRobotService = new CreateRobotService(robotRepository);
  const updateRobotService = new UpdateRobotService(robotRepository);
  const deleteRobotService = new DeleteRobotService(robotRepository);
  const getWaypointLogsByRobotIdService = new GetWaypointLogsByRobotIdService(
    waypointLogQueryService
  );
  const getAllNodesService = new GetAllNodesService(nodeQueryService);
  const getNodeByIdService = new GetNodeByIdService(nodeQueryService);

  // Controllerインスタンスを生成
  if (controller === RobotController) {
    return new RobotController(
      getAllRobotsService,
      getRobotByIdService,
      createRobotService,
      updateRobotService,
      deleteRobotService,
      getWaypointLogsByRobotIdService
    ) as T;
  }

  if (controller === NodeController) {
    return new NodeController(getAllNodesService, getNodeByIdService) as T;
  }

  throw new Error(`Unknown controller: ${(controller as any).name || "unknown"}`);
}

/**
 * tsoaが期待するiocContainerオブジェクト
 */
export const iocContainer: IocContainer = {
  get,
};
