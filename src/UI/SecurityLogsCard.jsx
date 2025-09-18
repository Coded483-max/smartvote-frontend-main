import { useState } from "react";
import { useGetSecurityLogsQuery } from "@/api/securityLogsApi";
import { Button } from "@/components/ui/button";
import {Card, CardHeader, CardTitle, CardDescription, CardContent} from "@/components/ui/card"
import { Badge } from "lucide-react";

function SecurityLogsCard({getStatusColor}) {
  const [page, setPage] = useState(1);
  const { data, isLoading } = useGetSecurityLogsQuery({ page, limit: 50 });

  const logs = data?.logs || [];
  const pagination = data?.pagination || { totalPages: 1 };

  return (
    <Card>
      <CardHeader>
        <CardTitle>Security Event Log</CardTitle>
        <CardDescription>
          Recent security events and system access logs
        </CardDescription>
      </CardHeader>
      <CardContent>
        {isLoading && <p className="text-sm">Loading logs...</p>}

        <div className="space-y-4">
          {logs.map((log) => (
            <div
              key={log.id}
              className="flex items-center justify-between p-3 border rounded-lg"
            >
              <div className="flex items-center space-x-4">
                <div
                  className={`w-3 h-3 rounded-full ${
                    log.status === "Success" ? "bg-green-500" : "bg-red-500"
                  }`}
                ></div>
                <div>
                  <div className="flex items-center space-x-2">
                    <span className="font-medium">{log.event}</span>
                    <Badge
                      className={
                        log.status === "Success"
                          ? getStatusColor("active")
                          : getStatusColor("inactive")
                      }
                    >
                      {log.status}
                    </Badge>
                  </div>
                  <p className="text-sm text-muted-foreground">{log.user}</p>
                  <p className="text-xs text-muted-foreground">{log.details}</p>
                </div>
              </div>
              <div className="text-right text-sm text-muted-foreground">
                <p>{log.timestamp}</p>
                <p>IP: {log.ipAddress}</p>
              </div>
            </div>
          ))}
        </div>

        {/* Pagination */}
        <div className="flex justify-center items-center gap-10 mt-4">
          <Button
            variant="outline"
            size="sm"
             className="bg-blue-500 text-white hover:bg-blue-400 hover:text-white"
            disabled={page <= 1}
            onClick={() => setPage((p) => p - 1)}
          >
            Previous
          </Button>
          <span className="text-sm">
            Page {page} of {pagination.total}
          </span>
          <Button
            variant="outline"
            size="sm"
             className="bg-blue-500 text-white hover:bg-blue-400 hover:text-white"
            disabled={page >= pagination.total}
            onClick={() => setPage((p) => p + 1)}
          >
            Next
          </Button>
        </div>
      </CardContent>
    </Card>
  );
}

export default SecurityLogsCard