import { useCounter } from "../hook/useCounter";

interface CounterProps {
  initialValue: number;
}

export const Counter = ({ initialValue }: CounterProps) => {
  const {
    count,
    handleIncrement,
    handleDescrement,
    handleReset,
    state,
    handleButtonState,
  } = useCounter(initialValue);

  return (
    <>
      <h1>{count}</h1>
      <button
        data-testid="data-button-switch"
        onClick={() => handleButtonState()}
      >
        {state ? "Enabled" : "Disabled"} Buttons
      </button>
      <button disabled={state} onClick={() => handleReset()}>
        reset
      </button>
      <button disabled={state} onClick={() => handleDescrement()}>
        -1
      </button>
      <button disabled={state} onClick={() => handleIncrement()}>
        +1
      </button>
    </>
  );
};
