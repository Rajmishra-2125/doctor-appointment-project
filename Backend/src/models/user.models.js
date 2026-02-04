import mongoose, { Schema } from 'mongoose';
import bcrypt from 'bcrypt';
import jwt from 'jsonwebtoken';

const userSchema = new Schema(
  {
    fullname: {
      type: String,
      required: true,
      trim: true,
    },
    username: {
      type: String,
      required: true,
      unique: true,
      lowercase: true,
      trim: true,
      index: true,
    },
    email: {
      type: String,
      required: true,
      unique: true,
      lowercase: true,
      trim: true,
    },
    password: {
      type: String,
      required: [true, "password is required"],
      minlength: 6,
      select: false, // important for security
    },
    role: {
      type: String,
      enum: ["PATIENT", "DOCTOR", "ADMIN"],
      default: "PATIENT",
    },
    avatar: {
      type: String, // cloudinary URL
      required: true,
    },
    phone: {
      type: String,
      required: true,
      unquie: true,
    },
    dateOfBirth: {
      type: Date,
      required: true,
    },
    address: {
      type: String,
      required: true,
    },
    isActive: {
      type: Boolean,
      default: true,
      index: true,
    },
    accountStatus: {
      type: String,
      enum: ["ACTIVE", "PENDING_DELETION","SUSPENDED", "BANNED", "DELETED"],
      default: "ACTIVE",
      index: true,
    },
    deletionScheduledAt: {
      type: Date,
      default: null,
    },
    deletionExecutionDate: {
      type: Date,
      default: null,
    },
    deletionReason: {
      type: String,
      default: null,
    },
    refreshToken: {
      type: String,
      select: false,
    },
    createdAt: {
      type: Date,
      default: Date.now,
    },
    updatedAt: {
      type: Date,
      default: Date.now,
    },
  },
  {
    timestamps: true,
  }
);

userSchema.pre("save", async function (next) {
    if (!this.isModified("password")) return next();
    this.password = await bcrypt.hash(this.password, 10)
})  

userSchema.methods.isPasswordCorrect = async function (password) {   
  return await bcrypt.compare(password, this.password);
};

userSchema.methods.generateAccessToken = function () {
    return jwt.sign(
    {
        _id: this._id,
        emial: this.email,
        password: this.password
    }, 
    process.env.ACCESS_TOKEN_SECRET,
    {
        expiresIn: process.env.ACCESS_TOKEN_EXPIRY
    }
    )
}

userSchema.methods.generateRefreshToken = function () {
    return jwt.sign(
        {
            _id: this._id
        },
        process.env.REFRESH_TOKEN_SECRET,
        {
            expiresIn: process.env.REFRESH_TOKEN_EXPIRY
        }
    )
}

userSchema.pre(/^find/, function (next) {
  if (!this.getOptions().includeInactive) {
    this.find({ isActive: true });
  }
  // next();  
});

export const User = mongoose.model("User", userSchema);