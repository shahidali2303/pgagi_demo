export type Category =
  | "technology"
  | "sports"
  | "finance"
  | "entertainment"
  | "health";

export interface NewsArticle {
  id: number;
  title: string;
  summary: string;
  url: string;
  image_url: string;
  news_site: string;
  published_at: string;
}

export interface SocialPost {
  id: number;
  title: string;
  url: string;
  cover_image: string;
  author: string;
  author_image: string;
  tags: string[];
  published_at: string;
}

export interface Movie {
  id: number;
  title: string;
  overview: string;
  poster_path: string;
  release_date: string;
}

export interface ContentItem {
  id: string;
  type: "news" | "movie" | "social";
  title: string;
  description: string;
  image: string;
  category: string;
  source: string;
  url?: string;
}
