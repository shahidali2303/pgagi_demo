import { baseApi } from "./baseApi";
import { NewsArticle, Category } from "@/types";

// Mock Data Generator
const generateMockNews = (categories: Category[]): NewsArticle[] => {
  return categories.flatMap((category, index) => [
    {
      id: `news-${category}-1`,
      title: `Breaking: Major developments in ${category}`,
      description: `This is a comprehensive overview of the latest trends and breaking news in the world of ${category}. Experts weigh in on what this means for the future.`,
      url: "#",
      urlToImage: `https://source.unsplash.com/800x600/?${category},news`,
      source: "Global News Network",
      category,
      publishedAt: new Date().toISOString(),
    },
    {
      id: `news-${category}-2`,
      title: `Top 10 things you need to know about ${category} today`,
      description: `From market shifts to new innovations, here is your daily digest of everything happening in ${category}.`,
      url: "#",
      urlToImage: `https://source.unsplash.com/800x600/?${category},technology`,
      source: "Daily Tech & More",
      category,
      publishedAt: new Date(Date.now() - 86400000).toISOString(),
    },
  ]);
};

export const newsApi = baseApi.injectEndpoints({
  endpoints: (builder) => ({
    getNews: builder.query<NewsArticle[], Category[]>({
      queryFn: async (categories) => {
        // Simulate network delay
        await new Promise((resolve) => setTimeout(resolve, 800));

        if (categories.length === 0) return { data: [] };

        const data = generateMockNews(categories);
        return { data };
      },
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
