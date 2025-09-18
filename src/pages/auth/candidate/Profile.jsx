import { useState } from "react";
import { useSelector } from "react-redux";
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
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import {
  Vote,
  User,
  Calendar,
  Award,
  Users,
  BookOpen,
  Mail,
  Phone,
  Edit,
  Settings,
  ArrowLeft,
  CheckCircle,
  Clock,
  Trophy,
  Target,
  Activity,
  BarChart3,
  Star,
  Zap,
  Share2,
  Download,
  Eye,
  EyeOff,
} from "lucide-react";

import { useGetActiveElectionsQuery } from "@/api/electionApi";
import { useGetMyApplicationsQuery } from "@/api/candidateApi";

const Profile = () => {
  const [activeTab, setActiveTab] = useState("overview");
  const [isProfilePublic, setIsProfilePublic] = useState(false);

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

  console.log(applications);

  const { candidate } = useSelector((state) => state.auth);

  const getInitials = (candidate) => {
    const firstName = candidate?.firstName || "";
    const lastName = candidate?.lastName || "";

    const firstInitial = firstName.charAt(0).toUpperCase();
    const lastInitial = lastName.charAt(0).toUpperCase();

    return `${firstInitial}${lastInitial}`;
  };
  const initials = getInitials(candidate);
  const isVerified = candidate?.isVerified;
  const fullName = `${candidate?.firstName || ""} ${
    candidate?.lastName || ""
  }`.trim();
  const profilePicture =
    candidate?.profilePicture || "/placeholder.svg?height=128&width=128";
  const isStudent = candidate?.role === "student";
  const joinedDate = new Date(
    candidate?.joinedDate || Date.now()
  ).toLocaleDateString();
  const studentId = candidate?.studentId || "N/A";
  const phoneNumber = candidate?.mobileNumber || "N/A";
  const email = candidate?.email || "N/A";

  const votingStats = {
    totalElections: 12,
    participated: 9,
    participationRate: 75,
    streak: 5,
    longestStreak: 8,
    firstVote: "October 2021",
  };

  const achievements = [
    {
      id: 1,
      title: "First Vote",
      description: "Cast your first vote in a student election",
      icon: Vote,
      earned: true,
      date: "Oct 15, 2021",
      color: "bg-blue-100 text-blue-600",
    },
    {
      id: 2,
      title: "Consistent candidate",
      description: "Participated in 5 consecutive elections",
      icon: Target,
      earned: true,
      date: "Mar 20, 2023",
      color: "bg-green-100 text-green-600",
    },
    {
      id: 3,
      title: "Democracy Champion",
      description: "Participated in 10+ elections",
      icon: Trophy,
      earned: false,
      date: null,
      color: "bg-yellow-100 text-yellow-600",
    },
    {
      id: 4,
      title: "Early Bird",
      description: "Vote within the first 24 hours of election opening",
      icon: Zap,
      earned: true,
      date: "Sep 5, 2024",
      color: "bg-purple-100 text-purple-600",
    },
    {
      id: 5,
      title: "Community Leader",
      description: "Encourage 10+ students to vote",
      icon: Users,
      earned: false,
      date: null,
      color: "bg-pink-100 text-pink-600",
    },
    {
      id: 6,
      title: "Perfect Attendance",
      description: "Participate in all elections in an academic year",
      icon: Star,
      earned: true,
      date: "May 30, 2024",
      color: "bg-orange-100 text-orange-600",
    },
  ];

  const recentActivity = [
    {
      id: 1,
      type: "vote",
      title: "Voted in President Student Council Election",
      date: "2 days ago",
      icon: Vote,
      color: "text-blue-600",
    },
    {
      id: 2,
      type: "achievement",
      title: "Earned 'Early Bird' achievement",
      date: "1 week ago",
      icon: Award,
      color: "text-yellow-600",
    },
    {
      id: 3,
      type: "profile",
      title: "Updated profile information",
      date: "2 weeks ago",
      icon: User,
      color: "text-gray-600",
    },
    {
      id: 4,
      type: "vote",
      title: "Voted in Department Representative Election",
      date: "1 month ago",
      icon: Vote,
      color: "text-blue-600",
    },
  ];

  const participationHistory = [
    {
      election: "President Student Council",
      date: "Dec 20, 2024",
      status: "voted",
      position: "President",
    },
    {
      election: "Department Representative",
      date: "Nov 15, 2024",
      status: "voted",
      position: "CS Representative",
    },
    {
      election: "Sports Director",
      date: "Oct 10, 2024",
      status: "voted",
      position: "Sports Director",
    },
    {
      election: "Club President Elections",
      date: "Sep 5, 2024",
      status: "voted",
      position: "Tech Club President",
    },
    {
      election: "Student Union Elections",
      date: "May 20, 2024",
      status: "voted",
      position: "Multiple Positions",
    },
    {
      election: "Academic Affairs Director",
      date: "Apr 15, 2024",
      status: "missed",
      position: "Academic Director",
    },
  ];

  const earnedAchievements = achievements.filter((a) => a.earned);
  const upcomingAchievements = achievements.filter((a) => !a.earned);

  return (
    <div className="min-h-screen ">
      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {/* Profile Header */}
        <Card className="mb-8 overflow-hidden">
          <div className="bg-gradient-to-r from-purple-600 to-indigo-600 h-32"></div>
          <CardContent className="relative pt-0 pb-6">
            <div className="flex flex-col md:flex-row items-start md:items-end space-y-4 md:space-y-0 md:space-x-6 -mt-16">
              <div className="relative">
                <Avatar className="w-32 h-32 border-4 border-white shadow-lg">
                  <AvatarImage
                    src={applications[0]?.photoUrl}
                    crossOrigin="anonymous"
                  />
                  <AvatarFallback className="text-3xl bg-gradient-to-r from-purple-600 to-indigo-600 text-white">
                    {initials}
                  </AvatarFallback>
                </Avatar>
                <Button
                  size="sm"
                  className="absolute -bottom-2 -right-2 rounded-full w-8 h-8 p-0 bg-purple-600 hover:bg-indigo-600 text-white"
                  variant="secondary"
                >
                  <Edit className="w-4 h-4" />
                </Button>
              </div>

              <div className="flex-1 space-y-2">
                <div className="flex items-center space-x-3">
                  <h1 className="text-3xl font-bold text-purple-900">
                    {applications[0]?.name}
                  </h1>
                  <Badge
                    variant="secondary"
                    className="bg-indigo-100 text-indigo-700"
                  >
                    <CheckCircle className="w-3 h-3 mr-1" />
                    {isVerified && <p>Verified Student</p>}
                  </Badge>
                </div>
                <div className="flex flex-wrap items-center gap-4 text-purple-700">
                  <div className="flex items-center space-x-1">
                    <BookOpen className="w-4 h-4" />
                    <span>{applications[0]?.department}</span>
                  </div>
                  <div className="flex items-center space-x-1">
                    <Calendar className="w-4 h-4" />
                    <span>{applications[0]?.yearOfStudy}</span>
                  </div>
                  <div className="flex items-center space-x-1">
                    <User className="w-4 h-4" />
                    <span>ID: {studentId}</span>
                  </div>
                  <div className="flex items-center space-x-1">
                    <Activity className="w-4 h-4" />
                    {/* <span>Active {studentInfo.lastActive}</span> */}
                  </div>
                </div>
                <div className="flex items-center space-x-2">
                  <Button
                    variant="outline"
                    size="sm"
                    onClick={() => setIsProfilePublic(!isProfilePublic)}
                    className="flex items-center border-purple-300 text-purple-700 hover:bg-purple-50"
                  >
                    {isProfilePublic ? (
                      <Eye className="w-4 h-4 mr-2" />
                    ) : (
                      <EyeOff className="w-4 h-4 mr-2" />
                    )}
                    {isProfilePublic ? "Public Profile" : "Private Profile"}
                  </Button>
                </div>
              </div>

              <div className="text-right">
                <div className="text-2xl font-bold text-purple-900">
                  {votingStats.participationRate}%
                </div>
                <div className="text-sm text-purple-700">
                  Participation Rate
                </div>
              </div>
            </div>
          </CardContent>
        </Card>

        {/* Quick Stats */}
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-8">
          <Card>
            <CardContent className="p-4 text-center">
              <div className="text-2xl font-bold text-purple-600">
                {votingStats.participated}
              </div>
              <div className="text-sm text-purple-700">Elections Voted</div>
            </CardContent>
          </Card>
          <Card>
            <CardContent className="p-4 text-center">
              <div className="text-2xl font-bold text-indigo-600">
                {votingStats.streak}
              </div>
              <div className="text-sm text-purple-700">Current Streak</div>
            </CardContent>
          </Card>
          <Card>
            <CardContent className="p-4 text-center">
              <div className="text-2xl font-bold text-purple-600">
                {earnedAchievements.length}
              </div>
              <div className="text-sm text-purple-700">Achievements</div>
            </CardContent>
          </Card>
          <Card>
            <CardContent className="p-4 text-center">
              <div className="text-2xl font-bold text-indigo-600">
                {applications[0]?.gpa}
              </div>
              <div className="text-sm text-purple-700">GPA</div>
            </CardContent>
          </Card>
        </div>

        {/* Main Content Tabs */}
        <Tabs
          value={activeTab}
          onValueChange={setActiveTab}
          className="space-y-6"
        >
          <TabsList className="grid w-full grid-cols-4">
            <TabsTrigger value="overview">Overview</TabsTrigger>
            <TabsTrigger value="voting">Voting History</TabsTrigger>
            <TabsTrigger value="achievements">Achievements</TabsTrigger>
            <TabsTrigger value="activity">Activity</TabsTrigger>
          </TabsList>

          {/* Overview Tab */}
          <TabsContent value="overview" className="space-y-6">
            <div className="grid lg:grid-cols-3 gap-6">
              <div className="lg:col-span-2 space-y-6">
                {/* Student Information */}
                <Card>
                  <CardHeader>
                    <CardTitle className="flex items-center">
                      <BookOpen className="w-5 h-5 mr-2" />
                      Student Information
                    </CardTitle>
                  </CardHeader>
                  <CardContent className="space-y-4">
                    <div className="grid md:grid-cols-2 gap-4">
                      <div>
                        <h4 className="font-medium text-sm text-gray-600">
                          Department
                        </h4>
                        <p className="font-medium">
                          {applications[0]?.department}
                        </p>
                      </div>
                      <div>
                        <h4 className="font-medium text-sm text-gray-600">
                          Academic Year
                        </h4>
                        <p className="font-medium">
                          {applications[0]?.yearOfStudy}
                        </p>
                      </div>
                      <div>
                        <h4 className="font-medium text-sm text-gray-600">
                          Student ID
                        </h4>
                        <p className="font-medium">{studentId}</p>
                      </div>
                      <div>
                        <h4 className="font-medium text-sm text-gray-600">
                          GPA
                        </h4>
                        <p className="font-medium">{applications[0]?.gpa}</p>
                      </div>
                      <div>
                        <h4 className="font-medium text-sm text-gray-600">
                          Member Since
                        </h4>
                        <p className="font-medium">{joinedDate}</p>
                      </div>
                      <div>
                        <h4 className="font-medium text-sm text-gray-600">
                          First Vote
                        </h4>
                        <p className="font-medium">{votingStats.firstVote}</p>
                      </div>
                    </div>
                  </CardContent>
                </Card>

                {/* Voting Statistics */}
                <Card>
                  <CardHeader>
                    <CardTitle className="flex items-center">
                      <BarChart3 className="w-5 h-5 mr-2" />
                      Voting Statistics
                    </CardTitle>
                  </CardHeader>
                  <CardContent className="space-y-6">
                    <div className="space-y-4">
                      <div>
                        <div className="flex justify-between items-center mb-2">
                          <span className="text-sm font-medium">
                            Participation Rate
                          </span>
                          <span className="text-sm text-gray-600">
                            {votingStats.participated}/
                            {votingStats.totalElections} elections
                          </span>
                        </div>
                        <Progress
                          value={votingStats.participationRate}
                          className="h-2"
                        />
                      </div>

                      <div className="grid grid-cols-2 gap-4">
                        <div className="text-center p-4 bg-blue-50 rounded-lg">
                          <div className="text-2xl font-bold text-blue-600">
                            {votingStats.streak}
                          </div>
                          <div className="text-sm text-gray-600">
                            Current Streak
                          </div>
                        </div>
                        <div className="text-center p-4 bg-green-50 rounded-lg">
                          <div className="text-2xl font-bold text-green-600">
                            {votingStats.longestStreak}
                          </div>
                          <div className="text-sm text-gray-600">
                            Longest Streak
                          </div>
                        </div>
                      </div>
                    </div>
                  </CardContent>
                </Card>
              </div>

              <div className="space-y-6">
                {/* Contact Information */}
                <Card>
                  <CardHeader>
                    <CardTitle className="flex items-center">
                      <Mail className="w-5 h-5 mr-2" />
                      Contact Information
                    </CardTitle>
                  </CardHeader>
                  <CardContent className="space-y-4">
                    <div className="flex items-center space-x-3">
                      <Mail className="w-4 h-4 text-gray-400" />
                      <div>
                        <p className="font-medium text-sm">{email}</p>
                        <p className="text-xs text-gray-600">
                          University Email
                        </p>
                      </div>
                    </div>
                    <div className="flex items-center space-x-3">
                      <Phone className="w-4 h-4 text-gray-400" />
                      <div>
                        <p className="font-medium text-sm">{phoneNumber}</p>
                        <p className="text-xs text-gray-600">Mobile Phone</p>
                      </div>
                    </div>
                  </CardContent>
                </Card>

                {/* Recent Achievements */}
                <Card>
                  <CardHeader>
                    <CardTitle className="flex items-center">
                      <Award className="w-5 h-5 mr-2" />
                      Recent Achievements
                    </CardTitle>
                  </CardHeader>
                  <CardContent className="space-y-3">
                    {earnedAchievements.slice(0, 3).map((achievement) => (
                      <div
                        key={achievement.id}
                        className="flex items-center space-x-3"
                      >
                        <div className={`p-2 rounded-lg ${achievement.color}`}>
                          <achievement.icon className="w-4 h-4" />
                        </div>
                        <div className="flex-1">
                          <p className="font-medium text-sm">
                            {achievement.title}
                          </p>
                          <p className="text-xs text-gray-600">
                            {achievement.date}
                          </p>
                        </div>
                      </div>
                    ))}
                    <Button variant="outline" size="sm" className="w-full">
                      View All Achievements
                    </Button>
                  </CardContent>
                </Card>
              </div>
            </div>
          </TabsContent>

          {/* Voting History Tab */}
          <TabsContent value="voting" className="space-y-6">
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center">
                  <Vote className="w-5 h-5 mr-2" />
                  Election Participation History
                </CardTitle>
                <CardDescription>
                  Your participation in student government elections
                </CardDescription>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  {participationHistory.map((election, index) => (
                    <div
                      key={index}
                      className="flex items-center justify-between p-4 border rounded-lg"
                    >
                      <div className="flex items-center space-x-4">
                        <div
                          className={`p-2 rounded-full ${
                            election.status === "voted"
                              ? "bg-green-100"
                              : "bg-gray-100"
                          }`}
                        >
                          {election.status === "voted" ? (
                            <CheckCircle className="w-4 h-4 text-green-600" />
                          ) : (
                            <Clock className="w-4 h-4 text-gray-400" />
                          )}
                        </div>
                        <div>
                          <h4 className="font-medium">{election.election}</h4>
                          <p className="text-sm text-gray-600">
                            {election.position}
                          </p>
                        </div>
                      </div>
                      <div className="text-right">
                        <p className="text-sm font-medium">{election.date}</p>
                        <Badge
                          variant={
                            election.status === "voted"
                              ? "secondary"
                              : "outline"
                          }
                          className={
                            election.status === "voted"
                              ? "bg-green-100 text-green-700"
                              : "text-gray-600"
                          }
                        >
                          {election.status === "voted"
                            ? "Participated"
                            : "Missed"}
                        </Badge>
                      </div>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>
          </TabsContent>

          {/* Achievements Tab */}
          <TabsContent value="achievements" className="space-y-6">
            <div className="grid md:grid-cols-2 gap-6">
              {/* Earned Achievements */}
              <Card>
                <CardHeader>
                  <CardTitle className="flex items-center">
                    <Trophy className="w-5 h-5 mr-2 text-yellow-600" />
                    Earned Achievements ({earnedAchievements.length})
                  </CardTitle>
                </CardHeader>
                <CardContent className="space-y-4">
                  {earnedAchievements.map((achievement) => (
                    <div
                      key={achievement.id}
                      className="flex items-start space-x-4 p-4 bg-gray-50 rounded-lg"
                    >
                      <div className={`p-3 rounded-lg ${achievement.color}`}>
                        <achievement.icon className="w-5 h-5" />
                      </div>
                      <div className="flex-1">
                        <h4 className="font-semibold">{achievement.title}</h4>
                        <p className="text-sm text-gray-600 mb-2">
                          {achievement.description}
                        </p>
                        <div className="flex items-center space-x-2">
                          <Badge
                            variant="secondary"
                            className="bg-green-100 text-green-700"
                          >
                            <CheckCircle className="w-3 h-3 mr-1" />
                            Earned
                          </Badge>
                          <span className="text-xs text-gray-500">
                            {achievement.date}
                          </span>
                        </div>
                      </div>
                    </div>
                  ))}
                </CardContent>
              </Card>

              {/* Upcoming Achievements */}
              <Card>
                <CardHeader>
                  <CardTitle className="flex items-center">
                    <Target className="w-5 h-5 mr-2 text-blue-600" />
                    Upcoming Achievements ({upcomingAchievements.length})
                  </CardTitle>
                </CardHeader>
                <CardContent className="space-y-4">
                  {upcomingAchievements.map((achievement) => (
                    <div
                      key={achievement.id}
                      className="flex items-start space-x-4 p-4 border-2 border-dashed border-gray-200 rounded-lg"
                    >
                      <div
                        className={`p-3 rounded-lg ${achievement.color} opacity-50`}
                      >
                        <achievement.icon className="w-5 h-5" />
                      </div>
                      <div className="flex-1">
                        <h4 className="font-semibold text-gray-700">
                          {achievement.title}
                        </h4>
                        <p className="text-sm text-gray-600 mb-2">
                          {achievement.description}
                        </p>
                        <Badge variant="outline" className="text-gray-500">
                          <Clock className="w-3 h-3 mr-1" />
                          Not Earned
                        </Badge>
                      </div>
                    </div>
                  ))}
                </CardContent>
              </Card>
            </div>
          </TabsContent>

          {/* Activity Tab */}
          <TabsContent value="activity" className="space-y-6">
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center">
                  <Activity className="w-5 h-5 mr-2" />
                  Recent Activity
                </CardTitle>
                <CardDescription>
                  Your recent actions and milestones on SmartVote
                </CardDescription>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  {recentActivity.map((activity) => (
                    <div
                      key={activity.id}
                      className="flex items-start space-x-4 p-4 hover:bg-gray-50 rounded-lg transition-colors"
                    >
                      <div className={`p-2 rounded-full bg-gray-100`}>
                        <activity.icon
                          className={`w-4 h-4 ${activity.color}`}
                        />
                      </div>
                      <div className="flex-1">
                        <p className="font-medium">{activity.title}</p>
                        <p className="text-sm text-gray-600">{activity.date}</p>
                      </div>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>
          </TabsContent>
        </Tabs>

        {/* Action Buttons */}
        <div className="flex flex-col sm:flex-row gap-4 justify-center mt-8">
          <Button variant="outline">
            <Download className="w-4 h-4 mr-2" />
            Export Profile Data
          </Button>
          <Button>
            <Edit className="w-4 h-4 mr-2" />
            Edit Profile
          </Button>
        </div>
      </div>
    </div>
  );
};

export default Profile;
