import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";
import type { SalaryResponse, SalaryStateInputs } from "../types/salary";
import { API_BASE_URL } from "@/constants";
import { RootState } from "./Store";

export const salaryApi = createApi({
    reducerPath: "salaryApi",
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
    tagTypes: ["Salary"],
    endpoints: (builder) => ({
        getSalariesByOrg: builder.query<SalaryResponse[], void>({
            query: () => `salary`,
            providesTags: ["Salary"],
        }),
        createSalary: builder.mutation<SalaryResponse, SalaryStateInputs>({
            query: (salaryData) => ({
                url: `salary`,
                method: "POST",
                body: salaryData,
            }),
            invalidatesTags: ["Salary"],
        }),
        getSalariesByUser: builder.query<SalaryResponse[], string>({
            query: (user) => `salary/${user}`,
            providesTags: ["Salary"],
        }),
        getSalaries: builder.query<SalaryResponse[], {
            user?: string;
            month?: string;
            year?: string;
        }>({
            query: (params) => {
                const queryParams = new URLSearchParams();
                if (params.user) queryParams.append('user', params.user);
                if (params.month) queryParams.append('month', params.month);
                if (params.year) queryParams.append('year', params.year);
                return `salary/user?${queryParams.toString()}`;
            },
            providesTags: ["Salary"],
        }),
    }),
});

export const {
    useGetSalariesByOrgQuery,
    useCreateSalaryMutation,
    useGetSalariesByUserQuery,
    useGetSalariesQuery,
} = salaryApi;