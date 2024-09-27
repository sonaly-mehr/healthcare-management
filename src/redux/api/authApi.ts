import { tagTypes } from '../tag-types';
import { baseApi } from './baseApi';

export const authApi = baseApi.injectEndpoints({
   endpoints: (build) => ({
      userLogin: build.mutation({
         query: (loginData) => ({
            url: '/login',
            method: 'POST',
            data: loginData,
         }),
         invalidatesTags: [tagTypes.user],
      }),
      changePassword: build.mutation({
         query: (data) => ({
            url: `/auth/change-password`,
            method: 'POST',
            contentType: 'application/json',
            data: data,
         }),
         invalidatesTags: [tagTypes.user],
      }),
      forgotPassword: build.mutation({
         query: (data) => ({
            url: '/auth/forgot-password',
            method: 'POST',
            data: data,
         }),
         invalidatesTags: [tagTypes.user],
      }),
      resetPassword: build.mutation({
         query: (data) => ({
            url: '/auth/reset-password',
            method: 'POST',
            data: data,
         }),
         invalidatesTags: [tagTypes.user],
      }),
   }),
});

export const {
   useUserLoginMutation,
   useChangePasswordMutation,
   useForgotPasswordMutation,
   useResetPasswordMutation,
} = authApi;