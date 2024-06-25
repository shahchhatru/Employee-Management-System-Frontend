import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";
import type { ProfileResponse, ProfileInput } from "../types/Profile";
import { API_BASE_URL } from "@/constants";
import { RootState } from "./Store";
// Define a service using a base URL and expected endpoints
export const profileApi = createApi({
    reducerPath: "profileApi",
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
    endpoints: (builder) => ({
        getProfile: builder.query<ProfileResponse, void>({
            query: () => `profile`,
        }),
        updateProfile: builder.mutation<ProfileResponse, Partial<ProfileInput>>({
            query: (profile) => ({
                url: `profile`,
                method: "PATCH",
                body: profile,
            }),
        }),
    }),
});

// Export hooks for usage in functional components, which are
// auto-generated based on the defined endpoints
export const { useGetProfileQuery, useUpdateProfileMutation } = profileApi;
