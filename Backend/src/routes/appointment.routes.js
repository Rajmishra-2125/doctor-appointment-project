import { Router } from "express";
import { getAvailableSlots, applyForBooking, cancelBooking } from "../controllers/appointment.controllers.js"
import { verifyJWT } from "../middlewares/auth.middlewares.js";

const router = Router();

// Checking availability by doctor username
router.route("/checkslot").post(verifyJWT, getAvailableSlots);

// Booking appointment

router.route("/bookslot").post(verifyJWT, applyForBooking);

// Cancelling appointment

router.route("/cancelslot").post(verifyJWT, cancelBooking);


export default router;
