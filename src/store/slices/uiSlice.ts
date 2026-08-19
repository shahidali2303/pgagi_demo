import { createSlice, PayloadAction } from "@reduxjs/toolkit";

interface UiState {
  isDarkMode: boolean;
  isSidebarOpen: boolean;
  searchQuery: string;
}

const initialState: UiState = {
  isDarkMode: false,
  isSidebarOpen: true,
  searchQuery: "",
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
  },
});

export const { toggleDarkMode, toggleSidebar, setDarkMode, setSearchQuery } =
  uiSlice.actions;
export default uiSlice.reducer;
