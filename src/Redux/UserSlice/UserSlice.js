// Need to use the React-specific entry point to import createApi
import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";
import API_BASE_URL from "../../Config";

// Define a service using a base URL and expected endpoints
export const auth = createApi({
  reducerPath: "auth",
  baseQuery: fetchBaseQuery({ baseUrl: API_BASE_URL }),
  endpoints: (builder) => ({
    register: builder.mutation({
      query: (data) => {
        return {
          url: "/api/auth/register",
          method: "POST",
          body: data,
        };
      },
    }),
    registerStudent: builder.mutation({
      query: (data) => {
        return {
          url: "/api/auth/register-student",
          method: "POST",
          body: data,
        };
      },
    }),
    registerPremium: builder.mutation({
      query: (data) => {
        return {
          url: "/api/premium-professional-signup",
          method: "POST",
          body: data,
        };
      },
    }),
    login: builder.mutation({
      query: (data) => {
        return {
          url: "/api/auth/login",
          method: "POST",
          body: data,
        };
      },
    }),
    verifyOtp: builder.mutation({
      query: (data) => {
        return {
          url: "api/auth/verify-otp",
          method: "PATCH",
          body: data,
        };
      },
    }),
    resendOtp: builder.mutation({
      query: (email) => {
        return {
          url: "/api/auth/resend-otp",
          method: "PATCH",
          body: email,
        };
      },
    }),
    getAllUsers: builder.query({
      query: () => {
        return {
          url: "/api/auth/get-users",
          method: "GET",
        };
      },
    }),
    getQuestionaireInfo: builder.query({
      query: (userID) => {
        return {
          url: `/api/auth/specific-questionaire/${userID}`,
          method: "GET",
        };
      },
    }),
    getSingleUser: builder.query({
      query: (userID) => {
        return {
          url: `/api/auth/${userID}/single-user`,
          method: "GET",
        };
      },
    }),
    Post_Questionaire: builder.mutation({
      query: ({ userID, data }) => {
        return {
          url: `/api/questionare/${userID}`,
          method: "POST",
          body: data,
        };
      },
    }),
    Update_Questionaire: builder.mutation({
      query: ({ userID, data }) => {
        return {
          url: `/api/auth/update-questionaire/${userID}`,
          method: "PATCH",
          body: data,
        };
      },
    }),
    Post_Student_Questionaire: builder.mutation({
      query: ({ userID, data }) => {
        return {
          url: `/api/student-questionaire/${userID}`,
          method: "POST",
          body: data,
        };
      },
    }),
    forget_pass: builder.mutation({
      query: (data) => {
        return {
          url: `/api/auth/forgot-password`,
          method: "PATCH",
          body: data,
        };
      },
    }),
    register_Premium: builder.mutation({
      query: (data) => {
        return {
          url: `/api/premium-professional-signup`,
          method: "POST",
          body: data,
        };
      },
    }),
  }),
});

export const {
  useRegisterMutation,
  useLoginMutation,
  useVerifyOtpMutation,
  useResendOtpMutation,
  useRegisterPremiumMutation,
  useRegisterStudentMutation,
  useGetAllUsersQuery,
  useGetSingleUserQuery,
  useGetQuestionaireInfoQuery,
  usePost_QuestionaireMutation,
  usePost_Student_QuestionaireMutation,
  useForget_passMutation,
  useUpdate_QuestionaireMutation,
  useRegister_PremiumMutation,
} = auth;
