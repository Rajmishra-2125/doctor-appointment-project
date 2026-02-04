import { ApiError } from "../utils/ApiError.js";
import { ApiResponse } from "../utils/ApiResponse.js";
import { asyncHandler } from "../utils/asyncHandler.js";
import { Slot } from "../models/slots.models.js";
import { Doctor } from "../models/doctor.models.js";
import { Appointment } from "../models/appointment.models.js"
import mongoose, { set } from "mongoose";

// Get my appointments
const myAppointments = asyncHandler(async (req, res) => {
  const patientId = req.user?._id;

  const appointments = await Appointment.find({ patientId: patientId })
    .populate("doctorId", "doctor specialization qualification experience consultationFee availableDays timeSlots")
    .populate("slot", "slotNumber date timeSlots status")
    .sort({ date: -1 });

  return res
    .status(200)
    .json(
      new ApiResponse(200, { data: appointments }, "My Appointments fetched")
    );
});

// Get appointment details by ID
const getAppointmentById = asyncHandler(async (req, res) => {
  const appointmentId = req.params.appointmentId;

  if (!mongoose.Types.ObjectId.isValid(appointmentId)) {
    throw new ApiError(400, "Invalid appointment ID");
  }

  const appointment = await Appointment.findById(appointmentId)
    .populate("doctorId", "doctor specialization qualification experience consultationFee availableDays timeSlots")
    .populate("slot", "slotNumber date timeSlots status");

  if (!appointment) {
    throw new ApiError(404, "Appointment not found");
  }

  return res
    .status(200)
    .json(new ApiResponse(200, { data: appointment }, "Appointment details fetched"));
});

// Get available slots for a doctor on a specific date
const getAvailableSlots = asyncHandler(async (req, res) => {
  const { username, date } = req.body;

  if (!username) {
    throw new ApiError(400, "Username is required");
  }

  if (!date) {
    throw new ApiError(400, "Date is required");
  }
  const selectedDate = new Date(date)

  if (isNaN(selectedDate.getTime())) {
    throw new ApiError(401, "Invalid date format. Enter: YYYY-MM-DD");
  }

  const doctor = await Doctor.findOne({ username: username.toLowerCase() });
  if (!doctor) {
    throw new ApiError(404, "Doctor doesn't exists");
  }

  const doctorId = doctor.doctor._id;

  console.log("DoctorId is:", doctorId);
  

  const slots = await Slot.aggregate([{
    $match: {
    doctorId: doctorId,
    date: new Date(date),
    status: "AVAILABLE",
   }
}]);
  
  console.log("Slot", slots);

  if (slots.length == 0) {
    throw new ApiError(404, "Slot is not available today");
  }

  return res
    .status(200)
    .json(new ApiResponse(200, { data: slots }, "Slot is available"));
})

// Applying for booking an appointment
const applyForBooking = asyncHandler(async (req, res) => {
  const patientId = req.user?._id;
  const { slotNumber, date, username } = req.body;

  if (!slotNumber) {
    throw new ApiError(400, "Slot number is required");
  }

  if (!username) {
    throw new ApiError(400, "Doctor username is required");
  }
  const selectTime = new Date(date);

  if (isNaN(selectTime.getTime())) {
    throw new ApiError(401, "Invalid date format. Enter: YYYY-MM-DD");
  }

  const doctor = await Doctor.findOne({username: username})

  
  if (!doctor) {
    throw new ApiError(404, "Doctor doesn't exists")
  }
  const doctorId = doctor.doctor._id;
  console.log("doctorId = ", doctorId);
  console.log("patientId = ", patientId);


  const bookedSlot = await Slot.findOneAndUpdate(
    {
      slotNumber: slotNumber,
      doctorId: doctorId,
      status: "AVAILABLE",
    },
    {
      status: "BOOKED",
      bookedBy: patientId,
    },
    { new: true }
  );

  if (!bookedSlot) {
    throw new ApiError(404, "Slot already booked or unavailable");
  }

  const appointment = await Appointment.create({
    patientId: patientId,
    doctorId: doctorId,
    slot: bookedSlot._id,
    date: date,
    slotNumber: slotNumber,
    status: "CONFIRMED",
  });

  return res
    .status(200)
    .json(
      new ApiResponse(
        200,
        { data: appointment },
        "Appointment booked Successfully."
      )
    );
})

// Cancel booking an appointment
const cancelBooking = asyncHandler(async(req, res) => {
  const patientId = req.user?._id;
  const { slotNumber, username, date } = req.body

  if (!slotNumber || !username || !date) {
    throw new ApiError(400, "Slotnumber, username and date is required")
  }

  const selectedDate = new Date(date)

  if (isNaN(selectedDate.getTime())) {
    throw new ApiError(400, "Invalid date format. Enter: YYYY-MM-DD");
  }

  const doctor = await Doctor.findOne({username: username.toLowerCase()})

  if (!doctor) {
    throw new ApiError(404, "Doctor doesn't exists")
  }

  const doctorId = doctor.doctor._id;
  console.log("patientId", patientId);
  console.log("doctorId", doctorId);
  console.log("date", new Date(date).toISOString());
  console.log("slotNumber", slotNumber);

  
  const appointment = await Appointment.findOne({
    slotNumber: slotNumber,
    patientId: patientId,
    doctorId: doctorId,
    date: date,
    status: "CONFIRMED",
  });

  console.log("appointment", appointment);
  

  if (!appointment) {
    throw new ApiError(404, "No appoinment available for this slotnumber");
  }
 
  const slot = await Slot.findOneAndUpdate(
    {
      slotNumber: slotNumber,
      doctorId: doctorId,
      date: new Date(date),
      status: "BOOKED"
    },
    {
      status: "AVAILABLE",
      bookedBy: null,
    },
    { new: true }
  )

  if (!slot) {
    throw new ApiError(404, "Slot cancellation failed or no slot available")
  }
  
  appointment.status = "CANCELLED"
  console.log("Appointment cancelled: ", appointment);

  return res
  .status(200)
  .json(new ApiResponse(
    200,
    {data: slot, appointment},
    "Appointment cancelled successfully"
  ))
  
});

// Get appointment status by doctor ID
const getAppointmentStatusById = asyncHandler(async (req, res) => {
  const appointmentId = req.params.appointmentId;

  if (!mongoose.Types.ObjectId.isValid(appointmentId)) {
    throw new ApiError(400, "Invalid appointment ID");
  }

  const appointment = await Appointment.findById(appointmentId);

  if (!appointment) {
    throw new ApiError(404, "Appointment not found");
  }

  return res
    .status(200)
    .json(new ApiResponse(200, { status: appointment.status }, "Appointment status fetched"));
});

// Get appoinntments by patient ID
const getAppointmentsByPatientId = asyncHandler(async (req, res) => {
  const patientId = req.params.patientId;

  if (!mongoose.Types.ObjectId.isValid(patientId)) {
    throw new ApiError(400, "Invalid patient ID");
  }

  const appointments = await Appointment.find({ patientId: patientId })
    .populate("doctorId", "doctor specialization qualification experience consultationFee availableDays timeSlots")
    .populate("slot", "slotNumber date timeSlots status")
    .sort({ date: -1 });

  return res
    .status(200)
    .json(
      new ApiResponse(200, { data: appointments }, "Appointments by patient ID fetched")
    );
});

export { 
  myAppointments,
  getAppointmentById,
  getAvailableSlots, 
  applyForBooking, 
  cancelBooking,
  getAppointmentStatusById,
  getAppointmentsByPatientId 
};
