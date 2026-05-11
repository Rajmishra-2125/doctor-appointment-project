import { Router } from "express";
import {
  getNotifications,
  markAllAsRead,
  clearNotifications,
  createSystemNotification,
} from "../controllers/notification.controllers.js";
import { verifyJWT } from "../middlewares/auth.middlewares.js";

const router = Router();

router.use(verifyJWT); // Secure all notification routes

router.route("/").get(getNotifications);
router.route("/mark-all-read").patch(markAllAsRead);
router.route("/clear").delete(clearNotifications);

// Admin routes
router.route("/system").post(createSystemNotification);

export default router;
