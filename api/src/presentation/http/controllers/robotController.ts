import { Route, Get, Post, Put, Delete, Path, Body, Controller } from "tsoa";
import { CreateRobotService } from "../../../application/robots/commands/create";
import { UpdateRobotService } from "../../../application/robots/commands/update";
import { DeleteRobotService } from "../../../application/robots/commands/delete";
import { GetAllRobotsService } from "../../../application/robots/queries/getAll";
import { GetRobotByIdService } from "../../../application/robots/queries/getById";
import { GetRobotByIdResultDto } from "../../../application/robots/dto";
import { GetWaypointLogsByRobotIdService } from "../../../application/waypointLogs/queries/getByRobotId";
import {
  RobotResponse,
  RobotCreateRequest,
  RobotUpdateRequest,
} from "../schema/robots";
import {
  toRobotResponse,
  toRobotCreateRequest,
  toRobotUpdateRequest,
} from "../mappers/robots";
import { WaypointLogResponse } from "../schema/waypointLogs";
import { toWaypointLogResponse } from "../mappers/waypointLogs";

/**
 * Robot Controller
 * Application Serviceを呼び出し、DTO変換を行う
 */
@Route("robots")
export class RobotController {
  constructor(
    private getAllRobotsService: GetAllRobotsService,
    private getRobotByIdService: GetRobotByIdService,
    private createRobotService: CreateRobotService,
    private updateRobotService: UpdateRobotService,
    private deleteRobotService: DeleteRobotService,
    private getWaypointLogsByRobotIdService: GetWaypointLogsByRobotIdService
  ) {}

  /**
   * Robot一覧取得
   */
  @Get("/")
  public async getAll(): Promise<RobotResponse[]> {
    const result = await this.getAllRobotsService.invoke();
    return result.map((dto: GetRobotByIdResultDto) => toRobotResponse(dto));
  }

  /**
   * Robot詳細取得
   */
  @Get("/{id}")
  public async getById(@Path() id: number): Promise<RobotResponse> {
    const result = await this.getRobotByIdService.invoke(id);
    if (!result) {
      throw new Error("Robot not found");
    }
    return toRobotResponse(result);
  }

  /**
   * Robot作成
   */
  @Post("/")
  public async create(@Body() requestBody: RobotCreateRequest): Promise<RobotResponse> {
    const input = toRobotCreateRequest(requestBody);
    const result = await this.createRobotService.invoke(input);
    return toRobotResponse(result);
  }

  /**
   * Robot更新
   */
  @Put("/{id}")
  public async update(
    @Path() id: number,
    @Body() requestBody: RobotUpdateRequest
  ): Promise<RobotResponse> {
    const input = toRobotUpdateRequest(id, requestBody);
    const result = await this.updateRobotService.invoke(input);
    return toRobotResponse(result);
  }

  /**
   * Robot削除
   */
  @Delete("/{id}")
  public async delete(@Path() id: number): Promise<void> {
    await this.deleteRobotService.invoke(id);
  }

  /**
   * Robotの走行履歴取得（Node情報を含む）
   */
  @Get("/{id}/waypoint-logs")
  public async getWaypointLogs(
    @Path() id: number
  ): Promise<WaypointLogResponse[]> {
    const result = await this.getWaypointLogsByRobotIdService.invoke(id);
    return result.map((dto) => toWaypointLogResponse(dto));
  }
}
