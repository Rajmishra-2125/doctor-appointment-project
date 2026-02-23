import { asyncHandler } from "../utils/asyncHandler.js";
import { User } from "../models/user.models.js";
import { Doctor } from "../models/doctor.models.js";
import { ApiResponse } from "../utils/ApiResponse.js";
import { ApiError } from "../utils/ApiError.js";
import { Review } from "../models/review.models.js";
import { Session } from "../models/Session.models.js";
import { Appointment } from "../models/appointment.models.js";
import { Follow } from "../models/follow.models.js";
import { Slot } from "../models/slots.models.js";
import {
  generateSlotNumber,
  generateDoctorId,
  generateAppointmentId,
} from "../utils/idGenerators.js";

const getDashboardStats = asyncHandler(async (req, res) => {
  try {
    const totalUsers = await User.countDocuments({ role: "PATIENT" });
    const totalDoctors = await Doctor.countDocuments();
    const totalAppointments = await Appointment.countDocuments();

    // Calculate total revenue from PAID appointments
    const revenueData = await Appointment.aggregate([
      { $match: { paymentStatus: "PAID" } },
      { $group: { _id: null, totalRevenue: { $sum: "$consultationFee" } } },
    ]);
    const totalRevenue =
      revenueData.length > 0 ? revenueData[0].totalRevenue : 0;

    // Fetch last 5 appointments with populated details
    const recentAppointments = await Appointment.find()
      .sort({ createdAt: -1 })
      .limit(5)
      .populate("patientId", "fullname profileImage")
      .populate("doctorId", "doctor specialization");

    // Analytics Period logic
    const { period = "week" } = req.query;
    let startDate = new Date();
    let groupFormat = "%Y-%m-%d";
    let daysToFetch = 7;

    if (period === "month") {
      startDate.setDate(startDate.getDate() - 30);
      daysToFetch = 30;
    } else if (period === "year") {
      startDate.setFullYear(startDate.getFullYear() - 1);
      groupFormat = "%Y-%m";
      daysToFetch = 12; // Months
    } else {
      startDate.setDate(startDate.getDate() - 7);
    }

    const chartDataRaw = await Appointment.aggregate([
      { $match: { createdAt: { $gte: startDate } } },
      {
        $group: {
          _id: { $dateToString: { format: groupFormat, date: "$createdAt" } },
          appointments: { $sum: 1 },
        },
      },
      { $sort: { _id: 1 } },
    ]);

    // Fill in missing points to ensure smooth chart
    const chartData = [];
    if (period === "year") {
      for (let i = 11; i >= 0; i--) {
        const d = new Date();
        d.setMonth(d.getMonth() - i);
        const monthStr = d.toISOString().slice(0, 7); // YYYY-MM
        const monthData = chartDataRaw.find((item) => item._id === monthStr);
        chartData.push({
          date: monthStr,
          appointments: monthData ? monthData.appointments : 0,
        });
      }
    } else {
      for (let i = daysToFetch - 1; i >= 0; i--) {
        const d = new Date();
        d.setDate(d.getDate() - i);
        const dateStr = d.toISOString().split("T")[0];
        const dayData = chartDataRaw.find((item) => item._id === dateStr);
        chartData.push({
          date: dateStr,
          appointments: dayData ? dayData.appointments : 0,
        });
      }
    }

    // Fetch last 5 activities (appointments, user registrations, doctor registrations)
    const lastUsers = await User.find({ role: "PATIENT" })
      .sort({ createdAt: -1 })
      .limit(3);
    const lastDoctors = await Doctor.find().sort({ createdAt: -1 }).limit(2);

    // Combine into a simple activities list
    const recentActivities = [
      ...recentAppointments.slice(0, 3).map((apt) => ({
        id: `apt-${apt._id}`,
        action: "New appointment scheduled",
        detail: `${apt.patientId?.fullname || "Patient"} booked with Dr. ${apt.doctorId?.doctor || "Doctor"}`,
        time: apt.createdAt,
        type: "appointment",
      })),
      ...lastUsers.map((u) => ({
        id: `user-${u._id}`,
        action: "New patient registered",
        detail: `${u.fullname} joined the platform`,
        time: u.createdAt,
        type: "user",
      })),
      ...lastDoctors.map((d) => ({
        id: `doc-${d._id}`,
        action: "New doctor application",
        detail: `Dr. ${d.doctor} applied for registration`,
        time: d.createdAt,
        type: "doctor",
      })),
    ]
      .sort((a, b) => new Date(b.time) - new Date(a.time))
      .slice(0, 5);

    return res.status(200).json(
      new ApiResponse(
        200,
        {
          totalUsers,
          totalDoctors,
          totalAppointments,
          totalRevenue,
          recentAppointments,
          recentActivities,
          chartData,
        },
        "Dashboard stats fetched successfully"
      )
    );
  } catch (error) {
    throw new ApiError(500, "Failed to fetch dashboard stats");
  }
});

export {
  getDashboardStats,
};
