/**
 * Robot作成用Input DTO
 */
export class CreateRobotInputDto {
  constructor(
    public readonly name: string,
    public readonly isActive: boolean
  ) {}
}

/**
 * Robot作成用Result DTO
 */
export class CreateRobotResultDto {
  constructor(
    public readonly id: number,
    public readonly name: string,
    public readonly isActive: boolean
  ) {}
}

/**
 * Robot更新用Input DTO
 */
export class UpdateRobotInputDto {
  constructor(
    public readonly id: number,
    public readonly name?: string,
    public readonly isActive?: boolean
  ) {}
}

/**
 * Robot更新用Result DTO
 */
export class UpdateRobotResultDto {
  constructor(
    public readonly id: number,
    public readonly name: string,
    public readonly isActive: boolean
  ) {}
}

/**
 * Robot詳細用Result DTO（共通）
 */
export class GetRobotByIdResultDto {
  constructor(
    public readonly id: number,
    public readonly name: string,
    public readonly isActive: boolean
  ) {}
}
