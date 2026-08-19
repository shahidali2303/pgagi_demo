import { describe, it, expect } from "vitest";
import uiReducer, { toggleDarkMode, setSearchQuery } from "../uiSlice";

describe("uiSlice", () => {
  const initialState = {
    isDarkMode: false,
    isSidebarOpen: true,
    searchQuery: "",
    toasts: [],
  };

  it("should toggle dark mode", () => {
    const state = uiReducer(initialState, toggleDarkMode());
    expect(state.isDarkMode).toBe(true);
  });

  it("should set search query", () => {
    const state = uiReducer(initialState, setSearchQuery("Space"));
    expect(state.searchQuery).toBe("Space");
  });

  it("should handle initial state", () => {
    expect(uiReducer(undefined, { type: "unknown" })).toEqual(initialState);
  });
});
