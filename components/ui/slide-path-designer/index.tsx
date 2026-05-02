"use client";

import { useRef } from "react";
import { isSlidePathDesignerEnabled } from "./config";
import { useSlidePathDesigner } from "./use-slide-path-designer";
import { SlidePathDesignerCanvas } from "./slide-path-designer-canvas";
import { SlidePathDesignerPanel } from "./slide-path-designer-panel";

interface SlidePathDesignerProps {
  slideKey: string;
  enabled?: boolean;
  label?: string;
  className?: string;
}

export function SlidePathDesigner({ slideKey, enabled, label, className }: SlidePathDesignerProps) {
  const isActive = typeof enabled === "boolean" ? enabled : isSlidePathDesignerEnabled(slideKey);
  const interactiveRef = useRef<HTMLDivElement>(null);

  const {
    points,
    cursor,
    copied,
    pathData,
    copyPath,
    updateCursor,
    clearCursor,
    addPoint,
    undoPoint,
    resetPoints,
  } = useSlidePathDesigner(slideKey, isActive);

  if (!isActive) {
    return null;
  }

  return (
    <div className={`absolute inset-0 z-40 ${className ?? ""}`}>
      <SlidePathDesignerCanvas
        interactiveRef={interactiveRef}
        slideKey={slideKey}
        pathData={pathData}
        points={points}
        cursor={cursor}
        onPointerDown={addPoint}
        onPointerMove={updateCursor}
        onPointerLeave={clearCursor}
      />
      <SlidePathDesignerPanel
        slideKey={slideKey}
        label={label}
        points={points}
        pathData={pathData}
        copied={copied}
        onCopyPath={copyPath}
        onUndoPoint={undoPoint}
        onResetPoints={resetPoints}
      />
    </div>
  );
}
