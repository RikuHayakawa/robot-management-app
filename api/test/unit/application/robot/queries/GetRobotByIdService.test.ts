import { describe, it, expect, beforeEach, vi } from "vitest";
import { GetRobotByIdService } from "../../../../../src/application/robots/queries/getById";
import { GetRobotByIdResultDto } from "../../../../../src/application/robots/dto";
import {
  createMockRobotQueryService,
  createMockGetRobotByIdResultDto,
} from "../../../../helpers/mocks/robotQueryService.mock";

describe("GetRobotByIdService", () => {
  let service: GetRobotByIdService;
  let mockQueryService: ReturnType<typeof createMockRobotQueryService>;

  beforeEach(() => {
    mockQueryService = createMockRobotQueryService();
    service = new GetRobotByIdService(mockQueryService);
  });

  it("should return a robot when found", async () => {
    const dto = createMockGetRobotByIdResultDto({
      id: 1,
      name: "TestRobot",
      isActive: true,
    });
    vi.mocked(mockQueryService.findById).mockResolvedValue(dto);

    const result = await service.invoke(1);

    expect(result).toBeInstanceOf(GetRobotByIdResultDto);
    expect(result).toEqual(dto);
    expect(result?.id).toBe(1);
    expect(result?.name).toBe("TestRobot");
    expect(mockQueryService.findById).toHaveBeenCalledWith(1);
  });

  it("should return null when not found", async () => {
    vi.mocked(mockQueryService.findById).mockResolvedValue(null);

    const result = await service.invoke(999);

    expect(result).toBeNull();
    expect(mockQueryService.findById).toHaveBeenCalledWith(999);
  });

  it("should propagate query service errors", async () => {
    vi.mocked(mockQueryService.findById).mockRejectedValue(
      new Error("Query failed")
    );

    await expect(service.invoke(1)).rejects.toThrow("Query failed");
  });
});
