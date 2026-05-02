import { useCallback, useEffect, useMemo, useState } from "react";
import { Point, isPointArray, storageKeyFor, toPathData } from "./utils";

export function useSlidePathDesigner(slideKey: string, isActive: boolean) {
  const [cursor, setCursor] = useState<Point | null>(null);
  const [copied, setCopied] = useState(false);
  const [points, setPoints] = useState<Point[]>([]);
  const [loadedKey, setLoadedKey] = useState<string | null>(null);

  const storageKey = useMemo(() => storageKeyFor(slideKey), [slideKey]);

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

  const updateCursor = useCallback((event: React.PointerEvent<HTMLDivElement>, interactiveRef: React.RefObject<HTMLDivElement | null>) => {
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

  const addPoint = useCallback((event: React.PointerEvent<HTMLDivElement>, interactiveRef: React.RefObject<HTMLDivElement | null>) => {
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

  return {
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
  };
}
