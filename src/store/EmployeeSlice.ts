import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";
import type {
  EmployeeResponse,
  EmployeeInputType,
  EmployeeWithUserInputType,
} from "../types/employee";
import { API_BASE_URL } from "@/constants";
import { RootState } from "./Store";

// Define a service using a base URL and expected endpoints
export const employeeApi = createApi({
  reducerPath: "employeeApi",
  baseQuery: fetchBaseQuery({
    baseUrl: API_BASE_URL,
    prepareHeaders: (headers, { getState }) => {
      // Get the auth token from the state
      const token = (getState() as RootState).auth.accessToken;

      // If we have a token, set the Authorization header
      if (token) {
        headers.set("Authorization", `Bearer ${token}`);
      }
      return headers;
    },
  }),
  tagTypes: ["Employee"], // Define tag types
  endpoints: (builder) => ({
    getEmployee: builder.query<EmployeeResponse, void>({
      query: () => `employee`,
      providesTags: ["Employee"], // Provide tags for this query
    }),
    updateEmployee: builder.mutation<
      EmployeeResponse,
      { id: string; employeeData: Partial<EmployeeInputType> }
    >({
      query: ({ id, employeeData }) => ({
        url: `employee/${id}`,
        method: "PATCH",
        body: employeeData,
      }),
      invalidatesTags: ["Employee"], // Invalidate tags on mutation success
    }),
    createEmployee: builder.mutation<
      EmployeeResponse,
      EmployeeWithUserInputType
    >({
      query: (employee) => ({
        url: `employee/user`,
        method: "POST",
        body: employee,
      }),
      invalidatesTags: ["Employee"], // Invalidate tags on mutation success
    }),
    deleteEmployee: builder.mutation<EmployeeResponse, { id: string }>({
      query: ({ id }) => ({
        url: `employee/${id}`,
        method: "DELETE",
      }),
      invalidatesTags: ["Employee"], // Invalidate tags on mutation success
    }),
  }),
});

// Export hooks for usage in functional components, which are
// auto-generated based on the defined endpoints
export const {
  useGetEmployeeQuery,
  useUpdateEmployeeMutation,
  useCreateEmployeeMutation,
  useDeleteEmployeeMutation,
} = employeeApi;
