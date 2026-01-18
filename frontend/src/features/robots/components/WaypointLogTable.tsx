'use client';

import { Table, type TableColumn } from '@/components/table/Table';
import { BatteryIcon } from '@/components/svg/BatteryIcon';
import { formatDateTimeWithTime } from '@/utils/formatDateTime';
import type { WaypointLogResponse } from '../hooks/useWaypointLogs';
import type { NodeResponse } from '../hooks/useNodes';

interface WaypointLogTableProps {
  waypointLogs: WaypointLogResponse[];
  nodes: NodeResponse[];
}

export const WaypointLogTable = ({ waypointLogs, nodes }: WaypointLogTableProps) => {
  const getNodeName = (nodeId: number): string => {
    const node = nodes.find((n) => n.id === nodeId);
    return node?.name ?? `Node ${nodeId}`;
  };

  const columns: TableColumn<WaypointLogResponse>[] = [
    {
      key: 'node',
      label: 'ノード',
      render: (log) => <span className="text-foreground">{getNodeName(log.nodeId)}</span>,
    },
    {
      key: 'battery',
      label: 'バッテリー',
      render: (log) => (
        <div className="flex items-center gap-1">
          <BatteryIcon className="w-4 h-4 text-secondary" />
          <span className="text-foreground">{log.battery}%</span>
        </div>
      ),
    },
    {
      key: 'timestamp',
      label: '到達時刻',
      render: (log) => (
        <span className="text-foreground">{formatDateTimeWithTime(log.timestamp)}</span>
      ),
    },
  ];

  return <Table columns={columns} data={waypointLogs} />;
};
