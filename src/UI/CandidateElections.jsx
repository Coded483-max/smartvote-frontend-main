import { useState, useMemo } from "react";
import { useNavigate } from "react-router-dom";
import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import {
  Vote,
  Users,
  Calendar,
  CheckCircle,
  Clock,
  Award,
  Eye,
  XCircle,
  AlertCircle,
  Megaphone,
  UserPlus,
} from "lucide-react";
import { useGetActiveElectionsQuery } from "@/api/electionApi";
import { useGetMyApplicationsQuery } from "@/api/candidateApi";
import { formatDateTime } from "@/hooks/DateAndTimeFormatter";
import Loader from "./Loader";

const CandidateElections = () => {
  const navigate = useNavigate();
  const [activeTab, setActiveTab] = useState("running");

  const {
    data: elections = [],
    isLoading: electionsLoading,
    error: electionsError,
  } = useGetActiveElectionsQuery();

  const {
    data: applicationsData,
    isLoading: applicationsLoading,
    error: applicationsError,
  } = useGetMyApplicationsQuery();

  // ✅ Ensure applications is always an array
  const applications = Array.isArray(applicationsData?.applications)
    ? applicationsData.applications
    : Array.isArray(applicationsData)
    ? applicationsData
    : [];

  console.log("Elections:", elections);
  console.log("Applications raw data:", applicationsData);
  console.log("Applications processed:", applications);

  const handleVoteClick = (id) => {
    navigate(`/elections/${id}`);
  };

  const getStatusColor = (status) => {
    switch (status) {
      case "voting":
        return "bg-emerald-100 text-emerald-800"; // ✅ Different from voter dashboard
      case "candidate_registration":
        return "bg-amber-100 text-amber-800";
      case "completed":
        return "bg-slate-100 text-slate-800";
      default:
        return "bg-gray-100 text-gray-800";
    }
  };

  // ✅ Add safety check for applications array
  const getMyApplication = (electionId) => {
    if (!Array.isArray(applications)) {
      console.warn("Applications is not an array:", applications);
      return null;
    }
    return applications.find((app) => app?.election?.id === electionId);
  };

  const votingElections = useMemo(
    () => elections.filter((election) => election.status === "voting"),
    [elections]
  );

  // Get status badge color and icon based on approval status
  const getStatusBadge = (status) => {
    switch (status) {
      case "approved":
        return {
          className: "bg-emerald-100 text-emerald-800", // ✅ Emerald instead of green
          icon: CheckCircle,
          label: "Approved",
        };
      case "pending":
        return {
          className: "bg-amber-100 text-amber-800", // ✅ Amber instead of yellow
          icon: AlertCircle,
          label: "Pending Review",
        };
      case "rejected":
        return {
          className: "bg-rose-100 text-rose-800", // ✅ Rose instead of red
          icon: XCircle,
          label: "Rejected",
        };
      default:
        return {
          className: "bg-slate-100 text-slate-800",
          icon: Clock,
          label: status,
        };
    }
  };

  // ✅ Show loading state
  if (applicationsLoading || electionsLoading) {
    return <Loader />;
  }

  // ✅ Show error state
  if (electionsError || applicationsError) {
    return (
      <div className="flex items-center justify-center py-12">
        <Card className="max-w-md border-purple-200">
          <CardContent className="p-6 text-center">
            <AlertCircle className="w-12 h-12 text-purple-500 mx-auto mb-4" />{" "}
            {/* ✅ Purple icon */}
            <h3 className="text-lg font-semibold text-purple-900 mb-2">
              {" "}
              {/* ✅ Purple text */}
              Error Loading Data
            </h3>
            <p className="text-purple-600 mb-4">
              {electionsError?.message ||
                applicationsError?.message ||
                "Something went wrong"}
            </p>
            <Button
              className="bg-gradient-to-r from-purple-600 to-indigo-600 hover:from-purple-700 hover:to-indigo-700"
              onClick={() => window.location.reload()}
            >
              Try Again
            </Button>
          </CardContent>
        </Card>
      </div>
    );
  }

  return (
    <div className="space-y-6">
      <Tabs
        value={activeTab}
        onValueChange={setActiveTab}
        className="space-y-6"
      >
        <TabsList className="grid w-full grid-cols-3 bg-purple-50">
          <TabsTrigger
            value="running"
            className="data-[state=active]:bg-purple-600 data-[state=active]:text-white"
          >
            My Applications
          </TabsTrigger>
          <TabsTrigger
            value="vote"
            className="data-[state=active]:bg-purple-600 data-[state=active]:text-white"
          >
            Vote in Elections
          </TabsTrigger>
          <TabsTrigger
            value="all"
            className="data-[state=active]:bg-purple-600 data-[state=active]:text-white"
          >
            All Elections
          </TabsTrigger>
        </TabsList>

        <TabsContent value="running" className="space-y-4">
          <div className="mb-4">
            <h3 className="text-lg font-semibold text-purple-900">
              Your Candidacy Applications
            </h3>
            <p className="text-purple-600">
              Track your election applications and status
            </p>
          </div>

          {applicationsLoading ? (
            <Loader />
          ) : applications.length > 0 ? (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
              {applications.map((application) => {
                // ✅ Add safety check for application object
                if (!application || !application.id) {
                  return null;
                }

                const statusInfo = getStatusBadge(application.status);
                const StatusIcon = statusInfo.icon;

                return (
                  <Card
                    key={application.id}
                    className="border-l-4 border-l-purple-500 hover:shadow-lg transition-shadow"
                  >
                    <CardHeader>
                      <div className="flex items-center justify-between">
                        <div>
                          <CardTitle className="text-lg text-purple-900">
                            {application.election?.title || "Unknown Election"}
                          </CardTitle>
                          <CardDescription className="text-purple-600 font-semibold">
                            Running for: &nbsp;
                            {application.position || "Unknown Position"}
                          </CardDescription>
                        </div>
                      </div>
                    </CardHeader>
                    <CardContent>
                      <div className="space-y-3">
                        <div className="text-sm space-y-1 text-purple-700">
                          <p>
                            <strong>Campaign Slogan:</strong>{" "}
                            {application.campaignSlogan || "Not provided"}
                          </p>
                          <p>
                            <strong>Application Date:</strong>{" "}
                            {formatDateTime(application.submittedAt)}
                          </p>
                          <p>
                            <strong>Election Status:</strong>{" "}
                            <span className="capitalize">
                              {application.election?.status || "Unknown"}
                            </span>
                          </p>
                        </div>

                        {/* Show different actions based on approval status and election status */}
                        <div className="flex gap-2">
                          {application.status === "approved" &&
                            application.election?.status === "voting" && (
                              <>
                                <Button
                                  variant="outline"
                                  className="border-purple-300 text-purple-700 hover:bg-purple-50"
                                  onClick={() =>
                                    navigate(
                                      `/candidate-profile/${application.id}`
                                    )
                                  }
                                >
                                  <Eye className="w-4 h-4 mr-2" />
                                  View My Profile
                                </Button>
                                <Button
                                  onClick={() =>
                                    handleVoteClick(application.election.id)
                                  }
                                  className="bg-gradient-to-r from-purple-600 to-indigo-600 hover:from-purple-700 hover:to-indigo-700"
                                >
                                  <Vote className="w-4 h-4 mr-2" />
                                  Vote in Election
                                </Button>
                              </>
                            )}

                          {application.approvalStatus === "pending" && (
                            <Button
                              variant="outline"
                              disabled
                              className="border-amber-300 text-amber-700"
                            >
                              <Clock className="w-4 h-4 mr-2" />
                              Awaiting Approval
                            </Button>
                          )}

                          {application.approvalStatus === "rejected" && (
                            <Button
                              variant="outline"
                              className="border-rose-300 text-rose-700 hover:bg-rose-50"
                              onClick={() => {
                                /* Handle reapplication logic */
                              }}
                            >
                              <AlertCircle className="w-4 h-4 mr-2" />
                              View Feedback
                            </Button>
                          )}
                        </div>
                      </div>
                    </CardContent>
                  </Card>
                );
              })}
            </div>
          ) : (
            <Card className="border-purple-200">
              <CardContent className="p-8 text-center">
                <Award className="w-12 h-12 text-purple-400 mx-auto mb-4" />{" "}
                <h3 className="text-lg font-medium text-purple-900 mb-2">
                  No Applications Yet
                </h3>
                <p className="text-purple-600 mb-4">
                  You haven't applied for any elections yet.
                </p>
                <Button
                  className="bg-gradient-to-r from-purple-600 to-indigo-600 hover:from-purple-700 hover:to-indigo-700"
                  onClick={() => navigate("/candidate-registration-info")}
                >
                  <Award className="w-4 h-4 mr-2" />
                  Apply for Election
                </Button>
              </CardContent>
            </Card>
          )}
        </TabsContent>

        <TabsContent value="vote" className="space-y-4">
          <div className="mb-4">
            <h3 className="text-lg font-semibold text-purple-900">
              {" "}
              {/* ✅ Purple title */}
              Elections You Can Vote In
            </h3>
            <p className="text-purple-600">Cast your vote as a student</p>{" "}
            {/* ✅ Purple description */}
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-3">
            {votingElections.length > 0 ? (
              votingElections.map((election) => {
                const myApplication = getMyApplication(election.id);

                return (
                  <Card
                    key={election.id}
                    className="hover:shadow-lg transition-shadow border-l-4 border-l-purple-400"
                  >
                    <CardHeader className="pb-3">
                      {" "}
                      {/* ✅ Reduced padding */}
                      <div className="flex items-start justify-between gap-2">
                        <div className="flex-1 min-w-0">
                          <CardTitle className="text-base text-purple-900 leading-tight">
                            {election.title}
                          </CardTitle>
                        </div>
                        <div className="flex flex-col gap-1 shrink-0">
                          {/* Show if they're running in this election */}
                          {myApplication && (
                            <Badge
                              variant="secondary"
                              className="bg-purple-100 text-purple-800 text-xs"
                            >
                              <Award className="w-3 h-3 mr-1" />
                              Running
                            </Badge>
                          )}
                          <Badge className="bg-emerald-100 text-emerald-800 text-xs">
                            <Vote className="w-3 h-3 mr-1" />
                            Open
                          </Badge>
                        </div>
                      </div>
                      <CardDescription className="text-sm text-purple-600 mt-2">
                        {election.description}
                      </CardDescription>
                    </CardHeader>
                    <CardContent className="pt-0">
                      <div className="space-y-3">
                        {/* Show their candidacy info if they're running */}
                        {myApplication && (
                          <div className="p-2 bg-purple-50 rounded text-xs font-semibold">
                            <p className="text-purple-800">
                              <strong>You're running for:</strong>{" "}
                              {myApplication.position}
                            </p>
                            <p className="text-purple-600 mt-1">
                              Status: {myApplication.status}
                            </p>
                          </div>
                        )}

                        <div className="flex justify-between text-xs">
                          <span className="text-purple-600">Ends:</span>{" "}
                          <span className="font-medium text-rose-600">
                            {election.endDate
                              ? formatDateTime(election.endDate)
                              : "Unknown"}
                          </span>
                        </div>

                        <Button
                          size="sm"
                          className="w-full bg-gradient-to-r from-purple-600 to-indigo-600 hover:from-purple-700 hover:to-indigo-700"
                          onClick={() => handleVoteClick(election.id)}
                        >
                          <Vote className="w-4 h-4 mr-2" />
                          Vote Now
                        </Button>
                      </div>
                    </CardContent>
                  </Card>
                );
              })
            ) : (
              <div className="col-span-full">
                <Card className="border-purple-200">
                  <CardContent className="p-8 text-center">
                    <Calendar className="w-12 h-12 text-purple-400 mx-auto mb-4" />{" "}
                    {/* ✅ Purple icon */}
                    <h3 className="text-lg font-medium text-purple-900 mb-2">
                      No Elections Available for Voting
                    </h3>
                    <p className="text-purple-600 mb-4">
                      There are currently no elections open for voting.
                    </p>
                  </CardContent>
                </Card>
              </div>
            )}
          </div>
        </TabsContent>

        <TabsContent value="all" className="space-y-4">
          <div className="mb-4">
            <h3 className="text-lg font-semibold text-purple-900">
              All Elections
            </h3>
            <p className="text-purple-600">Complete list of elections</p>{" "}
          </div>

          {/* ✅ Fix the grid layout */}
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-3">
            {elections.length > 0 ? (
              elections.map((election) => {
                const myApplication = getMyApplication(election.id);
                console.log("Election data:", {
                  id: election.id,
                  title: election.title,
                  description: election.description,
                  hasDescription: !!election.description,
                  allKeys: Object.keys(election),
                });

                return (
                  <Card
                    key={election.id}
                    className="hover:shadow-lg transition-all duration-300 border-l-4 border-l-purple-500 max-w-md w-500"
                  >
                    <CardHeader className="pb-3">
                      <div className="flex items-start justify-between gap-2">
                        <div className="flex-1 min-w-0">
                          <CardTitle className="text-base text-purple-900 leading-tight">
                            {election.title}
                          </CardTitle>
                        </div>
                        <Badge className={getStatusColor(election.status)}>
                          {election.status.replace("_", " ")}
                        </Badge>
                      </div>
                      <CardDescription className="text-sm text-purple-600 mt-2">
                        {election.description}
                      </CardDescription>
                    </CardHeader>
                    <CardContent className="pt-0">
                      <div className="space-y-3">
                        <div className="grid grid-cols-1 gap-2 text-sm">
                          <div className="flex items-center gap-2">
                            <Vote className="w-4 h-4 text-purple-500 shrink-0" />
                            <span className="text-purple-700 truncate">
                              {election.positionCount || 0} positions
                            </span>
                          </div>
                          <div className="flex items-center gap-2">
                            <Users className="w-4 h-4 text-purple-500 shrink-0" />
                            <span className="text-purple-700 truncate">
                              {election.candidateCount || 0} candidates
                            </span>
                          </div>
                        </div>

                        <div className="flex items-center gap-2 text-sm">
                          <Calendar className="w-4 h-4 text-purple-500 shrink-0" />
                          <span className="text-purple-700 truncate">
                            Voting Period:
                            {formatDateTime(election.votingStart)} -&nbsp;
                            {formatDateTime(election.votingEnd)}
                          </span>
                        </div>
                        <div className="flex items-center gap-2 text-sm">
                          <Calendar className="w-4 h-4 text-purple-500 shrink-0" />
                          <span className="text-purple-700 truncate">
                            Ends:
                            {election.endDate
                              ? formatDateTime(election.endDate)
                              : "TBD"}
                          </span>
                        </div>

                        {/* ✅ Show candidate status if running */}
                        {myApplication && (
                          <div className="px-2 py-1 bg-purple-50 rounded font-semibold text-xs text-purple-800">
                            Running for: {myApplication.position}
                          </div>
                        )}

                        {election.status === "voting" ? (
                          <Button
                            className="w-full bg-gradient-to-r from-blue-600 to-purple-600 hover:from-blue-700 hover:to-purple-700"
                            onClick={() => handleVoteClick(election.id)}
                          >
                            <Vote className="w-4 h-4 mr-2" />
                            Vote Now
                          </Button>
                        ) : election.status === "candidate_registration" ? (
                          <Button
                            className="w-full bg-gradient-to-r from-green-600 to-emerald-600 hover:from-green-700 hover:to-emerald-700"
                            onClick={() =>
                              navigate(`/register/candidate/${election.id}`)
                            }
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
              })
            ) : (
              <div className="col-span-full">
                <Card className="border-purple-200">
                  {" "}
                  {/* ✅ Purple border */}
                  <CardContent className="p-8 text-center">
                    <Calendar className="w-12 h-12 text-purple-400 mx-auto mb-4" />{" "}
                    {/* ✅ Purple icon */}
                    <h3 className="text-lg font-medium text-purple-900 mb-2">
                      {" "}
                      {/* ✅ Purple text */}
                      No Elections Available
                    </h3>
                    <p className="text-purple-600 mb-4">
                      {" "}
                      {/* ✅ Purple text */}
                      There are currently no elections available.
                    </p>
                  </CardContent>
                </Card>
              </div>
            )}
          </div>
        </TabsContent>
      </Tabs>
    </div>
  );
};

export default CandidateElections;
