// Need to use the React-specific entry point to import createApi
import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react'
import API_BASE_URL from '../../Config'

// Define a service using a base URL and expected endpoints
export const institute = createApi({
  reducerPath: 'institute',
  baseQuery: fetchBaseQuery({ baseUrl: API_BASE_URL }),
  endpoints: (builder) => ({
    getInstitute: builder.query({
      query: () => {
        return {
            url:'/api/institute/all-institutes',
            method: "GET",
        }
      }
    }),
    getProfessionalInstitute: builder.query({
      query: () => {
        return {
            url:'/api/institute/all_proffesionals_institutes',
            method: "GET",
        }
      }
    }),
  }),
  
})



export const { useGetInstituteQuery, useGetProfessionalInstituteQuery } = institute