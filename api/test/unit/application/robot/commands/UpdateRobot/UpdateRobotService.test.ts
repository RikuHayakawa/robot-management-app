import { describe, it, expect, beforeEach, vi } from "vitest";
import { UpdateRobotService } from "../../../../../../src/application/robots/commands/update";
import { IRobotRepository } from "../../../../../../src/domain/robots/IRobotRepository";
import {
  UpdateRobotInputDto,
  UpdateRobotResultDto,
} from "../../../../../../src/application/robots/dto";
import {
  createMockRobotRepository,
  createMockRobot,
} from "../../../../../helpers/mocks/robotRepository.mock";

describe("UpdateRobotService", () => {
  let service: UpdateRobotService;
  let mockRepository: IRobotRepository;

  beforeEach(() => {
    mockRepository = createMockRobotRepository();
    service = new UpdateRobotService(mockRepository);
  });

  it("should update a robot (name and isActive)", async () => {
    // Arrange
    const existing = createMockRobot({
      id: 1,
      name: "OldName",
      isActive: true,
    });
    const saved = createMockRobot({
      id: 1,
      name: "NewName",
      isActive: false,
    });
    vi.mocked(mockRepository.findById).mockResolvedValue(existing);
    vi.mocked(mockRepository.update).mockResolvedValue(saved);

    const input = new UpdateRobotInputDto(1, "NewName", false);

    // Act
    const result = await service.invoke(input);

    // Assert
    expect(result).toBeInstanceOf(UpdateRobotResultDto);
    expect(result.id).toBe(1);
    expect(result.name).toBe("NewName");
    expect(result.isActive).toBe(false);
    expect(result.createdAt).toBeDefined();
    expect(result.updatedAt).toBeDefined();
    expect(mockRepository.findById).toHaveBeenCalledWith(1);
    expect(mockRepository.update).toHaveBeenCalledWith(
      expect.objectContaining({
        id: 1,
        name: "NewName",
        isActive: false,
      })
    );
  });

  it("should update only name when isActive is omitted", async () => {
    // Arrange
    const existing = createMockRobot({ id: 1, name: "OldName", isActive: true });
    const saved = createMockRobot({ id: 1, name: "NewName", isActive: true });
    vi.mocked(mockRepository.findById).mockResolvedValue(existing);
    vi.mocked(mockRepository.update).mockResolvedValue(saved);

    const input = new UpdateRobotInputDto(1, "NewName");

    // Act
    const result = await service.invoke(input);

    // Assert
    expect(result.name).toBe("NewName");
    expect(result.isActive).toBe(true);
    expect(mockRepository.update).toHaveBeenCalledWith(
      expect.objectContaining({ id: 1, name: "NewName", isActive: true })
    );
  });

  it("should update only isActive when name is omitted", async () => {
    // Arrange
    const existing = createMockRobot({ id: 1, name: "OldName", isActive: true });
    const saved = createMockRobot({ id: 1, name: "OldName", isActive: false });
    vi.mocked(mockRepository.findById).mockResolvedValue(existing);
    vi.mocked(mockRepository.update).mockResolvedValue(saved);

    const input = new UpdateRobotInputDto(1, undefined, false);

    // Act
    const result = await service.invoke(input);

    // Assert
    expect(result.name).toBe("OldName");
    expect(result.isActive).toBe(false);
    expect(mockRepository.update).toHaveBeenCalledWith(
      expect.objectContaining({ id: 1, name: "OldName", isActive: false })
    );
  });

  it("should throw when robot not found", async () => {
    vi.mocked(mockRepository.findById).mockResolvedValue(null);
    const input = new UpdateRobotInputDto(999, "NewName", true);

    await expect(service.invoke(input)).rejects.toThrow("Robot not found");
    expect(mockRepository.update).not.toHaveBeenCalled();
  });

  it("should throw when updated name is invalid", async () => {
    const existing = createMockRobot({ id: 1, name: "OldName", isActive: true });
    vi.mocked(mockRepository.findById).mockResolvedValue(existing);
    const input = new UpdateRobotInputDto(1, "", true);

    await expect(service.invoke(input)).rejects.toThrow();
    expect(mockRepository.update).not.toHaveBeenCalled();
  });

  it("should propagate repository update errors", async () => {
    const existing = createMockRobot({ id: 1, name: "A", isActive: true });
    vi.mocked(mockRepository.findById).mockResolvedValue(existing);
    vi.mocked(mockRepository.update).mockRejectedValue(new Error("DB error"));
    const input = new UpdateRobotInputDto(1, "NewName", true);

    await expect(service.invoke(input)).rejects.toThrow("DB error");
  });
});
