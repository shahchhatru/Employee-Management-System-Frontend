import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query";
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

        }
        ),
        getAllUsers: builder.query<UserResponse, void>({
            query: () => "users/all",
            providesTags: ["User"],
        }),



    }),
})