"use client";

import { useEffect } from "react";
import { useAppSelector } from "@/store/hooks";

export function useDarkMode() {
  const isDarkMode = useAppSelector((state) => state.ui.isDarkMode);

  useEffect(() => {
    const root = window.document.documentElement;
    const body = window.document.body;

    if (isDarkMode) {
      root.classList.add("dark");
      body.setAttribute("data-theme", "dark");
    } else {
      root.classList.remove("dark");
      body.removeAttribute("data-theme");
    }
  }, [isDarkMode]);
}
