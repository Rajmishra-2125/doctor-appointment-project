import mongoose, { Schema } from "mongoose";

const doctorSchema = new Schema(
  {
    doctorId: {
      type: Schema.Types.ObjectId,
      ref: "User",
      required: true,
      unique: true,
    },
    doctor: {
      type: String,
      unique: true,
      sparse: true,
    },
    specialization: {
      type: String,
      required: true,
    },
    qualification: {
      type: [String],
      default: [],
      required: true,
    },
    bio: {
      type: String,
      maxlength: 500,
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
    followersCount: {
      type: Number,
      default: 0,
    },
    rating: {
      type: Number,
      default: 0,
    },
    numberOfReviews: {
      type: Number,
      default: 0,
    },
    isVisible: {
      type: Boolean,
      default: true,
      index: true,
    },
    isAcceptingNewPatients: {
      type: Boolean,
      default: true,
      index: true,
    },
  },
  {
    timestamps: true,
  }
); 

doctorSchema.pre(/^find/, function (next) {
  if (!this.getOptions().includeInactive) {
    this.find({ isVisible: true });
  }
  // next();
});

export const Doctor = mongoose.model("Doctor", doctorSchema);