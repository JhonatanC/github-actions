import { describe, expect, test } from "vitest";
import {
  act,
  fireEvent,
  render,
  renderHook,
  screen,
} from "@testing-library/react";
import "@testing-library/jest-dom";
import { Counter } from "../components/Counter";
import { useCounter } from "../hook/useCounter";

// Pruebas para el componente que interactúa con el Hook.
describe("Validate elements to elements exist in the document.", () => {
  test("Contain default value", () => {
    render(<Counter initialValue={10} />);
    expect(+screen.getByRole("heading").textContent).toBe(10);
  });

  test("Contain dispacher elements", () => {
    render(<Counter initialValue={10} />);
    const increment = screen.getByRole("button", { name: "+1" });
    const decrement = screen.getByRole("button", { name: "-1" });
    const reset = screen.getByRole("button", { name: "reset" });
    const disable = screen.getByTestId("data-button-switch").innerHTML;
    //  expect(increment).toBeInTheDocument();
    expect(increment).toBeDefined();
    expect(decrement).toBeDefined();
    expect(reset).toBeDefined();
    expect(disable).toContain("Buttons");
  });

  test("Detect new value when action increment is called from useCounter in my component", () => {
    render(<Counter initialValue={10} />);
    const increment = screen.getByRole("button", { name: "+1" });
    fireEvent.click(increment);
    const h1 = screen.getByRole("heading").innerHTML;
    expect(h1).toContain("11");
  });

  test("Detect new value when action decrement is called from useCounter in my component", () => {
    render(<Counter initialValue={10} />);
    const decrement = screen.getByRole("button", { name: "-1" });
    fireEvent.click(decrement);
    const h1 = screen.getByRole("heading").innerHTML;
    expect(h1).toContain("9");
  });

  test("Detect new value when action reset is called from useCounter in my component", () => {
    render(<Counter initialValue={10} />);
    const reset = screen.getByRole("button", { name: "reset" });
    fireEvent.click(reset);
    const h1 = screen.getByRole("heading").innerHTML;
    expect(h1).toContain("10");
  });

  test("Detect new value when action state buttons are called from useCounter in my component", () => {
    render(<Counter initialValue={10} />);
    const stateButton = screen.getByTestId("data-button-switch");
    fireEvent.click(stateButton);
    const increment = screen.getByRole("button", { name: "+1" });
    const decrement = screen.getByRole("button", { name: "-1" });
    const reset = screen.getByRole("button", { name: "reset" });
    expect(increment).toBeDisabled();
    expect(decrement).toBeDisabled();
    expect(reset).toBeDisabled();
  });
});

// Pruebas para el Hook
describe("Validate accions of useCounter", () => {
  test("Initial Value should be 10", () => {
    const { result } = renderHook(() => useCounter(10));
    expect(result.current.count).toBe(9);
  });

  test("Check value when handleIncrement is called", () => {
    const { result } = renderHook(() => useCounter(10));
    act(() => {
      result.current.handleIncrement();
    });
    expect(result.current.count).toBe(11);
  });

  test("Check value when handleDescrement is called", () => {
    const { result } = renderHook(() => useCounter(10));
    act(() => {
      result.current.handleDescrement();
    });
    expect(result.current.count).toBe(9);
  });

  test("Check value when handleReset is called", () => {
    const { result } = renderHook(() => useCounter(10));
    act(() => {
      result.current.handleIncrement();
    });
    act(() => {
      result.current.handleReset();
    });
    expect(result.current.count).toBe(10);
  });

  test("Check buttons when handleButtonState is called", () => {
    const { result } = renderHook(() => useCounter(10));
    act(() => {
      result.current.handleButtonState();
    });
    expect(result.current.state).toBe(true);
    act(() => {
      result.current.handleButtonState();
    });
    expect(result.current.state).toBe(false);
  });
});
