import { useState, useEffect } from "react";
import { useSelector } from "react-redux";
import { useNavigate, useLocation, useParams } from "react-router-dom";

import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Progress } from "@/components/ui/progress";
import { Calendar } from "@/components/ui/calendar";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
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
  LineChart,
  Line,
} from "recharts";
import {
  Vote as VoteIcon,
  Users,
  CalendarIcon,
  Clock,
  TrendingUp,
  Award,
  Bell,
  Settings,
  LogOut,
  ChevronRight,
  Activity,
  BarChart3,
  PieChartIcon,
  CheckCircle,
  AlertCircle,
  Eye,
} from "lucide-react";

import { useDashboardGuard } from "@/hooks/useDashboardGuard";
import {
  useGetActiveElectionsQuery,
  useGetElectionAuditTrailQuery,
  useGetElectionTurnoutQuery,
} from "@/api/electionApi";
import { formatDateTime } from "@/hooks/DateAndTimeFormatter";

const Dashboard = () => {
  useDashboardGuard(); // Prevent back button issues
  const [date, setDate] = useState(new Date());
  const [activeTab, setActiveTab] = useState("overview");
  const navigate = useNavigate();

  const { voter } = useSelector((state) => state.auth);

  // const { electionId } = useParams();

  const {
    data: activeElections = [],
    isLoading: electionsLoading,
    error: electionsError,
  } = useGetActiveElectionsQuery();

  console.log(activeElections);

  const electionId = activeElections?.id;

  // 🔹 Fetch turnout + audit trail (only if we have electionId)
  const {
    data: turnout,
    isLoading: loadingTurnout,
    isError: errorTurnout,
  } = useGetElectionTurnoutQuery(electionId, { skip: !electionId });

  console.log(turnout);

  const {
    data: auditTrail,
    isLoading: loadingAudit,
    isError: errorAudit,
  } = useGetElectionAuditTrailQuery(electionId, { skip: !electionId });

  if (electionsLoading || loadingTurnout || loadingAudit)
    return <p>Loading election data...</p>;

  if (electionsError || errorTurnout || errorAudit)
    return <p>Failed to load election data</p>;

  if (!activeElections) return <p>No active election right now</p>;

  // Navigate to voting page
  const handleVoteClick = (electionId) => {
    if (!electionId) {
      console.error("Election ID is missing");
      return;
    }
    navigate(`/elections/${electionId}`);
  };

  // Navigate to elections list
  const handleViewElections = () => {
    navigate("/elections");
  };

  // Sample data
  const votingData = [
    {
      candidate: "Alice Johnson",
      votes: 450,
      percentage: 45,
      color: "#3b82f6",
    },
    { candidate: "Bob Smith", votes: 300, percentage: 30, color: "#8b5cf6" },
    {
      candidate: "Charlie Brown",
      votes: 250,
      percentage: 25,
      color: "#10b981",
    },
  ];

  const weeklyVotingTrend = [
    { day: "Mon", votes: 120 },
    { day: "Tue", votes: 190 },
    { day: "Wed", votes: 300 },
    { day: "Thu", votes: 250 },
    { day: "Fri", votes: 180 },
    { day: "Sat", votes: 220 },
    { day: "Sun", votes: 340 },
  ];

  const recentActivities = [
    {
      id: 1,
      action: "Voted in President Student Council",
      time: "2 hours ago",
      status: "completed",
    },
    {
      id: 2,
      action: "New election: Department Representative",
      time: "5 hours ago",
      status: "new",
    },
    {
      id: 3,
      action: "Election results published",
      time: "1 day ago",
      status: "info",
    },
    {
      id: 4,
      action: "Reminder: Vote deadline tomorrow",
      time: "2 days ago",
      status: "warning",
    },
  ];

  const upcomingElections = [
    {
      id: 1,
      title: "Department Representative",
      date: "Dec 25, 2024",
      participants: 234,
      status: "upcoming",
    },
    {
      id: 2,
      title: "Club President Election",
      date: "Jan 15, 2025",
      participants: 156,
      status: "upcoming",
    },
  ];

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 via-white to-purple-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {/* Welcome Section */}
        <div className="mb-8 flex flex-col sm:flex-row sm:justify-between sm:items-center space-y-4 sm:space-y-0">
          <div>
            <h1 className="text-3xl font-bold text-gray-900">
              Hello, {voter.firstName}! 👋
            </h1>
            <p className="text-gray-600 mt-1">
              Ready to make your voice heard? Check out the active elections
              below.
            </p>
          </div>
          <div className="flex flex-wrap gap-2">
            <Badge variant="secondary" className="bg-green-100 text-green-700">
              <CheckCircle className="w-3 h-3 mr-1" />
              {activeElections.length} Active Elections
            </Badge>
          </div>
        </div>

        {/* Active Elections */}
        <div className="mb-8">
          <div className="flex flex-col sm:flex-row sm:justify-between sm:items-center mb-6 space-y-2 sm:space-y-0">
            <h2 className="text-2xl font-bold text-gray-900">
              Active Elections
            </h2>
            <Button
              variant="outline"
              onClick={handleViewElections}
              className="flex items-center gap-2 w-full sm:w-auto bg-transparent"
            >
              <VoteIcon className="w-4 h-4" /> View All Elections
            </Button>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
            {activeElections.map((election) => (
              <Card
                key={election.id}
                className="hover:shadow-lg transition-all duration-300 w-full"
              >
                <CardHeader>
                  <div className="flex flex-col sm:flex-row sm:justify-between sm:items-center">
                    <CardTitle className="text-lg">{election.title}</CardTitle>
                    <Badge
                      variant={
                        election.status === "voting" ? "default" : "secondary"
                      }
                      className={
                        election.status === "voting"
                          ? "bg-green-100 text-green-800"
                          : "bg-yellow-100 text-yellow-800 mt-2 sm:mt-0"
                      }
                    >
                      {election.status}
                    </Badge>
                  </div>
                  <CardDescription>{election.description}</CardDescription>
                </CardHeader>
                <CardContent className="space-y-3">
                  <div className="flex justify-between text-sm">
                    <span className="text-gray-600">Positions:</span>
                    <span className="font-medium">
                      {election.positionCount}
                    </span>
                  </div>
                  <div className="flex justify-between text-sm">
                    <span className="text-gray-600">Eligible Voters:</span>
                    <span className="font-medium">
                      {election.eligibleVoters}
                    </span>
                  </div>
                  {election.status === "voting" ? (
                    <Button
                      className="w-full bg-gradient-to-r from-blue-600 to-purple-600 hover:from-blue-700 hover:to-purple-700"
                      onClick={() => handleVoteClick(election.id)}
                    >
                      <VoteIcon className="w-4 h-4 mr-2" /> Vote Now
                    </Button>
                  ) : (
                    <Button
                      variant="outline"
                      className="w-full bg-transparent"
                      disabled
                    >
                      <Clock className="w-4 h-4 mr-2" />
                      {election.status === "campaign"
                        ? "Campaigning"
                        : "Voting Ended"}
                    </Button>
                  )}
                </CardContent>
              </Card>
            ))}
          </div>
        </div>

        {/* Stats Overview */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 mb-8">
          <Card className="hover:shadow-lg w-full">
            <CardContent className="p-6 flex justify-between items-center">
              <div>
                <p className="text-sm font-medium text-gray-600">
                  Active Elections
                </p>
                <p className="text-3xl font-bold text-gray-900">
                  {activeElections.length}
                </p>
                <p className="text-sm text-green-600 flex items-center mt-1">
                  <TrendingUp className="w-3 h-3 mr-1" /> +2 this week
                </p>
              </div>
              <div className="p-3 bg-blue-100 rounded-full">
                <VoteIcon className="w-6 h-6 text-blue-600" />
              </div>
            </CardContent>
          </Card>

          <Card className="hover:shadow-lg w-full">
            <CardContent className="p-6 flex justify-between items-center">
              <div>
                <p className="text-sm font-medium text-gray-600">
                  Total Votes Cast
                </p>
                <p className="text-3xl font-bold text-gray-900">1,247</p>
                <p className="text-sm text-green-600 flex items-center mt-1">
                  <TrendingUp className="w-3 h-3 mr-1" /> +15% today
                </p>
              </div>
              <div className="p-3 bg-purple-100 rounded-full">
                <BarChart3 className="w-6 h-6 text-purple-600" />
              </div>
            </CardContent>
          </Card>

          <Card className="hover:shadow-lg w-full">
            <CardContent className="p-6 flex justify-between items-center">
              <div>
                <p className="text-sm font-medium text-gray-600">
                  Registered Voters
                </p>
                <p className="text-3xl font-bold text-gray-900">2,156</p>
                <p className="text-sm text-blue-600 flex items-center mt-1">
                  <Users className="w-3 h-3 mr-1" /> 89% participation
                </p>
              </div>
              <div className="p-3 bg-green-100 rounded-full">
                <Users className="w-6 h-6 text-green-600" />
              </div>
            </CardContent>
          </Card>

          <Card className="hover:shadow-lg w-full">
            <CardContent className="p-6 flex justify-between items-center">
              <div>
                <p className="text-sm font-medium text-gray-600">
                  Elections Won
                </p>
                <p className="text-3xl font-bold text-gray-900">7</p>
                <p className="text-sm text-yellow-600 flex items-center mt-1">
                  <Award className="w-3 h-3 mr-1" /> This semester
                </p>
              </div>
              <div className="p-3 bg-yellow-100 rounded-full">
                <Award className="w-6 h-6 text-yellow-600" />
              </div>
            </CardContent>
          </Card>
        </div>

        {/* Main Content */}
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
          {/* Left Column - Voting Results */}
          <div className="lg:col-span-2 space-y-6 w-full">
            <Card className="w-full">
              <CardHeader>
                <CardTitle className="flex items-center">
                  <BarChart3 className="w-5 h-5 mr-2" />
                  Voting Results
                </CardTitle>
              </CardHeader>
              <CardContent>
                <div className="h-80 w-full">
                  <ResponsiveContainer width="100%" height="100%">
                    <BarChart data={votingData}>
                      <CartesianGrid strokeDasharray="3 3" />
                      <XAxis dataKey="candidate" />
                      <YAxis />
                      <Tooltip />
                      <Bar
                        dataKey="votes"
                        fill="#3b82f6"
                        radius={[4, 4, 0, 0]}
                      />
                    </BarChart>
                  </ResponsiveContainer>
                </div>
              </CardContent>
            </Card>
          </div>

          {/* Right Column - Recent Activity */}
          <div className="space-y-6 w-full">
            <Card className="w-full">
              <CardHeader>
                <CardTitle className="flex items-center">
                  <Users className="w-5 h-5 mr-2" />
                  Voter Turnout
                </CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="text-center">
                  <div className="relative inline-flex items-center justify-center w-20 h-20 mb-2">
                    <svg
                      className="w-20 h-20 transform -rotate-90"
                      viewBox="0 0 36 36"
                    >
                      <path
                        className="text-gray-200"
                        stroke="currentColor"
                        strokeWidth="3"
                        fill="none"
                        d="M18 2.0845 a 15.9155 15.9155 0 0 1 0 31.831 a 15.9155 15.9155 0 0 1 0 -31.831"
                      />
                      <path
                        className="text-blue-600"
                        stroke="currentColor"
                        strokeWidth="3"
                        strokeDasharray="75, 100"
                        strokeLinecap="round"
                        fill="none"
                        d="M18 2.0845 a 15.9155 15.9155 0 0 1 0 31.831 a 15.9155 15.9155 0 0 1 0 -31.831"
                      />
                    </svg>
                    <span className="absolute text-sm font-bold text-gray-900">
                      75%
                    </span>
                  </div>
                  <p className="text-sm text-gray-600">Current Turnout</p>
                </div>
                <div className="space-y-3">
                  <div className="flex justify-between items-center">
                    <span className="text-sm text-gray-600">
                      Registered Voters
                    </span>
                    <span className="text-sm font-medium">2,156</span>
                  </div>
                  <div className="flex justify-between items-center">
                    <span className="text-sm text-gray-600">Votes Cast</span>
                    <span className="text-sm font-medium">1,617</span>
                  </div>
                  <div className="flex justify-between items-center">
                    <span className="text-sm text-gray-600">Remaining</span>
                    <span className="text-sm font-medium">539</span>
                  </div>
                </div>
              </CardContent>
            </Card>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Dashboard;
