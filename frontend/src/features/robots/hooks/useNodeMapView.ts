'use client';

import { useCallback, useEffect, useState } from 'react';

const ZOOM_MIN = 0.25;
const ZOOM_MAX = 5;
const ZOOM_FACTOR = 1.2;

export const useNodeMapView = () => {
  const [userZoom, setUserZoom] = useState(1);
  const [userPanX, setUserPanX] = useState(0);
  const [userPanY, setUserPanY] = useState(0);
  const [isDragging, setIsDragging] = useState(false);
  const [dragStart, setDragStart] = useState<{
    clientX: number;
    clientY: number;
    panX: number;
    panY: number;
  } | null>(null);

  const zoomIn = useCallback(() => {
    setUserZoom((z) => Math.min(ZOOM_MAX, z * ZOOM_FACTOR));
  }, []);

  const zoomOut = useCallback(() => {
    setUserZoom((z) => Math.max(ZOOM_MIN, z / ZOOM_FACTOR));
  }, []);

  const reset = useCallback(() => {
    setUserZoom(1);
    setUserPanX(0);
    setUserPanY(0);
  }, []);

  const applyWheelDelta = useCallback((deltaY: number) => {
    setUserZoom((z) => {
      const delta = -deltaY * 0.002;
      return Math.max(ZOOM_MIN, Math.min(ZOOM_MAX, z * (1 + delta)));
    });
  }, []);

  const onMouseDown = useCallback((e: React.MouseEvent) => {
    if (e.button !== 0) return;
    setIsDragging(true);
    setDragStart({
      clientX: e.clientX,
      clientY: e.clientY,
      panX: userPanX,
      panY: userPanY,
    });
  }, [userPanX, userPanY]);

  useEffect(() => {
    if (!isDragging || !dragStart) return;

    const onMouseMove = (e: MouseEvent) => {
      setUserPanX(dragStart.panX + (e.clientX - dragStart.clientX));
      setUserPanY(dragStart.panY + (e.clientY - dragStart.clientY));
    };

    const onMouseUp = () => {
      setIsDragging(false);
      setDragStart(null);
    };

    window.addEventListener('mousemove', onMouseMove);
    window.addEventListener('mouseup', onMouseUp);
    return () => {
      window.removeEventListener('mousemove', onMouseMove);
      window.removeEventListener('mouseup', onMouseUp);
    };
  }, [isDragging, dragStart]);

  return {
    userZoom,
    userPanX,
    userPanY,
    zoomIn,
    zoomOut,
    reset,
    applyWheelDelta,
    onMouseDown,
    isDragging,
  };
};
