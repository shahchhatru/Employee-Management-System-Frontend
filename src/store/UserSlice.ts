import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";
import type { UserResponse } from "../types/user";
import { API_BASE_URL } from "@/constants";
import { RootState } from "./Store";

export const userApi = createApi({
    reducerPath: "userApi",
    baseQuery: fetchBaseQuery({
        baseUrl: API_BASE_URL,
        prepareHeaders: (headers, { getState }) => {
            const token = (getState() as RootState).auth.accessToken;
            if (token) {
                headers.set("Authorization", `Bearer ${token}`);
            }
            return headers;
        },
    }),
    tagTypes: ["User"],
    endpoints: (builder) => ({
        getUser: builder.query<UserResponse, void>({
            query: () => "users",
            providesTags: ["User"],
        }),
        getAllUsers: builder.query<UserResponse, void>({
            query: () => "users/all",
            providesTags: ["User"],
        }),
        // New endpoint for updating user
        updateUser: builder.mutation<UserResponse, { id: string; data: Partial<UserResponse> }>({
            query: ({ id, data }) => ({
                url: `users/${id}`,
                method: 'PUT',
                body: data,
            }),
            invalidatesTags: ["User"],
        }),
    }),
});

export const { useGetUserQuery, useGetAllUsersQuery, useUpdateUserMutation } = userApi;