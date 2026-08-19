import { NewsArticle, Movie, SocialPost, ContentItem, Category } from "@/types";

export const mapNewsToContentItem = (article: NewsArticle): ContentItem => ({
  id: `news-${article.id}`,
  type: "news",
  title: article.title,
  description: article.summary,
  image:
    article.image_url || `https://picsum.photos/seed/news${article.id}/800/600`,
  category: "technology" as Category, // Spaceflight news maps to Technology
  source: article.news_site,
  url: article.url,
});

export const mapMovieToContentItem = (movie: Movie): ContentItem => ({
  id: `movie-${movie.id}`,
  type: "movie",
  title: movie.title,
  description: movie.overview,
  image: movie.poster_path
    ? `https://image.tmdb.org/t/p/w500${movie.poster_path}`
    : `https://picsum.photos/seed/movie${movie.id}/800/600`,
  category: "entertainment" as Category, // TMDB maps to Entertainment
  source: "TMDB Popular",
});

export const mapSocialToContentItem = (post: SocialPost): ContentItem => ({
  id: `social-${post.id}`,
  type: "social",
  title: post.title,
  description: `Posted by ${post.author} • Tags: ${post.tags.slice(0, 3).join(", ")}`,
  image: post.cover_image,
  category: "technology" as Category, // Dev.to maps to Technology
  source: "Dev.to Community",
  url: post.url,
});
