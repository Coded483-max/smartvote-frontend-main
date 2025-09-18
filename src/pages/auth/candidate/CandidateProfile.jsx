import { useParams, useNavigate, Link } from "react-router-dom";
import React, { useEffect, useState, useCallback } from "react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { Textarea } from "@/components/ui/textarea";
import { Label } from "@/components/ui/label";
import { CheckCircle, XCircle, MessageSquare } from "lucide-react";
import { Separator } from "@/components/ui/separator";
import { Alert, AlertDescription } from "@/components/ui/alert";
import {
  ArrowLeft,
  Mail,
  Phone,
  GraduationCap,
  Building,
  Award,
  User,
  Calendar,
  FileText,
  Download,
  MapPin,
  Star,
  Vote,
  AlertCircle,
} from "lucide-react";
import {
  useGetCandidateByIdQuery,
  useApproveCandidateMutation,
  useRejectCandidateMutation,
} from "@/api/superAdminsApiSlice";

import Loader from "@/UI/Loader";
import { setCandidateCredentials } from "@/api/authSlice";
import { useDispatch } from "react-redux";
import { toast, ToastContainer } from "react-toastify";

// In your React component
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

// Usage in your candidate profile

const CandidateProfile = () => {
  const { candidateId } = useParams();
  const navigate = useNavigate();

  const {
    data: candidate,
    isLoading,
    error,
    isError,
    refetch,
  } = useGetCandidateByIdQuery(candidateId, {
    skip: !candidateId,
    pollingInterval: 30000,
    refetchOnMountOrArgChange: true,
  });
  const [approveCandidate, { isLoading: isApproveLoading }] =
    useApproveCandidateMutation();
  const [rejectCandidate, { isLoading: isRejectLoading }] =
    useRejectCandidateMutation();

  const [isRejectDialogOpen, setIsRejectDialogOpen] = useState(false);
  const [rejectionReason, setRejectionReason] = useState("");

  console.log(rejectionReason);

  const dispatch = useDispatch();

  const approveCandidateHandler = async () => {
    try {
      await approveCandidate({ candidateId }).unwrap();
      toast.success("Candidate approved successfully!");

      refetch();
    } catch (error) {
      console.error("Error approving candidate:", error);
      toast.error(error?.data?.message || "Failed to approve candidate");
    }
  };

  const rejectCandidateHandler = async () => {
    if (!rejectionReason.trim()) {
      alert("Please provide a reason for rejection.");
      return;
    }

    try {
      await rejectCandidate({ candidateId, rejectionReason }).unwrap();
      console.log("Candidate rejected successfully!", rejectionReason);
      alert("Candidate rejected successfully!");
      setIsRejectDialogOpen(false);
      setRejectionReason("");
      refetch();
      navigate("/super-admin/dashboard");
    } catch (error) {
      console.error("Error rejecting candidate:", error);
      // Handle error (e.g., show notification)
    }
  };

  // Helper function for status badges
  const getStatusBadge = (status) => {
    const statusConfig = {
      pending: {
        variant: "outline",
        label: "Pending Review",
        className: "border-yellow-500 text-yellow-700 bg-yellow-50",
      },
      approved: {
        variant: "default",
        label: "Approved",
        className: "bg-green-100 text-green-800 border-green-200",
      },
      rejected: {
        variant: "destructive",
        label: "Rejected",
        className: "bg-red-100 text-red-800 border-red-200",
      },
      under_review: {
        variant: "outline",
        label: "Under Review",
        className: "border-blue-500 text-blue-700 bg-blue-50",
      },
    };

    const config = statusConfig[status?.toLowerCase()] || {
      variant: "secondary",
      label: status || "Unknown",
      className: "",
    };

    return (
      <Badge variant={config.variant} className={config.className}>
        {config.label}
      </Badge>
    );
  };

  // Get initials for avatar
  const getInitials = (firstName, lastName) => {
    return `${firstName?.charAt(0) || ""}${
      lastName?.charAt(0) || ""
    }`.toUpperCase();
  };

  // Loading state with your Loader component
  if (isLoading) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="text-center space-y-4">
          <Loader />
          <p className="text-gray-600">Loading candidate profile...</p>
        </div>
      </div>
    );
  }

  // Error state
  if (isError) {
    return (
      <div className="min-h-screen flex items-center justify-center p-4">
        <Card className="w-full max-w-md">
          <CardContent className="text-center py-8">
            <AlertCircle className="h-12 w-12 text-red-500 mx-auto mb-4" />
            <h3 className="text-lg font-semibold mb-2">
              Error Loading Profile
            </h3>
            <p className="text-gray-600 mb-6">
              {error?.data?.message || "Failed to load candidate profile"}
            </p>
            <div className="space-y-2">
              <Button onClick={() => refetch()} className="w-full">
                Try Again
              </Button>
              <Button
                onClick={() => navigate(-1)}
                variant="outline"
                className="w-full"
              >
                <ArrowLeft className="mr-2 h-4 w-4" />
                Go Back
              </Button>
            </div>
          </CardContent>
        </Card>
      </div>
    );
  }

  // No candidate found
  if (!candidate) {
    return (
      <div className="min-h-screen flex items-center justify-center p-4">
        <Card className="w-full max-w-md">
          <CardContent className="text-center py-8">
            <User className="h-12 w-12 text-gray-400 mx-auto mb-4" />
            <h3 className="text-lg font-semibold mb-2">Candidate Not Found</h3>
            <p className="text-gray-600 mb-6">
              The candidate profile you're looking for doesn't exist.
            </p>
            <Button onClick={() => navigate(-1)} className="w-full">
              <ArrowLeft className="mr-2 h-4 w-4" />
              Go Back
            </Button>
          </CardContent>
        </Card>
      </div>
    );
  }

  console.log("Candidate data:", candidate);

  return (
    <div className="min-h-screen bg-gray-50">
      <ToastContainer />
      <div className="container mx-auto px-4 py-8 max-w-7xl">
        {/* Back Button */}
        <Button
          variant="ghost"
          onClick={() => navigate(-1)}
          className="mb-6 hover:bg-gray-100"
        >
          <ArrowLeft className="mr-2 h-4 w-4" />
          Back to Candidates
        </Button>

        {/* Header Section */}
        <Card className="mb-8">
          <CardContent className="pt-6">
            <div className="flex flex-col sm:flex-row items-start sm:items-center gap-6">
              {/* Avatar */}
              <Avatar className="h-24 w-24 border-4 border-white shadow-lg">
                <AvatarImage
                  src={candidate.documents?.photo || candidate.photo}
                  alt={`${candidate.firstName} ${candidate.lastName}`}
                />
                <AvatarFallback className="text-xl bg-blue-100 text-blue-700">
                  {getInitials(candidate.firstName, candidate.lastName)}
                </AvatarFallback>
              </Avatar>

              {/* Basic Info */}
              <div className="flex-1">
                <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between mb-4">
                  <div>
                    <h1 className="text-3xl font-bold text-gray-900 mb-1">
                      {candidate.firstName} {candidate.lastName}
                    </h1>
                    <p className="text-lg text-gray-600">
                      Student ID: {candidate.studentId}
                    </p>
                  </div>
                  <div className="mt-4 sm:mt-0">
                    {getStatusBadge(
                      candidate.approvalStatus || candidate.status
                    )}
                  </div>
                </div>

                {/* Quick Stats */}
                <div className="grid grid-cols-2 sm:grid-cols-4 gap-4">
                  <div className="text-center p-3 bg-blue-50 rounded-lg">
                    <Award className="h-5 w-5 text-blue-600 mx-auto mb-1" />
                    <p className="text-sm text-gray-600">Position</p>
                    <p className="font-semibold text-blue-700 text-sm">
                      {candidate.position?.name || candidate.position || "N/A"}
                    </p>
                  </div>
                  <div className="text-center p-3 bg-green-50 rounded-lg">
                    <GraduationCap className="h-5 w-5 text-green-600 mx-auto mb-1" />
                    <p className="text-sm text-gray-600">GPA</p>
                    <p className="font-semibold text-green-700">
                      {candidate.gpa || "N/A"}
                    </p>
                  </div>
                  <div className="text-center p-3 bg-purple-50 rounded-lg">
                    <Building className="h-5 w-5 text-purple-600 mx-auto mb-1" />
                    <p className="text-sm text-gray-600">College</p>
                    <p className="font-semibold text-purple-700 text-sm">
                      {candidate.college || "N/A"}
                    </p>
                  </div>
                  {candidate.votes !== undefined && (
                    <div className="text-center p-3 bg-orange-50 rounded-lg">
                      <Vote className="h-5 w-5 text-orange-600 mx-auto mb-1" />
                      <p className="text-sm text-gray-600">Votes</p>
                      <p className="font-semibold text-orange-700">
                        {candidate.votes?.toLocaleString() || "0"}
                      </p>
                    </div>
                  )}
                </div>
              </div>
            </div>
          </CardContent>
        </Card>

        {/* ✅ ACTION BUTTONS SECTION - Add this here */}
        {candidate.approvalStatus === "pending" && (
          <Card className="mb-8 border-orange-200 bg-orange-50">
            <CardHeader>
              <CardTitle className="flex items-center gap-2 text-orange-800">
                <MessageSquare className="h-5 w-5" />
                Candidate Review Required
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="flex flex-col sm:flex-row gap-4">
                <div className="flex-1">
                  <p className="text-sm text-orange-700 mb-4">
                    This candidate is pending approval. Please review their
                    information and documents before making a decision.
                  </p>
                </div>

                <div className="flex gap-3 sm:flex-shrink-0">
                  {/* Approve Button */}
                  <Button
                    onClick={approveCandidateHandler}
                    disabled={isApproveLoading}
                    className="bg-green-600 hover:bg-green-700 text-white flex items-center gap-2"
                  >
                    <CheckCircle className="h-4 w-4" />
                    {isApproveLoading ? "Approving..." : "Approve"}
                  </Button>

                  {/* Reject Button with Dialog */}
                  <Dialog
                    open={isRejectDialogOpen}
                    onOpenChange={setIsRejectDialogOpen}
                  >
                    <DialogTrigger asChild>
                      <Button
                        variant="destructive"
                        disabled={isRejectLoading}
                        className="flex items-center gap-2"
                      >
                        <XCircle className="h-4 w-4" />
                        Reject
                      </Button>
                    </DialogTrigger>
                    <DialogContent className="sm:max-w-md">
                      <DialogHeader>
                        <DialogTitle className="flex items-center gap-2 text-red-600">
                          <XCircle className="h-5 w-5" />
                          Reject Candidate
                        </DialogTitle>
                      </DialogHeader>
                      <div className="space-y-4 pt-4">
                        <div className="space-y-2">
                          <Label htmlFor="rejection-reason">
                            Reason for Rejection
                            <span className="text-red-500">*</span>
                          </Label>
                          <Textarea
                            id="rejection-reason"
                            placeholder="Please provide a detailed reason for rejecting this candidate..."
                            value={rejectionReason}
                            onChange={(e) => setRejectionReason(e.target.value)}
                            rows={4}
                            className="resize-none"
                          />
                          <p className="text-xs text-gray-500">
                            This reason will be recorded and may be shared with
                            the candidate.
                          </p>
                        </div>

                        <div className="flex gap-3 pt-4">
                          <Button
                            variant="outline"
                            onClick={() => {
                              setIsRejectDialogOpen(false);
                              setRejectionReason("");
                            }}
                            className="flex-1"
                            disabled={isRejectLoading}
                          >
                            Cancel
                          </Button>
                          <Button
                            onClick={rejectCandidateHandler}
                            disabled={
                              isRejectLoading || !rejectionReason.trim()
                            }
                            variant="destructive"
                            className="flex-1"
                          >
                            {isRejectLoading
                              ? "Rejecting..."
                              : "Confirm Rejection"}
                          </Button>
                        </div>
                      </div>
                    </DialogContent>
                  </Dialog>
                </div>
              </div>
            </CardContent>
          </Card>
        )}

        {/* ✅ Show rejection info if candidate was rejected */}
        {candidate.approvalStatus === "rejected" && (
          <Card className="mb-8 border-red-200 bg-red-50">
            <CardHeader>
              <CardTitle className="flex items-center gap-2 text-red-800">
                <XCircle className="h-5 w-5" />
                Candidate Rejected
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="space-y-3">
                <div>
                  <p className="text-sm font-medium text-red-800">
                    Rejection Reason:
                  </p>
                  <p className="text-sm text-red-700 bg-red-100 p-3 rounded border border-red-200 mt-1">
                    {candidate.rejectionReason || "No reason provided"}
                  </p>
                </div>
                {candidate.rejectedAt && (
                  <div>
                    <p className="text-sm font-medium text-red-800">
                      Rejected On:
                    </p>
                    <p className="text-sm text-red-700">
                      {new Date(candidate.rejectedAt).toLocaleDateString(
                        "en-US",
                        {
                          year: "numeric",
                          month: "long",
                          day: "numeric",
                          hour: "2-digit",
                          minute: "2-digit",
                        }
                      )}
                    </p>
                  </div>
                )}
                {candidate.rejectedBy && (
                  <div>
                    <p className="text-sm font-medium text-red-800">
                      Rejected By:
                    </p>
                    <p className="text-sm text-red-700">
                      {candidate.rejectedBy}
                    </p>
                  </div>
                )}
              </div>
            </CardContent>
          </Card>
        )}

        {/* ✅ Show approval info if candidate was approved */}
        {candidate.approvalStatus === "approved" && (
          <Card className="mb-8 border-green-200 bg-green-50">
            <CardHeader>
              <CardTitle className="flex items-center gap-2 text-green-800">
                <CheckCircle className="h-5 w-5" />
                Candidate Approved
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="space-y-3">
                {candidate.approvalNote && (
                  <div>
                    <p className="text-sm font-medium text-green-800">
                      Approval Note:
                    </p>
                    <p className="text-sm text-green-700 bg-green-100 p-3 rounded border border-green-200 mt-1">
                      {candidate.approvalNote}
                    </p>
                  </div>
                )}
                {candidate.approvedAt && (
                  <div>
                    <p className="text-sm font-medium text-green-800">
                      Approved On:
                    </p>
                    <p className="text-sm text-green-700">
                      {new Date(candidate.approvedAt).toLocaleDateString(
                        "en-US",
                        {
                          year: "numeric",
                          month: "long",
                          day: "numeric",
                          hour: "2-digit",
                          minute: "2-digit",
                        }
                      )}
                    </p>
                  </div>
                )}
                {candidate.approvedBy && (
                  <div>
                    <p className="text-sm font-medium text-green-800">
                      Approved By:
                    </p>
                    <p className="text-sm text-green-700">
                      {/* ✅ Handle approvedBy object */}
                      {typeof candidate.approvedBy === "object"
                        ? candidate.approvedBy.name ||
                          candidate.approvedBy.email ||
                          "Unknown"
                        : candidate.approvedBy}
                    </p>
                  </div>
                )}
              </div>
            </CardContent>
          </Card>
        )}

        {/* Main Content Grid */}
        <div className="grid grid-cols-1 lg:grid-cols-2 xl:grid-cols-3 gap-6 mb-8">
          {/* Personal Information */}
          <Card className="h-fit">
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <User className="h-5 w-5 text-blue-600" />
                Personal Information
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="space-y-3">
                <div className="flex items-center gap-3 p-3 bg-gray-50 rounded-lg">
                  <Mail className="h-4 w-4 text-gray-500 flex-shrink-0" />
                  <div className="flex-1 min-w-0">
                    <p className="text-sm font-medium text-gray-900">Email</p>
                    <p className="text-sm text-gray-600 truncate">
                      {candidate.email}
                    </p>
                  </div>
                </div>

                <div className="flex items-center gap-3 p-3 bg-gray-50 rounded-lg">
                  <Phone className="h-4 w-4 text-gray-500 flex-shrink-0" />
                  <div className="flex-1">
                    <p className="text-sm font-medium text-gray-900">Phone</p>
                    <p className="text-sm text-gray-600">
                      {candidate.mobileNumber || "N/A"}
                    </p>
                  </div>
                </div>

                {candidate.formattedDates.registrationDate && (
                  <div className="flex items-center gap-3 p-3 bg-gray-50 rounded-lg">
                    <Calendar className="h-4 w-4 text-gray-500 flex-shrink-0" />
                    <div className="flex-1">
                      <p className="text-sm font-medium text-gray-900">
                        Registered
                      </p>
                      <p className="text-sm text-gray-600">
                        {candidate.formattedDates.applicationSubmitted}
                      </p>
                    </div>
                  </div>
                )}
              </div>
            </CardContent>
          </Card>

          {/* Academic Information */}
          <Card className="h-fit">
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <GraduationCap className="h-5 w-5 text-green-600" />
                Academic Information
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="space-y-3">
                <div>
                  <p className="text-sm font-medium text-gray-900 mb-1">
                    College
                  </p>
                  <p className="text-sm text-gray-600 bg-gray-50 p-2 rounded">
                    {candidate.college || "Not specified"}
                  </p>
                </div>

                <div>
                  <p className="text-sm font-medium text-gray-900 mb-1">
                    Department
                  </p>
                  <p className="text-sm text-gray-600 bg-gray-50 p-2 rounded">
                    {candidate.department || "Not specified"}
                  </p>
                </div>

                <div>
                  <p className="text-sm font-medium text-gray-900 mb-1">
                    Year of Study
                  </p>
                  <p className="text-sm text-gray-600 bg-gray-50 p-2 rounded">
                    {candidate.yearOfStudy || "Not specified"}
                  </p>
                </div>

                <div>
                  <p className="text-sm font-medium text-gray-900 mb-1">
                    Current GPA
                  </p>
                  <div className="flex items-center gap-2">
                    <Star className="h-4 w-4 text-yellow-500" />
                    <span className="text-lg font-bold text-blue-600">
                      {candidate.gpa || "N/A"}
                    </span>
                    <span className="text-sm text-gray-500">/ 4.0</span>
                  </div>
                </div>
              </div>
            </CardContent>
          </Card>

          {/* Campaign Information */}
          <Card className="h-fit">
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <Award className="h-5 w-5 text-purple-600" />
                Campaign Information
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="space-y-3">
                <div>
                  <p className="text-sm font-medium text-gray-900 mb-1">
                    Running For
                  </p>
                  <Badge variant="outline" className="text-sm">
                    {candidate.position?.name ||
                      candidate.position ||
                      "Not specified"}
                  </Badge>
                </div>

                <div>
                  <p className="text-sm font-medium text-gray-900 mb-1">
                    Election
                  </p>
                  <p className="text-sm text-gray-600 bg-gray-50 p-2 rounded">
                    {candidate.election?.title ||
                      candidate.electionId ||
                      "Not specified"}
                  </p>
                </div>

                <div>
                  <p className="text-sm font-medium text-gray-900 mb-1">
                    Campaign Slogan
                  </p>
                  <p className="text-sm text-gray-600 bg-blue-50 p-3 rounded italic border-l-4 border-blue-400">
                    "{candidate.campaignSlogan || "No slogan provided"}"
                  </p>
                </div>

                {candidate.votes !== undefined && (
                  <div>
                    <p className="text-sm font-medium text-gray-900 mb-1">
                      Votes Received
                    </p>
                    <div className="flex items-center gap-2 bg-green-50 p-3 rounded-lg">
                      <Vote className="h-5 w-5 text-green-600" />
                      <span className="text-xl font-bold text-green-700">
                        {candidate.votes?.toLocaleString() || "0"}
                      </span>
                    </div>
                  </div>
                )}
              </div>
            </CardContent>
          </Card>
        </div>

        {/* Documents Section */}
        {candidate.documents && Object.keys(candidate.documents).length > 0 && (
          <Card className="mb-8">
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <FileText className="h-5 w-5 text-orange-600" />
                Documents & Files
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                {candidate.documents.photoUrl && (
                  <div className="space-y-3">
                    <p className="text-sm font-medium text-gray-900">
                      Candidate Photo
                    </p>
                    <Link to={candidate.documents.photoUrl} target="_blank">
                      <ImageWithFallback
                        src={candidate.documents?.photoUrl}
                        alt={`${candidate.firstName} ${candidate.lastName}`}
                        className="rounded-lg"
                        fallback="/default-avatar.png"
                      />
                    </Link>
                  </div>
                )}

                {candidate.documents.transcriptUrl && (
                  <div className="space-y-3">
                    <p className="text-sm font-medium text-gray-900">
                      Academic Transcript
                    </p>
                    <div className="border border-gray-200 rounded-lg p-4 bg-gray-50 hover:bg-gray-100 transition-colors">
                      <FileText className="h-8 w-8 text-blue-500 mb-2" />
                      <Button
                        variant="outline"
                        size="sm"
                        asChild
                        className="w-full"
                      >
                        <a
                          href={candidate.documents.transcriptUrl}
                          target="_blank"
                          rel="noopener noreferrer"
                        >
                          <Download className="mr-2 h-4 w-4" />
                          View Transcript
                        </a>
                      </Button>
                    </div>
                  </div>
                )}

                {candidate.documents.manifestoUrl && (
                  <div className="space-y-3">
                    <p className="text-sm font-medium text-gray-900">
                      Campaign Manifesto
                    </p>
                    <div className="border border-gray-200 rounded-lg p-4 bg-gray-50 hover:bg-gray-100 transition-colors">
                      <FileText className="h-8 w-8 text-purple-500 mb-2" />
                      <Button
                        variant="outline"
                        size="sm"
                        asChild
                        className="w-full"
                      >
                        <a
                          href={candidate.documents.manifestoUrl}
                          target="_blank"
                          rel="noopener noreferrer"
                        >
                          <Download className="mr-2 h-4 w-4" />
                          View Manifesto
                        </a>
                      </Button>
                    </div>
                  </div>
                )}
              </div>
            </CardContent>
          </Card>
        )}

        {/* Additional Information */}
        {(candidate.approvalDate || candidate.registrationDate) && (
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <Calendar className="h-5 w-5 text-gray-600" />
                Timeline
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                {candidate.regDate && (
                  <div className="flex items-center gap-4 p-3 bg-blue-50 rounded-lg">
                    <div className="w-2 h-2 bg-blue-500 rounded-full"></div>
                    <div>
                      <p className="text-sm font-medium text-gray-900">
                        Registration Submitted
                      </p>
                      <p className="text-sm text-gray-600">
                        {new Date(
                          candidate.registrationDate
                        ).toLocaleDateString("en-US", {
                          year: "numeric",
                          month: "long",
                          day: "numeric",
                          hour: "2-digit",
                          minute: "2-digit",
                        })}
                      </p>
                    </div>
                  </div>
                )}

                {candidate.approvalDate && (
                  <div className="flex items-center gap-4 p-3 bg-green-50 rounded-lg">
                    <div className="w-2 h-2 bg-green-500 rounded-full"></div>
                    <div>
                      <p className="text-sm font-medium text-gray-900">
                        Application Approved
                      </p>
                      <p className="text-sm text-gray-600">
                        {new Date(candidate.approvalDate).toLocaleDateString(
                          "en-US",
                          {
                            year: "numeric",
                            month: "long",
                            day: "numeric",
                            hour: "2-digit",
                            minute: "2-digit",
                          }
                        )}
                      </p>
                    </div>
                  </div>
                )}
              </div>
            </CardContent>
          </Card>
        )}
      </div>
    </div>
  );
};

export default CandidateProfile;
