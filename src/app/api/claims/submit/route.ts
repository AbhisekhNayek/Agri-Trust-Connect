// src/app/api/claims/submit/route.ts
import { NextRequest, NextResponse } from "next/server"
import { getServerSession } from "next-auth/next" 
import { v4 as uuidv4 } from "uuid"
import { z } from "zod"
import { v2 as cloudinary } from "cloudinary"
import { MongoClient } from "mongodb"

// Configure Cloudinary
cloudinary.config({
  cloud_name: process.env.CLOUDINARY_CLOUD_NAME,
  api_key: process.env.CLOUDINARY_API_KEY,
  api_secret: process.env.CLOUDINARY_API_SECRET,
})

// Define the schema for form validation using Zod
const claimSchema = z.object({
  claimType: z.enum([
    "Crop Damage",
    "Weather Loss",
    "Pest Damage",
    "Disease",
    "Fire",
    "Flood",
    "Other",
  ]),
  cropType: z.enum([
    "Rice",
    "Wheat",
    "Maize",
    "Cotton",
    "Sugarcane",
    "Vegetables",
    "Fruits",
    "Other",
  ]),
  areaAffected: z.string().refine((val) => parseFloat(val) > 0, {
    message: "Area affected must be a positive number",
  }),
  description: z.string().min(10, "Description must be at least 10 characters"),
  photos: z.array(z.instanceof(File)).min(1, "At least one photo is required"),
  location: z
    .object({
      latitude: z.number().min(-90).max(90),
      longitude: z.number().min(-180).max(180),
    })
    .optional(), // Optional GPS location
})

export async function POST(req: NextRequest) {
  let client: MongoClient | null = null
  try {
    // 1. Authenticate user (using NextAuth.js or similar)
    const session = await getServerSession()
    if (!session?.user) {
      return NextResponse.json(
        { error: "Unauthorized. Please log in." },
        { status: 401 }
      )
    }

    // 2. Parse multipart form data (since photos are included)
    const formData = await req.formData()

    // Extract form fields
    const claimType = formData.get("claimType") as string
    const cropType = formData.get("cropType") as string
    const areaAffected = formData.get("areaAffected") as string
    const description = formData.get("description") as string
    const photos = formData.getAll("photos") as File[]
    const latitude = formData.get("latitude")
      ? parseFloat(formData.get("latitude") as string)
      : undefined
    const longitude = formData.get("longitude")
      ? parseFloat(formData.get("longitude") as string)
      : undefined

    // 3. Validate form data
    const validation = claimSchema.safeParse({
      claimType,
      cropType,
      areaAffected,
      description,
      photos,
      location: latitude && longitude ? { latitude, longitude } : undefined,
    })

    if (!validation.success) {
      return NextResponse.json(
        { error: "Validation failed", details: validation.error.errors },
        { status: 400 }
      )
    }

    // 4. Validate photo files (e.g., size and type)
    const maxFileSize = 5 * 1024 * 1024 // 5MB
    for (const photo of photos) {
      if (!photo.type.startsWith("image/")) {
        return NextResponse.json(
          { error: "Invalid file type. Only images are allowed." },
          { status: 400 }
        )
      }
      if (photo.size > maxFileSize) {
        return NextResponse.json(
          { error: "File size exceeds 5MB limit." },
          { status: 400 }
        )
      }
    }

    // 5. Upload photos to Cloudinary
    const photoUrls: string[] = []
    for (const photo of photos) {
      const arrayBuffer = await photo.arrayBuffer()
      const buffer = Buffer.from(arrayBuffer)

      // Upload to Cloudinary
      const result = await new Promise((resolve, reject) => {
        cloudinary.uploader
          .upload_stream(
            {
              folder: "agritrust/claims",
              public_id: `${uuidv4()}-${photo.name}`,
              upload_preset: process.env.CLOUDINARY_UPLOAD_PRESET,
            },
            (error, result) => {
              if (error) reject(error)
              else resolve(result)
            }
          )
          .end(buffer)
      })

      // Add secure URL to photoUrls
      photoUrls.push((result as any).secure_url)
    }

    // 6. Connect to MongoDB
    client = new MongoClient(process.env.MONGODB_URI!)
    await client.connect()
    const db = client.db("agritrust")
    const collection = db.collection("claims")

    // 7. Create claim object
    const claim = {
      id: uuidv4(),
      userId: session.user.id, // Assuming session provides user ID
      claimType: validation.data.claimType,
      cropType: validation.data.cropType,
      areaAffected: parseFloat(validation.data.areaAffected),
      description: validation.data.description,
      photoUrls,
      location: validation.data.location || null,
      status: "Pending",
      createdAt: new Date().toISOString(),
    }

    // 8. Save to MongoDB
    await collection.insertOne(claim)

    // 9. Return success response
    return NextResponse.json(
      { message: "Claim submitted successfully", claim },
      { status: 201 }
    )
  } catch (error) {
    console.error("Error processing claim:", error)
    return NextResponse.json(
      { error: "Internal server error" },
      { status: 500 }
    )
  } finally {
    // Close MongoDB connection
    if (client) {
      await client.close()
    }
  }
}