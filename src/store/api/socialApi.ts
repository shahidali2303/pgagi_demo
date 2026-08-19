import { baseApi } from "./baseApi";
import { SocialPost } from "@/types";

interface DevToResponse {
  id: number;
  title: string;
  url: string;
  cover_image: string;
  user: {
    name: string;
    profile_image: string;
  };
  tag_list: string[];
  readable_publish_date: string;
}

export const socialApi = baseApi.injectEndpoints({
  endpoints: (builder) => ({
    getSocialPosts: builder.query<SocialPost[], void>({
      query: () => "https://dev.to/api/articles?top=7&per_page=10",
      transformResponse: (response: DevToResponse[]) =>
        response.map((post) => ({
          id: post.id,
          title: post.title,
          url: post.url,
          cover_image:
            post.cover_image ||
            `https://picsum.photos/seed/devto${post.id}/800/600`,
          author: post.user.name,
          author_image: post.user.profile_image,
          tags: post.tag_list,
          published_at: post.readable_publish_date,
        })),
      providesTags: (result) =>
        result
          ? [
              ...result.map(({ id }) => ({ type: "Social" as const, id })),
              { type: "Social", id: "LIST" },
            ]
          : [{ type: "Social", id: "LIST" }],
    }),
  }),
});

export const { useGetSocialPostsQuery } = socialApi;
