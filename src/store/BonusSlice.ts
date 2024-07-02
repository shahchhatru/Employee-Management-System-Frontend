import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";
import type { BonusResponse } from "@/types/employee";
import { API_BASE_URL } from "@/constants";
import { RootState } from "./Store";

interface BonusAmount {
    bonusAmount: string;
}

export const bonusApi = createApi({
    reducerPath: "bonusApi",
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
    tagTypes: ["Bonus"],
    endpoints: (builder) => ({
        addBonusAmount: builder.mutation<BonusResponse, { userId: string; bonusAmount: BonusAmount }>({
            query: ({ userId, bonusAmount }) => ({
                url: `employee/bonus/add/${userId}`,
                method: "POST",
                body: bonusAmount,
            }),
            invalidatesTags: ["Bonus"],
        }),
        removeBonusAmount: builder.mutation<BonusResponse, { userId: string; bonusAmount: BonusAmount }>({
            query: ({ userId, bonusAmount }) => ({
                url: `employee/bonus/rm/${userId}`,
                method: "POST",
                body: bonusAmount,
            }),
            invalidatesTags: ["Bonus"],
        }),
        getTotalBonusAmount: builder.query<number, string>({
            query: (userId) => `employee/bonus/total/${userId}`,
            providesTags: ["Bonus"],
        }),
        clearBonusArray: builder.mutation<BonusResponse, string>({
            query: (userId) => ({
                url: `employee/bonus/clear/${userId}`,
                method: "GET", // This is a GET request as per your routes, but you might want to change it to POST or DELETE
            }),
            invalidatesTags: ["Bonus"],
        }),
    }),
});


export const {
    useAddBonusAmountMutation,
    useRemoveBonusAmountMutation,
    useGetTotalBonusAmountQuery,
    useClearBonusArrayMutation,
} = bonusApi;

