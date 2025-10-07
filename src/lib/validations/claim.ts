//@ts-nocheck

/**
 * Claim Form Validation Schema
 * 
 * Validation rules for insurance claim submissions.
 * File: src/lib/validations/claim.ts
 */

export interface ClaimFormData {
  claimType: string
  cropType: string
  areaAffected: string
  description: string
  photos: File[]
  location?: {
    latitude: number
    longitude: number
  }
}

export interface ClaimValidationError {
  field: keyof ClaimFormData
  message: string
}

/**
 * Allowed claim types
 */
export const CLAIM_TYPES = [
  "Crop Damage",
  "Weather Loss",
  "Pest Damage",
  "Disease",
  "Fire",
  "Flood",
  "Drought",
  "Other",
] as const

/**
 * Allowed crop types
 */
export const CROP_TYPES = [
  "Rice",
  "Wheat",
  "Maize",
  "Cotton",
  "Sugarcane",
  "Soybean",
  "Vegetables",
  "Fruits",
  "Pulses",
  "Other",
] as const

/**
 * Validation rules
 */
export const VALIDATION_RULES = {
  claimType: {
    required: true,
    allowedValues: CLAIM_TYPES,
  },
  cropType: {
    required: true,
    allowedValues: CROP_TYPES,
  },
  areaAffected: {
    required: true,
    min: 0.01,
    max: 1000,
  },
  description: {
    required: true,
    minLength: 10,
    maxLength: 500,
  },
  photos: {
    required: true,
    minCount: 1,
    maxCount: 10,
    maxFileSize: 5 * 1024 * 1024, // 5MB per file
    allowedTypes: ["image/jpeg", "image/jpg", "image/png", "image/webp"],
  },
}

/**
 * Validate claim form data
 * 
 * @param data - Form data to validate
 * @returns Array of validation errors (empty if valid)
 */
export function validateClaimForm(data: Partial<ClaimFormData>): ClaimValidationError[] {
  const errors: ClaimValidationError[] = []

  // Validate claim type
  if (!data.claimType) {
    errors.push({
      field: "claimType",
      message: "Please select a claim type",
    })
  } else if (!CLAIM_TYPES.includes(data.claimType as any)) {
    errors.push({
      field: "claimType",
      message: "Invalid claim type",
    })
  }

  // Validate crop type
  if (!data.cropType) {
    errors.push({
      field: "cropType",
      message: "Please select a crop type",
    })
  } else if (!CROP_TYPES.includes(data.cropType as any)) {
    errors.push({
      field: "cropType",
      message: "Invalid crop type",
    })
  }

  // Validate area affected
  if (!data.areaAffected) {
    errors.push({
      field: "areaAffected",
      message: "Please enter the affected area",
    })
  } else {
    const area = parseFloat(data.areaAffected)
    if (isNaN(area)) {
      errors.push({
        field: "areaAffected",
        message: "Area must be a valid number",
      })
    } else if (area < VALIDATION_RULES.areaAffected.min) {
      errors.push({
        field: "areaAffected",
        message: `Area must be at least ${VALIDATION_RULES.areaAffected.min} hectares`,
      })
    } else if (area > VALIDATION_RULES.areaAffected.max) {
      errors.push({
        field: "areaAffected",
        message: `Area cannot exceed ${VALIDATION_RULES.areaAffected.max} hectares`,
      })
    }
  }

  // Validate description
  if (!data.description) {
    errors.push({
      field: "description",
      message: "Please provide a description",
    })
  } else {
    const desc = data.description.trim()
    if (desc.length < VALIDATION_RULES.description.minLength) {
      errors.push({
        field: "description",
        message: `Description must be at least ${VALIDATION_RULES.description.minLength} characters`,
      })
    }
    if (desc.length > VALIDATION_RULES.description.maxLength) {
      errors.push({
        field: "description",
        message: `Description cannot exceed ${VALIDATION_RULES.description.maxLength} characters`,
      })
    }
  }

  // Validate photos
  if (!data.photos || data.photos.length === 0) {
    errors.push({
      field: "photos",
      message: "Please upload at least one photo",
    })
  } else {
    if (data.photos.length > VALIDATION_RULES.photos.maxCount) {
      errors.push({
        field: "photos",
        message: `Cannot upload more than ${VALIDATION_RULES.photos.maxCount} photos`,
      })
    }

    // Validate each photo
    data.photos.forEach((photo, index) => {
      // Check file size
      if (photo.size > VALIDATION_RULES.photos.maxFileSize) {
        errors.push({
          field: "photos",
          message: `Photo ${index + 1} exceeds 5MB limit`,
        })
      }

      // Check file type
      if (!VALIDATION_RULES.photos.allowedTypes.includes(photo.type)) {
        errors.push({
          field: "photos",
          message: `Photo ${index + 1} must be JPEG, PNG, or WebP`,
        })
      }
    })
  }

  return errors
}

/**
 * Sanitize claim form data
 * 
 * @param data - Raw form data
 * @returns Sanitized data
 */
export function sanitizeClaimData(data: ClaimFormData): ClaimFormData {
  return {
    claimType: data.claimType.trim(),
    cropType: data.cropType.trim(),
    areaAffected: parseFloat(data.areaAffected).toFixed(2),
    description: data.description.trim(),
    photos: data.photos,
    location: data.location,
  }
}

/**
 * Format validation errors for display
 * 
 * @param errors - Array of validation errors
 * @returns Object with field names as keys and error messages as values
 */
export function formatValidationErrors(
  errors: ClaimValidationError[]
): Record<string, string> {
  return errors.reduce((acc, error) => {
    if (!acc[error.field]) {
      acc[error.field] = error.message
    }
    return acc
  }, {} as Record<string, string>)
}