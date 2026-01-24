import mongoose, { Schema } from "mongoose";

const appointmentSchema = new Schema(
  {
    patientId: {
      type: Schema.Types.ObjectId,
      ref: "User",
      required: true,
      index: true,
    },
    doctorId: {
      type: Schema.Types.ObjectId,
      ref: "Doctor",
      required: true,
      index: true,
    },
    slot: {
      type: Schema.Types.ObjectId,
      ref: "Slot",
      required: true,
    },
    date: {
      type: Date,
      required: true,
      index: true,
    },
    slotNumber: {
      type: String, 
      required: true,
    },
    status: {
      type: String,
      enum: ["CONFIRMED", "COMPLETED", "CANCELLED"],
      default: "CONFIRMED",
      required: true,
      index: true,
    },
  },
  {
    timestamps: true,
  }
);

export const Appointment = mongoose.model("Appointment", appointmentSchema)