// src/types/claim.ts

/**
 * Enum for claim types supported by AgriTrust Connect.
 */
export enum ClaimType {
  CropDamage = "Crop Damage",
  WeatherLoss = "Weather Loss",
  PestDamage = "Pest Damage",
  Disease = "Disease",
  Fire = "Fire",
  Flood = "Flood",
  Other = "Other",
}

/**
 * Enum for crop types supported by AgriTrust Connect.
 */
export enum CropType {
  Rice = "Rice",
  Wheat = "Wheat",
  Maize = "Maize",
  Cotton = "Cotton",
  Sugarcane = "Sugarcane",
  Vegetables = "Vegetables",
  Fruits = "Fruits",
  Other = "Other",
}

/**
 * Enum for claim status in the review process.
 */
export enum ClaimStatus {
  Pending = "Pending",
  UnderReview = "Under Review",
  Approved = "Approved",
  Rejected = "Rejected",
}

/**
 * Interface for geographic coordinates.
 */
export interface GeoLocation {
  /** Latitude in degrees (-90 to 90) */
  latitude: number;
  /** Longitude in degrees (-180 to 180) */
  longitude: number;
}

/**
 * Interface for a claim submitted by a user in AgriTrust Connect.
 * Represents agricultural claim details with type safety and extensibility.
 */
export interface Claim {
  /** Unique identifier for the claim (UUID) */
  id: string;

  /** User ID from authentication (e.g., NextAuth session) */
  userId: string;

  /** Type of claim (e.g., Crop Damage, Weather Loss) */
  claimType: ClaimType;

  /** Type of crop affected (e.g., Rice, Wheat) */
  cropType: CropType;

  /** Area affected in hectares (e.g., 2.5) */
  areaAffected: number;

  /** Detailed description of the claim (min 10 characters) */
  description: string;

  /** Array of Cloudinary secure URLs for uploaded photos */
  photoUrls: string[];

  /** Optional GPS coordinates of the claim location */
  location: GeoLocation | null;

  /** Current status of the claim (e.g., Pending, Approved) */
  status: ClaimStatus;

  /** ISO date string when the claim was created */
  createdAt: string;

  /** ISO date string when the claim was last updated (optional) */
  updatedAt?: string;

  /** Notes from the reviewer (optional, for approved/rejected claims) */
  reviewerNotes?: string;
}