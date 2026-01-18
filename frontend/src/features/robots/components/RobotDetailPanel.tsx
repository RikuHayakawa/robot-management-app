'use client';

import { StatusBadge } from '@/components/StatusBadge';
import { BatteryIcon } from '@/components/svg/BatteryIcon';
import { formatDateTimeWithTime } from '@/utils/formatDateTime';
import type { RobotResponse } from '../hooks/useRobot';
import type { NodeResponse } from '../hooks/useNodes';
import type { WaypointLogResponse } from '../hooks/useWaypointLogs';

interface RobotDetailPanelProps {
  robot: RobotResponse;
  nodes: NodeResponse[];
  waypointLogs: WaypointLogResponse[];
}

export const RobotDetailPanel = ({ robot, nodes, waypointLogs }: RobotDetailPanelProps) => {
  // 最新のwaypointLogから現在位置とバッテリーを取得
  const latestLog = waypointLogs[0];
  const currentNode = latestLog ? nodes.find((n) => n.id === latestLog.nodeId) : null;
  const currentBattery = latestLog?.battery ?? 0;

  return (
    <div className="space-y-6">
      {/* ロボット名 */}
      <h2 className="text-2xl font-semibold text-foreground">{robot.name}</h2>

      {/* 詳細情報グリッド */}
      <div className="grid grid-cols-2 gap-4">
        <div>
          <div className="text-sm text-muted mb-1">ロボットID</div>
          <div className="text-base text-foreground">{robot.id}</div>
        </div>
        <div>
          <div className="text-sm text-muted mb-1">ステータス</div>
          <StatusBadge status={robot.isActive ? 'active' : 'inactive'} />
        </div>
        <div>
          <div className="text-sm text-muted mb-1">現在位置</div>
          <div className="text-base text-foreground">{currentNode?.name ?? '-'}</div>
        </div>
        <div>
          <div className="text-sm text-muted mb-1">作成日</div>
          <div className="text-base text-foreground">
            {robot.createdAt ? formatDateTimeWithTime(robot.createdAt) : '-'}
          </div>
        </div>
        <div>
          <div className="text-sm text-muted mb-1">最終更新</div>
          <div className="text-base text-foreground">
            {robot.updatedAt ? formatDateTimeWithTime(robot.updatedAt) : '-'}
          </div>
        </div>
      </div>

      {/* バッテリー残量 */}
      <div>
        <div className="text-sm text-muted mb-2">バッテリー残量</div>
        <div className="flex items-center gap-2">
          <div className="flex-1 bg-bg-light-dark rounded-full h-2 overflow-hidden">
            <div
              className="h-full bg-secondary transition-all"
              style={{ width: `${currentBattery}%` }}
            />
          </div>
          <div className="flex items-center gap-1">
            <BatteryIcon className="w-4 h-4 text-secondary" />
            <span className="text-base text-foreground font-medium">{currentBattery}%</span>
          </div>
        </div>
      </div>
    </div>
  );
};
