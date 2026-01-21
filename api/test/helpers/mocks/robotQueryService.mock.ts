import { vi } from "vitest";
import type { IRobotQueryService } from "../../../src/application/robots/queries/interfaces/IRobotQueryService";
import { GetRobotByIdResultDto } from "../../../src/application/robots/dto";

/**
 * IRobotQueryService のモック
 */
export function createMockRobotQueryService(): IRobotQueryService {
  return {
    findById: vi.fn(),
    findByIds: vi.fn(),
    findAll: vi.fn(),
    findAllPaginated: vi.fn(),
  } as unknown as IRobotQueryService;
}

/**
 * GetRobotByIdResultDto を生成するヘルパー
 */
export function createMockGetRobotByIdResultDto(
  overrides?: Partial<{
    id: number;
    name: string;
    isActive: boolean;
    createdAt: Date;
    updatedAt: Date;
  }>
): GetRobotByIdResultDto {
  const createdAt = overrides?.createdAt ?? new Date();
  const updatedAt = overrides?.updatedAt ?? new Date();
  return new GetRobotByIdResultDto(
    overrides?.id ?? 1,
    overrides?.name ?? "TestRobot",
    overrides?.isActive ?? true,
    createdAt,
    updatedAt
  );
}
