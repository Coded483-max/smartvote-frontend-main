import {
  useGetBlockedIPsQuery,
  useUnblockIPMutation,
} from "@/api/securityLogsApi";
import { Button } from "@/components/ui/button";
import {Card, CardHeader, CardDescription, CardContent, CardTitle} from "@/components/ui/card"

function BlockedIPsCard() {
  const { data, isLoading } = useGetBlockedIPsQuery();
  const [unblockIP] = useUnblockIPMutation();

  const blockedIPs = data?.blockedIPs || [];

  return (
    <Card>
      <CardHeader>
        <CardTitle>Blocked IPs</CardTitle>
        <CardDescription>
          Manage blocked IP addresses
          {isLoading && (
            <span className="ml-2 text-xs text-muted-foreground">
              (refreshing…)
            </span>
          )}
        </CardDescription>
      </CardHeader>
      <CardContent>
        <div className="space-y-4">
          {blockedIPs.length === 0 && (
            <p className="text-sm text-muted-foreground">No blocked IPs</p>
          )}

          {blockedIPs.map((ip) => (
            <div
              key={ip.ipAddress}
              className="flex items-center justify-between p-3 border rounded-lg"
            >
              <div>
                <p className="font-medium">{ip.ipAddress}</p>
                <p className="text-sm text-muted-foreground">
                  Blocked by: {ip.blockedBy} on{" "}
                  {new Date(ip.blockedAt).toLocaleString()}
                  {ip.reason && ` — Reason: ${ip.reason}`}
                </p>
              </div>

              {ip.active ? (
                <Button
                  variant="outline"
                  size="sm"
                  onClick={() => unblockIP({ ipAddress: ip.ipAddress })}
                >
                  Unblock
                </Button>
              ) : (
                <span className="text-xs text-green-600">Unblocked</span>
              )}
            </div>
          ))}
        </div>
      </CardContent>
    </Card>
  );
}

export default BlockedIPsCard