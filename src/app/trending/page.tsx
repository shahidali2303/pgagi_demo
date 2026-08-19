"use client";

import { ContentCard } from "@/components/ui/ContentCard";
import { ContentItem } from "@/types";
import { TrendingUp } from "lucide-react";

const mockTrending: ContentItem[] = [
  {
    id: "trend-1",
    type: "news",
    title: "Global Tech Summit Announces Breakthrough AI Model",
    description:
      "Leading tech companies have unveiled a new AI model that promises to revolutionize natural language processing and machine learning.",
    image: "https://picsum.photos/seed/tech-trend/800/600",
    category: "Technology",
    source: "TechCrunch",
  },
  {
    id: "trend-2",
    type: "movie",
    title: "Sci-Fi Epic Breaks Box Office Records",
    description:
      "The latest space opera has surpassed expectations, becoming the highest-grossing film of the year in its opening weekend.",
    image: "https://picsum.photos/seed/movie-trend/800/600",
    category: "Entertainment",
    source: "Variety",
  },
  {
    id: "trend-3",
    type: "news",
    title: "Markets Rally as Inflation Data Shows Improvement",
    description:
      "Stock markets around the world surged today following the release of better-than-expected inflation reports.",
    image: "https://picsum.photos/seed/finance-trend/800/600",
    category: "Finance",
    source: "Bloomberg",
  },
];

export default function TrendingPage() {
  return (
    <div className="space-y-8">
      <div className="flex items-center gap-3">
        <div className="flex h-10 w-10 items-center justify-center rounded-lg bg-accent-base/20 text-accent-base">
          <TrendingUp size={20} />
        </div>
        <div>
          <h1 className="text-2xl font-bold text-slate-900 dark:text-text-primary">
            Trending Now
          </h1>
          <p className="mt-1 text-sm text-slate-600 dark:text-text-secondary">
            Top stories and recommendations gaining traction today.
          </p>
        </div>
      </div>

      <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-3">
        {mockTrending.map((item) => (
          <ContentCard key={item.id} content={item} />
        ))}
      </div>
    </div>
  );
}
