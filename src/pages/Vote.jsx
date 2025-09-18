import { useState, useEffect } from "react";
import { useParams, useNavigate } from "react-router-dom";
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
import { Separator } from "@/components/ui/separator";
import { Alert, AlertDescription } from "@/components/ui/alert";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import {
  Vote as VoteIcon,
  Shield,
  Clock,
  Users,
  CheckCircle,
  AlertTriangle,
  ArrowLeft,
  ArrowRight,
  Lock,
  Copy,
  Download,
  Home,
  User,
  DollarSign,
  FileText,
  Megaphone,
  Trophy,
  BookOpen,
  Calendar,
  Heart,
} from "lucide-react";
import {
  useGetElectionDetailsQuery,
  useGetElectionPositionsQuery,
} from "@/api/electionApi";

const Vote = () => {
  const [currentStep, setCurrentStep] = useState(1);
  const [selectedCandidates, setSelectedCandidates] = useState({});
  const [showConfirmDialog, setShowConfirmDialog] = useState(false);
  const [isVoting, setIsVoting] = useState(false);
  const [voteComplete, setVoteComplete] = useState(false);
  const [activePosition, setActivePosition] = useState("");

  const { electionId } = useParams();
  const navigate = useNavigate();

  // Fetch election details and positions
  const {
    data: election = [],
    isLoading: electionLoading,
    error: electionError,
  } = useGetElectionDetailsQuery(electionId);

  console.log(election);

  const {
    data: positions = [],
    isLoading: positionsLoading,
    error: positionsError,
  } = useGetElectionPositionsQuery(electionId, {
    skip: !electionId,
  });

  // Set first position as active when positions load
  useEffect(() => {
    if (positions.length > 0 && !activePosition) {
      setActivePosition(positions[0].id);
    }
  }, [positions, activePosition]);

  // Handle loading and error states
  if (electionLoading || positionsLoading) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="text-center">
          <div className="animate-spin rounded-full h-16 w-16 border-b-2 border-blue-600 mx-auto mb-4"></div>
          <p className="text-gray-600">Loading election details...</p>
        </div>
      </div>
    );
  }

  if (electionError || positionsError || !election) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <Card className="max-w-md">
          <CardContent className="p-6 text-center">
            <AlertTriangle className="w-12 h-12 text-red-500 mx-auto mb-4" />
            <h3 className="text-lg font-medium text-gray-900 mb-2">
              Election Not Found
            </h3>
            <p className="text-gray-600 mb-4">
              The election you're looking for doesn't exist or is no longer
              available.
            </p>
            <Button onClick={() => navigate("/dashboard")}>
              Return to Dashboard
            </Button>
          </CardContent>
        </Card>
      </div>
    );
  }

  const candidates = {
    president: [
      {
        id: 1,
        name: "Alice Johnson",
        position: "Final Year Computer Science",
        manifesto:
          "Focused on improving campus facilities, enhancing student-faculty communication, and organizing more tech workshops.",
        image: "/placeholder.svg?height=150&width=150",
        experience: "Former Class Representative, Tech Club President",
        achievements: [
          "Led 5 successful campus events",
          "Increased tech club membership by 200%",
        ],
      },
      {
        id: 2,
        name: "Bob Smith",
        position: "Final Year Business Administration",
        manifesto:
          "Committed to creating better networking opportunities and improving campus dining options.",
        image: "/placeholder.svg?height=150&width=150",
        experience: "Student Union Secretary, Business Club Vice President",
        achievements: [
          "Organized 3 career fairs",
          "Launched student mentorship program",
        ],
      },
    ],
    "vice-president": [
      {
        id: 3,
        name: "Charlie Brown",
        position: "Third Year Engineering",
        manifesto:
          "Dedicated to enhancing laboratory facilities and promoting sustainability initiatives.",
        image: "/placeholder.svg?height=150&width=150",
        experience:
          "Engineering Society President, Green Campus Initiative Leader",
        achievements: [
          "Reduced campus waste by 30%",
          "Led solar panel installation project",
        ],
      },
      {
        id: 4,
        name: "Diana Prince",
        position: "Final Year Psychology",
        manifesto:
          "Focused on student mental health support and creating inclusive campus environment.",
        image: "/placeholder.svg?height=150&width=150",
        experience: "Peer Counselor, Diversity Club President",
        achievements: [
          "Established mental health support group",
          "Organized diversity awareness week",
        ],
      },
    ],
    secretary: [
      {
        id: 5,
        name: "Edward Wilson",
        position: "Third Year Literature",
        manifesto:
          "Committed to transparent communication and efficient record-keeping systems.",
        image: "/placeholder.svg?height=150&width=150",
        experience: "Debate Club Secretary, Student Newsletter Editor",
        achievements: [
          "Digitized student records system",
          "Improved meeting documentation",
        ],
      },
      {
        id: 6,
        name: "Fiona Davis",
        position: "Final Year Communications",
        manifesto:
          "Focused on streamlining student government processes and improving transparency.",
        image: "/placeholder.svg?height=150&width=150",
        experience: "Communications Committee Head, Campus Radio Host",
        achievements: [
          "Launched student feedback portal",
          "Increased meeting attendance by 40%",
        ],
      },
    ],
    treasurer: [
      {
        id: 7,
        name: "George Miller",
        position: "Final Year Accounting",
        manifesto:
          "Dedicated to responsible budget management and funding student initiatives.",
        image: "/placeholder.svg?height=150&width=150",
        experience: "Finance Club President, Budget Committee Member",
        achievements: [
          "Secured $50K additional funding",
          "Implemented transparent budget tracking",
        ],
      },
      {
        id: 8,
        name: "Hannah Lee",
        position: "Third Year Economics",
        manifesto:
          "Focused on maximizing student resources and creating emergency fund programs.",
        image: "/placeholder.svg?height=150&width=150",
        experience: "Economics Society Treasurer, Financial Literacy Tutor",
        achievements: [
          "Created student emergency fund",
          "Organized financial literacy workshops",
        ],
      },
    ],
    "public-relations": [
      {
        id: 9,
        name: "Ian Rodriguez",
        position: "Final Year Marketing",
        manifesto:
          "Committed to improving student government visibility and engagement.",
        image: "/placeholder.svg?height=150&width=150",
        experience: "Marketing Club President, Social Media Manager",
        achievements: [
          "Increased social media engagement by 300%",
          "Launched campus ambassador program",
        ],
      },
      {
        id: 10,
        name: "Julia Kim",
        position: "Third Year Journalism",
        manifesto:
          "Focused on transparent communication and student voice amplification.",
        image: "/placeholder.svg?height=150&width=150",
        experience: "Campus Newspaper Editor, PR Committee Member",
        achievements: [
          "Launched weekly student newsletter",
          "Organized town hall meetings",
        ],
      },
    ],
    "sports-director": [
      {
        id: 11,
        name: "Kevin Thompson",
        position: "Final Year Sports Science",
        manifesto:
          "Dedicated to promoting fitness culture and organizing competitive sports events.",
        image: "/placeholder.svg?height=150&width=150",
        experience: "Basketball Team Captain, Sports Committee Head",
        achievements: [
          "Organized inter-university tournament",
          "Established fitness mentorship program",
        ],
      },
      {
        id: 12,
        name: "Lisa Chen",
        position: "Third Year Physical Education",
        manifesto:
          "Focused on inclusive sports programs and wellness initiatives for all students.",
        image: "/placeholder.svg?height=150&width=150",
        experience: "Volleyball Team Captain, Wellness Club President",
        achievements: [
          "Created adaptive sports program",
          "Launched campus wellness week",
        ],
      },
    ],
    "academic-affairs": [
      {
        id: 13,
        name: "Michael Johnson",
        position: "Final Year Education",
        manifesto:
          "Committed to improving academic support services and student-faculty relations.",
        image: "/placeholder.svg?height=150&width=150",
        experience: "Tutoring Center Coordinator, Academic Committee Member",
        achievements: [
          "Expanded tutoring services",
          "Established faculty-student liaison program",
        ],
      },
      {
        id: 14,
        name: "Nina Patel",
        position: "Third Year Pre-Med",
        manifesto:
          "Focused on academic resource accessibility and study space improvements.",
        image: "/placeholder.svg?height=150&width=150",
        experience:
          "Study Group Coordinator, Academic Excellence Society President",
        achievements: [
          "Created 24/7 study spaces",
          "Launched peer mentoring program",
        ],
      },
    ],
    "social-events": [
      {
        id: 15,
        name: "Oliver Garcia",
        position: "Final Year Event Management",
        manifesto:
          "Dedicated to creating memorable campus experiences and fostering community spirit.",
        image: "/placeholder.svg?height=150&width=150",
        experience: "Event Planning Committee Chair, Cultural Club President",
        achievements: [
          "Organized 15+ successful events",
          "Increased event attendance by 60%",
        ],
      },
      {
        id: 16,
        name: "Priya Sharma",
        position: "Third Year Arts",
        manifesto:
          "Focused on diverse cultural events and inclusive celebration of student creativity.",
        image: "/placeholder.svg?height=150&width=150",
        experience:
          "Arts Festival Coordinator, Cultural Diversity Committee Member",
        achievements: [
          "Launched multicultural festival",
          "Established student art gallery",
        ],
      },
    ],
  };

  const steps = [
    {
      number: 1,
      title: "Select Candidates",
      description: "Choose candidates for each position",
    },
    {
      number: 2,
      title: "Review Choices",
      description: "Confirm all your selections",
    },
    { number: 3, title: "Cast Votes", description: "Submit your secure votes" },
    { number: 4, title: "Confirmation", description: "Receive vote receipts" },
  ];

  const handleCandidateSelect = (positionId, candidate) => {
    setSelectedCandidates((prev) => ({
      ...prev,
      [positionId]: candidate,
    }));
  };

  const getSelectedCount = () => {
    return Object.keys(selectedCandidates).length;
  };

  const getCompletionPercentage = () => {
    return Math.round((getSelectedCount() / positions.length) * 100);
  };

  const handleNextStep = () => {
    if (currentStep === 1 && getSelectedCount() > 0) {
      setCurrentStep(2);
    } else if (currentStep === 2) {
      setShowConfirmDialog(true);
    }
  };

  const handleConfirmVote = async () => {
    setShowConfirmDialog(false);
    setIsVoting(true);
    setCurrentStep(3);

    // Simulate voting process
    setTimeout(() => {
      setIsVoting(false);
      setVoteComplete(true);
      setCurrentStep(4);
    }, 4000);
  };

  const handleBackStep = () => {
    if (currentStep > 1) {
      setCurrentStep(currentStep - 1);
    }
  };

  const voteReceipt = {
    transactionId:
      "0x7f9a8b2c3d4e5f6a7b8c9d0e1f2a3b4c5d6e7f8a9b0c1d2e3f4a5b6c7d8e9f0a1b",
    timestamp: new Date().toLocaleString(),
    blockNumber: "15,847,392",
    gasUsed: "21,000",
  };

  return (
    <div className="min-h-screen ">
      <div className="flex items-center space-x-4">
        <Badge variant="secondary" className="bg-green-100 text-green-700">
          <Shield className="w-3 h-3 mr-1" />
          Secure Voting
        </Badge>
        {currentStep === 1 && (
          <Badge variant="outline">
            {getSelectedCount()}/{positions.length} positions selected
          </Badge>
        )}
      </div>
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {/* Election Info */}
        <Card className="mb-8 overflow-hidden">
          <CardHeader className="bg-gradient-to-r from-blue-600 to-purple-600 text-white">
            <div className="flex items-center justify-between">
              <div>
                <CardTitle className="text-2xl">{election.title}</CardTitle>
                <CardDescription className="text-blue-100 mt-2">
                  {election.description}
                </CardDescription>
              </div>
              <Badge variant="secondary" className="bg-white/20 text-white">
                <Clock className="w-3 h-3 mr-1" />
                {election.timeLeft} left
              </Badge>
            </div>
          </CardHeader>
          <CardContent className="p-6">
            <div className="grid md:grid-cols-4 gap-6">
              <div className="flex items-center space-x-3">
                <div className="p-2 bg-blue-100 rounded-lg">
                  <Users className="w-5 h-5 text-blue-600" />
                </div>
                <div>
                  <p className="text-sm text-gray-600">Total Registered</p>
                  <p className="font-semibold">
                    {/* {election.totalVoters.toLocaleString()} voters */}
                  </p>
                </div>
              </div>
              <div className="flex items-center space-x-3">
                <div className="p-2 bg-green-100 rounded-lg">
                  <CheckCircle className="w-5 h-5 text-green-600" />
                </div>
                <div>
                  <p className="text-sm text-gray-600">Votes Cast</p>
                  <p className="font-semibold">
                    {/* {election.votedCount.toLocaleString()} votes */}
                  </p>
                </div>
              </div>
              <div className="flex items-center space-x-3">
                <div className="p-2 bg-purple-100 rounded-lg">
                  <VoteIcon className="w-5 h-5 text-purple-600" />
                </div>
                <div>
                  <p className="text-sm text-gray-600">Positions</p>
                  <p className="font-semibold">{positions.length} roles</p>
                </div>
              </div>
              <div className="flex items-center space-x-3">
                <div className="p-2 bg-yellow-100 rounded-lg">
                  <Clock className="w-5 h-5 text-yellow-600" />
                </div>
                <div>
                  <p className="text-sm text-gray-600">Deadline</p>
                  <p className="font-semibold">Dec 25, 11:59 PM</p>
                </div>
              </div>
            </div>
            {currentStep === 1 && (
              <div className="mt-6">
                <div className="flex justify-between items-center mb-2">
                  <span className="text-sm text-gray-600">
                    Selection Progress
                  </span>
                  <span className="text-sm font-medium">
                    {getCompletionPercentage()}% complete
                  </span>
                </div>
                <Progress value={getCompletionPercentage()} className="h-2" />
              </div>
            )}
          </CardContent>
        </Card>

        {/* Progress Steps */}
        <div className="mb-8">
          <div className="flex items-center justify-between">
            {steps.map((step, index) => (
              <div key={step.number} className="flex items-center">
                <div className="flex flex-col items-center">
                  <div
                    className={`w-10 h-10 rounded-full flex items-center justify-center font-semibold ${
                      currentStep >= step.number
                        ? "bg-blue-600 text-white"
                        : "bg-gray-200 text-gray-600"
                    }`}
                  >
                    {currentStep > step.number ? (
                      <CheckCircle className="w-5 h-5" />
                    ) : (
                      step.number
                    )}
                  </div>
                  <div className="text-center mt-2">
                    <p className="text-sm font-medium">{step.title}</p>
                    <p className="text-xs text-gray-500">{step.description}</p>
                  </div>
                </div>
                {index < steps.length - 1 && (
                  <div
                    className={`flex-1 h-1 mx-4 ${
                      currentStep > step.number ? "bg-blue-600" : "bg-gray-200"
                    }`}
                  />
                )}
              </div>
            ))}
          </div>
        </div>

        {/* Step Content */}
        {currentStep === 1 && (
          <div className="space-y-6">
            <div className="text-center mb-8">
              <h2 className="text-2xl font-bold text-gray-900 mb-2">
                Select Your Candidates
              </h2>
              <p className="text-gray-600">
                Choose candidates for each position. You can vote for some or
                all positions - it's your choice!
              </p>
            </div>

            {/* Position Tabs */}
            <Tabs value={activePosition} onValueChange={setActivePosition}>
              <TabsList className="grid grid-cols-4 lg:grid-cols-8 w-full mb-8">
                {positions.map((position) => (
                  <TabsTrigger
                    key={position.id}
                    value={position.id}
                    className="text-xs"
                  >
                    <position.icon className="w-3 h-3 mr-1" />
                    <span className="hidden sm:inline">{position.title}</span>
                  </TabsTrigger>
                ))}
              </TabsList>

              {positions.map((position) => (
                <TabsContent key={position.id} value={position.id}>
                  <Card className="mb-6">
                    <CardHeader className={`${position.color} rounded-t-lg`}>
                      <div className="flex items-center space-x-3">
                        <position.icon className="w-6 h-6" />
                        <div>
                          <CardTitle className="text-xl">
                            {position.title}
                          </CardTitle>
                          <CardDescription className="opacity-80">
                            {position.description}
                          </CardDescription>
                        </div>
                        {selectedCandidates[position.id] && (
                          <Badge variant="secondary" className="bg-white/20">
                            <CheckCircle className="w-3 h-3 mr-1" />
                            Selected
                          </Badge>
                        )}
                      </div>
                    </CardHeader>
                  </Card>

                  <div className="grid md:grid-cols-2 gap-6">
                    {candidates[position.id]?.map((candidate) => (
                      <Card
                        key={candidate.id}
                        className={`cursor-pointer transition-all duration-300 hover:shadow-lg ${
                          selectedCandidates[position.id]?.id === candidate.id
                            ? "ring-2 ring-blue-500 shadow-lg bg-blue-50"
                            : "hover:shadow-md"
                        }`}
                        onClick={() =>
                          handleCandidateSelect(position.id, candidate)
                        }
                      >
                        <CardHeader className="text-center">
                          <Avatar className="w-20 h-20 mx-auto mb-4">
                            <AvatarImage
                              src={candidate.image || "/placeholder.svg"}
                              alt={candidate.name}
                            />
                            <AvatarFallback className="text-lg">
                              {candidate.name
                                .split(" ")
                                .map((n) => n[0])
                                .join("")}
                            </AvatarFallback>
                          </Avatar>
                          <CardTitle className="text-lg">
                            {candidate.name}
                          </CardTitle>
                          <CardDescription className="text-blue-600 font-medium">
                            {candidate.position}
                          </CardDescription>
                        </CardHeader>
                        <CardContent className="space-y-4">
                          <div>
                            <h4 className="font-semibold text-sm mb-2">
                              Experience
                            </h4>
                            <p className="text-sm text-gray-600">
                              {candidate.experience}
                            </p>
                          </div>

                          <div>
                            <h4 className="font-semibold text-sm mb-2">
                              Key Achievements
                            </h4>
                            <ul className="text-sm text-gray-600 space-y-1">
                              {candidate.achievements.map(
                                (achievement, index) => (
                                  <li key={index} className="flex items-start">
                                    <CheckCircle className="w-3 h-3 text-green-500 mr-2 mt-0.5 flex-shrink-0" />
                                    {achievement}
                                  </li>
                                )
                              )}
                            </ul>
                          </div>

                          <div>
                            <h4 className="font-semibold text-sm mb-2">
                              Manifesto
                            </h4>
                            <p className="text-sm text-gray-600">
                              {candidate.manifesto}
                            </p>
                          </div>

                          {selectedCandidates[position.id]?.id ===
                            candidate.id && (
                            <div className="flex items-center justify-center p-3 bg-blue-100 rounded-lg">
                              <CheckCircle className="w-5 h-5 text-blue-600 mr-2" />
                              <span className="text-blue-700 font-medium">
                                Selected for {position.title}
                              </span>
                            </div>
                          )}
                        </CardContent>
                      </Card>
                    ))}
                  </div>
                </TabsContent>
              ))}
            </Tabs>
          </div>
        )}

        {currentStep === 2 && (
          <div className="max-w-4xl mx-auto">
            <div className="text-center mb-8">
              <h2 className="text-2xl font-bold text-gray-900 mb-2">
                Review Your Choices
              </h2>
              <p className="text-gray-600">
                Please confirm your selections before casting your votes. You've
                selected candidates for {getSelectedCount()} out of{" "}
                {positions.length} positions.
              </p>
            </div>

            <Alert className="mb-6">
              <Shield className="h-4 w-4" />
              <AlertDescription>
                Your votes will be encrypted and recorded on the blockchain.
                Once submitted, they cannot be changed.
              </AlertDescription>
            </Alert>

            <div className="grid md:grid-cols-2 gap-6">
              {Object.entries(selectedCandidates).map(
                ([positionId, candidate]) => {
                  const position = positions.find((p) => p.id === positionId);
                  return (
                    <Card key={positionId} className="overflow-hidden">
                      <CardHeader className={`${position.color} rounded-t-lg`}>
                        <div className="flex items-center space-x-2">
                          <position.icon className="w-5 h-5" />
                          <CardTitle className="text-lg">
                            {position.title}
                          </CardTitle>
                        </div>
                      </CardHeader>
                      <CardContent className="p-4">
                        <div className="flex items-center space-x-4">
                          <Avatar className="w-16 h-16">
                            <AvatarImage
                              src={candidate.image || "/placeholder.svg"}
                              alt={candidate.name}
                            />
                            <AvatarFallback>
                              {candidate.name
                                .split(" ")
                                .map((n) => n[0])
                                .join("")}
                            </AvatarFallback>
                          </Avatar>
                          <div className="flex-1">
                            <h4 className="font-semibold">{candidate.name}</h4>
                            <p className="text-sm text-gray-600">
                              {candidate.position}
                            </p>
                            <p className="text-xs text-gray-500 mt-1">
                              {candidate.experience}
                            </p>
                          </div>
                          <CheckCircle className="w-6 h-6 text-green-500" />
                        </div>
                      </CardContent>
                    </Card>
                  );
                }
              )}
            </div>

            {getSelectedCount() < positions.length && (
              <Card className="mt-6 border-dashed border-2 border-gray-300">
                <CardContent className="p-6 text-center">
                  <Heart className="w-8 h-8 text-gray-400 mx-auto mb-2" />
                  <p className="text-gray-600">
                    You haven't selected candidates for{" "}
                    {positions.length - getSelectedCount()} positions. You can
                    still proceed to vote for your selected candidates, or go
                    back to make more selections.
                  </p>
                </CardContent>
              </Card>
            )}
          </div>
        )}

        {currentStep === 3 && (
          <div className="max-w-2xl mx-auto text-center">
            <div className="mb-8">
              <h2 className="text-2xl font-bold text-gray-900 mb-2">
                Casting Your Votes
              </h2>
              <p className="text-gray-600">
                Please wait while we securely process your {getSelectedCount()}{" "}
                vote(s) on the blockchain.
              </p>
            </div>

            <Card className="p-8">
              <div className="space-y-6">
                <div className="w-16 h-16 mx-auto">
                  {isVoting ? (
                    <div className="animate-spin rounded-full h-16 w-16 border-b-2 border-blue-600"></div>
                  ) : (
                    <CheckCircle className="w-16 h-16 text-green-500" />
                  )}
                </div>

                <div className="space-y-2">
                  <div className="flex items-center justify-center space-x-2">
                    <Lock className="w-4 h-4 text-green-500" />
                    <span className="text-sm text-green-600">
                      {getSelectedCount()} vote(s) encrypted and secured
                    </span>
                  </div>
                  <div className="flex items-center justify-center space-x-2">
                    <Shield className="w-4 h-4 text-green-500" />
                    <span className="text-sm text-green-600">
                      Blockchain verification complete
                    </span>
                  </div>
                  {!isVoting && (
                    <div className="flex items-center justify-center space-x-2">
                      <CheckCircle className="w-4 h-4 text-green-500" />
                      <span className="text-sm text-green-600">
                        All votes successfully recorded
                      </span>
                    </div>
                  )}
                </div>

                {isVoting && (
                  <p className="text-gray-600">
                    Processing your secure votes...
                  </p>
                )}
              </div>
            </Card>
          </div>
        )}

        {currentStep === 4 && voteComplete && (
          <div className="max-w-4xl mx-auto text-center">
            <div className="mb-8">
              <CheckCircle className="w-20 h-20 text-green-500 mx-auto mb-4" />
              <h2 className="text-3xl font-bold text-gray-900 mb-2">
                Votes Cast Successfully!
              </h2>
              <p className="text-gray-600">
                Your {getSelectedCount()} vote(s) have been securely recorded on
                the blockchain.
              </p>
            </div>

            <Card className="mb-6">
              <CardHeader>
                <CardTitle className="flex items-center justify-center">
                  <Shield className="w-5 h-5 mr-2" />
                  Vote Receipt
                </CardTitle>
              </CardHeader>
              <CardContent className="space-y-6">
                <div className="grid grid-cols-2 gap-4 text-sm">
                  <div>
                    <p className="text-gray-600">Election</p>
                    <p className="font-medium">{election.title}</p>
                  </div>
                  <div>
                    <p className="text-gray-600">Positions Voted</p>
                    <p className="font-medium">
                      {getSelectedCount()} out of {positions.length}
                    </p>
                  </div>
                  <div>
                    <p className="text-gray-600">Timestamp</p>
                    <p className="font-medium">{voteReceipt.timestamp}</p>
                  </div>
                  <div>
                    <p className="text-gray-600">Block Number</p>
                    <p className="font-medium">{voteReceipt.blockNumber}</p>
                  </div>
                </div>

                <Separator />

                <div>
                  <h4 className="font-semibold mb-4">
                    Your Selected Candidates
                  </h4>
                  <div className="grid md:grid-cols-2 gap-4">
                    {Object.entries(selectedCandidates).map(
                      ([positionId, candidate]) => {
                        const position = positions.find(
                          (p) => p.id === positionId
                        );
                        return (
                          <div
                            key={positionId}
                            className="flex items-center space-x-3 p-3 bg-gray-50 rounded-lg"
                          >
                            <div className={`p-2 rounded-lg ${position.color}`}>
                              <position.icon className="w-4 h-4" />
                            </div>
                            <div className="text-left">
                              <p className="font-medium text-sm">
                                {position.title}
                              </p>
                              <p className="text-xs text-gray-600">
                                {candidate.name}
                              </p>
                            </div>
                          </div>
                        );
                      }
                    )}
                  </div>
                </div>

                <Separator />

                <div>
                  <p className="text-gray-600 text-sm mb-2">Transaction Hash</p>
                  <div className="flex items-center space-x-2 p-2 bg-gray-100 rounded">
                    <code className="text-xs font-mono flex-1 truncate">
                      {voteReceipt.transactionId}
                    </code>
                    <Button variant="ghost" size="sm">
                      <Copy className="w-4 h-4" />
                    </Button>
                  </div>
                </div>
              </CardContent>
            </Card>

            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Button variant="outline">
                <Download className="w-4 h-4 mr-2" />
                Download Receipt
              </Button>
              <Button onClick={() => (window.location.href = "/dashboard")}>
                <Home className="w-4 h-4 mr-2" />
                Return to Dashboard
              </Button>
            </div>
          </div>
        )}

        {/* Navigation Buttons */}
        {currentStep < 4 && (
          <div className="flex justify-between items-center mt-8">
            <Button
              variant="outline"
              onClick={handleBackStep}
              disabled={currentStep === 1}
            >
              <ArrowLeft className="w-4 h-4 mr-2" />
              Back
            </Button>

            <Button
              onClick={handleNextStep}
              disabled={currentStep === 1 && getSelectedCount() === 0}
              className="bg-gradient-to-r from-blue-600 to-purple-600 hover:from-blue-700 hover:to-purple-700"
            >
              {currentStep === 2
                ? `Cast ${getSelectedCount()} Vote(s)`
                : "Continue"}
              <ArrowRight className="w-4 h-4 ml-2" />
            </Button>
          </div>
        )}
      </div>

      {/* Confirmation Dialog */}
      <Dialog open={showConfirmDialog} onOpenChange={setShowConfirmDialog}>
        <DialogContent className="max-w-2xl">
          <DialogHeader>
            <DialogTitle className="flex items-center">
              <AlertTriangle className="w-5 h-5 text-yellow-500 mr-2" />
              Confirm Your Votes
            </DialogTitle>
            <DialogDescription>
              Are you sure you want to cast votes for {getSelectedCount()}{" "}
              position(s)? This action cannot be undone once submitted to the
              blockchain.
            </DialogDescription>
          </DialogHeader>
          <div className="py-4">
            <div className="space-y-2">
              {Object.entries(selectedCandidates).map(
                ([positionId, candidate]) => {
                  const position = positions.find((p) => p.id === positionId);
                  return (
                    <div
                      key={positionId}
                      className="flex items-center justify-between p-2 bg-gray-50 rounded"
                    >
                      <span className="font-medium">{position.title}</span>
                      <span className="text-blue-600">{candidate.name}</span>
                    </div>
                  );
                }
              )}
            </div>
          </div>
          <DialogFooter>
            <Button
              variant="outline"
              onClick={() => setShowConfirmDialog(false)}
            >
              Cancel
            </Button>
            <Button
              onClick={handleConfirmVote}
              className="bg-gradient-to-r from-blue-600 to-purple-600"
            >
              Yes, Cast My Votes
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>
    </div>
  );
};

export default Vote;
