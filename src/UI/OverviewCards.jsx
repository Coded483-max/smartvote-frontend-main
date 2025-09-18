import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import {
  Users,
  Vote,
  CheckCircle,
  Clock,
  TrendingUp,
  AlertTriangle,
} from "lucide-react";

const OverviewCards = () => {
  const stats = [
    {
      title: "Total Registered Voters",
      value: "12,847",
      change: "+2.5%",
      icon: Users,
      color: "text-blue-600",
    },
    {
      title: "Active Candidates",
      value: "24",
      change: "+4",
      icon: Vote,
      color: "text-green-600",
    },
    {
      title: "Votes Cast",
      value: "8,932",
      change: "69.5%",
      icon: CheckCircle,
      color: "text-purple-600",
    },
    {
      title: "Pending Applications",
      value: "7",
      change: "-3",
      icon: Clock,
      color: "text-orange-600",
    },
    {
      title: "Voter Turnout",
      value: "69.5%",
      change: "+12.3%",
      icon: TrendingUp,
      color: "text-emerald-600",
    },
    {
      title: "System Alerts",
      value: "2",
      change: "Active",
      icon: AlertTriangle,
      color: "text-red-600",
    },
  ];

  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
      {stats.map((stat) => (
        <Card key={stat.title}>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium text-gray-600">
              {stat.title}
            </CardTitle>
            <stat.icon className={`h-4 w-4 ${stat.color}`} />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{stat.value}</div>
            <p className="text-xs text-gray-500 mt-1">
              <span
                className={
                  stat.change.startsWith("+")
                    ? "text-green-600"
                    : stat.change.startsWith("-")
                    ? "text-red-600"
                    : "text-gray-600"
                }
              >
                {stat.change}
              </span>
              {stat.change !== "Active" && " from last election"}
            </p>
          </CardContent>
        </Card>
      ))}
    </div>
  );
};
export default OverviewCards;
