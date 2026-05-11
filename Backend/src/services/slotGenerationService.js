import { Slot } from "../models/slots.models.js";
import { generateSlotNumber } from "../utils/idGenerators.js";
import { toZonedTime } from "date-fns-tz";
import { addDays, startOfDay } from "date-fns";

// Helper to parse "HH:MM AM/PM" to minutes from midnight
const parseTimeToMinutes = (timeStr) => {
  const [time, modifier] = timeStr.split(" ");
  let [hours, minutes] = time.split(":").map(Number);

  if (modifier === "PM" && hours !== 12) hours += 12;
  if (modifier === "AM" && hours === 12) hours = 0;

  return hours * 60 + minutes;
};

// Helper to format minutes back to "HH:MM"
const formatMinutesToTime = (minutes) => {
  let hours = Math.floor(minutes / 60);
  const mins = minutes % 60;
  const modifier = hours >= 12 ? "PM" : "AM";

  if (hours > 12) hours -= 12;
  if (hours === 0) hours = 12;

  return `${hours.toString().padStart(2, "0")}:${mins.toString().padStart(2, "0")} ${modifier}`;
};

export const generateSlotsForDoctor = async (doctor, daysToGenerate = 7) => {
  const username = doctor.doctor;
  const doctorId = doctor._id; // Use the Doctor Document ID
  console.log(
    `Generating slots for Doctor Object ID: ${doctorId} (Username: ${username})`
  );
  const { availableDays, availableTimeSlots, breakTime, slotDuration } = doctor;

  // Parse break times
  const breakStart = breakTime ? parseTimeToMinutes(breakTime.start) : -1;
  const breakEnd = breakTime ? parseTimeToMinutes(breakTime.end) : -1;

  let generatedSlotsCount = 0;
  const days = [
    "SUNDAY",
    "MONDAY",
    "TUESDAY",
    "WEDNESDAY",
    "THURSDAY",
    "FRIDAY",
    "SATURDAY",
  ];

  // File system writing removed for production safety

  const TIMEZONE = "Asia/Kolkata";

  // Loop for next N days
  for (let i = 0; i < daysToGenerate; i++) {
    // Production Fix: Explicit Timezone Handling using date-fns
    // 1. Get current time in the specified timezone
    const nowZoned = toZonedTime(new Date(), TIMEZONE);
    // 2. Add 'i' days to get the target day in that timezone
    const targetZonedDate = addDays(nowZoned, i);
    // 3. Get midnight (start of day) for that specific date
    const startOfZonedDay = startOfDay(targetZonedDate);

    // Construct UTC Midnight using Local components
    const currentDate = new Date(
      Date.UTC(
        startOfZonedDay.getFullYear(),
        startOfZonedDay.getMonth(),
        startOfZonedDay.getDate()
      )
    );

    const dayName = days[startOfZonedDay.getDay()];

    // Check if doctor works on this day
    if (!availableDays.includes(dayName)) {
      continue;
    }

    // Process each time block
    if (!availableTimeSlots || availableTimeSlots.length === 0) continue;

    for (const timeBlock of availableTimeSlots) {
      // Support multiple typical UI conventions for scheduling strings
      const [startStr, endStr] = timeBlock.split(/\s+to\s+|\s+-\s+/);

      if (!startStr || !endStr) continue;

      const blockStart = parseTimeToMinutes(startStr);
      const blockEnd = parseTimeToMinutes(endStr);

      let currentSlotStart = blockStart;

      while (currentSlotStart + slotDuration <= blockEnd) {
        const currentSlotEnd = currentSlotStart + slotDuration;

        // Check for Break Time Overlap
        // Slot overlaps break if it ends AFTER break starts AND starts BEFORE break ends
        const isOverlap =
          currentSlotStart < breakEnd && currentSlotEnd > breakStart;

        if (!isOverlap) {
          const startTimeString = formatMinutesToTime(currentSlotStart);
          const endTimeString = formatMinutesToTime(currentSlotEnd);

          // Check if slot already exists
          const existingSlot = await Slot.findOne({
            doctorId: doctorId,
            date: {
              $gte: currentDate,
              $lt: new Date(currentDate.getTime() + 24 * 60 * 60 * 1000),
            },
            startTime: startTimeString,
          });

          if (!existingSlot) {
            console.log(`Creating Slot for Date: ${currentDate.toISOString()}`); // DEBUG LOG
            const newSlotNumber = await generateSlotNumber(doctorId);
            const newSlot = await Slot.create({
              doctor: username,
              doctorId: doctorId,
              slotNumber: newSlotNumber,
              date: currentDate,
              startTime: startTimeString,
              endTime: endTimeString,
              slotduration: `${slotDuration} mins`,
              status: "AVAILABLE",
            });
            generatedSlotsCount++;
          }
        }

        currentSlotStart += slotDuration;
      }
    }

    // File system writes removed for production safety. Slots are safely stored in MongoDB.
  }

  return generatedSlotsCount;
};
