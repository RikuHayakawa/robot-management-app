import { Route, Get, Path, Controller, OperationId } from "tsoa";
import { GetNodeByIdService } from "../../../application/nodes/queries/getById";
import { GetAllNodesService } from "../../../application/nodes/queries/getAll";
import { NodeResponse } from "../schema/nodes";
import { toNodeResponse } from "../mappers/nodes";

/**
 * Node Controller
 * Application Serviceを呼び出し、DTO変換を行う
 */
@Route("nodes")
export class NodeController {
  constructor(
    private getAllNodesService: GetAllNodesService,
    private getNodeByIdService: GetNodeByIdService
  ) {}

  /**
   * Node一覧取得（x, yを除外）
   */
  @OperationId("GetAllNodes")
  @Get("/")
  public async getAll(): Promise<NodeResponse[]> {
    const result = await this.getAllNodesService.invoke();
    return result.map((dto) => toNodeResponse(dto));
  }

  /**
   * Node詳細取得（x, yを除外）
   */
  @OperationId("GetNodeById")
  @Get("/{id}")
  public async getById(@Path() id: number): Promise<NodeResponse> {
    const result = await this.getNodeByIdService.invoke(id);
    if (!result) {
      throw new Error("Node not found");
    }
    return toNodeResponse(result);
  }
}
