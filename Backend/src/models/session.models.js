import mongoose, { Schema} from "mongoose";

const sessionSchema = new Schema(
  {
    userId: {
      type: Schema.Types.ObjectId,
      ref: "User",
      required: true,
      index: true,
    },
    refreshToken: {
        type: String,
        required: true,
        unique: true,
    },
    deviceInfo: {
        userAgent: String,
        ipAddress: String,
        device: String,
        os: String,
        browser: String,
    },
    isActive: {
        type: Boolean,
        default: true,
    },
    expiresAt: {
        type: Date,
        required: true,
        index: true,
    },
    lastUsedAt: {
        type: Date,
        default: Date.now,
    },   
  },
  {
    timestamps: true,   
  }
);       


// Auto-remove expired sessions
sessionSchema.index({ expiresAt: 1 }, { expireAfterSeconds: 0 });

export const Session = mongoose.model("Session", sessionSchema);