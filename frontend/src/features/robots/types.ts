import type { components } from '@/api/rest/types';

export type RobotResponse = components['schemas']['RobotResponse'];

export type RobotWithDates = RobotResponse & {
  createdAt?: string;
  updatedAt?: string;
};
