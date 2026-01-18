'use client';

import { BaseModal } from './BaseModal';
import { BasicButton } from '../button/BasicButton';
import { LoadingButton } from '../button/LoadingButton';
import { useDeleteRobot } from '@/features/robots/hooks/useDeleteRobot';
import type { RobotWithDates } from '@/features/robots/types';

interface RobotDeleteModalProps {
  open: boolean;
  onClose: () => void;
  robot: RobotWithDates | null;
}

export const RobotDeleteModal = ({ open, onClose, robot }: RobotDeleteModalProps) => {
  const { mutate: deleteRobot, isPending } = useDeleteRobot();

  const handleDelete = () => {
    if (!robot) return;

    deleteRobot(robot.id, {
      onSuccess: () => {
        onClose();
      },
      onError: (error) => {
        console.error('Failed to delete robot:', error);
        // TODO: エラーメッセージを表示
      },
    });
  };

  if (!robot) return null;

  return (
    <BaseModal open={open} onClose={onClose} maxWidth="md" className="bg-light-dark">
      <div className="flex flex-col gap-6">
        <h2 className="text-xl font-semibold text-foreground">ロボット削除</h2>

        <div className="flex flex-col gap-2">
          <p className="text-foreground">
            このロボットを削除してもよろしいですか？この操作は取り消せません。
          </p>
          <p className="text-muted">
            削除対象: <span className="font-semibold text-foreground">{robot.name}</span>
          </p>
        </div>

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
          <LoadingButton
            type="button"
            variant="destructive"
            onClick={handleDelete}
            isLoading={isPending}
          >
            削除
          </LoadingButton>
        </div>
      </div>
    </BaseModal>
  );
};
