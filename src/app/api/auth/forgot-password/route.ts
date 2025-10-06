import { NextRequest, NextResponse } from "next/server"
import connectDB from "@/lib/db/mongoose"
import User from "@/models/User"

/**
 * Forgot Password API Route
 * 
 * Generates password reset token and sends reset link (simulated).
 * POST /api/auth/forgot-password
 */

export async function POST(request: NextRequest) {
  try {
    // Connect to database
    await connectDB()

    // Parse request body
    const body = await request.json()
    const { email } = body

    // Validation
    if (!email) {
      return NextResponse.json(
        {
          success: false,
          error: "Email is required",
        },
        { status: 400 }
      )
    }

    // Find user by email
    const user = await User.findOne({ email: email.toLowerCase() })

    // Always return success to prevent email enumeration
    if (!user) {
      return NextResponse.json(
        {
          success: true,
          message: "If an account exists with this email, a password reset link has been sent",
        },
        { status: 200 }
      )
    }

    // Check if user is active
    if (!user.isActive) {
      return NextResponse.json(
        {
          success: true,
          message: "If an account exists with this email, a password reset link has been sent",
        },
        { status: 200 }
      )
    }

    // Generate password reset token
    const resetToken = user.generatePasswordResetToken()
    await user.save()

    // TODO: Send email with reset link
    // For now, we'll just log it (in production, use email service)
    const resetUrl = `${process.env.NEXT_PUBLIC_APP_URL}/reset-password?token=${resetToken}`
    
    console.log("Password Reset Link:", resetUrl)
    console.log("Reset token expires in 1 hour")

    // In development, return the token (remove in production)
    if (process.env.NODE_ENV === "development") {
      return NextResponse.json(
        {
          success: true,
          message: "Password reset link has been sent to your email",
          devOnly: {
            resetToken,
            resetUrl,
          },
        },
        { status: 200 }
      )
    }

    return NextResponse.json(
      {
        success: true,
        message: "If an account exists with this email, a password reset link has been sent",
      },
      { status: 200 }
    )
  } catch (error) {
    console.error("Forgot password error:", error)
    return NextResponse.json(
      {
        success: false,
        error: "An error occurred. Please try again.",
      },
      { status: 500 }
    )
  }
}