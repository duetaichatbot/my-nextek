// Need to use the React-specific entry point to import createApi
import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";
import API_BASE_URL from "../../Config";

// Define a service using a base URL and expected endpoints
export const stripeSlice = createApi({
  reducerPath: "stripe",
  baseQuery: fetchBaseQuery({ baseUrl: API_BASE_URL }),
  endpoints: (builder) => ({
    yearlySubs: builder.mutation({
      query: ({ userID, data }) => {
        return {
          url: `/api/create-yearly-subscription/${userID}`,
          method: "POST",
          body: { data },
        };
      },
    }),
  }),
});

export const { useYearlySubsMutation } = stripeSlice;
