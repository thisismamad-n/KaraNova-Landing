"use client";

import { useState, useEffect, useCallback } from "react";

interface FetchOptions {
  maxRetries?: number;
  retryDelay?: number;
  onError?: (error: Error) => void;
}

interface FetchState<T> {
  data: T | null;
  loading: boolean;
  error: Error | null;
  retry: () => void;
}

export function useFetchWithRetry<T>(
  fetchFn: () => Promise<T>,
  options: FetchOptions = {}
): FetchState<T> {
  const { maxRetries = 3, retryDelay = 1000, onError } = options;

  const [data, setData] = useState<T | null>(null);
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<Error | null>(null);
  const [retryCount, setRetryCount] = useState<number>(0);

  const fetchData = useCallback(async () => {
    setLoading(true);
    setError(null);

    let lastError: Error | null = null;

    for (let attempt = 0; attempt <= maxRetries; attempt++) {
      try {
        const result = await fetchFn();
        setData(result);
        setLoading(false);
        setRetryCount(0);
        return;
      } catch (err) {
        lastError = err instanceof Error ? err : new Error("Unknown error");
        
        if (attempt < maxRetries) {
          // Wait before retrying
          await new Promise((resolve) => setTimeout(resolve, retryDelay * (attempt + 1)));
        }
      }
    }

    // All retries failed
    if (lastError) {
      setError(lastError);
      onError?.(lastError);
    }
    setLoading(false);
  }, [fetchFn, maxRetries, retryDelay, onError]);

  const retry = useCallback(() => {
    setRetryCount((prev) => prev + 1);
    fetchData();
  }, [fetchData]);

  useEffect(() => {
    fetchData();
  }, [fetchData]);

  return { data, loading, error, retry };
}
