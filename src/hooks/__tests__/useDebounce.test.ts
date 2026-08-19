import { describe, it, expect, vi } from "vitest";
import { renderHook, waitFor } from "@testing-library/react";
import { useDebounce } from "../useDebounce";

describe("useDebounce", () => {
  vi.useFakeTimers();

  it("should return the initial value immediately", () => {
    const { result } = renderHook(() => useDebounce("test", 500));
    expect(result.current).toBe("test");
  });

  it("should debounce the value update", async () => {
    const { result, rerender } = renderHook(
      ({ value }) => useDebounce(value, 500),
      {
        initialProps: { value: "initial" },
      },
    );

    rerender({ value: "updated" });

    // Value should not change immediately
    expect(result.current).toBe("initial");

    // Fast-forward time by 500ms
    vi.advanceTimersByTime(500);

    await waitFor(() => {
      expect(result.current).toBe("updated");
    });
  });

  vi.useRealTimers();
});
