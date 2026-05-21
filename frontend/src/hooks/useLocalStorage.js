import { useState, useEffect } from 'react';

/**
 * A custom hook to manage state synchronized with localStorage.
 * Automatically listens for cross-tab changes.
 */
export function useLocalStorage(key, initialValue) {
  // State to store our value
  // Pass initial state function to useState so logic is only executed once
  const [storedValue, setStoredValue] = useState(() => {
    if (typeof window === "undefined") {
      return initialValue;
    }
    try {
      const item = window.localStorage.getItem(key);
      return item ? JSON.parse(item) : initialValue;
    } catch (error) {
      console.warn(`Error reading localStorage key "${key}":`, error);
      return initialValue;
    }
  });

  // Return a wrapped version of useState's setter function that ...
  // ... persists the new value to localStorage.
  const setValue = (value) => {
    try {
      // Allow value to be a function so we have same API as useState
      const valueToStore =
        value instanceof Function ? value(storedValue) : value;
      
      setStoredValue(valueToStore);
      
      if (typeof window !== "undefined") {
        if (valueToStore === undefined || valueToStore === null) {
            window.localStorage.removeItem(key);
        } else {
            window.localStorage.setItem(key, JSON.stringify(valueToStore));
        }
        
        // Dispatch a custom event so other components in the SAME tab can listen
        window.dispatchEvent(new Event('local-storage'));
      }
    } catch (error) {
      console.warn(`Error setting localStorage key "${key}":`, error);
    }
  };

  useEffect(() => {
    const handleStorageChange = (e) => {
      // e.key is undefined for our custom event, but populated for cross-tab storage event
      if (e.key && e.key !== key) {
        return;
      }
      
      try {
        const item = window.localStorage.getItem(key);
        setStoredValue(item ? JSON.parse(item) : initialValue);
      } catch (error) {
        console.warn(`Error updating state for localStorage key "${key}":`, error);
      }
    };

    // Listen for changes from other tabs
    window.addEventListener("storage", handleStorageChange);
    // Listen for changes within the same tab
    window.addEventListener("local-storage", handleStorageChange);
    
    return () => {
      window.removeEventListener("storage", handleStorageChange);
      window.removeEventListener("local-storage", handleStorageChange);
    };
  }, [key, initialValue]);

  return [storedValue, setValue];
}
