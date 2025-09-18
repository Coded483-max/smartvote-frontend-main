import { apiSlice } from "./apiSlice";
import {
  ADMINS_URL,
  CANDIDATES_URL,
  VOTERS_URL,
  POSITIONS_URL,
  ELECTIONS_URL,
  ELECTIONS_STATUS_URL,
} from "../constants";

export const superAdminsApi = apiSlice.injectEndpoints({
  endpoints: (builder) => ({
    SuperAdminLogin: builder.mutation({
      query: (data) => ({
        url: `${ADMINS_URL}/super-login`,
        method: "POST",
        body: data,
      }),
      invalidatesTags: ["SuperAdmin"],
    }),
    superAdminLogout: builder.mutation({
      query: () => ({
        url: `${ADMINS_URL}/super-logout`,
        method: "POST",
      }),
      invalidatesTags: ["SuperAdmin"],
    }),

    createElection: builder.mutation({
      query: (electionData) => ({
        url: `${ELECTIONS_URL}/create`,
        method: "POST",
        body: electionData,
      }),
      invalidatesTags: ["Election"],
    }),
    createAdmin: builder.mutation({
      query: (data) => ({
        url: `${ADMINS_URL}/create`,
        method: "POST",
        body: data,
      }),
      invalidatesTags: ["Admin"],
    }),
    getAllAdmins: builder.query({
      query: () => `${ADMINS_URL}/admins`,
      headers: {
        "Content-Type": "application/json",
      },
      providesTags: ["Admins"],
    }),
    // ✅ New endpoint to get positions by level (for preview)
    getPositionsByLevel: builder.query({
      query: ({ level, department }) => ({
        url: `${POSITIONS_URL}/by-level`,
        params: { level, ...(department && { department }) },
      }),
      providesTags: ["Position"],
    }),

    // ✅ Get all elections with positions
    getElections: builder.query({
      query: () => `${ELECTIONS_URL}`,
      providesTags: ["Election"],
    }),

    // ✅ Get single election with positions
    getElectionById: builder.query({
      query: (electionId) => `${ELECTIONS_URL}/${electionId}`,
      providesTags: (result, error, electionId) => [
        { type: "Election", id: electionId },
      ],
    }),

    deleteElection: builder.mutation({
      query: (electionId) => ({
        url: `${ELECTIONS_URL}/${electionId}`,
        method: "DELETE",
      }),
      invalidatesTags: ["Election"],
    }),

    // Existing endpoints
    getCandidates: builder.query({
      query: () => `${CANDIDATES_URL}`,
      providesTags: ["Candidate"],
    }),

    getVoters: builder.query({
      query: () => `${VOTERS_URL}`,
      providesTags: ["Voter"],
    }),

    getActiveElections: builder.query({
      query: (includeAll = false) =>
        `/elections/active?includeAll=${includeAll}`,
      providesTags: ["Election"],
    }),

    // ✅ Get positions for selected election
    getElectionPositions: builder.query({
      query: (electionId) => `${ELECTIONS_URL}/${electionId}/positions`,
      providesTags: (result, error, electionId) => [
        { type: "Position", id: electionId },
      ],
    }),

    getCandidateById: builder.query({
      query: (candidateId) => ({
        url: `${CANDIDATES_URL}/${candidateId}`,
        method: "GET",
      }),
      providesTags: (result, error, candidateId) => [
        { type: "Candidate", id: candidateId },
        { type: "Candidate", id: "LIST" }, // For invalidating candidate lists
      ],
      // ✅ Add error handling
      transformErrorResponse: (response, meta, arg) => ({
        status: response.status,
        message: response.data?.message || "Failed to fetch candidate",
        candidateId: arg,
      }),
      // ✅ Add response transformation if needed
      transformResponse: (response) => {
        console.log("Raw API response:", response);

        // Your API returns: { candidate: {...}, message: "..." }
        // We want to return just the candidate data
        if (response.candidate) {
          return response.candidate;
        }

        // Fallback for different response structures
        return response.data || response;
      },
    }),

    // ✅ Get candidates for election
    getCandidatesByElection: builder.query({
      query: ({ electionId, ...params }) => ({
        url: `/elections/${electionId}/candidates`,
        params,
      }),
      providesTags: (result, error, { electionId }) => [
        { type: "Candidate", id: electionId },
      ],
    }),

    // ✅ Get candidates for specific position
    getCandidatesByPosition: builder.query({
      query: ({ electionId, positionId, ...params }) => ({
        url: `/elections/${electionId}/positions/${positionId}/candidates`,
        params,
      }),
      providesTags: (result, error, { electionId, positionId }) => [
        { type: "Candidate", id: `${electionId}-${positionId}` },
      ],
    }),

    approveCandidate: builder.mutation({
      query: ({ candidateId }) => ({
        url: `${ADMINS_URL}/candidates/${candidateId}/approve`,
        method: "PUT",
        body: { status: "approved" },
      }),
      invalidatesTags: (result, error, { candidateId }) => [
        { type: "Candidate", id: candidateId },
      ],
    }),
    rejectCandidate: builder.mutation({
      query: ({ candidateId, rejectionReason }) => ({
        url: `${CANDIDATES_URL}/${candidateId}/reject`,
        method: "PATCH",
        body: { rejectionReason },
      }),
      invalidatesTags: (result, error, { candidateId }) => [
        { type: "Candidate", id: candidateId },
      ],
    }),

    toggleElectionStatus: builder.mutation({
      query: ({ electionId, status }) => ({
        url: `${ELECTIONS_STATUS_URL}/${electionId}/status`,
        method: "PATCH",
        body: { status },
      }),
      invalidatesTags: ["Election"],
    }),

    getElectionDetailsForAdmin: builder.query({
      query: (electionId) => `${ELECTIONS_URL}/${electionId}`,
      transformResponse: (response) =>
        response.election || response.data || response,
    }),
  }),
});

export const {
  useSuperAdminLoginMutation,
  useCreateElectionMutation,
  useGetCandidatesQuery,
  useGetVotersQuery,
  useCreateAdminMutation,
  useGetAllAdminsQuery,
  useGetPositionsByLevelQuery,
  useGetElectionsQuery,
  useGetElectionByIdQuery,
  useGetActiveElectionsQuery,
  useGetElectionPositionsQuery,
  useGetCandidateByIdQuery,
  useGetCandidatesByElectionQuery,
  useGetCandidatesByPositionQuery,
  useToggleElectionStatusMutation,
  useApproveCandidateMutation,
  useRejectCandidateMutation,
  useSuperAdminLogoutMutation,
  useDeleteElectionMutation,
  useGetElectionDetailsForAdminQuery,
} = superAdminsApi;
