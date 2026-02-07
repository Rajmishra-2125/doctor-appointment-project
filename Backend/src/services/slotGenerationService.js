import { Slot } from "../models/slots.models.js";
import fs from "fs/promises";
import path from "path";

// Helper to parse "HH:MM AM/PM" to minutes from midnight
const parseTimeToMinutes = (timeStr) => {
  const [time, modifier] = timeStr.split(' ');
  let [hours, minutes] = time.split(':').map(Number);
  
  if (modifier === 'PM' && hours !== 12) hours += 12;
  if (modifier === 'AM' && hours === 12) hours = 0;
  
  return hours * 60 + minutes;
};

// Helper to format minutes back to "HH:MM"
const formatMinutesToTime = (minutes) => {
  let hours = Math.floor(minutes / 60);
  const mins = minutes % 60;
  const modifier = hours >= 12 ? 'PM' : 'AM';
  
  if (hours > 12) hours -= 12;
  if (hours === 0) hours = 12;
  
  return `${hours.toString().padStart(2, '0')}:${mins.toString().padStart(2, '0')} ${modifier}`;
};

export const generateSlotsForDoctor = async (doctor, daysToGenerate = 7) => {
    const username = doctor.doctor; 
    const doctorId = doctor._id; // Use the Doctor Document ID
    console.log(`Generating slots for Doctor Object ID: ${doctorId} (Username: ${username})`);
    const { availableDays, availableTimeSlots, breakTime, slotDuration } = doctor;
    
    // Parse break times
    const breakStart = breakTime ? parseTimeToMinutes(breakTime.start) : -1;
    const breakEnd = breakTime ? parseTimeToMinutes(breakTime.end) : -1;
  
    let generatedSlotsCount = 0;
    const days = ['SUNDAY', 'MONDAY', 'TUESDAY', 'WEDNESDAY', 'THURSDAY', 'FRIDAY', 'SATURDAY'];
  
    // Ensure directory exists
    const slotsDir = path.join(process.cwd(), "generated_slots");
    try {
      await fs.mkdir(slotsDir, { recursive: true });
    } catch (error) {
      console.error("Error creating directory:", error);
    }
  
    // Loop for next N days
    for (let i = 0; i < daysToGenerate; i++) {
        // Universal Fix: Treat "Today" in Local Time as UTC Midnight.
        // 1. Get Local Now
        const now = new Date();
        // 2. Add 'i' days
        now.setDate(now.getDate() + i);
        // 3. Construct UTC Midnight using Local components (Year, Month, Date)
        // This ensures Feb 6th IST becomes 2026-02-06T00:00:00.000Z
        const currentDate = new Date(Date.UTC(now.getFullYear(), now.getMonth(), now.getDate()));
        
        const dayName = days[now.getDay()]; // getDay() is local (0-6), matches our intent
        const dailySlots = []; 
    
        // Check if doctor works on this day
        if (!availableDays.includes(dayName)) {
          continue;
        }
    
        // Process each time block
        if (!availableTimeSlots || availableTimeSlots.length === 0) continue;

        for (const timeBlock of availableTimeSlots) {
          const [startStr, endStr] = timeBlock.split(' to ');
          const blockStart = parseTimeToMinutes(startStr);
          const blockEnd = parseTimeToMinutes(endStr);
    
          let currentSlotStart = blockStart;
    
          while (currentSlotStart + slotDuration <= blockEnd) {
            const currentSlotEnd = currentSlotStart + slotDuration;
    
            // Check for Break Time Overlap
            // Slot overlaps break if it ends AFTER break starts AND starts BEFORE break ends
            const isOverlap = 
              (currentSlotStart < breakEnd && currentSlotEnd > breakStart);
    
            if (!isOverlap) {
                const startTimeString = formatMinutesToTime(currentSlotStart);
                const endTimeString = formatMinutesToTime(currentSlotEnd);
                
                // Check if slot already exists
                const existingSlot = await Slot.findOne({
                    doctorId: doctorId,
                    date: {
                        $gte: currentDate, 
                        $lt: new Date(currentDate.getTime() + 24 * 60 * 60 * 1000)
                    },
                    startTime: startTimeString
                });
    
                if (!existingSlot) {
                    console.log(`Creating Slot for Date: ${currentDate.toISOString()}`); // DEBUG LOG
                    const newSlot = await Slot.create({
                        doctor: username, 
                        doctorId: doctorId,
                        slotNumber: Math.floor(Math.random() * 1000000), 
                        date: currentDate,
                        startTime: startTimeString,
                        endTime: endTimeString,
                        slotduration: `${slotDuration} mins`,
                        status: "AVAILABLE"
                    });
                    generatedSlotsCount++;
                    dailySlots.push(newSlot);
                }
            }
    
            currentSlotStart += slotDuration;
          }
        }
    
        // Write daily slots to file
        if (dailySlots.length > 0) {
            const dateString = currentDate.toISOString().split('T')[0];
            const filePath = path.join(slotsDir, `${dateString}.json`);
            try {
                // Determine if we append or read-modify-write. 
                // For simplicity in this logical block, assuming per-day file is valid.
                // Ideal: Read existing, append new, write back.
                
                let existingFileData = [];
                try {
                    const content = await fs.readFile(filePath, 'utf-8');
                    existingFileData = JSON.parse(content);
                } catch (e) {
                    // File doesn't exist or error, start fresh
                }

                const updatedData = [...existingFileData, ...dailySlots];
                await fs.writeFile(filePath, JSON.stringify(updatedData, null, 2));
                
            } catch (error) {
                console.error(`Failed to write slots for ${dateString}:`, error);
            }
        }
      }

      return generatedSlotsCount;
}
