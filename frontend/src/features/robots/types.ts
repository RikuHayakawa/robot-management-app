import type { ApiSchemaComponents } from '@/api/rest/types';

export type Robot = ApiSchemaComponents['schemas']['RobotResponse'];

/** 一覧・モーダル用（createdAt / updatedAt を含む Robot の別名） */
export type RobotWithDates = Robot;

export type RobotFormData = {
  name: string;
  isActive: boolean;
};
