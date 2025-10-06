import { NextRequest, NextResponse } from "next/server";
import  connectDB  from "@/lib/db/mongoose";
import User from "@/models/User";
import { withFarmer, JWTPayload } from "@/middleware/role";

export const PUT = withFarmer(async function updateProfile(request: NextRequest, user: JWTPayload) {
  try {
    await connectDB();
    const { fullName, phone } = await request.json();

    if (!fullName) {
      return NextResponse.json(
        { success: false, message: "Full name is required" },
        { status: 400 }
      );
    }

    const dbUser = await User.findById(user.userId);
    if (!dbUser || !dbUser.isActive) {
      return NextResponse.json(
        { success: false, message: "User not found" },
        { status: 404 }
      );
    }

    dbUser.fullName = fullName;
    if (phone) dbUser.phone = phone;
    await dbUser.save();

    return NextResponse.json({
      success: true,
      message: "Profile updated successfully",
      user: {
        id: dbUser._id,
        fullName: dbUser.fullName,
        email: dbUser.email,
        phone: dbUser.phone,
        role: dbUser.role,
      },
    });
  } catch (error: any) {
    return NextResponse.json(
      { success: false, message: "Server error", error: error.message },
      { status: 500 }
    );
  }
});
