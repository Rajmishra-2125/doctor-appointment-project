import { asyncHandler } from "../utils/asyncHandler.js"
import { ApiError } from "../utils/ApiError.js"
import { ApiResponse } from "../utils/ApiResponse.js"
import { User } from "../models/user.models.js"
import { Doctor } from "../models/doctor.models.js"
import { Follow } from "../models/follow.models.js";

const saveDoctorInfo = asyncHandler( async(req, res) => {

  const {
    specialization,
    qualification,
    experience,
    consultationFee,
    licenseNumber,
    licenseIssuingAuthority,
    licenseIssueDate,
    licenseExpiryDate,
    clinicName,
    clinicPhone,
    clinicEmail,
  } = req.body;


  if (!specialization || !qualification || !experience || !consultationFee || !licenseNumber) {
    throw new ApiError(400, "All fields are required")
  }

  const clinicDetailCheck = await Doctor.findOne({
    $or: [{clinicEmail: clinicEmail}, {clinicPhone: clinicPhone}, {licenseNumber: licenseNumber}]
  })

  if (clinicDetailCheck) {
    throw new ApiError(401, "Doctor with this licenseNumber or email or phoneNumber already exists")
  }
  
  const existedUser = await User.findOne({
    _id: req.user?._id,
    role: "DOCTOR",
  })

  console.log("existedUser", existedUser);
  console.log("existedUser?._id", existedUser?._id);


  if (existedUser.role !== "DOCTOR") {
    throw new ApiError(403, "Only doctors can create profile");
  }

   const existingDoctor = await Doctor.findOne({doctorId: req.user?._id})

  if (existingDoctor) {
    throw new ApiError(401, "doctor account already updated for any changes use update profile");
  }

  const address = existedUser.address

  try {
    const doctorInfo = await Doctor.findOneAndUpdate(
      { doctorId: req.user?._id },
      {
        doctorId: req.user?._id,
        doctor: req.user?.username,
        specialization: specialization,
        qualification: qualification,
        experience: experience,
        licenseNumber: licenseNumber,
        licenseIssuingAuthority: licenseIssuingAuthority,
        licenseIssueDate: licenseIssueDate,
        licenseExpiryDate: licenseExpiryDate,
        consultationFee: consultationFee,
        clinicName: clinicName,
        clinicPhone: clinicPhone,
        clinicEmail: clinicEmail,
        clinicAddress: address,
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


  } catch (error) {
    throw new ApiError(404, error.message, "Something went wrong while saving doctor info")
  }

});

const getMyProfile = asyncHandler(async (req, res) => {
  const doctorId = req.user?._id;
  const doctor = await Doctor.findOne({ doctorId: doctorId });

  return res
    .status(200)
    .json(
      new ApiResponse(200, { data: doctor }, "Doctor profile fetched")
    );
});

const getDoctors = asyncHandler(async (req, res) => {
  const doctors = await Doctor.aggregate([]).limit(20);

  return res
    .status(200)
    .json(
      new ApiResponse(
        200,
        { data: doctors },
        "Doctors fetched successfully"
      )
    );
});

const updateDoctorProfile = asyncHandler( async(req, res) => {

    const {
      specialization,
      qualification,
      experience,
      consultationFee,
      clinicName,
    } = req.body;

    if (!specialization || !qualification || !experience || !consultationFee || !clinicName) {
        throw new ApiError(401, "invalid credentials")
    }

    const updateDoctorInfo = await Doctor.findOneAndUpdate(
      { doctorId: req.user?._id },
      {
        specialization: specialization,
        qualification: qualification,
        experience: experience,
        consultationFee: consultationFee,
        clinicName: clinicName,
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
});

const followDoctor = asyncHandler( async(req, res) => {
  const patientId = req.user?._id;
  const { username } = req.params;
  
  // 1. Check Doctor/User exists
  const doctor = await Doctor.findOne({ doctor: username.toLowerCase() })

  if (!doctor) {
    throw new ApiError(400, "Doctor doesn't exists.");
  }

  // 2. Get doctorId
  const doctorId = doctor.doctorId;

  // 3. Preventing by self-follow
  if (doctorId.toString() === patientId.toString()) {
    throw new ApiError(400, "You cannot follow yourself");
  }

 // if following already get error
  const checkingFollowingOrNot = await Follow.aggregate([
    {
      $match: {
        doctorId: doctorId,
        patientId: patientId,
      }
    }
  ]);
  

  if (checkingFollowingOrNot.length !== 0) {
    throw new ApiError(401, "you already follow this doctor");
  }

  // 4. Following the doctor
  const startedFollowing = await Follow.create(
    {
      doctorId: doctorId,
      patientId: patientId,
    }
  );
  
  // 5. Incrementing the followersCount
  const updateFollower = await Doctor.findOneAndUpdate(
    { doctor: username.toLowerCase() },
    { $inc: { followersCount: 1 } },
    { new: true }
  );

  return res
    .status(200)
    .json(
      new ApiResponse(
        200,
        { data: startedFollowing, updateFollower },
        "Doctor profile fetched successfully"
      )
    );
});

const unfollowDoctor = asyncHandler(async (req, res) => {
    const {username} = req.params
    const patientId = req.user?._id

  const doctor = await Doctor.findOne({ doctor: username.toLowerCase() })

  if (!doctor) {
    throw new ApiError(404, "doctor doesn't exists.")
  }
  const doctorId = doctor.doctorId;

  const follow = await Follow.findOne({doctorId: doctorId, patientId: patientId})
  
  if (!follow) {
    throw new ApiError(400, "You are not following this doctor")
  }
  
  const deleteFollowId = await Follow.findOneAndDelete({ _id: follow._id })
  
  const result = await Doctor.findOneAndUpdate(
    { doctor: username },
    {
      $inc: { followersCount: -1 },
    },
    {
      new: true,
    }
  );

  return res
    .status(200)
    .json(
      new ApiResponse(
        200,
        { data: result, deleteFollowId },
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

});

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

});

const getAvailabilityById = asyncHandler(async(req, res) => {
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


const getAvailability = asyncHandler(async(req, res) => {
  const doctorsAvailability = await Doctor.aggregate([
    {
      $match: {
        isAcceptingNewPatients: true,
      },
    }
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
  


})


export {
  getDoctors,
  getMyProfile,
  saveDoctorInfo,
  updateDoctorProfile,
  followDoctor,
  unfollowDoctor,
  getDoctorsBySpecialization,
  getDoctorsByMostFollowers,
  getAvailabilityById,
  getAvailability,
};