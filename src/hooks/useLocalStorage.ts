import { useState, useEffect } from "react";

function useLocalStorage<T>(key: string, initialValue: T) {
  // Load from localStorage (or fallback to initialValue)
  const [storedValue, setStoredValue] = useState<T>(() => {
    try {
      const item = window.localStorage.getItem(key);
      return item ? (JSON.parse(item) as T) : initialValue;
    } catch (error) {
      console.error("Error reading localStorage key “" + key + "”:", error);
      return initialValue;
    }
  });

  // Sync updates to localStorage
  useEffect(() => {
    try {
      window.localStorage.setItem(key, JSON.stringify(storedValue));
    } catch (error) {
      console.error("Error setting localStorage key “" + key + "”:", error);
    }
  }, [key, storedValue]);

  return [storedValue, setStoredValue] as const;
}

export default useLocalStorage;


