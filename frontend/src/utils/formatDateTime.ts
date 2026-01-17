import dayjs from './dayjs';

/**
 * 日時をフォーマットする
 * @param date - 日時文字列またはDateオブジェクト
 * @param format - フォーマット文字列（デフォルト: 'YY/MM/DD'）
 * @returns フォーマットされた日時文字列
 */
export const formatDateTime = (date: string | Date | null | undefined, format: string = 'YYYY/MM/DD'): string => {
  if (!date) {
    return '';
  }

  return dayjs(date).format(format);
};

/**
 * 日付のみをフォーマットする（YY/MM/DD形式）
 */
export const formatDate = (date: string | Date | null | undefined): string => {
  return formatDateTime(date, 'YYYY/MM/DD');
};

/**
 * 日時をフォーマットする（YY/MM/DD HH:mm形式）
 */
export const formatDateTimeWithTime = (date: string | Date | null | undefined): string => {
  return formatDateTime(date, 'YYYY/MM/DD HH:mm');
};

/**
 * 日時をフォーマットする（YYYY年MM月DD日形式）
 */
export const formatDateJapanese = (date: string | Date | null | undefined): string => {
  return formatDateTime(date, 'YYYY年MM月DD日');
};

/**
 * 日時をフォーマットする（MM/DD HH:mm形式）- Figmaデザイン用
 */
export const formatDateTimeShort = (date: string | Date | null | undefined): string => {
  return formatDateTime(date, 'MM/DD HH:mm');
};
