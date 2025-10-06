import { NextRequest, NextResponse } from "next/server"
import { verifyAccessToken, JWTPayload } from "@/lib/auth/jwt"

/**
 * Authentication Middleware
 * 
 * Verifies JWT tokens and protects API routes.
 * Attaches user information to request for downstream use.
 * 
 * File: src/middleware/auth.ts
 */

/**
 * Extended NextRequest with user information
 */
export interface AuthenticatedRequest extends NextRequest {
  user?: JWTPayload
}

/**
 * Extract token from Authorization header or cookies
 * @param request - Next.js request object
 * @returns JWT token string or null
 */
function extractToken(request: NextRequest): string | null {
  // Check Authorization header first (Bearer token)
  const authHeader = request.headers.get("authorization")
  if (authHeader && authHeader.startsWith("Bearer ")) {
    return authHeader.substring(7)
  }

  // Check cookies as fallback
  const token = request.cookies.get("accessToken")?.value
  return token || null
}

/**
 * Authenticate middleware function
 * Verifies JWT token and returns user data
 * 
 * @param request - Next.js request object
 * @returns Authentication result with user data or error
 */
export async function authenticate(
  request: NextRequest
): Promise<{ authenticated: boolean; user?: JWTPayload; error?: string }> {
  try {
    // Extract token
    const token = extractToken(request)
    
    if (!token) {
      return {
        authenticated: false,
        error: "No authentication token provided",
      }
    }

    // Verify token
    const decoded = verifyAccessToken(token)
    
    if (!decoded) {
      return {
        authenticated: false,
        error: "Invalid or expired token",
      }
    }

    return {
      authenticated: true,
      user: decoded,
    }
  } catch (error) {
    console.error("Authentication error:", error)
    return {
      authenticated: false,
      error: "Authentication failed",
    }
  }
}

/**
 * Middleware wrapper for protected API routes
 * Returns 401 if authentication fails
 * 
 * Usage:
 * export const GET = withAuth(async (request, user) => {
 *   // user is authenticated
 * })
 */
export function withAuth(
  handler: (request: NextRequest, user: JWTPayload) => Promise<NextResponse>
) {
  return async (request: NextRequest): Promise<NextResponse> => {
    const authResult = await authenticate(request)

    if (!authResult.authenticated || !authResult.user) {
      return NextResponse.json(
        {
          success: false,
          error: authResult.error || "Unauthorized",
        },
        { status: 401 }
      )
    }

    // Pass authenticated user to handler
    return handler(request, authResult.user)
  }
}

/**
 * Optional authentication middleware
 * Attaches user if token is present but doesn't reject if missing
 * 
 * Usage:
 * export const GET = withOptionalAuth(async (request, user) => {
 *   if (user) {
 *     // User is logged in
 *   } else {
 *     // User is anonymous
 *   }
 * })
 */
export function withOptionalAuth(
  handler: (request: NextRequest, user?: JWTPayload) => Promise<NextResponse>
) {
  return async (request: NextRequest): Promise<NextResponse> => {
    const authResult = await authenticate(request)
    
    const user = authResult.authenticated ? authResult.user : undefined
    
    return handler(request, user)
  }
}

/**
 * Get current user from request
 * Helper function to extract user in API routes
 */
export async function getCurrentUser(request: NextRequest): Promise<JWTPayload | null> {
  const authResult = await authenticate(request)
  return authResult.authenticated && authResult.user ? authResult.user : null
}