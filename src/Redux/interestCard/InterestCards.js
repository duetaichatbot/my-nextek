import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";
import API_BASE_URL from "../../Config";

export const interestCards = createApi({
  reducerPath: "interestcards",
  baseQuery: fetchBaseQuery({ baseUrl: API_BASE_URL }),
  tagTypes: ["interestcard", "connections"],
  endpoints: (builder) => ({
    sendInterestCards: builder.mutation({
      query: (body) => {
        const { sentBy, sentTo, ...data } = body;
        return {
          url: `/api/${sentBy}/send-card/${sentTo}`,
          method: "POST",
          data,
        };
      },
      invalidatesTags: ["interestcard"],
    }),

    acceptInterestCards: builder.mutation({
      query: (body) => {
        const { userID, cardId, sentById, ...data } = body;
        return {
          url: `/api/${userID}/${sentById}/accept/${cardId}`,
          method: "PATCH",
          data,
        };
      },
    }),

    rejectInterestCards: builder.mutation({
      query: (body) => {
        const { userID, cardId, ...data } = body;
        return {
          url: `/api/${userID}/reject/${cardId}`,
          method: "PATCH",
          data,
        };
      },
    }),

    getInterestCards: builder.query({
      query: (userID) => {
        return {
          url: `/api/interest-cards/${userID}`,
          method: "GET",
        };
      },
      providesTags: ["interestcard"],
    }),

    getConnections: builder.query({
      query: (userID) => {
        return {
          url: `/api/connections/${userID}`,
          method: "GET",
        };
      },
      providesTags: ["connections"],
    }),

    sendInterestCard: builder.query({
      query: ({ userID, sendTo }) => {
        return {
          url: `api/${userID}/validate-request/${sendTo}`,
          method: "GET",
        };
      },
      providesTags: ["interestcard"],
    }),

    cancelRequest: builder.mutation({
      query: ({ userId, sendtoId }) => {
        return {
          url: `api/${userId}/cancel-card/${sendtoId}`,
          method: "PATCH",
        };
      },
      invalidatesTags: ["interestcard"],
    }),

    updateProfile: builder.mutation({
      query: ({ userID, data }) => {
        return {
          url: `/api/auth/update-users/${userID}`,
          method: "PATCH",
          body: data,
        };
      },
    }),
    deleteFriend: builder.mutation({
      query: ({ userID, friendID }) => {
        return {
          url: `/api/${userID}/remove-connection/${friendID}`,
          method: "PATCH",
        };
      },
      invalidatesTags: ["connections", "interestcard"],
    }),

    getCardID: builder.query({
      query: ({ userID, sendTo }) => {
        return {
          url: `api/${userID}/get-card-id/${sendTo}`,
          method: "GET",
        };
      },
      providesTags: ["interestcard"],
    }),
  }),
});

export const {
  useSendInterestCardsMutation,
  useGetConnectionsQuery,
  useGetInterestCardsQuery,
  useRejectInterestCardsMutation,
  useAcceptInterestCardsMutation,
  useSendInterestCardQuery,
  useUpdateProfileMutation,
  useCancelRequestMutation,
  useDeleteFriendMutation,
  useGetCardIDQuery
} = interestCards;
