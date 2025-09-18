import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import {
  BarChart,
  Bar,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer,
  PieChart,
  Pie,
  Cell,
} from "recharts";

const votingData = [
  { position: "President", votes: 2847, candidates: 3 },
  { position: "Vice President", votes: 2654, candidates: 2 },
  { position: "Secretary", votes: 2432, candidates: 4 },
  { position: "Treasurer", votes: 2198, candidates: 2 },
  { position: "Academic Affairs", votes: 1876, candidates: 3 },
  { position: "Student Welfare", votes: 1654, candidates: 2 },
];

const turnoutData = [
  { name: "Voted", value: 8932, color: "#3b82f6" },
  { name: "Not Voted", value: 3915, color: "#e5e7eb" },
];

const VotingChart = () => {
  return (
    <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
      <Card>
        <CardHeader>
          <CardTitle>Votes by Position</CardTitle>
        </CardHeader>
        <CardContent>
          <ResponsiveContainer width="100%" height={300}>
            <BarChart data={votingData}>
              <CartesianGrid strokeDasharray="3 3" />
              <XAxis
                dataKey="position"
                angle={-45}
                textAnchor="end"
                height={80}
              />
              <YAxis />
              <Tooltip />
              <Bar dataKey="votes" fill="#3b82f6" />
            </BarChart>
          </ResponsiveContainer>
        </CardContent>
      </Card>

      <Card>
        <CardHeader>
          <CardTitle>Voter Turnout</CardTitle>
        </CardHeader>
        <CardContent>
          <ResponsiveContainer width="100%" height={300}>
            <PieChart>
              <Pie
                data={turnoutData}
                cx="50%"
                cy="50%"
                innerRadius={60}
                outerRadius={120}
                paddingAngle={5}
                dataKey="value"
              >
                {turnoutData.map((entry, index) => (
                  <Cell key={`cell-${index}`} fill={entry.color} />
                ))}
              </Pie>
              <Tooltip />
            </PieChart>
          </ResponsiveContainer>
          <div className="flex justify-center mt-4 space-x-4">
            {turnoutData.map((entry) => (
              <div key={entry.name} className="flex items-center">
                <div
                  className="w-3 h-3 rounded-full mr-2"
                  style={{ backgroundColor: entry.color }}
                ></div>
                <span className="text-sm">
                  {entry.name}: {entry.value.toLocaleString()}
                </span>
              </div>
            ))}
          </div>
        </CardContent>
      </Card>
    </div>
  );
};
export default VotingChart;
