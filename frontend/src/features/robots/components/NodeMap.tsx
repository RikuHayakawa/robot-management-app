'use client';

import { useMemo } from 'react';
import type { NodeResponse } from '../hooks/useNodes';
import type { WaypointLogResponse } from '../hooks/useWaypointLogs';

interface NodeMapProps {
  nodes: NodeResponse[];
  waypointLogs: WaypointLogResponse[];
  currentNodeId?: number;
}

export const NodeMap = ({ nodes, waypointLogs, currentNodeId }: NodeMapProps) => {
  // ノードの座標範囲を計算してスケーリング
  const { minX, minY, maxX, maxY, scale, offsetX, offsetY } = useMemo(() => {
    if (nodes.length === 0) {
      return { minX: 0, minY: 0, maxX: 100, maxY: 100, scale: 1, offsetX: 0, offsetY: 0 };
    }

    const xs = nodes.map((n) => n.x);
    const ys = nodes.map((n) => n.y);
    const minX = Math.min(...xs);
    const minY = Math.min(...ys);
    const maxX = Math.max(...xs);
    const maxY = Math.max(...ys);

    // マップのサイズ（パディング含む）
    const mapWidth = 600;
    const mapHeight = 400;
    const padding = 40;

    const width = maxX - minX || 100;
    const height = maxY - minY || 100;

    const scaleX = (mapWidth - padding * 2) / width;
    const scaleY = (mapHeight - padding * 2) / height;
    const scale = Math.min(scaleX, scaleY, 1); // 拡大しない

    const offsetX = padding - minX * scale;
    const offsetY = padding - minY * scale;

    return { minX, minY, maxX, maxY, scale, offsetX, offsetY };
  }, [nodes]);

  // 移動経路を計算（waypointLogsの順序に基づく）
  const pathPoints = useMemo(() => {
    return waypointLogs
      .map((log) => {
        const node = nodes.find((n) => n.id === log.nodeId);
        if (!node) return null;
        return {
          x: node.x * scale + offsetX,
          y: node.y * scale + offsetY,
        };
      })
      .filter((point): point is { x: number; y: number } => point !== null);
  }, [waypointLogs, nodes, scale, offsetX, offsetY]);

  // パス文字列を生成
  const pathString = useMemo(() => {
    if (pathPoints.length === 0) return '';
    return pathPoints
      .map((point, index) => `${index === 0 ? 'M' : 'L'} ${point.x} ${point.y}`)
      .join(' ');
  }, [pathPoints]);

  return (
    <div className="w-full h-full bg-bg-light-dark rounded-lg p-4">
      <div className="mb-4">
        <h3 className="text-lg font-semibold text-foreground mb-2">ノードマップ</h3>
        <div className="flex flex-wrap gap-4 text-sm text-muted">
          <div className="flex items-center gap-2">
            <div className="w-3 h-3 rounded-full bg-primary"></div>
            <span>青:現在位置</span>
          </div>
          <div className="flex items-center gap-2">
            <div className="w-3 h-3 rounded-full bg-gray-500"></div>
            <span>灰:移動経路</span>
          </div>
          <div className="flex items-center gap-2">
            <div className="w-3 h-3 rounded-full bg-white"></div>
            <span>白:ノード</span>
          </div>
        </div>
      </div>
      <div className="w-full h-[400px] bg-bg-dark rounded">
        <svg width="100%" height="100%" viewBox="0 0 600 400" className="overflow-visible">
          {/* 移動経路 */}
          {pathString && (
            <path
              d={pathString}
              fill="none"
              stroke="#6B7280"
              strokeWidth="2"
              strokeLinecap="round"
              strokeLinejoin="round"
            />
          )}

          {/* ノード */}
          {nodes.map((node) => {
            const x = node.x * scale + offsetX;
            const y = node.y * scale + offsetY;
            const isCurrent = currentNodeId === node.id;
            const radius = isCurrent ? 8 : 6;
            const fill = isCurrent ? '#3b82f6' : '#ffffff';

            return (
              <g key={node.id}>
                <circle cx={x} cy={y} r={radius} fill={fill} stroke="#1c1c1c" strokeWidth="1" />
                <text
                  x={x}
                  y={y + radius + 12}
                  textAnchor="middle"
                  className="text-xs fill-foreground"
                  fontSize="10"
                >
                  {node.name}
                </text>
              </g>
            );
          })}
        </svg>
      </div>
    </div>
  );
};
