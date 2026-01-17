/**
 * 共通型定義
 * HTTP層で使用する汎用的な型を定義
 */

/**
 * エラーレスポンス
 */
export interface ErrorResponse {
  message: string;
  details?: { [key: string]: any };
}

/**
 * ページネーション付きレスポンス
 * @template T データの型
 */
export interface PaginatedResponse<T> {
  data: T[];
  total: number;
  page: number;
  lastPage: number;
}
