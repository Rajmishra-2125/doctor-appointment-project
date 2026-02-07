import { ApiError } from "../utils/ApiError.js";
import { ApiResponse } from "../utils/ApiResponse.js";
import { asyncHandler } from "../utils/asyncHandler.js";
import { Slot } from "../models/slots.models.js";
import { Doctor } from "../models/doctor.models.js";
import mongoose, { set } from "mongoose";
// Imports removed

import { generateSlotsForDoctor } from "../services/slotGenerationService.js";

// Generate auto slots for next 7 days
const generateAutoSlots = asyncHandler(async (req, res) => {
  const userId = req.user?._id;
  const doctor = await Doctor.findOne({ doctorId: userId }).setOptions({
    includeInactive: true,
  });

  if (!doctor) {
    throw new ApiError(404, "Only doctor can generate slots");
  }

  const generatedSlotsCount = await generateSlotsForDoctor(doctor, 7);

  return res
    .status(200)
    .json(
      new ApiResponse(
        200,
        { generatedSlots: generatedSlotsCount },
        `Successfully generated ${generatedSlotsCount} slots for the next 7 days`
      )
    );
});

const createManualSlot = asyncHandler(async (req, res) => {
  const username = req.user?.username;

  const { slotNumber, date, startTime, endTime, slotduration } = req.body;

  if (!slotNumber || !date || !startTime || !endTime || !slotduration) {
    throw new ApiError(400, "All fields are required.");
  }

  if (isNaN(new Date(date).getTime())) {
    throw new ApiError(404, "Invalid date format. Enter: YYYY-MM-DD");
  }

  const userId = req.user?._id;
  console.log(`[DEBUG] createManualSlot: UserID=${userId}`);
  const doctor = await Doctor.findOne({ doctorId: userId }).setOptions({
    includeInactive: true,
  });
  console.log(`[DEBUG] createManualSlot: Found Doctor Profile? ${!!doctor}`);

  if (!doctor) {
    throw new ApiError(404, "Only doctor can create slots");
  }

  const doctorId = doctor._id; // Corrected: Use Doctor Profile ID directly

  const checkSlot = await Slot.findOne({
    slotNumber: slotNumber,
    doctorId: doctorId,
    date: new Date(date),
    startTime: startTime,
    status: "AVAILABLE",
  });

  if (checkSlot) {
    throw new ApiError(404, "Slot already created");
  }

  const slots = await Slot.create({
    doctor: username, // Username
    doctorId: doctorId, // Profile ID
    slotNumber: slotNumber,
    date: date,
    startTime: startTime,
    endTime: endTime,
    slotduration: slotduration,
    status: "AVAILABLE",
  });

  return res
    .status(201)
    .json(new ApiResponse(200, { data: slots }, "Slots created successfully"));
});

const deleteSlot = asyncHandler(async (req, res) => {
  const userId = req.user?._id; // Logged in User ID
  const { slotNumber, date } = req.body;

  if (!slotNumber || !date) {
    throw new ApiError(400, "All fields are required.");
  }

  if (isNaN(new Date(date).getTime())) {
    throw new ApiError(404, "Invalid date format. Enter: YYYY-MM-DD");
  }

  // Find Doctor Profile via User ID
  const doctor = await Doctor.findOne({ doctorId: userId }).setOptions({
    includeInactive: true,
  });

  if (!doctor) {
    throw new ApiError(404, "Only doctor can delete slots");
  }

  const doctorId = doctor._id; // Profile ID

  const newDate = new Date(date);

  const slot = await Slot.findOneAndDelete({
    slotNumber: slotNumber,
    doctorId: doctorId,
    date: newDate,
    status: "AVAILABLE",
  });

  console.log("date", newDate);

  console.log("slot", slot);

  if (!slot) {
    throw new ApiError(404, "No slot found");
  }

  return res.status(200).json(new ApiResponse(200, "Slot deleted"));
});

export { createManualSlot, generateAutoSlots, deleteSlot };
