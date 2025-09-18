// store/api/sessionApi.js
import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";

export const sessionApi = createApi({
  reducerPath: "sessionApi",
  baseQuery: fetchBaseQuery({
    baseUrl: "/api/session",
    credentials: "include",
    prepareHeaders: (headers) => {
      headers.set("Content-Type", "application/json");
      return headers;
    },
  }),
  tagTypes: ["Session"],
  endpoints: (builder) => ({
    // Get current session status
    getSessionStatus: builder.query({
      query: () => "/status",
      providesTags: ["Session"],
      // Poll every 30 seconds to check session status
      pollingInterval: 30000,
      // Transform response to handle errors gracefully
      transformResponse: (response) => response,
      transformErrorResponse: (response) => {
        if (response.status === 401) {
          return { isAuthenticated: false, expired: true };
        }
        return response.data || { error: "Unknown error" };
      },
    }),

    // Extend session (update activity)
    extendSession: builder.mutation({
      query: () => ({
        url: "/extend",
        method: "POST",
      }),
      invalidatesTags: ["Session"],
    }),

    // Logout session
    logoutSession: builder.mutation({
      query: () => ({
        url: "/logout",
        method: "POST",
      }),
      invalidatesTags: ["Session"],
    }),

    // Get session activity info
    getSessionActivity: builder.query({
      query: () => "/activity",
      providesTags: ["Session"],
    }),
  }),
});

export const {
  useGetSessionStatusQuery,
  useExtendSessionMutation,
  useLogoutSessionMutation,
  useGetSessionActivityQuery,
} = sessionApi;
