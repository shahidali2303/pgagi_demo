import { NewsArticle, Movie, ContentItem } from "@/types";

export const mapNewsToContentItem = (article: NewsArticle): ContentItem => ({
  id: article.id,
  type: "news",
  title: article.title,
  description: article.description,
  // Using picsum for reliable placeholder images in mock mode
  image: `https://picsum.photos/seed/${article.id}/800/600`,
  category: article.category,
  source: article.source,
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
  category: "Entertainment",
  source: "TMDB Recommendations",
});
