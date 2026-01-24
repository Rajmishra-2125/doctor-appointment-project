import { ApiError } from "../utils/ApiError.js";
import { ApiResponse } from "../utils/ApiResponse.js";
import { asyncHandler } from "../utils/asyncHandler.js";
import { Slot } from "../models/slots.models.js";
import { Doctor } from "../models/doctor.models.js"
import mongoose, { set } from "mongoose";


const createingNewSlots = asyncHandler(async(req, res) => {
  const username = req.user?.username;

  const { slotNumber, date, startTime, endTime, slotduration, } =
    req.body;

    if (!slotNumber|| !date || !startTime || !endTime || !slotduration) {
      throw new ApiError(400, "All fields are required.")
    }

    if (isNaN(new Date(date).getTime())) {
      throw new ApiError(404, "Invalid date format. Enter: YYYY-MM-DD")
    }

    const doctor = await Doctor.findOne({username: username})

    if(!doctor) {
      throw new ApiError(404, "Only doctor can create slots")
    }

  const doctorId = doctor._id;

    const checkSlot = await Slot.findOne(
      {
        slotNumber: slotNumber,
        doctorId: doctorId,
        date: new Date(date),
        startTime: startTime,
        status: "AVAILABLE",
      }
    )

    if (checkSlot) {
      throw new ApiError(404,"Slot already created")
    }

    const slots = await Slot.create({
      doctor: username,
      doctorId: doctorId,
      slotNumber: slotNumber,
      date: date,
      startTime: startTime,
      endTime: endTime,
      slotduration: slotduration,
      status: "AVAILABLE",
    });

    return res
    .status(201)
    .json(new ApiResponse(200, {data: slots}, "Slots created successfully"))

}) 

const deleteSlot = asyncHandler(async(req, res) => {
  const doctorId = req.user?._id;
  const { slotNumber, date } = req.body;

  console.log("doctorId", doctorId);

   const doctor = await Doctor.findOne({ doctor: doctorId });

   if (!doctor) {
     throw new ApiError(404, "Only doctor can delete slots");
   }
  
  const slot = await Slot.findOneAndDelete(
    {
      slotNumber: slotNumber,
      doctorId: doctorId,
      date: new Date(date),
      status: "AVAILABLE",
    })

  console.log("slot", slot);

  if (!slot) {
    throw new ApiError(404, "No slot found")
  }

  return res
  .status(200)
  .json(new ApiResponse(
    200,
    "Slot deleted"
  ))

})



export { createingNewSlots,  deleteSlot };

