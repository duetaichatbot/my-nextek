// Need to use the React-specific entry point to import createApi
import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";
import API_BASE_URL from "../../Config";

// Define a service using a base URL and expected endpoints
export const chats = createApi({
  reducerPath: "chats",
  baseQuery: fetchBaseQuery({ baseUrl: API_BASE_URL }),
  endpoints: (builder) => ({
    sendMessage: builder.mutation({
      query: (data) => {
        const { userID, connectionID, ...body } = data;
        return {
          url: `/api/${userID}/new-chat/${connectionID}`,
          method: "POST",
          body,
        };
      },
    }),

    getChats: builder.query({
      query: ({ userID, connectionID }) => {
        return {
          url: `/api/${userID}/get-chats/${connectionID}`,
          method: "GET",
        };
      },
    }),
  }),
});

export const { useSendMessageMutation, useGetChatsQuery } = chats;
