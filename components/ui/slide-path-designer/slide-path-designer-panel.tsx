import { Point, getSlideTitle, toPersianNumber } from "./utils";

interface SlidePathDesignerPanelProps {
  slideKey: string;
  label?: string;
  points: Point[];
  pathData: string;
  copied: boolean;
  onCopyPath: () => void;
  onUndoPoint: () => void;
  onResetPoints: () => void;
}

export function SlidePathDesignerPanel({
  slideKey,
  label,
  points,
  pathData,
  copied,
  onCopyPath,
  onUndoPoint,
  onResetPoints,
}: SlidePathDesignerPanelProps) {
  const slideTitle = label ?? getSlideTitle(slideKey);

  return (
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
              onClick={onCopyPath}
              className="rounded-xl border border-teal-400/50 bg-gradient-to-r from-teal-500/30 via-cyan-500/25 to-teal-500/20 px-4 py-2 text-sm font-semibold text-teal-100 shadow-[0_20px_45px_rgba(14,165,233,0.35)] transition hover:-translate-y-0.5 hover:border-teal-300/80 hover:bg-teal-500/35"
            >
              {copied ? "مسیر کپی شد" : "کپی مسیر"}
            </button>
            <button
              type="button"
              onClick={onUndoPoint}
              className="rounded-xl border border-white/15 bg-white/10 px-4 py-2 text-sm font-semibold text-white transition hover:-translate-y-0.5 hover:border-teal-200/60 hover:bg-white/20"
              disabled={!points.length}
            >
              بازگشت یک نقطه
            </button>
            <button
              type="button"
              onClick={onResetPoints}
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
  );
}
