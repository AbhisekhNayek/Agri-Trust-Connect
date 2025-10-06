import { NextRequest, NextResponse } from "next/server"
import connectDB from "@/lib/db/mongoose"
import User from "@/models/User"
import { withAuth } from "@/middleware/auth"

/**
 * User Profile API Routes
 * 
 * GET  /api/user/profile - Get current user profile
 * PUT  /api/user/profile - Update user profile
 */

/**
 * Get current user profile
 */
export const GET = withAuth(async (request: NextRequest, user) => {
  try {
    await connectDB()

    const userProfile = await User.findById(user.userId)

    if (!userProfile) {
      return NextResponse.json(
        {
          success: false,
          error: "User not found",
        },
        { status: 404 }
      )
    }

    return NextResponse.json(
      {
        success: true,
        data: {
          user: userProfile,
        },
      },
      { status: 200 }
    )
  } catch (error) {
    console.error("Get profile error:", error)
    return NextResponse.json(
      {
        success: false,
        error: "Failed to fetch profile",
      },
      { status: 500 }
    )
  }
})

/**
 * Update user profile
 */
export const PUT = withAuth(async (request: NextRequest, user) => {
  try {
    await connectDB()

    const body = await request.json()
    const { fullName, phone } = body

    // Validate inputs
    const updates: any = {}
    
    if (fullName) {
      if (fullName.trim().length < 2) {
        return NextResponse.json(
          {
            success: false,
            error: "Name must be at least 2 characters",
          },
          { status: 400 }
        )
      }
      updates.fullName = fullName.trim()
    }

    if (phone !== undefined) {
      if (phone && !/^\+?[\d\s-()]+$/.test(phone)) {
        return NextResponse.json(
          {
            success: false,
            error: "Invalid phone number format",
          },
          { status: 400 }
        )
      }
      updates.phone = phone.trim()
    }

    // Update user
    const updatedUser = await User.findByIdAndUpdate(
      user.userId,
      updates,
      { new: true, runValidators: true }
    )

    if (!updatedUser) {
      return NextResponse.json(
        {
          success: false,
          error: "User not found",
        },
        { status: 404 }
      )
    }

    return NextResponse.json(
      {
        success: true,
        message: "Profile updated successfully",
        data: {
          user: updatedUser,
        },
      },
      { status: 200 }
    )
  } catch (error) {
    console.error("Update profile error:", error)
    return NextResponse.json(
      {
        success: false,
        error: "Failed to update profile",
      },
      { status: 500 }
    )
  }
})