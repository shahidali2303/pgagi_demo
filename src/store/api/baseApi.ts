import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";

// Base API - we will inject specific endpoints (News, TMDB, Social) in Phase 3
export const baseApi = createApi({
  reducerPath: "api",
  baseQuery: fetchBaseQuery({ baseUrl: "/" }),
  endpoints: () => ({}),
  tagTypes: ["News", "Recommendations", "Social", "Favorites"],
});
