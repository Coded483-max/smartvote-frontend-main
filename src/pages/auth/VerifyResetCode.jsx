import React from "react";

import { useState, useRef, useEffect } from "react";
import { Link } from "react-router-dom";
import { ArrowLeft, ArrowRight, Package, RefreshCw } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import Logo from "@/UI/Logo";

const VerifyResetCode = () => {
  const [code, setCode] = useState(["", "", "", "", "", ""]);
  const [isLoading, setIsLoading] = useState(false);
  const [isResending, setIsResending] = useState(false);
  const [countdown, setCountdown] = useState(60);
  const [canResend, setCanResend] = useState(false);
  const [error, setError] = useState("");
  const inputRefs = useRef();

  // Get verification method and contact from URL params
  const searchParams = new URLSearchParams(window.location.search);
  const verificationMethod = searchParams.get("method") || "email";
  const contact = searchParams.get("contact") || "user@example.com";

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

    // Automatically focus the next input
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
  // ...existing code...
  const handlePaste = (e) => {
    e.preventDefault();
    const pastedData = e.clipboardData
      .getData("text")
      .replace(/\D/g, "")
      .slice(0, 6);
    const newCode = [...code];

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

    setIsLoading(true);
    setError("");

    // Simulate API call
    await new Promise((resolve) => setTimeout(resolve, 2000));

    // Demo: Accept any 6-digit code for demo purposes
    if (codeString === "123456") {
      // Navigate to reset password page
      window.location.href = "/reset-password";
    } else {
      setError("Invalid verification code. Please try again.");
    }

    setIsLoading(false);
  };

  const handleResendCode = async () => {
    setIsResending(true);
    setCanResend(false);
    setCountdown(60);
    setError("");

    // Simulate API call
    await new Promise((resolve) => setTimeout(resolve, 2000));

    setIsResending(false);
  };

  const isCodeComplete = code.every((digit) => digit !== "");

  return (
    <div className="min-h-screen  flex items-center justify-center p-4">
      {/* Background Elements */}
      <div className="absolute inset-0 overflow-hidden">
        <div className="absolute -top-40 -right-40 w-80 h-80 bg-gradient-to-br from-purple-400 to-pink-400 rounded-full opacity-20 blur-3xl"></div>
        <div className="absolute -bottom-40 -left-40 w-80 h-80 bg-gradient-to-br from-blue-400 to-cyan-400 rounded-full opacity-20 blur-3xl"></div>
      </div>

      <div className="relative w-full max-w-md">
        {/* Logo */}
        <div className="text-center mb-8">
          <Link href="/" className="inline-flex items-center space-x-3">
            <div>
              <Logo />
            </div>
          </Link>
        </div>

        <Card className="bg-white/80 backdrop-blur-xl border-0 shadow-2xl">
          <CardHeader className="text-center pb-6">
            <CardTitle className="text-2xl font-bold text-gray-900">
              Enter verification code
            </CardTitle>
            <CardDescription className="text-gray-600">
              We've sent a 6-digit verification code{" "}
              {verificationMethod === "email" ? "to" : "via SMS to"}{" "}
              <strong>{contact}</strong>
            </CardDescription>
          </CardHeader>

          <CardContent className="space-y-6">
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
                  <p className="text-sm text-red-600 text-center">{error}</p>
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

            {/* Resend Code */}
            <div className="text-center space-y-4">
              <p className="text-sm text-gray-600">
                Didn't receive the{" "}
                {verificationMethod === "email" ? "email" : "SMS"}?
              </p>
              <Button
                onClick={handleResendCode}
                disabled={isResending || !canResend}
                variant="outline"
                className="h-12 rounded-xl border-gray-200 hover:bg-gray-50"
              >
                {isResending ? (
                  <div className="flex items-center space-x-2">
                    <RefreshCw className="h-4 w-4 animate-spin" />
                    <span>Sending...</span>
                  </div>
                ) : canResend ? (
                  <div className="flex items-center space-x-2">
                    <RefreshCw className="h-4 w-4" />
                    <span>
                      Resend {verificationMethod === "email" ? "email" : "SMS"}
                    </span>
                  </div>
                ) : (
                  <span>Resend in {countdown}s</span>
                )}
              </Button>
            </div>

            {/* Demo Info */}
            <div className="p-4 bg-gradient-to-r from-amber-100 to-orange-100 rounded-xl">
              <p className="text-sm text-amber-800">
                <strong>Demo:</strong> Use code{" "}
                <span className="font-mono font-bold">123456</span> to continue
                to password reset.{" "}
                {verificationMethod === "sms" && "(SMS simulation)"}
              </p>
            </div>

            {/* Back Button */}
            <div className="text-center">
              <Button
                asChild
                variant="ghost"
                className="text-purple-600 hover:text-purple-700"
              >
                <Link
                  href="/forgot-password"
                  className="flex items-center space-x-2"
                >
                  <ArrowLeft className="h-4 w-4" />
                  <span>Back to email entry</span>
                </Link>
              </Button>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
};

export default VerifyResetCode;
