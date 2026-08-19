import { describe, it, expect } from "vitest";
import {
  mapNewsToContentItem,
  mapMovieToContentItem,
  mapSocialToContentItem,
} from "../dataMapper";

describe("Data Mapper (API Response Transformation)", () => {
  it("should map a Spaceflight News article to a ContentItem correctly", () => {
    const mockArticle = {
      id: 12345,
      title: "SpaceX Successfully Launches New Satellite",
      summary: "The Falcon 9 rocket lifted off from Cape Canaveral...",
      url: "https://example.com/news/12345",
      image_url: "https://example.com/image.jpg",
      news_site: "Space News Daily",
      published_at: "2024-01-15T10:00:00Z",
    };

    const result = mapNewsToContentItem(mockArticle);

    expect(result.id).toBe("news-12345");
    expect(result.type).toBe("news");
    expect(result.title).toBe("SpaceX Successfully Launches New Satellite");
    expect(result.description).toBe(
      "The Falcon 9 rocket lifted off from Cape Canaveral...",
    );
    expect(result.category).toBe("technology");
    expect(result.source).toBe("Space News Daily");
    expect(result.url).toBe("https://example.com/news/12345");
  });

  it("should map a TMDB movie to a ContentItem correctly", () => {
    const mockMovie = {
      id: 98765,
      title: "Interstellar",
      overview: "A team of explorers travel through a wormhole in space...",
      poster_path: "/xyz123.jpg",
      release_date: "2014-11-07",
    };

    const result = mapMovieToContentItem(mockMovie);

    expect(result.id).toBe("movie-98765");
    expect(result.type).toBe("movie");
    expect(result.title).toBe("Interstellar");
    expect(result.category).toBe("entertainment");
    expect(result.source).toBe("TMDB Popular");
    expect(result.image).toContain("image.tmdb.org");
  });

  it("should handle missing image URLs gracefully with a fallback", () => {
    const mockMovieNoPoster = {
      id: 11111,
      title: "Unknown Movie",
      overview: "No poster available",
      poster_path: null, // Simulating missing data
      release_date: "2024-01-01",
    } as any;

    const result = mapMovieToContentItem(mockMovieNoPoster);

    // Should fall back to picsum.photos
    expect(result.image).toContain("picsum.photos");
  });
});
