import {asyncHandler} from "../utils/asyncHandler.js";
import {User} from "../models/user.models.js";
import { ApiResponse} from "../utils/ApiResponse.js";
import { uploadOnCloudinary, deleteFromCloudinary } from "../utils/cloudinary.js";
import jwt from "jsonwebtoken";
import {ApiError} from "../utils/ApiError.js";
import mongoose, { set } from "mongoose";


const generateAccessAndRefreshToken = async (userId) => {
  try {
    const user = await User.findById(userId)
  
    const accessToken = user.generateAccessToken()
    const refreshToken = user.generateRefreshToken()
  
    await User.findByIdAndUpdate(user._id, {refreshToken}, {new: true})
    return {accessToken, refreshToken}
  } catch (error) {
    return new ApiError(500, "Something went wrong while generating access and refresh token")
  }
}

const registerUser = asyncHandler(async (req, res) => {
   const { fullname, email, username, password, role} = req.body

   if ([fullname, username, email, password].some((field) => {field?.trim() === ""})) {
    throw new ApiError(400, "All fields are required")
   }

    let userRole = "PATIENT";

    // Allow ONLY DOCTOR from request
    if (role === "DOCTOR") {
      userRole = "DOCTOR";
    }

   const existeduser = await User.findOne({
    $or: [{ username }, { email }]
  })

   if(existeduser) {
    throw new ApiError(404, "user with username or email already exists.")
   }

   console.warn(req.files);
   const avatarLocalPath = req.files?.avatar?.[0]?.path 
   

   let avatar;
   try {
    avatar = await uploadOnCloudinary(avatarLocalPath)
    console.log("Uploaded Avatar", avatar);
   } catch (error) {
    console.log("Error uploading avatar", error);
    return new ApiError(500, "Failed to upload avatar")
   }


   try {
    const user = await User.create({
      fullname,
      avatar: avatar.url,
      email,
      password,
      username: username.toLowerCase(),
      role: userRole,
    })
    console.log("user is existing", user);

    const createdUser = await User.findById(user._id).select("-password -refreshToken")

    if(!createdUser) {
      throw new ApiError(500, "Something went wrong")
    }

    return res
    .status(200)
    .json(new ApiResponse(200, createdUser, "User register successfully"))
   } catch (error) {
    console.log("User creation error", error);

    if (!avatar) {
      await deleteFromCloudinary(avatar.public_id)
    }

    throw new ApiError(400, "Something went wrong while registering a user and Image were deleted")
   }
}) 

const loginUser = asyncHandler(async (req, res) => {
  const { username, email, password } = req.body

  if(!(email || username)) {
    throw new ApiError(400, "email is required")
  }

  if(!password) {
    throw new ApiError(400, "password is required")
  }

  const user = await User.findOne({
    $or: [{username}, {email}]
  }).select("+password")

  if (!user) {
  throw new ApiError(404, "user not found")
}

// validation

const isPasswordValid = await user.isPasswordCorrect(password)

if (!isPasswordValid) {
  throw new ApiError(401, "invalid password")
}

const { accessToken, refreshToken } = await generateAccessAndRefreshToken(user._id)

const logedInUser = await User.findById(user._id).select("-password -refreshToken")

const options = {
  httpOnly: true,
  secure: process.env.NODE_ENV === "production"
}

return res
.status(200)
.cookie("accessToken", accessToken, options)
.cookie("refreshToken", refreshToken, options)
.json( new ApiResponse(200, 
  {user: logedInUser, accessToken, refreshToken},
 "User loggedIn successfully"
))

})

const logoutUser = asyncHandler(async (req, res) => {
    User.findByIdAndUpdate(
      req.user._id, 
      {
       $set: {
        refreshToken: undefined
       } 
    })

    const options = {
      httpOnly: true,
      secure: process.env.NODE_ENV === "production"
    }

    return res
    .status(200)
    .clearCookie("accessToken", options)
    .clearCookie("refreshToken", options)
    .json( new ApiResponse(200, "User loggedOut successfully"))

});

const refreshAccessToken = asyncHandler(async (req, res) => {
  try {
    const incomingRefreshToken = req.cookies.refreshToken || req.body.refreshToken
  
    if(!incomingRefreshToken) {
      throw new ApiError(401, "Unauthorized request")
    }
  
    const decodedToken = jwt.verify(
      incomingRefreshToken,
      process.env.REFRESH_TOKEN_SECRET
    )
  
    const user = await User.findById(decodedToken?._id)
  
    if (!user) {
      throw new ApiError(401, "Invalid refresh token")
    }
  
    if (incomingRefreshToken == user?.refreshToken) {
      throw new ApiError(401, "Refresh token is expired or used")
    }
  
    const options = {
      httpOnly: true,
      secure: process.env.NODE_ENV === "production"
    }
  
    const { accessToken, newRefreshToken } = await generateAccessAndRefreshToken(user._id)
  
    return res
    .status(200)
    .cookies("accessToken", accessToken, options)
    .cookies("refreshToken", newRefreshToken, options)
    .json(
      new ApiResponse(
        200,
        {accessToken, refreshToken: newRefreshToken},
         "access token is refreshed"))
  } catch (error) {
    throw new ApiError(401, error?.message || "Invalid refresh token")
  }
});

const changeCurrentPassword = asyncHandler(async (req, res) => {
  const { oldPassword, newPassword } = req.body

  const user = await User.findById(req.user?._id).select("+password")
  console.log(oldPassword);
  
  const isPasswordValid = await user.isPasswordCorrect(oldPassword)

  if(!isPasswordValid) {
    throw new ApiError(400, "Invalid old password")
  }

  user.password = newPassword
  await user.save({validateBeforeSave: false})

  return res
  .status(200)
  .json(
    new ApiResponse(200, "password changed successfully")
  )
});

const getCurrentUser = asyncHandler(async (req, res) => {
   const userId = req.user?._id;

   if (!userId) {
    throw new ApiError(400, "username not found")
   }
   const userDetails = await User.findById(userId)

  return res
  .status(200)
  .json( new ApiResponse(
    200,
    {userDetails}, 
    "current user details",
  ))
});

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



export {
    generateAccessAndRefreshToken,
    registerUser,
    loginUser,
    logoutUser,
    refreshAccessToken,
    changeCurrentPassword,
    getCurrentUser,
    updateAccountDetails,
    updateUserAvatar,
}
