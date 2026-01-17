import { z } from 'zod';

export const robotCreateSchema = z.object({
  name: z.string().min(1, 'ロボット名は必須です'),
  isActive: z.boolean(),
});

export const robotUpdateSchema = z.object({
  name: z.string().min(1, 'ロボット名は必須です').optional(),
  isActive: z.boolean().optional(),
});

export type RobotCreateFormData = z.infer<typeof robotCreateSchema>;
export type RobotUpdateFormData = z.infer<typeof robotUpdateSchema>;
