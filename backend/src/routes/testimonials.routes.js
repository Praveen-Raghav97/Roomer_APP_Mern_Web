import { Router } from "express";

import { registerTestimonial,
    getAllTesimonails} from '../controllers/testimonial.controllers.js'


    const router = Router();

    // Register testimonilas
    router.route("/registerTestimonial").post(registerTestimonial);
    router.route("/getTestimonials").get(getAllTesimonails);

    export default router;
    