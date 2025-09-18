// Replace your mock data section with RTK Query hook
import React from "react";
import { useGetSecurityLogsQuery } from "../store/api/securityLogsApi";
import { Badge } from "./ui/badge"; // Assuming you have this component

const SecurityLogsComponent = () => {
  // ✅ Replace mock data with real API call
  const {
    data: securityLogsData,
    isLoading,
    isError,
    error,
    refetch,
  } = useGetSecurityLogsQuery(
    {
      page: 1,
      limit: 10, // Show latest 10 logs
      sortBy: "timestamp",
      sortOrder: "desc",
    },
    {
      // Refetch every 30 seconds for real-time updates
      pollingInterval: 30000,
      // Refetch when component comes back into focus
      refetchOnFocus: true,
    }
  );

  // ✅ Extract logs from API response
  const securityLogs = securityLogsData?.logs || [];

  // ✅ Format timestamp function
  const formatTimestamp = (timestamp) => {
    const date = new Date(timestamp);
    return date.toLocaleString("en-US", {
      year: "numeric",
      month: "2-digit",
      day: "2-digit",
      hour: "2-digit",
      minute: "2-digit",
      second: "2-digit",
      hour12: false,
    });
  };

  // ✅ Get status color function
  const getStatusColor = (status) => {
    switch (status) {
      case "Success":
        return "bg-green-100 text-green-800 border-green-200";
      case "Failed":
        return "bg-red-100 text-red-800 border-red-200";
      case "Warning":
        return "bg-yellow-100 text-yellow-800 border-yellow-200";
      case "Critical":
        return "bg-red-200 text-red-900 border-red-300";
      case "Pending":
        return "bg-blue-100 text-blue-800 border-blue-200";
      case "Blocked":
        return "bg-gray-100 text-gray-800 border-gray-200";
      case "In Progress":
        return "bg-purple-100 text-purple-800 border-purple-200";
      default:
        return "bg-gray-100 text-gray-800 border-gray-200";
    }
  };

  // ✅ Get severity color for the dot indicator
  const getSeverityColor = (severity) => {
    switch (severity) {
      case "Critical":
        return "bg-red-600";
      case "High":
        return "bg-red-500";
      case "Medium":
        return "bg-yellow-500";
      case "Low":
        return "bg-green-500";
      default:
        return "bg-gray-500";
    }
  };

  // ✅ Loading state
  if (isLoading) {
    return (
      <div className="space-y-4">
        {[...Array(4)].map((_, index) => (
          <div
            key={index}
            className="flex items-center justify-between p-3 border rounded-lg animate-pulse"
          >
            <div className="flex items-center space-x-4">
              <div className="w-3 h-3 bg-gray-300 rounded-full"></div>
              <div>
                <div className="h-4 bg-gray-300 rounded w-32 mb-2"></div>
                <div className="h-3 bg-gray-200 rounded w-24 mb-1"></div>
                <div className="h-3 bg-gray-200 rounded w-40"></div>
              </div>
            </div>
            <div className="text-right">
              <div className="h-3 bg-gray-200 rounded w-20 mb-1"></div>
              <div className="h-3 bg-gray-200 rounded w-16"></div>
            </div>
          </div>
        ))}
      </div>
    );
  }

  // ✅ Error state
  if (isError) {
    return (
      <div className="p-4 border border-red-200 rounded-lg bg-red-50">
        <div className="flex items-center justify-between">
          <div>
            <h3 className="text-red-800 font-medium">
              Error loading security logs
            </h3>
            <p className="text-red-600 text-sm mt-1">
              {error?.data?.message ||
                error?.message ||
                "Failed to fetch security logs"}
            </p>
          </div>
          <button
            onClick={refetch}
            className="px-3 py-1 bg-red-600 text-white rounded text-sm hover:bg-red-700"
          >
            Retry
          </button>
        </div>
      </div>
    );
  }

  // ✅ Empty state
  if (securityLogs.length === 0) {
    return (
      <div className="p-8 text-center text-gray-500">
        <div className="w-16 h-16 mx-auto mb-4 bg-gray-100 rounded-full flex items-center justify-center">
          <svg
            className="w-8 h-8 text-gray-400"
            fill="none"
            stroke="currentColor"
            viewBox="0 0 24 24"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth={2}
              d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z"
            />
          </svg>
        </div>
        <h3 className="text-lg font-medium text-gray-900 mb-2">
          No security logs found
        </h3>
        <p className="text-gray-500">
          Security logs will appear here when events occur.
        </p>
      </div>
    );
  }

  // ✅ Render real data (same structure as your mock data)
  return (
    <div className="space-y-4">
      {/* ✅ Header with refresh button */}
      <div className="flex items-center justify-between">
        <h3 className="text-lg font-medium">Recent Security Logs</h3>
        <div className="flex items-center space-x-2">
          <span className="text-sm text-gray-500">
            Showing {securityLogs.length} of{" "}
            {securityLogsData?.totalRecords || 0} logs
          </span>
          <button
            onClick={refetch}
            className="p-1 text-gray-400 hover:text-gray-600"
            title="Refresh logs"
          >
            <svg
              className="w-4 h-4"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M4 4v5h.582m15.356 2A8.001 8.001 0 004.582 9m0 0H9m11 11v-5h-.581m0 0a8.003 8.003 0 01-15.357-2m15.357 2H15"
              />
            </svg>
          </button>
        </div>
      </div>

      {/* ✅ Real security logs data */}
      {securityLogs.map((log) => (
        <div
          key={log.id || log._id} // Handle both id and _id from backend
          className="flex items-center justify-between p-3 border rounded-lg hover:bg-gray-50 transition-colors"
        >
          <div className="flex items-center space-x-4">
            {/* ✅ Use severity instead of just status for dot color */}
            <div
              className={`w-3 h-3 rounded-full ${getSeverityColor(
                log.severity
              )}`}
              title={`Severity: ${log.severity}`}
            ></div>
            <div>
              <div className="flex items-center space-x-2">
                <span className="font-medium">{log.event}</span>
                <Badge className={getStatusColor(log.status)}>
                  {log.status}
                </Badge>
                {/* ✅ Show severity badge */}
                <Badge
                  variant="outline"
                  className={`text-xs ${
                    log.severity === "Critical"
                      ? "border-red-500 text-red-700"
                      : log.severity === "High"
                      ? "border-orange-500 text-orange-700"
                      : log.severity === "Medium"
                      ? "border-yellow-500 text-yellow-700"
                      : "border-green-500 text-green-700"
                  }`}
                >
                  {log.severity}
                </Badge>
              </div>
              <p className="text-sm text-muted-foreground">
                {log.user}
                {/* ✅ Show user type if available */}
                {log.userType && log.userType !== "Unknown" && (
                  <span className="ml-2 text-xs bg-gray-100 px-2 py-0.5 rounded">
                    {log.userType}
                  </span>
                )}
              </p>
              <p className="text-xs text-muted-foreground">{log.details}</p>
              {/* ✅ Show category */}
              <p className="text-xs text-blue-600 mt-1">
                Category: {log.category}
              </p>
            </div>
          </div>
          <div className="text-right text-sm text-muted-foreground">
            <p>{formatTimestamp(log.timestamp)}</p>
            <p>IP: {log.ipAddress}</p>
            {/* ✅ Show additional info if available */}
            {log.userAgent && (
              <p className="text-xs truncate max-w-40" title={log.userAgent}>
                {log.userAgent.split(" ")[0]} {/* Show just browser name */}
              </p>
            )}
            {/* ✅ Show risk score if > 0 */}
            {log.riskScore > 0 && (
              <p className="text-xs text-red-600">Risk: {log.riskScore}/100</p>
            )}
          </div>
        </div>
      ))}

      {/* ✅ Show "View All" link if there are more logs */}
      {securityLogsData?.totalRecords > securityLogs.length && (
        <div className="text-center pt-4">
          <button className="text-blue-600 hover:text-blue-800 text-sm font-medium">
            View All {securityLogsData.totalRecords} Security Logs →
          </button>
        </div>
      )}
    </div>
  );
};

export default SecurityLogsComponent;
