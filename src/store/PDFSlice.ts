import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";
import { PDFSERVER_URL } from "@/constants";
import { RootState } from "./Store";
import { PDFInput } from "@/types/PDFInput";

export const pdfApi = createApi({
  reducerPath: "pdfApi",
  baseQuery: fetchBaseQuery({
    baseUrl: PDFSERVER_URL,
    prepareHeaders: (headers, { getState }) => {
      const token = (getState() as RootState).auth.accessToken;
      if (token) {
        headers.set("Authorization", `Bearer ${token}`);
      }
      return headers;
    },
  }),
  tagTypes: ["PDF"],
  endpoints: (builder) => ({
    generatePDF: builder.mutation<any, PDFInput>({
      query: (data) => ({
        url: `generate-pdf`,
        method: "POST",
        body: data,
      }),
      invalidatesTags: ["PDF"],
    }),
  }),
});

export const { useGeneratePDFMutation } = pdfApi;
