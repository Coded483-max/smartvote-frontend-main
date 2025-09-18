import { useGetSecurityOverviewQuery } from "@/api/securityLogsApi";
import {Card, CardHeader,  CardTitle, CardContent} from "@/components/ui/card"
import { Lock, AlertTriangle, Users, Shield } from "lucide-react";

function SecurityOverview() {
  const { data, isLoading } = useGetSecurityOverviewQuery();

  const overview = data?.overview || {
    loginAttempts: 0,
    failedLogins: 0,
    activeSessions: 0,
    securityScore: 0,
  };

  return (
    <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
      <Card>
        <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
          <CardTitle className="text-sm font-medium">Login Attempts</CardTitle>
          <Lock className="h-4 w-4 text-muted-foreground" />
        </CardHeader>
        <CardContent>
          <div className="text-2xl font-bold">
            {isLoading ? "..." : overview.loginAttempts}
          </div>
          <p className="text-xs text-muted-foreground">Last 24 hours</p>
        </CardContent>
      </Card>

      <Card>
        <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
          <CardTitle className="text-sm font-medium">Failed Logins</CardTitle>
          <AlertTriangle className="h-4 w-4 text-red-600" />
        </CardHeader>
        <CardContent>
          <div className="text-2xl font-bold text-red-600">
            {isLoading ? "..." : overview.failedLogins}
          </div>
          <p className="text-xs text-muted-foreground">Requires attention</p>
        </CardContent>
      </Card>

      <Card>
        <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
          <CardTitle className="text-sm font-medium">Active Sessions</CardTitle>
          <Users className="h-4 w-4 text-muted-foreground" />
        </CardHeader>
        <CardContent>
          <div className="text-2xl font-bold">
            {isLoading ? "..." : overview.activeSessions}
          </div>
          <p className="text-xs text-muted-foreground">Current users</p>
        </CardContent>
      </Card>

      <Card>
        <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
          <CardTitle className="text-sm font-medium">Security Score</CardTitle>
          <Shield className="h-4 w-4 text-green-600" />
        </CardHeader>
        <CardContent>
          <div className="text-2xl font-bold text-green-600">
            {isLoading ? "..." : `${overview.securityScore}%`}
          </div>
          <p className="text-xs text-muted-foreground">Excellent</p>
        </CardContent>
      </Card>
    </div>
  );
}

export default SecurityOverview