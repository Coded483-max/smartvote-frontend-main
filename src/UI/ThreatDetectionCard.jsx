import {
  useGetThreatAlertsQuery,
  useBlockIPMutation,
} from "@/api/securityLogsApi";
import { Button } from "@/components/ui/button";
import { AlertTriangle, CheckCircle } from "lucide-react";
import {Card, CardHeader, CardTitle, CardDescription, CardContent} from "@/components/ui/card"

function ThreatDetectionCard() {
  const { data, isLoading } = useGetThreatAlertsQuery();
  const [blockIP] = useBlockIPMutation();

  const alerts = data?.alerts || [];

  return (
    <Card>
      <CardHeader>
        <CardTitle>Threat Detection</CardTitle>
        <CardDescription>
          Automated security monitoring and alerts
        </CardDescription>
      </CardHeader>
      <CardContent>
        <div className="space-y-4">
          {isLoading && <p className="text-sm">Loading threats...</p>}

          {alerts.map((alert) => (
            <div
              key={alert.id}
              className={`flex items-center justify-between p-3 rounded-lg border ${
                alert.severity === "High"
                  ? "bg-yellow-50 border-yellow-200"
                  : "bg-green-50 border-green-200"
              }`}
            >
              <div className="flex items-center space-x-3">
                {alert.type === "failed_login" ? (
                  <AlertTriangle className="h-5 w-5 text-yellow-600" />
                ) : (
                  <CheckCircle className="h-5 w-5 text-green-600" />
                )}
                <div>
                  <p className="font-medium">{alert.description}</p>
                  <p className="text-sm text-muted-foreground">
                    {alert.details} {alert.ipAddress && `IP: ${alert.ipAddress}`}
                  </p>
                </div>
              </div>

              {alert.actions?.map((action) =>
                action === "Block IP" ? (
                  <Button
                    key={action}
                    variant="outline"
                    size="sm"
                    onClick={() =>
                      blockIP({
                        ipAddress: alert.ipAddress,
                        reason: "Too many failed logins",
                      })
                    }
                  >
                    {action}
                  </Button>
                ) : (
                  <Button key={action} variant="outline" size="sm">
                    {action}
                  </Button>
                )
              )}
            </div>
          ))}
        </div>
      </CardContent>
    </Card>
  );
}

export default ThreatDetectionCard