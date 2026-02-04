import { asyncHandler } from "../utils/asyncHandler.js";
import { User } from "../models/user.models.js";
import { ApiResponse } from "../utils/ApiResponse.js";
import {
  uploadOnCloudinary,
  deleteFromCloudinary,
} from "../utils/cloudinary.js";
import jwt from "jsonwebtoken";
import { ApiError } from "../utils/ApiError.js";
import mongoose, { set } from "mongoose";

// Generate Access and Refresh Token
const generateAccessAndRefreshToken = async (userId) => {
  try {
    const user = await User.findById(userId);

    if (!user) {
      throw new ApiError(404, "User not found");
    }

    const accessToken = user.generateAccessToken();
    const refreshToken = user.generateRefreshToken();

    // user.refreshToken = refreshToken;
    // await user.save({ validateBeforeSave: false });

    await User.findByIdAndUpdate(
      user._id,
      { refreshToken },
      { new: true }
    );
    return { accessToken, refreshToken };

  } catch (error) {
    return new ApiError(
      500,
      "Something went wrong while generating access and refresh token"
    );
  }
};

// Register new user
const registerUser = asyncHandler(async (req, res) => {
   const { fullname, email, username, password, role, phone, DOB, address} = req.body

   if ([fullname, username, email, password, phone, DOB, address].some((field) => {field?.trim() === ""})) {
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
      fullname: fullname,
      username: username.toLowerCase(),
      email,
      password,
      role: userRole,
      avatar: avatar.url,
      phone: phone,
      dateOfBirth: DOB,
      address: address,
    });
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
});

// Login user
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

});

// Refresh access token
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

    console.log("User:", user);
    
  
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
  
    const { accessToken, refreshToken } = await generateAccessAndRefreshToken(user._id)

    console.log("newRefreshToken", refreshToken);
    
  
    return res
      .status(200)
      .cookie("accessToken", accessToken, options)
      .cookie("refreshToken", refreshToken, options)
      .json(
        new ApiResponse(
          200,
          { accessToken, refreshToken: refreshToken },
          "access token is refreshed"
        )
      );
  } catch (error) {
    throw new ApiError(401, error?.message || "Invalid refresh token")
  }
});

// Logout user
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

// Exporting all controller functions
export {
    registerUser,
    loginUser,
    logoutUser,
    refreshAccessToken,
}