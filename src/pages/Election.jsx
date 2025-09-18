import { useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Input } from "@/components/ui/input";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import {
  Vote,
  Clock,
  Users,
  Calendar,
  Search,
  UserPlus,
  ArrowLeft,
  Megaphone,
} from "lucide-react";
import { useGetActiveElectionsQuery } from "@/api/electionApi";
import { formatDateTime } from "@/hooks/DateAndTimeFormatter";

const Elections = () => {
  const navigate = useNavigate();
  const [searchTerm, setSearchTerm] = useState("");
  const [statusFilter, setStatusFilter] = useState("all");

  const {
    data: elections = [],
    isLoading,
    error,
  } = useGetActiveElectionsQuery();

  console.log(elections);

  const { electionId } = useParams();

  console.log("Election ID:", electionId);

  const filteredElections = elections.filter((election) => {
    const matchesSearch =
      election.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
      election.description.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesStatus =
      statusFilter === "all" || election.status === statusFilter;
    return matchesSearch && matchesStatus;
  });

  const handleVoteClick = (id) => {
    navigate(`/elections/${id}`);
    console.log("handleVoteClick", id);
  };

  const getStatusColor = (status) => {
    switch (status) {
      case "voting":
        return "bg-green-100 text-green-800";
      case "candidate_registration":
        return "bg-yellow-100 text-yellow-800";
      case "completed":
        return "bg-blue-100 text-blue-800";
      case "draft":
        return "bg-gray-100 text-gray-800";
      default:
        return "bg-gray-100 text-gray-800";
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 via-white to-purple-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {/* Header */}
        <div className="mb-8">
          <div className="flex items-center gap-4 mb-4">
            <Button
              variant="outline"
              onClick={() => navigate("/dashboard")}
              className="flex items-center gap-2"
            >
              <ArrowLeft className="w-4 h-4" />
              Back to Dashboard
            </Button>
          </div>

          <h1 className="text-3xl font-bold text-gray-900 mb-2">Elections</h1>
          <p className="text-gray-600">
            Participate in student government elections and make your voice
            heard.
          </p>
        </div>

        {/* Search and Filter */}
        <div className="mb-6 flex flex-col sm:flex-row gap-4">
          <div className="relative flex-1">
            <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-4 h-4" />
            <Input
              placeholder="Search elections..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="pl-10"
            />
          </div>
          <select
            value={statusFilter}
            onChange={(e) => setStatusFilter(e.target.value)}
            className="px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
          >
            <option value="all">All Elections</option>
            <option value="voting">Voting</option>
            <option value="candidate_registration">
              Candidate Registration
            </option>
            <option value="campaign">Campaigning</option>
            <option value="completed">Completed</option>
          </select>
        </div>

        {/* Elections Tabs */}
        <Tabs defaultValue="voting" className="space-y-6">
          <TabsList>
            <TabsTrigger value="voting">Active Elections</TabsTrigger>
            <TabsTrigger value="candidate_registration">
              Registration Open
            </TabsTrigger>
            <TabsTrigger value="campaign">Campaigning</TabsTrigger>
            <TabsTrigger value="completed">Completed</TabsTrigger>
          </TabsList>

          <TabsContent value="voting">
            <ElectionGrid
              elections={filteredElections.filter((e) => e.status === "voting")}
              onVoteClick={handleVoteClick}
              isLoading={isLoading}
              navigate={navigate}
            />
          </TabsContent>

          <TabsContent value="candidate_registration">
            <ElectionGrid
              elections={filteredElections.filter(
                (e) => e.status === "candidate_registration"
              )}
              onVoteClick={handleVoteClick}
              isLoading={isLoading}
              navigate={navigate}
            />
          </TabsContent>

          <TabsContent value="campaign">
            <ElectionGrid
              elections={filteredElections.filter(
                (e) => e.status === "campaign"
              )}
              onVoteClick={handleVoteClick}
              isLoading={isLoading}
              navigate={navigate}
            />
          </TabsContent>

          <TabsContent value="completed">
            <ElectionGrid
              elections={filteredElections.filter(
                (e) => e.status === "completed"
              )}
              onVoteClick={handleVoteClick}
              isLoading={isLoading}
              navigate={navigate}
            />
          </TabsContent>
        </Tabs>
      </div>
    </div>
  );
};

// Election Grid Component
const ElectionGrid = ({ elections, onVoteClick, isLoading, navigate }) => {
  if (isLoading) {
    return (
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {[1, 2, 3, 4, 5, 6].map((i) => (
          <Card key={i} className="animate-pulse">
            <CardContent className="p-6">
              <div className="h-4 bg-gray-200 rounded mb-2"></div>
              <div className="h-3 bg-gray-200 rounded mb-4"></div>
              <div className="h-8 bg-gray-200 rounded"></div>
            </CardContent>
          </Card>
        ))}
      </div>
    );
  }

  if (elections.length === 0) {
    return (
      <Card>
        <CardContent className="p-8 text-center">
          <Vote className="w-12 h-12 text-gray-400 mx-auto mb-4" />
          <h3 className="text-lg font-medium text-gray-900 mb-2">
            No Elections Found
          </h3>
          <p className="text-gray-600">
            No elections match your current criteria.
          </p>
        </CardContent>
      </Card>
    );
  }

  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
      {elections.map((election) => (
        <ElectionCard
          key={election.id}
          election={election}
          onVoteClick={onVoteClick}
          navigate={navigate}
        />
      ))}
    </div>
  );
};

// Election Card Component
const ElectionCard = ({ election, onVoteClick, navigate }) => {
  const getStatusColor = (status) => {
    switch (status) {
      case "voting":
        return "bg-green-100 text-green-800";
      case "candidate_registration":
        return "bg-yellow-100 text-yellow-800";
      case "campaign":
        return "bg-purple-100 text-purple-800";
      case "completed":
        return "bg-blue-100 text-blue-800";
      default:
        return "bg-gray-100 text-gray-800";
    }
  };

  return (
    <Card className="hover:shadow-lg transition-all duration-300 border-l-4 border-l-blue-500">
      <CardHeader>
        <div className="flex items-center justify-between">
          <CardTitle className="text-lg">{election.title}</CardTitle>
          <Badge className={getStatusColor(election.status)}>
            {election.status}
          </Badge>
        </div>
        <CardDescription>{election.description}</CardDescription>
      </CardHeader>
      <CardContent>
        <div className="space-y-3">
          <div className="grid grid-cols-2 gap-4 text-sm">
            <div className="flex items-center gap-2">
              <Vote className="w-4 h-4 text-gray-500" />
              <span>{election.positionCount || 0} positions</span>
            </div>
            <div className="flex items-center gap-2">
              <Users className="w-4 h-4 text-gray-500" />
              <span>{election.candidateCount || 0} candidates</span>
            </div>
          </div>

          <div className="flex items-center gap-2 text-sm">
            <Calendar className="w-4 h-4 text-gray-500" />
            <span>Ends: {formatDateTime(election.endDate)}</span>
          </div>

          {election.status === "voting" ? (
            <Button
              className="w-full bg-gradient-to-r from-blue-600 to-purple-600 hover:from-blue-700 hover:to-purple-700"
              onClick={() => onVoteClick(election.id)}
            >
              <Vote className="w-4 h-4 mr-2" />
              Vote Now
            </Button>
          ) : election.status === "candidate_registration" ? (
            <Button
              className="w-full bg-gradient-to-r from-blue-600 to-purple-600 hover:from-blue-700 hover:to-purple-700"
              onClick={() => navigate(`/register/candidate/${election.id}`)}
            >
              <UserPlus className="w-4 h-4 mr-2" />
              Register as Candidate
            </Button>
          ) : election.status === "campaign" ? (
            <Button variant="outline" className="w-full" disabled>
              <Megaphone className="w-4 h-4 mr-2" />
              Campaigning
            </Button>
          ) : (
            <Button variant="outline" className="w-full" disabled>
              <Calendar className="w-4 h-4 mr-2" />
              Voting Ended
            </Button>
          )}
        </div>
      </CardContent>
    </Card>
  );
};

export default Elections;
