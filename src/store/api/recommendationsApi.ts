import { baseApi } from "./baseApi";
import { Movie } from "@/types";

interface TMDBResponse {
  results: Movie[];
}

export const recommendationsApi = baseApi.injectEndpoints({
  endpoints: (builder) => ({
    getRecommendations: builder.query<Movie[], void>({
      query: () =>
        `https://api.themoviedb.org/3/movie/popular?api_key=${process.env.NEXT_PUBLIC_TMDB_API_KEY}&language=en-US&page=1`,
      transformResponse: (response: TMDBResponse) => response.results,
      providesTags: ["Recommendations"],
    }),
  }),
});

export const { useGetRecommendationsQuery } = recommendationsApi;
