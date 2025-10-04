"use client";

import type React from "react";
import { useState } from "react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { motion } from "framer-motion";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { Checkbox } from "@/components/ui/checkbox";
import { Sprout, Eye, EyeOff } from "lucide-react";

/**
 * User role options for registration
 */
const USER_ROLES = [
  { id: "farmer", label: "Farmer" },
  { id: "buyer", label: "Buyer" },
  { id: "supplier", label: "Supplier" },
  { id: "logistics", label: "Logistics Provider" },
] as const;

/**
 * SignupPage Component
 * 
 * Registration page for new users to create an AgriTrust account.
 * Features:
 * - Multi-field registration form
 * - User role selection
 * - Password visibility toggle
 * - Terms and conditions acceptance
 * - Form validation and error handling
 * - Loading states during submission
 */
export default function SignupPage() {
  // Next.js router for navigation after successful signup
  const router = useRouter();

  // Form state management
  const [formData, setFormData] = useState({
    fullName: "",
    email: "",
    phone: "",
    password: "",
    confirmPassword: "",
    role: "",
  });
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);
  const [acceptedTerms, setAcceptedTerms] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState("");

  /**
   * Handle input field changes
   * Updates form data state for controlled inputs
   */
  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));
    // Clear error when user starts typing
    if (error) setError("");
  };

  /**
   * Handle role selection
   */
  const handleRoleChange = (roleId: string) => {
    setFormData((prev) => ({
      ...prev,
      role: roleId,
    }));
    if (error) setError("");
  };

  /**
   * Validate form data before submission
   * Returns error message if validation fails, empty string if valid
   */
  const validateForm = (): string => {
    if (!formData.fullName.trim()) {
      return "Please enter your full name";
    }
    if (!formData.email.includes("@")) {
      return "Please enter a valid email address";
    }
    if (formData.phone && !/^\+?[\d\s-()]+$/.test(formData.phone)) {
      return "Please enter a valid phone number";
    }
    if (formData.password.length < 8) {
      return "Password must be at least 8 characters long";
    }
    if (formData.password !== formData.confirmPassword) {
      return "Passwords do not match";
    }
    if (!formData.role) {
      return "Please select your role";
    }
    if (!acceptedTerms) {
      return "Please accept the terms and conditions";
    }
    return "";
  };

  /**
   * Handle form submission and user registration
   * Currently simulates registration with localStorage
   * 
   * @param e - Form event to prevent default submission
   */
  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    // Validate form data
    const validationError = validateForm();
    if (validationError) {
      setError(validationError);
      return;
    }

    setIsLoading(true);
    setError("");

    try {
      // TODO: Replace with actual API registration call
      // Simulate network delay for registration
      await new Promise((resolve) => setTimeout(resolve, 1500));

      // Store user data
      // NOTE: In production, use secure authentication system
      const userData = {
        fullName: formData.fullName,
        email: formData.email,
        phone: formData.phone,
        role: formData.role,
        registeredAt: new Date().toISOString(),
      };

      localStorage.setItem("auth_token", `mock_token_${Date.now()}`);
      localStorage.setItem("user_data", JSON.stringify(userData));

      // Redirect to dashboard based on role
      router.push("/dashboard");
    } catch (err) {
      setError(err instanceof Error ? err.message : "Registration failed. Please try again.");
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
        className="relative w-full max-w-2xl"
        initial="hidden"
        animate="visible"
        variants={cardVariants}
      >
        <Card className="border-emerald-800/50 bg-emerald-900/50 backdrop-blur-md shadow-lg">
          {/* Header section with logo and title */}
          <CardHeader className="space-y-1">
            {/* AgriTrust Logo */}
            <div className="mb-4 flex justify-center">
              <div className="flex h-12 w-12 items-center justify-center rounded-xl bg-gradient-to-r from-green-600 to-emerald-400 shadow-lg shadow-green-600/20">
                <Sprout className="h-7 w-7 text-white" />
              </div>
            </div>

            {/* Page title and description */}
            <CardTitle className="text-center text-2xl sm:text-3xl text-white">Create Your Account</CardTitle>
            <CardDescription className="text-center text-emerald-200">
              Join AgriTrust Connect and start building trust in agriculture
            </CardDescription>
          </CardHeader>

          {/* Registration form */}
          <form onSubmit={handleSubmit}>
            <CardContent className="space-y-4">
              {/* Display error message if validation fails */}
              {error && (
                <div className="rounded-md bg-red-500/10 border border-red-500/20 p-3 text-sm text-red-400">
                  {error}
                </div>
              )}

              {/* Full Name input */}
              <div className="space-y-2">
                <Label htmlFor="fullName" className="text-emerald-200">
                  Full Name <span className="text-red-500">*</span>
                </Label>
                <Input
                  id="fullName"
                  name="fullName"
                  type="text"
                  placeholder="John Doe"
                  value={formData.fullName}
                  onChange={handleInputChange}
                  disabled={isLoading}
                  required
                  autoComplete="name"
                  className="border-emerald-800/50 bg-emerald-900/50 text-emerald-100 placeholder:text-emerald-400 focus:border-emerald-500 focus:ring-emerald-500"
                />
              </div>

              {/* Email and Phone - Two column layout on larger screens */}
              <div className="grid gap-4 sm:grid-cols-2">
                {/* Email input */}
                <div className="space-y-2">
                  <Label htmlFor="email" className="text-emerald-200">
                    Email <span className="text-red-500">*</span>
                  </Label>
                  <Input
                    id="email"
                    name="email"
                    type="email"
                    placeholder="john@example.com"
                    value={formData.email}
                    onChange={handleInputChange}
                    disabled={isLoading}
                    required
                    autoComplete="email"
                    className="border-emerald-800/50 bg-emerald-900/50 text-emerald-100 placeholder:text-emerald-400 focus:border-emerald-500 focus:ring-emerald-500"
                  />
                </div>

                {/* Phone input (optional) */}
                <div className="space-y-2">
                  <Label htmlFor="phone" className="text-emerald-200">Phone (Optional)</Label>
                  <Input
                    id="phone"
                    name="phone"
                    type="tel"
                    placeholder="+1 (555) 123-4567"
                    value={formData.phone}
                    onChange={handleInputChange}
                    disabled={isLoading}
                    autoComplete="tel"
                    className="border-emerald-800/50 bg-emerald-900/50 text-emerald-100 placeholder:text-emerald-400 focus:border-emerald-500 focus:ring-emerald-500"
                  />
                </div>
              </div>

              {/* Password fields - Two column layout on larger screens */}
              <div className="grid gap-4 sm:grid-cols-2">
                {/* Password input with visibility toggle */}
                <div className="space-y-2">
                  <Label htmlFor="password" className="text-emerald-200">
                    Password <span className="text-red-500">*</span>
                  </Label>
                  <div className="relative">
                    <Input
                      id="password"
                      name="password"
                      type={showPassword ? "text" : "password"}
                      placeholder="••••••••"
                      value={formData.password}
                      onChange={handleInputChange}
                      disabled={isLoading}
                      required
                      autoComplete="new-password"
                      minLength={8}
                      className="border-emerald-800/50 bg-emerald-900/50 text-emerald-100 placeholder:text-emerald-400 focus:border-emerald-500 focus:ring-emerald-500 pr-10"
                    />
                    <button
                      type="button"
                      onClick={() => setShowPassword(!showPassword)}
                      className="absolute right-3 top-1/2 -translate-y-1/2 text-emerald-400 hover:text-emerald-300"
                      tabIndex={-1}
                      aria-label={showPassword ? "Hide password" : "Show password"}
                    >
                      {showPassword ? (
                        <EyeOff className="h-4 w-4" />
                      ) : (
                        <Eye className="h-4 w-4" />
                      )}
                    </button>
                  </div>
                  <p className="text-xs text-emerald-400">
                    Must be at least 8 characters
                  </p>
                </div>

                {/* Confirm Password input with visibility toggle */}
                <div className="space-y-2">
                  <Label htmlFor="confirmPassword" className="text-emerald-200">
                    Confirm Password <span className="text-red-500">*</span>
                  </Label>
                  <div className="relative">
                    <Input
                      id="confirmPassword"
                      name="confirmPassword"
                      type={showConfirmPassword ? "text" : "password"}
                      placeholder="••••••••"
                      value={formData.confirmPassword}
                      onChange={handleInputChange}
                      disabled={isLoading}
                      required
                      autoComplete="new-password"
                      minLength={8}
                      className="border-emerald-800/50 bg-emerald-900/50 text-emerald-100 placeholder:text-emerald-400 focus:border-emerald-500 focus:ring-emerald-500 pr-10"
                    />
                    <button
                      type="button"
                      onClick={() => setShowConfirmPassword(!showConfirmPassword)}
                      className="absolute right-3 top-1/2 -translate-y-1/2 text-emerald-400 hover:text-emerald-300"
                      tabIndex={-1}
                      aria-label={showConfirmPassword ? "Hide confirm password" : "Show confirm password"}
                    >
                      {showConfirmPassword ? (
                        <EyeOff className="h-4 w-4" />
                      ) : (
                        <Eye className="h-4 w-4" />
                      )}
                    </button>
                  </div>
                </div>
              </div>

              {/* Role selection */}
              <div className="space-y-2">
                <Label className="text-emerald-200">
                  I am a <span className="text-red-500">*</span>
                </Label>
                <div className="grid grid-cols-2 gap-3 sm:grid-cols-4">
                  {USER_ROLES.map((role) => (
                    <motion.button
                      key={role.id}
                      type="button"
                      onClick={() => handleRoleChange(role.id)}
                      disabled={isLoading}
                      className={`rounded-lg border-2 p-3 text-sm font-medium transition-all ${
                        formData.role === role.id
                          ? "border-emerald-500 bg-emerald-500/20 text-emerald-400"
                          : "border-emerald-800/50 bg-emerald-900/30 text-emerald-300 hover:border-emerald-500/50 hover:bg-emerald-900/50"
                      }`}
                      whileHover={{ scale: 1.03 }}
                      aria-label={`Select role: ${role.label}`}
                    >
                      {role.label}
                    </motion.button>
                  ))}
                </div>
              </div>

              {/* Terms and conditions checkbox */}
              <div className="flex items-start space-x-2">
                <Checkbox
                  id="terms"
                  checked={acceptedTerms}
                  onCheckedChange={(checked) => setAcceptedTerms(checked as boolean)}
                  disabled={isLoading}
                  className="border-emerald-800/50 data-[state=checked]:bg-emerald-600 data-[state=checked]:border-emerald-600"
                />
                <label
                  htmlFor="terms"
                  className="text-sm leading-none text-emerald-200 peer-disabled:cursor-not-allowed peer-disabled:opacity-70"
                >
                  I agree to the{" "}
                  <Link href="/terms" className="text-emerald-400 hover:text-emerald-300 hover:underline">
                    Terms of Service
                  </Link>{" "}
                  and{" "}
                  <Link href="/privacy" className="text-emerald-400 hover:text-emerald-300 hover:underline">
                    Privacy Policy
                  </Link>
                </label>
              </div>
            </CardContent>

            {/* Form actions */}
            <CardFooter className="flex flex-col gap-4 mt-2">
              {/* Submit button with loading state */}
              <motion.div variants={buttonGlowVariants} whileHover="hover">
                <Button
                  type="submit"
                  className="w-full bg-gradient-to-r from-green-600 to-emerald-400 text-white shadow-lg hover:from-green-700 hover:to-emerald-500 transition-all"
                  disabled={isLoading}
                  aria-label="Create AgriTrust Connect account"
                >
                  {isLoading ? "Creating account..." : "Create account"}
                </Button>
              </motion.div>

              {/* Login link for existing users */}
              <p className="text-center text-sm text-emerald-200">
                Already have an account?{" "}
                <Link href="/login" className="text-emerald-400 hover:text-emerald-300 hover:underline">
                  Sign in
                </Link>
              </p>
            </CardFooter>
          </form>
        </Card>
      </motion.div>
    </div>
  );
}