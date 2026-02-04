import {asyncHandler} from "../utils/asyncHandler.js";
import {User} from "../models/user.models.js";
import { ApiResponse} from "../utils/ApiResponse.js";
import { uploadOnCloudinary } from "../utils/cloudinary.js";
import {ApiError} from "../utils/ApiError.js";
import mongoose, { set } from "mongoose";

// Get current user details
const getCurrentUser = asyncHandler(async (req, res) => {
  const userId = req.user?._id;

  if (!userId) {
    throw new ApiError(400, "username not found");
  }
  const userDetails = await User.findById(userId);

  return res
    .status(200)
    .json(new ApiResponse(200, { userDetails }, "current user details"));
});

// Update account details
const updateAccountDetails = asyncHandler(async (req, res) => {
  const { fullname, email } = req.body

  if(!fullname || !email) {
    throw new ApiError(401, "all fields are required")
  }

  const user = await User.findByIdAndUpdate(
    req.user?._id, 
    {
      $set: {
        fullname,
        email: email
      }
    }, 
    {
      new: true,
    }
  ).select("-password")

  return res
  .status(200)
  .json(
    new ApiResponse(200, user, "account details successfully.")
  )
});

// Update user avatar
const updateUserAvatar = asyncHandler(async (req, res) => {
  const avatarLocalPath = req.file?.path

  if (!avatarLocalPath) {
    throw new ApiError(400, "Avatar file is missing")
  }

  const avatar = await uploadOnCloudinary(avatarLocalPath)

  if (!avatar?.url) {
    throw new ApiError(400, "Error while uploadng avatar")
  }

  const user = await User.findByIdAndUpdate(
    req.user?._id,
    {
      $set: {
        avatar: avatar.url,
      }
    },
    {
      new: true,
    }
  ).select("-password")

  return res
  .status(200)
  .json(
    new ApiResponse(
    200,
    user,
    "Avatar image updated successfully"))
});

// Change current password
const changeCurrentPassword = asyncHandler(async (req, res) => {
  const { oldPassword, newPassword } = req.body;

  const user = await User.findById(req.user?._id).select("+password");
  console.log(oldPassword);

  const isPasswordValid = await user.isPasswordCorrect(oldPassword);

  if (!isPasswordValid) {
    throw new ApiError(400, "Invalid old password");
  }

  user.password = newPassword;
  await user.save({ validateBeforeSave: false });

  return res
    .status(200)
    .json(new ApiResponse(200, "password changed successfully"));
});

// Soft delete user account
const deleteAccount = asyncHandler(async (req, res) => {
  const userId = req.user._id;
  const { reason } = req.body;

  const user = await User.findById(userId);
  if (!user) {
    throw new ApiError(404, "User not found");
  }

  if(user.accountStatus === "PENDING_DELETION") {
    throw new ApiError(400, "Account deletion is already in progress");
  }

  // Soft deletion with 30 days grace period
  user.accountStatus = "PENDING_DELETION";
  user.isActive = false;
  user.deletionScheduledAt = new Date()
  user.deletionExecutionDate = new Date(Date.now() + 30 * 24 * 60 * 60* 1000);
  user.deletionReason = reason || "User requested deletion";
  await user.save();

  // Handle role-specific data
  if (user.role === "DOCTOR") {
    // Cancel future appointments
    await Appointment.updateMany(
      {
        doctorId: userId,
        date: { $gte: new Date() },
        status: { $in: ["PENDING", "CONFIRMED"] },
      },
      {
        status: "CANCELLED",
        cancellationReason: "Doctor account deactivated",
        cancelledAt: new Date(),
        cancelledBy: userId,
      }
    );

    // Notify patients
    // await notifyPatientsOfCancellation(userId);

    // Hide doctor profile
    await Doctor.updateOne({ doctorId: userId }, { isVisible: false });
  } else if (user.role === "PATIENT") {
    // Cancel future appointments
    await Appointment.updateMany(
      {
        patientId: userId,
        date: { $gte: new Date() },
        status: { $in: ["PENDING", "CONFIRMED"] },
      },
      {
        status: "CANCELLED",
        cancellationReason: "Patient account deactivated",
      }
    );
  }

  // Clear sessions
  await Session.deleteMany({ userId });

  const options = {
    httpOnly: true,
    secure: process.env.NODE_ENV === "production",
  };

  return res
    .status(200)
    .clearCookie("accessToken", options)
    .clearCookie("refreshToken", options)
    .json(
      new ApiResponse(
        200,
        {
          deletionScheduled: true,
          executionDate: user.deletionExecutionDate,
          message:
            "Account will be permanently deleted in 30 days. You can recover it before then.",
        },
        "Account deactivated successfully"
      )
    );
});

// Recovering deleted account
const recoverDeletedAccount = asyncHandler(async (req, res) => {
  const userId = req.user._id;

  const user = await User.findById(userId).setOptions({ includeInactive: true });
  if (!user) {
    throw new ApiError(404, "User not found");
  }

  if (user.accountStatus !== "PENDING_DELETION") {
    throw new ApiError(400, "Account is not pending deletion");
  }

  if (user.deletionExecutionDate < new Date()) {
    throw new ApiError(400, "Account deletion period has expired");
  }

  // Restore account
  user.accountStatus = "ACTIVE";
  user.isActive = true;
  user.deletionScheduledAt = null;
  user.deletionExecutionDate = null;
  user.deletionReason = null;
  await user.save();

  // Restore role-specific data
  if (user.role === "DOCTOR") {
    // Restore doctor profile visibility
    await Doctor.updateOne({ doctorId: userId }, { isVisible: true,
    isAcceptingNewPatients: true });
  } else if (user.role === "PATIENT") {
    // Additional restoration logic for patients if needed
  }

  // Handle role-specific data restoration if needed

  return res
    .status(200)
    .json(
      new ApiResponse(
        200,
        { user },
        "Account recovery successful. Your account is now active."
      )
    );
});




export {
    getCurrentUser,
    updateAccountDetails,
    updateUserAvatar,
    changeCurrentPassword,
    deleteAccount,
    recoverDeletedAccount,
}
