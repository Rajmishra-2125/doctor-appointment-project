import { Router } from "express";
import { upload } from "../middlewares/multer.middlewares.js";
import { verifyJWT } from "../middlewares/auth.middlewares.js";
import { registerUser, loginUser, logoutUser, refreshAccessToken } from '../controllers/auth.controllers.js';


const router = Router();

// Register new user
router.route("/register").post(
    upload.fields([
        {
            name: "avatar",
            maxcount: 1,
        },
    ]),
registerUser
);

// Login user
router.route("/login").post(loginUser);

// Refresh access token
router.route("/refresh-token").get(refreshAccessToken);


// <=> Secured routes <=>

// Logout user
router.route("/logout").post(verifyJWT, logoutUser);

// Get new refresh token
router.route("/refresh-tokens").get(verifyJWT, refreshAccessToken);



// Exporting all routes
export default router;