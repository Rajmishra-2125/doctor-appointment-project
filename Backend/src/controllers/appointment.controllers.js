import { ApiError } from "../utils/ApiError.js";
import { ApiResponse } from "../utils/ApiResponse.js";
import { asyncHandler } from "../utils/asyncHandler.js";
import { Slot } from "../models/slots.models.js";
import { Doctor } from "../models/doctor.models.js";
import { Appointment } from "../models/appointment.models.js";
import mongoose, { set } from "mongoose";

// Get my appointments
const myAppointments = asyncHandler(async (req, res) => {
  const patientId = req.user?._id;

  const appointments = await Appointment.find({ patientId: patientId })
    .populate(
      "doctorId",
      "doctor specialization qualification experience consultationFee availableDays timeSlots"
    )
    .populate("slotId", "slotNumber date timeSlots status")
    .sort({ date: -1 });

  return res
    .status(200)
    .json(
      new ApiResponse(200, { data: appointments }, "My Appointments fetched")
    );
});

// Get appointment details by slotId (Slot Document ID) OR slotNumber
const getAppointmentDetailsBySlotId = asyncHandler(async (req, res) => {
  const identifier = req.params.slotId; // Can be ObjectId or Number

  let query = {};

  if (mongoose.Types.ObjectId.isValid(identifier)) {
    // It's a Mongo ID -> Search by slotId ref
    query = { slotId: identifier };
  } else if (!isNaN(identifier)) {
    // It's a Number -> Search by slotNumber
    query = { slotNumber: parseInt(identifier) };
  } else {
    throw new ApiError(
      400,
      "Invalid Slot Identifier (Must be ID or Slot Number)"
    );
  }

  // Find Appointment
  const appointment = await Appointment.findOne(query)
    .populate(
      "doctorId",
      "doctor specialization qualification experience consultationFee availableDays timeSlots"
    )
    .populate("slotId", "slotNumber date timeSlots status");

  if (!appointment) {
    throw new ApiError(404, "Appointment not found for this Slot");
  }

  return res
    .status(200)
    .json(
      new ApiResponse(200, { data: appointment }, "Appointment details fetched")
    );
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

  // Parse Date String to UTC Midnight (Universal Standard)
  let queryDate;
  if (typeof date === "string") {
    const [y, m, d] = date.split("T")[0].split("-");
    // Use Date.UTC to ensure 2026-02-06 becomes 2026-02-06T00:00:00.000Z
    queryDate = new Date(Date.UTC(parseInt(y), parseInt(m) - 1, parseInt(d)));
  } else {
    // Fallback if already a Date object, strip time and force UTC
    const d = new Date(date);
    queryDate = new Date(Date.UTC(d.getFullYear(), d.getMonth(), d.getDate()));
  }

  if (isNaN(queryDate.getTime())) {
    throw new ApiError(401, "Invalid date format. Enter: YYYY-MM-DD");
  }

  const doctor = await Doctor.findOne({ doctor: username.toLowerCase() });
  if (!doctor) {
    throw new ApiError(404, "Doctor doesn't exists");
  }

  const doctorId = doctor._id; // Correct: Use Doctor Document ID

  console.log("DoctorId is:", doctorId);
  console.log("Input Date:", date);
  console.log("Query Date (Universal UTC Midnight):", queryDate.toISOString());

  // Use find() instead of aggregate() for better type casting support
  const slots = await Slot.find({
    doctorId: doctorId,
    date: queryDate,
    status: "AVAILABLE",
  });

  if (!slots) {
    throw new ApiError(404, "Slot is not available today");
  }

  return res
    .status(200)
    .json(new ApiResponse(200, { data: slots }, "Slot is available"));
});

// Applying for booking an appointment
const applyForBooking = asyncHandler(async (req, res) => {
  const patientId = req.user?._id;
  const { slotNumber, date, username, reason } = req.body;

  if (!slotNumber) {
    throw new ApiError(400, "Slot number is required");
  }

  if (!username) {
    throw new ApiError(400, "Doctor username is required");
  }

  if (!reason) {
    throw new ApiError(400, "Reason for appointment is required");
  }

  // Parse Date String to UTC Midnight (Universal Standard)
  let bookingDate;
  try {
    if (typeof date === "string") {
      const [y, m, d] = date.split("T")[0].split("-");
      bookingDate = new Date(
        Date.UTC(parseInt(y), parseInt(m) - 1, parseInt(d))
      );
    } else {
      const d = new Date(date);
      bookingDate = new Date(
        Date.UTC(d.getFullYear(), d.getMonth(), d.getDate())
      );
    }
  } catch (e) {
    throw new ApiError(400, "Invalid Date Format");
  }

  if (isNaN(bookingDate.getTime())) {
    throw new ApiError(401, "Invalid date format. Enter: YYYY-MM-DD");
  }

  console.log(
    `[DEBUG] applyForBooking: Looking for doctor '${username.toLowerCase()}'`
  );
  const doctor = await Doctor.findOne({ doctor: username.toLowerCase() });
  console.log(`[DEBUG] applyForBooking: Found? ${!!doctor}`);
  if (!doctor) {
    throw new ApiError(404, "Doctor doesn't exists");
  }

  const doctorId = doctor._id; // Correct: Use Doctor Document ID

  console.log("DoctorId: ", doctorId);
  console.log("Booking Date (UTC):", bookingDate.toISOString());

  // TRUSTED BOOKING ATTEMPT
  const bookedSlot = await Slot.findOneAndUpdate(
    {
      slotNumber: slotNumber,
      doctorId: doctorId,
      date: bookingDate, // USE CORRECT UTC DATE
      status: "AVAILABLE",
    },
    {
      status: "BOOKED",
      bookedBy: patientId,
    },
    { new: true }
  );

  // --- ROOT CAUSE ANALYSIS IF FAILED ---
  if (!bookedSlot) {
    console.log("❌ Booking Failed. Running Deep Analysis...");

    // 1. Check if Slot exists at all (ignoring date/status)
    const slotAny = await Slot.findOne({
      slotNumber: slotNumber,
      doctorId: doctorId,
    });

    if (!slotAny) {
      console.log("  -> Slot Number not found for this doctor.");
      const count = await Slot.countDocuments({ doctorId: doctorId });
      console.log(`  -> Doctor has ${count} slots total.`);
      throw new ApiError(
        404,
        "Slot Number not found. Please refresh available slots."
      );
    }

    // 2. Check Date Mismatch
    const dbDateISO = slotAny.date.toISOString();
    const reqDateISO = bookingDate.toISOString();

    if (dbDateISO !== reqDateISO) {
      console.log(`  -> DATE MISMATCH! DB: ${dbDateISO} vs Req: ${reqDateISO}`);
      console.log(
        `  -> Readable: DB has ${slotAny.date.toDateString()}, You asked for ${bookingDate.toDateString()}`
      );
      throw new ApiError(
        400,
        `Date Mismatch. Slot is for ${slotAny.date.toDateString()}, but you requested ${bookingDate.toDateString()}.`
      );
    }

    // 3. Check Status
    if (slotAny.status !== "AVAILABLE") {
      console.log(`  -> STATUS MISMATCH! Slot is ${slotAny.status}`);
      throw new ApiError(400, `Slot is already ${slotAny.status}.`);
    }

    // 4. Unknown
    console.log(
      "  -> Slot looks perfect but findOneAndUpdate returned null. Race condition?"
    );
    throw new ApiError(
      500,
      "Unknown Booking Error. Slot update failed despite valid slot."
    );
  }

  // SUCCESS PATH
  // Parse Fee
  let fee = 0;
  if (doctor.consultationFee) {
    fee = parseFloat(doctor.consultationFee.replace(/[^0-9.]/g, "")) || 0;
  }

  try {
    const appointment = await Appointment.create({
      patientId: patientId,
      doctorId: doctorId,
      slotId: bookedSlot._id, // Renamed from slot -> slotId
      date: bookingDate, // USE CORRECT UTC DATE
      slotNumber: slotNumber,
      status: "CONFIRMED",
      reason: reason,
      consultationFee: fee,
      timeSlots: `${bookedSlot.startTime} - ${bookedSlot.endTime}`,
    });

    // Update Doctor Stats (New Appointment Count)
    doctor
      .updateDoctorStats()
      .catch((err) => console.error("Stats Update Error:", err));

    // Update Doctor Stats (New Appointment Count)
    doctor
      .updateDoctorStats()
      .catch((err) => console.error("Stats Update Error:", err));

    return res
      .status(200)
      .json(
        new ApiResponse(
          200,
          { data: appointment },
          "Appointment booked Successfully."
        )
      );
  } catch (error) {
    // ... (rest of catch block)

    // ROLLBACK
    console.error("❌ Appointment Creation Failed. Rolling back Slot...");
    await Slot.findByIdAndUpdate(bookedSlot._id, {
      status: "AVAILABLE",
      bookedBy: null,
    });
    throw error;
  }
});

// Cancel booking an appointment
const cancelBooking = asyncHandler(async (req, res) => {
  const patientId = req.user?._id;
  const { slotNumber, username, date } = req.body;

  if (!slotNumber || !username || !date) {
    throw new ApiError(400, "Slotnumber, username and date is required");
  }

  // Parse Date String to UTC Midnight (Universal Standard)
  let bookingDate;
  if (typeof date === "string") {
    const [y, m, d] = date.split("T")[0].split("-");
    bookingDate = new Date(Date.UTC(parseInt(y), parseInt(m) - 1, parseInt(d)));
  } else {
    const d = new Date(date);
    bookingDate = new Date(
      Date.UTC(d.getFullYear(), d.getMonth(), d.getDate())
    );
  }

  if (isNaN(bookingDate.getTime())) {
    throw new ApiError(400, "Invalid date format. Enter: YYYY-MM-DD");
  }

  const doctor = await Doctor.findOne({ doctor: username.toLowerCase() });

  if (!doctor) {
    throw new ApiError(404, "Doctor doesn't exists");
  }

  const doctorId = doctor._id; // Correct: Use Doctor Document ID
  console.log("patientId", patientId);
  console.log("doctorId", doctorId);
  console.log("date", bookingDate.toISOString());
  console.log("slotNumber", slotNumber);

  const appointment = await Appointment.findOne({
    slotNumber: slotNumber,
    patientId: patientId,
    doctorId: doctorId,
    date: date, // Appointment stores raw string or Date? Schema says Date.
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
      date: bookingDate,
      status: "BOOKED",
    },
    {
      status: "AVAILABLE",
      bookedBy: null,
    },
    { new: true }
  );

  if (!slot) {
    throw new ApiError(404, "Slot cancellation failed or no slot available");
  }

  appointment.status = "CANCELLED";
  await appointment.save();

  // Update Doctor Stats (Cancellation Count)
  doctor
    .updateDoctorStats()
    .catch((err) => console.error("Stats Update Error:", err));

  console.log("Appointment cancelled: ", appointment);

  return res
    .status(200)
    .json(
      new ApiResponse(
        200,
        { data: slot, appointment },
        "Appointment cancelled successfully"
      )
    );
});

// Update appointment status
// Update appointment status (Robust State Machine)
const updateAppointmentStatus = asyncHandler(async (req, res) => {
  const { appointmentId } = req.params;
  const { status, prescription, notes, reason } = req.body;
  const userId = req.user?._id;

  if (!status) {
    throw new ApiError(400, "Status is required");
  }

  const appointment = await Appointment.findById(appointmentId);

  if (!appointment) {
    throw new ApiError(404, "Appointment not found");
  }

  // 1. STATE MACHINE VALIDATION
  const terminalStates = ["CANCELLED", "COMPLETED", "NO_SHOW"];
  if (terminalStates.includes(appointment.status)) {
    throw new ApiError(
      400,
      `Cannot change status. Appointment is already ${appointment.status}.`
    );
  }

  const validTransitions = {
    PENDING: ["CONFIRMED", "CANCELLED"],
    CONFIRMED: ["COMPLETED", "CANCELLED", "NO_SHOW"],
    RESCHEDULED: ["COMPLETED", "CANCELLED", "NO_SHOW"],
  };

  const allowed = validTransitions[appointment.status] || [];
  if (!allowed.includes(status)) {
    throw new ApiError(
      400,
      `Invalid Status Transition. Cannot go from ${appointment.status} to ${status}.`
    );
  }

  // 2. APPLY UPDATES
  appointment.status = status;
  if (prescription) appointment.prescription = prescription;
  if (notes) appointment.doctorNotes = notes; // Mapped to doctorNotes schema field

  // 3. STATUS SPECIFIC LOGIC
  if (status === "CANCELLED") {
    // Free the Slot
    const slotUpdate = await Slot.findByIdAndUpdate(appointment.slotId, {
      status: "AVAILABLE",
      bookedBy: null,
    });

    if (!slotUpdate) {
      // Log critical error but don't fail the request if slot is already gone
      console.error(
        `CRITICAL: Slot ${appointment.slotId} missing for appointment ${appointment._id}`
      );
    }

    // Metadata
    appointment.cancellationReason = reason || "Cancelled by User/Doctor";
    appointment.cancelledAt = new Date();
    appointment.cancelledBy = userId;
  }

  if (status === "COMPLETED") {
    // Auto-update payment to PAID if not already
    if (appointment.paymentStatus === "PENDING") {
      appointment.paymentStatus = "PAID";
      appointment.paidAt = new Date();
    }
    appointment.isCompleted = true; // If schema supports
  }

  await appointment.save();

  // Update Doctor Stats (Status Change: Completed/Cancelled)
  Doctor.findById(appointment.doctorId).then((doc) => {
    if (doc)
      doc
        .updateDoctorStats()
        .catch((err) => console.error("Stats Update Error:", err));
  });

  return res
    .status(200)
    .json(
      new ApiResponse(
        200,
        appointment,
        "Appointment status updated successfully"
      )
    );
});

// Reschedule appointment
const rescheduleAppointment = asyncHandler(async (req, res) => {
  const { appointmentId } = req.params;
  const { newDate, newSlotNumber, reason } = req.body;
  const userId = req.user?._id;

  if (!newDate || !newSlotNumber) {
    throw new ApiError(400, "New date and slot number are required");
  }

  const appointment = await Appointment.findById(appointmentId);
  if (!appointment) {
    throw new ApiError(404, "Appointment not found");
  }

  // 1. VALIDATION: Prevent rescheduling terminal states
  if (["CANCELLED", "COMPLETED", "NO_SHOW"].includes(appointment.status)) {
    throw new ApiError(
      400,
      `Cannot reschedule. Appointment is already ${appointment.status}.`
    );
  }

  if (appointment.status === "RESCHEDULED") {
    throw new ApiError(
      400,
      "Appointment has already been rescheduled once. Further changes are not allowed."
    );
  }

  // Parse New Date to UTC
  let rescheduleDate;
  try {
    if (typeof newDate === "string") {
      const [y, m, d] = newDate.split("T")[0].split("-");
      rescheduleDate = new Date(
        Date.UTC(parseInt(y), parseInt(m) - 1, parseInt(d))
      );
    } else {
      const d = new Date(newDate);
      rescheduleDate = new Date(
        Date.UTC(d.getFullYear(), d.getMonth(), d.getDate())
      );
    }
  } catch (e) {
    throw new ApiError(400, "Invalid Date Format");
  }

  // 2. Find new slot
  // Note: appointment.doctorId is just the ID (not populated here usually, and if it is, we need _id)
  // Safely extract ID
  const doctorId = appointment.doctorId._id || appointment.doctorId;

  const newSlot = await Slot.findOne({
    doctorId: doctorId,
    date: rescheduleDate,
    slotNumber: newSlotNumber,
    status: "AVAILABLE",
  });

  if (!newSlot) {
    throw new ApiError(404, "New slot is not available");
  }

  // 3. Free up old slot
  await Slot.findByIdAndUpdate(appointment.slotId, {
    status: "AVAILABLE",
    bookedBy: null,
  });

  // 4. Book new slot
  newSlot.status = "BOOKED";
  newSlot.bookedBy = appointment.patientId;
  await newSlot.save();

  // 5. Update appointment with History
  // Preserve old details in history
  appointment.rescheduleFrom = {
    date: appointment.date,
    timeSlots: appointment.timeSlots,
  };

  appointment.date = rescheduleDate;
  appointment.slotId = newSlot._id;
  appointment.slotNumber = newSlotNumber;
  appointment.timeSlots = `${newSlot.startTime} - ${newSlot.endTime}`; // Update Time String
  appointment.status = "RESCHEDULED";
  appointment.rescheduleAt = new Date();
  appointment.rescheduleReason = reason || "User requested reschedule";

  await appointment.save();

  // Update Stats (Sync Reschedule history)
  Doctor.findById(appointment.doctorId).then((doc) => {
    if (doc)
      doc
        .updateDoctorStats()
        .catch((err) => console.error("Stats Update Error:", err));
  });

  return res
    .status(200)
    .json(
      new ApiResponse(200, appointment, "Appointment rescheduled successfully")
    );
});

export {
  myAppointments,
  getAppointmentDetailsBySlotId,
  getAvailableSlots,
  applyForBooking,
  cancelBooking,
  updateAppointmentStatus,
  rescheduleAppointment,
};
