import { useState, useEffect } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { Checkbox } from "@/components/ui/checkbox";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Badge } from "@/components/ui/badge";
import { Alert, AlertDescription } from "@/components/ui/alert";
import { Skeleton } from "@/components/ui/skeleton";
import {
  X,
  Plus,
  Users,
  Settings,
  FileText,
  Eye,
  CheckCircle,
  Building,
  GraduationCap,
} from "lucide-react";
import {
  useCreateElectionMutation,
  useGetPositionsByLevelQuery,
  useGetElectionPositionsQuery,
  useGetCandidatesQuery,
  useGetVotersQuery,
} from "../api/superAdminsApiSlice";
import {
  useGetCollegesQuery,
  useGetDepartmentsByCollegeQuery,
} from "@/api/dataApi";
import DateTimePicker from "../UI/DateTimePicker";
import { toast } from "react-toastify";

const VALID_LEVELS = [
  "university",
  "college",
  "departmental", // Changed from "department"
  "custom",
];

const ElectionCreationForm = ({
  isModal = false,
  onClose,
  error,
  setError,
  onSuccess,
}) => {
  const [createElection, { isLoading: isCreating }] =
    useCreateElectionMutation();
  const { data: candidates = [], isLoading: candidatesLoading } =
    useGetCandidatesQuery();
  const { data: voters = [], isLoading: votersLoading } = useGetVotersQuery();

  // Form state
  const [formData, setFormData] = useState({
    title: "",
    description: "",
    level: "university",
    customLevelName: "",
    // ✅ NEW: College and department fields
    college: "",
    department: "",
    yearOfStudy: "", // Optional filter
    startDate: null,
    endDate: null,
    candidateRegStart: null,
    candidateRegEnd: null,
    campaignStart: null,
    campaignEnd: null,
    voteStart: null,
    voteEnd: null,
    requireGPA: false,
    minGPA: "",
    rules: "",
    features: {
      commentsEnabled: true,
      liveResultsEnabled: false,
    },
  });

  // ✅ NEW: Data queries for college and department
  const {
    data: colleges = [],
    isLoading: collegesLoading,
    error: collegesError,
  } = useGetCollegesQuery();

  console.log(colleges);

  const {
    data: departments = [],
    isLoading: departmentsLoading,
    error: departmentsError,
  } = useGetDepartmentsByCollegeQuery(formData?.college, {
    skip: !formData?.college,
  });

  console.log(departments);

  const [errors, setErrors] = useState({});

  // ✅ Fetch positions when level changes
  const {
    data: positionsData,
    isLoading: positionsLoading,
    error: positionsError,
  } = useGetPositionsByLevelQuery(
    { level: formData.level },
    {
      skip:
        !formData.level ||
        formData.level === "custom" ||
        (formData.level === "college" && !formData.college) ||
        (formData.level === "departmental" &&
          (!formData.college || !formData.department)),
      refetchOnMountOrArgChange: true,
    }
  );

  console.log(positionsData);

  const handleInputChange = (field, value) => {
    setFormData((prev) => ({
      ...prev,
      [field]: value,
    }));
    // Clear error when user starts typing
    if (errors[field]) {
      setErrors((prev) => ({
        ...prev,
        [field]: "",
      }));
    }
  };

  // ✅ NEW: Handle college change and reset department
  const handleCollegeChange = (selectedCollege) => {
    setFormData((prev) => ({
      ...prev,
      college: selectedCollege,
      department: "", // Reset department when college changes
    }));
    // Clear errors
    if (errors.college) {
      setErrors((prev) => ({
        ...prev,
        college: "",
        department: "",
      }));
    }
  };

  // ✅ NEW: Handle level change and reset scope fields
  const handleLevelChange = (selectedLevel) => {
    setFormData((prev) => ({
      ...prev,
      level: selectedLevel,
      // Reset scope fields when level changes
      college: "",
      department: "",
      yearOfStudy: "",
    }));
    // Clear errors
    if (errors.level) {
      setErrors((prev) => ({
        ...prev,
        level: "",
        college: "",
        department: "",
      }));
    }
  };

  const handleFeatureChange = (feature, value) => {
    setFormData((prev) => ({
      ...prev,
      features: {
        ...prev.features,
        [feature]: value,
      },
    }));
  };

  const validateForm = () => {
    const errors = {};

    // Required fields validation
    if (!formData.title.trim()) {
      errors.title = "Election title is required";
    }

    if (!formData.description.trim()) {
      errors.description = "Election description is required";
    }

    if (!formData.level) {
      errors.level = "Election level is required";
    }

    // Custom level validation
    if (formData.level === "custom" && !formData.customLevelName.trim()) {
      errors.customLevelName = "Custom level name is required";
    }

    // ✅ NEW: College and department validation
    if (formData.level === "college" && !formData.college) {
      errors.college = "College is required for college-level elections";
    }

    if (formData.level === "departmental") {
      if (!formData.college) {
        errors.college = "College is required for departmental elections";
      }
      if (!formData.department) {
        errors.department = "Department is required for departmental elections";
      }
    }

    // Date validation
    if (!formData.startDate) {
      errors.startDate = "Election start date is required";
    }

    if (!formData.endDate) {
      errors.endDate = "Election end date is required";
    }

    // Date logic validation
    if (formData.startDate && formData.endDate) {
      const startDate = new Date(formData.startDate);
      const endDate = new Date(formData.endDate);

      if (startDate >= endDate) {
        errors.endDate = "End date must be after start date";
      }

      const now = new Date();
      const nowPlus5Min = new Date(now.getTime() + 5 * 60000); // 5 minutes buffer
      if (startDate < nowPlus5Min) {
        errors.startDate =
          "Start date must be at least 5 minutes in the future";
      }
    }

    // GPA validation
    if (formData.requireGPA) {
      const gpa = parseFloat(formData.minGPA);
      if (!formData.minGPA || isNaN(gpa) || gpa < 0 || gpa > 4) {
        errors.minGPA = "Please enter a valid GPA between 0.0 and 4.0";
      }
    }

    return errors;
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    // Clear any existing errors
    if (setError) {
      setError(null);
    }

    // Validate form
    const validationErrors = validateForm();
    if (Object.keys(validationErrors).length > 0) {
      setErrors(validationErrors);

      // Show which tab has errors
      const hasBasicErrors =
        validationErrors.title ||
        validationErrors.description ||
        validationErrors.level ||
        validationErrors.customLevelName ||
        validationErrors.college ||
        validationErrors.department;
      const hasDateErrors =
        validationErrors.startDate || validationErrors.endDate;
      const hasSettingErrors = validationErrors.minGPA;

      if (hasBasicErrors) {
        toast.error("Please check the Basic Info tab for errors");
      } else if (hasDateErrors) {
        toast.error("Please check the Dates tab for errors");
      } else if (hasSettingErrors) {
        toast.error("Please check the Settings tab for errors");
      }

      return;
    }

    try {
      // ✅ Send payload with college and department fields
      const payload = {
        title: formData.title.trim(),
        description: formData.description.trim(),
        level: formData.level,
        ...(formData.level === "custom" && {
          customLevelName: formData.customLevelName.trim(),
        }),
        // ✅ NEW: Include college and department for specific levels
        ...(formData.level === "college" && {
          college: formData.college,
        }),
        ...(formData.level === "departmental" && {
          college: formData.college,
          department: formData.department,
        }),
        // ✅ NEW: Include year filter if specified
        ...(formData.yearOfStudy && {
          yearOfStudy: parseInt(formData.yearOfStudy),
        }),
        startDate: formData.startDate,
        endDate: formData.endDate,
        ...(formData.candidateRegStart && {
          candidateRegStart: formData.candidateRegStart,
        }),
        ...(formData.candidateRegEnd && {
          candidateRegEnd: formData.candidateRegEnd,
        }),
        ...(formData.campaignStart && {
          campaignStart: formData.campaignStart,
        }),
        ...(formData.campaignEnd && { campaignEnd: formData.campaignEnd }),
        ...(formData.voteStart && { voteStart: formData.voteStart }),
        ...(formData.voteEnd && { voteEnd: formData.voteEnd }),
        requireGPA: formData.requireGPA,
        ...(formData.requireGPA && { minGPA: parseFloat(formData.minGPA) }),
        rules: formData.rules.trim(),
        features: formData.features,
      };

      console.log("🚀 Submitting election payload:", payload);

      const result = await createElection(payload).unwrap();

      console.log(`Election created successfully:`, result);

      // Success handling
      toast.success(
        `Election created successfully with ${
          result.election?.positionCount || 0
        } positions and ${
          result.election?.eligibleVoters?.count || 0
        } eligible voters!`
      );
      resetForm();

      // Call success callback if provided
      if (onSuccess) {
        onSuccess(result);
      }

      // Close modal if in modal mode
      if (isModal && onClose) {
        onClose();
      }
    } catch (error) {
      console.error("Election creation error:", error);

      // Set error in parent component if setError is provided
      if (setError) {
        setError(
          error?.data?.message || error?.message || "Failed to create election"
        );
      }

      // Also show toast
      toast.error(
        error?.data?.message || error?.message || "Failed to create election"
      );
    }
  };

  const resetForm = () => {
    setFormData({
      title: "",
      description: "",
      level: "university",
      customLevelName: "",
      // ✅ NEW: Reset college and department
      college: "",
      department: "",
      yearOfStudy: "",
      startDate: null,
      endDate: null,
      candidateRegStart: null,
      candidateRegEnd: null,
      campaignStart: null,
      campaignEnd: null,
      voteStart: null,
      voteEnd: null,
      requireGPA: false,
      minGPA: "",
      rules: "",
      features: {
        commentsEnabled: true,
        liveResultsEnabled: false,
      },
    });
    setErrors({});
  };

  return (
    <div className={isModal ? "p-6" : "max-w-4xl mx-auto p-6"}>
      <Card className={isModal ? "shadow-none border-0" : ""}>
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <FileText className="h-5 w-5" />
            Create New Election
          </CardTitle>
          <CardDescription>
            Set up a new election with all necessary details. All positions for
            your selected level will be automatically included, and eligible
            voters will be determined based on your scope selection.
          </CardDescription>
        </CardHeader>
        <CardContent>
          <form onSubmit={handleSubmit} className="space-y-6">
            <Tabs defaultValue="basic" className="w-full">
              <TabsList className="grid w-full grid-cols-4">
                <TabsTrigger value="basic">Basic Info</TabsTrigger>
                <TabsTrigger value="positions">Positions Preview</TabsTrigger>
                <TabsTrigger value="dates">Dates</TabsTrigger>
                <TabsTrigger value="settings">Settings</TabsTrigger>
              </TabsList>

              <TabsContent value="basic" className="space-y-4">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div className="space-y-2">
                    <Label htmlFor="title">Election Title *</Label>
                    <Input
                      id="title"
                      value={formData.title}
                      onChange={(e) =>
                        handleInputChange("title", e.target.value)
                      }
                      placeholder="Enter election title"
                    />
                    {errors.title && (
                      <p className="text-sm text-red-500">{errors.title}</p>
                    )}
                  </div>

                  <div className="space-y-2">
                    <Label htmlFor="level">Election Level *</Label>
                    <Select
                      value={formData.level}
                      onValueChange={handleLevelChange}
                    >
                      <SelectTrigger className="w-full min-w-0 flex-1">
                        <SelectValue placeholder="Select level" />
                      </SelectTrigger>
                      <SelectContent>
                        {VALID_LEVELS.map((level) => (
                          <SelectItem key={level} value={level}>
                            {level.charAt(0).toUpperCase() + level.slice(1)}
                          </SelectItem>
                        ))}
                      </SelectContent>
                    </Select>
                    {errors.level && (
                      <p className="text-sm text-red-500">{errors.level}</p>
                    )}
                  </div>
                </div>

                {formData.level === "custom" && (
                  <div className="space-y-2">
                    <Label htmlFor="customLevelName">Custom Level Name *</Label>
                    <Input
                      id="customLevelName"
                      value={formData.customLevelName}
                      onChange={(e) =>
                        handleInputChange("customLevelName", e.target.value)
                      }
                      placeholder="Enter custom level name"
                    />
                    {errors.customLevelName && (
                      <p className="text-sm text-red-500">
                        {errors.customLevelName}
                      </p>
                    )}
                  </div>
                )}

                {/* ✅ NEW: College and Department Selection */}
                {(formData.level === "college" ||
                  formData.level === "departmental") && (
                  <div className="space-y-4 p-4 border rounded-lg bg-blue-50 dark:bg-blue-950">
                    <div className="flex items-center gap-2 text-blue-700 dark:text-blue-300">
                      <Building className="h-5 w-5" />
                      <h3 className="font-medium">Election Scope</h3>
                    </div>
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                      {/* ✅ College Selection - EXACT COPY FROM REGISTER */}
                      <div className="space-y-2">
                        <Label className="text-sm font-medium text-gray-700 flex items-center gap-2">
                          <Building className="h-4 w-4" />
                          College *
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
                              <SelectValue placeholder="Select college" />
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
                        {errors.college && (
                          <p className="text-sm text-red-500">
                            {errors.college}
                          </p>
                        )}
                      </div>

                      {/* ✅ Department Selection - EXACT COPY FROM REGISTER */}
                      {formData.level === "departmental" && (
                        <div className="space-y-2">
                          <Label className="text-sm font-medium text-gray-700 flex items-center gap-2">
                            <GraduationCap className="h-4 w-4" />
                            Department *
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
                                handleInputChange("department", value)
                              }
                            >
                              <SelectTrigger className="h-12 rounded-xl border-gray-200">
                                <SelectValue placeholder="Select department" />
                              </SelectTrigger>
                              <SelectContent>
                                {departments.map((deptItem) => (
                                  <SelectItem
                                    key={deptItem.id}
                                    value={deptItem.value}
                                  >
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
                          {errors.department && (
                            <p className="text-sm text-red-500">
                              {errors.department}
                            </p>
                          )}
                        </div>
                      )}
                    </div>
                    {/* ✅ Selection Summary - SAME PATTERN AS REGISTER */}
                    {/* {formData.college && formData.department && (
                      <div className="p-4 bg-green-50 border border-green-200 rounded-xl">
                        <div className="flex items-start gap-3">
                          <div className="w-2 h-2 bg-green-500 rounded-full mt-2"></div>
                          <div>
                            <p className="text-sm font-medium text-green-900">
                              Election Scope Selected
                            </p>
                            <p className="text-sm text-green-700 mt-1">
                              <strong>College:</strong>{" "}
                              {
                                colleges.find(
                                  (c) => c.value === formData.college
                                )?.name
                              }
                            </p>
                            <p className="text-sm text-green-700">
                              <strong>Department:</strong>{" "}
                              {
                                departments.find(
                                  (d) => d.value === formData.department
                                )?.name
                              }
                            </p>
                          </div>
                        </div>
                      </div>
                    )} */}
                    {/* Optional Year Filter */}
                    {/* <div className="space-y-2">
                      <Label htmlFor="yearOfStudy">
                        Year of Study Filter (Optional)
                      </Label>
                      <Select
                        value={formData.yearOfStudy}
                        onValueChange={(value) =>
                          handleInputChange("yearOfStudy", value)
                        }
                      >
                        <SelectTrigger>
                          <SelectValue placeholder="All years (no filter)" />
                        </SelectTrigger>
                        <SelectContent>
                          <SelectItem value="">All years</SelectItem>
                          <SelectItem value="1">Level 100 only</SelectItem>
                          <SelectItem value="2">Level 200 only</SelectItem>
                          <SelectItem value="3">Level 300 only</SelectItem>
                          <SelectItem value="4">Level 400 only</SelectItem>
                          <SelectItem value="5">Level 500 only</SelectItem>
                          <SelectItem value="6">Level 600 only</SelectItem>
                          <SelectItem value="7">Level 700 only</SelectItem>
                        </SelectContent>
                      </Select>
                      <p className="text-xs text-gray-500">
                        Leave empty to include all students from the selected{" "}
                        {formData.level === "departmental"
                          ? "department"
                          : "college"}
                      </p>
                    </div> */}
                    {/* Selection Summary */}
                    {(formData.college || formData.department) && (
                      <div className="p-3 bg-white dark:bg-gray-800 border border-blue-200 dark:border-blue-800 rounded-md">
                        <div className="flex items-start gap-3">
                          <CheckCircle className="h-4 w-4 text-green-500 mt-0.5" />
                          <div className="space-y-1">
                            <p className="text-sm font-medium text-green-900 dark:text-green-100">
                              Election Scope Selected
                            </p>
                            {formData.college && (
                              <p className="text-sm text-gray-700 dark:text-gray-300">
                                <strong>College:</strong>{" "}
                                {
                                  colleges.find(
                                    (c) => c.value === formData.college
                                  )?.name
                                }
                              </p>
                            )}
                            {formData.department && (
                              <p className="text-sm text-gray-700 dark:text-gray-300">
                                <strong>Department:</strong>{" "}
                                {
                                  departments.find(
                                    (d) => d.value === formData.department
                                  )?.name
                                }
                              </p>
                            )}
                            {formData.yearOfStudy && (
                              <p className="text-sm text-gray-700 dark:text-gray-300">
                                <strong>Year Filter:</strong> Level{" "}
                                {formData.yearOfStudy}00 only
                              </p>
                            )}
                            <p className="text-xs text-gray-500 dark:text-gray-400">
                              Only verified voters meeting these criteria can
                              participate
                            </p>
                          </div>
                        </div>
                      </div>
                    )}
                  </div>
                )}

                <div className="space-y-2">
                  <Label htmlFor="description">Description *</Label>
                  <Textarea
                    id="description"
                    value={formData.description}
                    onChange={(e) =>
                      handleInputChange("description", e.target.value)
                    }
                    placeholder="Enter election description"
                    rows={4}
                  />
                  {errors.description && (
                    <p className="text-sm text-red-500">{errors.description}</p>
                  )}
                </div>

                <div className="space-y-2">
                  <Label htmlFor="rules">Election Rules</Label>
                  <Textarea
                    id="rules"
                    value={formData.rules}
                    onChange={(e) => handleInputChange("rules", e.target.value)}
                    placeholder="Enter election rules and guidelines"
                    rows={3}
                  />
                </div>
              </TabsContent>

              {/* ✅ Updated Positions Preview Tab to show scope info */}
              <TabsContent value="positions" className="space-y-4">
                <div className="space-y-4">
                  <div className="flex items-center gap-2">
                    <Eye className="h-5 w-5" />
                    <h3 className="text-lg font-medium">Available Positions</h3>
                    <Badge variant="outline">
                      {formData.level.charAt(0).toUpperCase() +
                        formData.level.slice(1)}{" "}
                      Level
                    </Badge>
                    {/* ✅ NEW: Show scope in badge */}
                    {formData.level === "departmental" &&
                      formData.department && (
                        <Badge variant="secondary">
                          {
                            departments.find(
                              (d) => d.value === formData.department
                            )?.name
                          }
                        </Badge>
                      )}
                    {formData.level === "college" && formData.college && (
                      <Badge variant="secondary">
                        {
                          colleges.find((c) => c.value === formData.college)
                            ?.name
                        }
                      </Badge>
                    )}
                  </div>

                  {/* ✅ Show scope warning if not selected */}
                  {formData.level === "college" && !formData.college && (
                    <Alert>
                      <Building className="h-4 w-4" />
                      <AlertDescription>
                        Please select a college in the Basic Info tab to see
                        position templates.
                      </AlertDescription>
                    </Alert>
                  )}

                  {formData.level === "departmental" &&
                    (!formData.college || !formData.department) && (
                      <Alert>
                        <Building className="h-4 w-4" />
                        <AlertDescription>
                          Please select both college and department in the Basic
                          Info tab to see position templates.
                        </AlertDescription>
                      </Alert>
                    )}

                  {formData.level === "custom" ? (
                    <Card className="p-4 bg-blue-50 dark:bg-blue-950">
                      <div className="flex items-center gap-2 text-blue-700 dark:text-blue-300">
                        <CheckCircle className="h-4 w-4" />
                        <p className="text-sm">
                          Custom level election will include a default
                          representative position. You can modify positions
                          after creation.
                        </p>
                      </div>
                    </Card>
                  ) : positionsLoading ? (
                    <div className="text-center py-8">
                      <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-primary mx-auto"></div>
                      <p className="text-sm text-muted-foreground mt-2">
                        Loading positions...
                      </p>
                    </div>
                  ) : positionsError ? (
                    <Card className="p-4 bg-yellow-50 dark:bg-yellow-950">
                      <div className="flex items-center gap-2 text-yellow-700 dark:text-yellow-300">
                        <CheckCircle className="h-4 w-4" />
                        <p className="text-sm">
                          No predefined positions found. A default position will
                          be created.
                        </p>
                      </div>
                    </Card>
                  ) : (
                    <div className="space-y-3">
                      <div className="text-sm text-muted-foreground">
                        The following positions will be automatically included
                        in your election:
                      </div>

                      <div className="grid gap-3">
                        {positionsData?.positions?.map((position, index) => (
                          <Card key={position.id || index} className="p-4">
                            <div className="flex items-start justify-between">
                              <div className="space-y-1">
                                <div className="flex items-center gap-2">
                                  <h4 className="font-medium">
                                    {position.name}
                                  </h4>
                                  <Badge
                                    variant="secondary"
                                    className="text-xs"
                                  >
                                    #{position.order || index + 1}
                                  </Badge>
                                </div>
                                {position.description && (
                                  <p className="text-sm text-muted-foreground">
                                    {position.description}
                                  </p>
                                )}
                                {position.defaultRequirements && (
                                  <div className="flex flex-wrap gap-1 mt-2">
                                    {position.defaultRequirements.minGPA >
                                      0 && (
                                      <Badge
                                        variant="outline"
                                        className="text-xs"
                                      >
                                        Min GPA:{" "}
                                        {position.defaultRequirements.minGPA}
                                      </Badge>
                                    )}
                                    {position.defaultRequirements.minYear >
                                      1 && (
                                      <Badge
                                        variant="outline"
                                        className="text-xs"
                                      >
                                        Min Year:{" "}
                                        {position.defaultRequirements.minYear}
                                      </Badge>
                                    )}
                                  </div>
                                )}
                              </div>
                              <CheckCircle className="h-5 w-5 text-green-500 mt-0.5" />
                            </div>
                          </Card>
                        ))}
                      </div>

                      <Card className="p-4 bg-green-50 dark:bg-green-950">
                        <div className="flex items-center gap-2 text-green-700 dark:text-green-300">
                          <CheckCircle className="h-4 w-4" />
                          <p className="text-sm">
                            All {positionsData?.positionCount || 0} positions
                            will be automatically included when you create the
                            election.
                          </p>
                        </div>
                      </Card>
                    </div>
                  )}
                </div>
              </TabsContent>

              {/* ✅ Keep your existing Dates tab */}
              <TabsContent value="dates" className="space-y-4">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div className="space-y-2">
                    <Label>Election Start Date *</Label>
                    <DateTimePicker
                      date={formData.startDate}
                      setDate={(date) => handleInputChange("startDate", date)}
                      placeholder="Select start date and time"
                    />
                    {errors.startDate && (
                      <p className="text-sm text-red-500">{errors.startDate}</p>
                    )}
                  </div>

                  <div className="space-y-2">
                    <Label>Election End Date *</Label>
                    <DateTimePicker
                      date={formData.endDate}
                      setDate={(date) => handleInputChange("endDate", date)}
                      placeholder="Select end date and time"
                    />
                    {errors.endDate && (
                      <p className="text-sm text-red-500">{errors.endDate}</p>
                    )}
                  </div>
                </div>

                <div className="space-y-4">
                  <h3 className="text-lg font-medium">Optional Phase Dates</h3>

                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <div className="space-y-2">
                      <Label>Candidate Registration Start</Label>
                      <DateTimePicker
                        date={formData.candidateRegStart}
                        setDate={(date) =>
                          handleInputChange("candidateRegStart", date)
                        }
                        placeholder="Select registration start"
                      />
                      {errors.candidateRegEnd && (
                        <p className="text-sm text-red-500">
                          {errors.candidateRegEnd}
                        </p>
                      )}
                    </div>

                    <div className="space-y-2">
                      <Label>Candidate Registration End</Label>
                      <DateTimePicker
                        date={formData.candidateRegEnd}
                        setDate={(date) =>
                          handleInputChange("candidateRegEnd", date)
                        }
                        placeholder="Select registration end"
                      />
                      {errors.candidateRegEnd && (
                        <p className="text-sm text-red-500">
                          {errors.candidateRegEnd}
                        </p>
                      )}
                    </div>
                  </div>

                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <div className="space-y-2">
                      <Label>Campaign Start</Label>
                      <DateTimePicker
                        date={formData.campaignStart}
                        setDate={(date) =>
                          handleInputChange("campaignStart", date)
                        }
                        placeholder="Select campaign start"
                      />
                      {errors.campaignEnd && (
                        <p className="text-sm text-red-500">
                          {errors.campaignEnd}
                        </p>
                      )}
                    </div>

                    <div className="space-y-2">
                      <Label>Campaign End</Label>
                      <DateTimePicker
                        date={formData.campaignEnd}
                        setDate={(date) =>
                          handleInputChange("campaignEnd", date)
                        }
                        placeholder="Select campaign end"
                      />
                      {errors.campaignEnd && (
                        <p className="text-sm text-red-500">
                          {errors.campaignEnd}
                        </p>
                      )}
                    </div>
                  </div>

                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <div className="space-y-2">
                      <Label>Voting Start</Label>
                      <DateTimePicker
                        date={formData.voteStart}
                        setDate={(date) => handleInputChange("voteStart", date)}
                        placeholder="Select voting start"
                      />
                      {errors.voteEnd && (
                        <p className="text-sm text-red-500">{errors.voteEnd}</p>
                      )}
                    </div>

                    <div className="space-y-2">
                      <Label>Voting End</Label>
                      <DateTimePicker
                        date={formData.voteEnd}
                        setDate={(date) => handleInputChange("voteEnd", date)}
                        placeholder="Select voting end"
                      />
                      {errors.voteEnd && (
                        <p className="text-sm text-red-500">{errors.voteEnd}</p>
                      )}
                    </div>
                  </div>
                </div>
              </TabsContent>

              {/* ✅ Keep your existing Settings tab */}
              <TabsContent value="settings" className="space-y-6">
                <div className="space-y-4">
                  <div className="flex items-center gap-2">
                    <Settings className="h-5 w-5" />
                    <h3 className="text-lg font-medium">
                      Candidate Requirements
                    </h3>
                  </div>
                  <p className="text-sm text-muted-foreground">
                    These requirements apply to candidates only, not voters.
                    Voters are automatically eligible based on the election
                    scope above.
                  </p>

                  <div className="flex items-center space-x-2">
                    <Checkbox
                      id="requireGPA"
                      checked={formData.requireGPA}
                      onCheckedChange={(checked) =>
                        handleInputChange("requireGPA", !!checked)
                      }
                    />
                    <Label htmlFor="requireGPA">
                      Require minimum GPA for candidates
                    </Label>
                  </div>

                  {formData.requireGPA && (
                    <div className="space-y-2 ml-6">
                      <Label htmlFor="minGPA">Minimum GPA (0.0 - 4.0)</Label>
                      <Input
                        id="minGPA"
                        type="number"
                        step="0.1"
                        min="0"
                        max="4"
                        value={formData.minGPA}
                        onChange={(e) =>
                          handleInputChange("minGPA", e.target.value)
                        }
                        placeholder="3.0"
                      />
                      {errors.minGPA && (
                        <p className="text-sm text-red-500">{errors.minGPA}</p>
                      )}
                    </div>
                  )}
                </div>

                <div className="space-y-4">
                  <h3 className="text-lg font-medium">Election Features</h3>

                  <div className="flex items-center space-x-2">
                    <Checkbox
                      id="commentsEnabled"
                      checked={formData.features.commentsEnabled}
                      onCheckedChange={(checked) =>
                        handleFeatureChange("commentsEnabled", !!checked)
                      }
                    />
                    <Label htmlFor="commentsEnabled">Enable comments</Label>
                  </div>

                  <div className="flex items-center space-x-2">
                    <Checkbox
                      id="liveResultsEnabled"
                      checked={formData.features.liveResultsEnabled}
                      onCheckedChange={(checked) =>
                        handleFeatureChange("liveResultsEnabled", !!checked)
                      }
                    />
                    <Label htmlFor="liveResultsEnabled">
                      Enable live results
                    </Label>
                  </div>
                </div>
              </TabsContent>
            </Tabs>

            <div className="flex justify-end space-x-2 pt-6 border-t">
              <Button type="button" variant="outline" onClick={resetForm}>
                Reset Form
              </Button>
              <Button type="submit" disabled={isCreating}>
                {isCreating
                  ? "Creating..."
                  : `Create Election${
                      positionsData?.positionCount
                        ? ` (${positionsData.positionCount} positions)`
                        : ""
                    }`}
              </Button>
            </div>
          </form>
        </CardContent>
      </Card>
    </div>
  );
};

export default ElectionCreationForm;
