import { vi } from "vitest";
import { IRobotRepository } from "../../../src/domain/robots/IRobotRepository";
import { Robot } from "../../../src/domain/robots/Robot";

/**
 * IRobotRepositoryのモック実装
 * テストで使用するモックリポジトリ
 */
export function createMockRobotRepository(): IRobotRepository {
  return {
    findById: vi.fn(),
    findAll: vi.fn(),
    create: vi.fn(),
    update: vi.fn(),
    delete: vi.fn(),
  } as unknown as IRobotRepository;
}

/**
 * モック用のヘルパー関数
 */
export function createMockRobot(overrides?: Partial<Robot>): Robot {
  return new Robot(
    overrides?.id ?? 1,
    overrides?.name ?? "TestRobot",
    overrides?.isActive ?? true,
    overrides?.createdAt ?? new Date(),
    overrides?.updatedAt ?? new Date()
  );
}
