"use client";

import React from "react";

import { useState, useRef, useEffect } from "react";
import { Link } from "react-router-dom";
import {
  ArrowLeft,
  ArrowRight,
  Package,
  RefreshCw,
  Phone,
  Mail,
} from "lucide-react";
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
import { Badge } from "@/components/ui/badge";
import Logo from "@/UI/Logo";

const VerifyResetCodeSMS = () => {
  const [code, setCode] = useState(["", "", "", "", "", ""]);
  const [isLoading, setIsLoading] = useState(false);
  const [isResending, setIsResending] = useState(false);
  const [countdown, setCountdown] = useState(60);
  const [canResend, setCanResend] = useState(false);
  const [error, setError] = useState("");
  const inputRefs = useRef([]);

  // Get verification method and contact from URL params
  const searchParams =
    typeof window !== "undefined"
      ? new URLSearchParams(window.location.search)
      : new URLSearchParams();
  const verificationMethod = searchParams.get("method") || "sms";
  const contact = searchParams.get("contact") || "+1 (555) 123-4567";

  useEffect(() => {
    if (countdown > 0 && !canResend) {
      const timer = setTimeout(() => setCountdown(countdown - 1), 1000);
      return () => clearTimeout(timer);
    } else {
      setCanResend(true);
    }
  }, [countdown, canResend]);

  const handleChange = (element, index) => {
    if (isNaN(element.value)) return;

    const newCode = [...code];
    newCode[index] = element.value;
    setCode(newCode);

    // Automatically focus the next input
    if (element.nextSibling) {
      element.nextSibling.focus();
    }
  };

  const handleKeyDown = (index, e) => {
    if (e.key === "Backspace" && !code[index] && index > 0) {
      inputRefs.current[index - 1]?.focus();
    }
  };

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
    <div className="min-h-screen bg-gradient-to-br from-blue-50 via-blue-100 to-blue-200 flex items-center justify-center p-4">
      {/* Background Elements */}
      <div className="absolute inset-0 overflow-hidden">
        <div className="absolute -top-40 -right-40 w-80 h-80 bg-gradient-to-br from-purple-400 to-pink-400 rounded-full opacity-20 blur-3xl"></div>
        <div className="absolute -bottom-40 -left-40 w-80 h-80 bg-gradient-to-br from-blue-400 to-blue-400 rounded-full opacity-20 blur-3xl"></div>
      </div>

      <div className="relative w-full max-w-md">
        {/* Logo */}
        <div>
          <Logo />
        </div>

        <Card className="bg-white/80 backdrop-blur-xl border-0 shadow-2xl">
          <CardHeader className="text-center pb-6">
            <div className="flex items-center justify-center space-x-2 mb-4">
              <div className="w-16 h-16 bg-gradient-to-br from-purple-600 to-blue-600 rounded-full flex items-center justify-center">
                {verificationMethod === "sms" ? (
                  <Phone className="h-8 w-8 text-white" />
                ) : (
                  <Mail className="h-8 w-8 text-white" />
                )}
              </div>
              <Badge className="bg-gradient-to-r from-blue-500 to-blue-600 text-white">
                {verificationMethod === "sms" ? "SMS" : "Email"}
              </Badge>
            </div>
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
                      ref={(el) => (inputRefs.current[index] = el)}
                      type="text"
                      inputMode="numeric"
                      pattern="[0-9]"
                      maxLength={1}
                      value={digit}
                      onChange={(e) => handleChange(index, e.target)}
                      onKeyDown={(e) => handleKeyDown(index, e)}
                      onPaste={index === 0 ? handlePaste : undefined}
                      className="w-12 h-14 text-center text-xl font-bold rounded-xl border-2 border-gray-200 focus:border-purple-300 focus:ring-purple-100"
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
                className="w-full h-12 bg-gradient-to-r from-blue-500 to-blue-600 hover:from-blue-600 hover:to-blue-700 text-white font-semibold rounded-xl transition-all duration-200 hover:scale-105 disabled:opacity-50 disabled:cursor-not-allowed"
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

            {/* Method-specific tips */}
            {verificationMethod === "sms" && (
              <div className="p-4 bg-gradient-to-r from-blue-100 to-blue-200 rounded-xl">
                <h3 className="font-semibold text-blue-900 mb-2">SMS Tips:</h3>
                <ul className="text-sm text-blue-700 space-y-1">
                  <li>• Check your message app for the code</li>
                  <li>• SMS may take 1-2 minutes to arrive</li>
                  <li>• Make sure you have cell service</li>
                  <li>• Check if messages are being filtered</li>
                </ul>
              </div>
            )}

            {verificationMethod === "email" && (
              <div className="p-4 bg-gradient-to-r from-blue-100 to-blue-200 rounded-xl">
                <h3 className="font-semibold text-blue-900 mb-2">
                  Email Tips:
                </h3>
                <ul className="text-sm text-blue-700 space-y-1">
                  <li>• Check your email inbox and spam folder</li>
                  <li>• Email may take a few minutes to arrive</li>
                  <li>• Make sure you have internet connection</li>
                  <li>• Try refreshing your email app</li>
                </ul>
              </div>
            )}

            {/* Resend Code */}
            <div className="text-center space-y-4">
              <p className="text-sm text-gray-600">
                Didn't receive the
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

            {/* Switch Method */}
            <div className="text-center">
              <Button
                asChild
                variant="ghost"
                className="text-blue-600 hover:text-blue-700"
              >
                <Link
                  href="/forgot-password"
                  className="flex items-center space-x-2"
                >
                  <ArrowLeft className="h-4 w-4" />
                  <span>Try different method</span>
                </Link>
              </Button>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
};
export default VerifyResetCodeSMS;
