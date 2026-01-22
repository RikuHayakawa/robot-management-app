import type { IRobotRepository } from "../domain/robots/IRobotRepository";
import type { IRobotQueryService } from "../application/robots/queries/interfaces/IRobotQueryService";
import type { INodeQueryService } from "../application/nodes/queries/interfaces/INodeQueryService";
import type { IWaypointLogQueryService } from "../application/waypointLogs/queries/interfaces/IWaypointLogQueryService";
import type { AppConfig } from "./config";
import { createPrismaClient } from "../infrastructure/prisma/client";
import { RobotRepository } from "../infrastructure/prisma/repositories/robotRepository";
import { RobotQueryService } from "../infrastructure/prisma/queries/robotQueryService";
import { NodeQueryService } from "../infrastructure/prisma/queries/nodeQueryService";
import { WaypointLogQueryService } from "../infrastructure/prisma/queries/waypointLogQueryService";

export type Adapters = {
  robotRepository: IRobotRepository;
  robotQueryService: IRobotQueryService;
  nodeQueryService: INodeQueryService;
  waypointLogQueryService: IWaypointLogQueryService;
};

export function createAdapters(config: AppConfig): Adapters {
  const prisma = createPrismaClient(config.databaseUrl);
  const robotRepository = new RobotRepository(prisma);
  const robotQueryService = new RobotQueryService(prisma);
  const nodeQueryService = new NodeQueryService(prisma);
  const waypointLogQueryService = new WaypointLogQueryService(prisma);

  return {
    robotRepository,
    robotQueryService,
    nodeQueryService,
    waypointLogQueryService,
  };
}
