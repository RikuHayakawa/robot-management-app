'use client';

import { useState } from 'react';
import { Table, type TableColumn } from '@/components/table/Table';
import { StatusBadge } from '@/components/StatusBadge';
import { EyeIcon } from '@/components/svg/EyeIcon';
import { PencilIcon } from '@/components/svg/PencilIcon';
import { TrashIcon } from '@/components/svg/TrashIcon';
import { formatDateTimeShort } from '@/utils/formatDateTime';
import { useRobots } from '../hooks/useRobots';
import type { RobotWithDates } from '../types';
import { useRouter } from 'next/navigation';
import { appPaths } from '@/constants/appPaths';
import { Loading } from '@/components/common/Loading';
import { RobotEditModal } from '@/components/modal/RobotEditModal';

export const RobotTable = () => {
  const { data: robots, isLoading } = useRobots();
  const router = useRouter();
  const [editModalOpen, setEditModalOpen] = useState(false);
  const [selectedRobot, setSelectedRobot] = useState<RobotWithDates | null>(null);

  if (isLoading) {
    return <Loading />;
  }

  if (!robots || robots.length === 0) {
    return (
      <div className="flex items-center justify-center py-12 text-muted">
        ロボットが見つかりませんでした
      </div>
    );
  }

  const handleView = (robot: RobotWithDates) => {
    router.push(appPaths.robotDetail(String(robot.id)));
  };

  const handleEdit = (robot: RobotWithDates) => {
    setSelectedRobot(robot);
    setEditModalOpen(true);
  };

  const handleDelete = (robot: RobotWithDates) => {
    // TODO: 削除確認モーダルを開く
    console.log('Delete robot:', robot.id);
  };

  const columns: TableColumn<RobotWithDates>[] = [
    {
      key: 'id',
      label: 'ID',
      className: 'text-center',
    },
    {
      key: 'name',
      label: 'ロボット名',
    },
    {
      key: 'status',
      label: 'ステータス',
      render: (robot) => <StatusBadge status={robot.isActive ? 'active' : 'inactive'} />,
    },
    {
      key: 'updatedAt',
      label: '最終更新',
      render: (robot) => (
        <span className="text-muted">{formatDateTimeShort(robot.updatedAt) || '-'}</span>
      ),
    },
    {
      key: 'createdAt',
      label: '作成日',
      render: (robot) => (
        <span className="text-muted">{formatDateTimeShort(robot.createdAt) || '-'}</span>
      ),
    },
    {
      key: 'actions',
      label: '操作',
      render: (robot) => (
        <div className="flex items-center gap-3">
          <button
            onClick={(e) => {
              e.stopPropagation();
              handleView(robot);
            }}
            className="text-white hover:opacity-80 transition-opacity"
            aria-label="閲覧"
          >
            <EyeIcon className="size-5" />
          </button>
          <button
            onClick={(e) => {
              e.stopPropagation();
              handleEdit(robot);
            }}
            className="text-white hover:opacity-80 transition-opacity"
            aria-label="編集"
          >
            <PencilIcon className="size-5" />
          </button>
          <button
            onClick={(e) => {
              e.stopPropagation();
              handleDelete(robot);
            }}
            className="text-destructive hover:opacity-80 transition-opacity"
            aria-label="削除"
          >
            <TrashIcon className="size-5" />
          </button>
        </div>
      ),
    },
  ];

  return (
    <>
      <Table columns={columns} data={robots} />
      <RobotEditModal
        open={editModalOpen}
        onClose={() => {
          setEditModalOpen(false);
          setSelectedRobot(null);
        }}
        robot={selectedRobot}
      />
    </>
  );
};
