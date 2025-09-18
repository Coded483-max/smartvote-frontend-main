import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";
import { BASE_URL } from "../constants";

const baseQuery = fetchBaseQuery({
  baseUrl: BASE_URL, // or your API base URL
  credentials: "include", // Important for authentication
  prepareHeaders: (headers, { getState }) => {
    // Get token from auth state
    const token =
      getState().auth.superAdmin?.token ||
      getState().auth.admin?.token ||
      getState().auth.voter?.token;

    if (token) {
      headers.set("authorization", `Bearer ${token}`);
    }

    return headers;
  },
});

export const apiSlice = createApi({
  baseQuery,
  tagTypes: [
    "Election",
    "Candidate",
    "Voter",
    "Admin",
    "SuperAdmin",
    "Position",
  ],
  endpoints: (builder) => ({}),
});
