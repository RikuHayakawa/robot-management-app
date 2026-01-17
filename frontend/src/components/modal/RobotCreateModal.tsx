'use client';

import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { BaseModal } from './BaseModal';
import { TextField } from '../form/TextField';
import { ToggleField } from '../form/ToggleField';
import { BasicButton } from '../button/BasicButton';
import { LoadingButton } from '../button/LoadingButton';
import { useCreateRobot } from '@/features/robots/hooks/useCreateRobot';
import { robotCreateSchema, type RobotCreateFormData } from '@/features/robots/schemas';
import { useEffect } from 'react';

interface RobotCreateModalProps {
  open: boolean;
  onClose: () => void;
}

export const RobotCreateModal = ({ open, onClose }: RobotCreateModalProps) => {
  const { mutate: createRobot, isPending } = useCreateRobot();
  const {
    control,
    handleSubmit,
    reset,
    formState: { errors },
  } = useForm<RobotCreateFormData>({
    resolver: zodResolver(robotCreateSchema),
    defaultValues: {
      name: '',
      isActive: true,
    },
  });

  useEffect(() => {
    if (!open) {
      reset();
    }
  }, [open, reset]);

  const onSubmit = (data: RobotCreateFormData) => {
    createRobot(data, {
      onSuccess: () => {
        onClose();
        reset();
      },
      onError: (error) => {
        console.error('Failed to create robot:', error);
        // TODO: エラーメッセージを表示
      },
    });
  };

  return (
    <BaseModal open={open} onClose={onClose} maxWidth="md" className="bg-light-dark">
      <form onSubmit={handleSubmit(onSubmit)} className="flex flex-col gap-6">
        <h2 className="text-xl font-semibold text-foreground">新規ロボット登録</h2>

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
            登録
          </LoadingButton>
        </div>
      </form>
    </BaseModal>
  );
};
