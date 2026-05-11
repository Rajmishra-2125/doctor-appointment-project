import { asyncHandler } from "../utils/asyncHandler.js";
import { ApiError } from "../utils/ApiError.js";
import { ApiResponse } from "../utils/ApiResponse.js";
import { Notification } from "../models/notification.models.js";

// Fetch unread and recent notifications for the logged-in user
const getNotifications = asyncHandler(async (req, res) => {
  const userId = req.user?._id;

  if (!userId) {
    throw new ApiError(401, "Unauthorized");
  }

  // Fetch notifications sorted by newest first (limit to 50 for performance)
  const notifications = await Notification.find({ userId })
    .sort({ createdAt: -1 })
    .limit(50);

  const unreadCount = await Notification.countDocuments({
    userId,
    isRead: false,
  });

  return res
    .status(200)
    .json(
      new ApiResponse(
        200,
        { notifications, unreadCount },
        "Notifications fetched successfully"
      )
    );
});

// Mark all notifications as read
const markAllAsRead = asyncHandler(async (req, res) => {
  const userId = req.user?._id;

  if (!userId) {
    throw new ApiError(401, "Unauthorized");
  }

  await Notification.updateMany(
    { userId, isRead: false },
    { $set: { isRead: true } }
  );

  return res
    .status(200)
    .json(new ApiResponse(200, {}, "All notifications marked as read"));
});

// Clear (Delete) all notifications for the user
const clearNotifications = asyncHandler(async (req, res) => {
  const userId = req.user?._id;

  if (!userId) {
    throw new ApiError(401, "Unauthorized");
  }

  await Notification.deleteMany({ userId });

  return res
    .status(200)
    .json(new ApiResponse(200, {}, "All notifications cleared successfully"));
});

// Admin ONLY: Create global notification (Optional utility)
const createSystemNotification = asyncHandler(async (req, res) => {
  if (req.user.role !== "ADMIN") {
    throw new ApiError(403, "Only admins can send system notifications");
  }

  const { targetUserId, title, message, type } = req.body;

  if (!targetUserId || !title || !message) {
    throw new ApiError(400, "User ID, Title, and Message are required");
  }

  const notification = await Notification.create({
    userId: targetUserId,
    title,
    message,
    type: type || "SYSTEM",
  });

  return res
    .status(201)
    .json(
      new ApiResponse(
        201,
        { notification },
        "Notification created successfully"
      )
    );
});

export {
  getNotifications,
  markAllAsRead,
  clearNotifications,
  createSystemNotification,
};
