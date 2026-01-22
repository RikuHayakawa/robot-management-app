import { describe, it, expect, beforeEach, vi } from "vitest";
import { GetAllRobotsService } from "../../../../../src/application/robots/queries/getAll";
import {
  DEFAULT_LIMIT,
  MAX_LIMIT,
} from "../../../../../src/application/shared/pagination/clamp";
import {
  createMockRobotQueryService,
  createMockGetRobotByIdResultDto,
} from "../../../../helpers/mocks/robotQueryService.mock";

describe("GetAllRobotsService", () => {
  let service: GetAllRobotsService;
  let mockQueryService: ReturnType<typeof createMockRobotQueryService>;

  beforeEach(() => {
    mockQueryService = createMockRobotQueryService();
    service = new GetAllRobotsService(mockQueryService);
  });

  it("should return paginated result with default limit when input is undefined", async () => {
    const items = [
      createMockGetRobotByIdResultDto({ id: 1, name: "A" }),
      createMockGetRobotByIdResultDto({ id: 2, name: "B" }),
    ];
    const page = { items, nextCursor: "cur2", hasNextPage: true };
    vi.mocked(mockQueryService.findAllPaginated).mockResolvedValue(page);

    const result = await service.invoke();

    expect(result).toEqual(page);
    expect(result.items).toHaveLength(2);
    expect(mockQueryService.findAllPaginated).toHaveBeenCalledWith({
      limit: DEFAULT_LIMIT,
      cursor: undefined,
    });
  });

  it("should pass custom limit and cursor to query service", async () => {
    const page = { items: [], nextCursor: null, hasNextPage: false };
    vi.mocked(mockQueryService.findAllPaginated).mockResolvedValue(page);

    await service.invoke({ limit: 10, cursor: "abc" });

    expect(mockQueryService.findAllPaginated).toHaveBeenCalledWith({
      limit: 10,
      cursor: "abc",
    });
  });

  it("should clamp limit to MAX_LIMIT when limit exceeds MAX_LIMIT", async () => {
    const page = { items: [], nextCursor: null, hasNextPage: false };
    vi.mocked(mockQueryService.findAllPaginated).mockResolvedValue(page);

    await service.invoke({ limit: 999 });

    expect(mockQueryService.findAllPaginated).toHaveBeenCalledWith({
      limit: MAX_LIMIT,
      cursor: undefined,
    });
  });

  it("should propagate query service errors", async () => {
    vi.mocked(mockQueryService.findAllPaginated).mockRejectedValue(
      new Error("DB error")
    );

    await expect(service.invoke()).rejects.toThrow("DB error");
  });
});
