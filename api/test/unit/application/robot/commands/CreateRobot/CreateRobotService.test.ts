import { describe, it, expect, beforeEach, vi } from "vitest";
import { CreateRobotService } from "../../../../../../src/application/robots/commands/create";
import { IRobotRepository } from "../../../../../../src/domain/robots/IRobotRepository";
import { Robot } from "../../../../../../src/domain/robots/Robot";
import {
  CreateRobotInputDto,
  CreateRobotResultDto,
} from "../../../../../../src/application/robots/dto";
import {
  createMockRobotRepository,
  createMockRobot,
} from "../../../../../helpers/mocks/robotRepository.mock";

describe("CreateRobotService", () => {
  let service: CreateRobotService;
  let mockRepository: IRobotRepository;

  beforeEach(() => {
    // Arrange: モックリポジトリを作成
    mockRepository = createMockRobotRepository();
    service = new CreateRobotService(mockRepository);
  });

  it("should create a robot successfully", async () => {
    // Arrange
    const input = new CreateRobotInputDto("TestRobot", true);
    const createdRobot = createMockRobot({
      id: 1,
      name: "TestRobot",
      isActive: true,
    });

    vi.mocked(mockRepository.create).mockResolvedValue(createdRobot);

    // Act
    const result = await service.invoke(input);

    // Assert
    expect(result).toBeInstanceOf(CreateRobotResultDto);
    expect(result.id).toBe(1);
    expect(result.name).toBe("TestRobot");
    expect(result.isActive).toBe(true);
    expect(result.createdAt).toBeDefined();
    expect(result.updatedAt).toBeDefined();
    expect(mockRepository.create).toHaveBeenCalledTimes(1);
    expect(mockRepository.create).toHaveBeenCalledWith(
      expect.objectContaining({
        id: 0,
        name: "TestRobot",
        isActive: true,
      })
    );
  });

  it("should create a robot with isActive false", async () => {
    // Arrange
    const input = new CreateRobotInputDto("TestRobot", false);
    const createdRobot = createMockRobot({
      id: 1,
      name: "TestRobot",
      isActive: false,
    });

    vi.mocked(mockRepository.create).mockResolvedValue(createdRobot);

    // Act
    const result = await service.invoke(input);

    // Assert
    expect(result.isActive).toBe(false);
  });

  it("should throw error when robot name is invalid", async () => {
    // Arrange
    const input = new CreateRobotInputDto("", true);

    // Act & Assert
    await expect(service.invoke(input)).rejects.toThrow();
    expect(mockRepository.create).not.toHaveBeenCalled();
  });

  it("should propagate repository errors", async () => {
    // Arrange
    const input = new CreateRobotInputDto("TestRobot", true);
    const error = new Error("Database error");
    vi.mocked(mockRepository.create).mockRejectedValue(error);

    // Act & Assert
    await expect(service.invoke(input)).rejects.toThrow("Database error");
  });
});
