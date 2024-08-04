import { Router } from "express";
import {
 
registerProperty,
getAllProperty,
getPropertyByID,
PropertyByCategory,
PropertiesByAdminId,
PropertyDelete,
 
} from "../controllers/addProperty.controllers.js";
import {upload} from '../middelwares/multer.middelware.js'

const router = Router();

//User REgister Route
router.route("/addProperty").post(

  upload.array(
   
        'images'
        ),
 
  registerProperty
);
router.route("/getAllProperty").get(
 
  getAllProperty
);

router.route("/:id").get(
getPropertyByID
);

router.route("/admin/:adminID").get(
PropertiesByAdminId
);

router.route("/PropertyId/:mongoId").get(
  PropertyDelete
);

export default router ;
