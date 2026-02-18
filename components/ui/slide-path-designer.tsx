"use client";

import { useCallback, useEffect, useMemo, useRef, useState } from "react";
import { isSlidePathDesignerEnabled } from "./slide-path-designer-config";

type Point = { x: number; y: number };

const persianDigits = ["۰", "۱", "۲", "۳", "۴", "۵", "۶", "۷", "۸", "۹"] as const;

const toPersianNumber = (value: number | string) =>
  value
    .toString()
    .split("")
    .map((char) => {
      const index = Number(char);
      if (Number.isNaN(index)) {
        return char;
      }
      return persianDigits[index] ?? char;
    })
    .join("");

const toPathData = (points: Point[]) => {
  if (!points.length) {
    return "";
  }
  if (points.length === 1) {
    const [first] = points;
    return `M ${first.x.toFixed(2)} ${first.y.toFixed(2)}`;
  }

  const segments = [`M ${points[0].x.toFixed(2)} ${points[0].y.toFixed(2)}`];

  for (let i = 0; i < points.length - 1; i += 1) {
    const p0 = points[i - 1] ?? points[i];
    const p1 = points[i];
    const p2 = points[i + 1];
    const p3 = points[i + 2] ?? p2;

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

const getSlideTitle = (slideKey: string) => {
  const match = slideKey.match(/\d+/);
  if (!match) {
    return "اسلاید";
  }
  return `اسلاید ${toPersianNumber(Number(match[0]))}`;
};

const storageKeyFor = (slideKey: string) => `karaNova-path-${slideKey}`;

const isPointArray = (value: unknown): value is Point[] => {
  if (!Array.isArray(value)) {
    return false;
  }
  return value.every((item) =>
    typeof item?.x === "number" && typeof item?.y === "number",
  );
};

interface SlidePathDesignerProps {
  slideKey: string;
  enabled?: boolean;
  label?: string;
  className?: string;
}

export function SlidePathDesigner({ slideKey, enabled, label, className }: SlidePathDesignerProps) {
  const interactiveRef = useRef<HTMLDivElement>(null);
  const [cursor, setCursor] = useState<Point | null>(null);
  const [copied, setCopied] = useState(false);

  const storageKey = useMemo(() => storageKeyFor(slideKey), [slideKey]);

  const isActive = typeof enabled === "boolean" ? enabled : isSlidePathDesignerEnabled(slideKey);

  const [points, setPoints] = useState<Point[]>([]);
  const [loadedKey, setLoadedKey] = useState<string | null>(null);

  useEffect(() => {
    if (!isActive) return;

    if (typeof window === "undefined") return;

    try {
      const saved = window.localStorage.getItem(storageKey);
      if (saved) {
        const parsed = JSON.parse(saved);
        if (isPointArray(parsed)) {
          setPoints(parsed.map((point) => ({ x: Number(point.x), y: Number(point.y) })));
        } else {
          setPoints([]);
        }
      } else {
        setPoints([]);
      }
    } catch {
      window.localStorage.removeItem(storageKey);
      setPoints([]);
    } finally {
      setLoadedKey(storageKey);
    }
  }, [storageKey, isActive]);

  useEffect(() => {
    if (!isActive || loadedKey !== storageKey) return;
    if (typeof window === "undefined") {
      return;
    }
    window.localStorage.setItem(storageKey, JSON.stringify(points));
  }, [points, storageKey, isActive, loadedKey]);

  useEffect(() => {
    if (!copied) {
      return;
    }
    if (typeof window === "undefined") {
      return;
    }
    const timeout = window.setTimeout(() => {
      setCopied(false);
    }, 1600);
    return () => {
      window.clearTimeout(timeout);
    };
  }, [copied]);

  const pathData = useMemo(() => toPathData(points), [points]);

  const copyPath = useCallback(async () => {
    if (!pathData) {
      return;
    }
    try {
      if (typeof navigator !== "undefined" && navigator.clipboard?.writeText) {
        await navigator.clipboard.writeText(pathData);
        setCopied(true);
        return;
      }
      if (typeof document !== "undefined") {
        const textarea = document.createElement("textarea");
        textarea.value = pathData;
        textarea.setAttribute("readonly", "true");
        textarea.style.position = "absolute";
        textarea.style.left = "-9999px";
        document.body.appendChild(textarea);
        textarea.select();
        document.execCommand("copy");
        document.body.removeChild(textarea);
        setCopied(true);
      }
    } catch (error) {
      console.error(error);
    }
  }, [pathData]);

  useEffect(() => {
    if (!isActive) {
      return;
    }
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
    return () => {
      window.removeEventListener("keydown", handleKeyDown);
    };
  }, [isActive, copyPath]);

  const updateCursor = useCallback((event: React.PointerEvent<HTMLDivElement>) => {
    if (!isActive) {
      return;
    }
    const rect = interactiveRef.current?.getBoundingClientRect();
    if (!rect) {
      return;
    }
    const x = event.clientX - rect.left;
    const y = event.clientY - rect.top;
    setCursor({ x: Number(x.toFixed(2)), y: Number(y.toFixed(2)) });
  }, [isActive]);

  const clearCursor = useCallback(() => {
    setCursor(null);
  }, []);

  const addPoint = useCallback((event: React.PointerEvent<HTMLDivElement>) => {
    if (!isActive) {
      return;
    }
    if (event.button !== 0) {
      return;
    }
    event.preventDefault();
    const rect = interactiveRef.current?.getBoundingClientRect();
    if (!rect) {
      return;
    }
    const x = event.clientX - rect.left;
    const y = event.clientY - rect.top;
    setPoints((prev) => [...prev, { x: Number(x.toFixed(2)), y: Number(y.toFixed(2)) }]);
  }, [isActive]);

  const undoPoint = useCallback(() => {
    setPoints((prev) => prev.slice(0, -1));
  }, []);

  const resetPoints = useCallback(() => {
    setPoints([]);
  }, []);

  if (!isActive) {
    return null;
  }

  const slideTitle = label ?? getSlideTitle(slideKey);

  return (
    <div className={`absolute inset-0 z-40 ${className ?? ""}`}>
      <div
        ref={interactiveRef}
        className="absolute inset-0 cursor-crosshair"
        onPointerDown={addPoint}
        onPointerMove={updateCursor}
        onPointerLeave={clearCursor}
      >
        <svg className="absolute inset-0 h-full w-full" xmlns="http://www.w3.org/2000/svg">
          {pathData ? (
            <>
              <defs>
                <linearGradient id={`designer-stroke-${slideKey}`} x1="0" y1="0" x2="1" y2="1">
                  <stop offset="0%" stopColor="rgba(16, 185, 129, 0.95)" />
                  <stop offset="50%" stopColor="rgba(34, 211, 238, 0.9)" />
                  <stop offset="100%" stopColor="rgba(6, 182, 212, 0.85)" />
                </linearGradient>
              </defs>
              <path
                d={pathData}
                stroke={`url(#designer-stroke-${slideKey})`}
                strokeWidth={4}
                strokeLinecap="round"
                strokeLinejoin="round"
                fill="none"
                vectorEffect="non-scaling-stroke"
                style={{ filter: "drop-shadow(0 0 16px rgba(20, 184, 166, 0.35))" }}
              />
            </>
          ) : null}
          {points.map((point, index) => (
            <g key={`${point.x}-${point.y}-${index}`}>
              <circle cx={point.x} cy={point.y} r={6} fill="rgba(16, 185, 129, 0.9)" />
              <circle cx={point.x} cy={point.y} r={10} fill="rgba(20, 184, 166, 0.18)" />
              <text
                x={point.x + 12}
                y={point.y - 12}
                fill="rgba(226, 252, 247, 0.92)"
                fontSize="12"
                fontWeight="600"
              >
                {`${toPersianNumber(index + 1)}. (${toPersianNumber(point.x.toFixed(0))}، ${toPersianNumber(point.y.toFixed(0))})`}
              </text>
            </g>
          ))}
        </svg>
        {cursor ? (
          <div className="pointer-events-none absolute inset-0">
            <div
              className="absolute left-0 right-0 h-px bg-cyan-400/35"
              style={{ top: `${cursor.y}px` }}
            />
            <div
              className="absolute top-0 bottom-0 w-px bg-cyan-400/35"
              style={{ left: `${cursor.x}px` }}
            />
            <div
              className="absolute -translate-y-1/2 translate-x-3"
              style={{ left: `${cursor.x}px`, top: `${cursor.y}px` }}
            >
              <span className="rounded-md bg-slate-900/90 px-2 py-1 text-xs font-medium text-teal-100 shadow-lg backdrop-blur">
                {`${toPersianNumber(Math.round(cursor.x))} پیکسل، ${toPersianNumber(Math.round(cursor.y))} پیکسل`}
              </span>
            </div>
          </div>
        ) : null}
      </div>

      <div className="pointer-events-auto absolute inset-x-0 bottom-6 flex justify-center px-6">
        <div className="w-full max-w-4xl rounded-2xl border border-white/12 bg-slate-900/80 p-6 shadow-[0_25px_80px_rgba(13,148,136,0.28)] backdrop-blur-xl" dir="rtl">
          <div className="flex flex-wrap items-center justify-between gap-3">
            <div>
              <p className="text-base font-semibold text-white">{slideTitle}</p>
              <p className="text-sm text-white/70">برای افزودن نقطه جدید روی اسلاید کلیک کنید. مسیر به‌صورت خودکار ذخیره می‌شود.</p>
            </div>
            <div className="flex items-center gap-2 text-xs text-teal-200/80">
              <span>{`${toPersianNumber(points.length)} نقطه`}</span>
              <span>•</span>
              <span>{`${toPersianNumber(pathData.length)} نویسه`}</span>
            </div>
          </div>

          <div className="mt-4 grid gap-4 md:grid-cols-[1fr_minmax(220px,240px)]">
            <div className="space-y-3">
              <label className="text-sm font-medium text-white/80" htmlFor={`path-data-${slideKey}`}>
                رشته مسیر SVG
              </label>
              <textarea
                id={`path-data-${slideKey}`}
                value={pathData}
                readOnly
                dir="ltr"
                className="h-32 w-full resize-none rounded-xl border border-white/10 bg-slate-950/70 p-3 font-mono text-xs text-teal-100 shadow-inner focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-teal-300/60"
              />
            </div>
            <div className="flex flex-col gap-3">
              <button
                type="button"
                onClick={copyPath}
                className="rounded-xl border border-teal-400/50 bg-gradient-to-r from-teal-500/30 via-cyan-500/25 to-teal-500/20 px-4 py-2 text-sm font-semibold text-teal-100 shadow-[0_20px_45px_rgba(14,165,233,0.35)] transition hover:-translate-y-0.5 hover:border-teal-300/80 hover:bg-teal-500/35"
              >
                {copied ? "مسیر کپی شد" : "کپی مسیر"}
              </button>
              <button
                type="button"
                onClick={undoPoint}
                className="rounded-xl border border-white/15 bg-white/10 px-4 py-2 text-sm font-semibold text-white transition hover:-translate-y-0.5 hover:border-teal-200/60 hover:bg-white/20"
                disabled={!points.length}
              >
                بازگشت یک نقطه
              </button>
              <button
                type="button"
                onClick={resetPoints}
                className="rounded-xl border border-red-400/30 bg-red-500/20 px-4 py-2 text-sm font-semibold text-red-100 transition hover:-translate-y-0.5 hover:border-red-300/60 hover:bg-red-500/30"
                disabled={!points.length}
              >
                حذف همه نقاط
              </button>
            </div>
          </div>

          <div className="mt-4">
            <p className="text-sm font-medium text-white/80">فهرست نقاط</p>
            {points.length ? (
              <div className="mt-2 grid max-h-32 grid-cols-1 gap-1 overflow-y-auto rounded-xl border border-white/10 bg-slate-950/60 p-3 font-mono text-xs text-teal-100" dir="ltr">
                {points.map((point, index) => (
                  <div key={`${point.x}-${point.y}-${index}`} className="flex items-center justify-between">
                    <span>{toPersianNumber(`${index + 1}`.padStart(2, "0"))}</span>
                    <span>{`${toPersianNumber(point.x.toFixed(2))}، ${toPersianNumber(point.y.toFixed(2))}`}</span>
                  </div>
                ))}
              </div>
            ) : (
              <p className="mt-2 text-sm text-white/65">هنوز نقطه‌ای ثبت نشده است.</p>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}
