import { NextRequest, NextResponse } from "next/server";
import jwt from "jsonwebtoken";
import { UserRole } from "@/models/User";

// Define JWTPayload interface
export interface JWTPayload {
  userId: string;
  role: UserRole;
  refreshTokenVersion: number;
}

/**
 * Check if user has required role
 * @param userRole - User's current role
 * @param allowedRoles - Array of allowed roles
 * @returns True if user has permission
 */
export function hasRole(userRole: string, allowedRoles: UserRole[]): boolean {
  return allowedRoles.includes(userRole as UserRole);
}

/**
 * Middleware to verify JWT and extract user
 */
export function withAuth(
  handler: (request: NextRequest, user: JWTPayload) => Promise<NextResponse>
) {
  return async (request: NextRequest): Promise<NextResponse> => {
    const authHeader = request.headers.get("Authorization");
    if (!authHeader || !authHeader.startsWith("Bearer ")) {
      return NextResponse.json(
        { success: false, error: "No token provided" },
        { status: 401 }
      );
    }

    const token = authHeader.replace("Bearer ", "");

    try {
      const payload = jwt.verify(token, process.env.JWT_SECRET!) as JWTPayload;
      return handler(request, payload);
    } catch (error: any) {
      return NextResponse.json(
        {
          success: false,
          error: error.name === "TokenExpiredError" ? "Token expired" : "Invalid token",
        },
        { status: 401 }
      );
    }
  };
}

/**
 * Middleware wrapper to check user role
 * Returns 403 if user doesn't have required role
 */
export function withRole(
  allowedRoles: UserRole[],
  handler: (request: NextRequest, user: JWTPayload) => Promise<NextResponse>
) {
  return withAuth(async (request: NextRequest, user: JWTPayload) => {
    if (!hasRole(user.role, allowedRoles)) {
      return NextResponse.json(
        {
          success: false,
          error: "Forbidden: You don't have permission to access this resource",
          requiredRoles: allowedRoles,
        },
        { status: 403 }
      );
    }
    return handler(request, user);
  });
}

/**
 * Admin-only middleware
 */
export function withAdmin(
  handler: (request: NextRequest, user: JWTPayload) => Promise<NextResponse>
) {
  return withRole([UserRole.ADMIN], handler);
}

/**
 * Farmer-only middleware
 */
export function withFarmer(
  handler: (request: NextRequest, user: JWTPayload) => Promise<NextResponse>
) {
  return withRole([UserRole.FARMER], handler);
}

/**
 * Buyer-only middleware
 */
export function withBuyer(
  handler: (request: NextRequest, user: JWTPayload) => Promise<NextResponse>
) {
  return withRole([UserRole.BUYER], handler);
}

/**
 * Supplier-only middleware
 */
export function withSupplier(
  handler: (request: NextRequest, user: JWTPayload) => Promise<NextResponse>
) {
  return withRole([UserRole.SUPPLIER], handler);
}

/**
 * Logistics-only middleware
 */
export function withLogistics(
  handler: (request: NextRequest, user: JWTPayload) => Promise<NextResponse>
) {
  return withRole([UserRole.LOGISTICS], handler);
}

/**
 * Multiple roles middleware
 * Example: withRoles([UserRole.FARMER, UserRole.SUPPLIER])
 */
export function withRoles(allowedRoles: UserRole[]) {
  return (handler: (request: NextRequest, user: JWTPayload) => Promise<NextResponse>) => {
    return withRole(allowedRoles, handler);
  };
}
