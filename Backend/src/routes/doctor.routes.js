import { Router } from "express";
import {
  getDoctors,
  saveDoctorInfo,
  updateDoctorProfile,
  followDoctor,
  unfollowDoctor,
  getDoctorsBySpecialization,
  getDoctorsByMostFollowers,
  getAvailabilityById,
  getAvailability,
} from "../controllers/doctor.controllers.js";
import { verifyJWT } from "../middlewares/auth.middlewares.js";

const router = Router();

/**
 * =========================
 * Protected Routes
 * =========================
 */

// Saving info in doctor profile
router.route("/saveInfo").post(verifyJWT, saveDoctorInfo);

// Update doctor profile
router.route("/updateInfo").patch(verifyJWT, updateDoctorProfile);

// Geting normal doctors list
router.route("/profiles").get(verifyJWT, getDoctors);

// follow the doctor profile
router.route("/:username/follow").post(verifyJWT, followDoctor);

// unfollow the doctor profile
router.route("/:username/unfollow").delete(verifyJWT, unfollowDoctor);

// Get doctors availability by Specilization
router.route("/:specialization").post(verifyJWT, getDoctorsBySpecialization);

// Get doctors availability by Specilization and followers
router
  .route("/:specialization/mostfollowers")
  .post(verifyJWT, getDoctorsByMostFollowers);

// Geting availability
router.route("/check-availability").get(verifyJWT, getAvailability);

// Checking availabilty by doctor ID

router.route("/:username/availability").get(verifyJWT, getAvailabilityById);

export default router;
