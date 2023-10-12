import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";
import API_BASE_URL from "../../Config";

export const posts = createApi({
  reducerPath: "posts",
  baseQuery: fetchBaseQuery({ baseUrl: API_BASE_URL }),
  tagTypes: ["getPosts", "comments"],
  endpoints: (builder) => ({
    getAllPosts: builder.query({
      query: () => {
        return {
          url: `api/posts/all-posts`,
          method: "GET",
        };
      },
      providesTags: ["getPosts"],
    }),

    singlePost: builder.query({
      query: (id) => {
        return {
          url: `/api/posts/${id}/single-post`,
          method: "GET",
        };
      },
      providesTags: ["comments"],
    }),

    postComment: builder.mutation({
      query: ({ postId, userID, comments }) => {
        return {
          url: `/api/${userID}/posts/${postId}/comments`,
          method: "POST",
          body: { comments }, // Corrected: Pass 'comments' in the body
        };
      },
      invalidatesTags: ["comments"],
    }),
    replyComment: builder.mutation({
      query: ({ postId, userID, commentId, comments }) => {
        return {
          url: `/api/${userID}/posts/${postId}/comments/${commentId}/replies`,
          method: "POST",
          body: { comments },
        };
      },
      invalidatesTags: ["comments"],
    }),

    like: builder.mutation({
      query: (data) => {
        const { userID, postID, ...body } = data;
        return {
          url: `/api/${userID}/like/${postID}`,
          method: "POST",
          body,
        };
      },
      invalidatesTags: ["getPosts"],
    }),

    deletePost: builder.mutation({
      query: ({ userID, postID, data }) => {
        return {
          url: `api/posts/${userID}/delete-post/${postID}`,
          method: "DELETE",
          data,
        };
      },
      invalidatesTags: ["getPosts"],
    }),

    updatePost: builder.mutation({
      query: ({ userID, postID, data }) => {
        return {
          url: `api/posts/${userID}/update-post/${postID}`,
          method: "PATCH",
          body: data,
        };
      },
      invalidatesTags: ["getPosts"],
    }),

    createPost: builder.mutation({
      query: ({ userID, data }) => {
        return {
          url: `/api/posts/${userID}/create-post`,
          method: "POST",
          body: data,
        };
      },
      invalidatesTags: ["getPosts"],
    }),
    deleteComments: builder.mutation({
      query: ({ userID, postID, commentID }) => {
        return {
          url: `/api/${userID}/post/${postID}/delete-comments/${commentID}`,
          method: "DELETE",
        };
      },
      invalidatesTags: ["comments"],
    }),
    deleteReply: builder.mutation({
      query: ({ userID, postID, commentID, replyID }) => {
        return {
          url: `/api/${userID}/post/${postID}/delete-replies/${commentID}/${replyID}`,
          method: "DELETE",
        };
      },
      invalidatesTags: ["comments"],
    }),
    getComment: builder.query({
      query: (id) => {
        return {
          url: `/api/all-comments/${id}`,
          method: "GET",
        };
      },
      providesTags: ["comments"],
    }),
  }),
});

export const {
  useGetAllPostsQuery,
  usePostCommentMutation,
  useReplyCommentMutation,
  useSinglePostQuery,
  useLikeMutation,
  useDeletePostMutation,
  useUpdatePostMutation,
  useCreatePostMutation,
  useDeleteCommentsMutation,
  useDeleteReplyMutation,
  useGetCommentQuery,
} = posts;
