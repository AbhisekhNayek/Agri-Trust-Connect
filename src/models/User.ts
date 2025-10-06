import mongoose, { Document, Model, Schema } from "mongoose";
import bcrypt from "bcryptjs";
import crypto from "crypto";

// User role types
export enum UserRole {
  FARMER = "farmer",
  BUYER = "buyer",
  SUPPLIER = "supplier",
  LOGISTICS = "logistics",
  ADMIN = "admin",
}

// User document interface
export interface IUser extends Document {
  fullName: string;
  email: string;
  password: string;
  phone?: string;
  role: UserRole;
  isEmailVerified: boolean;
  emailVerificationToken?: string;
  emailVerificationExpires?: Date;
  passwordResetToken?: string;
  passwordResetExpires?: Date;
  refreshToken?: string;
  refreshTokenVersion: number;
  lastLogin?: Date;
  lastPasswordChangedAt?: Date;
  isActive: boolean;
  createdAt: Date;
  updatedAt: Date;

  // Methods
  comparePassword(candidatePassword: string): Promise<boolean>;
  generatePasswordResetToken(): string;
  generateEmailVerificationToken(): string;
  incrementTokenVersion(): void;
}

// Interface for custom static methods
interface IUserModel extends Model<IUser> {
  findByEmail(email: string): Promise<IUser | null>;
}

// User schema definition
const UserSchema = new Schema<IUser, IUserModel>(
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
      match: [
        /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]{8,}$/,
        "Password must include at least one uppercase letter, one lowercase letter, one number, and one special character",
      ],
      select: false,
    },
    phone: {
      type: String,
      trim: true,
      match: [/^\+?[\d\s-()]{7,15}$/, "Please provide a valid phone number"],
      sparse: true,
    },
    role: {
      type: String,
      enum: Object.values(UserRole),
      required: [true, "User role is required"],
      default: UserRole.FARMER,
      immutable: true, // Prevent role changes after creation
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
    refreshTokenVersion: {
      type: Number,
      default: 0,
      select: false,
    },
    lastLogin: {
      type: Date,
    },
    lastPasswordChangedAt: {
      type: Date,
      select: false,
    },
    isActive: {
      type: Boolean,
      default: true,
    },
  },
  {
    timestamps: true,
  }
);

// Indexes for faster queries
UserSchema.index({ email: 1, role: 1 });
UserSchema.index({ isActive: 1 });
UserSchema.index({ passwordResetToken: 1 }, { sparse: true });
UserSchema.index({ emailVerificationToken: 1 }, { sparse: true });

// Pre-save middleware to hash password
UserSchema.pre("save", async function (next) {
  if (!this.isModified("password")) {
    return next();
  }

  try {
    const salt = await bcrypt.genSalt(12);
    this.password = await bcrypt.hash(this.password, salt);
    this.lastPasswordChangedAt = new Date();
    this.refreshTokenVersion += 1; // Invalidate existing refresh tokens
    next();
  } catch (error: any) {
    next(error);
  }
});

// Method to compare password
UserSchema.methods.comparePassword = async function (
  candidatePassword: string
): Promise<boolean> {
  try {
    return await bcrypt.compare(candidatePassword, this.password);
  } catch (error) {
    return false;
  }
};

// Method to generate password reset token
UserSchema.methods.generatePasswordResetToken = function (): string {
  const resetToken = crypto.randomUUID();
  this.passwordResetToken = resetToken;
  this.passwordResetExpires = new Date(Date.now() + 60 * 60 * 1000); // 1 hour
  return resetToken;
};

// Method to generate email verification token
UserSchema.methods.generateEmailVerificationToken = function (): string {
  const verificationToken = crypto.randomUUID();
  this.emailVerificationToken = verificationToken;
  this.emailVerificationExpires = new Date(Date.now() + 24 * 60 * 60 * 1000); // 24 hours
  return verificationToken;
};

// Method to increment token version
UserSchema.methods.incrementTokenVersion = function (): void {
  this.refreshTokenVersion += 1;
};

// Static method to find by email
UserSchema.statics.findByEmail = async function (email: string) {
  return this.findOne({ email: email.toLowerCase() }).select(
    "+password +refreshToken +emailVerificationToken +emailVerificationExpires +passwordResetToken +passwordResetExpires +refreshTokenVersion +lastPasswordChangedAt"
  );
};

// Export User model with explicit type
let User: IUserModel;

// Check if model is already defined to avoid OverwriteModelError
if (mongoose.models.User) {
  User = mongoose.models.User as IUserModel;
} else {
  User = mongoose.model<IUser, IUserModel>("User", UserSchema);
}

export default User;
