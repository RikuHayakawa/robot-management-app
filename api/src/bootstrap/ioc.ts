import { IocContainer } from "@tsoa/runtime";
import type { ServiceIdentifier } from "tsoa";
import { CreateRobotService } from "../application/robots/commands/create";
import { UpdateRobotService } from "../application/robots/commands/update";
import { DeleteRobotService } from "../application/robots/commands/delete";
import { GetAllRobotsService } from "../application/robots/queries/getAll";
import { GetRobotByIdService } from "../application/robots/queries/getById";
import { GetWaypointLogsByRobotIdService } from "../application/waypointLogs/queries/getByRobotId";
import { GetNodeByIdService } from "../application/nodes/queries/getById";
import { GetAllNodesService } from "../application/nodes/queries/getAll";
import { NodeController, RobotController } from "../presentation/rest";
import type { Adapters } from "./adapters";

let adapters: Adapters | null = null;

export function initIoc(a: Adapters): void {
  adapters = a;
}

function get<T>(controller: ServiceIdentifier<T>): T {
  if (!adapters) {
    throw new Error("IoC not initialized. Call initIoc(adapters) before handling requests.");
  }

  const {
    robotRepository,
    robotQueryService,
    nodeQueryService,
    waypointLogQueryService,
  } = adapters;

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

  throw new Error(`Unknown controller: ${(controller as { name?: string }).name ?? "unknown"}`);
}

export const iocContainer: IocContainer = {
  get,
};
