"use client";

import { useCallback, useEffect, useMemo, useRef, useState } from "react";
import { createPortal } from "react-dom";

type Point = { x: number; y: number; sectionId: string };

const persianDigits = ["۰", "۱", "۲", "۳", "۴", "۵", "۶", "۷", "۸", "۹"] as const;

const toPersianNumber = (value: number | string) =>
  value
    .toString()
    .split("")
    .map((char) => {
      const index = Number(char);
      if (Number.isNaN(index)) return char;
      return persianDigits[index] ?? char;
    })
    .join("");

const toPathData = (points: Point[], sectionOffsets: Map<string, number>) => {
  if (!points.length) return "";
  if (points.length === 1) {
    const [first] = points;
    const offset = sectionOffsets.get(first.sectionId) ?? 0;
    return `M ${first.x.toFixed(2)} ${(first.y + offset).toFixed(2)}`;
  }

  const adjustedPoints = points.map((p) => ({
    x: p.x,
    y: p.y + (sectionOffsets.get(p.sectionId) ?? 0),
  }));

  const segments = [`M ${adjustedPoints[0].x.toFixed(2)} ${adjustedPoints[0].y.toFixed(2)}`];

  for (let i = 0; i < adjustedPoints.length - 1; i += 1) {
    const p0 = adjustedPoints[i - 1] ?? adjustedPoints[i];
    const p1 = adjustedPoints[i];
    const p2 = adjustedPoints[i + 1];
    const p3 = adjustedPoints[i + 2] ?? p2;

    const cp1x = p1.x + (p2.x - p0.x) / 6;
    const cp1y = p1.y + (p2.y - p0.y) / 6;
    const cp2x = p2.x - (p3.x - p1.x) / 6;
    const cp2y = p2.y - (p3.y - p1.y) / 6;

    segments.push(
      `C ${cp1x.toFixed(2)} ${cp1y.toFixed(2)} ${cp2x.toFixed(2)} ${cp2y.toFixed(2)} ${p2.x.toFixed(2)} ${p2.y.toFixed(2)}`,
    );
  }

  return segments.join(" ");
};

interface MultiSectionPathDesignerProps {
  sectionIds: string[];
  storageKey: string;
  enabled?: boolean;
  label?: string;
}

export function MultiSectionPathDesigner({
  sectionIds,
  storageKey,
  enabled = true,
  label = "طراح مسیر چند بخشی",
}: MultiSectionPathDesignerProps) {
  const [points, setPoints] = useState<Point[]>([]);
  const [sectionOffsets, setSectionOffsets] = useState<Map<string, number>>(new Map());
  const [cursor, setCursor] = useState<{ x: number; y: number; sectionId: string } | null>(null);
  const [copied, setCopied] = useState(false);
  const sectionsRef = useRef<Map<string, HTMLElement>>(new Map());

  // Calculate section offsets
  useEffect(() => {
    if (!enabled) return;

    const updateOffsets = () => {
      const offsets = new Map<string, number>();
      const firstSection = document.getElementById(sectionIds[0]);
      const firstTop = firstSection?.offsetTop ?? 0;

      sectionIds.forEach((id) => {
        const el = document.getElementById(id);
        if (el) {
          sectionsRef.current.set(id, el);
          offsets.set(id, el.offsetTop - firstTop);
        }
      });

      setSectionOffsets(offsets);
    };

    updateOffsets();
    window.addEventListener("resize", updateOffsets);
    window.addEventListener("scroll", updateOffsets);

    return () => {
      window.removeEventListener("resize", updateOffsets);
      window.removeEventListener("scroll", updateOffsets);
    };
  }, [sectionIds, enabled]);

  // Load saved points
  useEffect(() => {
    if (typeof window === "undefined") return;
    const saved = window.localStorage.getItem(storageKey);
    if (!saved) return;

    try {
      const parsed = JSON.parse(saved);
      if (Array.isArray(parsed)) {
        setPoints(parsed);
      }
    } catch {
      window.localStorage.removeItem(storageKey);
    }
  }, [storageKey]);

  // Save points
  useEffect(() => {
    if (typeof window === "undefined") return;
    window.localStorage.setItem(storageKey, JSON.stringify(points));
  }, [points, storageKey]);

  // Handle copied state
  useEffect(() => {
    if (!copied) return;
    const timeout = window.setTimeout(() => setCopied(false), 1600);
    return () => window.clearTimeout(timeout);
  }, [copied]);

  // Keyboard shortcuts
  useEffect(() => {
    if (!enabled) return;

    const handleKeyDown = (event: KeyboardEvent) => {
      if (event.key === "Backspace") {
        event.preventDefault();
        setPoints((prev) => prev.slice(0, -1));
      }
      if (event.key === "Escape") {
        event.preventDefault();
        setPoints([]);
      }
      if ((event.metaKey || event.ctrlKey) && event.key.toLowerCase() === "c") {
        event.preventDefault();
        void copyPath();
      }
    };

    window.addEventListener("keydown", handleKeyDown);
    return () => window.removeEventListener("keydown", handleKeyDown);
  });

  const pathData = useMemo(() => toPathData(points, sectionOffsets), [points, sectionOffsets]);

  const getSectionFromPoint = useCallback(
    (clientY: number): string | null => {
      for (const [id, el] of sectionsRef.current.entries()) {
        const rect = el.getBoundingClientRect();
        if (clientY >= rect.top && clientY <= rect.bottom) {
          return id;
        }
      }
      return null;
    },
    [],
  );

  const addPoint = useCallback(
    (event: React.PointerEvent<HTMLDivElement>) => {
      if (!enabled || event.button !== 0) return;
      event.preventDefault();

      const sectionId = getSectionFromPoint(event.clientY);
      if (!sectionId) return;

      const section = sectionsRef.current.get(sectionId);
      if (!section) return;

      const rect = section.getBoundingClientRect();
      const x = event.clientX - rect.left;
      const y = event.clientY - rect.top;

      setPoints((prev) => [...prev, { x: Number(x.toFixed(2)), y: Number(y.toFixed(2)), sectionId }]);
    },
    [enabled, getSectionFromPoint],
  );

  const copyPath = useCallback(async () => {
    if (!pathData) return;

    try {
      if (typeof navigator !== "undefined" && navigator.clipboard?.writeText) {
        await navigator.clipboard.writeText(pathData);
        setCopied(true);
      }
    } catch (error) {
      console.error(error);
    }
  }, [pathData]);

  if (!enabled) return null;

  return (
    <>
      {/* Render overlay for each section using portals */}
      {sectionIds.map((sectionId) => {
        const section = sectionsRef.current.get(sectionId);
        if (!section) return null;

        const overlay = (
          <MultiSectionOverlay
            key={sectionId}
            sectionId={sectionId}
            points={points}
            sectionOffsets={sectionOffsets}
            allPoints={points}
            onPointerDown={addPoint}
            onPointerMove={(e) => {
              const rect = section.getBoundingClientRect();
              const x = e.clientX - rect.left;
              const y = e.clientY - rect.top;
              setCursor({ x: Number(x.toFixed(2)), y: Number(y.toFixed(2)), sectionId });
            }}
            onPointerLeave={() => setCursor(null)}
            cursor={cursor?.sectionId === sectionId ? cursor : null}
          />
        );

        return createPortal(overlay, section);
      })}

      {/* Control Panel */}
      <div className="pointer-events-auto fixed bottom-6 left-1/2 -translate-x-1/2 z-50 w-full max-w-4xl px-6">
        <div className="rounded-2xl border border-white/12 bg-slate-900/80 p-6 shadow-[0_25px_80px_rgba(13,148,136,0.28)] backdrop-blur-xl" dir="rtl">
          <div className="flex flex-wrap items-center justify-between gap-3 mb-4">
            <div>
              <p className="text-base font-semibold text-white">{label}</p>
              <p className="text-sm text-white/70">
                روی هر بخش کلیک کنید تا نقاط را اضافه کنید. مسیر به‌طور خودکار به هم متصل می‌شود.
              </p>
            </div>
            <div className="flex items-center gap-2 text-xs text-teal-200/80">
              <span>{`${toPersianNumber(points.length)} نقطه`}</span>
              <span>•</span>
              <span>{`${toPersianNumber(pathData.length)} نویسه`}</span>
            </div>
          </div>

          <div className="grid gap-4 md:grid-cols-[1fr_minmax(220px,240px)]">
            <div className="space-y-3">
              <label className="text-sm font-medium text-white/80">رشته مسیر SVG</label>
              <textarea
                value={pathData}
                readOnly
                dir="ltr"
                className="h-32 w-full resize-none rounded-xl border border-white/10 bg-slate-950/70 p-3 font-mono text-xs text-teal-100 shadow-inner"
              />
            </div>
            <div className="flex flex-col gap-3">
              <button
                type="button"
                onClick={copyPath}
                className="rounded-xl border border-teal-400/50 bg-gradient-to-r from-teal-500/30 via-cyan-500/25 to-teal-500/20 px-4 py-2 text-sm font-semibold text-teal-100 transition hover:border-teal-300/80"
              >
                {copied ? "مسیر کپی شد" : "کپی مسیر"}
              </button>
              <button
                type="button"
                onClick={() => setPoints((prev) => prev.slice(0, -1))}
                className="rounded-xl border border-white/15 bg-white/10 px-4 py-2 text-sm font-semibold text-white transition hover:bg-white/20"
                disabled={!points.length}
              >
                بازگشت یک نقطه
              </button>
              <button
                type="button"
                onClick={() => setPoints([])}
                className="rounded-xl border border-red-400/30 bg-red-500/20 px-4 py-2 text-sm font-semibold text-red-100 transition hover:bg-red-500/30"
                disabled={!points.length}
              >
                حذف همه نقاط
              </button>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}

function MultiSectionOverlay({
  sectionId,
  points,
  sectionOffsets,
  allPoints,
  onPointerDown,
  onPointerMove,
  onPointerLeave,
  cursor,
}: {
  sectionId: string;
  points: Point[];
  sectionOffsets: Map<string, number>;
  allPoints: Point[];
  onPointerDown: (e: React.PointerEvent<HTMLDivElement>) => void;
  onPointerMove: (e: React.PointerEvent<HTMLDivElement>) => void;
  onPointerLeave: () => void;
  cursor: { x: number; y: number; sectionId: string } | null;
}) {
  const sectionPoints = allPoints.filter((p) => p.sectionId === sectionId);
  const currentOffset = sectionOffsets.get(sectionId) ?? 0;

  // Create a local path with coordinates adjusted relative to this section
  const localOffsets = new Map<string, number>();
  sectionOffsets.forEach((offset, id) => {
    localOffsets.set(id, offset - currentOffset);
  });

  const localPathData = toPathData(allPoints, localOffsets);

  // Get the section element to portal the overlay into it
  const sectionElement = document.getElementById(sectionId);
  if (!sectionElement) return null;

  return (
    <div
      className="absolute inset-0 z-40 pointer-events-auto cursor-crosshair"
      onPointerDown={onPointerDown}
      onPointerMove={onPointerMove}
      onPointerLeave={onPointerLeave}
      style={{
        position: "absolute",
        top: 0,
        left: 0,
        right: 0,
        bottom: 0,
      }}
    >
      <svg className="absolute inset-0 h-full w-full" xmlns="http://www.w3.org/2000/svg">
        {/* Draw the full path preview */}
        {localPathData && allPoints.length > 1 && (
          <>
            <defs>
              <linearGradient id={`designer-stroke-${sectionId}`} x1="0" y1="0" x2="1" y2="1">
                <stop offset="0%" stopColor="rgba(16, 185, 129, 0.95)" />
                <stop offset="50%" stopColor="rgba(34, 211, 238, 0.9)" />
                <stop offset="100%" stopColor="rgba(6, 182, 212, 0.85)" />
              </linearGradient>
            </defs>
            <path
              d={localPathData}
              stroke={`url(#designer-stroke-${sectionId})`}
              strokeWidth={4}
              strokeLinecap="round"
              strokeLinejoin="round"
              fill="none"
              style={{ filter: "drop-shadow(0 0 16px rgba(20, 184, 166, 0.35))" }}
            />
          </>
        )}

        {/* Draw points in this section */}
        {sectionPoints.map((point, idx) => {
          const globalIndex = allPoints.findIndex((p) => p === point);
          return (
            <g key={`${point.x}-${point.y}-${idx}`}>
              <circle cx={point.x} cy={point.y} r={6} fill="rgba(16, 185, 129, 0.9)" />
              <circle cx={point.x} cy={point.y} r={10} fill="rgba(20, 184, 166, 0.18)" />
              <text
                x={point.x + 12}
                y={point.y - 12}
                fill="rgba(226, 252, 247, 0.92)"
                fontSize="12"
                fontWeight="600"
              >
                {`${toPersianNumber(globalIndex + 1)}. (${toPersianNumber(point.x.toFixed(0))}، ${toPersianNumber(point.y.toFixed(0))})`}
              </text>
            </g>
          );
        })}
      </svg>

      {/* Cursor crosshair and coordinates */}
      {cursor && (
        <div className="pointer-events-none absolute inset-0">
          <div className="absolute left-0 right-0 h-px bg-cyan-400/35" style={{ top: `${cursor.y}px` }} />
          <div className="absolute top-0 bottom-0 w-px bg-cyan-400/35" style={{ left: `${cursor.x}px` }} />
          <div
            className="absolute -translate-y-1/2 translate-x-3"
            style={{ left: `${cursor.x}px`, top: `${cursor.y}px` }}
          >
            <span className="rounded-md bg-slate-900/90 px-2 py-1 text-xs font-medium text-teal-100 shadow-lg backdrop-blur">
              {`${toPersianNumber(Math.round(cursor.x))} پیکسل، ${toPersianNumber(Math.round(cursor.y))} پیکسل`}
            </span>
          </div>
        </div>
      )}
    </div>
  );
}
