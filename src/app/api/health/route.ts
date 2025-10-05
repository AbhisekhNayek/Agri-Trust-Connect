import { NextResponse } from "next/server"
import { isConnected, getConnectionStatus, getDatabase } from "@/lib/db/mongodb"
import connectDB from "@/lib/db/mongoose"

export async function GET() {
  try {
    await connectDB()
    
    return NextResponse.json({
      status: "ok",
      database: {
        connected: isConnected(),
        status: getConnectionStatus(),
        name: getDatabase(),
      },
      timestamp: new Date().toISOString(),
    })
  } catch (error) {
    return NextResponse.json(
      {
        status: "error",
        database: {
          connected: false,
          status: getConnectionStatus(),
          error: error instanceof Error ? error.message : "Unknown error",
        },
        timestamp: new Date().toISOString(),
      },
      { status: 503 }
    )
  }
}