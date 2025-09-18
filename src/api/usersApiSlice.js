import { VOTERS_URL } from "@/constants";
import { apiSlice } from "./apiSlice";

export const usersApiSlice = apiSlice.injectEndpoints({
  endpoints: (builder) => ({
    login: builder.mutation({
      query: (data) => ({
        url: `${VOTERS_URL}/login`,
        method: "POST",
        body: data,
      }),
    }),
    register: builder.mutation({
      query: (data) => ({
        url: `${VOTERS_URL}/register`,
        method: "POST",
        body: data,
      }),
      transformResponse: (response) => {
        return {
          ...response,
          user: response.voter || response.user,
        };
      },
    }),
    logout: builder.mutation({
      query: () => ({
        url: `${VOTERS_URL}/logout`,
        method: "POST",
      }),
    }),

    verifyEmail: builder.mutation({
      query: (data) => ({
        url: `${VOTERS_URL}/verify`,
        method: "POST",
        body: data, // Now accepts { verificationCode, email }
      }),
      transformResponse: (response) => {
        return {
          ...response,
          user: response.voter || response.user,
        };
      },

      invalidatesTags: ["Voter"],
    }),

    forgotPassword: builder.mutation({
      query: (data) => ({
        url: `${VOTERS_URL}/forgot-password`,
        method: "POST",
        body: data,
      }),
    }),

    resetPassword: builder.mutation({
      query: (data) => ({
        url: `${VOTERS_URL}/reset-password/${data.resetToken}`,
        method: "POST",
        body: data,
      }),
    }),

    profile: builder.mutation({
      query: (data) => ({
        url: `${VOTERS_URL}/profile`,
        method: "PUT",
        body: data,
      }),
    }),
    getUsers: builder.query({
      query: () => ({
        url: VOTERS_URL,
      }),
      providesTags: ["Voters"],
      keepUnusedDataFor: 5,
    }),
    deleteUser: builder.mutation({
      query: (userId) => ({
        url: `${VOTERS_URL}/${userId}`,
        method: "DELETE",
      }),
      providesTags: ["Voter"],
      keepUnusedDataFor: 5,
    }),
    getUserDetails: builder.query({
      query: (userId) => ({
        url: `${VOTERS_URL}/${userId}`,
      }),
      keepUnusedDataFor: 5,
    }),
    updateUser: builder.mutation({
      query: (data) => ({
        url: `${VOTERS_URL}/${data._id}`,
        method: "PUT",
        body: data,
      }),
      invalidatesTags: ["Voter"],
    }),
  }),
});

export const {
  useLoginMutation,
  useRegisterMutation,
  useVerifyEmailMutation,
  useLogoutMutation,
  useDeleteUserMutation,
  useGetUserDetailsQuery,
  useGetUsersQuery,
  useProfileMutation,
  useUpdateUserMutation,
  useResetPasswordMutation,
  useForgotPasswordMutation,
} = usersApiSlice;
