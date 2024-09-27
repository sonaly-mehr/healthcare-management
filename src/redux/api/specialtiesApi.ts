import { tagTypes } from "../tag-types";
import { baseApi } from "./baseApi";

const specialtiesApi = baseApi.injectEndpoints({
  endpoints: (build) => ({
    createSpecialty: build.mutation({
      query: (data) => ({
        url: "/specialties",
        method: "POST",
        contentType: "multipart/form-data",
        data,
      }),
      invalidatesTags: [tagTypes.specialties],
    }),

    getAllSpecialties: build.query({
      query: () => ({
        url: "/specialties",
        method: "GET",
      }),
      providesTags: [tagTypes.specialties],
    }),
    getSingleSpecialty: build.query({
      query: (id: string) => ({
        url: `/specialties/${id}`,
        method: "GET",
      }),
      providesTags: (result, error, id) => [{ type: tagTypes.specialties, id }],
    }),
    updateSpecialty: build.mutation({
      query: ({ id, body }) => ({
        url: `/specialties/${id}`,
        method: "PATCH",
        body
      }),
      invalidatesTags: [tagTypes.specialties],
    }),

    deleteSpecialty: build.mutation({
      query: (id) => ({
        url: `/specialties/${id}`,
        method: "DELETE",
      }),
      invalidatesTags: [tagTypes.specialties],
    }),
  }),
});

export const {
  useCreateSpecialtyMutation,
  useGetAllSpecialtiesQuery,
  useGetSingleSpecialtyQuery,
  useUpdateSpecialtyMutation,
  useDeleteSpecialtyMutation,
} = specialtiesApi