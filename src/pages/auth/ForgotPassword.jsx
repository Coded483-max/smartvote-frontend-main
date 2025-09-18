import React from "react";

import { useState } from "react";
import { Link } from "react-router-dom";
import {
  Mail,
  Phone,
  ArrowLeft,
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
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import Logo from "@/UI/Logo";
import { useForgotPasswordMutation } from "@/api/usersApiSlice";

import { toast } from "react-toastify";
import { ToastContainer } from "react-toastify";

const ForgotPassword = () => {
  const [email, setEmail] = useState("");
  const [phone, setPhone] = useState("");
  const [verificationMethod, setVerificationMethod] = useState("email");
  const [isLoading, setIsLoading] = useState(false);
  const [isCodeSent, setIsCodeSent] = useState(false);
  const [sentTo, setSentTo] = useState("");

  const [forgotPassword, { isLoading: isForgotLoading }] =
    useForgotPasswordMutation();

  const maskEmail = (email) => {
    if (!email) return "";
    const [localPart, domain] = email.split("@");

    const maskedLocal =
      localPart.length > 4
        ? `${localPart.slice(0, 2)}${"*".repeat(
            localPart.length - 4
          )}${localPart.slice(-2)}`
        : `${localPart[0]}${"*".repeat(localPart.length - 1)}`;

    return `${maskedLocal}@${domain}`;
  };

  const maskPhone = (phone) => {
    if (!phone) return "";

    //Remove all non-digit characters
    const digits = phone.replace(/\D/g, "");

    //Show only the last 4 digits
    if (digits.length > 4) {
      return `${digits.slice(0, 3)} ${"*".repeat(
        digits.length - 4
      )}${digits.slice(-2)}`;
    }
    return phone;
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setIsLoading(true);

    const contact = verificationMethod === "email" ? email : phone;

    //Mask the contact information for display
    const maskedContact =
      verificationMethod === "email" ? maskEmail(contact) : maskPhone(contact);
    setSentTo(maskedContact);

    const { error } = await forgotPassword({ email });
    if (email.trim() === "") {
      console.error("Please enter your email.");
      setIsLoading(false);
      return;
    }

    if (error) {
      toast.error("Failed to send verification code. Please try again.");
      console.error("Forgot password error:", error);
      setIsLoading(false);
      return;
    }

    setIsCodeSent(true);
    setIsLoading(false);
  };

  if (isCodeSent) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-blue-50 via-blue-50 to-indigo-100 flex items-center justify-center p-4">
        <div className="relative w-full max-w-md">
          <div className="flex justify-center">
            <Logo className="w-60" />
          </div>

          <Card className="bg-white/80 backdrop-blur-xl border-0 shadow-2xl">
            <CardHeader className="text-center pb-6">
              <div className="mx-auto w-16 h-16 bg-gradient-to-br from-blue-500 to-emerald-600 rounded-full flex items-center justify-center mb-4">
                <CheckCircle className="h-8 w-8 text-white" />
              </div>
              <CardTitle className="text-2xl font-bold text-gray-900">
                {verificationMethod === "email"
                  ? "Check your email"
                  : "Check your phone"}
              </CardTitle>
              <CardDescription className="text-gray-600">
                We've sent a reset link
                {verificationMethod === "email" ? " to " : "via SMS to"}
                <strong>{sentTo}</strong>
              </CardDescription>
            </CardHeader>

            <CardContent className="space-y-6">
              <div className="p-4 bg-gradient-to-r from-blue-100 to-blue-100 rounded-xl">
                <h3 className="font-semibold text-blue-900 mb-2">
                  Next steps:
                </h3>
                <ul className="text-sm text-blue-700 space-y-1">
                  <li>
                    • Check your{" "}
                    {verificationMethod === "email"
                      ? "email inbox (and spam folder)"
                      : "text messages"}
                  </li>
                  <li>• Open the reset link to reset your password</li>
                  <li>• Create a new secure password</li>
                  <li>• Sign in with your new password</li>
                </ul>
              </div>

              <div className="space-y-3">
                <Button
                  onClick={() => setIsCodeSent(false)}
                  variant="outline"
                  className="w-full h-12 rounded-xl border-gray-200 hover:bg-gray-50"
                >
                  Try different{" "}
                  {verificationMethod === "email" ? "email" : "phone number"}
                </Button>
              </div>

              <div className="text-center">
                <p className="text-xs text-gray-500">
                  Didn't receive the{" "}
                  {verificationMethod === "email" ? "email" : "SMS"}? Check your{" "}
                  {verificationMethod === "email"
                    ? "spam folder"
                    : "message app"}{" "}
                  or contact support.
                </p>
              </div>
            </CardContent>
          </Card>
        </div>
      </div>
    );
  }

  return (
    <div className="relative flex items-center justify-center min-h-screen  ">
      <ToastContainer />
      {/* Background Elements
      <div className="absolute inset-0 overflow-hidden">
        <div className="absolute -top-40 -right-40 w-80 h-80 bg-gradient-to-br from-blue-400 to-pink-400 rounded-full opacity-20 blur-3xl"></div>
        <div className="absolute -bottom-40 -left-40 w-80 h-80 bg-gradient-to-br from-blue-400 to-cyan-400 rounded-full opacity-20 blur-3xl"></div>
      </div> */}

      <div className="relative w-full max-w-md">
        <div className="flex justify-center mb-8">
          <Logo className="w-60" />
        </div>

        <Card className="bg-white/80 backdrop-blur-xl border-0 shadow-2xl">
          <CardHeader className="text-center pb-6">
            <CardTitle className="text-2xl font-bold text-gray-900">
              Forgot your password?
            </CardTitle>
            <CardDescription className="text-gray-600">
              Choose how you'd like to receive your verification code to reset
              your password.
            </CardDescription>
          </CardHeader>

          <CardContent className="space-y-6">
            <Tabs
              value={verificationMethod}
              onValueChange={(value) => setVerificationMethod(value)}
            >
              <TabsList className="grid w-full grid-cols-2 h-12 rounded-xl bg-gray-100">
                <TabsTrigger
                  value="email"
                  className="rounded-lg data-[state=active]:bg-white data-[state=active]:shadow-sm"
                >
                  <Mail className="h-4 w-4 mr-2" />
                  Email
                </TabsTrigger>
                <TabsTrigger
                  value="sms"
                  className="rounded-lg data-[state=active]:bg-white data-[state=active]:shadow-sm"
                >
                  <Phone className="h-4 w-4 mr-2" />
                  SMS
                </TabsTrigger>
              </TabsList>

              <form onSubmit={handleSubmit} className="space-y-4">
                <TabsContent value="email" className="space-y-4 mt-6">
                  <div className="space-y-2">
                    <Label
                      htmlFor="email"
                      className="text-sm font-medium text-gray-700"
                    >
                      Email address
                    </Label>
                    <div className="relative">
                      <Mail className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-gray-400" />
                      <Input
                        id="email"
                        type="email"
                        placeholder="Enter your email address"
                        value={email}
                        onChange={(e) => setEmail(e.target.value)}
                        className="pl-10 h-12 rounded-xl border-gray-200 focus:border-blue-300 focus:ring-blue-100"
                        required={verificationMethod === "email"}
                      />
                    </div>
                  </div>

                  <div className="p-4 bg-gradient-to-r from-blue-100 to-blue-200 rounded-xl">
                    <p className="text-sm text-blue-800">
                      <strong>Email verification:</strong> We'll send a reset
                      link to your email inbox. Check your spam folder if you
                      don't see it.
                    </p>
                  </div>
                </TabsContent>

                <TabsContent value="sms" className="space-y-4 mt-6">
                  <div className="space-y-2">
                    <Label
                      htmlFor="phone"
                      className="text-sm font-medium text-gray-700"
                    >
                      Phone number
                    </Label>
                    <div className="relative">
                      <Phone className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-gray-400" />
                      <Input
                        id="phone"
                        type="tel"
                        placeholder="+1 (555) 123-4567"
                        value={phone}
                        onChange={(e) => setPhone(e.target.value)}
                        className="pl-10 h-12 rounded-xl border-gray-200 focus:border-blue-300 focus:ring-blue-100"
                        required={verificationMethod === "sms"}
                      />
                    </div>
                  </div>

                  <div className="p-4 bg-gradient-to-r from-blue-100 to-blue-200 rounded-xl">
                    <p className="text-sm text-blue-800">
                      <strong>SMS verification:</strong> We'll send a 6-digit
                      code to your phone via text message. Standard messaging
                      rates may apply.
                    </p>
                  </div>
                </TabsContent>

                {/* Submit Button */}
                <Button
                  type="submit"
                  disabled={isForgotLoading}
                  className="w-full h-12 bg-gradient-to-r from-blue-600 to-blue-400 hover:from-blue-700 hover:to-blue-500 text-white font-semibold rounded-xl transition-all duration-200 hover:scale-105"
                >
                  {isLoading ? (
                    <div className="flex items-center space-x-2">
                      <div className="w-4 h-4 border-2 border-white/30 border-t-white rounded-full animate-spin"></div>
                      <span>
                        Sending{" "}
                        {verificationMethod === "email" ? "email" : "SMS"}...
                      </span>
                    </div>
                  ) : (
                    <div className="flex items-center space-x-2">
                      <span>Send verification code</span>
                      <ArrowRight className="h-4 w-4" />
                    </div>
                  )}
                </Button>
              </form>
            </Tabs>

            <div className="text-center">
              <Button
                asChild
                variant="ghost"
                className="text-blue-600 hover:text-blue-700"
              >
                <Link to="/login" className="flex items-center space-x-2">
                  <ArrowLeft className="h-4 w-4" />
                  <span>Back to sign in</span>
                </Link>
              </Button>
            </div>

            <div className="p-4 bg-gradient-to-r from-blue-100 to-blue-200 rounded-xl">
              <p className="text-sm text-blue-800">
                <strong>Security tip:</strong> Choose the method you have
                immediate access to. SMS is often faster, but email works
                without cell service.
              </p>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
};

export default ForgotPassword;
