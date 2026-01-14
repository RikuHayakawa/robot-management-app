import { Router } from "express";
import { CreateRobotService, UpdateRobotService, DeleteRobotService } from "../../../application/robot/commands";
import { GetAllRobotsService, GetRobotByIdService } from "../../../application/robot/queries";
import { robotRepository } from "../../../infrastructure/db/repositories/rdb/robotRepository";

const router: Router = Router();

// Serviceインスタンスを生成
const getAllRobotsService = new GetAllRobotsService(robotRepository);
const getRobotByIdService = new GetRobotByIdService(robotRepository);
const createRobotService = new CreateRobotService(robotRepository);
const updateRobotService = new UpdateRobotService(robotRepository);
const deleteRobotService = new DeleteRobotService(robotRepository);

// GET /robots - 一覧
router.get("/", async (req, res, next) => {
  try {
    const robots = await getAllRobotsService.invoke();
    res.json(robots);
  } catch (error) {
    next(error);
  }
});

// GET /robots/:id - 詳細
router.get("/:id", async (req, res, next) => {
  try {
    const id = parseInt(req.params.id, 10);
    if (isNaN(id)) {
      return res.status(400).json({ error: "Invalid robot ID" });
    }
    const robot = await getRobotByIdService.invoke(id);
    if (!robot) {
      return res.status(404).json({ error: "Robot not found" });
    }
    res.json(robot);
  } catch (error) {
    next(error);
  }
});

// POST /robots - 作成
router.post("/", async (req, res, next) => {
  try {
    const { name, status, currentNodeId } = req.body;
    if (!name || !status) {
      return res.status(400).json({ error: "Name and status are required" });
    }
    if (status !== "idle" && status !== "moving") {
      return res.status(400).json({ error: "Status must be 'idle' or 'moving'" });
    }
    const robot = await createRobotService.invoke({
      name,
      status,
      currentNodeId: currentNodeId || null,
    });
    res.status(201).json(robot);
  } catch (error) {
    next(error);
  }
});

// PUT /robots/:id - 更新
router.put("/:id", async (req, res, next) => {
  try {
    const id = parseInt(req.params.id, 10);
    if (isNaN(id)) {
      return res.status(400).json({ error: "Invalid robot ID" });
    }
    const { status, currentNodeId, name } = req.body;
    const updateData: { id: number; name?: string; status?: "idle" | "moving"; currentNodeId?: number | null } = {
      id,
    };
    if (status !== undefined) {
      if (status !== "idle" && status !== "moving") {
        return res.status(400).json({ error: "Status must be 'idle' or 'moving'" });
      }
      updateData.status = status;
    }
    if (currentNodeId !== undefined) {
      updateData.currentNodeId = currentNodeId;
    }
    if (name !== undefined) {
      updateData.name = name;
    }
    const robot = await updateRobotService.invoke(updateData);
    res.json(robot);
  } catch (error) {
    next(error);
  }
});

// DELETE /robots/:id - 削除
router.delete("/:id", async (req, res, next) => {
  try {
    const id = parseInt(req.params.id, 10);
    if (isNaN(id)) {
      return res.status(400).json({ error: "Invalid robot ID" });
    }
    await deleteRobotService.invoke(id);
    res.status(204).send();
  } catch (error) {
    next(error);
  }
});

export default router;
