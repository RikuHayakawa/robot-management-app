'use client';

import { useEffect, useMemo, useRef } from 'react';
import { useNodeMapView } from '../hooks/useNodeMapView';
import type { Node, WaypointLogWithNode } from '@/api';

const GRID_CANDIDATES = [1, 2, 5, 10, 20, 50, 100, 200, 500];

function getGridStep(minX: number, minY: number, maxX: number, maxY: number): number {
  const range = Math.max(maxX - minX, maxY - minY) || 100;
  const raw = range / 10;
  return GRID_CANDIDATES.find((c) => c >= raw) ?? 500;
}

interface NodeMapProps {
  nodes: Node[];
  waypointLogs: WaypointLogWithNode[];
  currentNodeId?: number;
}

export const NodeMap = ({ nodes, waypointLogs, currentNodeId }: NodeMapProps) => {
  const { userZoom, userPanX, userPanY, zoomIn, zoomOut, reset, applyWheelDelta, onMouseDown, isDragging } =
    useNodeMapView();
  const mapContainerRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const el = mapContainerRef.current;
    if (!el) return;
    const handler = (e: WheelEvent) => {
      e.preventDefault();
      applyWheelDelta(e.deltaY);
    };
    el.addEventListener('wheel', handler, { passive: false });
    return () => el.removeEventListener('wheel', handler);
  }, [applyWheelDelta]);

  // ノードの座標範囲を計算してベースのスケーリングを算出（拡大の cap を削除）
  const { minX, minY, maxX, maxY, scaleBase, offsetXBase, offsetYBase, gridStep } = useMemo(() => {
    if (nodes.length === 0) {
      return {
        minX: 0,
        minY: 0,
        maxX: 100,
        maxY: 100,
        scaleBase: 1,
        offsetXBase: 0,
        offsetYBase: 0,
        gridStep: 50,
      };
    }

    const xs = nodes.map((n) => n.position.x);
    const ys = nodes.map((n) => n.position.y);
    const minX = Math.min(...xs);
    const minY = Math.min(...ys);
    const maxX = Math.max(...xs);
    const maxY = Math.max(...ys);

    const mapWidth = 600;
    const mapHeight = 400;
    const padding = 70;

    const width = maxX - minX || 100;
    const height = maxY - minY || 100;

    const scaleX = (mapWidth - padding * 2) / width;
    const scaleY = (mapHeight - padding * 2) / height;
    const scaleBase = Math.min(scaleX, scaleY);

    const offsetXBase = padding - minX * scaleBase;
    const offsetYBase = padding - minY * scaleBase;
    const gridStep = getGridStep(minX, minY, maxX, maxY);

    return { minX, minY, maxX, maxY, scaleBase, offsetXBase, offsetYBase, gridStep };
  }, [nodes]);

  const scale = scaleBase * userZoom;
  const offsetX = offsetXBase + userPanX;
  const offsetY = offsetYBase + userPanY;

  // 格子線（世界座標を SVG 座標に変換）
  const gridLines = useMemo(() => {
    const xStart = Math.floor(minX / gridStep) * gridStep;
    const xEnd = Math.ceil(maxX / gridStep) * gridStep;
    const yStart = Math.floor(minY / gridStep) * gridStep;
    const yEnd = Math.ceil(maxY / gridStep) * gridStep;

    const lines: { x1: number; y1: number; x2: number; y2: number }[] = [];

    for (let x = xStart; x <= xEnd; x += gridStep) {
      const sx = x * scale + offsetX;
      const sy1 = yStart * scale + offsetY;
      const sy2 = yEnd * scale + offsetY;
      lines.push({ x1: sx, y1: sy1, x2: sx, y2: sy2 });
    }

    for (let y = yStart; y <= yEnd; y += gridStep) {
      const sy = y * scale + offsetY;
      const sx1 = xStart * scale + offsetX;
      const sx2 = xEnd * scale + offsetX;
      lines.push({ x1: sx1, y1: sy, x2: sx2, y2: sy });
    }

    return lines;
  }, [minX, minY, maxX, maxY, gridStep, scale, offsetX, offsetY]);

  // 移動経路を計算（waypointLogsの順序に基づく。log.node を使用、nodes/list による照合は行わない）
  const pathPoints = useMemo(() => {
    return waypointLogs.map((log) => ({
      x: log.node.position.x * scale + offsetX,
      y: log.node.position.y * scale + offsetY,
    }));
  }, [waypointLogs, scale, offsetX, offsetY]);

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
            <span>青:最終地点</span>
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
      <div
        ref={mapContainerRef}
        className="w-full h-[400px] bg-bg-dark rounded relative select-none"
        style={{ cursor: isDragging ? 'grabbing' : 'grab' }}
        onMouseDown={onMouseDown}
      >
        <svg width="100%" height="100%" viewBox="0 0 600 400" className="overflow-hidden">
          {/* 格子（最背面） */}
          <g stroke="#2a2a2a" strokeOpacity="0.6" strokeWidth="0.5">
            {gridLines.map((line, i) => (
              <line
                key={i}
                x1={line.x1}
                y1={line.y1}
                x2={line.x2}
                y2={line.y2}
              />
            ))}
          </g>

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
            const x = node.position.x * scale + offsetX;
            const y = node.position.y * scale + offsetY;
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

        {/* ズーム用 UI */}
        <div className="absolute bottom-2 right-2 flex gap-1" onMouseDown={(e) => e.stopPropagation()}>
          <button
            type="button"
            onClick={zoomIn}
            className="w-8 h-8 rounded bg-bg-dark/90 hover:bg-bg-dark text-foreground text-sm font-medium border border-subtle flex items-center justify-center"
            aria-label="拡大"
          >
            +
          </button>
          <button
            type="button"
            onClick={zoomOut}
            className="w-8 h-8 rounded bg-bg-dark/90 hover:bg-bg-dark text-foreground text-sm font-medium border border-subtle flex items-center justify-center"
            aria-label="縮小"
          >
            −
          </button>
          <button
            type="button"
            onClick={reset}
            className="w-8 h-8 rounded bg-bg-dark/90 hover:bg-bg-dark text-foreground text-sm font-medium border border-subtle flex items-center justify-center"
            aria-label="リセット"
            title="リセット"
          >
            ↺
          </button>
        </div>
      </div>
    </div>
  );
};
