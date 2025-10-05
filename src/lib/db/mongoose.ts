import mongoose from "mongoose"

/**
 * Mongoose Connection Handler
 * 
 * Manages MongoDB connection using Mongoose ODM.
 * Implements connection pooling, caching, and error handling.
 * 
 * File: src/lib/db/mongoose.ts
 */

if (!process.env.MONGODB_URI) {
  throw new Error(
    "Please define the MONGODB_URI environment variable inside .env.local"
  )
}

const MONGODB_URI = process.env.MONGODB_URI

/**
 * Mongoose cache interface
 */
interface MongooseCache {
  conn: typeof mongoose | null
  promise: Promise<typeof mongoose> | null
}

/**
 * Global mongoose cache to prevent multiple connections
 */
declare global {
  var mongoose: MongooseCache | undefined
}

// Initialize cache
let cached: MongooseCache = global.mongoose || {
  conn: null,
  promise: null,
}

if (!global.mongoose) {
  global.mongoose = cached
}

/**
 * Connect to MongoDB using Mongoose
 * 
 * Returns cached connection if available, otherwise creates new connection.
 * Implements singleton pattern for optimal performance.
 * 
 * @returns Promise that resolves to mongoose instance
 */
async function connectDB(): Promise<typeof mongoose> {
  // Return cached connection if available
  if (cached.conn) {
    console.log("📦 Using cached MongoDB connection")
    return cached.conn
  }

  // Return existing promise if connection is in progress
  if (!cached.promise) {
    const options = {
      bufferCommands: false,
      maxPoolSize: 10,
      minPoolSize: 2,
      serverSelectionTimeoutMS: 5000,
      socketTimeoutMS: 45000,
      family: 4, // Use IPv4, skip trying IPv6
    }

    console.log("🔄 Establishing new MongoDB connection...")

    cached.promise = mongoose
      .connect(MONGODB_URI, options)
      .then((mongoose) => {
        console.log("✅ MongoDB connected successfully")
        console.log(`📍 Connected to: ${mongoose.connection.name}`)
        return mongoose
      })
      .catch((error) => {
        console.error("❌ MongoDB connection error:", error.message)
        cached.promise = null
        throw error
      })
  }

  try {
    cached.conn = await cached.promise
  } catch (error) {
    cached.promise = null
    throw error
  }

  return cached.conn
}

/**
 * Disconnect from MongoDB
 * 
 * Closes the MongoDB connection and clears the cache.
 * Useful for cleanup in serverless environments or testing.
 */
export async function disconnectDB(): Promise<void> {
  try {
    if (cached.conn) {
      await mongoose.disconnect()
      cached.conn = null
      cached.promise = null
      console.log("🔌 Disconnected from MongoDB")
    }
  } catch (error) {
    console.error("Error disconnecting from MongoDB:", error)
    throw error
  }
}

/**
 * Check if database is connected
 * 
 * @returns True if connected, false otherwise
 */
export function isConnected(): boolean {
  return mongoose.connection.readyState === 1
}

/**
 * Get connection status as string
 * 
 * @returns Connection status (disconnected, connected, connecting, disconnecting)
 */
export function getConnectionStatus(): string {
  const states = ["disconnected", "connected", "connecting", "disconnecting"]
  return states[mongoose.connection.readyState] || "unknown"
}

/**
 * Get database name
 * 
 * @returns Database name or null if not connected
 */
export function getDatabaseName(): string | null {
  if (mongoose.connection.readyState === 1) {
    return mongoose.connection.name
  }
  return null
}

/**
 * Event listeners for connection monitoring
 */
mongoose.connection.on("connected", () => {
  console.log("🟢 Mongoose connected to MongoDB")
})

mongoose.connection.on("error", (err) => {
  console.error("🔴 Mongoose connection error:", err)
})

mongoose.connection.on("disconnected", () => {
  console.log("🟡 Mongoose disconnected from MongoDB")
})

// Graceful shutdown
if (process.env.NODE_ENV !== "production") {
  process.on("SIGINT", async () => {
    await disconnectDB()
    process.exit(0)
  })
}

export default connectDB