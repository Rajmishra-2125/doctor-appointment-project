import { Router } from "express";
import {
  createingNewSlots,
  deleteSlot,
} from "../controllers/slots.controllers.js";
import { verifyJWT } from "../middlewares/auth.middlewares.js";

const router = Router();

// Creating availability by doctor
router.route("/generateSlot").post(verifyJWT, createingNewSlots);

router.route("/deleteslot").post(verifyJWT, deleteSlot);




export default router;
