"use client";

import { useAppDispatch, useAppSelector } from "@/store/hooks";
import { toggleCategory } from "@/store/slices/preferencesSlice";
import { Category } from "@/types";
import {
  Check,
  Cpu,
  Dumbbell,
  TrendingUp,
  Film,
  HeartPulse,
} from "lucide-react";

const categories: { id: Category; label: string; icon: React.ElementType }[] = [
  { id: "technology", label: "Technology", icon: Cpu },
  { id: "sports", label: "Sports", icon: Dumbbell },
  { id: "finance", label: "Finance", icon: TrendingUp },
  { id: "entertainment", label: "Entertainment", icon: Film },
  { id: "health", label: "Health", icon: HeartPulse },
];

export default function SettingsPage() {
  const dispatch = useAppDispatch();
  const selectedCategories = useAppSelector(
    (state) => state.preferences.selectedCategories,
  );

  return (
    <div className="max-w-3xl mx-auto space-y-8">
      <div>
        <h1 className="text-2xl font-bold text-slate-900 dark:text-text-primary">
          Content Preferences
        </h1>
        <p className="mt-2 text-sm text-slate-600 dark:text-text-secondary">
          Customize your dashboard by selecting the topics you are interested
          in.
        </p>
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
        {categories.map((cat) => {
          const isSelected = selectedCategories.includes(cat.id);
          const Icon = cat.icon;

          return (
            <button
              key={cat.id}
              onClick={() => dispatch(toggleCategory(cat.id))}
              className={`relative flex items-center justify-between p-4 rounded-xl border transition-all duration-200 ${
                isSelected
                  ? "bg-slate-100 border-slate-300 dark:bg-accent-base/10 dark:border-accent-base/50"
                  : "bg-white border-slate-200 hover:border-slate-300 dark:bg-bg-surface dark:border-border-base dark:hover:border-text-secondary"
              }`}
            >
              <div className="flex items-center gap-3">
                <div
                  className={`p-2 rounded-lg ${
                    isSelected
                      ? "bg-slate-200 text-slate-900 dark:bg-accent-base/20 dark:text-text-primary"
                      : "bg-slate-100 text-slate-500 dark:bg-bg-base dark:text-text-secondary"
                  }`}
                >
                  <Icon size={20} />
                </div>
                <span
                  className={`font-medium ${
                    isSelected
                      ? "text-slate-900 dark:text-text-primary"
                      : "text-slate-700 dark:text-text-secondary"
                  }`}
                >
                  {cat.label}
                </span>
              </div>

              {isSelected && (
                <div className="flex h-6 w-6 items-center justify-center rounded-full bg-slate-900 dark:bg-accent-base">
                  <Check size={14} className="text-white dark:text-bg-base" />
                </div>
              )}
            </button>
          );
        })}
      </div>

      <div className="rounded-xl border border-slate-200 dark:border-border-base bg-white dark:bg-bg-surface p-6">
        <h3 className="text-sm font-semibold text-slate-900 dark:text-text-primary mb-2">
          Active Preferences:
        </h3>
        <div className="flex flex-wrap gap-2">
          {selectedCategories.length > 0 ? (
            selectedCategories.map((cat) => (
              <span
                key={cat}
                className="px-3 py-1 text-xs font-medium rounded-full bg-slate-100 text-slate-700 dark:bg-accent-base/20 dark:text-text-primary capitalize"
              >
                {cat}
              </span>
            ))
          ) : (
            <p className="text-sm text-slate-500 dark:text-text-secondary">
              No categories selected. Your feed will be empty.
            </p>
          )}
        </div>
      </div>
    </div>
  );
}
