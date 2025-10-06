import { NextRequest, NextResponse } from "next/server"
import connectDB from "@/lib/db/mongoose"
import User from "@/models/User"

/**
 * Reset Password API Route
 * 
 * Resets user password using valid reset token.
 * POST /api/auth/reset-password
 */

export async function POST(request: NextRequest) {
  try {
    // Connect to database
    await connectDB()

    // Parse request body
    const body = await request.json()
    const { token, password } = body

    // Validation
    if (!token || !password) {
      return NextResponse.json(
        {
          success: false,
          error: "Token and password are required",
        },
        { status: 400 }
      )
    }

    // Validate password length
    if (password.length < 8) {
      return NextResponse.json(
        {
          success: false,
          error: "Password must be at least 8 characters long",
        },
        { status: 400 }
      )
    }

    // Find user with valid reset token
    const user = await User.findOne({
      passwordResetToken: token,
      passwordResetExpires: { $gt: new Date() },
    }).select("+passwordResetToken +passwordResetExpires")

    if (!user) {
      return NextResponse.json(
        {
          success: false,
          error: "Invalid or expired reset token",
        },
        { status: 400 }
      )
    }

    // Update password
    user.password = password
    user.passwordResetToken = undefined
    user.passwordResetExpires = undefined
    await user.save()

    return NextResponse.json(
      {
        success: true,
        message: "Password reset successfully. You can now login with your new password.",
      },
      { status: 200 }
    )
  } catch (error) {
    console.error("Reset password error:", error)
    return NextResponse.json(
      {
        success: false,
        error: "An error occurred. Please try again.",
      },
      { status: 500 }
    )
  }
}