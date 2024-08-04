import { Router } from "express";
import {
  logOutUser,
  loginUser,
  registerUser,
  refreshAccessToken

 
} from "../controllers/users.controllers.js";
import { verifyJWT } from "../middelwares/auth.middelwares.js";

const router = Router();

//User REgister Route
router.route("/register").post(
 
  registerUser
);

//Refresh-Token Route
router.route("/refresh-token").post(refreshAccessToken);
//Login Route
router.route("/userlogin").post(loginUser);

//secure method
//Logout Route
router.route("/logout").post(verifyJWT, logOutUser);








export default router;