'use client';

import { RobotTable } from '@/features/robots/components/RobotTable';
import { BasicButton } from '@/components/button/BasicButton';

export const RobotListTemplate = () => {
  const handleCreateRobot = () => {
    // TODO: 新規ロボット登録モーダルを開く
    console.log('Create new robot');
  };

  return (
    <div className="flex flex-col h-full p-6">
      {/* ヘッダー */}
      <div className="flex items-center justify-between mb-6">
        <h1 className="text-2xl font-semibold text-foreground">ロボット管理</h1>
        <BasicButton variant="primary" onClick={handleCreateRobot}>
          新規ロボット登録
        </BasicButton>
      </div>

      {/* テーブル */}
      <div className="flex-1 overflow-auto">
        <RobotTable />
      </div>
    </div>
  );
};
