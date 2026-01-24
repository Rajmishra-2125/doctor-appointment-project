import mongoose, { Schema } from "mongoose";

const doctorSchema = new Schema(
  {
    doctor: {
      type: Schema.Types.ObjectId,
      ref: "User",
      required: true,
      unique: true,
    },
    username: {
      type: String,
      unique: true,
      sparse: true,
    },
    specialization: {
      type: String,
      required: true,
    },
    followersCount: {
      type: Number,
      default: 0,
    },
    experience: {
      type: String,
      required: true,
    },
    consultationFee: {
      type: String,
      required: true,
    },
    availableDays: {
      type: [String], // ["MON", "TUE"]
      required: true,
    },
    timeSlots: [
      {
        start: String, // 09:35 PM
        end: String, // 09:35 PM
      },
    ],
  },
  {
    timestamps: true,
  }
); 

export const Doctor = mongoose.model("Doctor", doctorSchema);