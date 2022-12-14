import { useEffect, useState } from "react";

const useLocalState = (key, defaultValue) => {
  const [state, setState] = useState(defaultValue);
  const [value, setValue] = useState(state);
  useEffect(() => {
    let storeData = localStorage.getItem(key);
    if (storeData || storeData !== null) {
      setValue(JSON.parse(storeData));
    } else {
      localStorage.setItem(key, JSON.stringify(state));
    }
  }, []);

  useEffect(() => {
    localStorage.setItem(key, JSON.stringify(state));
    setValue(state);
  }, [state, key]);

  return [value, setState];
};

export default useLocalState;
