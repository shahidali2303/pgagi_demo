import { describe, it, expect } from "vitest";
import uiReducer, {
  toggleDarkMode,
  setSearchQuery,
  toggleSidebar,
} from "../uiSlice";

describe("uiSlice", () => {
  const initialState = {
    isDarkMode: false,
    isSidebarOpen: true,
    searchQuery: "",
  };

  it("should handle initial state", () => {
    expect(uiReducer(undefined, { type: "unknown" })).toEqual(initialState);
  });

  it("should toggle dark mode", () => {
    const state = uiReducer(initialState, toggleDarkMode());
    expect(state.isDarkMode).toBe(true);

    const state2 = uiReducer(state, toggleDarkMode());
    expect(state2.isDarkMode).toBe(false);
  });

  it("should update search query", () => {
    const state = uiReducer(initialState, setSearchQuery("react"));
    expect(state.searchQuery).toBe("react");
  });

  it("should toggle sidebar", () => {
    const state = uiReducer(initialState, toggleSidebar());
    expect(state.isSidebarOpen).toBe(false);
  });
});
