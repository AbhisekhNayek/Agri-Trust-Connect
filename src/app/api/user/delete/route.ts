import { NextRequest, NextResponse } from "next/server";
import  connectDB  from "@/lib/db/mongoose";
import User from "@/models/User";
import { withFarmer, JWTPayload } from "@/middleware/role";

export const DELETE = withFarmer(async function deleteProfile(request: NextRequest, user: JWTPayload) {
  try {
    await connectDB();
    const dbUser = await User.findById(user.userId);
    if (!dbUser || !dbUser.isActive) {
      return NextResponse.json(
        { success: false, message: "User not found" },
        { status: 404 }
      );
    }

    dbUser.isActive = false;
    dbUser.refreshToken = undefined;
    dbUser.refreshTokenVersion += 1;
    await dbUser.save();

    return NextResponse.json({
      success: true,
      message: "Account deleted successfully",
    });
  } catch (error: any) {
    return NextResponse.json(
      { success: false, message: "Server error", error: error.message },
      { status: 500 }
    );
  }
});
