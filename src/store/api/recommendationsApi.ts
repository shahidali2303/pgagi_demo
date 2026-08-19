import { baseApi } from "./baseApi";
import { Movie } from "@/types";

const mockMovies: Movie[] = [
  {
    id: 1,
    title: "Inception",
    overview:
      "A thief who steals corporate secrets through the use of dream-sharing technology is given the inverse task of planting an idea.",
    poster_path: "/9gk7adHYeDvHkCSEqAvQNLV5Uge.jpg",
    release_date: "2010-07-16",
    genre_ids: [28, 878],
  },
  {
    id: 2,
    title: "The Matrix",
    overview:
      "A computer hacker learns from mysterious rebels about the true nature of his reality and his role in the war against its controllers.",
    poster_path: "/f89U3ADr1oiB1s9GkdPOEpXUk5H.jpg",
    release_date: "1999-03-31",
    genre_ids: [28, 878],
  },
  {
    id: 3,
    title: "Interstellar",
    overview:
      "A team of explorers travel through a wormhole in space in an attempt to ensure humanity's survival.",
    poster_path: "/gEU2QniE6E77NI6lCU6MxlNBvIx.jpg",
    release_date: "2014-11-07",
    genre_ids: [12, 18, 878],
  },
];

export const recommendationsApi = baseApi.injectEndpoints({
  endpoints: (builder) => ({
    getRecommendations: builder.query<Movie[], void>({
      queryFn: async () => {
        await new Promise((resolve) => setTimeout(resolve, 1000));
        return { data: mockMovies };
      },
      providesTags: ["Recommendations"],
    }),
  }),
});

export const { useGetRecommendationsQuery } = recommendationsApi;
