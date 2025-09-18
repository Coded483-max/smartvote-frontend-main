import { useState, useEffect } from "react";

export const useFormPersistence = (key, initialState) => {
  const [state, setState] = useState(() => {
    try {
      const savedState = localStorage.getItem(key);
      return savedState ? JSON.parse(savedState) : initialState;
    } catch (error) {
      console.error("Error loading saved form data:", error);
      return initialState;
    }
  });

  useEffect(() => {
    try {
      localStorage.setItem(key, JSON.stringify(state));
    } catch (error) {
      console.error("Error saving form data:", error);
    }
  }, [key, state]);

  const clearPersistedData = () => {
    localStorage.removeItem(key);
    setState(initialState); // <-- Reset state to initial value
  };

  return [state, setState, clearPersistedData];
};
