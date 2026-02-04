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
    date: {
      type: Date,
      required: true,
      index: true,
    },
    timeSlots: [
      {
        type: String,
        required: true,
      },
    ],
    symptoms: {
      type: String,
      required: false,
    },
    prescription: {
      type: String,
      required: false,
    },
    slot: {
      type: Schema.Types.ObjectId,
      ref: "Slot",
      required: true,
    },
    slotNumber: {
      type: String,
      required: true,
    },
    status: {
      type: String,
      enum: ["CONFIRMED", "COMPLETED", "CANCELLED", "PENDING", "RESCHEDULED"],
      default: "CONFIRMED",
      required: true,
      index: true,
    },
    cancellationReason: {
      type: String,
      default: null,
    },
    rescheduleReason: {
      type: String,
      default: null,
    },
    cancelledBy: {
      type: Schema.Types.ObjectId,
      ref: "User",
      default: null,
    },
    createdAt: {
      type: Date,
      default: Date.now,
    },
  },
  {
    timestamps: true,
  }
);

export const Appointment = mongoose.model("Appointment", appointmentSchema)