import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";
import { VerifyOrganization } from '@/types/verifyOrganization'
import { API_BASE_URL } from "@/constants";
import { RootState } from "./Store";

export const organizationApi = createApi({
    reducerPath: "organizationApi",
    baseQuery: fetchBaseQuery({
        baseUrl: API_BASE_URL,
        prepareHeaders: (headers, { getState }) => {
            // get the auth token from the state
            const token = (getState() as RootState).auth.accessToken;

            //if we have token  from the state
            if (token) {
                headers.set('Authorization', `Bearer ${token}`)
            }

            return headers;

        }
    }),
    tagTypes: ["Verification"],
    endpoints: (builder) => ({
        verifyOrganization: builder.mutation<any, VerifyOrganization>({
            query: (data) => ({
                url: `users/${data.user}/otp/organization/verify`,
                method: "POST",
                body: { otp: data.otp }
            })
        })
    })

})


export const { useVerifyOrganizationMutation } = organizationApi

