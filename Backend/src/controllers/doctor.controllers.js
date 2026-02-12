import { asyncHandler } from "../utils/asyncHandler.js";
import { ApiError } from "../utils/ApiError.js";
import { ApiResponse } from "../utils/ApiResponse.js";
import { User } from "../models/user.models.js";
import { Doctor } from "../models/doctor.models.js";
import { Follow } from "../models/follow.models.js";

const getDoctorDetails = asyncHandler(async (req, res) => {
  const userId = req.user?._id;

  if (!userId) {
    throw new ApiError(400, "user not found");
  }
  const userDetails = await Doctor.findById(userId).select(
    "-password -refreshToken"
  );

  return res
    .status(200)
    .json(new ApiResponse(200, { userDetails }, "current user details"));
})

const getDoctors = asyncHandler(async (req, res) => {
  const doctors = await Doctor.aggregate([]).limit(20);

  return res
    .status(200)
    .json(
      new ApiResponse(200, { data: doctors }, "Doctors fetched successfully")
    );
});

const updateDoctorProfile = asyncHandler(async (req, res) => {
  const {
    specialization,
    qualification,
    experience,
    consultationFee,
    clinicName,
    isVisible,
    isAcceptingNewPatients,
  } = req.body;

  const doctorData = {
    specialization,
    qualification,
    experience,
    consultationFee,
    clinicName,
    isVisible,
    isAcceptingNewPatients
  }

  const updateDoctorInfo = await Doctor.findOneAndUpdate(
    { doctorId: req.user?._id },
    {
      $set: doctorData
    },
    {
      upsert: true,
      new: true,
    }
  ).setOptions({ includeInactive: true });

  return res
    .status(200)
    .json(
      new ApiResponse(
        200,
        { data: updateDoctorInfo },
        "account details updated successfully"
      )
    );
});

const followDoctor = asyncHandler(async (req, res) => {
  const patientId = req.user?._id;
  const { username } = req.params;

  // 1. Check Doctor/User exists (Lean query for speed)
  const doctor = await Doctor.findOne({ doctor: username.toLowerCase() })
    .select("doctorId followersCount")
    .lean();

  if (!doctor) {
    throw new ApiError(400, "Doctor doesn't exists.");
  }

  const doctorId = doctor.doctorId;

  // 2. Prevent self-follow
  if (doctorId.toString() === patientId.toString()) {
    throw new ApiError(400, "You cannot follow yourself");
  }

  try {
    // 3. OPTIMIZED: Try to Create directly. Rely on Unique Index for check.
    const startedFollowing = await Follow.create({
      doctorId: doctorId,
      patientId: patientId,
    });

    // 4. FAST RESPONSE: Send response NOW. Update stats later.
    res
      .status(200)
      .json(
        new ApiResponse(
          200,
          { data: startedFollowing, message: "Request queued" },
          "Doctor followed successfully"
        )
      );

    // 5. Background Task (Fire and Forget)
    Doctor.findByIdAndUpdate(doctor._id, { $inc: { followersCount: 1 } }).catch(
      (err) => console.error("Background Follow Stats Error:", err)
    );

    // Note: We return nothing here because response is already sent.
  } catch (error) {
    if (error.code === 11000) {
      throw new ApiError(401, "you already follow this doctor");
    }
    throw error;
  }
});

const unfollowDoctor = asyncHandler(async (req, res) => {
  const { username } = req.params;
  const patientId = req.user?._id;

  // Lean Query
  const doctor = await Doctor.findOne({ doctor: username.toLowerCase() })
    .select("doctorId followersCount")
    .lean();

  if (!doctor) {
    throw new ApiError(404, "doctor doesn't exists.");
  }
  const doctorId = doctor.doctorId;

  // Atomic Delete
  const deletedFollow = await Follow.findOneAndDelete({
    doctorId: doctorId,
    patientId: patientId,
  });

  if (!deletedFollow) {
    throw new ApiError(400, "You are not following this doctor");
  }

  // 1. FAST RESPONSE: Send result immediately
  res
    .status(200)
    .json(
      new ApiResponse(
        200,
        { data: { success: true }, deletedFollow },
        "Doctor unfollowed successfully"
      )
    );

  // 2. Background Task: Decrement Count
  Doctor.findByIdAndUpdate(doctor._id, { $inc: { followersCount: -1 } }).catch(
    (err) => console.error("Background Unfollow Stats Error:", err)
  );
});

const getDoctorsBySpecialization = asyncHandler(async (req, res) => {
  const { specialization } = req.params;

  if (!specialization) {
    throw new ApiError(404, "specilization is required");
  }

  const profile = await Doctor.aggregate([
    { $match: { specialization: specialization } },
    { $limit: 10 },
  ]);

  if (!profile) {
    throw new ApiError(404, "No doctors found for this specialization");
  }

  return res
    .status(200)
    .json(new ApiResponse(200, { data: profile }, "Success"));
});

const getDoctorsByMostFollowers = asyncHandler(async (req, res) => {
  const { specialization } = req.params;

  if (!specialization) {
    throw new ApiError(400, "Specialization is required");
  }

  const sortingByFollowers = await Doctor.aggregate([
    {
      $match: {
        specialization: specialization,
      },
    },
    {
      $sort: {
        followersCount: -1,
      },
    },
    {
      $limit: 10,
    },
  ]);

  if (!sortingByFollowers) {
    throw new ApiError(404, "No doctors fonund");
  }

  return res
    .status(200)
    .json(
      new ApiResponse(
        200,
        { data: sortingByFollowers },
        "Top doctors by followers fetched successfully"
      )
    );
});

const getAvailabilityById = asyncHandler(async (req, res) => {
  const { username } = req.params;

  if (!username || !username.trim()) {
    throw new ApiError(400, "Username is required");
  }

  const doctor = await Doctor.findOne({ doctor: username.toLowerCase() });

  if (!doctor) {
    throw new ApiError(404, "Doctor doesn't exists.");
  }

  const doctorId = doctor.doctorId;

  const availability = await Doctor.findOne({
    doctorId: doctorId,
    isAcceptingNewPatients: true,
  });

  if (!availability) {
    throw new ApiError(404, "No availability found for this doctor");
  }

  return res
    .status(200)
    .json(
      new ApiResponse(
        200,
        { data: availability },
        "Doctor availability fetched successfully"
      )
    );
});

const getAvailability = asyncHandler(async (req, res) => {
  const doctorsAvailability = await Doctor.aggregate([
    {
      $match: {
        isAcceptingNewPatients: true,
      },
    },
  ]).limit(20);

  return res
    .status(200)
    .json(
      new ApiResponse(
        200,
        { data: doctorsAvailability },
        "Doctors availability fetched successfully"
      )
    );
});

export {
  getDoctorDetails,
  getDoctors,
  updateDoctorProfile,
  followDoctor,
  unfollowDoctor,
  getDoctorsBySpecialization,
  getDoctorsByMostFollowers,
  getAvailabilityById,
  getAvailability,
};
