/**
 * useDebounce hook - delays execution of a function until after a specified delay
 */

import { useState, useEffect, useCallback } from 'react';

/**
 * Hook that delays the execution of a function until after a specified delay
 * @param value - The value to debounce
 * @param delay - The delay in milliseconds
 * @returns The debounced value
 */
export function useDebounce<T>(value: T, delay: number): T {
  const [debouncedValue, setDebouncedValue] = useState<T>(value);

  useEffect(() => {
    const handler = setTimeout(() => {
      setDebouncedValue(value);
    }, delay);

    return () => {
      clearTimeout(handler);
    };
  }, [value, delay]);

  return debouncedValue;
}

/**
 * Hook that returns a debounced function
 * @param callback - The function to debounce
 * @param delay - The delay in milliseconds
 * @returns A debounced version of the callback function
 */
export function useDebouncedCallback<T extends (...args: any[]) => any>(
  callback: T,
  delay: number
): T {
  const [debounceTimer, setDebounceTimer] = useState<NodeJS.Timeout | null>(null);

  const debouncedCallback = useCallback(
    (...args: Parameters<T>) => {
      if (debounceTimer) {
        clearTimeout(debounceTimer);
      }

      const newTimer = setTimeout(() => {
        callback(...args);
      }, delay);

      setDebounceTimer(newTimer);
    },
    [callback, delay, debounceTimer]
  ) as T;

  // Cleanup timer on unmount
  useEffect(() => {
    return () => {
      if (debounceTimer) {
        clearTimeout(debounceTimer);
      }
    };
  }, [debounceTimer]);

  return debouncedCallback;
}

/**
 * Hook that provides both debounced value and debounced callback
 * @param initialValue - Initial value
 * @param delay - The delay in milliseconds
 * @returns Object containing debounced value and debounced setter
 */
export function useDebounceState<T>(
  initialValue: T,
  delay: number
): [T, (value: T) => void] {
  const [value, setValue] = useState<T>(initialValue);
  const debouncedValue = useDebounce(value, delay);

  const setDebouncedValue = useCallback((newValue: T) => {
    setValue(newValue);
  }, []);

  return [debouncedValue, setDebouncedValue];
}

/**
 * Hook for debouncing search input
 * @param initialQuery - Initial search query
 * @param delay - The delay in milliseconds (default: 300ms)
 * @returns Object containing current query, debounced query, and setter
 */
export function useDebouncedSearch(
  initialQuery: string = '',
  delay: number = 300
) {
  const [query, setQuery] = useState(initialQuery);
  const debouncedQuery = useDebounce(query, delay);

  const handleQueryChange = useCallback((newQuery: string) => {
    setQuery(newQuery);
  }, []);

  const clearQuery = useCallback(() => {
    setQuery('');
  }, []);

  return {
    query,
    debouncedQuery,
    setQuery: handleQueryChange,
    clearQuery,
  };
}

/**
 * Hook for debouncing API calls
 * @param apiCall - The API function to call
 * @param delay - The delay in milliseconds (default: 500ms)
 * @returns Object containing loading state, error state, and debounced API call
 */
export function useDebouncedApiCall<T extends (...args: any[]) => Promise<any>>(
  apiCall: T,
  delay: number = 500
) {
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<Error | null>(null);
  const [data, setData] = useState<any>(null);

  const debouncedApiCall = useDebouncedCallback(
    async (...args: Parameters<T>) => {
      setLoading(true);
      setError(null);
      
      try {
        const result = await apiCall(...args);
        setData(result);
        return result;
      } catch (err) {
        const error = err instanceof Error ? err : new Error('Unknown error');
        setError(error);
        throw error;
      } finally {
        setLoading(false);
      }
    },
    delay
  );

  const reset = useCallback(() => {
    setLoading(false);
    setError(null);
    setData(null);
  }, []);

  return {
    loading,
    error,
    data,
    call: debouncedApiCall,
    reset,
  };
}
