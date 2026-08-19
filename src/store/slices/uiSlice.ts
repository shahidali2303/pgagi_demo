import { createSlice, PayloadAction } from "@reduxjs/toolkit";

export interface Toast {
  id: string;
  message: string;
  type: "success" | "info" | "error";
}

interface UiState {
  isDarkMode: boolean;
  isSidebarOpen: boolean;
  searchQuery: string;
  toasts: Toast[];
}

const initialState: UiState = {
  isDarkMode: false,
  isSidebarOpen: true,
  searchQuery: "",
  toasts: [],
};

export const uiSlice = createSlice({
  name: "ui",
  initialState,
  reducers: {
    toggleDarkMode: (state) => {
      state.isDarkMode = !state.isDarkMode;
    },
    toggleSidebar: (state) => {
      state.isSidebarOpen = !state.isSidebarOpen;
    },
    setDarkMode: (state, action: PayloadAction<boolean>) => {
      state.isDarkMode = action.payload;
    },
    setSearchQuery: (state, action: PayloadAction<string>) => {
      state.searchQuery = action.payload;
    },
    // 3. Add Toast Actions
    addToast: (state, action: PayloadAction<Omit<Toast, "id">>) => {
      const id = Date.now().toString();
      state.toasts.push({ ...action.payload, id });
    },
    removeToast: (state, action: PayloadAction<string>) => {
      state.toasts = state.toasts.filter(
        (toast) => toast.id !== action.payload,
      );
    },
  },
});

export const {
  toggleDarkMode,
  toggleSidebar,
  setDarkMode,
  setSearchQuery,
  addToast,
  removeToast,
} = uiSlice.actions;
export default uiSlice.reducer;
