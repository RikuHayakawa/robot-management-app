'use client';

import { Table, type TableColumn } from '@/components/table/Table';
import { BatteryIcon } from '@/components/svg/BatteryIcon';
import { formatDateTimeWithTime } from '@/utils/formatDateTime';
import type { WaypointLogWithNode } from '@/api';

interface WaypointLogTableProps {
  waypointLogs: WaypointLogWithNode[];
}

export const WaypointLogTable = ({ waypointLogs }: WaypointLogTableProps) => {
  const columns: TableColumn<WaypointLogWithNode>[] = [
    {
      key: 'node',
      label: 'ノード',
      render: (log) => <span className="text-foreground">{log.node.name}</span>,
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
