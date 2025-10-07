// src/models/claim.ts
import { MongoClient, Collection } from "mongodb";
import { Claim, ClaimType, CropType, ClaimStatus } from "@/types/claim";

export class ClaimModel {
  private collection: Collection<Claim>;

  constructor(client: MongoClient) {
    this.collection = client.db("agritrust").collection<Claim>("claims");
  }

  /**
   * Creates a new claim in the database.
   * @param claim - The claim data to insert
   * @returns The inserted claim
   */
  async createClaim(claim: Claim): Promise<Claim> {
    const result = await this.collection.insertOne(claim);
    if (!result.acknowledged) {
      throw new Error("Failed to insert claim");
    }
    return claim;
  }

  /**
   * Finds claims by user ID.
   * @param userId - The ID of the user
   * @returns Array of claims for the user
   */
  async findClaimsByUser(userId: string): Promise<Claim[]> {
    return this.collection.find({ userId }).toArray();
  }

  /**
   * Finds a claim by ID.
   * @param id - The claim ID
   * @returns The claim or null if not found
   */
  async findClaimById(id: string): Promise<Claim | null> {
    return this.collection.findOne({ id });
  }

  /**
   * Updates a claim's status and reviewer notes.
   * @param id - The claim ID
   * @param updates - Partial updates (status and reviewerNotes)
   * @returns The updated claim or null if not found
   */
  async updateClaimStatus(
    id: string,
    updates: { status: ClaimStatus; reviewerNotes?: string }
  ): Promise<Claim | null> {
    const result = await this.collection.findOneAndUpdate(
      { id },
      {
        $set: {
          status: updates.status,
          reviewerNotes: updates.reviewerNotes,
          updatedAt: new Date().toISOString(),
        },
      },
      { returnDocument: "after" }
    );
    return result;
  }
}