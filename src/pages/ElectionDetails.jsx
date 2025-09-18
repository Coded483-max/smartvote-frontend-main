import React, { useState, useEffect, useCallback } from "react";
import { useParams, useNavigate } from "react-router-dom";
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

import { useCastVoteMutation } from "@/api/votingApi";

import Loader from "@/UI/Loader";
import CandidateCards from "@/UI/CandidateCard";
import { toast, ToastContainer } from "react-toastify";
import ToastTest from "@/UI/ToastTest";

// Icon mapping for positions
const iconMap = {
  president: User,
  secretary: FileText,
  treasurer: DollarSign,
  "public relations officer": Megaphone,
  "sports and recreation director": Trophy,
  "academic affairs": BookOpen,
  "financial secretary": DollarSign,
  "secretary general": FileText,
  "student body president": User,
  "student body vice president": User,
  // Add more mappings as needed
};

const ElectionDetails = () => {
  const [currentStep, setCurrentStep] = useState(1);
  const [selectedCandidates, setSelectedCandidates] = useState({});
  const [showConfirmDialog, setShowConfirmDialog] = useState(false);
  // const [isVoting, setIsVoting] = useState(false);
  const [voteComplete, setVoteComplete] = useState(false);
  const [activePosition, setActivePosition] = useState("");
  const [receipt, setReceipt] = useState(null);

  const [castVote, { isLoading: isVoting }] = useCastVoteMutation();

  const { voter, candidate } = useSelector((state) => state.auth);
  const userId = voter?._id || candidate?._id;

  const ImageWithFallback = React.memo(
    ({ src, alt, className, fallback = "/default-avatar.png" }) => {
      const [imgSrc, setImgSrc] = useState(src);
      const [isLoading, setIsLoading] = useState(true);
      const [hasError, setHasError] = useState(false);

      const handleError = useCallback(() => {
        console.error("Image load error:", src);
        setHasError(true);
        setImgSrc(fallback);
        setIsLoading(false);
      }, [src, fallback]);

      const handleLoad = useCallback(() => {
        setIsLoading(false);
        setHasError(false);
      }, []);

      // ✅ Only update when src actually changes
      useEffect(() => {
        if (src !== imgSrc) {
          setImgSrc(src);
          setIsLoading(true);
          setHasError(false);
        }
      }, [src, imgSrc]);

      return (
        <div className={`image-container ${className}`}>
          {isLoading && (
            <div className="image-placeholder">
              <div className="loading-spinner">
                <Loader />
              </div>
            </div>
          )}
          <img
            src={imgSrc}
            alt={alt}
            className={`${className} ${isLoading ? "hidden" : ""}`}
            onError={handleError}
            onLoad={handleLoad}
            crossOrigin="anonymous" // ✅ Important for CORS
          />
          {hasError && <div className="image-error">Failed to load image</div>}
        </div>
      );
    }
  );

  const { electionId } = useParams();
  const navigate = useNavigate();

  // Fetch election details and positions
  const {
    data: election = {},
    isLoading: electionLoading,
    error: electionError,
  } = useGetElectionDetailsQuery(electionId);

  // console.log(election.votes);

  const {
    data: positions = [],
    isLoading: positionsLoading,
    error: positionsError,
  } = useGetElectionPositionsQuery(electionId, {
    skip: !electionId,
  });

  // If positions is sometimes an object, extract the array
  const positionsArray = Array.isArray(positions)
    ? positions
    : positions?.positions || [];

  console.log(positionsArray);

  // Map icons to positions
  const mappedPositionsWithCandidates = positionsArray.map((pos) => ({
    ...pos,
    id: pos._id?.$oid || pos._id || pos.id,
    icon: iconMap[pos.name?.toLowerCase()] || User,
    color: pos.color || "bg-blue-100",
    currentCandidates: Array.isArray(pos.currentCandidates)
      ? pos.currentCandidates
      : [],
  }));

  console.log(mappedPositionsWithCandidates);

  // Set first position as active when positions load
  useEffect(() => {
    if (mappedPositionsWithCandidates.length > 0 && !activePosition) {
      setActivePosition(mappedPositionsWithCandidates[0].id);
    }
  }, [mappedPositionsWithCandidates, activePosition]);

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

  if (electionError || positionsError || !election || !election.title) {
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

  const getSelectedCount = () => Object.keys(selectedCandidates).length;

  const getCompletionPercentage = () => {
    return mappedPositionsWithCandidates.length === 0
      ? 0
      : Math.round(
          (getSelectedCount() / mappedPositionsWithCandidates.length) * 100
        );
  };

  const handleNextStep = () => {
    if (currentStep === 1 && getSelectedCount() > 0) {
      setCurrentStep(2);
    } else if (currentStep === 2) {
      setShowConfirmDialog(true);
    }
  };

  const hasVoted = Array.isArray(election.votes)
    ? election.votes.some((vote) => vote.voterId === userId)
    : false;

  if (hasVoted) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <Card className="max-w-md">
          <CardContent className="p-6 text-center">
            <CheckCircle className="w-12 h-12 text-green-500 mx-auto mb-4" />
            <h3 className="text-lg font-medium text-gray-900 mb-2">
              You have already voted in this election.
            </h3>
            <p className="text-gray-600 mb-4">
              Thank you for participating! You cannot vote again.
            </p>
            <Button onClick={() => navigate(-1)}>Go Back</Button>
          </CardContent>
        </Card>
      </div>
    );
  }

  const handleConfirmVote = async () => {
    setShowConfirmDialog(false);

    setCurrentStep(3);
    const votesArray = Object.entries(selectedCandidates).map(
      ([positionId, candidate]) => ({
        positionId,
        candidateIds: [candidate.id],
      })
    );

    try {
      const response = await castVote({
        electionId: election._id,
        // voterId: userId,
        votes: votesArray,
      }).unwrap();

      const receipt = response.data.voteReceipt;

      console.log(receipt, "Vote receipt");
      console.log(response, "Response votes");

      // Show receipt to user (e.g., in a modal or on a results page)
      setReceipt(receipt); // useState for receipt
      setVoteComplete(true);
      setCurrentStep(4);

      toast.success("Vote cast successfully!");
      // navigate(-1);
    } catch (error) {
      toast.error(error?.data?.message || "Failed to cast vote");
    }
  };

  if (!receipt && currentStep === 4) {
    return (
      <div className="flex flex-col items-center justify-center">
        <p className="text-sm text-gray-600">Your vote is being processed...</p>
      </div>
    );
  }

  const handleBackStep = () => {
    if (currentStep > 1) {
      setCurrentStep(currentStep - 1);
    }
  };

  // const voteReceipt = {
  //   transactionId:
  //     "0x7f9a8b2c3d4e5f6a7b8c9d0e1f2a3b4c5d6e7f8a9b0c1d2e3f4a5b6c7d8e9f0a1b",
  //   timestamp: new Date().toLocaleString(),
  //   blockNumber: "15,847,392",
  //   gasUsed: "21,000",
  // };

  return (
    <div className="min-h-screen m-10">
      <ToastTest />
      <div className="flex items-center space-x-4">
        <Badge variant="secondary" className="bg-green-100 text-green-700">
          <Shield className="w-3 h-3 mr-1" />
          Secure Voting
        </Badge>
        {currentStep === 1 && (
          <Badge variant="outline">
            {getSelectedCount()}/{mappedPositionsWithCandidates.length}{" "}
            positions selected
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
                {election.timeLeft || "Time left"}
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
                    {Array.isArray(election.allowedVoters)
                      ? election.allowedVoters.length
                      : 0}{" "}
                    voters
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
                    {Array.isArray(election.votes) ? election.votes.length : 0}
                    votes
                  </p>
                </div>
              </div>
              <div className="flex items-center space-x-3">
                <div className="p-2 bg-purple-100 rounded-lg">
                  <VoteIcon className="w-5 h-5 text-purple-600" />
                </div>
                <div>
                  <p className="text-sm text-gray-600">Positions</p>
                  <p className="font-semibold">
                    {mappedPositionsWithCandidates.length} roles
                  </p>
                </div>
              </div>
              <div className="flex items-center space-x-3">
                <div className="p-2 bg-yellow-100 rounded-lg">
                  <Clock className="w-5 h-5 text-yellow-600" />
                </div>
                <div>
                  <p className="text-sm text-gray-600">Deadline</p>
                  <p className="font-semibold">
                    {election.endDate
                      ? new Date(election.endDate).toLocaleString()
                      : "Dec 25, 11:59 PM"}
                  </p>
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
              <TabsList className="flex flex-wrap justify-center mb-4">
                {mappedPositionsWithCandidates.map((position) => (
                  <TabsTrigger
                    key={position.id}
                    value={position.id}
                    className="text-xs"
                  >
                    <position.icon className="w-3 h-3 mr-1" />
                    <span className="hidden sm:inline">{position.name}</span>
                  </TabsTrigger>
                ))}
              </TabsList>

              {mappedPositionsWithCandidates.map((position) => (
                <TabsContent key={position.id} value={position.id}>
                  <Card className="mb-6">
                    <CardHeader className={`${position.color} rounded-t-lg`}>
                      <div className="flex items-center space-x-3">
                        <position.icon className="w-6 h-6" />
                        <div>
                          <CardTitle className="text-xl">
                            {position.name}
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

                  <div className="grid md:grid-cols-3 lg:grid-cols-3 gap-4">
                    {position.currentCandidates &&
                    position.currentCandidates.length > 0 ? (
                      position.currentCandidates.map((candidate) => (
                        <CandidateCards
                          key={candidate.id}
                          candidate={candidate}
                          position={position}
                          isSelected={
                            selectedCandidates[position.id]?._id ===
                            candidate._id
                          }
                          ImageWithFallback={ImageWithFallback}
                          onSelect={() =>
                            handleCandidateSelect(position.id, candidate)
                          }
                          className={`cursor-pointer ${
                            selectedCandidates[position.id]?._id ===
                            candidate._id
                              ? "border-1 border-blue-500 ring-1 shadow-lg bg-blue-50"
                              : "border border-gray-200"
                          }`}
                        />
                      ))
                    ) : (
                      <p className="text-gray-500">No candidates available</p>
                    )}
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
                {mappedPositionsWithCandidates.length} positions.
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
                  const position = mappedPositionsWithCandidates.find(
                    (p) => p.id === positionId
                  );
                  return (
                    <Card key={positionId} className="overflow-hidden">
                      <CardHeader className={`${position.color} rounded-t-lg`}>
                        <div className="flex items-center space-x-2">
                          <position.icon className="w-5 h-5" />
                          <CardTitle className="text-lg">
                            {position.name}
                          </CardTitle>
                        </div>
                      </CardHeader>
                      <CardContent className="p-4">
                        <div className="flex items-center space-x-4">
                          <Avatar className="w-16 h-16">
                            <AvatarImage
                              src={candidate.photoUrl || "/placeholder.svg"}
                              crossOrigin="anonymous"
                              alt={
                                candidate.fullName ||
                                `${candidate.firstName} ${candidate.lastName}`
                              }
                            />
                            <AvatarFallback>
                              {candidate.firstName?.[0] || ""}
                              {candidate.lastName?.[0] || ""}
                            </AvatarFallback>
                          </Avatar>
                          <div className="flex-1">
                            <h4 className="font-semibold">
                              {candidate.fullName ||
                                `${candidate.firstName} ${candidate.lastName}`}
                            </h4>
                            <p className="text-sm text-gray-600">
                              {position.name}
                            </p>
                            {candidate.campaignSlogan && (
                              <p className="text-xs text-gray-500 italic mt-1">
                                "{candidate.campaignSlogan}"
                              </p>
                            )}
                          </div>
                          <CheckCircle className="w-6 h-6 text-green-500" />
                        </div>
                      </CardContent>
                    </Card>
                  );
                }
              )}
            </div>

            {getSelectedCount() < mappedPositionsWithCandidates.length && (
              <Card className="mt-6 border-dashed border-2 border-gray-300">
                <CardContent className="p-6 text-center">
                  <Heart className="w-8 h-8 text-gray-400 mx-auto mb-2" />
                  <p className="text-gray-600">
                    You haven't selected candidates for{" "}
                    {mappedPositionsWithCandidates.length - getSelectedCount()}{" "}
                    positions. You can still proceed to vote for your selected
                    candidates, or go back to make more selections.
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
                      {getSelectedCount()} out of{" "}
                      {mappedPositionsWithCandidates.length}
                    </p>
                  </div>
                  <div>
                    <p className="text-gray-600">Timestamp</p>
                    <p className="font-medium">{receipt.timestamp}</p>
                  </div>
                  <div>
                    <p className="text-gray-600">Block Number</p>
                    <p className="font-medium">{receipt.blockNumber}</p>
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
                        const position = mappedPositionsWithCandidates.find(
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
                                {position.name}
                              </p>
                              <p className="text-xs text-gray-600">
                                {candidate.fullName ||
                                  `${candidate.firstName} ${candidate.lastName}`}
                              </p>
                            </div>
                          </div>
                        );
                      }
                    )}
                  </div>
                </div>

                <Separator />
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
                  const position = mappedPositionsWithCandidates.find(
                    (p) => p.id === positionId
                  );
                  return (
                    <div
                      key={positionId}
                      className="flex items-center justify-between p-2 bg-gray-50 rounded"
                    >
                      <span className="font-medium">{position.name}</span>
                      <span className="text-blue-600">
                        {candidate.fullName ||
                          `${candidate.firstName} ${candidate.lastName}`}
                      </span>
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

export default ElectionDetails;
