import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";
import type { ApplicationResponse, Application } from "../types/application";

import { API_BASE_URL } from "@/constants";
import { RootState } from "./Store";

// Define a service using a base URL and expected endpoints
export const applicationApi = createApi({
  reducerPath: "applicationApi",
  baseQuery: fetchBaseQuery({
    baseUrl: API_BASE_URL,
    prepareHeaders: (headers, { getState }) => {
      // Get the auth token from the state
      const token = (getState() as RootState).auth?.accessToken;

      // If we have a token, set the Authorization header
      if (token) {
        headers.set("Authorization", `Bearer ${token}`);
      }
      return headers;
    },
  }),
  tagTypes: ["Application"], // Define tag types
  endpoints: (builder) => ({
    getApplications: builder.query<ApplicationResponse, void>({
      query: () => `applications`,
      providesTags: ["Application"], // Provide tags for this query
    }),
    getApplicationByOrg: builder.query<ApplicationResponse, void>({
      query: () => `applications/org/`,
      providesTags: ["Application"],
    }),
    getApplicationBySupervisor: builder.query<ApplicationResponse, string>({
      query: (id) => `applications/supervisor/${id}`,
      providesTags: ["Application"],
    }),
    getApplicationByUser: builder.query<ApplicationResponse, string>({
      query: (id) => `applications/user/${id}`,
      providesTags: ["Application"],
    }),


    createApplication: builder.mutation<ApplicationResponse, Application>({
      query: (application) => ({
        url: `applications`,
        method: "POST",
        body: application,
      }),
      invalidatesTags: ["Application"], // Invalidate tags on mutation success
    }),
    updateApplication: builder.mutation<
      ApplicationResponse,
      { id: string; applicationData: Partial<Application> }
    >({
      query: ({ id, applicationData }) => ({
        url: `applications/status/${id}`,
        method: "PATCH",
        body: applicationData,
      }),
      invalidatesTags: ["Application"], // Invalidate tags on mutation success
    }),
    deleteApplication: builder.mutation<ApplicationResponse, { id: string }>({
      query: ({ id }) => ({
        url: `applications/${id}`,
        method: "DELETE",
      }),
      invalidatesTags: ["Application"], // Invalidate tags on mutation success
    }),
  }),
});

export const {
  useGetApplicationsQuery,
  useGetApplicationByOrgQuery,
  useGetApplicationBySupervisorQuery,
  useGetApplicationByUserQuery,
  useCreateApplicationMutation,
  useUpdateApplicationMutation,
  useDeleteApplicationMutation,
} = applicationApi;
