// Enhanced version with quick filters
import React, { useState } from "react";
import { useGetSecurityLogsQuery } from "../store/api/securityLogsApi";

const EnhancedSecurityLogs = () => {
  const [filters, setFilters] = useState({
    page: 1,
    limit: 10,
    severity: "",
    status: "",
    sortBy: "timestamp",
    sortOrder: "desc",
  });

  const {
    data: securityLogsData,
    isLoading,
    isFetching,
    isError,
    error,
    refetch,
  } = useGetSecurityLogsQuery(filters, {
    pollingInterval: 30000,
    refetchOnFocus: true,
  });

  const securityLogs = securityLogsData?.logs || [];

  // ✅ Quick filter handlers
  const handleSeverityFilter = (severity) => {
    setFilters((prev) => ({
      ...prev,
      severity: prev.severity === severity ? "" : severity,
      page: 1,
    }));
  };

  const handleStatusFilter = (status) => {
    setFilters((prev) => ({
      ...prev,
      status: prev.status === status ? "" : status,
      page: 1,
    }));
  };

  const formatTimestamp = (timestamp) => {
    const date = new Date(timestamp);
    return date.toLocaleString("en-US", {
      month: "short",
      day: "numeric",
      hour: "2-digit",
      minute: "2-digit",
    });
  };

  return (
    <div className="space-y-4">
      {/* ✅ Quick Filters */}
      <div className="flex items-center justify-between">
        <div className="flex items-center space-x-2">
          <span className="text-sm font-medium text-gray-700">
            Quick filters:
          </span>

          {/* Severity filters */}
          <div className="flex space-x-1">
            {["Critical", "High", "Medium", "Low"].map((severity) => (
              <button
                key={severity}
                onClick={() => handleSeverityFilter(severity)}
                className={`px-2 py-1 text-xs rounded ${
                  filters.severity === severity
                    ? "bg-blue-100 text-blue-800 border border-blue-200"
                    : "bg-gray-100 text-gray-700 hover:bg-gray-200"
                }`}
              >
                {severity}
              </button>
            ))}
          </div>

          {/* Status filters */}
          <div className="flex space-x-1 ml-4">
            {["Success", "Failed", "Warning"].map((status) => (
              <button
                key={status}
                onClick={() => handleStatusFilter(status)}
                className={`px-2 py-1 text-xs rounded ${
                  filters.status === status
                    ? "bg-green-100 text-green-800 border border-green-200"
                    : "bg-gray-100 text-gray-700 hover:bg-gray-200"
                }`}
              >
                {status}
              </button>
            ))}
          </div>
        </div>

        {/* Refresh button */}
        <button
          onClick={refetch}
          disabled={isFetching}
          className="flex items-center space-x-1 px-2 py-1 text-sm text-gray-600 hover:text-gray-800 disabled:opacity-50"
        >
          <svg
            className={`w-4 h-4 ${isFetching ? "animate-spin" : ""}`}
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
          <span>{isFetching ? "Updating..." : "Refresh"}</span>
        </button>
      </div>

      {/* ✅ Active filters indicator */}
      {(filters.severity || filters.status) && (
        <div className="flex items-center space-x-2 text-sm">
          <span className="text-gray-600">Active filters:</span>
          {filters.severity && (
            <span className="px-2 py-1 bg-blue-100 text-blue-800 rounded text-xs">
              Severity: {filters.severity}
              <button
                onClick={() => handleSeverityFilter(filters.severity)}
                className="ml-1 text-blue-600 hover:text-blue-800"
              >
                ×
              </button>
            </span>
          )}
          {filters.status && (
            <span className="px-2 py-1 bg-green-100 text-green-800 rounded text-xs">
              Status: {filters.status}
              <button
                onClick={() => handleStatusFilter(filters.status)}
                className="ml-1 text-green-600 hover:text-green-800"
              >
                ×
              </button>
            </span>
          )}
        </div>
      )}

      {/* ✅ Security logs list - same as before but with real data */}
      <div className="space-y-3">
        {isLoading ? (
          // Loading skeleton
          [...Array(4)].map((_, index) => (
            <div
              key={index}
              className="flex items-center justify-between p-3 border rounded-lg animate-pulse"
            >
              <div className="flex items-center space-x-4">
                <div className="w-3 h-3 bg-gray-300 rounded-full"></div>
                <div>
                  <div className="h-4 bg-gray-300 rounded w-32 mb-2"></div>
                  <div className="h-3 bg-gray-200 rounded w-24"></div>
                </div>
              </div>
              <div className="h-3 bg-gray-200 rounded w-20"></div>
            </div>
          ))
        ) : securityLogs.length === 0 ? (
          // Empty state
          <div className="text-center py-8 text-gray-500">
            {filters.severity || filters.status ? (
              <p>No security logs match the current filters.</p>
            ) : (
              <p>No security logs found.</p>
            )}
          </div>
        ) : (
          // Real security logs
          securityLogs.map((log) => (
            <div
              key={log.id || log._id}
              className="flex items-center justify-between p-3 border rounded-lg hover:bg-gray-50 transition-colors"
            >
              <div className="flex items-center space-x-4">
                <div
                  className={`w-3 h-3 rounded-full ${
                    log.severity === "Critical"
                      ? "bg-red-600"
                      : log.severity === "High"
                      ? "bg-red-500"
                      : log.severity === "Medium"
                      ? "bg-yellow-500"
                      : "bg-green-500"
                  }`}
                ></div>
                <div>
                  <div className="flex items-center space-x-2">
                    <span className="font-medium text-sm">{log.event}</span>
                    <Badge
                      className={
                        log.status === "Success"
                          ? "bg-green-100 text-green-800"
                          : log.status === "Failed"
                          ? "bg-red-100 text-red-800"
                          : "bg-yellow-100 text-yellow-800"
                      }
                    >
                      {log.status}
                    </Badge>
                  </div>
                  <p className="text-xs text-gray-600">{log.user}</p>
                  <p className="text-xs text-gray-500 truncate max-w-md">
                    {log.details}
                  </p>
                </div>
              </div>
              <div className="text-right text-xs text-gray-500">
                <p>{formatTimestamp(log.timestamp)}</p>
                <p>{log.ipAddress}</p>
              </div>
            </div>
          ))
        )}
      </div>

      {/* ✅ Load more or pagination */}
      {securityLogsData?.pagination?.hasNext && (
        <div className="text-center">
          <button
            onClick={() =>
              setFilters((prev) => ({ ...prev, page: prev.page + 1 }))
            }
            className="px-4 py-2 text-sm text-blue-600 hover:text-blue-800 font-medium"
          >
            Load More Logs
          </button>
        </div>
      )}
    </div>
  );
};

export default EnhancedSecurityLogs;
