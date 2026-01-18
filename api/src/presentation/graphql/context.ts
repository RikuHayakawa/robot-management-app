import { CreateRobotService } from "../../application/robots/commands/create";
import { UpdateRobotService } from "../../application/robots/commands/update";
import { DeleteRobotService } from "../../application/robots/commands/delete";
import { GetAllRobotsService } from "../../application/robots/queries/getAll";
import { GetRobotByIdService } from "../../application/robots/queries/getById";
import { GetWaypointLogsByRobotIdService } from "../../application/waypointLogs/queries/getByRobotId";
import { GetNodeByIdService } from "../../application/nodes/queries/getById";
import { GetAllNodesService } from "../../application/nodes/queries/getAll";
import { robotRepository } from "../../infrastructure/db/repositories/robotRepository";
import { robotQueryService } from "../../infrastructure/db/queries/robotQueryService";
import { nodeQueryService } from "../../infrastructure/db/queries/nodeQueryService";
import { waypointLogQueryService } from "../../infrastructure/db/queries/waypointLogQueryService";

export type GraphQLContext = {
  getAllRobotsService: GetAllRobotsService;
  getRobotByIdService: GetRobotByIdService;
  createRobotService: CreateRobotService;
  updateRobotService: UpdateRobotService;
  deleteRobotService: DeleteRobotService;
  getWaypointLogsByRobotIdService: GetWaypointLogsByRobotIdService;
  getAllNodesService: GetAllNodesService;
  getNodeByIdService: GetNodeByIdService;
};

export function createGraphQLContext(): GraphQLContext {
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

  return {
    getAllRobotsService,
    getRobotByIdService,
    createRobotService,
    updateRobotService,
    deleteRobotService,
    getWaypointLogsByRobotIdService,
    getAllNodesService,
    getNodeByIdService,
  };
}
