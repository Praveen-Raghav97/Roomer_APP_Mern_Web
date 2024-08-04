import { Router } from "express";
import {
    addBooking,
    SendRequest
} from "../controllers/booking.controller.js"

const router = Router();


router.route("/addBooking").post(
addBooking
)
router.route("/SendRequest").post(
    SendRequest
)
export default router