import { NextRequest, NextResponse } from "next/server"
import { JWTPayload } from "@/lib/auth/jwt"
import { UserRole } from "@/models/User"

/**
 * Role-based Access Control Middleware
 * 
 * Checks if authenticated user has required role(s) to access a route.
 * 
 * File: src/middleware/role.ts
 */

/**
 * Check if user has required role
 * @param userRole - User's current role
 * @param allowedRoles - Array of allowed roles
 * @returns True if user has permission
 */
export function hasRole(userRole: string, allowedRoles: UserRole[]): boolean {
  return allowedRoles.includes(userRole as UserRole)
}

/**
 * Middleware wrapper to check user role
 * Returns 403 if user doesn't have required role
 */
export function withRole(
  allowedRoles: UserRole[],
  handler: (request: NextRequest, user: JWTPayload) => Promise<NextResponse>
) {
  return async (request: NextRequest, user: JWTPayload): Promise<NextResponse> => {
    // Check if user has required role
    if (!hasRole(user.role, allowedRoles)) {
      return NextResponse.json(
        {
          success: false,
          error: "Forbidden: You don't have permission to access this resource",
          requiredRoles: allowedRoles,
        },
        { status: 403 }
      )
    }

    // User has permission, proceed to handler
    return handler(request, user)
  }
}

/**
 * Check if user is admin
 */
export function isAdmin(userRole: string): boolean {
  return userRole === UserRole.ADMIN
}

/**
 * Admin-only middleware wrapper
 */
export function withAdmin(
  handler: (request: NextRequest, user: JWTPayload) => Promise<NextResponse>
) {
  return withRole([UserRole.ADMIN], handler)
}

/**
 * Farmer-only middleware wrapper
 */
export function withFarmer(
  handler: (request: NextRequest, user: JWTPayload) => Promise<NextResponse>
) {
  return withRole([UserRole.FARMER], handler)
}

/**
 * Buyer-only middleware wrapper
 */
export function withBuyer(
  handler: (request: NextRequest, user: JWTPayload) => Promise<NextResponse>
) {
  return withRole([UserRole.BUYER], handler)
}

/**
 * Multiple roles middleware wrapper
 * Example: withRoles([UserRole.FARMER, UserRole.SUPPLIER])
 */
export function withRoles(allowedRoles: UserRole[]) {
  return (
    handler: (request: NextRequest, user: JWTPayload) => Promise<NextResponse>
  ) => {
    return withRole(allowedRoles, handler)
  }
}