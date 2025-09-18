import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";
import { BASE_URL } from "../constants";

export const dataApi = createApi({
  reducerPath: "dataApi",
  baseQuery: fetchBaseQuery({
    baseUrl: `${BASE_URL}/api/data`,
    prepareHeaders: (headers) => {
      headers.set("content-type", "application/json");
      return headers;
    },
  }),
  tagTypes: ["College", "Department"],
  endpoints: (builder) => ({
    getColleges: builder.query({
      query: () => "/colleges",
      providesTags: ["College"],
      transformResponse: (response) => response.data || response.colleges,
    }),

    getDepartments: builder.query({
      query: () => "/departments",
      providesTags: ["Department"],
      transformResponse: (response) => response.data || response.departments,
    }),

    getDepartmentsByCollege: builder.query({
      query: (college) =>
        `/departments/by-college?college=${encodeURIComponent(college)}`,
      providesTags: (result, error, college) => [
        { type: "Department", id: college },
      ],
      transformResponse: (response) => response.data || response.departments,
    }),
    getAcademicYears: builder.query({
      query: () => "/academic-years",
      providesTags: ["Academic Years"],
      transformResponse: (response) => response.data || response.years,
    }),
  }),
});

export const {
  useGetCollegesQuery,
  useGetDepartmentsQuery,
  useGetDepartmentsByCollegeQuery,
  useGetAcademicYearsQuery,
} = dataApi;
