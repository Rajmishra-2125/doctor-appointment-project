import {asyncHandler} from "../utils/asyncHandler.js";
import {User} from "../models/user.models.js";
import { ApiResponse} from "../utils/ApiResponse.js";
import { uploadOnCloudinary } from "../utils/cloudinary.js";
import {ApiError} from "../utils/ApiError.js";
import mongoose, { set } from "mongoose";
import { Review } from "../models/review.models.js";
import { Session } from "../models/Session.models.js";
import { Appointment } from "../models/appointment.models.js";
import { Follow } from "../models/follow.models.js";

// Get current user details
const getCurrentUser = asyncHandler(async (req, res) => {
  const userId = req.user?._id;

  if (!userId) {
    throw new ApiError(400, "user not found");
  }
  const userDetails = await User.findById(userId).select("-password -refreshToken");

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
  ).select("-password -refreshToken")

  return res
  .status(200)
  .json(
    new ApiResponse(200, user, "Profile updated successfully.")
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
  const { reason, confirmationPassword } = req.body;

  // Verify password
  const user = await User.findById(userId).select("+password");
  const isPasswordValid = await User.comparePassword(confirmationPassword);

  if (!isPasswordValid) {
    throw new ApiError(400, "Invalid password confirmation");
  }

  // Check if already pending deletion
  if (user.accountStatus === "PENDING_DELETION") {
    throw new ApiError(400, "Account deletion is already in progress");
  }

  // Start transaction
  const session = await mongoose.startSession();
  session.startTransaction();

  try {
    // Soft deletion with 30 days grace period
    user.accountStatus = "PENDING_DELETION";
    user.isActive = false;
    user.deletionScheduledAt = new Date();
    user.deletionExecutionDate = new Date(Date.now() + 30 * 24 * 60 * 60 * 1000);
    user.deletionReason = reason || "User requested deletion";
    await user.save({ session });

    // Handle doctor deletion
    if (user.role === "DOCTOR") {
      // Cancel future appointments
      await Appointment.updateMany(
        { doctorId: userId },
        {
          isVisible: false,
          isAcceptingNewPatients: false,
        },
        { session }
      );
    

    // Cancel all future appointments

    const futureAppointments = await Appointment.updateMany(
      {
        doctorId: userId,
        date: { $gte: new Date() },
        status: { $in: ["PENDING", "CONFIRMED"] },
      },
      {
        status: "CANCELLED",
        cancellationReason: "Account deactivated",
        cancelledAt: new Date(),
        cancelledBy: userId,
      },
      { session }
    );

    // Soft delete all reviews by this doctor
    await Review.updateMany(
      { doctorId: userId },
      {
        isDeleted: true,
        deletedAt: new Date()
      },
      { session }
    );

    // Soft delete all follows by this doctor
    await Follow.updateMany(
      { doctorId: userId },
      {
        isDeleted: true,
        deletedAt: new Date()
      },
      { session }
    );

    console.log(`Doctor ${user.email}: Cancelled ${futureAppointments.modifiedCount} future appointments.`);

  } else if (user.role === "PATIENT") {

    // Cancel all future appointments
    const futureAppointments = await Appointment.updateMany(
      {
        patientId: userId,
        date: { $gte: new Date() },
        status: { $in: ["PENDING", "CONFIRMED"] },
      },
      {
        status: "CANCELLED",
        cancellationReason: "Account deactivated",
        cancelledAt: new Date(),
        cancelledBy: userId,
      },
      { session }
    );

    // Soft delete all reviews by this patient
    await Review.updateMany(
      { patientId: userId },
      {
        isDeleted: true,
        deletedAt: new Date()
      },
      { session }
    );

    // Soft delete all follows by this patient
    await Follow.updateMany(
      { patientId: userId },
      {
        isDeleted: true,
        deletedAt: new Date()
      },
      { session }
    );

    console.log(`Patient ${user.email}: Cancelled ${futureAppointments.modifiedCount} future appointments.`);

  }

    // Clear all sessions

    await Session.deleteMany({ userId }, { session })

    await session.commitTransaction();

    // clear cookies
    const options = {
      httpOnly: true,
      secure: process.env.NODE_ENV === "production",
      sameSite: "Strict",
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


   } catch (error) {
    // Abort transaction on error
    await session.abortTransaction();

    throw new ApiError(500, "Error during account deletion process", error.message);

   } finally {
    session.endSession();
   }

  }
);

// Recover deleted account
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

  // Start transaction
  const session = await mongoose.startSession();
  session.startTransaction();

  try {
  // Restore account/ Start session
  user.accountStatus = "ACTIVE";
  user.isActive = true;
  user.deletionScheduledAt = null;
  user.deletionExecutionDate = null;
  user.deletionReason = null;
  await user.save();

  // Restore role-specific data
  if (user.role === "DOCTOR") {
    // Restore doctor profile visibility
    await Doctor.findOneAndUpdate({ doctorId: userId }, { isVisible: true,
    isAcceptingNewPatients: true 
  },
  {
    session
  }
);

// Restore Reviews
    await Review.updateMany(
      { 
        doctorId: userId,
        isDeleted: true,
        deletedAt: { $gte: user.deletionScheduledAt}
      },
      {
        isDeleted: false,
        $unset: { deletedAt: "" }
      },
      { session }
    )

    // Restore Follows
    await Follow.updateMany(
      {
        doctorId: userId,
        isDeleted: true,
        deletedAt: { $gte: user.deletionScheduledAt }
      },
      {
        isDeleted: false,
        $unset: { deletedAt: "" }
      },
      { session }
    );
    
    // Restore Appointments within 2 Days of deletion date
    const twoDaysAgo = new Date(Date.now() - 2 * 24 * 60 * 60 * 1000);

    await Appointment.updateMany(
      {
        doctorId: userId,
        status: "CANCELLED",
        cancelledAt: { $gte: twoDaysAgo },
        cancellationReason: "Account deactivated"
      },
      {
        status: "CONFIRMED",
        $unset: {
          cancellationReason: "",
          cancelledAt: "",
          cancelledBy: ""
        },
      },
      { session}
    )


  } else if (user.role === "PATIENT") {
    // Additional restoration logic for patients if needed

    // Restore Reviews
    await Review.updateMany(
      {
        patientId: userId,
        isDeleted: true,
        deletedAt: { $gte: user.deletionScheduledAt }
      },
      {
        isDeleted: false,
        $unset: {
          deletedAt: "",
        }
      },
      { session }
    )


    // Restore Follows
    await Follow.updateMany(
      {
        patientId: userId,
        isDeleted: true,
        deletedAt: { $gte: user.deletionScheduledAt }
      },
      {
        isDeleted: false,
        $unset: {
          deletedAt: "",
        }
      },
      { session }
    )

    // Restore Appointments within 2 Days of deletion date
    const twoDaysAgo = new Date.UTC(Date.now() - 2 * 24 * 60 * 60 * 1000);

    await Appointment.updateMany(
      {
        patientId: userId,
        status: "CANCELLED",
        cancelledAt: { $gte: twoDaysAgo },
        cancellationReason: "Patient Account deactivated"
      },
      {
        status: "CONFIRMED",
        $unset: {
          cancellationReason: "",
          cancelledAt: "",
          cancelledBy: "", 
        }
      },
      { session }
    )
  }


  await session.commitTransaction();

  return res
    .status(200)
    .json(
      new ApiResponse(
        200,
        { user },
        "Account recovery successfully! Welcome back."
      )
    );
 } catch (error) {
    // Abort transaction on error
    await session.abortTransaction();

    throw new ApiError(500, "Error during account recovery process", error.message);
  } finally {
    session.endSession();
  } 
})






export {
    getCurrentUser,
    updateAccountDetails,
    updateUserAvatar,
    changeCurrentPassword,
    deleteAccount,
    recoverDeletedAccount,
}
