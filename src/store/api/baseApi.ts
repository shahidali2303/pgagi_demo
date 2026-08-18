import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";

// We will inject specific endpoints (News, TMDB, Social) into this base API later
export const baseApi = createApi({
  reducerPath: "api",
  baseQuery: fetchBaseQuery({ baseUrl: "/" }),
  endpoints: () => ({}),
});
