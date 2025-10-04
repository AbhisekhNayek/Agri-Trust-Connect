"use client"

import type React from "react"
import { useState } from "react"
import Link from "next/link"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"
import { Sprout, ArrowLeft, Mail, CheckCircle2 } from "lucide-react"

/**
 * ForgotPasswordPage Component
 * 
 * Password recovery page where users can request a password reset link.
 * Features:
 * - Email input for password reset request
 * - Success state showing confirmation message
 * - Loading state during submission
 * - Back to login navigation
 * - Clear error handling
 */
export default function ForgotPasswordPage() {
  // Form state management
  const [email, setEmail] = useState("")
  const [isLoading, setIsLoading] = useState(false)
  const [error, setError] = useState("")
  const [isSuccess, setIsSuccess] = useState(false)

  /**
   * Handle form submission to request password reset
   * Simulates sending reset email and shows success message
   * 
   * @param e - Form event to prevent default submission
   */
  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setError("")
    setIsLoading(true)

    try {
      // Validate email format
      if (!email.includes("@")) {
        throw new Error("Please enter a valid email address")
      }

      // TODO: Replace with actual API call to send reset email
      // Simulate network delay for password reset request
      await new Promise((resolve) => setTimeout(resolve, 1500))

      // Show success message
      setIsSuccess(true)
    } catch (err) {
      setError(err instanceof Error ? err.message : "Failed to send reset email. Please try again.")
    } finally {
      setIsLoading(false)
    }
  }

  /**
   * Reset form to initial state
   * Allows user to try again with different email
   */
  const handleTryAgain = () => {
    setIsSuccess(false)
    setEmail("")
    setError("")
  }

  return (
    <div className="flex min-h-screen items-center justify-center bg-gradient-to-br from-gray-900 via-gray-800 to-black p-4">
      <Card className="w-full max-w-md border-gray-700 bg-gray-900/50 backdrop-blur-xl">
        {!isSuccess ? (
          <>
            {/* Header section with logo and title */}
            <CardHeader className="space-y-1">
              {/* AgriTrust Logo */}
              <div className="mb-4 flex justify-center">
                <div className="flex h-12 w-12 items-center justify-center rounded-xl bg-gradient-to-br from-green-600 to-green-500 shadow-lg shadow-green-500/20">
                  <Sprout className="h-7 w-7 text-white" />
                </div>
              </div>
              
              {/* Page title and description */}
              <CardTitle className="text-center text-2xl text-white">Forgot password?</CardTitle>
              <CardDescription className="text-center text-gray-400">
                No worries! Enter your email and we'll send you reset instructions.
              </CardDescription>
            </CardHeader>

            {/* Password reset form */}
            <form onSubmit={handleSubmit}>
              <CardContent className="space-y-4">
                {/* Display error message if request fails */}
                {error && (
                  <div className="rounded-md bg-red-500/10 border border-red-500/20 p-3 text-sm text-red-400">
                    {error}
                  </div>
                )}

                {/* Email input field */}
                <div className="space-y-2">
                  <Label htmlFor="email" className="text-gray-200">Email address</Label>
                  <div className="relative">
                    <Mail className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-gray-500" />
                    <Input
                      id="email"
                      type="email"
                      placeholder="farmer@example.com"
                      value={email}
                      onChange={(e) => {
                        setEmail(e.target.value)
                        if (error) setError("") // Clear error when user types
                      }}
                      disabled={isLoading}
                      required
                      autoComplete="email"
                      autoFocus
                      className="border-gray-700 bg-gray-800/50 text-white placeholder:text-gray-500 focus:border-green-500 focus:ring-green-500 pl-10"
                    />
                  </div>
                  <p className="text-xs text-gray-500">
                    We'll send a password reset link to this email
                  </p>
                </div>
              </CardContent>

              {/* Form actions */}
              <CardFooter className="flex flex-col gap-4 mt-2">
                {/* Submit button with loading state */}
                <Button
                  type="submit"
                  className="w-full bg-gradient-to-r from-green-600 to-green-500 hover:from-green-700 hover:to-green-600 text-white shadow-lg shadow-green-500/20"
                  disabled={isLoading || !email}
                >
                  {isLoading ? "Sending..." : "Send reset link"}
                </Button>

                {/* Back to login link */}
                <Link
                  href="/login"
                  className="flex items-center justify-center gap-2 text-sm text-gray-400 hover:text-gray-300"
                >
                  <ArrowLeft className="h-4 w-4" />
                  Back to login
                </Link>
              </CardFooter>
            </form>
          </>
        ) : (
          <>
            {/* Success state - Email sent confirmation */}
            <CardHeader className="space-y-1">
              {/* Success icon */}
              <div className="mb-4 flex justify-center">
                <div className="flex h-16 w-16 items-center justify-center rounded-full bg-green-500/20">
                  <CheckCircle2 className="h-10 w-10 text-green-500" />
                </div>
              </div>
              
              {/* Success message */}
              <CardTitle className="text-center text-2xl text-white">Check your email</CardTitle>
              <CardDescription className="text-center text-gray-400">
                We've sent password reset instructions to
              </CardDescription>
              <p className="text-center text-sm font-medium text-white">{email}</p>
            </CardHeader>

            <CardContent className="space-y-4">
              {/* Information box with instructions */}
              <div className="rounded-lg bg-green-500/10 border border-green-500/20 p-4 text-sm text-gray-300">
                <p className="font-medium text-green-400">What's next?</p>
                <ul className="mt-2 space-y-1 text-xs text-gray-400">
                  <li>• Check your email inbox (and spam folder)</li>
                  <li>• Click the reset link in the email</li>
                  <li>• Create a new password</li>
                  <li>• Log in with your new password</li>
                </ul>
              </div>

              {/* Didn't receive email section */}
              <div className="text-center text-sm text-gray-400">
                <p>Didn't receive the email?</p>
                <button
                  onClick={handleTryAgain}
                  className="mt-1 text-green-500 hover:text-green-400 hover:underline"
                >
                  Try another email address
                </button>
              </div>
            </CardContent>

            {/* Actions */}
            <CardFooter className="flex flex-col gap-4">
              {/* Back to login button */}
              <Button
                asChild
                variant="outline"
                className="w-full border-gray-700 bg-gray-800/50 text-white hover:bg-gray-800 hover:text-white"
              >
                <Link href="/login">
                  <ArrowLeft className="mr-2 h-4 w-4" />
                  Back to login
                </Link>
              </Button>

              {/* Resend email option */}
              <button
                onClick={handleSubmit}
                disabled={isLoading}
                className="text-sm text-gray-400 hover:text-gray-300 disabled:opacity-50"
              >
                {isLoading ? "Resending..." : "Resend email"}
              </button>
            </CardFooter>
          </>
        )}
      </Card>
    </div>
  )
}