import mongoose, { Schema } from "mongoose";

const doctorSchema = new Schema(
  {
    doctorId: {
      type: Schema.Types.ObjectId,
      ref: "User",
      required: true,
      unique: true,
      index: true,
    },
    doctor: {
      type: String,
      unique: true,
      sparse: true,
    },
    specialization: {
      type: String,
      required: [true, "Specialization is required"],
      index: true,
      trim: true,
    },
    qualification: {
      type: String,
      required: [true, "At least one qualification is required"],
      ValiDate: {
        ValiDator: function (v) {
          return v && v.length > 0;
        },
        message: "At least one qualification is required",
      },
    },
    experience: {
      type: String,
      required: [true, "Experience is required"],
      min: [0, "Experience cannot be negative"],
      max: [70, "Experience seems too high"],
    },
    consultationFee: {
      type: String,
      required: [true, "Consultation fee is required"],
      min: [0, "Consultation fee cannot be negative"],
    },
    bio: {
      type: String,
      maxlength: [500, "Bio cannot exceed 500 characters"],
      trim: true,
    },

    // Medical License Information
    licenseNumber: {
      type: String,
      required: [true, "Medical license number is required"],
      unique: true,
      trim: true,
    },
    licenseIssuingAuthority: {
      type: String,
      trim: true,
    },
    licenseIssueDate: {
      type: Date,
    },
    licenseExpiryDate: {
      type: Date,
    },

    // Clinic/Hospital Information
    clinicName: {
      type: String,
      trim: true,
    },
    clinicAddress: {
      street: String,
      city: String,
      state: String,
      zipCode: String,
      country: String,
    },
    clinicPhone: {
      type: String,
      unique: true,
      trim: true,
    },
    clinicEmail: {
      type: String,
      unique: true,
      trim: true,
    },

    // Availability Information
    availableDays: {
      type: [String], // ["MON", "TUE"]
      enum: [
        "MONDAY",
        "TUESDAY",
        "WEDNESDAY",
        "THURSDAY",
        "FRIDAY",
        "SATURDAY",
        "SUNDAY",
      ],
      default: [
        "MONDAY",
        "TUESDAY",
        "WEDNESDAY",
        "THURSDAY",
        "FRIDAY",
        "SATURDAY",
        "SUNDAY",
      ],
    },
    availableTimeSlots: {
      type: [String], // ["09:00-10:00", "10:00-11:00"]
      default: ["09:00 AM to 01:00 PM", "02:00 PM to 08:00 PM"],
    },
    workingHours: {
      start: {
        type: String, // "09:00"
        default: "09:00 AM",
      },
      end: {
        type: String, // "17:00"
        default: "08:00 PM",
      },
    },
    breakTime: {
      start: {
        type: String, // "12:00"
        default: "01:00 PM",
      },
      end: {
        type: String, // "13:00"
        default: "02:00 PM",
      },
    },
    slotDuration: {
      type: Number, // in minutes
      default: 30,
      min: 15,
      max: 120,
    },
    advanceBookingDays: {
      type: Number,
      default: 30,
      min: 1,
      max: 365,
    },

    // Status Information
    isVisible: {
      type: Boolean,
      default: false,
      index: true,
    },
    isAcceptingNewPatients: {
      type: Boolean,
      default: true,
      index: true,
    },
    isVerified: {
      type: Boolean,
      default: false,
      index: true,
    },
    verifiedAt: {
      type: Date,
    },

    // Statistics
    totalAppointments: {
      type: Number,
      default: 0,
    },
    completedAppointments: {
      type: Number,
      default: 0,
    },
    canceledAppointments: {
      type: Number,
      default: 0,
    },
    rating: {
      type: Number,
      default: 0,
      min: 0,
      max: 5,
    },
    reviewCount: {
      type: Number,
      default: 0,
    },
    followersCount: {
      type: Number,
      default: 0,
    },
  },
  {
    timestamps: true,
    toJSON: { virtuals: true },
    toObject: { virtuals: true },
  }
); 

// Indexes
doctorSchema.index({ specialization: 1, rating: -1 });
doctorSchema.index({ consultationFee: 1 });
doctorSchema.index({ isVisible: 1, isAcceptingNewPatients: 1 });


// Middleware to exclude invisible doctors from queries by default
doctorSchema.pre(/^find/, function (next) {
  if (!this.getOptions().includeInactive) {
    this.find({ isVisible: true });
  }
  // next();
});

// Virtual for full clinic address
doctorSchema.virtual("fullClinicAddress").get(function () {
  if (!this.clinicAddress) return null;
  
  const { street, city, state, zipCode, country } = this.clinicAddress;

  return `${street}, ${city}, ${state} - ${zipCode}, ${country}`;
});

// Instance method to check availability on a specific day
doctorSchema.methods.isAvailableOnDay = function (dayName) {
  return this.availableDays.includes(dayName.toUpperCase());
}

// Instance method to get working hours as a formatted string
doctorSchema.methods.hasTimeSlot = function (timeSlot) {
  return this.availableTimeSlots.includes(timeSlot);
}

// Instance method to update rating
doctorSchema.methods.updateRating = async function () {
  const Review = mongoose.model("Review");
  const reviews = await Review.find({ doctor: this.doctorId });

  if (reviews.length === 0) {
    this.rating = 0;
    this.reviewCount = 0;
  } else {
    const totalRating = reviews.reduce((sum, review) => sum + review.rating, 0);
    this.rating = (totalRating / reviews.length).toFixed(1);
    this.reviewCount = reviews.length;
  }

  await this.save();
}


export const Doctor = mongoose.model("Doctor", doctorSchema);