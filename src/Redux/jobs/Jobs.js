import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";
import API_BASE_URL from "../../Config";

export const jobs = createApi({
  reducerPath: "jobs",
  baseQuery: fetchBaseQuery({ baseUrl: API_BASE_URL }),
  tagTypes: ["getJobs", "createdJob"],
  endpoints: (builder) => ({
    createJob: builder.mutation({
      query: (formData) => ({
        url: `/api/jobs/create-job`,
        method: "POST",
        body: formData,
      }),
      invalidatesTags: ["getJobs"],
    }),

    getAllJobs: builder.query({
      query: () => ({
        url: `/api/jobs/all-jobs`,
        method: "GET",
      }),
      providesTags: ["getJobs"],
    }),

    applyForJob: builder.mutation({
      query: ({ applicantID, jobID, data }) => {
        return {
          url: `/api/jobs/${applicantID}/apply/${jobID}`,
          method: "PATCH",
          body: data,
        };
      },
    }),

    getApplications: builder.query({
      query: (jobId) => ({
        url: `/api/jobs/get-job-applicants/${jobId}`,
        method: "GET",
      }),
    }),

    getCreatedJobs: builder.query({
      query: (userID) => ({
        url: `/api/jobs/get-created-jobs/${userID}`,
        method: "GET",
      }),
      providesTags: ["getJobs"],
    }),

    getApplicantsJobs: builder.query({
      query: (userID) => ({
        url: `/api/jobs/get-job-applicants/${userID}`,
        method: "GET",
      }),
    }),

    deleteJobs: builder.mutation({
      query: ({ jobID, data }) => ({
        url: `/api/jobs/delete-job/${jobID}`,
        method: "DELETE",
        body: data,
      }),
      invalidatesTags: ["getJobs"],
    }),

    SingleJob: builder.query({
      query: (jobId) => ({
        url: `/api/jobs/single-job/${jobId}`,
        method: "GET",
      }),
      providesTags: ["getJobs"],
    }),
  }),
});

export const {
  useCreateJobMutation,
  useGetAllJobsQuery,
  useGetApplicationsQuery,
  useApplyForJobMutation,
  useGetCreatedJobsQuery,
  useGetApplicantsJobsQuery,
  useDeleteJobsMutation,
  useSingleJobQuery,
} = jobs;
