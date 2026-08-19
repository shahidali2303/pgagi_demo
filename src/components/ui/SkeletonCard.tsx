"use client";

export function SkeletonCard() {
  return (
    <div className="flex flex-col overflow-hidden rounded-xl border border-slate-200 dark:border-border-base bg-white dark:bg-bg-surface shadow-sm">
      {/* Image Skeleton */}
      <div className="relative h-48 w-full bg-slate-200 dark:bg-slate-800 animate-pulse" />

      {/* Content Skeleton */}
      <div className="flex flex-1 flex-col p-4">
        {/* Source & Type Line */}
        <div className="flex justify-between items-center mb-3">
          <div className="h-3 w-16 rounded bg-slate-200 dark:bg-slate-800 animate-pulse" />
          <div className="h-3 w-12 rounded bg-slate-200 dark:bg-slate-800 animate-pulse" />
        </div>

        {/* Title Skeleton */}
        <div className="h-5 w-3/4 rounded bg-slate-200 dark:bg-slate-800 animate-pulse mb-2" />
        <div className="h-5 w-1/2 rounded bg-slate-200 dark:bg-slate-800 animate-pulse mb-4" />

        {/* Description Skeleton */}
        <div className="h-3 w-full rounded bg-slate-200 dark:bg-slate-800 animate-pulse mb-2" />
        <div className="h-3 w-full rounded bg-slate-200 dark:bg-slate-800 animate-pulse mb-2" />
        <div className="h-3 w-2/3 rounded bg-slate-200 dark:bg-slate-800 animate-pulse mb-4" />

        {/* Footer Divider */}
        <div className="mt-auto border-t border-slate-100 dark:border-border-base pt-4 flex justify-between items-center">
          <div className="h-4 w-24 rounded bg-slate-200 dark:bg-slate-800 animate-pulse" />
          <div className="h-8 w-8 rounded-full bg-slate-200 dark:bg-slate-800 animate-pulse" />
        </div>
      </div>
    </div>
  );
}
