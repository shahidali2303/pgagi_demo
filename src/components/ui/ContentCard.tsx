"use client";

import { motion } from "framer-motion";
import { Heart, ExternalLink, Play } from "lucide-react";
import { useAppDispatch, useAppSelector } from "@/store/hooks";
import { toggleFavorite } from "@/store/slices/favoritesSlice";
import { ContentItem } from "@/types";

interface ContentCardProps {
  content: ContentItem;
}

export function ContentCard({ content }: ContentCardProps) {
  const dispatch = useAppDispatch();
  const isFavorite = useAppSelector((state) =>
    state.favorites.items.some((item) => item.id === content.id),
  );

  const handleFavorite = (e: React.MouseEvent) => {
    e.stopPropagation();
    dispatch(toggleFavorite(content));
  };

  return (
    <motion.div
      layout
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      exit={{ opacity: 0, y: 20 }}
      whileHover={{ y: -5 }}
      transition={{ duration: 0.3 }}
      className="group relative flex flex-col overflow-hidden rounded-xl border border-slate-200 dark:border-border-base bg-white dark:bg-bg-surface shadow-sm hover:shadow-xl transition-shadow duration-300"
    >
      {/* Image Section */}
      <div className="relative h-48 overflow-hidden bg-slate-100 dark:bg-bg-base">
        <img
          src={content.image}
          alt={content.title}
          className="h-full w-full object-cover transition-transform duration-500 group-hover:scale-110"
          loading="lazy"
        />
        {/* Category Badge */}
        <div className="absolute top-3 left-3 rounded-full bg-black/60 px-3 py-1 text-xs font-medium text-white backdrop-blur-sm capitalize">
          {content.category}
        </div>
      </div>

      {/* Content Section */}
      <div className="flex flex-1 flex-col p-4">
        <div className="mb-2 flex items-center justify-between">
          <span className="text-xs font-semibold text-accent-base uppercase tracking-wider">
            {content.source}
          </span>
          <span className="text-xs text-slate-400 dark:text-text-secondary">
            {content.type === "news"
              ? "Article"
              : content.type === "movie"
                ? "Movie"
                : "Post"}
          </span>
        </div>

        <h3 className="mb-2 text-lg font-bold leading-tight text-slate-900 dark:text-text-primary line-clamp-2">
          {content.title}
        </h3>

        <p className="mb-4 flex-1 text-sm text-slate-600 dark:text-text-secondary line-clamp-3">
          {content.description}
        </p>

        {/* Action Buttons */}
        <div className="mt-auto flex items-center justify-between border-t border-slate-100 dark:border-border-base pt-4">
          <button
            className="flex items-center gap-2 text-sm font-medium cursor-pointer text-slate-700 dark:text-text-primary hover:text-accent-base dark:hover:text-accent-base transition-colors"
            onClick={() => content.url && window.open(content.url, "_blank")}
          >
            {content.type === "movie" ? (
              <Play size={16} />
            ) : (
              <ExternalLink size={16} />
            )}
            {content.type === "movie" ? "Watch Now" : "Read More"}
          </button>

          <button
            onClick={handleFavorite}
            className={`rounded-full p-2 transition-all duration-200 cursor-pointer ${
              isFavorite
                ? "bg-red-50 text-red-500 dark:bg-red-500/10"
                : "bg-slate-100 text-slate-400 hover:bg-slate-200 dark:bg-bg-base dark:text-text-secondary dark:hover:bg-slate-800"
            }`}
            aria-label={
              isFavorite ? "Remove from favorites" : "Add to favorites"
            }
          >
            <Heart size={18} fill={isFavorite ? "currentColor" : "none"} />
          </button>
        </div>
      </div>
    </motion.div>
  );
}
