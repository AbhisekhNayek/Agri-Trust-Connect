import mongoose, { Document, Model, Schema } from "mongoose"
import bcrypt from "bcryptjs"

/**
 * User role types
 */
export enum UserRole {
  FARMER = "farmer",
  BUYER = "buyer",
  SUPPLIER = "supplier",
  LOGISTICS = "logistics",
  ADMIN = "admin",
}

/**
 * User document interface
 */
export interface IUser extends Document {
  fullName: string
  email: string
  password: string
  phone?: string
  role: UserRole
  isEmailVerified: boolean
  emailVerificationToken?: string
  emailVerificationExpires?: Date
  passwordResetToken?: string
  passwordResetExpires?: Date
  refreshToken?: string
  lastLogin?: Date
  isActive: boolean
  createdAt: Date
  updatedAt: Date
  
  // Methods
  comparePassword(candidatePassword: string): Promise<boolean>
  generatePasswordResetToken(): string
  generateEmailVerificationToken(): string
}

/**
 * User schema definition
 */
const UserSchema = new Schema<IUser>(
  {
    fullName: {
      type: String,
      required: [true, "Full name is required"],
      trim: true,
      minlength: [2, "Name must be at least 2 characters"],
      maxlength: [100, "Name must be less than 100 characters"],
    },
    email: {
      type: String,
      required: [true, "Email is required"],
      unique: true,
      lowercase: true,
      trim: true,
      match: [/^\S+@\S+\.\S+$/, "Please provide a valid email"],
      index: true,
    },
    password: {
      type: String,
      required: [true, "Password is required"],
      minlength: [8, "Password must be at least 8 characters"],
      select: false, // Don't return password by default
    },
    phone: {
      type: String,
      trim: true,
      match: [/^\+?[\d\s-()]+$/, "Please provide a valid phone number"],
    },
    role: {
      type: String,
      enum: Object.values(UserRole),
      required: [true, "User role is required"],
      default: UserRole.FARMER,
    },
    isEmailVerified: {
      type: Boolean,
      default: false,
    },
    emailVerificationToken: {
      type: String,
      select: false,
    },
    emailVerificationExpires: {
      type: Date,
      select: false,
    },
    passwordResetToken: {
      type: String,
      select: false,
    },
    passwordResetExpires: {
      type: Date,
      select: false,
    },
    refreshToken: {
      type: String,
      select: false,
    },
    lastLogin: {
      type: Date,
    },
    isActive: {
      type: Boolean,
      default: true,
    },
  },
  {
    timestamps: true,
    toJSON: {
      transform: function (doc, ret) {
        delete ret?.password
        delete ret?.passwordResetToken
        delete ret?.passwordResetExpires
        delete ret?.emailVerificationToken
        delete ret?.emailVerificationExpires
        delete ret?.refreshToken
        delete ret.__v
        return ret
      },
    },
  }
)

/**
 * Index for faster queries
 */
UserSchema.index({ email: 1, role: 1 })
UserSchema.index({ isActive: 1 })

/**
 * Pre-save middleware to hash password
 */
UserSchema.pre("save", async function (next) {
  if (!this.isModified("password")) {
    return next()
  }

  try {
    const salt = await bcrypt.genSalt(12)
    this.password = await bcrypt.hash(this.password, salt)
    next()
  } catch (error: any) {
    next(error)
  }
})

/**
 * Method to compare password
 */
UserSchema.methods.comparePassword = async function (
  candidatePassword: string
): Promise<boolean> {
  try {
    return await bcrypt.compare(candidatePassword, this.password)
  } catch (error) {
    return false
  }
}

/**
 * Method to generate password reset token
 */
UserSchema.methods.generatePasswordResetToken = function (): string {
  const resetToken = crypto.randomUUID()
  
  this.passwordResetToken = resetToken
  this.passwordResetExpires = new Date(Date.now() + 60 * 60 * 1000) // 1 hour
  
  return resetToken
}

/**
 * Method to generate email verification token
 */
UserSchema.methods.generateEmailVerificationToken = function (): string {
  const verificationToken = crypto.randomUUID()
  
  this.emailVerificationToken = verificationToken
  this.emailVerificationExpires = new Date(Date.now() + 24 * 60 * 60 * 1000) // 24 hours
  
  return verificationToken
}

/**
 * Static method to find by email
 */
UserSchema.statics.findByEmail = function (email: string) {
  return this.findOne({ email: email.toLowerCase() })
}

/**
 * Export User model
 */
const User: Model<IUser> =
  mongoose.models.User || mongoose.model<IUser>("User", UserSchema)

export default User