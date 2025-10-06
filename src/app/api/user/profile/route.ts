import { NextRequest, NextResponse } from "next/server";
import  connectDB  from "@/lib/db/mongoose";
import User from "@/models/User";
import { withFarmer, JWTPayload } from "@/middleware/role";

export const GET = withFarmer(async function getProfile(request: NextRequest, user: JWTPayload) {
  try {
    await connectDB();
    const dbUser = await User.findById(user.userId);
    if (!dbUser || !dbUser.isActive) {
      return NextResponse.json(
        { success: false, message: "User not found" },
        { status: 404 }
      );
    }

    return NextResponse.json({
      success: true,
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
