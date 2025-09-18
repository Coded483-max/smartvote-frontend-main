import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";

export const securityLogsApi = createApi({
  reducerPath: "securityLogsApi",
  baseQuery: fetchBaseQuery({
    baseUrl: "/api/security-logs",
    prepareHeaders: (headers, { getState }) => {
      // Add auth token if available
      const token =
        getState().auth?.token ||
        localStorage.getItem("adminToken") ||
        localStorage.getItem("superAdminToken");
      if (token) {
        headers.set("authorization", `Bearer ${token}`);
      }
      return headers;
    },
    credentials: "include", // Include cookies
  }),
  tagTypes: ["SecurityLog", "SecurityStats"],
  endpoints: (builder) => ({
    // ✅ **Get Security Logs with Filters**
    getSecurityLogs: builder.query({
      query: (params = {}) => {
        const searchParams = new URLSearchParams();

        // Add all filter parameters
        if (params.page) searchParams.append("page", params.page);
        if (params.limit) searchParams.append("limit", params.limit);
        if (params.severity) searchParams.append("severity", params.severity);
        if (params.category) searchParams.append("category", params.category);
        if (params.event) searchParams.append("event", params.event);
        if (params.user) searchParams.append("user", params.user);
        if (params.status) searchParams.append("status", params.status);
        if (params.startDate)
          searchParams.append("startDate", params.startDate);
        if (params.endDate) searchParams.append("endDate", params.endDate);
        if (params.sortBy) searchParams.append("sortBy", params.sortBy);
        if (params.sortOrder)
          searchParams.append("sortOrder", params.sortOrder);

        return `?${searchParams.toString()}`;
      },
      providesTags: (result, error, params) => [
        { type: "SecurityLog", id: "LIST" },
        ...(result?.logs || []).map(({ id }) => ({ type: "SecurityLog", id })),
      ],
      transformResponse: (response) => response,
      // ✅ Keep cache for 30 seconds (security logs change frequently)
      keepUnusedDataFor: 30,
    }),

    // ✅ **Get Security Statistics**
    getSecurityStats: builder.query({
      query: (timeframe = 24) => `/stats?timeframe=${timeframe}`,
      providesTags: [{ type: "SecurityStats", id: "STATS" }],
      transformResponse: (response) => response.stats,
      keepUnusedDataFor: 60, // Cache stats for 1 minute
    }),

    // ✅ **Search Security Logs**
    searchSecurityLogs: builder.query({
      query: ({ searchTerm, limit = 50 }) =>
        `/search?q=${encodeURIComponent(searchTerm)}&limit=${limit}`,
      providesTags: [{ type: "SecurityLog", id: "SEARCH" }],
      transformResponse: (response) => response,
      keepUnusedDataFor: 15, // Search results expire quickly
    }),

    // ✅ Blocked IPs
    getBlockedIPs: builder.query({
      query: () => `/blocked-ips`,
      providesTags: ["BlockedIPs"],
      // Auto-refresh every 30s
      pollingInterval: 30000,
    }),

    blockIP: builder.mutation({
      query: (body) => ({
        url: `/block-ip`,
        method: "POST",
        body,
      }),
      invalidatesTags: ["BlockedIPs", "Threats"],
    }),

    unblockIP: builder.mutation({
      query: (body) => ({
        url: `/unblock-ip`,
        method: "POST",
        body,
      }),
      invalidatesTags: ["BlockedIPs"],
    }),

    // ✅ **Get Failed Login Attempts**
    getFailedLogins: builder.query({
      query: ({ timeframe = 24, limit = 50 } = {}) =>
        `/failed-logins?timeframe=${timeframe}&limit=${limit}`,
      providesTags: [{ type: "SecurityLog", id: "FAILED_LOGINS" }],
      transformResponse: (response) => response,
      keepUnusedDataFor: 30,
    }),

    // ✅ **Get High Risk Events**
    getHighRiskEvents: builder.query({
      query: ({ riskThreshold = 70, limit = 50 } = {}) =>
        `/high-risk?threshold=${riskThreshold}&limit=${limit}`,
      providesTags: [{ type: "SecurityLog", id: "HIGH_RISK" }],
      transformResponse: (response) => response,
      keepUnusedDataFor: 30,
    }),

    // ✅ **Get Logs by User**
    getLogsByUser: builder.query({
      query: ({ userId, limit = 50 }) => `/user/${userId}?limit=${limit}`,
      providesTags: (result, error, { userId }) => [
        { type: "SecurityLog", id: `USER_${userId}` },
      ],
      transformResponse: (response) => response,
      keepUnusedDataFor: 60,
    }),

    // ✅ **Get Security Log Details**
    getSecurityLogById: builder.query({
      query: (logId) => `/${logId}`,
      providesTags: (result, error, logId) => [
        { type: "SecurityLog", id: logId },
      ],
      transformResponse: (response) => response,
    }),

    // ✅ **Mark Security Incident as Resolved**
    resolveSecurityIncident: builder.mutation({
      query: ({ logId, resolvedBy, notes }) => ({
        url: `/${logId}/resolve`,
        method: "PATCH",
        body: { resolvedBy, notes },
      }),
      invalidatesTags: (result, error, { logId }) => [
        { type: "SecurityLog", id: logId },
        { type: "SecurityLog", id: "LIST" },
        { type: "SecurityStats", id: "STATS" },
      ],
      transformResponse: (response) => response,
    }),

    // ✅ **Bulk Resolve Security Incidents**
    bulkResolveIncidents: builder.mutation({
      query: ({ logIds, resolvedBy, notes }) => ({
        url: "/bulk-resolve",
        method: "PATCH",
        body: { logIds, resolvedBy, notes },
      }),
      invalidatesTags: [
        { type: "SecurityLog", id: "LIST" },
        { type: "SecurityStats", id: "STATS" },
      ],
      transformResponse: (response) => response,
    }),

    // ✅ **Export Security Logs**
    exportSecurityLogs: builder.mutation({
      query: (params = {}) => {
        const searchParams = new URLSearchParams();

        if (params.startDate)
          searchParams.append("startDate", params.startDate);
        if (params.endDate) searchParams.append("endDate", params.endDate);
        if (params.severity) searchParams.append("severity", params.severity);
        if (params.category) searchParams.append("category", params.category);
        if (params.format) searchParams.append("format", params.format);

        return {
          url: `/export?${searchParams.toString()}`,
          method: "POST",
          responseHandler: "blob", // For file downloads
        };
      },
      transformResponse: (response) => response,
    }),

    // ✅ **Get Security Log Categories**
    getLogCategories: builder.query({
      query: () => "/categories",
      transformResponse: (response) => response.categories,
      keepUnusedDataFor: 300, // Cache categories for 5 minutes
    }),

    // ✅ **Get Security Log Events**
    getLogEvents: builder.query({
      query: () => "/events",
      transformResponse: (response) => response.events,
      keepUnusedDataFor: 300, // Cache events for 5 minutes
    }),

    // ✅ **Get Real-time Security Alerts**
    getSecurityAlerts: builder.query({
      query: ({ severity = "High" } = {}) => `/alerts?severity=${severity}`,
      providesTags: [{ type: "SecurityLog", id: "ALERTS" }],
      transformResponse: (response) => response,
      keepUnusedDataFor: 10, // Very short cache for alerts
    }),

    // ✅ **Get IP Address Analysis**
    getIpAnalysis: builder.query({
      query: ({ ipAddress, timeframe = 24 }) =>
        `/ip-analysis/${ipAddress}?timeframe=${timeframe}`,
      providesTags: (result, error, { ipAddress }) => [
        { type: "SecurityLog", id: `IP_${ipAddress}` },
      ],
      transformResponse: (response) => response,
      keepUnusedDataFor: 120, // Cache IP analysis for 2 minutes
    }),

    // ✅ **Get User Activity Timeline**
    getUserActivityTimeline: builder.query({
      query: ({ userId, timeframe = 24 }) =>
        `/user-timeline/${userId}?timeframe=${timeframe}`,
      providesTags: (result, error, { userId }) => [
        { type: "SecurityLog", id: `TIMELINE_${userId}` },
      ],
      transformResponse: (response) => response,
      keepUnusedDataFor: 60,
    }),

    // ✅ **Get Security Trends**
    getSecurityTrends: builder.query({
      query: ({ period = "7d", metric = "events" }) =>
        `/trends?period=${period}&metric=${metric}`,
      providesTags: [{ type: "SecurityStats", id: "TRENDS" }],
      transformResponse: (response) => response,
      keepUnusedDataFor: 120,
    }),

    // ✅ Threat Alerts
    getThreatAlerts: builder.query({
      query: () => `/threats-alerts`,
      providesTags: ["Threats"],
    }),

    getSecurityOverview: builder.query({
      query: () => `/security-overview`,
      providesTags: ["SecurityLogs"],
    }),

    exportLogs: builder.query({
      query: () => ({
        url: "/export-logs",
        responseHandler: (response) => response.blob(),
      }),
    }),

    generateReport: builder.query({
      query: () => ({
        url: "/security-report",
        responseHandler: (response) => response.blob(),
      }),
    }),
  }),
});

// ✅ **Export hooks for components**
export const {
  // Queries
  useGetSecurityLogsQuery,
  useGetSecurityStatsQuery,
  useSearchSecurityLogsQuery,
  useGetFailedLoginsQuery,
  useGetHighRiskEventsQuery,
  useGetLogsByUserQuery,
  useGetSecurityLogByIdQuery,
  useGetLogCategoriesQuery,
  useGetLogEventsQuery,
  useGetSecurityAlertsQuery,
  useGetIpAnalysisQuery,
  useGetUserActivityTimelineQuery,
  useGetSecurityTrendsQuery,
  useGetThreatAlertsQuery,
  useGetSecurityOverviewQuery,
  useExportLogsQuery,
  useGenerateReportQuery,
  useLazyExportLogsQuery,
  useLazyGenerateReportQuery,

  // Mutations
  useResolveSecurityIncidentMutation,
  useBulkResolveIncidentsMutation,
  useExportSecurityLogsMutation,

  // Lazy queries
  useLazySearchSecurityLogsQuery,
  useLazyGetIpAnalysisQuery,
  useLazyGetUserActivityTimelineQuery,
  useBlockIPMutation,
  useGetBlockedIPsQuery,
  useUnblockIPMutation,
} = securityLogsApi;

// ✅ **Export endpoints for manual invalidation**
export const {
  endpoints: {
    getSecurityLogs,
    getSecurityStats,
    searchSecurityLogs,
    getFailedLogins,
    getHighRiskEvents,
  },
} = securityLogsApi;
