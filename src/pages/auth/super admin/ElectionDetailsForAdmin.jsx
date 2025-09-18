import { useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import {
  CalendarDays,
  Users,
  Vote,
  Settings,
  Eye,
  Edit,
  Trash2,
  ArrowBigLeftDash,
  ArrowLeft,
} from "lucide-react";

import { useGetElectionDetailsForAdminQuery } from "@/api/superAdminsApiSlice";

import Loader from "@/UI/Loader";
import { formatDateTime } from "@/hooks/DateAndTimeFormatter";

const ElectionDetailsForAdmin = () => {
  const [selectedTab, setSelectedTab] = useState("overview");

  const { electionId } = useParams();
  const navigate = useNavigate();

  // Fetch election details and positions
  const {
    data: election = {},
    isLoading,
    error: electionError,
  } = useGetElectionDetailsForAdminQuery(electionId);

  // Simple admin check (in real app, this would be proper authentication)
  const isAdmin = true; // This would come from your auth system

  if (!isAdmin) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <Card className="w-96">
          <CardContent className="pt-6">
            <div className="text-center">
              <h2 className="text-xl font-semibold mb-2">Access Denied</h2>
              <p className="text-muted-foreground">
                You need admin privileges to view this page.
              </p>
            </div>
          </CardContent>
        </Card>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-background">
      {/* Header */}
      {isLoading ? (
        <div className="flex justify-center items-center min-h-[400px]">
          <Loader />
        </div>
      ) : (
        <>
          <div className="border-b bg-card">
            <div className="container mx-auto px-4 py-6">
              <Button onClick={() => navigate(-1)} className="mb-4">
                <ArrowLeft />
                Back
              </Button>
              <div className="flex items-center justify-between">
                <div>
                  <h1 className="text-3xl font-bold">{election.title}</h1>
                  <p className="text-muted-foreground mt-1">
                    {election.description}
                  </p>
                </div>
                <div className="flex items-center gap-2">
                  <Badge variant="outline" className="capitalize">
                    {election.status}
                  </Badge>
                  <Button variant="outline" size="sm">
                    <Settings className="h-4 w-4 mr-2" />
                    Settings
                  </Button>
                </div>
              </div>

              {/* Election Stats */}
              <div className="grid grid-cols-1 md:grid-cols-4 gap-4 mt-6">
                <Card>
                  <CardContent className="p-4">
                    <div className="flex items-center gap-2">
                      <CalendarDays className="h-4 w-4 text-muted-foreground" />
                      <div>
                        <p className="text-sm text-muted-foreground">
                          Start Date
                        </p>
                        <p className="font-semibold">
                          {formatDateTime(election.startDate)}
                        </p>
                      </div>
                    </div>
                  </CardContent>
                </Card>
                <Card>
                  <CardContent className="p-4">
                    <div className="flex items-center gap-2">
                      <CalendarDays className="h-4 w-4 text-muted-foreground" />
                      <div>
                        <p className="text-sm text-muted-foreground">
                          End Date
                        </p>
                        <p className="font-semibold">
                          {formatDateTime(election.endDate)}
                        </p>
                      </div>
                    </div>
                  </CardContent>
                </Card>
                <Card>
                  <CardContent className="p-4">
                    <div className="flex flex-col justify-center items-start">
                      <div className="flex items-center gap-2">
                        <Users className="h-4 w-4 text-muted-foreground" />
                        <div>
                          <p className="text-sm text-muted-foreground">
                            Total Candidates
                          </p>
                        </div>
                      </div>
                      <div>
                        <p className="font-semibold ml-10">
                          {election.candidates.length || 5}
                        </p>
                      </div>
                    </div>
                  </CardContent>
                </Card>
                <Card>
                  <CardContent className="p-4">
                    <div className="flex flex-col justify-center items-start">
                      <div className="flex items-center gap-2">
                        <Vote className="h-4 w-4 text-muted-foreground" />
                        <div>
                          <p className="text-sm text-muted-foreground">
                            Elligible Voters
                          </p>
                        </div>
                      </div>
                      <div>
                        <p className="font-semibold ml-10">
                          {election.allowedVoters.length}
                        </p>
                      </div>
                    </div>
                  </CardContent>
                </Card>
              </div>
            </div>
          </div>

          {/* Main Content */}
          <div className="container mx-auto px-4 py-8">
            <Tabs value={selectedTab} onValueChange={setSelectedTab}>
              <TabsList className="grid w-full grid-cols-2">
                <TabsTrigger value="overview">Overview</TabsTrigger>
                <TabsTrigger value="positions">
                  Positions & Candidates
                </TabsTrigger>
              </TabsList>

              <TabsContent value="overview" className="mt-6">
                <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
                  <Card className="lg:col-span-2">
                    <CardHeader>
                      <CardTitle>Election Summary</CardTitle>
                    </CardHeader>
                    <CardContent>
                      <div className="space-y-4">
                        <div>
                          <h4 className="font-semibold mb-2">
                            Positions Available
                          </h4>
                          <div className="grid grid-cols-2 gap-2">
                            {election.positions.map((position) => (
                              <div
                                key={position._id}
                                className="flex justify-between items-center p-2 bg-muted rounded"
                              >
                                <span className="text-sm">{position.name}</span>
                                <Badge variant="secondary">
                                  {position.candidates.length} candidates
                                </Badge>
                              </div>
                            ))}
                          </div>
                        </div>
                      </div>
                    </CardContent>
                  </Card>

                  <Card>
                    <CardHeader>
                      <CardTitle>Quick Actions</CardTitle>
                    </CardHeader>
                    <CardContent className="space-y-2">
                      <Button
                        className="w-full bg-transparent"
                        variant="outline"
                      >
                        <Eye className="h-4 w-4 mr-2" />
                        Preview Ballot
                      </Button>
                      <Button
                        className="w-full bg-transparent"
                        variant="outline"
                      >
                        <Edit className="h-4 w-4 mr-2" />
                        Edit Election
                      </Button>
                      <Button
                        className="w-full bg-transparent"
                        variant="outline"
                      >
                        <Users className="h-4 w-4 mr-2" />
                        Manage Voters
                      </Button>
                    </CardContent>
                  </Card>
                </div>
              </TabsContent>

              <TabsContent value="positions" className="mt-6">
                <div className="space-y-8">
                  {election.positions?.map((position) => (
                    <Card key={position._id}>
                      <CardHeader>
                        <div className="flex items-center justify-between">
                          <div>
                            <CardTitle className="text-xl">
                              {position.name}
                            </CardTitle>
                            <p className="text-muted-foreground mt-1">
                              {position.description}
                            </p>
                          </div>
                          <Badge variant="outline">
                            {position.candidates?.length || 0} candidate
                            {(position.candidates?.length || 0) !== 1
                              ? "s"
                              : ""}
                          </Badge>
                        </div>
                      </CardHeader>
                      <CardContent>
                        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                          {position.candidates &&
                          position.candidates.length > 0 ? (
                            position.candidates.map((candidate) => (
                              <Card
                                key={candidate._id}
                                className="relative overflow-hidden w-85 h-[90%]"
                              >
                                <img
                                  src={candidate.photoUrl}
                                  alt="photo"
                                  crossOrigin="anonymous"
                                  className="h-100 w-full object-cover -mt-6"
                                />
                                <CardContent>
                                  <div className="flex flex-col items-center text-center space-y-4">
                                    {/* <Avatar className="h-20 w-20">
                                      <AvatarImage
                                        src={
                                          candidate.photoUrl ||
                                          "/placeholder.svg"
                                        }
                                        alt={candidate.name}
                                        crossOrigin="anonymous"
                                      />
                                      <AvatarFallback>
                                        {candidate.name
                                          ?.split(" ")
                                          .map((n) => n[0])
                                          .join("") || "??"}
                                      </AvatarFallback>
                                    </Avatar> */}

                                    <div>
                                      <h3 className="font-semibold text-lg">
                                        {candidate.name}
                                      </h3>
                                      <Badge
                                        variant="secondary"
                                        className="mt-1"
                                      >
                                        {candidate.party || "Independent"}
                                      </Badge>
                                    </div>

                                    <div className="space-y-2 w-full">
                                      <div>
                                        <p className="text-sm font-medium text-muted-foreground">
                                          Experience
                                        </p>
                                        <p className="text-sm">
                                          {candidate.experience ||
                                            "Not specified"}
                                        </p>
                                      </div>
                                      <div>
                                        <p className="text-sm font-medium text-muted-foreground">
                                          Platform
                                        </p>
                                        <p className="text-sm">
                                          {candidate.platform ||
                                            "Not specified"}
                                        </p>
                                      </div>
                                    </div>

                                    <div className="flex gap-2 w-full">
                                      <Button
                                        variant="outline"
                                        size="sm"
                                        className="flex-1 bg-transparent"
                                      >
                                        <Eye className="h-3 w-3 mr-1" />
                                        View
                                      </Button>
                                      <Button
                                        variant="outline"
                                        size="sm"
                                        className="flex-1 bg-transparent"
                                      >
                                        <Edit className="h-3 w-3 mr-1" />
                                        Edit
                                      </Button>
                                      <Button
                                        variant="outline"
                                        size="sm"
                                        className="text-destructive hover:text-destructive bg-transparent"
                                      >
                                        <Trash2 className="h-3 w-3" />
                                      </Button>
                                    </div>
                                  </div>
                                </CardContent>
                              </Card>
                            ))
                          ) : (
                            <div className="col-span-full text-center py-8 text-muted-foreground">
                              <p>
                                No candidates registered for this position yet.
                              </p>
                            </div>
                          )}
                        </div>
                      </CardContent>
                    </Card>
                  ))}
                </div>
              </TabsContent>
            </Tabs>
          </div>
        </>
      )}
    </div>
  );
};
export default ElectionDetailsForAdmin;
