import { describe, it, expect, vi } from "vitest";
import { render, screen } from "@testing-library/react";
import { Provider } from "react-redux";
import { configureStore } from "@reduxjs/toolkit";
import DashboardPage from "../page";

import uiReducer from "@/store/slices/uiSlice";
import preferencesReducer from "@/store/slices/preferencesSlice";
import favoritesReducer from "@/store/slices/favoritesSlice";
import authReducer from "@/store/slices/authSlice";

vi.mock("react-i18next", () => ({
  useTranslation: () => ({
    t: (key: string) => key,
    i18n: { language: "en", changeLanguage: vi.fn() },
  }),
}));

vi.mock("@/store/api/newsApi", () => ({
  useGetNewsQuery: () => ({ data: [], isLoading: false }),
}));

vi.mock("@/store/api/recommendationsApi", () => ({
  useGetRecommendationsQuery: () => ({ data: [], isLoading: false }),
}));

vi.mock("@/store/api/socialApi", () => ({
  useGetSocialPostsQuery: () => ({ data: [], isLoading: false }),
}));

const createTestStore = (preloadedState?: any) => {
  return configureStore({
    reducer: {
      ui: uiReducer,
      preferences: preferencesReducer,
      favorites: favoritesReducer,
      auth: authReducer,
    },
    preloadedState,
  } as any);
};

const renderWithRedux = (component: React.ReactNode, preloadedState?: any) => {
  const store = createTestStore(preloadedState);
  return render(<Provider store={store}>{component}</Provider>);
};

describe("DashboardPage", () => {
  it('shows "No Preferences Selected" when categories are empty', () => {
    renderWithRedux(<DashboardPage />, {
      preferences: { selectedCategories: [] },
      ui: {
        searchQuery: "",
        isDarkMode: false,
        isSidebarOpen: true,
        toasts: [],
      },
      auth: { isAuthenticated: true, userName: "TestUser" },
      favorites: { items: [] },
    });

    expect(screen.getByText(/No Preferences Selected/i)).toBeInTheDocument();
  });

  it("shows empty state when categories are selected but feed is empty", () => {
    renderWithRedux(<DashboardPage />, {
      preferences: { selectedCategories: ["technology"] },
      ui: {
        searchQuery: "",
        isDarkMode: false,
        isSidebarOpen: true,
        toasts: [],
      },
      auth: { isAuthenticated: true, userName: "TestUser" },
      favorites: { items: [] },
    });

    expect(screen.getByText(/No content found/i)).toBeInTheDocument();
  });
});
