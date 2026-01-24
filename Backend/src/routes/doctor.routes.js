import { Router } from "express";
import {
  saveDoctorInfo,
  updateDoctorProfile,
  getDoctorProfile,
  followDoctor,
  unfollowDoctor,
  getDoctorsBySpecialization,
  getDoctorsByMostFollowers
} from "../controllers/doctor.controllers.js";
import { verifyJWT } from "../middlewares/auth.middlewares.js";

const router = Router()

/**
 * =========================
 * Protected Routes
 * =========================
 */

// Saving info in doctor profile
router.route("/saveInfo").post(verifyJWT, saveDoctorInfo)
// Update doctor profile
router.route("/updateInfo").patch(verifyJWT, updateDoctorProfile)

// follow the doctor profile
router.route("/follow/:username").post(verifyJWT, followDoctor);
// unfollow the doctor profile
router.route("/unfollow/:username").delete(verifyJWT, unfollowDoctor);

// Get doctors availability by Specilization
router
  .route("/specializations/:specialization")
  .post(verifyJWT, getDoctorsBySpecialization);
// Get doctors availability by Specilization and followers
router
  .route("/mostfollowers/:specialization")
  .post(verifyJWT, getDoctorsByMostFollowers);

/**
 * =========================
 * Public Routes
 * =========================
 */

// Get doctor public profile by username
router.route("/c/:username").get(verifyJWT, getDoctorProfile)


export default router;