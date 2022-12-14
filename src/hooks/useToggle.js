import { useEffect, useState } from "react";

/**
 *This hook should use in react component for toggleing something
 * @param {*} currentStatus
 * @returns { setToFalse, setToTrue, toggle, toggleValue }
 */
const useToggle = (currentStatus = false) => {
  const [valStore, setToggle] = useState();
  useEffect(() => {
    if (currentStatus instanceof Function) {
      setToggle(currentStatus());
    } else {
      setToggle(currentStatus);
    }
  }, [currentStatus]);

  const setToFalse = () => {
    setToggle(false);
  };
  const setToTrue = () => {
    setToggle(true);
  };
  const toggle = () => {
    setToggle(!valStore);
  };

  return { setToFalse, setToTrue, toggle, toggleValue: valStore };
};

export default useToggle;
