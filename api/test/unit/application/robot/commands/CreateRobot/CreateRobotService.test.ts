import { describe, it, expect, beforeEach, vi } from "vitest";
import { CreateRobotService } from "../../../../../../src/application/robot/commands/CreateRobot/CreateRobotService";
import { IRobotRepository } from "../../../../../../src/domain/robots/IRobotRepository";
import { Robot } from "../../../../../../src/domain/robots/Robot";
import { CreateRobotInputDto } from "../../../../../../src/application/robot/dto/CreateRobotInputDto";
import { CreateRobotResultDto } from "../../../../../../src/application/robot/dto/CreateRobotResultDto";
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
    const input = new CreateRobotInputDto("TestRobot", "idle", null);
    const createdRobot = createMockRobot({
      id: 1,
      name: "TestRobot",
      status: "idle",
      currentNodeId: null,
    });

    vi.mocked(mockRepository.create).mockResolvedValue(createdRobot);

    // Act
    const result = await service.invoke(input);

    // Assert
    expect(result).toBeInstanceOf(CreateRobotResultDto);
    expect(result.id).toBe(1);
    expect(result.name).toBe("TestRobot");
    expect(result.status).toBe("idle");
    expect(result.currentNodeId).toBeNull();
    expect(mockRepository.create).toHaveBeenCalledTimes(1);
    expect(mockRepository.create).toHaveBeenCalledWith(
      expect.objectContaining({
        id: 0,
        name: "TestRobot",
        status: "idle",
        currentNodeId: null,
      })
    );
  });

  it("should create a robot with currentNodeId", async () => {
    // Arrange
    const input = new CreateRobotInputDto("TestRobot", "idle", 5);
    const createdRobot = createMockRobot({
      id: 1,
      name: "TestRobot",
      status: "idle",
      currentNodeId: 5,
    });

    vi.mocked(mockRepository.create).mockResolvedValue(createdRobot);

    // Act
    const result = await service.invoke(input);

    // Assert
    expect(result.currentNodeId).toBe(5);
    expect(mockRepository.create).toHaveBeenCalledWith(
      expect.objectContaining({
        currentNodeId: 5,
      })
    );
  });

  it("should create a robot with moving status", async () => {
    // Arrange
    const input = new CreateRobotInputDto("TestRobot", "moving", null);
    const createdRobot = createMockRobot({
      id: 1,
      name: "TestRobot",
      status: "moving",
      currentNodeId: null,
    });

    vi.mocked(mockRepository.create).mockResolvedValue(createdRobot);

    // Act
    const result = await service.invoke(input);

    // Assert
    expect(result.status).toBe("moving");
  });

  it("should throw error when robot name is invalid", async () => {
    // Arrange
    const input = new CreateRobotInputDto("", "idle", null);

    // Act & Assert
    await expect(service.invoke(input)).rejects.toThrow();
    expect(mockRepository.create).not.toHaveBeenCalled();
  });

  it("should propagate repository errors", async () => {
    // Arrange
    const input = new CreateRobotInputDto("TestRobot", "idle", null);
    const error = new Error("Database error");
    vi.mocked(mockRepository.create).mockRejectedValue(error);

    // Act & Assert
    await expect(service.invoke(input)).rejects.toThrow("Database error");
  });
});
