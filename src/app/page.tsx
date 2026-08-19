"use client";

import { useMemo, useState } from "react";
import { useAppSelector } from "@/store/hooks";
import { useGetNewsQuery } from "@/store/api/newsApi";
import { useGetRecommendationsQuery } from "@/store/api/recommendationsApi";
import { useGetSocialPostsQuery } from "@/store/api/socialApi";
import { SkeletonCard } from "@/components/ui/SkeletonCard";
import { DraggableFeed } from "@/components/ui/DraggableFeed";
import {
  mapNewsToContentItem,
  mapMovieToContentItem,
  mapSocialToContentItem,
} from "@/lib/dataMapper";
import { useTranslation } from "react-i18next";
import { Category } from "@/types";

const ITEMS_PER_PAGE = 9;

export default function DashboardPage() {
  const { t } = useTranslation();

  // 1. Read categories and search query from Redux
  const categories = useAppSelector(
    (state) => state.preferences.selectedCategories,
  );
  const searchQuery = useAppSelector((state) => state.ui.searchQuery || "");
  const [visibleCount, setVisibleCount] = useState(ITEMS_PER_PAGE);

  const { data: newsData, isLoading: isNewsLoading } = useGetNewsQuery();
  const { data: moviesData, isLoading: isMoviesLoading } =
    useGetRecommendationsQuery();
  const { data: socialData, isLoading: isSocialLoading } =
    useGetSocialPostsQuery();

  // 2. Combine and map data
  const unifiedFeed = useMemo(() => {
    const newsItems = newsData?.map(mapNewsToContentItem) || [];
    const movieItems = moviesData?.map(mapMovieToContentItem) || [];
    const socialItems = socialData?.map(mapSocialToContentItem) || [];

    return [...newsItems, ...movieItems, ...socialItems].sort(
      () => Math.random() - 0.5,
    );
  }, [newsData, moviesData, socialData]);

  // 3. Filter by selected categories (Settings Preferences)
  const categoryFilteredFeed = useMemo(() => {
    if (categories.length === 0) return [];
    return unifiedFeed.filter((item) =>
      categories.includes(item.category as Category),
    );
  }, [unifiedFeed, categories]);

  // 4. Filter by search query
  const filteredFeed = useMemo(() => {
    if (!searchQuery.trim()) return categoryFilteredFeed;
    const lowerQuery = searchQuery.toLowerCase();
    return categoryFilteredFeed.filter(
      (item) =>
        item.title.toLowerCase().includes(lowerQuery) ||
        item.description.toLowerCase().includes(lowerQuery) ||
        item.category.toLowerCase().includes(lowerQuery),
    );
  }, [categoryFilteredFeed, searchQuery]);

  const visibleItems = filteredFeed.slice(0, visibleCount);
  const hasMore = visibleCount < filteredFeed.length;
  const isLoading = isNewsLoading || isMoviesLoading || isSocialLoading;

  // 5. Show empty state if no categories are selected
  if (categories.length === 0) {
    return (
      <div className="flex h-[50vh] flex-col items-center justify-center text-center">
        <h2 className="text-2xl font-bold text-slate-900 dark:text-text-primary">
          No Preferences Selected
        </h2>
        <p className="mt-2 text-slate-600 dark:text-text-secondary">
          Go to Settings to choose your favorite categories.
        </p>
      </div>
    );
  }

  return (
    <div className="space-y-8">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-2xl font-bold text-slate-900 dark:text-text-primary">
            {t("dashboard.title")}
          </h1>
          <p className="mt-1 text-sm text-slate-600 dark:text-text-secondary">
            {isLoading
              ? t("dashboard.fetching")
              : t("dashboard.showing", {
                  count: visibleItems.length,
                  total: filteredFeed.length,
                })}
            {searchQuery &&
              ` ${t("dashboard.matching", { query: searchQuery })}`}
          </p>
        </div>
      </div>

      {isLoading ? (
        <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-3">
          {Array.from({ length: 6 }).map((_, index) => (
            <SkeletonCard key={`skeleton-${index}`} />
          ))}
        </div>
      ) : filteredFeed.length === 0 ? (
        <div className="rounded-xl border border-dashed border-slate-300 dark:border-border-base p-12 text-center">
          <p className="text-slate-500 dark:text-text-secondary">
            {searchQuery
              ? t("dashboard.noResults", { query: searchQuery })
              : "No content found for your selected categories. (Note: Our real APIs currently only provide Technology, Social and Entertainment data)."}
          </p>
        </div>
      ) : (
        <>
          <DraggableFeed items={visibleItems} />

          {hasMore && (
            <div className="flex justify-center pt-4">
              <button
                onClick={() => setVisibleCount((prev) => prev + ITEMS_PER_PAGE)}
                className="rounded-lg border border-slate-200 dark:border-border-base bg-white dark:bg-bg-surface px-6 py-2 text-sm font-medium text-slate-700 dark:text-text-primary hover:bg-slate-50 dark:hover:bg-bg-base transition-colors"
              >
                {t("dashboard.loadMore")}
              </button>
            </div>
          )}
        </>
      )}
    </div>
  );
}
