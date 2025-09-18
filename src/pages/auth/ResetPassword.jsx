"use client";

import React from "react";

import { useState } from "react";
import { Link, useParams } from "react-router-dom";
import {
  Eye,
  EyeOff,
  Lock,
  ArrowRight,
  Package,
  CheckCircle,
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
import { Progress } from "@/components/ui/progress";
import Logo from "@/UI/Logo";
import { useNavigate } from "react-router-dom";
import { useResetPasswordMutation } from "@/api/usersApiSlice";
import { toast } from "react-toastify";
import { ToastContainer } from "react-toastify";

const ResetPassword = () => {
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [isSuccess, setIsSuccess] = useState(false);

  const { token } = useParams();

  const [resetPassword, { isLoading: isResetLoading }] =
    useResetPasswordMutation();

  const getPasswordStrength = () => {
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
    if (password !== confirmPassword) {
      toast.error("Passwords do not match");
    }

    setIsLoading(true);

    const { error } = await resetPassword({ password, resetToken: token });

    if (error) {
      toast.error("Failed to reset password. Please try again.");
      console.error("Reset password error:", error);
      setIsLoading(false);
      return;
    } else {
      setIsSuccess(true);
    }

    setIsLoading(false);
  };

  if (isSuccess) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-blue-50 via-blue-100 to-blue-200 flex items-center justify-center p-4">
        <div className="relative w-full max-w-md">
          <Card className="bg-white/80 backdrop-blur-xl border-0 shadow-2xl text-center">
            <CardHeader className="pb-6">
              <div className="mx-auto w-16 h-16 bg-gradient-to-br from-blue-500 to-blue-600 rounded-full flex items-center justify-center mb-4">
                <CheckCircle className="h-8 w-8 text-white" />
              </div>
              <CardTitle className="text-2xl font-bold text-gray-900">
                Password Reset Successful!
              </CardTitle>
              <CardDescription className="text-gray-600">
                Your password has been successfully updated. You can now sign in
                with your new password.
              </CardDescription>
            </CardHeader>

            <CardContent className="space-y-6">
              <div className="p-4 bg-gradient-to-r from-blue-100 to-blue-200 rounded-xl">
                <p className="text-sm text-blue-700 font-medium">
                  🔒 Your account is now secure with your new password.
                </p>
              </div>

              <Button
                asChild
                className="w-full h-12 bg-gradient-to-r from-blue-600 to-blue-400 hover:from-blue-700 hover:to-blue-500 text-white font-semibold rounded-xl transition-all duration-200 hover:scale-105"
              >
                <Link to="/login">Sign in to your account</Link>
              </Button>
            </CardContent>
          </Card>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-purple-50 via-blue-50 to-indigo-100 flex items-center justify-center p-4">
      {/* Background Elements */}
      <div className="absolute inset-0 overflow-hidden">
        <div className="absolute -top-40 -right-40 w-80 h-80 bg-gradient-to-br from-purple-400 to-pink-400 rounded-full opacity-20 blur-3xl"></div>
        <div className="absolute -bottom-40 -left-40 w-80 h-80 bg-gradient-to-br from-blue-400 to-cyan-400 rounded-full opacity-20 blur-3xl"></div>
      </div>

      <ToastContainer />

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
              Reset your password
            </CardTitle>
            <CardDescription className="text-gray-600">
              Enter your new password below. Make sure it's strong and secure.
            </CardDescription>
          </CardHeader>

          <CardContent className="space-y-6">
            <form onSubmit={handleSubmit} className="space-y-4">
              {/* Password Field */}
              <div className="space-y-2">
                <Label
                  htmlFor="password"
                  className="text-sm font-medium text-gray-700"
                >
                  New password
                </Label>
                <div className="relative">
                  <Lock className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-gray-400" />
                  <Input
                    id="password"
                    type={showPassword ? "text" : "password"}
                    placeholder="Create a strong password"
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                    className="pl-10 pr-10 h-12 rounded-xl border-gray-200 focus:border-blue-400 focus:ring-purple-100"
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
                      <span className="text-gray-500">Password strength</span>
                      <span
                        className={`font-medium ${
                          getPasswordStrength() >= 75
                            ? "text-green-600"
                            : getPasswordStrength() >= 50
                            ? "text-yellow-600"
                            : "text-red-600"
                        }`}
                      >
                        {getPasswordStrengthText()}
                      </span>
                    </div>
                    <Progress value={getPasswordStrength()} className="h-2" />
                  </div>
                )}
              </div>

              {/* Confirm Password Field */}
              <div className="space-y-2">
                <Label
                  htmlFor="confirmPassword"
                  className="text-sm font-medium text-gray-700"
                >
                  Confirm new password
                </Label>
                <div className="relative">
                  <Lock className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-gray-400" />
                  <Input
                    id="confirmPassword"
                    type={showConfirmPassword ? "text" : "password"}
                    placeholder="Confirm your new password"
                    value={confirmPassword}
                    onChange={(e) => setConfirmPassword(e.target.value)}
                    className="pl-10 pr-10 h-12 rounded-xl border-gray-200 focus:border-blue-400 focus:ring-purple-100"
                    required
                  />
                  <Button
                    type="button"
                    variant="ghost"
                    size="sm"
                    className="absolute right-2 top-1/2 -translate-y-1/2 h-8 w-8 p-0 hover:bg-transparent"
                    onClick={() => setShowConfirmPassword(!showConfirmPassword)}
                  >
                    {showConfirmPassword ? (
                      <EyeOff className="h-4 w-4 text-gray-400" />
                    ) : (
                      <Eye className="h-4 w-4 text-gray-400" />
                    )}
                  </Button>
                </div>
                {confirmPassword && password !== confirmPassword && (
                  <p className="text-xs text-red-600">Passwords do not match</p>
                )}
              </div>

              {/* Password Requirements */}
              <div className="p-4 bg-gradient-to-r from-blue-200 to-blue-300 rounded-xl">
                <h3 className="font-semibold text-blue-900 mb-2">
                  Password requirements:
                </h3>
                <ul className="text-sm text-blue-700 space-y-1">
                  <li
                    className={`flex items-center space-x-2 ${
                      password.length >= 8 ? "text-green-600" : ""
                    }`}
                  >
                    <span>{password.length >= 8 ? "✓" : "•"}</span>
                    <span>At least 8 characters long</span>
                  </li>
                  <li
                    className={`flex items-center space-x-2 ${
                      /[A-Z]/.test(password) ? "text-green-600" : ""
                    }`}
                  >
                    <span>{/[A-Z]/.test(password) ? "✓" : "•"}</span>
                    <span>One uppercase letter</span>
                  </li>
                  <li
                    className={`flex items-center space-x-2 ${
                      /[0-9]/.test(password) ? "text-green-600" : ""
                    }`}
                  >
                    <span>{/[0-9]/.test(password) ? "✓" : "•"}</span>
                    <span>One number</span>
                  </li>
                  <li
                    className={`flex items-center space-x-2 ${
                      /[^A-Za-z0-9]/.test(password) ? "text-blue-600" : ""
                    }`}
                  >
                    <span>{/[^A-Za-z0-9]/.test(password) ? "✓" : "•"}</span>
                    <span>One special character</span>
                  </li>
                </ul>
              </div>

              {/* Submit Button */}
              <Button
                type="submit"
                disabled={
                  isResetLoading ||
                  password !== confirmPassword ||
                  getPasswordStrength() < 50
                }
                className="w-full h-12 bg-gradient-to-r from-blue-600 to-blue-400 hover:from-blue-700 hover:to-blue-500 text-white font-semibold rounded-xl transition-all duration-200 hover:scale-105"
              >
                {isResetLoading ? (
                  <div className="flex items-center space-x-2">
                    <div className="w-4 h-4 border-2 border-white/30 border-t-white rounded-full animate-spin"></div>
                    <span>Updating password...</span>
                  </div>
                ) : (
                  <div className="flex items-center space-x-2">
                    <span>Update password</span>
                    <ArrowRight className="h-4 w-4" />
                  </div>
                )}
              </Button>
            </form>

            <div className="text-center">
              <Link
                to="/login"
                asChild
                variant="ghost"
                className=" text-blue-500 font-semibold "
              >
                Back to sign in
              </Link>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
};

export default ResetPassword;
