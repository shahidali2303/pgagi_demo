import { createSlice, PayloadAction } from "@reduxjs/toolkit";

interface UiState {
  isDarkMode: boolean;
  isSidebarOpen: boolean;
}

const initialState: UiState = {
  isDarkMode: false,
  isSidebarOpen: true,
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
  },
});

export const { toggleDarkMode, toggleSidebar, setDarkMode } = uiSlice.actions;
export default uiSlice.reducer;
