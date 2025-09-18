import { apiSlice } from "./apiSlice";
import { ELECTIONS_URL, CANDIDATES_URL, VOTING_URL } from "../constants";

export const votingApi = apiSlice.injectEndpoints({
  endpoints: (builder) => ({
    castVote: builder.mutation({
      query: (voteData) => ({
        url: `${VOTING_URL}/cast`,
        method: "POST",
        body: voteData,
      }),
    }),
    getActiveElectionsForRegistration: builder.query({
      query: () => `${VOTING_URL}/public/active/registration`,
      transformResponse: (response) =>
        response.elections || response.data || [],
    }),
    getAllElections: builder.query({
      query: () => `${ELECTIONS_URL}`,
      transformResponse: (response) =>
        response.elections || response.data || [],
    }),

    getElectionDetails: builder.query({
      query: (electionId) => `${ELECTIONS_URL}/public/${electionId}`,
      transformResponse: (response) =>
        response.election || response.data || response,
    }),

    getElectionPositions: builder.query({
      query: (electionId) => `${ELECTIONS_URL}/${electionId}/positions`,
      // ✅ Update transform to handle the actual data structure
      transformResponse: (response) => {
        console.log("Raw positions response:", response);
        // If response is directly an array of positions
        if (Array.isArray(response)) {
          return response;
        }
        // If response has nested structure like { positions: [...] }
        return response.positions || response.data || [];
      },
    }),

    checkEligibility: builder.query({
      query: (params) => ({
        url: `${ELECTIONS_URL}/public/check-eligibility`, // ✅ New path
        params,
      }),
    }),
    registerCandidate: builder.mutation({
      query: (formData) => ({
        url: `${CANDIDATES_URL}/register`, // ✅ New path
        method: "POST",
        body: formData,
      }),
      invalidatesTags: ["Election"],
    }),
  }),
});

export const {
  useCastVoteMutation,
  useGetAllElectionsQuery,
  useGetActiveElectionsQuery,
  useGetElectionDetailsQuery,
  useCheckEligibilityQuery,
  useGetElectionPositionsQuery,
  useRegisterCandidateMutation,
  useGetActiveElectionsForRegistrationQuery,
} = votingApi;
