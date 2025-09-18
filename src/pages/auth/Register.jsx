import React, { useState, useEffect } from "react";
import { Link, useNavigate, useLocation } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import {
  Eye,
  EyeOff,
  Mail,
  Lock,
  User,
  ArrowRight,
  IdCard,
  Building,
  GraduationCap,
  Calendar,
  Phone,
} from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Checkbox } from "@/components/ui/checkbox";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Progress } from "@/components/ui/progress";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Skeleton } from "@/components/ui/skeleton";
import { Alert, AlertDescription } from "@/components/ui/alert";

import { useRegisterMutation } from "@/api/usersApiSlice";
import {
  useGetCollegesQuery,
  useGetDepartmentsByCollegeQuery,
  useGetAcademicYearsQuery,
} from "@/api/dataApi";
import { toast } from "react-toastify";
import { setVoterCredentials } from "@/api/authSlice";
import Logo from "@/UI/Logo";
import ToastTest from "@/UI/ToastTest";

const Register = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const [register, { isLoading }] = useRegisterMutation();

  const { search } = useLocation();

  const sp = new URLSearchParams(search);
  const redirect = sp.get("redirect") || "/verify-email";

  // Form state
  const [firstName, setFirstName] = useState("");
  const [lastName, setLastName] = useState("");
  const [studentId, setStudentId] = useState("");
  const [email, setEmail] = useState("");
  const [mobileNumber, setMobileNumber] = useState("");
  const [college, setCollege] = useState("");
  const [department, setDepartment] = useState("");
  const [yearOfStudy, setYearOfStudy] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);
  const [agreeToTerms, setAgreeToTerms] = useState(false);
  const [subscribeNewsletter, setSubscribeNewsletter] = useState(false);

  // RTK Query for cascading dropdowns
  const {
    data: colleges = [],
    isLoading: collegesLoading,
    error: collegesError,
  } = useGetCollegesQuery();

  const {
    data: departments = [],
    isLoading: departmentsLoading,
    error: departmentsError,
  } = useGetDepartmentsByCollegeQuery(college, {
    skip: !college,
  });
  console.log(departments);

  const {
    data: years = [],
    isLoading: yearsLoading,
    error: yearsError,
  } = useGetAcademicYearsQuery();

  console.log(years);

  // Handle college change
  const handleCollegeChange = (selectedCollege) => {
    setCollege(selectedCollege);
    setDepartment(""); // Reset department when college changes
  };

  const getPasswordStrength = () => {
    if (!password) return 0;
    let strength = 0;
    if (password.length >= 8) strength += 25;
    if (/[A-Z]/.test(password)) strength += 25;
    if (/[0-9]/.test(password)) strength += 25;
    if (/[^A-Za-z0-9]/.test(password)) strength += 25;
    return strength;
  };

  const getPasswordStrengthText = () => {
    const strength = getPasswordStrength();
    if (strength < 25) return "Weak";
    if (strength < 50) return "Fair";
    if (strength < 75) return "Good";
    return "Strong";
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    console.log("Form submission triggered");
    console.log("Form data:", {
      firstName,
      lastName,
      studentId,
      email,
      mobileNumber,
      college,
      department,
      yearOfStudy,
      password,
      confirmPassword,
      agreeToTerms,
    });

    // Basic frontend validations
    if (
      !firstName ||
      !lastName ||
      !studentId ||
      !email ||
      !mobileNumber ||
      !college ||
      !department ||
      !yearOfStudy ||
      !password ||
      !confirmPassword
    ) {
      toast.error("All fields are required");
      return;
    }

    if (!agreeToTerms) {
      toast.error("You must agree to the terms and conditions");
      return;
    }

    if (password !== confirmPassword) {
      toast.error("Passwords do not match");
      return;
    }

    // Validate student ID (must be exactly 8 digits)
    if (!/^\d{8}$/.test(studentId)) {
      toast.error("Student ID must be exactly 8 digits");
      return;
    }

    // Validate UG email format
    if (!/^[a-z0-9]+@st\.ug\.edu\.gh$/.test(email.toLowerCase())) {
      toast.error(
        "Email must be a valid UG student address (e.g., yourname@st.ug.edu.gh)"
      );
      return;
    }

    // Validate mobile number (should be 9 digits for Ghana)
    if (!/^\d{9}$/.test(mobileNumber)) {
      toast.error("Mobile number must be exactly 9 digits");
      return;
    }

    try {
      const res = await register({
        firstName,
        lastName,
        studentId,
        email: email.toLowerCase(),
        mobileNumber: `+233${mobileNumber}`,
        college,
        department,
        yearOfStudy,
        password,
        confirmPassword,
      }).unwrap();

      console.log(res);
      dispatch(
        setVoterCredentials({
          ...res,
        })
      );

      toast.success(
        "Registration successful! Check your email for verification code."
      );
      navigate(redirect);
    } catch (error) {
      console.error("Registration error:", error);
      toast.error(
        error?.data?.message || error?.message || "Registration failed"
      );
    }
  };

  return (
    <main className="relative flex items-center justify-center min-h-screen">
      <ToastTest />
      <div className="min-h-screen flex items-center justify-center p-4">
        <div className="relative w-full max-w-4xl">
          <div className="flex justify-center gap-8 items-center">
            <div className="hidden lg:block"></div>

            <div>
              <div className="text-center mb-8">
                <Link to="/" className="inline-flex items-center space-x-3">
                  <div>
                    <Logo />
                  </div>
                </Link>
              </div>

              <Card className="bg-white/80 backdrop-blur-xl border-0 shadow-2xl">
                <CardHeader className="text-center pb-6">
                  <CardTitle className="text-2xl font-bold text-gray-900">
                    Create your account
                  </CardTitle>
                </CardHeader>

                <CardContent className="space-y-6">
                  <form onSubmit={handleSubmit} className="space-y-4">
                    {/* Personal Information Section */}
                    <div className="space-y-4">
                      <div className="flex items-center gap-2 text-lg font-semibold text-gray-800 border-b pb-2">
                        <User className="h-5 w-5" />
                        Personal Information
                      </div>

                      {/* Name Fields */}
                      <div className="grid grid-cols-2 gap-4">
                        <div className="space-y-2">
                          <Label
                            htmlFor="firstName"
                            className="text-sm font-medium text-gray-700"
                          >
                            First name *
                          </Label>
                          <div className="relative">
                            <User className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-gray-400" />
                            <Input
                              id="firstName"
                              type="text"
                              placeholder="John"
                              value={firstName}
                              onChange={(e) => setFirstName(e.target.value)}
                              className="pl-10 h-12 rounded-xl border-gray-200 focus:border-blue-300 focus:ring-blue-100"
                              required
                            />
                          </div>
                        </div>
                        <div className="space-y-2">
                          <Label
                            htmlFor="lastName"
                            className="text-sm font-medium text-gray-700"
                          >
                            Last name *
                          </Label>
                          <Input
                            id="lastName"
                            type="text"
                            placeholder="Doe"
                            value={lastName}
                            onChange={(e) => setLastName(e.target.value)}
                            className="h-12 rounded-xl border-gray-200 focus:border-blue-300 focus:ring-blue-100"
                            required
                          />
                        </div>
                      </div>

                      {/* Student ID Field */}
                      <div className="space-y-2">
                        <Label
                          htmlFor="studentId"
                          className="text-sm font-medium text-gray-700"
                        >
                          Student ID *
                        </Label>
                        <div className="relative">
                          <IdCard className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-gray-400" />
                          <Input
                            id="studentId"
                            type="text"
                            placeholder="12345678"
                            pattern="\d{8}"
                            title="Student ID must be 8 digits"
                            inputMode="numeric"
                            value={studentId}
                            onChange={(e) => {
                              const sanitized = e.target.value
                                .replace(/\D/g, "")
                                .slice(0, 8);
                              setStudentId(sanitized);
                            }}
                            className="pl-10 h-12 rounded-xl border-gray-200 focus:border-blue-300 focus:ring-blue-100"
                            required
                          />
                        </div>
                      </div>

                      {/* Email Field */}
                      <div className="space-y-2">
                        <Label
                          htmlFor="email"
                          className="text-sm font-medium text-gray-700"
                        >
                          UG Email Address *
                        </Label>
                        <div className="relative">
                          <Mail className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-gray-400" />
                          <Input
                            id="email"
                            type="email"
                            placeholder="yourname@st.ug.edu.gh"
                            value={email}
                            onChange={(e) => setEmail(e.target.value)}
                            className="pl-10 h-12 rounded-xl border-gray-200 focus:border-blue-300 focus:ring-blue-100"
                            required
                          />
                        </div>
                      </div>

                      {/* Phone Field */}
                      <div className="space-y-2">
                        <Label className="text-sm font-medium text-gray-700 flex items-center gap-2">
                          <Phone className="h-4 w-4" />
                          Mobile Number *
                        </Label>
                        <div className="flex items-center">
                          <span className="px-3 h-12 flex justify-center items-center bg-gray-100 border border-r-0 border-gray-300 rounded-l-xl text-gray-600 text-sm">
                            +233
                          </span>
                          <Input
                            type="tel"
                            className="h-12 border-l-0 rounded-none rounded-tr-xl rounded-br-xl border-gray-200 focus:border-blue-300 focus:ring-blue-100"
                            placeholder="Phone number (9 digits)"
                            value={mobileNumber}
                            onChange={(e) => {
                              const sanitized = e.target.value
                                .replace(/\D/g, "")
                                .slice(0, 9);
                              setMobileNumber(sanitized);
                            }}
                            maxLength={9}
                            required
                          />
                        </div>
                      </div>
                    </div>

                    {/* Academic Information Section */}
                    <div className="space-y-4">
                      <div className="flex items-center gap-2 text-lg font-semibold text-gray-800 border-b pb-2">
                        <GraduationCap className="h-5 w-5" />
                        Academic Information
                      </div>

                      <div className="flex justify-between items-center gap-5">
                        {/* College Dropdown */}
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
                                Failed to load colleges. Please refresh the
                                page.
                              </AlertDescription>
                            </Alert>
                          ) : (
                            <Select
                              value={college}
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
                            Department *
                          </Label>

                          {!college ? (
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
                              value={department}
                              onValueChange={setDepartment}
                            >
                              <SelectTrigger className="h-12 rounded-xl border-gray-200">
                                <SelectValue placeholder="Select your department" />
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

                          {college &&
                            departments.length === 0 &&
                            !departmentsLoading &&
                            !departmentsError && (
                              <p className="text-sm text-gray-500">
                                No departments found for selected college.
                              </p>
                            )}
                        </div>
                      </div>

                      {/* Academic Year Dropdown */}

                      {yearsLoading ? (
                        <Skeleton className="h-12 w-full rounded-xl" />
                      ) : yearsError ? (
                        <Alert variant="destructive">
                          <AlertDescription>
                            Failed to load academic years. Please refresh the
                            page.
                          </AlertDescription>
                        </Alert>
                      ) : (
                        <div className="space-y-2">
                          <Label className="text-sm font-medium text-gray-700 flex items-center gap-2">
                            <GraduationCap className="h-4 w-4" />
                            Year of Study *
                          </Label>
                          <Select
                            value={yearOfStudy}
                            onValueChange={setYearOfStudy}
                          >
                            <SelectTrigger className="h-12 rounded-xl border-gray-200">
                              <SelectValue placeholder="Select your year of study" />
                            </SelectTrigger>
                            <SelectContent>
                              {years.map((yearItem) => (
                                <SelectItem
                                  key={yearItem.id}
                                  value={yearItem.name}
                                >
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

                    <div className="space-y-2">
                      {/* Academic Selection Summary */}
                      {college && department && yearOfStudy && (
                        <div className="p-4 bg-green-50 border border-green-200 rounded-xl">
                          <div className="flex items-start gap-3">
                            <div className="w-2 h-2 bg-green-500 rounded-full mt-2"></div>
                            <div>
                              <p className="text-sm font-medium text-green-900">
                                Academic Information Selected
                              </p>
                              <p className="text-sm text-green-700 mt-1">
                                <strong>College:</strong>{" "}
                                {
                                  colleges.find((c) => c.value === college)
                                    ?.name
                                }
                              </p>
                              <p className="text-sm text-green-700">
                                <strong>Department:</strong>{" "}
                                {
                                  departments.find(
                                    (d) => d.value === department
                                  )?.name
                                }
                              </p>
                              <p className="text-sm text-green-700">
                                <strong>Year:</strong> {yearOfStudy}
                              </p>
                            </div>
                          </div>
                        </div>
                      )}
                    </div>

                    {/* Password Section */}
                    <div className="space-y-4">
                      <div className="flex items-center gap-2 text-lg font-semibold text-gray-800 border-b pb-2">
                        <Lock className="h-5 w-5" />
                        Security
                      </div>

                      {/* Password Field */}
                      <div className="space-y-2">
                        <Label
                          htmlFor="password"
                          className="text-sm font-medium text-gray-700"
                        >
                          Password *
                        </Label>
                        <div className="relative">
                          <Lock className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-gray-400" />
                          <Input
                            id="password"
                            type={showPassword ? "text" : "password"}
                            placeholder="Create a strong password"
                            value={password}
                            onChange={(e) => setPassword(e.target.value)}
                            className="pl-10 pr-10 h-12 rounded-xl border-gray-200 focus:border-blue-300 focus:ring-blue-100"
                            required
                          />
                          <Button
                            type="button"
                            variant="ghost"
                            size="sm"
                            className="absolute right-2 top-1/2 -translate-y-1/2 h-8 w-8 p-0 hover:bg-transparent"
                            onClick={() => setShowPassword(!showPassword)}
                          >
                            {showPassword ? (
                              <EyeOff className="h-4 w-4 text-gray-400" />
                            ) : (
                              <Eye className="h-4 w-4 text-gray-400" />
                            )}
                          </Button>
                        </div>
                        {password && (
                          <div className="space-y-2">
                            <div className="flex justify-between text-xs">
                              <span className="text-gray-500">
                                Password strength
                              </span>
                              <span
                                className={`font-medium ${
                                  getPasswordStrength() >= 75
                                    ? "text-blue-600"
                                    : getPasswordStrength() >= 50
                                    ? "text-yellow-600"
                                    : "text-red-600"
                                }`}
                              >
                                {getPasswordStrengthText()}
                              </span>
                            </div>
                            <Progress
                              value={getPasswordStrength()}
                              className="h-2"
                            />
                          </div>
                        )}
                      </div>

                      {/* Confirm Password Field */}
                      <div className="space-y-2">
                        <Label
                          htmlFor="confirmPassword"
                          className="text-sm font-medium text-gray-700"
                        >
                          Confirm password *
                        </Label>
                        <div className="relative">
                          <Lock className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-gray-400" />
                          <Input
                            id="confirmPassword"
                            type={showConfirmPassword ? "text" : "password"}
                            placeholder="Confirm your password"
                            value={confirmPassword}
                            onChange={(e) => setConfirmPassword(e.target.value)}
                            className="pl-10 pr-10 h-12 rounded-xl border-gray-200 focus:border-blue-300 focus:ring-blue-100"
                            required
                          />
                          <Button
                            type="button"
                            variant="ghost"
                            size="sm"
                            className="absolute right-2 top-1/2 -translate-y-1/2 h-8 w-8 p-0 hover:bg-transparent"
                            onClick={() =>
                              setShowConfirmPassword(!showConfirmPassword)
                            }
                          >
                            {showConfirmPassword ? (
                              <EyeOff className="h-4 w-4 text-gray-400" />
                            ) : (
                              <Eye className="h-4 w-4 text-gray-400" />
                            )}
                          </Button>
                        </div>
                        {confirmPassword && password !== confirmPassword && (
                          <p className="text-xs text-red-600">
                            Passwords do not match
                          </p>
                        )}
                      </div>
                    </div>

                    {/* Checkboxes */}
                    <div className="space-y-3">
                      <div className="flex items-start space-x-3">
                        <Checkbox
                          id="terms"
                          checked={agreeToTerms}
                          onCheckedChange={setAgreeToTerms}
                          className="rounded-md mt-0.5"
                        />
                        <Label
                          htmlFor="terms"
                          className="text-sm text-gray-600 cursor-pointer leading-relaxed"
                        >
                          I agree to the{" "}
                          <Link
                            to="/terms"
                            className="text-blue-600 hover:text-blue-700 font-medium"
                          >
                            Terms of Service
                          </Link>{" "}
                          and{" "}
                          <Link
                            to="/privacy"
                            className="text-blue-600 hover:text-blue-700 font-medium"
                          >
                            Privacy Policy
                          </Link>
                        </Label>
                      </div>
                      <div className="flex items-start space-x-3">
                        <Checkbox
                          id="newsletter"
                          checked={subscribeNewsletter}
                          onCheckedChange={setSubscribeNewsletter}
                          className="rounded-md mt-0.5"
                        />
                        <Label
                          htmlFor="newsletter"
                          className="text-sm text-gray-600 cursor-pointer leading-relaxed"
                        >
                          Subscribe to our newsletter for election updates
                        </Label>
                      </div>
                    </div>

                    {/* Submit Button */}
                    <Button
                      type="submit"
                      disabled={
                        isLoading ||
                        !agreeToTerms ||
                        password !== confirmPassword ||
                        !college ||
                        !department ||
                        !yearOfStudy
                      }
                      className="w-full h-12 bg-gradient-to-r from-blue-600 to-blue-400 hover:from-blue-700 hover:to-blue-500 text-white font-semibold rounded-xl transition-all duration-200 hover:scale-105"
                    >
                      {isLoading ? (
                        <div className="flex items-center space-x-2">
                          <div className="w-4 h-4 border-2 border-white/30 border-t-white rounded-full animate-spin"></div>
                          <span>Creating account...</span>
                        </div>
                      ) : (
                        <div className="flex items-center space-x-2">
                          <span>Create account</span>
                          <ArrowRight className="h-4 w-4" />
                        </div>
                      )}
                    </Button>
                  </form>

                  {/* Sign In Link */}
                  <div className="text-center">
                    <span className="text-sm text-gray-600">
                      Already have an account?{" "}
                    </span>
                    <Link
                      to={redirect ? `/login?redirect=${redirect}` : "/login"}
                      className="text-sm text-blue-600 hover:text-blue-700 font-medium"
                    >
                      Sign in
                    </Link>
                  </div>
                </CardContent>
              </Card>
            </div>
          </div>
        </div>
      </div>
    </main>
  );
};

export default Register;
