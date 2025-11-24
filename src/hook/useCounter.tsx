import { useState } from "react";

export const useCounter = (initialValue: number) => {
  // states.
  const [count, setCount] = useState(initialValue);
  const [state, setState] = useState(false);

  // functions.
  const handleIncrement = () => setCount((prev) => prev + 1);
  const handleDescrement = () => setCount((prev) => prev - 1);
  const handleReset = () => setCount(initialValue);
  const handleButtonState = () => setState(!state);

  return {
    count,
    handleIncrement,
    handleDescrement,
    handleReset,
    state,
    handleButtonState,
  };
};
