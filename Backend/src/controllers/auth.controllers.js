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
import { Doctor } from "../models/doctor.models.js";

// Generate Access and Refresh Token
const generateAccessAndRefreshToken = async (userId) => {
  try {
    const user = await User.findById(userId);

    if (!user) {
      throw new ApiError(404, "User not found");
    }

    const accessToken = user.generateAccessToken();
    const refreshToken = user.generateRefreshToken();

    await User.findByIdAndUpdate(user._id, { refreshToken }, { new: true });
    return { accessToken, refreshToken };
  } catch (error) {
    throw new ApiError(
      500,
      "Something went wrong while generating access and refresh token"
    );
  }
};

// Register new user
const registerUser = asyncHandler(async (req, res) => {
  const { fullname, email, username, gender, password, role, phone, DOB } =
    req.body;

  if (
    [fullname, username, email, gender, password, role, phone, DOB].some(
      (field) => !field || field?.trim() === ""
    )
  ) {
    throw new ApiError(400, "All fields are required");
  }

  // Allow ONLY DOCTOR from request

  let userRole = role === "DOCTOR" ? "DOCTOR" : "PATIENT";

  const existeduser = await User.findOne({
    $or: [{ username }, { email }],
  }).select("_id");

  if (existeduser) {
    throw new ApiError(404, "user with username or email already exists.");
  }

  const avatarLocalPath = req.files?.avatar?.[0]?.path;

  let avatar;
  try {
    avatar = await uploadOnCloudinary(avatarLocalPath);
    console.log("Uploaded Avatar", avatar);
  } catch (error) {
    console.log("Error uploading avatar", error);
    // return new ApiError(500, "Failed to upload avatar");
  }

  try {
    const user = await User.create({
      fullname: fullname,
      username: username.toLowerCase(),
      email: email,
      gender: gender,
      password,
      role: userRole,
      profileImage: avatar?.url || "",
      phone: phone,
      dateOfBirth: DOB,
    });

    // AUTO-ONBOARDING: Create Doctor Profile if role is DOCTOR
    if (userRole === "DOCTOR") {
      try {
        console.log("Attempting to create Doctor Profile for:", user._id);
        await Doctor.create({
          doctorId: user._id,
          doctor: username.toLowerCase(),
          // Other fields are now optional in schema and can be filled later
        });
        console.log("Doctor Profile Created Successfully");
      } catch (docError) {
        console.error(
          "DOCTOR PROFILE CREATION FAILED:",
          JSON.stringify(docError, null, 2)
        );
        throw docError; // Re-throw to trigger main catch
      }
    }

    const createdUser = await User.findOne({ _id: user._id }).select(
      "-password -refreshToken"
    );

    return res
      .status(200)
      .json(new ApiResponse(200, createdUser, "User register successfully"));
  } catch (error) {
    console.log("User creation error", error);

    if (avatar) {
      await deleteFromCloudinary(avatar.public_id);
    }

    throw new ApiError(
      400,
      `Registration Failed: ${error?.message || "Something went wrong"}`
    );
  }
});

// Login user
const loginUser = asyncHandler(async (req, res) => {
  const { username, email, password } = req.body;

  if (!(email || username)) {
    throw new ApiError(400, "email or username is required");
  }

  if (!password) {
    throw new ApiError(400, "password is required");
  }

  const user = await User.findOne({
    $or: [{ username }, { email }],
  }).select("+password");

  if (!user) {
    throw new ApiError(404, "user not found");
  }

  // validation

  const isPasswordValid = await user.isPasswordCorrect(password);

  if (!isPasswordValid) {
    throw new ApiError(401, "invalid password");
  }

  const { accessToken, refreshToken } = await generateAccessAndRefreshToken(
    user._id
  );

  const loggedInUser = await User.findById(user._id).select(
    "-password -refreshToken"
  );

  const options = {
    httpOnly: true,
    secure: process.env.NODE_ENV === "production",
  };

  return res
    .status(200)
    .cookie("accessToken", accessToken, options)
    .cookie("refreshToken", refreshToken, options)
    .json(
      new ApiResponse(
        200,
        { user: loggedInUser, accessToken, refreshToken },
        "User loggedIn successfully"
      )
    );
});

// Refresh access token
const refreshAccessToken = asyncHandler(async (req, res) => {
  try {
    const incomingRefreshToken =
      req.cookies.refreshToken || req.body.refreshToken;

    if (!incomingRefreshToken) {
      throw new ApiError(401, "Unauthorized request");
    }

    const decodedToken = jwt.verify(
      incomingRefreshToken,
      process.env.REFRESH_TOKEN_SECRET
    );

    const user = await User.findById(decodedToken?._id);

    console.log("User:", user);

    if (!user) {
      throw new ApiError(401, "Invalid refresh token");
    }

    if (incomingRefreshToken == user?.refreshToken) {
      throw new ApiError(401, "Refresh token is expired or used");
    }

    const options = {
      httpOnly: true,
      secure: process.env.NODE_ENV === "production",
    };

    const { accessToken, refreshToken } = await generateAccessAndRefreshToken(
      user._id
    );

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
    throw new ApiError(401, error?.message || "Invalid refresh token");
  }
});

// Logout user
const logoutUser = asyncHandler(async (req, res) => {
  await User.findByIdAndUpdate(req.user._id, {
    $set: {
      refreshToken: undefined,
    },
  });

  const options = {
    httpOnly: true,
    secure: process.env.NODE_ENV === "production",
  };

  return res
    .status(200)
    .clearCookie("accessToken", options)
    .clearCookie("refreshToken", options)
    .json(new ApiResponse(200, "User loggedOut successfully"));
});

// Exporting all controller functions
export { registerUser, loginUser, logoutUser, refreshAccessToken };
