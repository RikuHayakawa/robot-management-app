'use client';

import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { BaseModal } from './BaseModal';
import { TextField } from '../form/TextField';
import { ToggleField } from '../form/ToggleField';
import { BasicButton } from '../button/BasicButton';
import { LoadingButton } from '../button/LoadingButton';
import { useUpdateRobot } from '@/features/robots/hooks/useUpdateRobot';
import { robotUpdateSchema, type RobotUpdateFormData } from '@/features/robots/schemas';
import type { RobotWithDates } from '@/features/robots/types';
import { useEffect } from 'react';

interface RobotEditModalProps {
  open: boolean;
  onClose: () => void;
  robot: RobotWithDates | null;
}

export const RobotEditModal = ({ open, onClose, robot }: RobotEditModalProps) => {
  const { mutate: updateRobot, isPending } = useUpdateRobot();
  const {
    control,
    handleSubmit,
    reset,
    formState: { errors },
  } = useForm<RobotUpdateFormData>({
    resolver: zodResolver(robotUpdateSchema),
    defaultValues: {
      name: '',
      isActive: true,
    },
  });

  useEffect(() => {
    if (robot && open) {
      reset({
        name: robot.name,
        isActive: robot.isActive,
      });
    }
  }, [robot, open, reset]);

  useEffect(() => {
    if (!open) {
      reset();
    }
  }, [open, reset]);

  const onSubmit = (data: RobotUpdateFormData) => {
    if (!robot) return;

    updateRobot(
      {
        id: robot.id,
        data: {
          name: data.name,
          isActive: data.isActive,
        },
      },
      {
        onSuccess: () => {
          onClose();
          reset();
        },
        onError: (error) => {
          console.error('Failed to update robot:', error);
          // TODO: エラーメッセージを表示
        },
      },
    );
  };

  if (!robot) return null;

  return (
    <BaseModal open={open} onClose={onClose} maxWidth="md" className="bg-light-dark">
      <form onSubmit={handleSubmit(onSubmit)} className="flex flex-col gap-6">
        <h2 className="text-xl font-semibold text-foreground">ロボット編集</h2>

        <TextField
          name="name"
          control={control}
          label="ロボット名"
          placeholder="例: AGV-001"
          required
          className="[&_label]:text-foreground [&_input]:bg-light-dark [&_input]:text-foreground [&_input]:border-subtle [&_input]:placeholder:text-muted"
        />

        <ToggleField
          name="isActive"
          control={control}
          label="アクティブ"
          className="[&_label]:text-foreground"
        />

        <div className="flex justify-end gap-3">
          <BasicButton
            type="button"
            variant="secondary"
            onClick={onClose}
            disabled={isPending}
            className="bg-transparent text-muted hover:text-foreground hover:bg-hover"
          >
            キャンセル
          </BasicButton>
          <LoadingButton type="submit" variant="primary" isLoading={isPending}>
            更新
          </LoadingButton>
        </div>
      </form>
    </BaseModal>
  );
};
