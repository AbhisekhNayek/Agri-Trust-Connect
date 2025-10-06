import { NextResponse } from "next/server";
import mongoose from "mongoose";
import User from "@/models/User";
import  connectDB  from "@/lib/db/mongoose";

export async function POST(request: Request) {
  try {
    await connectDB();
    const { fullName, email, password, confirmPassword, phone, role } = await request.json();

    if (!fullName || !email || !password || !confirmPassword || !role) {
      return NextResponse.json(
        { message: "All required fields must be provided" },
        { status: 400 }
      );
    }

    if (password !== confirmPassword) {
      return NextResponse.json(
        { message: "Passwords do not match" },
        { status: 400 }
      );
    }

    const validRoles = ["farmer", "buyer", "supplier", "logistics"];
    if (!validRoles.includes(role)) {
      return NextResponse.json(
        { message: "Invalid role provided" },
        { status: 400 }
      );
    }

    const existingUser = await User.findByEmail(email);
    if (existingUser) {
      return NextResponse.json(
        { message: "Email already exists" },
        { status: 400 }
      );
    }

    const user = new User({
      fullName,
      email,
      password,
      phone,
      role,
    });

    const verificationToken = user.generateEmailVerificationToken();
    await user.save();

    return NextResponse.json(
      {
        message: "User created successfully",
        user: {
          _id: user._id,
          fullName: user.fullName,
          email: user.email,
          phone: user.phone,
          role: user.role,
          isEmailVerified: user.isEmailVerified,
          isActive: user.isActive,
          createdAt: user.createdAt,
          updatedAt: user.updatedAt,
        },
        verificationToken,
      },
      { status: 201 }
    );
  } catch (error: any) {
    return NextResponse.json(
      { message: "Server error", error: error.message },
      { status: 500 }
    );
  }
}