import { describe, it, expect, beforeEach, vi } from "vitest";
import { DeleteRobotService } from "../../../../../../src/application/robots/commands/delete";
import { IRobotRepository } from "../../../../../../src/domain/robots/IRobotRepository";
import {
  createMockRobotRepository,
  createMockRobot,
} from "../../../../../helpers/mocks/robotRepository.mock";

describe("DeleteRobotService", () => {
  let service: DeleteRobotService;
  let mockRepository: IRobotRepository;

  beforeEach(() => {
    mockRepository = createMockRobotRepository();
    service = new DeleteRobotService(mockRepository);
  });

  it("should delete a robot when it exists", async () => {
    const existing = createMockRobot({ id: 1, name: "TestRobot", isActive: true });
    vi.mocked(mockRepository.findById).mockResolvedValue(existing);
    vi.mocked(mockRepository.delete).mockResolvedValue(undefined);

    await service.invoke(1);

    expect(mockRepository.findById).toHaveBeenCalledWith(1);
    expect(mockRepository.delete).toHaveBeenCalledWith(1);
  });

  it("should throw when robot not found", async () => {
    vi.mocked(mockRepository.findById).mockResolvedValue(null);

    await expect(service.invoke(999)).rejects.toThrow("Robot not found");
    expect(mockRepository.delete).not.toHaveBeenCalled();
  });

  it("should propagate repository delete errors", async () => {
    const existing = createMockRobot({ id: 1 });
    vi.mocked(mockRepository.findById).mockResolvedValue(existing);
    vi.mocked(mockRepository.delete).mockRejectedValue(new Error("DB delete failed"));

    await expect(service.invoke(1)).rejects.toThrow("DB delete failed");
  });
});
