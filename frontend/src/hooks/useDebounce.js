import { useState, useEffect } from 'react';

/**
 * A custom hook to debounce a fast-changing value.
 * @param {any} value The value to debounce
 * @param {number} delay Delay in milliseconds
 * @returns The debounced value
 */
export function useDebounce(value, delay) {
  const [debouncedValue, setDebouncedValue] = useState(value);

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
