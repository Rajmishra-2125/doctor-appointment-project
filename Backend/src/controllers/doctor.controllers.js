import { asyncHandler } from "../utils/asyncHandler.js"
import { ApiError } from "../utils/ApiError.js"
import { ApiResponse } from "../utils/ApiResponse.js"
import { User } from "../models/user.models.js"
import { Doctor } from "../models/doctor.models.js"
import { DoctorFollow } from "../models/doctorFollow.models.js";

const saveDoctorInfo = asyncHandler( async(req, res) => {

  const {
    specialization,
    experience,
    consultationFee,
    availableDays,
    timeSlots,
  } = req.body;

const existedUser = await User.findOne({
  _id: req.user?._id,
  role: "DOCTOR",
}).select("-password")

console.log("existedUser", existedUser);
console.log("existedUser?._id", existedUser?._id);


if (existedUser.role !== "DOCTOR") {
  throw new ApiError(403, "Only doctors can create profile");
}

const existingDoctor = await Doctor.findOne({doctor: req.user?._id})

if (existingDoctor) {
  throw new ApiError(401, "doctor already exists")
}
console.log("existingDoctor", existingDoctor);

const doctorInfo = await Doctor.findOneAndUpdate(
  {doctor: existedUser?._id},
  {
    doctor: existedUser?._id,
    username: existedUser?.username,
    specialization,
    experience,
    consultationFee,
    availableDays,
    timeSlots,
  },
  {
    upsert: true,
    new: true
  }
)

  
console.log(doctorInfo, "doctorInfo");

    
    return res
      .status(200)
      .json(
        new ApiResponse(
          200,
          {data: doctorInfo},
          "Doctor profile created successfully"
        )
      );
})

const updateDoctorProfile = asyncHandler( async(req, res) => {

    const {
      specialization,
      experience,
      consultationFee,
      availableDays,
      timeSlots,
    } = req.body;

    if (!specialization || !experience || !consultationFee || !availableDays || !timeSlots) {
        throw new ApiError(401, "invalid credentials")
    }
    
    // const doctor = await Doctor.findByIdAndUpdate(
    //   { doctor: req.user._id },
    //   {
    //     specialization,
    //     experience,
    //     consultationFee,
    //     availableDays,
    //     timeSlots,
    //   },
    //   {
    //     new: true,
    //   }
    // );

const existingDoctor = await Doctor.findOne({ doctor: req.user?._id });

    console.log("doctor", existingDoctor);
    

    const updateDoctorInfo = await Doctor.findOneAndUpdate(
      { doctor: existingDoctor._id },
      {
        specialization,
        experience,
        consultationFee,
        availableDays,
        timeSlots,
      },
      {
        upsert: true,
        new: true,
      }
    );
    
    if (!updateDoctorInfo) {
      throw new ApiError(401, "Doctor not found");
    }
        
    return res
    .status(200)
    .json( new ApiResponse(
        200,
        {data: updateDoctorInfo},
        "account details updated successfully"
    ))
})
    
const getDoctorProfile = asyncHandler(async (req, res) => {
  const { username } = req.params;

  if (!username?.trim()) {
    throw new ApiError(400, "Username is required");
  }

  const profile = await User.findOne({username}).select("-password")
  
  if (!profile) {
    throw new ApiError(404, "User is not found");
  }
  
  if (profile.role !== "DOCTOR") {
    throw new ApiError(404, "This user is not doctor");
  }

  const doctorProfile = await Doctor.findOne({username});

  console.log("doctorProfile", doctorProfile);

/*
  const doctorProfile = await Doctor.aggregate([
    {
      $match: {
        username: username?.toLowerCase(),
        role: "DOCTOR",
      },
    },
    {
      $lookup: {
        from: "doctorsprofiles",
        localField: "_id",
        foreignField: "doctor",
        as: "doctorProfile",
      },
    },
    {
      $unwind: {
        path: "$doctorProfile",
        preserveNullAndEmptyArrays: true,
      },
    },
    {
      $lookup: {
        from: "doctorfollows",
        localField: "_id",
        foreignField: "doctor",
        as: "followers",
      },
    },
    {
      $addFields: {
        followersCount: { $size: "$followers" },
        isFollowing: {
          $cond: {
            if: { $in: [req.user?._id, "$followers.patient"] },
            then: true,
            else: false,
          },
        },
      },
    },
    {
      $project: {
        fullname: 1,
        username: 1,
        avatar: 1,
        email: 1,

        specialization: "$doctorProfile.specialization",
        experience: "$doctorProfile.experience",
        consultationFee: "$doctorProfile.consultationFee",
        availableDays: "$doctorProfile.availableDays",
        timeSlots: "$doctorProfile.timeSlots",

        followersCount: 1,
        isFollowing: 1,
      },
    },
  ]);

*/

  return res
    .status(200)
    .json(new ApiResponse(200, {data: doctorProfile}, "doctor profile fetched"));
});

const followDoctor = asyncHandler( async(req, res) => {
  const patientId = req.user?._id;
  const { username } = req.params;


  // 1. Check Doctor/User exists
  const doctor = await Doctor.findOne({ username: username.toLowerCase() })
  const doctorId = doctor.doctor._id // defines doctor Id

  console.log("doctor = ", doctor);

  console.log("doctorId", doctorId);
  console.log("patientId", patientId);

  

  if (!doctor) {
    throw new ApiError(400, "Doctor doesn't exists.")
  }
  console.log("Doctor =>", doctor);
  
  // 2. Checking User is Doctor
  const validDoctor = await User.findOne({ username: username });
  if (validDoctor.role !== "DOCTOR") {
    throw new ApiError(400, "User is not a doctor");
  }


  // 3. Preventing by self-follow
  if (doctorId.toString() === patientId.toString()) {
    throw new ApiError(400, "You cannot follow yourself");
  }

  console.log("doctorId to string", doctorId.toString());
  

 // if following already get error
  const followingOrNot = await DoctorFollow.findOne({
    doctor: doctorId,
    patient: patientId,
  });

  console.log("Checking following or not", followingOrNot);


  if (followingOrNot) {
    throw new ApiError(401, "you already follow this doctor");
  }

  // 4. Following the doctor
  const following = await DoctorFollow.create(
    {
      doctor: doctorId,
      patient: patientId,
    }
  );
  console.log("Started following", following);
  
  // 5. Incrementing the followersCount
  const updateFollower = await Doctor.findOneAndUpdate(
    {username: username},
    { $inc: { followersCount: 1 } },
    { new: true }
  );

  console.log("Follower Updated", updateFollower);

  return res
    .status(200)
    .json(
      new ApiResponse(
        200,
        { data: updateFollower },
        "Doctor profile fetched successfully"
      )
    );
})

const unfollowDoctor = asyncHandler(async (req, res) => {
    const {username} = req.params
    const patientId = req.user?._id

  const doctor = await Doctor.findOne({ username: username.toLowerCase() })

  if (!doctor) {
    throw new ApiError(404, "doctor doesn't exists.")
  }
  const doctorId = doctor._id;

  const follow = await DoctorFollow.findOne({doctor: doctorId, patient: patientId})
  console.log("Following or not", follow);

  if (!follow) {
    throw new ApiError(400, "You are not following this doctor")
  }

  const deleteFollowId = await DoctorFollow.deleteOne({ _id: follow._id })
  console.log("deleteFollowId", deleteFollowId);
  

  const result = await Doctor.findOneAndUpdate(
    { username: username },
    {
      $inc: { followersCount: -1 },
    },
    {
      new: true,
    }
  );

  console.log("Finally unfollowed", result);

  return res
    .status(200)
    .json(
      new ApiResponse(
        200,
        { data: result },
        "Doctor unfollowed successfully"
      )
    );
    
    
  
});

const getDoctorsBySpecialization =asyncHandler(async(req, res) => { 
const { specialization } = req.params

  if (!specialization) {
    throw new ApiError(404, "specilization is required")
  }

  const profile = await Doctor.aggregate([{ $match: {specialization: specialization} },{$limit: 10}]);

  if (!profile) {
    throw new ApiError(404, "No doctors found for this specialization");
  }

  return res
  .status(200)
  .json( new ApiResponse(
    200, 
    {data: profile},
    "Success" 
  ))

})

const getDoctorsByMostFollowers = asyncHandler(async(req, res) => {
const { specialization } = req.params

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
])

console.log("Doctors", sortingByFollowers);

if (!sortingByFollowers) {
  throw new ApiError(404, "No doctors fonund")
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

})



export {
  saveDoctorInfo,
  updateDoctorProfile,
  getDoctorProfile,
  followDoctor,
  unfollowDoctor,
  getDoctorsBySpecialization,
  getDoctorsByMostFollowers,
};