import { asyncHandler } from "../utils/asyncHandlers.js";
import { ApiError } from "../utils/apiError.js";
import { Testimonial} from "../models/testimonials.model.js";
import { ApiResponse } from "../utils/apiRes.js";
import mongoose from "mongoose";



const registerTestimonial = asyncHandler(async(req, res) =>{

    //Get User Info From frontend
  const {username , email , description} = req.body;

  if (
    [ email, username, description].some((field) => field?.trim() === " ")
  ) {
    throw new ApiError(400, "All fields are required");
  }




 

 

    //create user object in db

    const createdTestimonials = await Testimonial.create({
        
        email,
        description,
        username,
      });


      

      if (!Testimonial) {
        throw new ApiError(500, "Something went wrong while regeister the testimonial");
      }

      return res
      .status(201)
      .json(new ApiResponse(200, createdTestimonials, "Testimonial Register Successfuly"))


})

const getAllTesimonails = asyncHandler(async (req, res) =>{

    const testimonial =  await Testimonial.find();
    //cdconsole.log(testimonial)
    if(!testimonial){
      throw new ApiError(500, "Something went wrong loading the testimonial");
    }
    return res
    .status(201)
    .json(new ApiResponse(200, testimonial , "Testimonial fetched Successfuly"))



})
export{
    registerTestimonial,
    getAllTesimonails,
}