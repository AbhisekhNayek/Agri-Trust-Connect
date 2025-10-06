"use client";

import type React from "react";
import { useState } from "react";
import Link from "next/link";
import { motion } from "framer-motion";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { Sprout, ArrowLeft, Mail, CheckCircle2 } from "lucide-react";

export default function ForgotPasswordPage() {
  const [email, setEmail] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState("");
  const [isSuccess, setIsSuccess] = useState(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError("");
    setIsLoading(true);

    try {
      // Validate email format
      if (!email.includes("@")) {
        throw new Error("Please enter a valid email address");
      }

      // Send request to forgot-password API
      const response = await fetch("/api/auth/forgot-password", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ email }),
      });

      const data = await response.json();

      if (!response.ok) {
        throw new Error(data.message || "Failed to send reset email");
      }

      // Show success message
      setIsSuccess(true);
    } catch (err) {
      setError(err instanceof Error ? err.message : "Failed to send reset email. Please try again.");
    } finally {
      setIsLoading(false);
    }
  };

  const handleTryAgain = () => {
    setIsSuccess(false);
    setEmail("");
    setError("");
  };

  const cardVariants = {
    hidden: { opacity: 0, scale: 0.95 },
    visible: { opacity: 1, scale: 1, transition: { duration: 0.6 } },
  };

  const buttonGlowVariants = {
    hover: {
      boxShadow: "0 0 20px rgba(34, 197, 94, 0.5)",
      scale: 1.05,
      transition: { duration: 0.3 },
    },
  };

  return (
    <div className="flex min-h-screen items-center justify-center bg-[linear-gradient(135deg,#1a3c34,#064e3b,#1a3c34)] animate-gradient-bg bg-[length:200%_200%] p-4">
      <div
        className="absolute inset-0 bg-[url('/leaf-texture.png')] bg-[size:200px_200px] opacity-10"
        aria-hidden="true"
      />
      <motion.div
        className="relative w-full max-w-md"
        initial="hidden"
        animate="visible"
        variants={cardVariants}
      >
        <Card className="border-emerald-800/50 bg-emerald-900/50 backdrop-blur-md shadow-lg">
          {!isSuccess ? (
            <>
              <CardHeader className="space-y-1">
                <div className="mb-4 flex justify-center">
                  <div className="flex h-12 w-12 items-center justify-center rounded-xl bg-gradient-to-r from-green-600 to-emerald-400 shadow-lg shadow-green-600/20">
                    <Sprout className="h-7 w-7 text-white" />
                  </div>
                </div>
                <CardTitle className="text-center text-2xl sm:text-3xl text-white">Forgot Password?</CardTitle>
                <CardDescription className="text-center text-emerald-200">
                  No worries! Enter your email and we'll send you reset instructions.
                </CardDescription>
              </CardHeader>

              <form onSubmit={handleSubmit}>
                <CardContent className="space-y-4">
                  {error && (
                    <div className="rounded-md bg-red-500/10 border border-red-500/20 p-3 text-sm text-red-400">
                      {error}
                    </div>
                  )}

                  <div className="space-y-2">
                    <Label htmlFor="email" className="text-emerald-200">Email Address</Label>
                    <div className="relative">
                      <Mail className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-emerald-400" />
                      <Input
                        id="email"
                        type="email"
                        placeholder="farmer@example.com"
                        value={email}
                        onChange={(e) => {
                          setEmail(e.target.value);
                          if (error) setError("");
                        }}
                        disabled={isLoading}
                        required
                        autoComplete="email"
                        autoFocus
                        className="border-emerald-800/50 bg-emerald-900/50 text-emerald-100 placeholder:text-emerald-400 focus:border-emerald-500 focus:ring-emerald-500 pl-10"
                      />
                    </div>
                    <p className="text-xs text-emerald-400">
                      We'll send a password reset link to this email
                    </p>
                  </div>
                </CardContent>

                <CardFooter className="flex flex-col gap-4 mt-2">
                  <motion.div variants={buttonGlowVariants} whileHover="hover">
                    <Button
                      type="submit"
                      className="w-full bg-gradient-to-r from-green-600 to-emerald-400 text-white shadow-lg hover:from-green-700 hover:to-emerald-500 transition-all"
                      disabled={isLoading || !email}
                      aria-label="Send password reset link"
                    >
                      {isLoading ? "Sending..." : "Send Reset Link"}
                    </Button>
                  </motion.div>

                  <Link
                    href="/login"
                    className="flex items-center justify-center gap-2 text-sm text-emerald-200 hover:text-emerald-300 hover:underline"
                  >
                    <ArrowLeft className="h-4 w-4" />
                    Back to Login
                  </Link>
                </CardFooter>
              </form>
            </>
          ) : (
            <>
              <CardHeader className="space-y-1">
                <div className="mb-4 flex justify-center">
                  <div className="flex h-16 w-16 items-center justify-center rounded-full bg-emerald-500/20">
                    <CheckCircle2 className="h-10 w-10 text-emerald-400" />
                  </div>
                </div>
                <CardTitle className="text-center text-2xl sm:text-3xl text-white">Check Your Email</CardTitle>
                <CardDescription className="text-center text-emerald-200">
                  We've sent password reset instructions to
                </CardDescription>
                <p className="text-center text-sm font-medium text-emerald-100">{email}</p>
              </CardHeader>

              <CardContent className="space-y-4">
                <div className="rounded-lg bg-emerald-500/10 border border-emerald-500/20 p-4 text-sm text-emerald-200">
                  <p className="font-medium text-emerald-400">What's next?</p>
                  <ul className="mt-2 space-y-1 text-xs text-emerald-300">
                    <li>• Check your email inbox (and spam folder)</li>
                    <li>• Click the reset link in the email</li>
                    <li>• Create a new password</li>
                    <li>• Log in with your new password</li>
                  </ul>
                </div>

                <div className="text-center text-sm text-emerald-200">
                  <p>Didn't receive the email?</p>
                  <button
                    onClick={handleTryAgain}
                    className="mt-1 text-emerald-400 hover:text-emerald-300 hover:underline"
                  >
                    Try another email address
                  </button>
                </div>
              </CardContent>

              <CardFooter className="flex flex-col gap-4">
                <motion.div variants={buttonGlowVariants} whileHover="hover">
                  <Button
                    asChild
                    variant="outline"
                    className="w-full border-emerald-800/50 bg-emerald-900/50 text-emerald-200 hover:bg-emerald-900/70 hover:text-emerald-300"
                  >
                    <Link href="/login">
                      <ArrowLeft className="mr-2 h-4 w-4" />
                      Back to Login
                    </Link>
                  </Button>
                </motion.div>

                <motion.button
                  onClick={handleSubmit}
                  disabled={isLoading}
                  className="text-sm text-emerald-200 hover:text-emerald-300 hover:underline disabled:opacity-50"
                  whileHover={{ scale: 1.03 }}
                  aria-label="Resend password reset email"
                >
                  {isLoading ? "Resending..." : "Resend Email"}
                </motion.button>
              </CardFooter>
            </>
          )}
        </Card>
      </motion.div>
    </div>
  );
}