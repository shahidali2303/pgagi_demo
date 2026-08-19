import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { Category } from "@/types";

interface PreferencesState {
  selectedCategories: Category[];
}

const initialState: PreferencesState = {
  selectedCategories: ["technology", "sports", "finance"], // Default preferences
};

export const preferencesSlice = createSlice({
  name: "preferences",
  initialState,
  reducers: {
    toggleCategory: (state, action: PayloadAction<Category>) => {
      const category = action.payload;
      if (state.selectedCategories.includes(category)) {
        state.selectedCategories = state.selectedCategories.filter(
          (c) => c !== category,
        );
      } else {
        state.selectedCategories.push(category);
      }
    },
    setCategories: (state, action: PayloadAction<Category[]>) => {
      state.selectedCategories = action.payload;
    },
  },
});

export const { toggleCategory, setCategories } = preferencesSlice.actions;
export default preferencesSlice.reducer;
