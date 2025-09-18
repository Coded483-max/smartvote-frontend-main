import { useState, useEffect } from "react";
import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Checkbox } from "@/components/ui/checkbox";
import {
  User,
  Target,
  Award,
  FileText,
  Mail,
  Phone,
  IdCard,
  Vote,
  Loader2,
  AlertCircle,
  Building,
  GraduationCap,
} from "lucide-react";
import { Alert, AlertDescription } from "@/components/ui/alert";
import { Skeleton } from "@/components/ui/skeleton";
import Logo from "@/UI/Logo";
import FileUploadPreview from "@/UI/FileUploadPreview";

// ✅ RTK Query imports
import {
  useGetActiveElectionsForRegistrationQuery,
  useGetElectionPositionsQuery,
  useCheckEligibilityQuery,
  useRegisterCandidateMutation,
} from "@/api/electionApi";
import {
  useGetCollegesQuery,
  useGetDepartmentsByCollegeQuery,
  useGetAcademicYearsQuery,
} from "@/api/dataApi";

import { toast } from "react-toastify";
import { ToastContainer } from "react-toastify";

const CandidateRegistration = () => {
  const STORAGE_KEY = "candidateRegistrationForm";

  // ✅ Initialize form data from localStorage or default values
  const [formData, setFormData] = useState(() => {
    try {
      const savedData = localStorage.getItem(STORAGE_KEY);

      return savedData
        ? JSON.parse(savedData)
        : {
            firstName: "",
            lastName: "",
            studentId: "",
            email: "",
            mobileNumber: "",
            yearOfStudy: "",
            college: "",
            department: "",
            gpa: "",
            electionId: "",
            positionId: "",
            campaignSlogan: "",
            agreeToRules: false,
            agreeToEthics: false,
            confirmEligibility: false,
          };
    } catch (error) {
      console.error("Error loading saved form data:", error);
      return {
        firstName: "",
        lastName: "",
        studentId: "",
        email: "",
        mobileNumber: "",
        yearOfStudy: "",
        college: "",
        department: "",
        gpa: "",
        electionId: "",
        positionId: "",
        campaignSlogan: "",
        agreeToRules: false,
        agreeToEthics: false,
        confirmEligibility: false,
      };
    }
  });

  // File states
  const [photo, setPhoto] = useState(null);
  const [transcript, setTranscript] = useState(null);
  const [manifesto, setManifesto] = useState(null);
  const [additionalFiles, setAdditionalFiles] = useState([]);
  const [lastSaved, setLastSaved] = useState(null);

  // ✅ Save to localStorage whenever formData changes
  useEffect(() => {
    try {
      localStorage.setItem(STORAGE_KEY, JSON.stringify(formData));
      setLastSaved(new Date());
    } catch (error) {
      if (error.name === "QuotaExceededError") {
        console.warn("Local storage quota exceeded. Clearing old data...");
        localStorage.clear();
        localStorage.setItem(STORAGE_KEY, JSON.stringify(formData));
      }
    }
  }, [formData]);

  // ✅ Clear old data on component mount (optional expiration)
  useEffect(() => {
    const savedTimestamp = localStorage.getItem(`${STORAGE_KEY}_timestamp`);
    const now = Date.now();
    const oneDay = 24 * 60 * 60 * 1000; // 24 hours in milliseconds

    if (savedTimestamp && now - parseInt(savedTimestamp) > oneDay) {
      // Clear old data
      localStorage.removeItem(STORAGE_KEY);
      localStorage.removeItem(`${STORAGE_KEY}_timestamp`);
    } else {
      // Update timestamp
      localStorage.setItem(`${STORAGE_KEY}_timestamp`, now.toString());
    }
  }, []);

  // ✅ RTK Query hooks
  const {
    data: colleges = [],
    isLoading: collegesLoading,
    error: collegesError,
  } = useGetCollegesQuery();

  const {
    data: departments = [],
    isLoading: departmentsLoading,
    error: departmentsError,
  } = useGetDepartmentsByCollegeQuery(formData.college, {
    skip: !formData.college,
  });

  const {
    data: elections = [],
    isLoading: electionsLoading,
    error: electionsError,
  } = useGetActiveElectionsForRegistrationQuery();

  console.log(elections);

  const {
    data: positions = [],
    isLoading: positionsLoading,
    error: positionsError,
  } = useGetElectionPositionsQuery(formData.electionId, {
    skip: !formData.electionId,
  });

  console.log(positions);

  const {
    data: years = [],
    isLoading: yearsLoading,
    error: yearsError,
  } = useGetAcademicYearsQuery();

  // Eligibility check
  const {
    data: eligibilityData,
    isLoading: eligibilityLoading,
    error: eligibilityError,
  } = useCheckEligibilityQuery(
    {
      electionId: formData.electionId,
      studentId: formData.studentId,
      department: formData.department,
      college: formData.college,
      yearOfStudy: formData.yearOfStudy,
      gpa: formData.gpa,
    },
    {
      skip:
        !formData.electionId ||
        !formData.studentId ||
        !formData.department ||
        !formData.college ||
        !formData.yearOfStudy,
    }
  );

  const [
    registerCandidate,
    {
      isLoading: registrationLoading,
      error: registrationError,
      isSuccess: registrationSuccess,
    },
  ] = useRegisterCandidateMutation();

  // Handle college change
  const handleCollegeChange = (selectedCollege) => {
    setFormData((prev) => ({
      ...prev,
      college: selectedCollege,
      department: "", // Reset department when college changes
    }));
  };

  // Reset position when election changes
  useEffect(() => {
    if (formData.electionId) {
      setFormData((prev) => ({ ...prev, positionId: "" }));
    }
  }, [formData.electionId]);

  const handleFileChange = (file, fileType) => {
    switch (fileType) {
      case "photo":
        setPhoto(file);
        break;
      case "transcript":
        setTranscript(file);
        break;
      case "manifesto":
        setManifesto(file);
        break;
      default:
        break;
    }
  };

  // ✅ Clear persisted data function
  const clearPersistedData = () => {
    localStorage.removeItem(STORAGE_KEY);
    localStorage.removeItem(`${STORAGE_KEY}_timestamp`);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    // Validate required files
    if (!photo || !transcript || !manifesto) {
      alert("Please upload all required documents");
      return;
    }

    // Validate mobile number (should be 9 digits for Ghana)
    if (!/^\d{9}$/.test(formData.mobileNumber)) {
      toast.error("Mobile number must be exactly 9 digits");
      return;
    }

    if (!formData.email) {
      toast.error("Email is required");
      return;
    }

    const fullMobileNumber = `+233${formData.mobileNumber}`;

    // Create FormData for file upload
    const submitData = new FormData();

    // Add form fields
    // Object.entries(formData).forEach(([key, value]) => {
    //   if (typeof value === "object" && value !== null) {
    //     submitData.append(key, JSON.stringify(value));
    //   } else {
    //     submitData.append(key, value);
    //   }
    // });

    // for (let [key, value] of formData.entries()) {
    //   console.log(key, value);
    // }
    Object.entries(formData).forEach(([key, value]) => {
      if (key === "election") return; // ⬅️ Skip this field
      if (key === "mobileNumber") {
        submitData.append("mobileNumber", fullMobileNumber);
      } else if (typeof value === "object" && value !== null) {
        submitData.append(key, JSON.stringify(value));
      } else {
        submitData.append(key, value);
      }
    });

    // Add files
    submitData.append("photo", photo);
    submitData.append("transcript", transcript);
    submitData.append("manifesto", manifesto);

    // Add additional files
    additionalFiles.forEach((file) => {
      submitData.append("additionalDocs", file);
    });

    try {
      console.log(formData);
      const result = await registerCandidate(submitData).unwrap();
      console.log("Registration successful:", result);

      toast.success("Application submitted successfully!");

      console.log(formData.mobileNumber);

      setFormData("");

      // ✅ Clear persisted data after successful submission
      clearPersistedData();

      // Handle success (redirect, show success message, etc.)
    } catch (error) {
      console.error("Registration failed:", error);
      toast.error(error?.data?.message || "Registration failed");
      // Handle error
    }
  };

  return (
    <div className="min-h-screen py-8 px-4">
      <ToastContainer />
      <div className="max-w-4xl mx-auto">
        <div className="text-center mb-8">
          <h2 className="text-2xl font-semibold text-blue-600 mb-2">
            Candidate Registration
          </h2>
          <p className="text-gray-600 max-w-2xl mx-auto">
            Register to run for student government positions and make your voice
            heard in shaping our university community
          </p>
        </div>

        {/* ✅ Auto-save indicator */}
        {lastSaved && (
          <div className="text-xs text-gray-500 text-center mb-4">
            Last saved: {lastSaved.toLocaleTimeString()}
          </div>
        )}

        {/* ✅ Error Alerts */}
        {(collegesError || electionsError || registrationError) && (
          <Alert className="mb-6 border-red-200 bg-red-50">
            <AlertCircle className="h-4 w-4 text-red-600" />
            <AlertDescription className="text-red-800">
              {collegesError?.data?.message ||
                electionsError?.data?.message ||
                registrationError?.data?.message ||
                "An error occurred. Please try again."}
            </AlertDescription>
          </Alert>
        )}

        {/* ✅ Success Alert */}
        {registrationSuccess && (
          <Alert className="mb-6 border-green-200 bg-green-50">
            <AlertCircle className="h-4 w-4 text-green-600" />
            <AlertDescription className="text-green-800">
              Application submitted successfully! We will review your
              application and get back to you soon.
            </AlertDescription>
          </Alert>
        )}

        <form onSubmit={handleSubmit} className="space-y-8">
          {/* Personal & Academic Information */}
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <User className="h-5 w-5" />
                Personal & Academic Information
              </CardTitle>
              <CardDescription>
                Your basic information and academic standing
              </CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div className="space-y-2">
                  <Label htmlFor="firstName">
                    First Name <span className="text-red-500">*</span>
                  </Label>
                  <Input
                    id="firstName"
                    value={formData.firstName}
                    onChange={(e) =>
                      setFormData((prev) => ({
                        ...prev,
                        firstName: e.target.value,
                      }))
                    }
                    required
                  />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="lastName">
                    Last Name <span className="text-red-500">*</span>
                  </Label>
                  <Input
                    id="lastName"
                    value={formData.lastName}
                    onChange={(e) =>
                      setFormData((prev) => ({
                        ...prev,
                        lastName: e.target.value,
                      }))
                    }
                    required
                  />
                </div>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div className="space-y-2">
                  <Label htmlFor="studentId">
                    Student ID <span className="text-red-500">*</span>
                  </Label>
                  <div className="relative">
                    <IdCard className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-gray-400" />
                    <Input
                      id="studentId"
                      type="text"
                      placeholder="Student ID"
                      pattern="\d{8}"
                      title="Student ID must be 8 digits"
                      inputMode="numeric"
                      value={formData.studentId}
                      onChange={(e) => {
                        const sanitized = e.target.value
                          .replace(/\D/g, "")
                          .slice(0, 8);
                        setFormData((prev) => ({
                          ...prev,
                          studentId: sanitized,
                        }));
                      }}
                      className="pl-10 h-12 rounded-xl border-gray-200 focus:border-blue-300 focus:ring-blue-100"
                      required
                    />
                  </div>
                </div>
                {yearsLoading ? (
                  <Skeleton className="h-12 w-full rounded-xl" />
                ) : yearsError ? (
                  <Alert variant="destructive">
                    <AlertDescription>
                      Failed to load academic years. Please refresh the page.
                    </AlertDescription>
                  </Alert>
                ) : (
                  <div className="space-y-2">
                    <Label className="text-sm font-medium text-gray-700 flex items-center gap-2">
                      <GraduationCap className="h-4 w-4" />
                      Year of Study <span className="text-red-500">*</span>
                    </Label>
                    <Select
                      value={formData.yearOfStudy || ""}
                      onValueChange={(value) =>
                        setFormData((prev) => ({
                          ...prev,
                          yearOfStudy: value,
                        }))
                      }
                    >
                      <SelectTrigger className="h-12 rounded-xl border-gray-200">
                        <SelectValue placeholder="Select your year of study" />
                      </SelectTrigger>
                      <SelectContent>
                        {years.map((yearItem) => (
                          <SelectItem key={yearItem.id} value={yearItem.name}>
                            <div className="flex items-center gap-2">
                              <GraduationCap className="h-4 w-4 text-gray-400" />
                              {yearItem.name}
                            </div>
                          </SelectItem>
                        ))}
                      </SelectContent>
                    </Select>
                  </div>
                )}
              </div>

              <div className="flex items-center gap-10">
                {/* College Dropdown */}
                <div className="space-y-2">
                  <Label className="text-sm font-medium text-gray-700 flex items-center gap-2">
                    <Building className="h-4 w-4" />
                    College<span className="text-red-500">*</span>
                  </Label>

                  {collegesLoading ? (
                    <Skeleton className="h-12 w-full rounded-xl" />
                  ) : collegesError ? (
                    <Alert variant="destructive">
                      <AlertDescription>
                        Failed to load colleges. Please refresh the page.
                      </AlertDescription>
                    </Alert>
                  ) : (
                    <Select
                      value={formData.college}
                      onValueChange={handleCollegeChange}
                    >
                      <SelectTrigger className="h-12 rounded-xl border-gray-200">
                        <SelectValue placeholder="Select your college" />
                      </SelectTrigger>
                      <SelectContent>
                        {colleges.map((collegeItem) => (
                          <SelectItem
                            key={collegeItem.id}
                            value={collegeItem.value}
                          >
                            <div className="flex items-center gap-2">
                              <Building className="h-4 w-4 text-gray-400" />
                              {collegeItem.name}
                            </div>
                          </SelectItem>
                        ))}
                      </SelectContent>
                    </Select>
                  )}
                </div>

                {/* Department Dropdown */}
                <div className="space-y-2">
                  <Label className="text-sm font-medium text-gray-700 flex items-center gap-2">
                    <GraduationCap className="h-4 w-4" />
                    Department <span className="text-red-500">*</span>
                  </Label>

                  {!formData.college ? (
                    <Select disabled>
                      <SelectTrigger className="h-12 rounded-xl border-gray-200 bg-gray-50">
                        <SelectValue placeholder="Select college first" />
                      </SelectTrigger>
                    </Select>
                  ) : departmentsLoading ? (
                    <Skeleton className="h-12 w-full rounded-xl" />
                  ) : departmentsError ? (
                    <Alert variant="destructive">
                      <AlertDescription>
                        Failed to load departments. Please try again.
                      </AlertDescription>
                    </Alert>
                  ) : (
                    <Select
                      value={formData.department}
                      onValueChange={(value) =>
                        setFormData((prev) => ({ ...prev, department: value }))
                      }
                    >
                      <SelectTrigger className="h-12 rounded-xl border-gray-200">
                        <SelectValue placeholder="Select your department" />
                      </SelectTrigger>
                      <SelectContent>
                        {departments.map((deptItem) => (
                          <SelectItem key={deptItem.id} value={deptItem.value}>
                            <div className="flex items-center gap-2">
                              <GraduationCap className="h-4 w-4 text-gray-400" />
                              {deptItem.name}
                            </div>
                          </SelectItem>
                        ))}
                      </SelectContent>
                    </Select>
                  )}

                  {formData.college &&
                    departments.length === 0 &&
                    !departmentsLoading &&
                    !departmentsError && (
                      <p className="text-sm text-gray-500">
                        No departments found for selected college.
                      </p>
                    )}
                </div>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                <div className="space-y-2">
                  <Label htmlFor="email" className="flex items-center gap-2">
                    <Mail className="h-4 w-4" />
                    University Email <span className="text-red-500">*</span>
                  </Label>
                  <Input
                    id="email"
                    type="email"
                    value={formData.email}
                    onChange={(e) =>
                      setFormData((prev) => ({
                        ...prev,
                        email: e.target.value,
                      }))
                    }
                    placeholder="student@st.ug.edu.gh"
                    pattern="^[a-zA-Z0-9._]+@st\.ug\.edu\.gh$"
                    title="Must use your UG school email (@st.ug.edu.gh)"
                    required
                  />
                </div>
                <div className="space-y-2">
                  <Label className="flex items-center gap-2">
                    <Phone className="h-4 w-4" />
                    Mobile Number <span className="text-red-500">*</span>
                  </Label>
                  <div className="flex items-center">
                    <span className="px-3 h-9 flex justify-center items-center bg-gray-100 border border-r-0 border-gray-300 rounded-l-sm text-gray-600 text-sm">
                      +233
                    </span>
                    <Input
                      type="tel"
                      className="h-9 border-l-0 rounded-none rounded-tr-sm rounded-br-sm border-gray-200"
                      placeholder="Phone number (9 digits)"
                      value={formData.mobileNumber}
                      onChange={(e) =>
                        setFormData((prev) => ({
                          ...prev,
                          mobileNumber: e.target.value,
                        }))
                      }
                      maxLength={9}
                      required
                    />
                  </div>
                </div>

                <div className="space-y-2">
                  <Label htmlFor="gpa">
                    Current GPA <span className="text-red-500">*</span>
                  </Label>
                  <Input
                    id="gpa"
                    type="number"
                    step="0.01"
                    min="0"
                    max="4.0"
                    value={formData.gpa}
                    onChange={(e) =>
                      setFormData((prev) => ({
                        ...prev,
                        gpa: parseFloat(e.target.value) || "",
                      }))
                    }
                    placeholder="3.50"
                    required
                  />
                </div>
              </div>
            </CardContent>
          </Card>

          {/* Election & Position Selection */}
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <Vote className="h-5 w-5" />
                Election & Position Selection
              </CardTitle>
              <CardDescription>
                Choose the election and position you want to run for
              </CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="space-y-2">
                <Label htmlFor="electionId">
                  Election <span className="text-red-500">*</span>
                </Label>
                <Select
                  value={formData.electionId}
                  onValueChange={(value) =>
                    setFormData((prev) => ({
                      ...prev,
                      electionId: value,
                      positionId: "", // Reset position
                    }))
                  }
                  disabled={electionsLoading}
                >
                  <SelectTrigger>
                    <SelectValue
                      placeholder={
                        electionsLoading
                          ? "Loading elections..."
                          : Array.isArray(elections) && elections.length === 0
                          ? "No elections available"
                          : "Select election"
                      }
                    />
                  </SelectTrigger>
                  <SelectContent>
                    {Array.isArray(elections) && elections.length > 0 ? (
                      elections.map((election) => (
                        <SelectItem key={election.id} value={election.id}>
                          {election.title}
                        </SelectItem>
                      ))
                    ) : !electionsLoading ? (
                      <SelectItem value="no-elections" disabled>
                        No elections available for registration
                      </SelectItem>
                    ) : null}
                  </SelectContent>
                </Select>
              </div>

              <div className="space-y-2">
                <Label htmlFor="positionId">
                  Position Running For <span className="text-red-500">*</span>
                </Label>
                {positionsError && (
                  <Alert variant="destructive" className="mb-2">
                    <AlertDescription>
                      Failed to load positions:{" "}
                      {positionsError?.data?.message || "Please try again"}
                    </AlertDescription>
                  </Alert>
                )}

                <Select
                  value={formData.positionId}
                  onValueChange={(value) =>
                    setFormData((prev) => ({ ...prev, positionId: value }))
                  }
                  disabled={!formData.electionId || positionsLoading}
                >
                  <SelectTrigger>
                    <SelectValue
                      placeholder={
                        !formData.electionId
                          ? "Select election first"
                          : positionsLoading
                          ? "Loading positions..."
                          : Array.isArray(positions) && positions.length === 0
                          ? "No positions available"
                          : "Select position"
                      }
                    />
                  </SelectTrigger>
                  <SelectContent>
                    {Array.isArray(positions) && positions.length > 0 ? (
                      positions.map((position) => (
                        <SelectItem
                          key={position.id || position._id}
                          value={position.id || position._id}
                        >
                          <div className="flex items-center gap-2">
                            <Award className="h-4 w-4 text-gray-400" />
                            {position.name || position.title}
                          </div>
                        </SelectItem>
                      ))
                    ) : !positionsLoading && formData.electionId ? (
                      <SelectItem value="no-positions" disabled>
                        No positions available for this election
                      </SelectItem>
                    ) : null}
                  </SelectContent>
                </Select>
              </div>

              {/* ✅ Eligibility Check Display */}
              {eligibilityData && (
                <div
                  className={`p-4 rounded-lg ${
                    eligibilityData.eligible
                      ? "bg-green-50 border border-green-200"
                      : "bg-red-50 border border-red-200"
                  }`}
                >
                  <div className="flex items-center gap-2 mb-2">
                    <AlertCircle
                      className={`h-4 w-4 ${
                        eligibilityData.eligible
                          ? "text-green-600"
                          : "text-red-600"
                      }`}
                    />
                    <span
                      className={`font-medium ${
                        eligibilityData.eligible
                          ? "text-green-800"
                          : "text-red-800"
                      }`}
                    >
                      {eligibilityData.eligible ? "Eligible" : "Not Eligible"}
                    </span>
                  </div>
                  {!eligibilityData.eligible && eligibilityData.errors && (
                    <ul className="text-sm text-red-700 list-disc list-inside">
                      {eligibilityData.errors.map((error, index) => (
                        <li key={index}>{error}</li>
                      ))}
                    </ul>
                  )}
                </div>
              )}

              {formData.electionId && (
                <div className="bg-blue-50 p-4 rounded-lg">
                  <p className="text-sm text-blue-800">
                    <strong>Election Info:</strong>{" "}
                    {elections.find((e) => e.id === formData.electionId)?.title}
                  </p>
                  {elections.find((e) => e.id === formData.electionId)
                    ?.candidateRegistrationPeriod && (
                    <p className="text-sm text-blue-600 mt-1">
                      Registration ends:{" "}
                      {new Date(
                        elections.find(
                          (e) => e.id === formData.electionId
                        )?.candidateRegistrationPeriod.end
                      ).toLocaleDateString()}
                    </p>
                  )}
                </div>
              )}
            </CardContent>
          </Card>

          {/* Campaign Platform */}
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <Target className="h-5 w-5" />
                Campaign Information
              </CardTitle>
              <CardDescription>
                Your campaign message and vision
              </CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="space-y-2">
                <Label htmlFor="campaignSlogan">Campaign Slogan</Label>
                <Input
                  id="campaignSlogan"
                  value={formData.campaignSlogan}
                  onChange={(e) =>
                    setFormData((prev) => ({
                      ...prev,
                      campaignSlogan: e.target.value,
                    }))
                  }
                  placeholder="Your campaign slogan (max 200 characters)"
                  maxLength={200}
                />
              </div>
            </CardContent>
          </Card>

          {/* Required Documents */}
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <FileText className="h-5 w-5" />
                Required Documents
              </CardTitle>
              <CardDescription>
                Upload necessary documents for your candidacy
              </CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="space-y-2">
                <FileUploadPreview
                  file={photo}
                  onFileChange={(e) =>
                    handleFileChange(e.target.files[0], "photo")
                  }
                  id="photo"
                  label="Professional Photo"
                  accept=".jpg,.jpeg,.png,.webp"
                  maxSize="JPG, PNG, WEBP (max 2MB)"
                  required={true}
                  description="Upload a professional headshot for the ballot and campaign materials"
                />
              </div>

              <div className="space-y-2">
                <FileUploadPreview
                  file={transcript}
                  onFileChange={(e) =>
                    handleFileChange(e.target.files[0], "transcript")
                  }
                  id="transcript"
                  label="Academic Transcript"
                  accept=".pdf,.doc,.docx,.jpg,.jpeg,.png"
                  maxSize="PDF, DOC, DOCX, JPG, PNG (max 10MB)"
                  required={true}
                  description="Upload your official transcript for GPA and academic standing verification"
                />
              </div>

              <div className="space-y-2">
                <FileUploadPreview
                  file={manifesto}
                  onFileChange={(e) =>
                    handleFileChange(e.target.files[0], "manifesto")
                  }
                  id="manifestoFile"
                  label="Campaign Manifesto Document"
                  accept=".pdf,.doc,.docx"
                  maxSize="PDF, DOC, DOCX (max 10MB)"
                  required={true}
                  description="Upload a detailed manifesto document (optional - you can also use the text field above)"
                />
              </div>
            </CardContent>
          </Card>

          {/* Terms and Submit */}
          <Card>
            <CardContent className="pt-6 space-y-4">
              <div className="space-y-3">
                <div className="flex items-start space-x-2">
                  <Checkbox
                    checked={!!formData.confirmEligibility}
                    onCheckedChange={(checked) =>
                      setFormData((prev) => ({
                        ...prev,
                        confirmEligibility: checked,
                      }))
                    }
                    required
                  />
                  <Label
                    htmlFor="confirmEligibility"
                    className="text-sm leading-relaxed"
                  >
                    I confirm that I meet all eligibility requirements including
                    minimum GPA, good academic standing, and no disciplinary
                    actions <span className="text-red-500">*</span>
                  </Label>
                </div>

                <div className="flex items-start space-x-2">
                  <Checkbox
                    id="agreeToRules"
                    checked={!!formData.agreeToRules}
                    onCheckedChange={(checked) =>
                      setFormData((prev) => ({
                        ...prev,
                        agreeToRules: checked,
                      }))
                    }
                    required
                  />
                  <Label
                    htmlFor="agreeToRules"
                    className="text-sm leading-relaxed"
                  >
                    I agree to abide by all{" "}
                    <a href="#" className="text-blue-600 hover:underline">
                      Election Rules and Regulations
                    </a>{" "}
                    including campaign spending limits and conduct guidelines{" "}
                    <span className="text-red-500">*</span>
                  </Label>
                </div>

                <div className="flex items-start space-x-2">
                  <Checkbox
                    id="agreeToEthics"
                    checked={!!formData.agreeToEthics}
                    onCheckedChange={(checked) =>
                      setFormData((prev) => ({
                        ...prev,
                        agreeToEthics: checked,
                      }))
                    }
                    required
                  />
                  <Label
                    htmlFor="agreeToEthics"
                    className="text-sm leading-relaxed"
                  >
                    I pledge to run an ethical campaign and accept the{" "}
                    <a href="#" className="text-blue-600 hover:underline">
                      Student Code of Ethics
                    </a>{" "}
                    <span className="text-red-500">*</span>
                  </Label>
                </div>
              </div>

              <div className="bg-blue-50 p-4 rounded-lg">
                <p className="text-sm text-blue-800">
                  <strong>Important:</strong> Your registration will be reviewed
                  by the Election Committee. You will be notified within 48
                  hours of approval status. Campaign activities may only begin
                  after official approval.
                </p>
              </div>

              <Button
                type="submit"
                className="w-full bg-blue-600 hover:bg-blue-700"
                size="lg"
                disabled={
                  registrationLoading ||
                  !formData.confirmEligibility ||
                  !formData.agreeToRules ||
                  !formData.agreeToEthics ||
                  (eligibilityData && !eligibilityData.eligible)
                }
              >
                {registrationLoading ? (
                  <>
                    <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                    Submitting Registration...
                  </>
                ) : (
                  "Submit Candidate Registration"
                )}
              </Button>
            </CardContent>
          </Card>
        </form>
      </div>
    </div>
  );
};

export default CandidateRegistration;
