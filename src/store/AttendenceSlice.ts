import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";
import type { AttendenceResponse, Attendence } from "../types/attendence";

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
    getAttendence: builder.query<AttendenceResponse, void>({
      query: () => `attendence`,
      providesTags: ["Attendence"],
    }),
    checkAttendence: builder.mutation<AttendenceResponse, string>({
      query: (date) => ({
        url: `attendence/check/${date}`,
        method: "POST",
      }),
      invalidatesTags: ["Attendence"],
    }),
  }),
});
