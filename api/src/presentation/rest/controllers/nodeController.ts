import { Route, Get, Path, Query, Controller, OperationId } from "tsoa";
import { clampLimit } from "../../../application/shared/pagination/clamp";
import { GetNodeByIdService } from "../../../application/nodes/queries/getById";
import { GetAllNodesService } from "../../../application/nodes/queries/getAll";
import { toNodeResponse } from "../mappers/nodes";
import { NodeResponse } from "../schema/nodes";
import { CursorPaginatedResponse } from "../schema/shared";

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
   * Node一覧取得（カーソルペジネーション、x, yを除外）
   */
  @OperationId("GetAllNodes")
  @Get("/")
  public async getAll(
    @Query() limit?: number,
    @Query() cursor?: string
  ): Promise<CursorPaginatedResponse<NodeResponse>> {
    const result = await this.getAllNodesService.invoke({
      limit: clampLimit(limit),
      cursor,
    });
    return {
      items: result.items.map((dto) => toNodeResponse(dto)),
      nextCursor: result.nextCursor,
      hasNextPage: result.hasNextPage,
    };
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
