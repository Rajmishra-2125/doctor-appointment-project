import mongoose, {Schema} from "mongoose";

const slotSchema = new Schema(
  {
    slotNumber: {
      type: Number,
      required: true,
      index: 1,
    },
    doctor: {
      type: String,
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
    startTime: {
      type: String,
      required: true,
    },
    endTime: {
      type: String,
      required: true,
    },
    slotduration: {
      type: String,
      required: true,
    },
    status: {
      type: String,
      enum: ["AVAILABLE", "BOOKED"],
      default: "AVAILABLE",
      index: true,
    },
    bookedBy: {
      type: Schema.Types.ObjectId,
      ref: "User", 
      default: null,
    }
  },
  {
    timestamps: true,
  }
);

slotSchema.index(
  { 
    doctor: 1, 
    date: 1, 
    startTime: 1 
  },
  { unique: true });


export const Slot = mongoose.model("Slot", slotSchema)