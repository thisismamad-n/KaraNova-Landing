import { Point, toPersianNumber } from "./utils";

interface SlidePathDesignerCanvasProps {
  interactiveRef: React.RefObject<HTMLDivElement | null>;
  slideKey: string;
  pathData: string;
  points: Point[];
  cursor: Point | null;
  onPointerDown: (event: React.PointerEvent<HTMLDivElement>, ref: React.RefObject<HTMLDivElement | null>) => void;
  onPointerMove: (event: React.PointerEvent<HTMLDivElement>, ref: React.RefObject<HTMLDivElement | null>) => void;
  onPointerLeave: () => void;
}

export function SlidePathDesignerCanvas({
  interactiveRef,
  slideKey,
  pathData,
  points,
  cursor,
  onPointerDown,
  onPointerMove,
  onPointerLeave,
}: SlidePathDesignerCanvasProps) {
  return (
    <div
      ref={interactiveRef as React.RefObject<HTMLDivElement>}
      className="absolute inset-0 cursor-crosshair"
      onPointerDown={(e) => onPointerDown(e, interactiveRef)}
      onPointerMove={(e) => onPointerMove(e, interactiveRef)}
      onPointerLeave={onPointerLeave}
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
  );
}
