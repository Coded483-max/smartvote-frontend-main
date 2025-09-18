import { apiSlice } from "./apiSlice";
import { ELECTIONS_URL, CANDIDATES_URL, POSITIONS_URL } from "../constants";

export const electionsApi = apiSlice.injectEndpoints({
  endpoints: (builder) => ({
    getActiveElections: builder.query({
      query: () => `${ELECTIONS_URL}/public/active`,
      transformResponse: (response) =>
        response.elections || response.data || [],
    }),
    getActiveElectionsForRegistration: builder.query({
      query: () => `${ELECTIONS_URL}/public/active/registration`,
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

    // ✅ Get election turnout
    getElectionTurnout: builder.query({
      query: (electionId) => `/elections/${electionId}/turnout`,
      transformResponse: (res) => ({
        electionId: res.electionId,
        title: res.title,
        totalEligible: res.totalEligible,
        totalVoted: res.totalVoted,
        turnoutPercent: Number(res.turnoutPercent),
        totalDidNotVote: res.totalDidNotVote,
      }),
    }),

    // ✅ Get election audit trail
    getElectionAuditTrail: builder.query({
      query: (electionId) => `/elections/${electionId}/audit-trail`,
      transformResponse: (res) =>
        res.events.map((e) => ({
          event: e.event,
          blockNumber: e.blockNumber,
          txHash: e.txHash,
          timestamp: e.timestamp,
          args: e.args,
        })),
    }),
  }),
});

export const {
  useGetAllElectionsQuery,
  useGetActiveElectionsQuery,
  useGetElectionDetailsQuery,
  useCheckEligibilityQuery,
  useGetElectionPositionsQuery,
  useRegisterCandidateMutation,
  useGetActiveElectionsForRegistrationQuery,
  useGetElectionAuditTrailQuery,
  useGetElectionTurnoutQuery,
} = electionsApi;
