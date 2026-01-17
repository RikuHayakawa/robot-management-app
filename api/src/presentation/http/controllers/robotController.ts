import { Route, Get, Post, Put, Delete, Path, Body, Controller } from "tsoa";
import { CreateRobotService, UpdateRobotService, DeleteRobotService } from "../../../application/robot/commands";
import { GetAllRobotsService, GetRobotByIdService } from "../../../application/robot/queries";
import {
  CreateRobotInputDto,
  UpdateRobotInputDto,
  GetRobotByIdResultDto,
} from "../../../application/robot/dto";
import { RobotResponse } from "../responses/RobotResponse";
import { CreateRobotRequest, UpdateRobotRequest } from "../requests";

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
    private deleteRobotService: DeleteRobotService
  ) {}

  /**
   * Robot一覧取得
   */
  @Get("/")
  public async getAll(): Promise<RobotResponse[]> {
    const result = await this.getAllRobotsService.invoke();
    return result.map((dto: GetRobotByIdResultDto) => RobotResponse.fromQueryResult(dto));
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
    return RobotResponse.fromQueryResult(result);
  }

  /**
   * Robot作成
   */
  @Post("/")
  public async create(@Body() requestBody: CreateRobotRequest): Promise<RobotResponse> {
    const input = new CreateRobotInputDto(
      requestBody.name,
      requestBody.status,
      requestBody.currentNodeId ?? null
    );

    const result = await this.createRobotService.invoke(input);
    return RobotResponse.fromCreateResult(result);
  }

  /**
   * Robot更新
   */
  @Put("/{id}")
  public async update(
    @Path() id: number,
    @Body() requestBody: UpdateRobotRequest
  ): Promise<RobotResponse> {
    const input = new UpdateRobotInputDto(
      id,
      requestBody.name,
      requestBody.status,
      requestBody.currentNodeId
    );

    const result = await this.updateRobotService.invoke(input);
    return RobotResponse.fromUpdateResult(result);
  }

  /**
   * Robot削除
   */
  @Delete("/{id}")
  public async delete(@Path() id: number): Promise<void> {
    await this.deleteRobotService.invoke(id);
  }
}
