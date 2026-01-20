'use client';

import { useRouter } from 'next/navigation';
import { RobotDetailPanel } from '@/features/robots/components/RobotDetailPanel';
import { WaypointLogTable } from '@/features/waypoint-logs/components/WaypointLogTable';
import { NodeMap } from '@/features/nodes/components/NodeMap';
import { useRobot } from '@/features/robots/hooks/useRobot';
import { useWaypointLogs } from '@/features/waypoint-logs/hooks/useWaypointLogs';
import { useNodes } from '@/features/nodes/hooks/useNodes';
import { Loading } from '@/components/common/Loading';
import { appPaths } from '@/constants/appPaths';

interface RobotDetailTemplateProps {
  robotId: number;
}

export const RobotDetailTemplate = ({ robotId }: RobotDetailTemplateProps) => {
  const router = useRouter();
  const { data: robot, isLoading: isLoadingRobot, error: robotError } = useRobot(robotId);
  const { data: waypointLogs = [], isLoading: isLoadingLogs } = useWaypointLogs(robotId);
  const { data: nodes = [], isLoading: isLoadingNodes } = useNodes();

  const isLoading = isLoadingRobot || isLoadingLogs || isLoadingNodes;
  const currentNodeId = waypointLogs[0]?.nodeId;

  if (isLoading) {
    return <Loading />;
  }

  if (robotError || !robot) {
    return (
      <div className="flex items-center justify-center h-full">
        <div className="text-center">
          <p className="text-destructive mb-4">ロボットの取得に失敗しました</p>
          <button
            onClick={() => router.push(appPaths.robots)}
            className="text-primary hover:underline"
          >
            一覧に戻る
          </button>
        </div>
      </div>
    );
  }

  return (
    <div className="flex flex-col h-full p-6">
      {/* ヘッダー */}
      <div className="mb-6">
        <button
          onClick={() => router.push(appPaths.robots)}
          className="text-muted hover:text-foreground transition-colors mb-4 flex items-center gap-2"
        >
          <span>←</span>
          <span>一覧に戻る</span>
        </button>
      </div>

      {/* メインコンテンツ - 2カラムレイアウト */}
      <div className="flex-1 grid grid-cols-1 lg:grid-cols-2 gap-6 overflow-hidden">
        {/* ロボット詳細情報と走行履歴 */}
        <div className="flex flex-col gap-6 overflow-hidden">
          {/* ロボット詳細情報 */}
          <div className="bg-bg-light-dark rounded-lg p-6">
            <RobotDetailPanel robot={robot} waypointLogs={waypointLogs} />
          </div>

          {/* 走行履歴 */}
          <div className="flex-1 flex flex-col bg-bg-light-dark rounded-lg p-6 overflow-hidden">
            <h3 className="text-lg font-semibold text-foreground mb-4">走行履歴</h3>
            <div className="flex-1 overflow-auto">
              <WaypointLogTable waypointLogs={waypointLogs} />
            </div>
          </div>
        </div>

        {/* ノードマップ */}
        <div className="flex-1 overflow-hidden">
          <NodeMap nodes={nodes} waypointLogs={waypointLogs} currentNodeId={currentNodeId} />
        </div>
      </div>
    </div>
  );
};
