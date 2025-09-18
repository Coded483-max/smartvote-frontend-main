import { useState, useCallback, useMemo } from "react";
import {
  useGetSecurityLogsQuery,
  useGetSecurityStatsQuery,
  useSearchSecurityLogsQuery,
  useResolveSecurityIncidentMutation,
  useBulkResolveIncidentsMutation,
  useExportSecurityLogsMutation,
} from "../api/securityLogsApi";

export const useSecurityLogs = () => {
  const [filters, setFilters] = useState({
    page: 1,
    limit: 50,
    severity: "",
    category: "",
    event: "",
    user: "",
    status: "",
    startDate: "",
    endDate: "",
    sortBy: "timestamp",
    sortOrder: "desc",
  });

  // ✅ **Main security logs query**
  const {
    data: logsData,
    isLoading: isLoadingLogs,
    isFetching: isFetchingLogs,
    error: logsError,
    refetch: refetchLogs,
  } = useGetSecurityLogsQuery(filters, {
    // Refetch every 30 seconds for real-time updates
    pollingInterval: 30000,
    // Refetch on window focus
    refetchOnFocus: true,
    // Refetch on network reconnect
    refetchOnReconnect: true,
  });

  // ✅ **Security statistics**
  const {
    data: statsData,
    isLoading: isLoadingStats,
    error: statsError,
  } = useGetSecurityStatsQuery(24, {
    pollingInterval: 60000, // Update stats every minute
  });

  // ✅ **Mutations**
  const [resolveIncident, { isLoading: isResolving }] =
    useResolveSecurityIncidentMutation();
  const [bulkResolve, { isLoading: isBulkResolving }] =
    useBulkResolveIncidentsMutation();
  const [exportLogs, { isLoading: isExporting }] =
    useExportSecurityLogsMutation();

  // ✅ **Filter handlers**
  const updateFilters = useCallback((newFilters) => {
    setFilters((prev) => ({ ...prev, ...newFilters, page: 1 }));
  }, []);

  const clearFilters = useCallback(() => {
    setFilters({
      page: 1,
      limit: 50,
      severity: "",
      category: "",
      event: "",
      user: "",
      status: "",
      startDate: "",
      endDate: "",
      sortBy: "timestamp",
      sortOrder: "desc",
    });
  }, []);

  const changePage = useCallback((page) => {
    setFilters((prev) => ({ ...prev, page }));
  }, []);

  // ✅ **Resolve incident handler**
  const handleResolveIncident = useCallback(
    async (logId, notes = "") => {
      try {
        await resolveIncident({
          logId,
          resolvedBy: "current-admin-id", // Get from auth state
          notes,
        }).unwrap();
        return { success: true };
      } catch (error) {
        return { success: false, error: error.message };
      }
    },
    [resolveIncident]
  );

  // ✅ **Bulk resolve handler**
  const handleBulkResolve = useCallback(
    async (logIds, notes = "") => {
      try {
        await bulkResolve({
          logIds,
          resolvedBy: "current-admin-id", // Get from auth state
          notes,
        }).unwrap();
        return { success: true };
      } catch (error) {
        return { success: false, error: error.message };
      }
    },
    [bulkResolve]
  );

  // ✅ **Export handler**
  const handleExport = useCallback(
    async (exportFilters = {}) => {
      try {
        const blob = await exportLogs({
          ...filters,
          ...exportFilters,
          format: "xlsx",
        }).unwrap();

        // Create download link
        const url = window.URL.createObjectURL(blob);
        const a = document.createElement("a");
        a.href = url;
        a.download = `security-logs-${
          new Date().toISOString().split("T")[0]
        }.xlsx`;
        a.click();
        window.URL.revokeObjectURL(url);

        return { success: true };
      } catch (error) {
        return { success: false, error: error.message };
      }
    },
    [exportLogs, filters]
  );

  // ✅ **Computed values**
  const computedData = useMemo(
    () => ({
      logs: logsData?.logs || [],
      pagination: logsData?.pagination || {},
      totalRecords: logsData?.totalRecords || 0,
      stats: statsData || {},
      hasData: (logsData?.logs || []).length > 0,
      isFirstPage: filters.page === 1,
      isLastPage: logsData?.pagination?.current === logsData?.pagination?.pages,
    }),
    [logsData, statsData, filters.page]
  );

  return {
    // Data
    ...computedData,

    // Loading states
    isLoadingLogs,
    isFetchingLogs,
    isLoadingStats,
    isResolving,
    isBulkResolving,
    isExporting,

    // Errors
    logsError,
    statsError,

    // Filters
    filters,
    updateFilters,
    clearFilters,
    changePage,

    // Actions
    refetchLogs,
    handleResolveIncident,
    handleBulkResolve,
    handleExport,
  };
};

// ✅ **Hook for security alerts**
export const useSecurityAlerts = () => {
  const {
    data: alerts,
    isLoading,
    error,
  } = useSearchSecurityLogsQuery(
    {
      severity: "High",
      status: "Failed",
      limit: 10,
    },
    {
      pollingInterval: 15000, // Check for alerts every 15 seconds
    }
  );

  const criticalAlerts = useMemo(
    () => (alerts?.results || []).filter((log) => log.severity === "Critical"),
    [alerts]
  );

  const highRiskAlerts = useMemo(
    () => (alerts?.results || []).filter((log) => log.riskScore >= 70),
    [alerts]
  );

  return {
    alerts: alerts?.results || [],
    criticalAlerts,
    highRiskAlerts,
    alertCount: alerts?.count || 0,
    isLoading,
    error,
    hasCriticalAlerts: criticalAlerts.length > 0,
    hasHighRiskAlerts: highRiskAlerts.length > 0,
  };
};
