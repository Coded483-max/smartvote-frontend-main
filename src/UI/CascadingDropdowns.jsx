import React, { useState, useEffect } from "react";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Label } from "@/components/ui/label";
import { Skeleton } from "@/components/ui/skeleton";
import { Alert, AlertDescription } from "@/components/ui/alert";
import { AlertCircle, GraduationCap, Building } from "lucide-react";
import {
  useGetCollegesQuery,
  useGetDepartmentsByCollegeQuery,
} from "../../api/dataApi";

const CascadingDropdowns = ({
  onCollegeChange,
  onDepartmentChange,
  selectedCollege = "",
  selectedDepartment = "",
  disabled = false,
  className = "",
  showIcons = true,
}) => {
  const [college, setCollege] = useState(selectedCollege);
  const [department, setDepartment] = useState(selectedDepartment);

  // Fetch colleges
  const {
    data: colleges = [],
    isLoading: collegesLoading,
    error: collegesError,
  } = useGetCollegesQuery();

  // Fetch departments for selected college
  const {
    data: departments = [],
    isLoading: departmentsLoading,
    error: departmentsError,
  } = useGetDepartmentsByCollegeQuery(college, {
    skip: !college,
  });

  // Handle college selection
  const handleCollegeChange = (selectedCollege) => {
    setCollege(selectedCollege);
    setDepartment(""); // Reset department

    onCollegeChange?.(selectedCollege);
    onDepartmentChange?.(""); // Reset department in parent
  };

  // Handle department selection
  const handleDepartmentChange = (selectedDept) => {
    setDepartment(selectedDept);
    onDepartmentChange?.(selectedDept);
  };

  // Update local state when props change
  useEffect(() => {
    setCollege(selectedCollege);
  }, [selectedCollege]);

  useEffect(() => {
    setDepartment(selectedDepartment);
  }, [selectedDepartment]);

  return (
    <div className={`space-y-6 ${className}`}>
      {/* College Selection */}
      <div className="space-y-2">
        <Label
          htmlFor="college"
          className="text-sm font-medium flex items-center gap-2"
        >
          {showIcons && <Building className="h-4 w-4" />}
          College *
        </Label>

        {collegesLoading ? (
          <Skeleton className="h-10 w-full" />
        ) : collegesError ? (
          <Alert variant="destructive">
            <AlertCircle className="h-4 w-4" />
            <AlertDescription>
              Failed to load colleges. Please try again.
            </AlertDescription>
          </Alert>
        ) : (
          <Select
            value={college}
            onValueChange={handleCollegeChange}
            disabled={disabled}
          >
            <SelectTrigger className="w-full">
              <SelectValue placeholder="Select college" />
            </SelectTrigger>
            <SelectContent>
              {colleges.map((collegeItem) => (
                <SelectItem key={collegeItem.id} value={collegeItem.value}>
                  <div className="flex items-center gap-2">
                    {showIcons && (
                      <Building className="h-4 w-4 text-muted-foreground" />
                    )}
                    <span>{collegeItem.name}</span>
                  </div>
                </SelectItem>
              ))}
            </SelectContent>
          </Select>
        )}
      </div>

      {/* Department Selection */}
      <div className="space-y-2">
        <Label
          htmlFor="department"
          className="text-sm font-medium flex items-center gap-2"
        >
          {showIcons && <GraduationCap className="h-4 w-4" />}
          Department *
        </Label>

        {!college ? (
          <Select disabled>
            <SelectTrigger className="w-full">
              <SelectValue placeholder="Select college first" />
            </SelectTrigger>
          </Select>
        ) : departmentsLoading ? (
          <Skeleton className="h-10 w-full" />
        ) : departmentsError ? (
          <Alert variant="destructive">
            <AlertCircle className="h-4 w-4" />
            <AlertDescription>
              Failed to load departments. Please try again.
            </AlertDescription>
          </Alert>
        ) : (
          <Select
            value={department}
            onValueChange={handleDepartmentChange}
            disabled={disabled || !college}
          >
            <SelectTrigger className="w-full">
              <SelectValue placeholder="Select department" />
            </SelectTrigger>
            <SelectContent>
              {departments.map((deptItem) => (
                <SelectItem key={deptItem.id} value={deptItem.value}>
                  <div className="flex items-center gap-2">
                    {showIcons && (
                      <GraduationCap className="h-4 w-4 text-muted-foreground" />
                    )}
                    <span>{deptItem.name}</span>
                  </div>
                </SelectItem>
              ))}
            </SelectContent>
          </Select>
        )}

        {/* No departments message */}
        {college &&
          departments.length === 0 &&
          !departmentsLoading &&
          !departmentsError && (
            <p className="text-sm text-muted-foreground">
              No departments found for selected college.
            </p>
          )}
      </div>

      {/* Selection Summary */}
      {college && department && (
        <div className="p-4 bg-green-50 dark:bg-green-950 border border-green-200 dark:border-green-800 rounded-lg">
          <div className="flex items-start gap-3">
            <div className="flex-shrink-0">
              <div className="w-2 h-2 bg-green-500 rounded-full mt-2"></div>
            </div>
            <div className="min-w-0 flex-1">
              <p className="text-sm font-medium text-green-900 dark:text-green-100">
                Academic Information Selected
              </p>
              <p className="text-sm text-green-700 dark:text-green-300 mt-1">
                <strong>College:</strong>{" "}
                {colleges.find((c) => c.value === college)?.name}
              </p>
              <p className="text-sm text-green-700 dark:text-green-300">
                <strong>Department:</strong>{" "}
                {departments.find((d) => d.value === department)?.name}
              </p>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default CascadingDropdowns;
