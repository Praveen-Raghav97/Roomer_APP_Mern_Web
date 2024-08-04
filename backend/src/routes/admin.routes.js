import { Router } from "express";
import { registerAdmin } from "../controllers/admin.controller.js";
import { loginAdmin , getAllAdmin , getAdminBYId} from "../controllers/admin.controller.js";


const router = Router();

// Register testimonilas
router.route("/registerAdmin").post(registerAdmin);
router.route("/login").post(loginAdmin);
router.route("/getAdmins").post(getAllAdmin);
router.route('/:adminId').get(getAdminBYId);

export default router ;