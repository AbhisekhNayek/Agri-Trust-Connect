import jwt from "jsonwebtoken";

/**
 * JWT Token Management Utilities
 * 
 * Handles creation and verification of JSON Web Tokens
 * for authentication and authorization.
 * 
 * File: src/lib/auth/jwt.ts
 */

// Get secrets from environment variables
const JWT_SECRET = process.env.JWT_SECRET || ""
const JWT_REFRESH_SECRET = process.env.JWT_REFRESH_SECRET || ""

if (!JWT_SECRET || !JWT_REFRESH_SECRET) {
  throw new Error("JWT_SECRET and JWT_REFRESH_SECRET must be defined in environment variables")
}

// Token expiration times
const ACCESS_TOKEN_EXPIRY = process.env.ACCESS_TOKEN_EXPIRY;
const REFRESH_TOKEN_EXPIRY = process.env.REFRESH_TOKEN_EXPIRY;

/**
 * JWT Payload interface
 */
export interface JWTPayload {
  userId: string
  email: string
  role: string
  iat?: number
  exp?: number
}

/**
 * Generate access token
 * @param payload - User data to encode in token
 * @returns Signed JWT access token
 */
export function generateAccessToken(payload: JWTPayload): string {
  return jwt.sign(payload, JWT_SECRET, {
    expiresIn: ACCESS_TOKEN_EXPIRY,
    issuer: "agritrust-connect",
    audience: "agritrust-users",
  })
}

/**
 * Generate refresh token
 * @param payload - User data to encode in token
 * @returns Signed JWT refresh token
 */
export function generateRefreshToken(payload: JWTPayload): string {
  return jwt.sign(payload, JWT_REFRESH_SECRET, {
    expiresIn: REFRESH_TOKEN_EXPIRY,
    issuer: "agritrust-connect",
    audience: "agritrust-users",
  })
}

/**
 * Generate both access and refresh tokens
 * @param payload - User data to encode in tokens
 * @returns Object containing both tokens
 */
export function generateTokenPair(payload: JWTPayload): {
  accessToken: string
  refreshToken: string
} {
  return {
    accessToken: generateAccessToken(payload),
    refreshToken: generateRefreshToken(payload),
  }
}

/**
 * Verify access token
 * @param token - JWT token to verify
 * @returns Decoded token payload or null if invalid
 */
export function verifyAccessToken(token: string): JWTPayload | null {
  try {
    const decoded = jwt.verify(token, JWT_SECRET, {
      issuer: "agritrust-connect",
      audience: "agritrust-users",
    }) as JWTPayload
    
    return decoded
  } catch (error) {
    if (error instanceof jwt.TokenExpiredError) {
      console.log("Access token expired")
    } else if (error instanceof jwt.JsonWebTokenError) {
      console.log("Invalid access token")
    }
    return null
  }
}

/**
 * Verify refresh token
 * @param token - JWT refresh token to verify
 * @returns Decoded token payload or null if invalid
 */
export function verifyRefreshToken(token: string): JWTPayload | null {
  try {
    const decoded = jwt.verify(token, JWT_REFRESH_SECRET, {
      issuer: "agritrust-connect",
      audience: "agritrust-users",
    }) as JWTPayload
    
    return decoded
  } catch (error) {
    if (error instanceof jwt.TokenExpiredError) {
      console.log("Refresh token expired")
    } else if (error instanceof jwt.JsonWebTokenError) {
      console.log("Invalid refresh token")
    }
    return null
  }
}

/**
 * Decode token without verification (for debugging)
 * @param token - JWT token to decode
 * @returns Decoded token payload
 */
export function decodeToken(token: string): JWTPayload | null {
  try {
    return jwt.decode(token) as JWTPayload
  } catch (error) {
    console.error("Error decoding token:", error)
    return null
  }
}

/**
 * Check if token is expired
 * @param token - JWT token to check
 * @returns True if expired, false otherwise
 */
export function isTokenExpired(token: string): boolean {
  const decoded = decodeToken(token)
  if (!decoded || !decoded.exp) {
    return true
  }
  
  const currentTime = Math.floor(Date.now() / 1000)
  return decoded.exp < currentTime
}

/**
 * Get time until token expires
 * @param token - JWT token to check
 * @returns Seconds until expiration, or 0 if expired/invalid
 */
export function getTokenExpiryTime(token: string): number {
  const decoded = decodeToken(token)
  if (!decoded || !decoded.exp) {
    return 0
  }
  
  const currentTime = Math.floor(Date.now() / 1000)
  const timeLeft = decoded.exp - currentTime
  
  return timeLeft > 0 ? timeLeft : 0
}