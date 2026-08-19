import { describe, it, expect, vi } from "vitest";
import { render, screen } from "@testing-library/react";
import { Provider } from "react-redux";
import { makeStore } from "@/store";
import DashboardPage from "../page";

// Mock the RTK Query hooks
vi.mock("@/store/api/newsApi", () => ({
  useGetNewsQuery: () => ({ data: [], isLoading: false, isError: true }),
}));

vi.mock("@/store/api/recommendationsApi", () => ({
  useGetRecommendationsQuery: () => ({ data: [], isLoading: false }),
}));

vi.mock("@/store/api/socialApi", () => ({
  useGetSocialPostsQuery: () => ({ data: [], isLoading: false }),
}));

const renderWithRedux = (component: React.ReactNode, preloadedState?: any) => {
  const store = makeStore();
  if (preloadedState) {
    store.dispatch({
      type: "preferences/toggleCategory",
      payload: "technology",
    });
  }
  return render(<Provider store={store}>{component}</Provider>);
};

describe("DashboardPage", () => {
  it('shows "No Preferences Selected" when categories are empty', () => {
    renderWithRedux(<DashboardPage />);
    expect(screen.getByText("No Preferences Selected")).toBeInTheDocument();
  });

  it("handles API errors gracefully and shows empty state", () => {
    renderWithRedux(<DashboardPage />, { selectedCategories: ["technology"] });
    // When API errors occur, the feed should be empty
    expect(screen.getByText(/No content found/i)).toBeInTheDocument();
  });
});
