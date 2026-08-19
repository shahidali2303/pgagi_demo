export type Category =
  | "technology"
  | "sports"
  | "finance"
  | "entertainment"
  | "health";

export interface NewsArticle {
  id: string;
  title: string;
  description: string;
  url: string;
  urlToImage: string;
  source: string;
  category: Category;
  publishedAt: string;
}

export interface Movie {
  id: number;
  title: string;
  overview: string;
  poster_path: string;
  release_date: string;
  genre_ids: number[];
}

export interface SocialPost {
  id: string;
  author: string;
  authorAvatar: string;
  content: string;
  timestamp: string;
  likes: number;
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
