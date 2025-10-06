import { NextRequest, NextResponse } from "next/server"
import connectDB from "@/lib/db/mongoose"
import User from "@/models/User"
import { verifyAccessToken } from "@/lib/auth/jwt"

/**
 * Logout API Route
 * 
 * Handles user logout by clearing tokens and session.
 * POST /api/auth/logout
 */

export async function POST(request: NextRequest) {
  try {
    // Get token from cookies
    const token = request.cookies.get("accessToken")?.value

    if (token) {
      // Verify token and get user
      const decoded = verifyAccessToken(token)

      if (decoded) {
        // Connect to database
        await connectDB()

        // Clear refresh token from database
        await User.findByIdAndUpdate(decoded.userId, {
          refreshToken: null,
        })
      }
    }

    // Create response
    const response = NextResponse.json(
      {
        success: true,
        message: "Logged out successfully",
      },
      { status: 200 }
    )

    // Clear cookies
    response.cookies.delete("accessToken")
    response.cookies.delete("refreshToken")

    return response
  } catch (error) {
    console.error("Logout error:", error)

    // Still clear cookies even if there's an error
    const response = NextResponse.json(
      {
        success: true,
        message: "Logged out successfully",
      },
      { status: 200 }
    )

    response.cookies.delete("accessToken")
    response.cookies.delete("refreshToken")

    return response
  }
}