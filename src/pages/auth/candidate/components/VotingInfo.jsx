import React from "react";
import { useParams } from "react-router-dom";
import { TrendingUp } from "lucide-react";
import {
  Card,
  CardHeader,
  CardTitle,
  CardDescription,
  CardContent,
} from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { ArrowUp, BarChart3, Users, Clock, Target } from "lucide-react";
import { Progress } from "@/components/ui/progress";
import {
  useGetVoteStatsQuery,
  useGetMyApplicationsQuery,
} from "@/api/candidateApi";
import { useGetActiveElectionsQuery } from "@/api/superAdminsApiSlice";

import { formatDateTime } from "@/hooks/DateAndTimeFormatter";

const VotingInfo = () => {
  // const { candidateId } = useParams();

  // console.log(candidateId, "Candidate ID in VotingInfo");
  const {
    data: applicationsData,
    isLoading: applicationsLoading,
    error: applicationsError,
  } = useGetMyApplicationsQuery();

  // Fetch elections data
  const {
    data: electionsData,
    isLoading: electionsLoading,
    error: electionsError,
  } = useGetActiveElectionsQuery();

  const { data: voteStats, isLoading } = useGetVoteStatsQuery();

  if (isLoading) {
    return <div>Loading...</div>;
  }

  console.log(voteStats, "Vote Stats");

  if (electionsLoading) {
    return <div>Loading elections...</div>;
  }

  // ✅ Ensure applications is always an array
  const applications = Array.isArray(applicationsData?.applications)
    ? applicationsData.applications
    : Array.isArray(applicationsData)
    ? applicationsData
    : [];

  console.log(applications, "Applications in VotingInfo");

  // ✅ Ensure elections is always an array
  const elections = Array.isArray(electionsData?.elections)
    ? electionsData.elections
    : Array.isArray(electionsData)
    ? electionsData
    : [];

  console.log(elections, "Elections in VotingInfo");

  // ✅ Add safety check for applications array
  const getMyApplication = (electionId) => {
    if (!Array.isArray(applications)) {
      console.warn("Applications is not an array:", applications);
      return null;
    }
    return applications.find((app) => app?.election?.id === electionId);
  };

  const myVotes = voteStats.yourVotes;
  const opponentVotes = voteStats.opponents?.[0]?.votes ?? 0; // Assuming first opponent is closest rival
  const voteDiff = myVotes - opponentVotes;

  function getTimeRemaining(endDate) {
    if (!endDate) return "Unknown";
    const end = new Date(endDate);
    const now = new Date();
    const diffMs = end - now;

    if (diffMs <= 0) return "Voting ended";

    const hours = Math.floor(diffMs / (1000 * 60 * 60));
    const minutes = Math.floor((diffMs % (1000 * 60 * 60)) / (1000 * 60));
    return `${hours} hours ${minutes} minutes remaining`;
  }

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex justify-between items-center">
        <div>
          <h2 className="text-2xl font-bold text-purple-900">
            Election Results & Progress
          </h2>
          <p className="text-purple-600">
            Real-time voting data and performance analytics
          </p>
        </div>
        <div className="flex gap-2">
          <Badge variant="outline" className="bg-emerald-50 border-emerald-200">
            <div className="w-2 h-2 bg-emerald-500 rounded-full mr-2"></div>
            Live Results
          </Badge>
          <Button
            variant="outline"
            className="border-purple-300 text-purple-700 hover:bg-purple-50"
            onClick={() => alert("Results refreshed")}
          >
            <TrendingUp className="mr-2 h-4 w-4" />
            Refresh
          </Button>
        </div>
      </div>

      {/* Current Standing */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        <Card className="border-l-4 border-l-purple-500 bg-gradient-to-r from-purple-50 to-indigo-50 hover:shadow-md transition-shadow">
          <CardHeader>
            <CardTitle className="text-purple-900">
              Your Current Standing
            </CardTitle>
            <CardDescription className="text-purple-600">
              {applications[0]?.name} - {applications[0]?.position}
            </CardDescription>
          </CardHeader>
          <CardContent>
            <div className="text-4xl font-bold text-purple-600 mb-2">
              {voteStats.yourVotes}
            </div>

            <div className="text-lg font-medium text-purple-800 mb-2">
              votes ({voteStats.yourPercent}%)
            </div>
            <div className="flex items-center text-sm text-emerald-600">
              {voteDiff > 0 ? (
                <>
                  <ArrowUp className="h-4 w-4 mr-1" />
                  Leading by {voteDiff} votes
                </>
              ) : voteDiff < 0 ? (
                <>
                  <ArrowUp className="h-4 w-4 mr-1 rotate-180 text-rose-500" />
                  <p className="text-rose-500">
                    {" "}
                    Behind by {Math.abs(voteDiff)} votes
                  </p>
                </>
              ) : (
                <>
                  <ArrowUp className="h-4 w-4 mr-1 text-gray-400" />
                  Tied with opponent
                </>
              )}
            </div>
          </CardContent>
        </Card>

        {voteStats.opponents.map((opponent) => (
          <Card
            key={opponent.id}
            className="border-purple-200 hover:shadow-md transition-shadow"
          >
            <CardHeader>
              <CardTitle className="text-purple-900">{opponent.name}</CardTitle>
              <CardDescription className="text-purple-600">
                {opponent.position}
              </CardDescription>
            </CardHeader>
            <CardContent>
              <div className="text-4xl font-bold text-slate-600 mb-2">
                {opponent.votes}
              </div>
              <div className="text-lg font-medium text-purple-700 mb-2">
                votes (
                {((opponent.votes / voteStats.totalVotes) * 100).toFixed(1)}%)
              </div>
              <div className="text-sm text-purple-600">
                {opponent.rankLabel}
              </div>
            </CardContent>
          </Card>
        ))}
      </div>

      {/* Election Overview */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        <Card className="border-purple-200 hover:shadow-md transition-shadow">
          <CardHeader>
            <div className="flex items-center gap-2">
              <Clock className="h-5 w-5 text-purple-600" />

              <CardTitle className="text-purple-900">Election Status</CardTitle>
            </div>
            <CardDescription className="text-purple-600">
              Current voting progress and timeline
            </CardDescription>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              <div className="p-4 bg-emerald-50 rounded-lg border border-emerald-200">
                <div className="flex items-center gap-2 mb-2">
                  <div className="w-3 h-3 bg-emerald-500 rounded-full"></div>
                  <h4 className="font-medium text-purple-900">
                    Voting is LIVE
                  </h4>
                </div>
                <p className="text-sm text-purple-700">
                  Starts: {formatDateTime(elections[0]?.votingStart)}
                </p>
                <p className="text-sm text-purple-700">
                  Ends: {formatDateTime(elections[0]?.votingEnd)}
                </p>
                <p className="text-xs text-purple-600">
                  {getTimeRemaining(elections[0]?.votingEnd)}
                </p>
              </div>
              <div className="space-y-2">
                <div className="flex justify-between text-sm text-purple-700">
                  <span>Total Votes Cast</span>
                  <span>2,947 / 8,000 eligible</span>
                </div>
                <Progress
                  value={37}
                  className="h-3 bg-purple-100"
                  style={{
                    background: "rgb(243 232 255)",
                    "--progress-foreground": "rgb(147 51 234)",
                  }}
                />
                <p className="text-xs text-purple-600">
                  36.8% voter turnout so far
                </p>
              </div>
              <div className="grid grid-cols-2 gap-4 text-center">
                <div className="p-3 bg-purple-50 rounded-lg border border-purple-200">
                  {/* ✅ Purple background */}
                  <div className="text-xl font-bold text-purple-600">156</div>
                  <div className="text-xs text-purple-600">Votes this hour</div>
                </div>
                <div className="p-3 bg-indigo-50 rounded-lg border border-indigo-200">
                  <div className="text-xl font-bold text-indigo-600">5,053</div>
                  <div className="text-xs text-purple-600">
                    Students yet to vote
                  </div>
                </div>
              </div>
            </div>
          </CardContent>
        </Card>

        <Card className="border-purple-200 hover:shadow-md transition-shadow">
          <CardHeader>
            <div className="flex items-center gap-2">
              <BarChart3 className="h-5 w-5 text-purple-600" />
              <CardTitle className="text-purple-900">Vote Breakdown</CardTitle>
            </div>
            <CardDescription className="text-purple-600">
              How votes are distributed across candidates
            </CardDescription>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              <div>
                <div className="flex justify-between text-sm mb-2 text-purple-700">
                  <span className="font-medium">Alex Smith (You)</span>
                  <span>1,247 votes</span>
                </div>
                <Progress
                  value={42.3}
                  className="h-3 bg-purple-100"
                  style={{
                    background: "rgb(243 232 255)",
                    "--progress-foreground": "rgb(147 51 234)",
                  }}
                />
              </div>
              <div>
                <div className="flex justify-between text-sm mb-2 text-purple-700">
                  <span>Sarah Johnson</span>
                  <span>1,158 votes</span>
                </div>
                <Progress
                  value={39.3}
                  className="h-3 bg-rose-100"
                  style={{
                    background: "rgb(255 241 242)",
                    "--progress-foreground": "rgb(244 63 94)",
                  }}
                />
              </div>
              <div>
                <div className="flex justify-between text-sm mb-2 text-purple-700">
                  <span>Mike Chen</span>
                  <span>542 votes</span>
                </div>
                <Progress
                  value={18.4}
                  className="h-3 bg-slate-100"
                  style={{
                    background: "rgb(241 245 249)",
                    "--progress-foreground": "rgb(100 116 139)",
                  }}
                />
              </div>
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Detailed Analytics */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        <Card className="border-purple-200 hover:shadow-md transition-shadow">
          <CardHeader>
            <div className="flex items-center gap-2">
              <TrendingUp className="h-5 w-5 text-purple-600" />
              <CardTitle className="text-purple-900">Vote Trends</CardTitle>
            </div>
            <CardDescription className="text-purple-600">
              How your vote count has changed throughout the day
            </CardDescription>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              <div className="h-48 flex items-center justify-center bg-gradient-to-r from-purple-50 to-indigo-50 rounded-lg border border-purple-200">
                <div className="text-center">
                  <BarChart3 className="h-12 w-12 text-purple-400 mx-auto mb-2" />
                  {/* ✅ Purple chart icon */}
                  <p className="text-purple-700">Vote trend chart</p>
                  <p className="text-xs text-purple-600">
                    Shows hourly vote progression
                  </p>
                </div>
              </div>
              <div className="grid grid-cols-3 gap-4 text-center text-sm">
                <div className="p-2 bg-purple-50 rounded border border-purple-200">
                  <div className="font-medium text-purple-900">8-12 PM</div>
                  <div className="text-purple-600">423 votes</div>
                </div>
                <div className="p-2 bg-indigo-50 rounded border border-indigo-200">
                  <div className="font-medium text-purple-900">12-4 PM</div>
                  <div className="text-purple-600">567 votes</div>
                </div>
                <div className="p-2 bg-violet-50 rounded border border-violet-200">
                  <div className="font-medium text-purple-900">4-8 PM</div>
                  <div className="text-purple-600">257 votes</div>
                </div>
              </div>
            </div>
          </CardContent>
        </Card>

        <Card className="border-purple-200 hover:shadow-md transition-shadow">
          <CardHeader>
            <div className="flex items-center gap-2">
              <Target className="h-5 w-5 text-purple-600" />
              <CardTitle className="text-purple-900">
                Campus Breakdown
              </CardTitle>
            </div>
            <CardDescription className="text-purple-600">
              Vote distribution by residence halls and areas
            </CardDescription>
          </CardHeader>
          <CardContent>
            <div className="space-y-3">
              {[
                {
                  area: "North Campus Dorms",
                  you: 234,
                  total: 456,
                  percentage: 51.3,
                },
                {
                  area: "South Campus Dorms",
                  you: 189,
                  total: 398,
                  percentage: 47.5,
                },
                {
                  area: "Greek Life",
                  you: 167,
                  total: 289,
                  percentage: 57.8,
                },
                {
                  area: "Off-Campus Students",
                  you: 298,
                  total: 634,
                  percentage: 47.0,
                },
                {
                  area: "Graduate Students",
                  you: 89,
                  total: 178,
                  percentage: 50.0,
                },
                {
                  area: "Commuter Students",
                  you: 270,
                  total: 592,
                  percentage: 45.6,
                },
              ].map((area, index) => {
                const getPerformanceColor = (percentage) => {
                  if (percentage >= 55)
                    return "bg-emerald-100 border-emerald-200";
                  if (percentage >= 50)
                    return "bg-purple-100 border-purple-200";
                  if (percentage >= 45) return "bg-amber-100 border-amber-200";
                  return "bg-rose-100 border-rose-200";
                };

                return (
                  <div
                    key={index}
                    className={`p-3 border rounded-lg ${getPerformanceColor(
                      area.percentage
                    )}`}
                  >
                    <div className="flex justify-between items-center mb-2">
                      <span className="text-sm font-medium text-purple-900">
                        {area.area}
                      </span>
                      <span className="text-sm text-purple-700">
                        {area.you}/{area.total} ({area.percentage}%)
                      </span>
                    </div>
                    <Progress
                      value={area.percentage}
                      className="h-2 bg-purple-100"
                      style={{
                        background: "rgb(243 232 255)",
                        "--progress-foreground":
                          area.percentage >= 50
                            ? "rgb(34 197 94)"
                            : "rgb(245 158 11)",
                      }}
                    />
                  </div>
                );
              })}
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Real-time Updates */}
      <Card className="border-purple-200 hover:shadow-md transition-shadow">
        <CardHeader>
          <div className="flex items-center gap-2">
            <Users className="h-5 w-5 text-purple-600" />
            <CardTitle className="text-purple-900">Live Vote Updates</CardTitle>
          </div>
          <CardDescription className="text-purple-600">
            Recent voting activity (updates every 5 minutes)
          </CardDescription>
        </CardHeader>
        <CardContent>
          <div className="space-y-3">
            {[
              {
                time: "2:45 PM",
                update: "You gained 23 votes in the last 15 minutes",
                type: "positive",
              },
              {
                time: "2:30 PM",
                update: "Sarah Johnson gained 18 votes",
                type: "neutral",
              },
              {
                time: "2:15 PM",
                update:
                  "Strong showing in Greek Life - you're leading 67% to 33%",
                type: "positive",
              },
              {
                time: "2:00 PM",
                update: "Mike Chen gained 12 votes",
                type: "neutral",
              },
              {
                time: "1:45 PM",
                update: "You're now leading by 89 votes (was 67)",
                type: "positive",
              },
              {
                time: "1:30 PM",
                update: "High turnout in North Campus dorms",
                type: "neutral",
              },
            ].map((update, index) => (
              <div
                key={index}
                className="flex items-start space-x-3 p-3 bg-purple-50 rounded-lg border border-purple-200"
              >
                <div
                  className={`w-2 h-2 rounded-full mt-2 ${
                    update.type === "positive"
                      ? "bg-emerald-500"
                      : update.type === "negative"
                      ? "bg-rose-500"
                      : "bg-purple-500" // ✅ Purple for neutral
                  }`}
                ></div>
                <div className="flex-1">
                  <div className="flex justify-between items-start">
                    <p className="text-sm text-purple-900">{update.update}</p>
                    <span className="text-xs text-purple-600">
                      {update.time}
                    </span>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </CardContent>
      </Card>

      {/* Election Day Strategy */}
      <Card className="border-purple-200 bg-gradient-to-r from-purple-50 to-indigo-50 hover:shadow-md transition-shadow">
        {/* ✅ Purple gradient background */}
        <CardHeader>
          <CardTitle className="text-purple-900">
            Election Day Performance
          </CardTitle>
          <CardDescription className="text-purple-600">
            How you're doing compared to expectations
          </CardDescription>
        </CardHeader>
        <CardContent>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div className="space-y-4">
              <h4 className="font-medium text-purple-900 flex items-center gap-2">
                <div className="w-3 h-3 bg-emerald-500 rounded-full"></div>
                Strongholds (Performing Well)
              </h4>
              <div className="space-y-2">
                <div className="p-3 bg-emerald-50 rounded-lg border border-emerald-200 text-sm">
                  <strong className="text-purple-900">Greek Life:</strong>
                  <span className="text-emerald-700">
                    57.8% (Expected: 45%)
                  </span>
                </div>
                <div className="p-3 bg-emerald-50 rounded-lg border border-emerald-200 text-sm">
                  <strong className="text-purple-900">North Campus:</strong>
                  <span className="text-emerald-700">
                    51.3% (Expected: 48%)
                  </span>
                </div>
                <div className="p-3 bg-emerald-50 rounded-lg border border-emerald-200 text-sm">
                  <strong className="text-purple-900">
                    Graduate Students:
                  </strong>
                  <span className="text-emerald-700">
                    50.0% (Expected: 40%)
                  </span>
                </div>
              </div>
            </div>
            <div className="space-y-4">
              <h4 className="font-medium text-purple-900 flex items-center gap-2">
                <div className="w-3 h-3 bg-amber-500 rounded-full"></div>
                Areas to Watch
              </h4>
              <div className="space-y-2">
                <div className="p-3 bg-amber-50 rounded-lg border border-amber-200 text-sm">
                  <strong className="text-purple-900">
                    Commuter Students:
                  </strong>
                  <span className="text-amber-700"> 45.6% (Expected: 50%)</span>
                </div>
                <div className="p-3 bg-amber-50 rounded-lg border border-amber-200 text-sm">
                  <strong className="text-purple-900">South Campus:</strong>
                  <span className="text-amber-700"> 47.5% (Expected: 52%)</span>
                </div>
                <div className="p-3 bg-rose-50 rounded-lg border border-rose-200 text-sm">
                  <strong className="text-purple-900">Off-Campus:</strong>
                  <span className="text-rose-700"> 47.0% (Expected: 55%)</span>
                </div>
              </div>
            </div>
          </div>
        </CardContent>
      </Card>
    </div>
  );
};

export default VotingInfo;
