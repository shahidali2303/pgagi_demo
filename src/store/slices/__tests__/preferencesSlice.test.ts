import { describe, it, expect } from "vitest";
import preferencesReducer, {
  toggleCategory,
  clearAllCategories,
} from "../preferencesSlice";

describe("preferencesSlice", () => {
  it("should handle initial state", () => {
    // FIX: Match the actual initial state from your slice
    expect(preferencesReducer(undefined, { type: "unknown" })).toEqual({
      selectedCategories: ["technology", "entertainment"],
    });
  });

  it("should add a category when toggled on", () => {
    const state = preferencesReducer(
      { selectedCategories: ["technology"] },
      toggleCategory("sports"),
    );
    expect(state.selectedCategories).toContain("sports");
    expect(state.selectedCategories).toContain("technology");
  });

  it("should remove a category when toggled off", () => {
    const state = preferencesReducer(
      { selectedCategories: ["technology", "entertainment"] },
      toggleCategory("technology"),
    );
    expect(state.selectedCategories).not.toContain("technology");
    expect(state.selectedCategories).toContain("entertainment");
  });

  it("should clear all categories", () => {
    const state = preferencesReducer(
      { selectedCategories: ["technology", "entertainment"] },
      clearAllCategories(),
    );
    expect(state.selectedCategories).toEqual([]);
  });
});
