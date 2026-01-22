/**
 * ペジネーション入力
 */
export interface PaginationInput {
  limit?: number;
  cursor?: string;
}

/**
 * ペジネーション結果
 */
export interface PaginatedResult<T> {
  items: T[];
  nextCursor: string | null;
  hasNextPage: boolean;
}
