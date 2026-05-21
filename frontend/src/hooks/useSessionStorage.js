import { useState, useEffect } from 'react';

/**
 * A custom hook to manage state synchronized with sessionStorage.
 */
export function useSessionStorage(key, initialValue) {
  const [storedValue, setStoredValue] = useState(() => {
    if (typeof window === "undefined") {
      return initialValue;
    }
    try {
      const item = window.sessionStorage.getItem(key);
      return item ? JSON.parse(item) : initialValue;
    } catch (error) {
      console.warn(`Error reading sessionStorage key "${key}":`, error);
      return initialValue;
    }
  });

  const setValue = (value) => {
    try {
      const valueToStore =
        value instanceof Function ? value(storedValue) : value;
      
      setStoredValue(valueToStore);
      
      if (typeof window !== "undefined") {
        if (valueToStore === undefined || valueToStore === null) {
            window.sessionStorage.removeItem(key);
        } else {
            window.sessionStorage.setItem(key, JSON.stringify(valueToStore));
        }
        
        window.dispatchEvent(new Event('session-storage'));
      }
    } catch (error) {
      console.warn(`Error setting sessionStorage key "${key}":`, error);
    }
  };

  useEffect(() => {
    const handleStorageChange = (e) => {
      if (e.key && e.key !== key) {
        return;
      }
      
      try {
        const item = window.sessionStorage.getItem(key);
        setStoredValue(item ? JSON.parse(item) : initialValue);
      } catch (error) {
        console.warn(`Error updating state for sessionStorage key "${key}":`, error);
      }
    };

    window.addEventListener("session-storage", handleStorageChange);
    
    return () => {
      window.removeEventListener("session-storage", handleStorageChange);
    };
  }, [key, initialValue]);

  return [storedValue, setValue];
}
