import { NextRequest, NextResponse } from "next/server";
import connectDB from "@/lib/db/mongoose";
import User from "@/models/User";
import { verifyRefreshToken, generateAccessToken } from "@/lib/auth/jwt";

// Define the expected shape of the decoded refresh token
interface DecodedToken {
  userId: string;
  // Add other fields if included in the refresh token
}

/**
 * Refresh Token API Route
 *
 * Generates new access token using a valid refresh token.
 * POST /api/auth/refresh-token
 */
export async function POST(request: NextRequest) {
  try {
    // Get refresh token from cookies or body
    let refreshToken = request.cookies.get("refreshToken")?.value;

    if (!refreshToken) {
      const body = await request.json();
      refreshToken = body.refreshToken;
    }

    if (!refreshToken) {
      return NextResponse.json(
        {
          success: false,
          error: "Refresh token is required",
        },
        { status: 401 }
      );
    }

    // Verify refresh token
    const decoded = verifyRefreshToken(refreshToken) as DecodedToken | null;

    if (!decoded || !decoded.userId) {
      return NextResponse.json(
        {
          success: false,
          error: "Invalid or expired refresh token",
        },
        { status: 401 }
      );
    }

    // Connect to database
    await connectDB();

    // Find user and verify refresh token matches
    const user = await User.findById(decoded.userId).select("+refreshToken");

    if (!user || user.refreshToken !== refreshToken) {
      return NextResponse.json(
        {
          success: false,
          error: "Invalid refresh token",
        },
        { status: 401 }
      );
    }

    if (!user.isActive) {
      return NextResponse.json(
        {
          success: false,
          error: "Account is deactivated",
        },
        { status: 403 }
      );
    }

    // Generate new access token
    let accessToken: string;
    try {
      accessToken = generateAccessToken({
        userId: user._id.toString(),
        email: user.email,
        role: user.role,
      });
    } catch (error) {
      console.error("Token generation failed:", error);
      return NextResponse.json(
        {
          success: false,
          error: "Failed to generate access token",
        },
        { status: 500 }
      );
    }

    // Create response
    const response = NextResponse.json(
      {
        success: true,
        message: "Token refreshed successfully",
        data: {
          accessToken,
        },
      },
      { status: 200 }
    );

    // Set new access token cookie
    response.cookies.set("accessToken", accessToken, {
      httpOnly: true,
      secure: process.env.NODE_ENV === "production",
      sameSite: "strict", // Changed to 'strict' for better security
      maxAge: 15 * 60, // 15 minutes
      path: "/",
    });

    return response;
  } catch (error) {
    console.error("Refresh token error:", error);
    return NextResponse.json(
      {
        success: false,
        error: "Failed to refresh token",
      },
      { status: 500 }
    );
  }
}