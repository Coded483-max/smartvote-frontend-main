import { useState, useEffect, useRef } from "react";
import { Link, useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import {
  Mail,
  CheckCircle,
  RefreshCw,
  ArrowLeft,
  ArrowRight,
} from "lucide-react";
import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Label } from "@/components/ui/label";
import { Input } from "@/components/ui/input";
import Logo from "@/UI/Logo";
import ToastTest from "@/UI/ToastTest";
import { toast } from "react-toastify";

import { useVerifyEmailMutation } from "@/api/usersApiSlice";
import { logoutVoter } from "@/api/authSlice";

const VerifyEmail = () => {
  const [code, setCode] = useState(["", "", "", "", "", ""]);

  const [countdown, setCountdown] = useState(60);
  const [canResend, setCanResend] = useState(false);
  const [error, setError] = useState("");
  const { voter } = useSelector((state) => state.auth);

  const navigate = useNavigate();

  const [verifyEmail, { isLoading, isError }] = useVerifyEmailMutation();

  const inputRefs = useRef([]);

  const dispatch = useDispatch();

  // Redirect if already verified
  useEffect(() => {
    console.log("Voter state:", voter);
    if (!voter) {
      console.log("No voter found, redirecting to login");
      navigate("/login", { replace: true });
      return;
    }

    // Check the correct isVerified property
    const isVerified = voter.isVerified;

    if (isVerified) {
      console.log("Voter already verified, redirecting to login");
      navigate("/login", { replace: true });
      return;
    }
  }, [voter, navigate]);

  useEffect(() => {
    if (countdown > 0 && !canResend) {
      const timer = setTimeout(() => setCountdown(countdown - 1), 1000);
      return () => clearTimeout(timer);
    } else {
      setCanResend(true);
    }
  }, [countdown, canResend]);

  const handleCodeChange = (index, element) => {
    if (isNaN(element.value)) return;

    const newCode = [...code];
    newCode[index] = element.value;
    setCode(newCode);
    setError(""); // Clear error when user types

    // Automatically focus the next input using refs
    if (element.nextSibling) {
      element.nextSibling.focus();
    }
  };

  // ...existing code...
  const handleKeyDown = (index, e) => {
    if (e.key === "Backspace") {
      if (code[index]) {
        // If current input is not empty, clear it
        const newCode = [...code];
        newCode[index] = "";
        setCode(newCode);
      } else if (index > 0) {
        // If current input is empty, move focus to previous input
        inputRefs.current[index - 1]?.focus();
      }
    }
  };

  const handlePaste = (e) => {
    e.preventDefault();
    const pastedData = e.clipboardData
      .getData("text")
      .replace(/\D/g, "")
      .slice(0, 6);

    const newCode = ["", "", "", "", "", ""];

    for (let i = 0; i < pastedData.length; i++) {
      newCode[i] = pastedData[i];
    }

    setCode(newCode);
    setError("");

    // Focus the next empty input or the last one
    const nextIndex = Math.min(pastedData.length, 5);
    inputRefs.current[nextIndex]?.focus();
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    const codeString = code.join("");

    if (codeString.length !== 6) {
      setError("Please enter the complete 6-digit code");
      return;
    }

    try {
      const res = await verifyEmail({
        email: voter.email || voter?.email,
        code: codeString,
      }).unwrap();

      console.log("Verification response:", res);

      // Don't update auth state - just show success and redirect
      toast.success("Email verified successfully! Please log in to continue.");

      // Clear the current unverified voter state
      dispatch(logoutVoter()); // This clears all auth state

      // Navigate to login
      setTimeout(() => {
        navigate("/login?verified=true", { replace: true });
      }, 1500);
    } catch (error) {
      console.error("Verification error:", error);
      setError(
        error?.data?.message || "Invalid verification code. Please try again."
      );
      toast.error(error?.data?.message || "Verification failed");
    }
  };

  const handleResendEmail = async () => {
    setCanResend(false);
    setCountdown(60);

    // Simulate API call
    await new Promise((resolve) => setTimeout(resolve, 2000));
  };

  // Check if the code is complete
  const isCodeComplete = code.every((digit) => digit !== "");

  return (
    <>
      {/* <ToastTest /> */}

      <div className="min-h-screen bg-gradient-to-br from-purple-50 via-blue-50 to-indigo-100 flex items-center justify-center p-4">
        <div className="relative w-full max-w-md">
          {/* Logo */}
          <div className="text-center mb-8">
            <Link to="/" className="inline-flex items-center space-x-3">
              <div>
                <Logo />
              </div>
            </Link>
          </div>

          <Card className="bg-white/80 backdrop-blur-xl border-0 shadow-2xl">
            <CardHeader className="text-center pb-6">
              <div className="mx-auto w-16 h-16 bg-gradient-to-br from-purple-600 to-blue-600 rounded-full flex items-center justify-center mb-4">
                <Mail className="h-8 w-8 text-white" />
              </div>
              <CardTitle className="text-2xl font-bold text-gray-900">
                Check your email
              </CardTitle>
              <CardDescription className="text-gray-600 text-center">
                We've sent a verification code to your email address. Please
                check your inbox and enter the verification code below to verify
                your account.
              </CardDescription>
            </CardHeader>

            <CardContent className="space-y-6">
              <div>
                <form onSubmit={handleSubmit} className="space-y-6">
                  {/* Verification Code Input */}
                  <div className="space-y-3">
                    <Label className="text-sm font-medium text-gray-700 text-center block">
                      Verification Code
                    </Label>
                    <div className="flex justify-center space-x-3">
                      {code.map((digit, index) => (
                        <Input
                          key={index}
                          type="text"
                          inputMode="numeric"
                          pattern="[0-9]"
                          maxLength={1}
                          value={digit}
                          onChange={(e) => handleCodeChange(index, e.target)}
                          onKeyDown={(e) => handleKeyDown(index, e)}
                          onFocus={(e) => e.target.select()}
                          onPaste={index === 0 ? handlePaste : undefined}
                          className="w-12 h-14 text-center text-xl font-bold rounded-xl border-2 border-gray-200 focus:border-blue-300 focus:ring-blue-300"
                        />
                      ))}
                    </div>

                    {error && (
                      <p className="text-sm text-red-600 text-center mt-2">
                        {error}
                      </p>
                    )}
                  </div>

                  {/* Submit Button */}
                  <Button
                    type="submit"
                    disabled={isLoading || !isCodeComplete}
                    className="w-full h-12 bg-gradient-to-r from-blue-600 to-blue-400 hover:from-blue-700 hover:to-blue-500 text-white font-semibold rounded-xl transition-all duration-200 hover:scale-105 disabled:opacity-50 disabled:cursor-not-allowed"
                  >
                    {isLoading ? (
                      <div className="flex items-center space-x-2">
                        <div className="w-4 h-4 border-2 border-white/30 border-t-white rounded-full animate-spin"></div>
                        <span>Verifying code...</span>
                      </div>
                    ) : (
                      <div className="flex items-center space-x-2">
                        <span>Verify code</span>
                        <ArrowRight className="h-4 w-4" />
                      </div>
                    )}
                  </Button>
                </form>
              </div>

              <div className="text-center">
                <p className="text-sm text-gray-600 mb-4">
                  Didn't receive the email?
                </p>
                <Button
                  onClick={handleResendEmail}
                  disabled={isLoading || !canResend}
                  variant="outline"
                  className="h-12 rounded-xl border-gray-200 hover:bg-gray-50"
                >
                  {isLoading ? (
                    <div className="flex items-center space-x-2">
                      <RefreshCw className="h-4 w-4 animate-spin" />
                      <span>Sending...</span>
                    </div>
                  ) : canResend ? (
                    <div className="flex items-center space-x-2">
                      <RefreshCw className="h-4 w-4" />
                      <span>Resend email</span>
                    </div>
                  ) : (
                    <span>Resend in {countdown}s</span>
                  )}
                </Button>
              </div>

              <div className="text-center">
                <Button
                  variant="ghost"
                  className="text-purple-600 hover:text-purple-700"
                  onClick={() => navigate("/login")}
                >
                  <div className="flex items-center space-x-2">
                    <ArrowLeft className="h-4 w-4" />
                    <span>Back to sign in</span>
                  </div>
                </Button>
              </div>
            </CardContent>
          </Card>
        </div>
      </div>
    </>
  );
};

export default VerifyEmail;
