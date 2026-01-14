import { Request, Response, NextFunction } from "express";
import { CreateRobotService, UpdateRobotService, DeleteRobotService } from "../../../application/robot/commands";
import { GetAllRobotsService, GetRobotByIdService } from "../../../application/robot/queries";
import {
  CreateRobotInputDto,
  UpdateRobotInputDto,
  GetRobotByIdResultDto,
} from "../../../application/robot/dto";
import { RobotResponse } from "../responses/RobotResponse";

/**
 * Robot Controller
 * Application Serviceを呼び出し、DTO変換を行う
 */
export class RobotController {
  constructor(
    private getAllRobotsService: GetAllRobotsService,
    private getRobotByIdService: GetRobotByIdService,
    private createRobotService: CreateRobotService,
    private updateRobotService: UpdateRobotService,
    private deleteRobotService: DeleteRobotService
  ) {}

  /**
   * Robot一覧取得
   */
  async getAll(req: Request, res: Response, next: NextFunction): Promise<void> {
    try {
      const result = await this.getAllRobotsService.invoke();
      const responses = result.map((dto: GetRobotByIdResultDto) => RobotResponse.fromQueryResult(dto));
      res.json(responses);
    } catch (error) {
      next(error);
    }
  }

  /**
   * Robot詳細取得
   */
  async getById(req: Request, res: Response, next: NextFunction): Promise<void> {
    try {
      const idParam = Array.isArray(req.params.id) ? req.params.id[0] : req.params.id;
      const id = parseInt(idParam, 10);
      if (isNaN(id)) {
        res.status(400).json({ error: "Invalid robot ID" });
        return;
      }

      const result = await this.getRobotByIdService.invoke(id);
      if (!result) {
        res.status(404).json({ error: "Robot not found" });
        return;
      }

      res.json(RobotResponse.fromQueryResult(result));
    } catch (error) {
      next(error);
    }
  }

  /**
   * Robot作成
   */
  async create(req: Request, res: Response, next: NextFunction): Promise<void> {
    try {
      const { name, status, currentNodeId } = req.body;
      if (!name || !status) {
        res.status(400).json({ error: "Name and status are required" });
        return;
      }
      if (status !== "idle" && status !== "moving") {
        res.status(400).json({ error: "Status must be 'idle' or 'moving'" });
        return;
      }

      const input = new CreateRobotInputDto(
        name,
        status,
        currentNodeId ?? null
      );

      const result = await this.createRobotService.invoke(input);
      res.status(201).json(RobotResponse.fromCreateResult(result));
    } catch (error) {
      next(error);
    }
  }

  /**
   * Robot更新
   */
  async update(req: Request, res: Response, next: NextFunction): Promise<void> {
    try {
      const idParam = Array.isArray(req.params.id) ? req.params.id[0] : req.params.id;
      const id = parseInt(idParam, 10);
      if (isNaN(id)) {
        res.status(400).json({ error: "Invalid robot ID" });
        return;
      }

      const { status, currentNodeId, name } = req.body;
      const input = new UpdateRobotInputDto(
        id,
        name,
        status,
        currentNodeId
      );

      const result = await this.updateRobotService.invoke(input);
      res.json(RobotResponse.fromUpdateResult(result));
    } catch (error) {
      next(error);
    }
  }

  /**
   * Robot削除
   */
  async delete(req: Request, res: Response, next: NextFunction): Promise<void> {
    try {
      const idParam = Array.isArray(req.params.id) ? req.params.id[0] : req.params.id;
      const id = parseInt(idParam, 10);
      if (isNaN(id)) {
        res.status(400).json({ error: "Invalid robot ID" });
        return;
      }

      await this.deleteRobotService.invoke(id);
      res.status(204).send();
    } catch (error) {
      next(error);
    }
  }
}
