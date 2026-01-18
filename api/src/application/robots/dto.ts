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
 * Robot取得用Result DTO（作成・更新・詳細で共通）
 */
export class RobotResultDto {
  constructor(
    public readonly id: number,
    public readonly name: string,
    public readonly isActive: boolean,
    public readonly createdAt: Date,
    public readonly updatedAt: Date
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


/** Robot作成の戻り値 */
export class CreateRobotResultDto extends RobotResultDto {
  constructor(
    id: number,
    name: string,
    isActive: boolean,
    createdAt: Date,
    updatedAt: Date
  ) {
    super(id, name, isActive, createdAt, updatedAt);
  }
}

/** Robot更新の戻り値 */
export class UpdateRobotResultDto extends RobotResultDto {
  constructor(
    id: number,
    name: string,
    isActive: boolean,
    createdAt: Date,
    updatedAt: Date
  ) {
    super(id, name, isActive, createdAt, updatedAt);
  }
}

/** Robot詳細取得の戻り値 */
export class GetRobotByIdResultDto extends RobotResultDto {
  constructor(
    id: number,
    name: string,
    isActive: boolean,
    createdAt: Date,
    updatedAt: Date
  ) {
    super(id, name, isActive, createdAt, updatedAt);
  }
}
