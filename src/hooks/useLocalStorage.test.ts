import { renderHook, act } from "@testing-library/react";
import { describe, it, expect, beforeEach } from "vitest";
import { useLocalStorage } from "./useLocalStorage";

describe("useLocalStorage", () => {
  beforeEach(() => {
    localStorage.clear();
  });

  it("returns the initial value when nothing is stored", () => {
    const { result } = renderHook(() => useLocalStorage("count", 0));
    expect(result.current[0]).toBe(0);
  });

  it("reads an existing stored value instead of the initial value", () => {
    localStorage.setItem("count", JSON.stringify(5));
    const { result } = renderHook(() => useLocalStorage("count", 0));
    expect(result.current[0]).toBe(5);
  });

  it("persists updates to localStorage", () => {
    const { result } = renderHook(() => useLocalStorage("count", 0));

    act(() => {
      result.current[1](5);
    });

    expect(result.current[0]).toBe(5);
    expect(localStorage.getItem("count")).toBe("5");
  });

  it("supports functional updates", () => {
    const { result } = renderHook(() => useLocalStorage<string[]>("items", []));

    act(() => {
      result.current[1]((prev) => [...prev, "tofu"]);
    });
    act(() => {
      result.current[1]((prev) => [...prev, "chicken"]);
    });

    expect(result.current[0]).toEqual(["tofu", "chicken"]);
  });
});
