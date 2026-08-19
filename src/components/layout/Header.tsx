"use client";

import { Search, Moon, Sun, Menu, User, X } from "lucide-react";
import { useAppDispatch, useAppSelector } from "@/store/hooks";
import {
  toggleDarkMode,
  toggleSidebar,
  setSearchQuery,
} from "@/store/slices/uiSlice";
import { useDebounce } from "@/hooks/useDebounce";
import { useEffect, useState } from "react";

export function Header() {
  const dispatch = useAppDispatch();
  const isDarkMode = useAppSelector((state) => state.ui.isDarkMode);
  const searchQuery = useAppSelector((state) => state.ui.searchQuery);

  const [inputValue, setInputValue] = useState(searchQuery);
  const debouncedSearch = useDebounce(inputValue, 500); // 500ms delay

  // Sync debounced value back to Redux
  useEffect(() => {
    dispatch(setSearchQuery(debouncedSearch));
  }, [debouncedSearch, dispatch]);

  // Sync local input with Redux if cleared elsewhere
  useEffect(() => {
    if (searchQuery === "") {
      setInputValue("");
    }
  }, [searchQuery]);

  return (
    <header className="sticky top-0 z-10 flex h-16 items-center justify-between border-b border-slate-200 dark:border-border-base bg-white/80 dark:bg-bg-surface/80 backdrop-blur-md px-4 lg:px-6 transition-colors duration-300 ease-in-out">
      <div className="flex items-center gap-4 flex-1">
        {/* Mobile Menu Toggle */}
        <button
          onClick={() => dispatch(toggleSidebar())}
          className="lg:hidden text-slate-500 hover:text-slate-900 dark:text-text-secondary dark:hover:text-text-primary transition-colors"
        >
          <Menu size={24} />
        </button>

        {/* Search Bar */}
        <div className="relative flex-1 max-w-md">
          <Search
            className="absolute left-3 top-1/2 -translate-y-1/2 text-slate-400 dark:text-text-secondary transition-colors"
            size={18}
          />
          <input
            type="text"
            value={inputValue}
            onChange={(e) => setInputValue(e.target.value)}
            placeholder="Search news, movies, or posts..."
            className="w-full rounded-lg border border-slate-200 dark:border-border-base bg-slate-50 dark:bg-bg-base py-2 pl-10 pr-10 text-sm text-slate-900 dark:text-text-primary placeholder-slate-400 dark:placeholder-text-secondary focus:outline-none focus:ring-2 focus:ring-accent-base/50 transition-all"
          />
          {inputValue && (
            <button
              onClick={() => {
                setInputValue("");
                dispatch(setSearchQuery(""));
              }}
              className="absolute right-3 top-1/2 -translate-y-1/2 text-slate-400 hover:text-slate-600 dark:hover:text-text-primary"
            >
              <X size={16} />
            </button>
          )}
        </div>
      </div>

      <div className="flex items-center gap-4">
        {/* Dark Mode Toggle */}
        <button
          onClick={() => dispatch(toggleDarkMode())}
          className="rounded-lg p-2 text-slate-500 hover:bg-slate-100 hover:text-slate-900 dark:text-text-secondary dark:hover:bg-bg-base dark:hover:text-text-primary transition-colors"
          aria-label="Toggle Dark Mode"
        >
          {isDarkMode ? (
            <Sun size={20} className="text-accent-base" />
          ) : (
            <Moon size={20} />
          )}
        </button>

        {/* User Profile */}
        <button className="flex items-center gap-2 rounded-lg p-1 hover:bg-slate-100 dark:hover:bg-bg-base transition-colors">
          <div className="flex h-8 w-8 items-center justify-center rounded-full bg-slate-200 dark:bg-accent-base text-slate-700 dark:text-bg-base font-bold shadow-lg">
            <User size={16} />
          </div>
          <span className="hidden text-sm font-medium text-slate-700 dark:text-text-primary md:block">
            User
          </span>
        </button>
      </div>
    </header>
  );
}
