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
  endpoints: (builder) => ({
    generatePDF: builder.mutation<void, PDFInput>({
      queryFn: async (arg, _queryApi, _extraOptions, fetchWithBQ) => {
        try {
          const response = await fetchWithBQ({
            url: "generate-pdf",
            method: "POST",
            body: arg,
            responseHandler: (response) => response.blob(),
          });

          if (response.error) throw response.error;

          const blob = response.data as Blob;
          const url = window.URL.createObjectURL(blob);
          const a = document.createElement("a");
          a.style.display = "none";
          a.href = url;
          a.download = "generated.pdf";
          document.body.appendChild(a);
          a.click();
          window.URL.revokeObjectURL(url);
          document.body.removeChild(a);

          return { data: undefined };
        } catch (error) {
          return {
            error: { status: "CUSTOM_ERROR", error: "Failed to generate PDF" },
          };
        }
      },
    }),
  }),
});

export const { useGeneratePDFMutation } = pdfApi;
