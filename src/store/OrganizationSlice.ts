import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";
import { VerifyOrganization } from "@/types/verifyOrganization";
import { API_BASE_URL } from "@/constants";

export const organizationApi = createApi({
  reducerPath: "organizationApi",
  baseQuery: fetchBaseQuery({
    baseUrl: API_BASE_URL,
  }),
  tagTypes: ["Verification"],
  endpoints: (builder) => ({
    verifyOrganization: builder.mutation<any, VerifyOrganization>({
      query: (data) => ({
        url: `users/${data.user}/otp/ogranization/verify`,
        method: "POST",
        body: { otp: data.otp },
      }),
    }),
  }),
});

export const { useVerifyOrganizationMutation } = organizationApi;
