"use client";

import { useAppSelector } from "@/store/hooks";
import { ContentCard } from "@/components/ui/ContentCard";

export default function FavoritesPage() {
  const favorites = useAppSelector((state) => state.favorites.items);

  return (
    <div className="space-y-8">
      <div>
        <h1 className="text-2xl font-bold text-slate-900 dark:text-text-primary">
          Your Favorites
        </h1>
        <p className="mt-1 text-sm text-slate-600 dark:text-text-secondary">
          {favorites.length} item{favorites.length !== 1 ? "s" : ""} saved
        </p>
      </div>

      {favorites.length === 0 ? (
        <div className="flex h-[50vh] flex-col items-center justify-center rounded-xl border border-dashed border-slate-300 dark:border-border-base p-12 text-center">
          <h3 className="text-lg font-medium text-slate-900 dark:text-text-primary">
            No favorites yet
          </h3>
          <p className="mt-2 text-sm text-slate-600 dark:text-text-secondary">
            Click the heart icon on any card to save it here.
          </p>
        </div>
      ) : (
        <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-3">
          {favorites.map((item) => (
            <ContentCard key={item.id} content={item} />
          ))}
        </div>
      )}
    </div>
  );
}
