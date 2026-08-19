import { baseApi } from "./baseApi";
import { NewsArticle } from "@/types";

interface SpaceflightResponse {
  count: number;
  next: string | null;
  previous: string | null;
  results: NewsArticle[];
}

export const newsApi = baseApi.injectEndpoints({
  endpoints: (builder) => ({
    getNews: builder.query<NewsArticle[], void>({
      query: () =>
        "https://api.spaceflightnewsapi.net/v4/articles/?limit=15&ordering=-published_at",
      transformResponse: (response: SpaceflightResponse) => response.results,
      providesTags: (result) =>
        result
          ? [
              ...result.map(({ id }) => ({ type: "News" as const, id })),
              { type: "News", id: "LIST" },
            ]
          : [{ type: "News", id: "LIST" }],
    }),
  }),
});

export const { useGetNewsQuery } = newsApi;
