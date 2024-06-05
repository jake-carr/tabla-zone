import { useState } from "react";

const useLocalStorage = (key: string, initialValue: any) => {
  const [state, setState] = useState(() => {
    const storedValue = localStorage.getItem(key);
    return storedValue ? JSON.parse(storedValue) : initialValue;
  });

  const setStoredValue = (value: string) => {
    localStorage.setItem(key, JSON.stringify(value));
    setState(value);
  };

  return [state, setStoredValue];
};

export default useLocalStorage;
