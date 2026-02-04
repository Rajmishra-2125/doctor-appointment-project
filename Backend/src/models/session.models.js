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
        userAgent: {
            type: String,
            required: true,
        },
        ipAddress: {
            type: String,
            required: true,
        },
        device: {
            type: String,
            required: true,
        },
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
  },
  {
    timestamps: true,   
  }
);       


// Auto-remove expired sessions
sessionSchema.index({ expiresAt: 1 }, { expireAfterSeconds: 0 });

export const Session = mongoose.model("Session", sessionSchema);