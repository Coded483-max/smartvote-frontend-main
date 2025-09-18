import React from "react";
import { Link } from "react-router-dom";
import { useGetActiveElectionsQuery } from "@/api/electionApi";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Calendar, Users, Clock, Award, ArrowRight } from "lucide-react";

import { formatDateTime } from "../hooks/DateAndTimeFormatter";

const CandidateRegistrationLanding = () => {
  const {
    data: elections = [],
    isLoading,
    error,
  } = useGetActiveElectionsQuery();

  console.log("Elections data:", elections);

  const registrationOpenElections = elections.filter(
    (election) => election.status === "candidate_registration"
  );

  return (
    <div className="min-h-screen py-12">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-12">
          <h1 className="text-4xl font-bold text-purple-900 mb-4">
            🏛️ Run for Student Government
          </h1>
          <p className="text-xl text-purple-600">
            Ready to make a difference? Register as a candidate for upcoming
            elections.
          </p>
        </div>

        <div className="space-y-8">
          {isLoading ? (
            <Card className="max-w-4xl mx-auto border-purple-200">
              <CardContent className="p-8 text-center">
                <div className="animate-pulse">
                  <div className="h-8 bg-purple-200 rounded mb-4"></div>
                  <div className="h-4 bg-purple-100 rounded"></div>
                </div>
              </CardContent>
            </Card>
          ) : error ? (
            <Card className="max-w-4xl mx-auto border-rose-200 bg-rose-50">
              <CardContent className="p-8 text-center">
                <h3 className="text-lg font-semibold text-rose-900 mb-2">
                  Error Loading Elections
                </h3>
                <p className="text-rose-700">
                  Unable to load available elections. Please try again later.
                </p>
              </CardContent>
            </Card>
          ) : registrationOpenElections.length > 0 ? (
            <div>
              <div className="text-center mb-8">
                <h2 className="text-2xl font-bold text-purple-900 mb-2">
                  Available Elections for Registration
                </h2>
                <p className="text-purple-600">
                  Choose an election to register as a candidate
                </p>
              </div>

              <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
                {registrationOpenElections.map((election) => (
                  <Card
                    key={election.id}
                    className="border-l-4 border-l-purple-500 hover:shadow-lg transition-all duration-300 group"
                  >
                    <CardHeader>
                      <div className="flex items-start justify-between">
                        <div className="flex-1">
                          <CardTitle className="text-lg text-purple-900 mb-2 group-hover:text-purple-700">
                            {election.title}
                          </CardTitle>
                          <Badge className="bg-emerald-100 text-emerald-800 mb-2">
                            <Clock className="w-3 h-3 mr-1" />
                            Registration Open
                          </Badge>
                        </div>
                      </div>
                      <CardDescription className="text-purple-600">
                        {election.description}
                      </CardDescription>
                    </CardHeader>

                    <CardContent className="space-y-4">
                      <div className="grid grid-cols-1 gap-3 text-sm">
                        <div className="flex items-center gap-2">
                          <Users className="w-4 h-4 text-purple-500" />
                          <span className="text-purple-700">
                            {election.positionCount || 0} positions available
                          </span>
                        </div>

                        <div className="flex items-center gap-2">
                          <Award className="w-4 h-4 text-purple-500" />
                          <span className="text-purple-700">
                            {election.candidateCount || 0} candidates registered
                          </span>
                        </div>

                        <div className="flex items-center gap-2">
                          <Calendar className="w-4 h-4 text-purple-500" />
                          <span className="text-purple-700">
                            Voting Starts:{" "}
                            {formatDateTime(election.votingStart)}
                          </span>
                        </div>
                        <div className="flex items-center gap-2">
                          <Calendar className="w-4 h-4 text-purple-500" />
                          <span className="text-purple-700">
                            Voting Ends: {formatDateTime(election.votingEnd)}
                          </span>
                        </div>
                      </div>

                      {election.candidateRegistrationPeriod?.end && (
                        <div className="bg-amber-50 border border-amber-200 rounded-lg p-3">
                          <div className="flex items-center gap-2 text-sm">
                            <Clock className="w-4 h-4 text-amber-600" />
                            <span className="text-amber-800 font-medium">
                              Registration closes:{" "}
                              {formatDateTime(
                                election.candidateRegistrationPeriod.end
                              )}
                            </span>
                          </div>
                        </div>
                      )}

                      <div className="pt-2">
                        <Link to={`/register/candidate/${election.id}`}>
                          <Button className="w-full bg-gradient-to-r from-purple-600 to-indigo-600 hover:from-purple-700 hover:to-indigo-700 group">
                            Register for This Election
                            <ArrowRight className="w-4 h-4 ml-2 group-hover:translate-x-1 transition-transform" />
                          </Button>
                        </Link>
                      </div>

                      {election.positions && election.positions.length > 0 && (
                        <div className="border-t pt-3">
                          <p className="text-sm font-medium text-purple-900 mb-2">
                            Available Positions:
                          </p>
                          <div className="flex flex-wrap gap-1">
                            {election.positions
                              .slice(0, 3)
                              .map((position, index) => (
                                <Badge
                                  key={index}
                                  variant="outline"
                                  className="text-xs border-purple-300 text-purple-700"
                                >
                                  {position.name}
                                </Badge>
                              ))}
                            {election.positions.length > 3 && (
                              <Badge
                                variant="outline"
                                className="text-xs border-purple-300 text-purple-700"
                              >
                                +{election.positions.length - 3} more
                              </Badge>
                            )}
                          </div>
                        </div>
                      )}
                    </CardContent>
                  </Card>
                ))}
              </div>
            </div>
          ) : (
            <Card className="max-w-4xl mx-auto border-gray-200">
              <CardContent className="p-8 text-center">
                <Calendar className="w-16 h-16 text-gray-400 mx-auto mb-4" />
                <h2 className="text-2xl font-bold text-gray-900 mb-4">
                  No Elections Currently Accepting Candidates
                </h2>
                <p className="text-gray-600 mb-6">
                  Check back later for upcoming election registration periods.
                </p>
                <Link to="/elections">
                  <Button
                    variant="outline"
                    className="border-purple-300 text-purple-700 hover:bg-purple-50"
                  >
                    View All Elections
                  </Button>
                </Link>
              </CardContent>
            </Card>
          )}
        </div>

        {/* Information Section */}
        <div className="mt-16 grid md:grid-cols-2 gap-8 max-w-6xl mx-auto">
          <Card className="border-purple-200">
            <CardHeader>
              <CardTitle className="text-purple-900">
                Why Register as a Candidate?
              </CardTitle>
            </CardHeader>
            <CardContent>
              <ul className="space-y-3 text-purple-700">
                <li className="flex items-center gap-2">
                  <div className="w-2 h-2 bg-purple-500 rounded-full"></div>
                  Make a real impact on campus life
                </li>
                <li className="flex items-center gap-2">
                  <div className="w-2 h-2 bg-purple-500 rounded-full"></div>
                  Represent student voices and concerns
                </li>
                <li className="flex items-center gap-2">
                  <div className="w-2 h-2 bg-purple-500 rounded-full"></div>
                  Gain valuable leadership experience
                </li>
                <li className="flex items-center gap-2">
                  <div className="w-2 h-2 bg-purple-500 rounded-full"></div>
                  Build your professional network
                </li>
              </ul>
            </CardContent>
          </Card>

          <Card className="border-purple-200">
            <CardHeader>
              <CardTitle className="text-purple-900">
                Candidate Requirements
              </CardTitle>
            </CardHeader>
            <CardContent>
              <ul className="space-y-3 text-purple-700">
                <li className="flex items-center gap-2">
                  <div className="w-2 h-2 bg-purple-500 rounded-full"></div>
                  Must be a registered voter
                </li>
                <li className="flex items-center gap-2">
                  <div className="w-2 h-2 bg-purple-100 rounded-full"></div>
                  Minimum GPA of 3.0
                </li>
                <li className="flex items-center gap-2">
                  <div className="w-2 h-2 bg-purple-100 rounded-full"></div>
                  Good academic standing
                </li>
                <li className="flex items-center gap-2">
                  <div className="w-2 h-2 bg-purple-100 rounded-full"></div>
                  No disciplinary actions
                </li>
              </ul>
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  );
};

export default CandidateRegistrationLanding;
