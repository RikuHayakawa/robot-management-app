import DataLoader from "dataloader";
import type { GetNodeByIdResultDto } from "../../application/nodes/dto";
import type { GetRobotByIdResultDto } from "../../application/robots/dto";
import { CreateRobotService } from "../../application/robots/commands/create";
import { UpdateRobotService } from "../../application/robots/commands/update";
import { DeleteRobotService } from "../../application/robots/commands/delete";
import { GetAllRobotsService } from "../../application/robots/queries/getAll";
import { GetRobotByIdService } from "../../application/robots/queries/getById";
import { GetWaypointLogsByRobotIdService } from "../../application/waypointLogs/queries/getByRobotId";
import { GetNodeByIdService } from "../../application/nodes/queries/getById";
import { GetAllNodesService } from "../../application/nodes/queries/getAll";
import type { Adapters } from "../../bootstrap/adapters";

export type GraphQLContext = {
  getAllRobotsService: GetAllRobotsService;
  getRobotByIdService: GetRobotByIdService;
  createRobotService: CreateRobotService;
  updateRobotService: UpdateRobotService;
  deleteRobotService: DeleteRobotService;
  getWaypointLogsByRobotIdService: GetWaypointLogsByRobotIdService;
  getAllNodesService: GetAllNodesService;
  getNodeByIdService: GetNodeByIdService;
  nodeLoader: DataLoader<number, GetNodeByIdResultDto | null>;
  robotLoader: DataLoader<number, GetRobotByIdResultDto | null>;
};

export function createGraphQLContext(adapters: Adapters): GraphQLContext {
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

  const nodeLoader = new DataLoader<number, GetNodeByIdResultDto | null>(
    async (ids) => nodeQueryService.findByIds([...ids])
  );
  const robotLoader = new DataLoader<number, GetRobotByIdResultDto | null>(
    async (ids) => robotQueryService.findByIds([...ids])
  );

  return {
    getAllRobotsService,
    getRobotByIdService,
    createRobotService,
    updateRobotService,
    deleteRobotService,
    getWaypointLogsByRobotIdService,
    getAllNodesService,
    getNodeByIdService,
    nodeLoader,
    robotLoader,
  };
}
