import { CANDIDATES_URL, VOTERS_URL } from "@/constants";
import { apiSlice } from "./apiSlice";

export const usersApiSlice = apiSlice.injectEndpoints({
  endpoints: (builder) => ({
    login: builder.mutation({
      query: (data) => ({
        url: `${CANDIDATES_URL}/login`,
        method: "POST",
        body: data,
      }),
    }),
    register: builder.mutation({
      query: (data) => {
        const formData = new FormData();

        // Append text fields
        formData.append("firstName", data.firstName);
        formData.append("lastName", data.lastName);
        formData.append("email", data.email);
        formData.append("studentId", data.studentId);
        formData.append("electionId", data.electionId); // 👈 important if linking to elections

        // Append files if they exist
        if (data.photo) formData.append("photo", data.photo);
        if (data.transcript) formData.append("transcript", data.transcript);
        if (data.manifesto) formData.append("manifesto", data.manifesto);
        if (data.additionalDocs) {
          data.additionalDocs.forEach((file) =>
            formData.append("additionalDocs", file)
          );
        }

        return {
          url: `${CANDIDATES_URL}/register`,
          method: "POST",
          body: formData,
          // ❌ do not set Content-Type manually!
        };
      },
      transformResponse: (response) => ({
        ...response,
        user: response.voter || response.user,
      }),
    }),

    logout: builder.mutation({
      query: () => ({
        url: `${CANDIDATES_URL}/logout`,
        method: "POST",
      }),
    }),

    verifyEmail: builder.mutation({
      query: (data) => ({
        url: `${CANDIDATES_URL}/verify`,
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

    profile: builder.mutation({
      query: (data) => ({
        url: `${CANDIDATES_URL}/profile`,
        method: "PUT",
        body: data,
      }),
    }),
    getUsers: builder.query({
      query: () => ({
        url: CANDIDATES_URL,
      }),
      providesTags: ["Voters"],
      keepUnusedDataFor: 5,
    }),
    deleteUser: builder.mutation({
      query: (userId) => ({
        url: `${CANDIDATES_URL}/${userId}`,
        method: "DELETE",
      }),
      providesTags: ["Voter"],
      keepUnusedDataFor: 5,
    }),
    getUserDetails: builder.query({
      query: (userId) => ({
        url: `${CANDIDATES_URL}/${userId}`,
      }),
      keepUnusedDataFor: 5,
    }),
    updateUser: builder.mutation({
      query: (data) => ({
        url: `${CANDIDATES_URL}/${data._id}`,
        method: "PUT",
        body: data,
      }),
      invalidatesTags: ["Voter"],
    }),

    getMyApplications: builder.query({
      query: () => ({
        url: `${VOTERS_URL}/applications`,
        method: "GET",
        credentials: "include", // if you need cookies for auth

        transformResponse: (response) => {
          console.log("Raw applications response:", response);
          // If response is directly an array of applications
          if (Array.isArray(response)) {
            return response;
          }
          // If response has nested structure like { applications: [...] }
          return response.applications || response.data || [];
        },
      }),
    }),

    getPendingForumQuestions: builder.query({
      query: () => ({
        url: `${CANDIDATES_URL}/forum/questions/pending`,
        method: "GET",
        credentials: "include", // if you need cookies for auth

        transformResponse: (response) => {
          console.log("Raw questions response:", response);
          // If response is directly an array of questions
          if (Array.isArray(response)) {
            return response;
          }
          // If response has nested structure like { questions: [...] }
          return response.questions || response.data || [];
        },
      }),
    }),

    answerPendingQuestion: builder.mutation({
      query: (data) => ({
        url: `${CANDIDATES_URL}/forum/questions/${data.questionId}/answer`,
        method: "POST",
        body: data,
      }),
    }),

    getAnsweredQuestions: builder.query({
      query: () => ({
        url: `${CANDIDATES_URL}/forum/questions/answered`,
        method: "GET",
        credentials: "include", // if you need cookies for auth

        transformResponse: (response) => {
          console.log("Raw questions response:", response);
          // If response is directly an array of questions
          if (Array.isArray(response)) {
            return response;
          }
          // If response has nested structure like { questions: [...] }
          return response.questions || response.data || [];
        },
      }),
    }),

    getForumStats: builder.query({
      query: () => ({
        url: `${CANDIDATES_URL}/forum/question/stats`,
        method: "GET",
        credentials: "include", // if you need cookies for auth
      }),
      transformResponse: (response) => {
        console.log("Raw forum stats response:", response);
        // If response is directly an object with stats
        if (response && typeof response === "object") {
          return response;
        }
        // If response has nested structure like { stats: [...] }
        return response.stats || response.data || [];
      },
    }),
    getVoteStats: builder.query({
      query: () => ({
        url: `${CANDIDATES_URL}/me/vote-stats`,
        method: "GET",
        credentials: "include", // if you need cookies for auth
      }),
      transformResponse: (response) => {
        console.log("Raw vote stats response:", response);
        // If response is directly an object with stats
        if (response && typeof response === "object") {
          return response;
        }
        // If response has nested structure like { stats: [...] }
        return response.stats || response.data || [];
      },
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
  useGetMyApplicationsQuery,
  useGetPendingForumQuestionsQuery,
  useAnswerPendingQuestionMutation,
  useGetAnsweredQuestionsQuery,
  useGetForumStatsQuery,
  useGetVoteStatsQuery,
} = usersApiSlice;
