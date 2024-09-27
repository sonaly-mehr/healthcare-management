import { baseApi } from "./baseApi";
import { tagTypes } from "../tag-types";
import { IMeta } from "@/types/common";

export const patientApi = baseApi.injectEndpoints({
  endpoints: (build) => ({

    getAllPatient: build.query({
      query: (arg: Record<string, any>) => ({
        url: "/patient",
        method: "GET",
        params: arg,
      }),
      transformResponse: (response, meta: IMeta) => {
        return {
          patients: response,
          meta,
        };
      },
      providesTags: [tagTypes.patient],
    }),

    deletePatient: build.mutation({
      query: (id) => ({
        url: `/patient/soft/${id}`,
        method: "DELETE",
      }),
      invalidatesTags: [tagTypes.patient],
    }),
    //get single doctor
    getPatient: build.query({
      query: (id: string | string[] | undefined) => ({
        url: `/patient/${id}`,
        method: "GET",
      }),
      providesTags: [tagTypes.patient],
    }),
    // update a doctor
    updatePatient: build.mutation({
      query: (data) => ({
        url: `/patient/${data.id}`,
        method: "PATCH",
        data: data.body,
      }),
      invalidatesTags: [tagTypes.patient],
    }),
  }),
});

export const {
  useGetAllPatientQuery,
  useDeletePatientMutation,
  useGetPatientQuery,
  useUpdatePatientMutation,
} = patientApi;