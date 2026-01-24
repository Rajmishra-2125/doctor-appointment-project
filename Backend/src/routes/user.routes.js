import { Router } from "express";
import { 
    registerUser, 
    loginUser, 
    logoutUser, 
    refreshAccessToken, 
    changeCurrentPassword, 
    getCurrentUser, 
    updateAccountDetails,
    updateUserAvatar,
} from '../controllers/user.controllers.js';
import { upload } from "../middlewares/multer.middlewares.js";
import { verifyJWT } from "../middlewares/auth.middlewares.js";


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

router.route('/login').post(loginUser)
router.route("/refresh-token").get(refreshAccessToken);

// secure routes

router.route('/logout').post(verifyJWT, logoutUser)
router.route("/change-password").post(verifyJWT, changeCurrentPassword);
router.route('/current-user').get(verifyJWT, getCurrentUser)
router.route('/update-account').patch(verifyJWT, updateAccountDetails)
router
  .route("/update-avatar")
  .patch(verifyJWT, upload.single("avatar"), updateUserAvatar);

export default router;