import { apiSlice } from "./apiSlice";
import { ADMINS_URL, CANDIDATES_URL, VOTERS_URL } from "../constants";

export const adminsApi = apiSlice.injectEndpoints({
  endpoints: (builder) => ({
    adminLogin: builder.mutation({
      query: (data) => ({
        url: `${ADMINS_URL}/login`,
        method: "POST",
        body: data,
      }),
      invalidatesTags: ["Admin"],
    }),
    adminLogout: builder.mutation({
      query: () => ({
        url: `${ADMINS_URL}/logout`,
        method: "POST",
      }),
      invalidatesTags: ["Admin"],
    }),
    getCandidates: builder.query({
      query: () => `${CANDIDATES_URL}`,
      providesTags: ["Candidate"],
    }),
    getVoters: builder.query({
      query: () => `${VOTERS_URL}`,
      providesTags: ["Voter"],
    }),
  }),
});

export const {
  useAdminLoginMutation,
  useGetCandidatesQuery,
  useGetVotersQuery,
  useAdminLogoutMutation,
} = adminsApi;
