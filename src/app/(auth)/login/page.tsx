"use client";

import type React from "react";
import { useState } from "react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { motion } from "framer-motion";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Sprout } from "lucide-react";

/**
 * LoginPage Component
 *
 * Renders the login page for AgriTrust platform where users can authenticate
 * to access their farmer dashboard. Includes form validation and loading states.
 */
export default function LoginPage() {
  // Next.js router for navigation after successful login
  const router = useRouter();

  // Form state management
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState("");

  /**
   * Handles form submission and authentication
   * Currently simulates authentication with localStorage
   *
   * @param e - Form event to prevent default submission
   */
  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError(""); // Clear any previous errors
    setIsLoading(true);

    try {
      // TODO: Replace with actual API authentication call
      // Simulate network delay for authentication
      await new Promise((resolve) => setTimeout(resolve, 1000));

      // Basic email validation
      if (!email.includes("@")) {
        throw new Error("Please enter a valid email address");
      }

      // Store authentication data
      // NOTE: In production, use httpOnly cookies or secure token storage
      localStorage.setItem("auth_token", `mock_token_${Date.now()}`);
      localStorage.setItem("user_email", email);

      // Redirect to farmer dashboard on successful login
      router.push("/farmer");
    } catch (err) {
      // Handle authentication errors
      setError(
        err instanceof Error
          ? err.message
          : "Authentication failed. Please try again."
      );
    } finally {
      setIsLoading(false);
    }
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
          <CardHeader className="space-y-1">
            {/* AgriTrust Logo */}
            <div className="mb-4 flex justify-center">
              <div className="flex h-12 w-12 items-center justify-center rounded-xl bg-gradient-to-r from-green-600 to-emerald-400 shadow-lg shadow-green-600/20">
                <Sprout className="h-7 w-7 text-white" />
              </div>
            </div>

            {/* Page title and description */}
            <CardTitle className="text-center text-2xl sm:text-3xl text-white">
              Welcome Back
            </CardTitle>
            <CardDescription className="text-center text-emerald-200">
              Sign in to access your AgriTrust dashboard
            </CardDescription>
          </CardHeader>

          {/* Login form */}
          <form onSubmit={handleSubmit}>
            <CardContent className="space-y-4">
              {/* Display error message if authentication fails */}
              {error && (
                <div className="rounded-md bg-red-500/10 border border-red-500/20 p-3 text-sm text-red-400">
                  {error}
                </div>
              )}

              {/* Email input field */}
              <div className="space-y-2">
                <Label htmlFor="email" className="text-emerald-200">
                  Email
                </Label>
                <Input
                  id="email"
                  type="email"
                  placeholder="farmer@example.com"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  disabled={isLoading}
                  required
                  autoComplete="email"
                  className="border-emerald-800/50 bg-emerald-900/50 text-emerald-100 placeholder:text-emerald-400 focus:border-emerald-500 focus:ring-emerald-500"
                />
              </div>

              {/* Password input field */}
              <div className="space-y-2">
                <div className="flex items-center justify-between">
                  <Label htmlFor="password" className="text-emerald-200">
                    Password
                  </Label>
                  <Link
                    href="/forgot-password"
                    className="text-sm text-emerald-400 hover:text-emerald-300 hover:underline"
                    tabIndex={-1}
                  >
                    Forgot password?
                  </Link>
                </div>
                <Input
                  id="password"
                  type="password"
                  placeholder="••••••••"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  disabled={isLoading}
                  required
                  autoComplete="current-password"
                  minLength={8}
                  className="border-emerald-800/50 bg-emerald-900/50 text-emerald-100 placeholder:text-emerald-400 focus:border-emerald-500 focus:ring-emerald-500"
                />
              </div>
            </CardContent>

            {/* Form actions */}
            <CardFooter className="flex flex-col gap-4 mt-2">
              {/* Submit button with loading state */}
              <motion.div variants={buttonGlowVariants} whileHover="hover">
                <Button
                  type="submit"
                  className="w-full bg-gradient-to-r from-green-600 to-emerald-400 text-white shadow-lg hover:from-green-700 hover:to-emerald-500 transition-all"
                  disabled={isLoading || !email || !password}
                  aria-label="Sign in to AgriTrust Connect"
                >
                  {isLoading ? "Signing in..." : "Sign in"}
                </Button>
              </motion.div>

              {/* Sign up link for new users */}
              <p className="text-center text-sm text-emerald-200">
                Don’t have an account?{" "}
                <Link
                  href="/signup"
                  className="text-emerald-400 hover:text-emerald-300 hover:underline"
                >
                  Sign up
                </Link>
              </p>
            </CardFooter>
          </form>
        </Card>
      </motion.div>
    </div>
  );
}