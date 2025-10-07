import { NextRequest, NextResponse } from "next/server";
import connectDB from "@/lib/db/mongoose";
import User, { UserRole } from "@/models/User";
import bcrypt from "bcryptjs";
import jwt from "jsonwebtoken";

export async function POST(request: NextRequest) {
  try {
    await connectDB();

    const { email, password } = await request.json();

    if (!email || !password) {
      return NextResponse.json(
        { success: false, message: "Email and password are required" },
        { status: 400 }
      );
    }

    const user = await User.findByEmail(email);
    if (!user || !user.isActive) {
      return NextResponse.json(
        { success: false, message: "Invalid credentials" },
        { status: 401 }
      );
    }

    const isPasswordValid = await user.comparePassword(password);
    if (!isPasswordValid) {
      return NextResponse.json(
        { success: false, message: "Invalid credentials" },
        { status: 401 }
      );
    }

    if (!user.isEmailVerified) {
      return NextResponse.json(
        {
          success: false,
          message: "Please verify your email before logging in",
        },
        { status: 403 }
      );
    }

    const payload = {
      userId: user._id.toString(),
      role: user.role,
      refreshTokenVersion: user.refreshTokenVersion,
    };

    const accessToken = jwt.sign(
      payload,
      process.env.JWT_SECRET as jwt.Secret,
      { expiresIn: process.env.JWT_EXPIRES_IN || "1h" }
    );

    const refreshToken = jwt.sign(payload, process.env.JWT_SECRET!, {
      expiresIn: process.env.JWT_REFRESH_EXPIRES_IN || "7d",
    });

    user.refreshToken = refreshToken;
    user.lastLogin = new Date();
    await user.save();

    return NextResponse.json(
      {
        success: true,
        message: "Login successful",
        accessToken,
        refreshToken,
        user: {
          id: user._id,
          fullName: user.fullName,
          email: user.email,
          role: user.role,
        },
      },
      { status: 200 }
    );
  } catch (error: any) {
    return NextResponse.json(
      { success: false, message: "Server error", error: error.message },
      { status: 500 }
    );
  }
}
