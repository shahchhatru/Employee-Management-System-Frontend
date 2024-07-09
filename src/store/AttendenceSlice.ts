import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";
import type {
  AttendenceResponse,
  Attendence,
  UserAttendenceResponse,
} from "../types/attendence";

import { API_BASE_URL } from "@/constants";
import { RootState } from "./Store";

export const attendenceApi = createApi({
  reducerPath: "attendenceApi",
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
  tagTypes: ["Attendence"],
  endpoints: (builder) => ({
    getAdminAttendence: builder.query<AttendenceResponse, void>({
      query: () => `attendence/adminAttendenceToken`,
      providesTags: ["Attendence"],
    }),
    checkAttendence: builder.mutation<AttendenceResponse, Partial<Attendence>>({
      query: (attendence) => ({
        url: `attendence/check/`,
        method: "POST",
        body: { ...attendence },
      }),
      invalidatesTags: ["Attendence"],
    }),

    // Add other queries here
    getMyAttendence: builder.query<UserAttendenceResponse, void>({
      query: (id) => `attendence/myAttendence/`,
      providesTags: ["Attendence"],
    }),
  }),
});

export const {
  useGetAdminAttendenceQuery,
  useCheckAttendenceMutation,
  useGetMyAttendenceQuery,
} = attendenceApi;
