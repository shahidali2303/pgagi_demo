import { createSlice, PayloadAction } from "@reduxjs/toolkit";

interface UiState {
  isDarkMode: boolean;
  isSidebarOpen: boolean;
}

const initialState: UiState = {
  isDarkMode: false, // Start with light mode by default
  isSidebarOpen: true,
};

export const uiSlice = createSlice({
  name: "ui",
  initialState,
  reducers: {
    toggleDarkMode: (state) => {
      state.isDarkMode = !state.isDarkMode;
      console.log("Toggled dark mode to:", state.isDarkMode); // Debug
    },
    toggleSidebar: (state) => {
      state.isSidebarOpen = !state.isSidebarOpen;
    },
    setDarkMode: (state, action: PayloadAction<boolean>) => {
      state.isDarkMode = action.payload;
      console.log("Set dark mode to:", action.payload); // Debug
    },
  },
});

export const { toggleDarkMode, toggleSidebar, setDarkMode } = uiSlice.actions;
export default uiSlice.reducer;
