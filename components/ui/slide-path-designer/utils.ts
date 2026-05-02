export type Point = { x: number; y: number };

const persianDigits = ["۰", "۱", "۲", "۳", "۴", "۵", "۶", "۷", "۸", "۹"] as const;

export const toPersianNumber = (value: number | string) =>
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

export const toPathData = (points: Point[]) => {
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

export const getSlideTitle = (slideKey: string) => {
  const match = slideKey.match(/\d+/);
  if (!match) {
    return "اسلاید";
  }
  return `اسلاید ${toPersianNumber(Number(match[0]))}`;
};

export const storageKeyFor = (slideKey: string) => `karaNova-path-${slideKey}`;

export const isPointArray = (value: unknown): value is Point[] => {
  if (!Array.isArray(value)) {
    return false;
  }
  return value.every((item) =>
    typeof item?.x === "number" && typeof item?.y === "number",
  );
};
