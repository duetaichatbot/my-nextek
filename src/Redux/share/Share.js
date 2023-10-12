import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";
import API_BASE_URL from "../../Config";

export const sharePosts = createApi({
  reducerPath: "share",
  baseQuery: fetchBaseQuery({ baseUrl: API_BASE_URL }),
  tagTypes: ["sharedPosts"],
  endpoints: (builder) => ({
    share: builder.mutation({
      query: (body) => {
        const { userId, postID } = body;
        return {
          url: `/api/${userId}/shared-post/${postID}`,
          method: "POST",
          body,
        };
      },
      invalidatesTags: ["sharedPosts"],
    }),
    getSharedPosts: builder.query({
      query: (userId) => {
        return {
          url: `/api/${userId}/shared-posts`,
          method: "GET",
        };
      },
      providesTags: ["sharedPosts"],
    }),

    removeSharedPosts: builder.mutation({
      query: ({ userID, postID, body }) => {
        return {
          url: `/api/${userID}/delete-shared/${postID}`,
          method: "POST",
          body,
        };
      },
      invalidatesTags: ["sharedPosts"],
    }),
  }),
});

export const {
  useShareMutation,
  useGetSharedPostsQuery,
  useRemoveSharedPostsMutation,
} = sharePosts;
