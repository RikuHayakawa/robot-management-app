'use client';

import { useState } from 'react';
import { RobotTable } from '@/features/robots/components/RobotTable';
import { BasicButton } from '@/components/button/BasicButton';
import { RobotCreateModal } from '@/components/modal/RobotCreateModal';

export const RobotListTemplate = () => {
  const [createModalOpen, setCreateModalOpen] = useState(false);

  const handleCreateRobot = () => {
    setCreateModalOpen(true);
  };

  return (
    <div className="flex flex-col h-full p-6">
      {/* ヘッダー */}
      <div className="flex items-center justify-between mb-6">
        <h1 className="text-2xl font-semibold text-foreground">ロボット管理</h1>
        <BasicButton className="text-2xl font-bold" variant="primary" onClick={handleCreateRobot}>
          +
        </BasicButton>
      </div>

      {/* テーブル */}
      <div className="flex-1 overflow-auto">
        <RobotTable />
      </div>

      {/* 新規作成モーダル */}
      <RobotCreateModal open={createModalOpen} onClose={() => setCreateModalOpen(false)} />
    </div>
  );
};
