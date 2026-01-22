/**
 * カーソルペジネーション用の共通型
 */

export const DEFAULT_LIMIT = 20;
export const MAX_LIMIT = 100;

/**
 * limit を DEFAULT_LIMIT 〜 MAX_LIMIT にクランプする
 */
export function clampLimit(limit?: number): number {
    if (limit == null || Number.isNaN(limit)) {
      return DEFAULT_LIMIT;
    }
    const n = Math.floor(limit);
    if (n <= 0) return DEFAULT_LIMIT;
    return Math.min(n, MAX_LIMIT);
  }
