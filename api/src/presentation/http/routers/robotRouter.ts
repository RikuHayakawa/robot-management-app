import { Router } from "express";
import { CreateRobotService, UpdateRobotService, DeleteRobotService } from "../../../application/robot/commands";
import { GetAllRobotsService, GetRobotByIdService } from "../../../application/robot/queries";
import { robotRepository } from "../../../infrastructure/db/repositories/rdb/robotRepository";
import { RobotController } from "../controllers/robotController";

const router: Router = Router();

// Serviceインスタンスを生成
const getAllRobotsService = new GetAllRobotsService(robotRepository);
const getRobotByIdService = new GetRobotByIdService(robotRepository);
const createRobotService = new CreateRobotService(robotRepository);
const updateRobotService = new UpdateRobotService(robotRepository);
const deleteRobotService = new DeleteRobotService(robotRepository);

// Controllerインスタンスを生成
const robotController = new RobotController(
  getAllRobotsService,
  getRobotByIdService,
  createRobotService,
  updateRobotService,
  deleteRobotService
);

// ルーティング定義
router.get("/", (req, res, next) => robotController.getAll(req, res, next));
router.get("/:id", (req, res, next) => robotController.getById(req, res, next));
router.post("/", (req, res, next) => robotController.create(req, res, next));
router.put("/:id", (req, res, next) => robotController.update(req, res, next));
router.delete("/:id", (req, res, next) => robotController.delete(req, res, next));

export default router;
