"use client";

import { useEffect } from "react";
import { useAppSelector } from "@/store/hooks";

export function useDarkMode() {
  const isDarkMode = useAppSelector((state) => state.ui.isDarkMode);

  useEffect(() => {
    const root = window.document.documentElement;
    console.log("Dark mode state:", isDarkMode); // Debug log

    if (isDarkMode) {
      root.classList.add("dark");
      console.log("Added dark class");
    } else {
      root.classList.remove("dark");
      console.log("Removed dark class");
    }

    // Verify the class is actually there
    console.log("HTML classList:", Array.from(root.classList));
  }, [isDarkMode]);
}
