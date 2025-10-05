import { MongoClient, MongoClientOptions, Db, Document  } from "mongodb";

/**
 * MongoDB Connection Handler
 * 
 * Implements connection pooling and caching for optimal performance.
 * Uses singleton pattern to prevent multiple connections in development.
 * 
 * File: src/lib/db/mongodb.ts
 */

if (!process.env.MONGODB_URI) {
  throw new Error(
    "Please define the MONGODB_URI environment variable inside .env.local"
  )
}

const uri = process.env.MONGODB_URI
const options: MongoClientOptions = {
  maxPoolSize: 10,
  minPoolSize: 2,
  serverSelectionTimeoutMS: 5000,
  socketTimeoutMS: 45000,
}

let client: MongoClient
let clientPromise: Promise<MongoClient>

/**
 * Global cache interface
 */
declare global {
  var _mongoClientPromise: Promise<MongoClient> | undefined
}

if (process.env.NODE_ENV === "development") {
  // In development mode, use a global variable to preserve the connection
  // across module reloads caused by HMR (Hot Module Replacement)
  if (!global._mongoClientPromise) {
    client = new MongoClient(uri, options)
    global._mongoClientPromise = client.connect().then((client) => {
      console.log("✅ MongoDB connected successfully (native driver)")
      return client
    })
  }
  clientPromise = global._mongoClientPromise
} else {
  // In production mode, create a new client for each connection
  client = new MongoClient(uri, options)
  clientPromise = client.connect().then((client) => {
    console.log("✅ MongoDB connected successfully (native driver)")
    return client
  })
}

/**
 * Get MongoDB client instance
 * Returns a promise that resolves to the MongoDB client
 * 
 * @returns Promise<MongoClient>
 */
export async function getClient(): Promise<MongoClient> {
  try {
    const client = await clientPromise
    console.log("📦 Using MongoDB connection")
    return client
  } catch (error) {
    console.error("❌ MongoDB connection error:", error)
    throw error
  }
}

/**
 * Get specific database instance
 * 
 * @param dbName - Name of the database (optional, uses default from connection string)
 * @returns Promise<Db>
 */
export async function getDatabase(dbName?: string): Promise<Db> {
  const client = await clientPromise
  return client.db(dbName)
}

/**
 * Get specific collection
 * 
 * @param collectionName - Name of the collection
 * @param dbName - Name of the database (optional)
 * @returns Collection instance
 */


export async function getCollection<T extends Document = Document>(
  collectionName: string,
  dbName?: string
) {
  const db = await getDatabase(dbName)
  return db.collection<T>(collectionName)
}

/**
 * Check if MongoDB is connected
 * 
 * @returns Promise<boolean>
 */
export async function isConnected(): Promise<boolean> {
  try {
    const client = await clientPromise
    await client.db().admin().ping()
    return true
  } catch (error) {
    return false
  }
}

/**
 * Get connection status
 * 
 * @returns Promise with connection info
 */
export async function getConnectionStatus(): Promise<{
  connected: boolean
  dbName: string | null
  error?: string
}> {
  try {
    const client = await clientPromise
    const db = client.db()
    await db.admin().ping()
    
    return {
      connected: true,
      dbName: db.databaseName,
    }
  } catch (error) {
    return {
      connected: false,
      dbName: null,
      error: error instanceof Error ? error.message : "Unknown error",
    }
  }
}

/**
 * Close MongoDB connection
 * Useful for cleanup in testing or serverless environments
 */
export async function closeConnection(): Promise<void> {
  try {
    const client = await clientPromise
    await client.close()
    console.log("🔌 MongoDB connection closed")
  } catch (error) {
    console.error("Error closing MongoDB connection:", error)
  }
}

// Export default client promise
export default clientPromise